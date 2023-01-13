import homeCss from "../styles/home.module.css";
// import { motion } from "framer-motion";

export function Homepage(props) {
  return (
    <div>
      <div className={homeCss.welcomeContainer}>
        <div className={homeCss.title}>
          <div>Welcome to Prep Pal</div>
        </div>
        <div className={homeCss.welcomeMessage}>
          Use our study card generator to easily create personalized flashcards
          and achieve academic success. Join the thousands of students who have
          transformed their study habits and reached their goals with Prep Pal.
        </div>
        <div className={homeCss.beginJourney}>
          Let's begin your journey to success today!
        </div>
      </div>
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
