import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import SideDrawer from "./components/SideDrawer";
import Backdrop from "./components/Backdrop";
import Social from "./components/Social";
import Pay from "./checkout/Pay";
// import AuthForm from "./components/auth/AuthForm";
// Screens
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import ShopScreen from "./screens/ShopScreen";
import FreeShipping from "./components/FreeShipping";
import OurStory from "./screens/OurStory";
import SignIn from "./screens/Signin";
// import { AuthContext } from "./components/auth/auth";

function App() {
  const [sideToggle, setSideToggle] = useState(false);

  // const existingToken = localStorage.getItem("token") || "";
  // const existingUsername = localStorage.getItem("username") || "";
  // const [authToken, setAuthToken] = useState(existingToken);
  // const [username, setUsername] = useState(existingUsername);

  // const setUserName = (data) => {
  //   if (!data) {
  //     localStorage.removeItem("username");
  //     setUsername();
  //   } else {
  //     localStorage.setItem("username", data);
  //     setUsername(data);
  //   }
  // };

  // const setToken = (data) => {
  //   if (!data) {
  //     localStorage.removeItem("token");
  //     setAuthToken();
  //   } else {
  //     localStorage.setItem("token", JSON.stringify(authToken));
  //     setAuthToken(data);
  //   }
  // };
  return (
    <Router>
      {/* <AuthContext.Provider
        value={{
          authToken,
          setAuthToken: setToken,
          username,
          setUserName: setUserName,
        }}
      >
        <div className="app">
          <AuthForm />
        </div>
      </AuthContext.Provider> */}

      <Social />
      <FreeShipping />
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <main className="app">
        <Switch>
          <Route exact path="/home" component={HomeScreen} />
          <Route exact path="/" component={ShopScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart" component={CartScreen} />
          <Route exact path="/ourstory" component={OurStory} />
          <Route exact path="/pay" component={Pay} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignIn} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
