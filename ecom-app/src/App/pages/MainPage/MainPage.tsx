import InfoCard from "./components/InfoCard";
import ProductCard from "./components/ProductCard";
import Text from "components/Text"
import "./MainPage.css"

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="main-page-title-container">
        <Text><h1>Products</h1></Text>
        <Text className="main-page-subtitle" color="secondary"><span>We display products based on the latest products we have, if you want
to see our old products please enter the name of the item</span></Text>

      </div>
      <ProductCard />
      <InfoCard />
    </div>
  );
};

export default MainPage;
