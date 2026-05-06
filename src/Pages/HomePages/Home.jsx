import Advertisement from "./Advertisement";
import BetheshapeFAQ from "./BetheshapeFAQ";
import BetheshapePricing from "./BetheshapePricing";
import HometextCreateui from "./HometextCreateui";
import MessengerIcon from "./MessengerIcon";
import OurSuccessstory from "./OurSuccessstory";
import Promotion from "./Promotion";
import Trustedme from "./Trustedme";

const Home = () => {
  return (
    <div>
      <Promotion position="home_bottom" />
      <HometextCreateui />
      <Trustedme />
      <BetheshapePricing />
      <Advertisement />
      <BetheshapeFAQ />
      <OurSuccessstory />
      <MessengerIcon />
    </div>
  );
};

export default Home;
