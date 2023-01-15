import React from "react";
import Lottie from "react-lottie";
import homeCss from "../styles/home.module.css";

// import { motion } from "framer-motion";
import shootingStar from "../assets/img/shooting-stars.json";
import starFormation from "../assets/img/star-formation.json";

export function Homepage(props) {
  return (
    <div>
      <div className={homeCss.welcomeContainer}>
        <div className={homeCss.titleContainer}>
          <div className={homeCss.title}>
            {/* <div>Welcome to Prep Pal</div> */}
            <div>Welcome to quizMAte</div>
            {/* <div>Welcome to studyMAte</div> */}
            {/* <div>Welcome to studypal</div> */}
          </div>
          <div className={homeCss.starFormation}>
            <Lottie options={{ animationData: starFormation }} />
          </div>
          {/* <div className={homeCss.shootingStar}>
            <Lottie
              options={{
                animationData: shootingStar,
                loop: true,
                autoplay: true,
              }}
            />
          </div> */}
        </div>
        <div className={homeCss.welcomeMessage}>
          Use our study card generator to easily create personalized flashcards
          and achieve academic success. Join the thousands of students who have
          transformed their study habits and reached their goals with Quizmate!
        </div>
        <div className={homeCss.beginJourney}>
          Let's begin your journey to success today!
        </div>
      </div>

      <div className={homeCss.ellipseContainer}>
        <svg
          className={homeCss.svgEllipse}
          width="100%"
          height="100%"
          src="../assets/img/Ellipse.svg"
        ></svg>
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
