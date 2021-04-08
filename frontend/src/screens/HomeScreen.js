import "./HomeScreen.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import green from "../images/green.jpg";
// Components
import Product from "../components/Product";

//Actions
import { getProducts as listProducts } from "../redux/actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="homescreen">
      <div classname="homescreen-hero">
        <img src={green} height="500px" alt="green-hero"></img>
      </div>
      <div className="first-quote">
        -"Take your candle and light the world, a scent for everyday of the
        week"
      </div>
      <h2 className="homescreen__title">Latest Products</h2>
      <div className="homescreen__products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.map((product) => (
            <Product
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
              productId={product._id}
            />
          ))
        )}
      </div>
      <div className="second-quote">
        <div className="buddha-quote">
          <p className="bquote">
            "Just as a candle cannot burn without fire,
            <br /> men cannot live without travel" -Buddha
          </p>
        </div>
        <div className="leaf"></div>
      </div>
    </div>
  );
};

export default HomeScreen;
