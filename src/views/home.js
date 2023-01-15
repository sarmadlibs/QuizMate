import React, { useEffect, useRef } from "react";
import Lottie from "react-lottie";
import anime from "animejs/lib/anime.es.js";
import homeCss from "../styles/home.module.css";

// import { motion } from "framer-motion";
// import shootingStar from "../assets/img/shooting-stars.json";
import starFormation from "../assets/img/star-formation.json";

export function Homepage(props) {
  const titleRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    // Get the text and split it into individual characters
    const text = "Welcome to quizMAte";
    const chars = text.split("");

    // Use the ref to access the DOM element
    const $text = titleRef.current;

    // Add a span element around each character
    $text.innerHTML = chars.map((c, i) => `<span>${c}</span>`).join("");

    // Animate the color of each span element
    const numChars = chars.length;
    const duration = 1600; // 3 seconds
    const delay = duration / numChars; // delay between characters

    anime({
      targets: $text.querySelectorAll("span"),
      color: [
        { value: "#191654" },
        { value: "#43c6ac" },
        { value: "#FFFFFF" },
        { value: "#FFFFFF" },
        // { value: "#FFFFFF" },
        { value: "#43c6ac" },
      ],
      duration: duration,
      delay: anime.stagger(delay),
      easing: "linear",
    });
  }, []);

  useEffect(() => {
    // Get the text and split it into individual characters
    const text = "Let's begin your journey to success today!";
    const chars = text.split("");

    // Use the ref to access the DOM element
    const $text = messageRef.current;

    // Add a span element around each character
    $text.innerHTML = chars.map((c, i) => `<span>${c}</span>`).join("");

    // Animate the color of each span element
    const numChars = chars.length;
    const duration = 2000; // 3 seconds
    const delay = duration / numChars; // delay between characters

    anime({
      targets: $text.querySelectorAll("span"),
      color: [
        { value: "#191654" },
        { value: "#43c6ac" },
        { value: "#FFFFFF" },
        // { value: "#FFFFFF" },
        // { value: "#FFFFFF" },
        { value: "#fdb99b" },
        { value: "#cf8bf3" },
        { value: "#a770ef" },
      ],
      duration: duration,
      delay: anime.stagger(delay),
      easing: "linear",
      complete: function (anim) {
        anim.restart();
      },
    });
  }, []);

  return (
    <div>
      <div className={homeCss.welcomeContainer}>
        <div className={homeCss.titleContainer}>
          <div className={homeCss.title} ref={titleRef}>
            <div>Welcome to quizMAte</div>
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
        <div className={homeCss.beginJourney} ref={messageRef}>
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
