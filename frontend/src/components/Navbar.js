import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">THE ILLISSION PROJECT</div>

      <ul className="navbar__links">
        <li>
          <Link to="/home">HOME</Link>
        </li>
        <li>
          <Link to="/">SHOP</Link>
        </li>
        <li>
          <Link to="/ourstory">OUR STORY</Link>
        </li>
        <li>
          <Link to="/cart" className="cart__link">
            CART
            {/* <i className="fas fa-shopping-cart"></i> */}
            <span>
              <span className="cartlogo__badge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
      </ul>

      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
