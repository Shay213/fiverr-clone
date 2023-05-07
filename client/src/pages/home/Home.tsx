import Featured from "../../components/featured/Featured";
import MySlider from "../../components/slider/MySlider";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import "./home.scss";
import { cards } from "../../data";
import CatCard from "../../components/catCard/CatCard";

export default function Home() {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <MySlider
        visibleElements={4}
        elWidth={252}
        elHeight={344}
        gap={15}
        style={{ margin: "100px auto" }}
        arrows={true}
      >
        {cards.map((card) => (
          <CatCard item={card} key={card.id} />
        ))}
      </MySlider>
    </div>
  );
}
