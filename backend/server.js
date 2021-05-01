require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");
const stripe = require("stripe")(
  "sk_test_51IdNyyDdUkG2etErImMYBqbA6wxvMIG3ooyLdgBQCHNAuR3D8olTu5EAj41zs52uxSVA9pUVBoCouuPbKQa9ycHm00YSjOLs8k"
);
const bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("./middleware/auth");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
require("./passport-setup");
const passport = require("passport");
const Strategy = require("passport-facebook").Strategy;
const config = require("./config");
const uuid = require("uuid/v4");

connectDB();

//express
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

//products
app.use("/api/products", productRoutes);

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(cors());

//Signup Signin
app.use("/api/auth", require("./routes/auth"));
app.all("/api/*", auth);

// //payment

app.get("/", (req, res) => {
  res.send(
    "sk_test_51IdNyyDdUkG2etErImMYBqbA6wxvMIG3ooyLdgBQCHNAuR3D8olTu5EAj41zs52uxSVA9pUVBoCouuPbKQa9ycHm00YSjOLs8k"
  );
});

app.post("/payment", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotency_key,
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

//GOOGLE

// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(
  cookieSession({
    name: "the-illission-project",
    keys: ["key1", "key2"],
  })
);

app.use(require("cookie-parser")());

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Example protected and unprotected routes
app.get("/", (req, res) => res.send("Example Home page!"));
app.get("/failed", (req, res) => res.send("You Failed to log in!"));

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get("/good", isLoggedIn, (req, res) =>
  res.send(`Welcome mr ${req.user.displayName}!`)
);

// Auth Routes
app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "http://localhost:3000/home",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/good");
  }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

//FACEBOOK

passport.use(
  new Strategy(
    {
      clientID: config.FACEBOOK_CLIENT_ID,
      clientSecret: config.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/home",
      profileFields: ["id", "displayName", "email", "name", "photos"],
      passReqToCallback: true,
    },
    function (accessToken, refreshToken, profile, cb) {
      // save the profile on the Database
      // Save the accessToken and refreshToken if you need to call facebook apis later on
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.get("/facebook", passport.authenticate("facebook"));
app.get(
  "http://localhost:3000/home",
  passport.authenticate("facebook", {
    failureRedirect: `${config.FRONTEND_HOST}/error`,
  }),
  (req, res) => {
    res.send(`${config.FRONTEND_HOST}/success`);
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
