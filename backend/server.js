require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");
const stripe = require("stripe")(
  "pk_test_51IdNyyDdUkG2etErS4Blj1T6aIFYYEEoSr9TqK4jM3MVaWyBvZVp4tBFNgBEKYP4P2xMKBzX6OqvADrk6rycT6sy00vAwG16w1"
);
const bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("./middleware/auth");

connectDB();

//express
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

//products
app.use("/api/products", productRoutes);

// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json
app.use(bodyParser.json());

app.use(cors());

//Signup Signin
app.all("/*", auth);
app.use("/auth", require("./routes/auth"));

// // Newsletter Route
app.post("/newsletter", (req, res) => {
  const { email } = req.body;

  //   // Make sure fields are filled
  if (!email) {
    res.send("failed");
    return;
  }

  //   // Construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
      },
    ],
  };

  const postData = JSON.stringify(data);

  fetch("https://usX.api.mailchimp.com/3.0/lists/Y008e7c5cc7", {
    method: "POST",
    headers: {
      Authorization: "auth 04c9e6892d43dac071b5722ebb61b36e-us1",
    },
    body: postData,
  })
    .then(res.statusCode === 200 ? res.send("success") : res.send("fail"))
    .catch((err) => console.log(err));
});

// //payment
app.post("/pay", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 11000,
    currency: "usd",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
    receipt_email: email,
  });

  res.json({ client_secret: paymentIntent["client_secret"] });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
