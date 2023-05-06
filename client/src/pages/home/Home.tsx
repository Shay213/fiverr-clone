import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import "./home.scss";

export default function Home() {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
    </div>
  );
}
