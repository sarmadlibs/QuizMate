// import { Card } from "../components/Card";
import homeCss from "../styles/home.module.css";

export function Homepage(props) {
  return (
    <div>
      <div className={homeCss.ellipseContainer}>
        <div className={homeCss.svgEllipse}></div>
      </div>
      <div className={homeCss.constellationContainer}>
        <div className={homeCss.svgConstellation}></div>
      </div>
      <div className={homeCss.entireConstellationContainer}>
        <div className={homeCss.svgEntireConstellation}></div>
        <div className={homeCss.svgEntireConstellation2}></div>
      </div>
    </div>
  );
}
