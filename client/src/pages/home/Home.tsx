import Featured from "../../components/featured/Featured";
import MySlider from "../../components/slider/MySlider";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import "./home.scss";
import { cards, projects } from "../../data";
import CatCard from "../../components/catCard/CatCard";
import Features from "../../components/features/Features";
import Teams from "../../components/teams/Teams";
import ProjectCard from "../../components/projectCard/ProjectCard";
import Marketplace from "../../components/marketplace/Marketplace";

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
      <Features />
      <Marketplace />
      <Teams />
      <MySlider
        visibleElements={4}
        elWidth={300}
        elHeight={300}
        gap={15}
        style={{ margin: "100px auto", padding: "10px 0px" }}
        arrows={true}
      >
        {projects.map((project) => (
          <ProjectCard item={project} key={project.id} />
        ))}
      </MySlider>
    </div>
  );
}
