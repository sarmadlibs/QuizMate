import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import Letterize from "letterizejs";
import Typewriter from "typewriter-effect/dist/core";
import { BsArrowRight } from "react-icons/bs";

import anime from "animejs/lib/anime.es.js";
import landingCss from "../styles/landing.module.css";

import shootingStar from "../assets/img/shooting-stars.json";
import starFormation from "../assets/img/star-formation.json";
import astro from "../assets/img/astro.json";

export function LandingPage(props) {
  const titleRef = useRef(null);
  const messageRef = useRef(null);
  const animateMeRef = useRef(null);
  const typewriterRef = useRef(null);

  const quotes = [
    "Believe you can and you're halfway there.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "The secret of getting ahead is getting started.",
    "The only way to do great work is to love what you do.",
    "Don't let yesterday take up too much of today.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "The way to get started is to quit talking and begin doing.",
    "The best way to predict the future is to create it.",
    "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
  ];

  useEffect(() => {
    // First animation on titleRef
    const text = "Welcome to quizMAte";
    const chars = text.split("");
    const $text = titleRef.current;
    $text.innerHTML = chars.map((c, i) => `<span>${c}</span>`).join("");
    const numChars = chars.length;
    const duration = 1600;
    const delay = duration / numChars;
    anime({
      targets: $text.querySelectorAll("span"),
      color: [
        { value: "#191654" },
        { value: "#43c6ac" },
        { value: "#FFFFFF" },
        { value: "#FFFFFF" },
        { value: "#43c6ac" },
      ],
      duration: duration,
      delay: anime.stagger(delay),
      easing: "linear",
      complete: function () {
        // set color for second animation
        anime.set($text.querySelectorAll("span"), {
          color: "#43c6ac",
        });
        //* Second animation on shineRef
        anime({
          targets: $text.querySelectorAll("span"),
          color: [
            { value: "#FFFFFF" },
            // { value: "#FFD700" },
            { value: "#D7BE69" },
            { value: "#0D5BE1" },
          ],
          duration: 2000,
          delay: anime.stagger(150),
          loop: true,
          easing: "linear",
          direction: "alternate",
          loopBegin: function (anim) {
            anim.began = true;
          },
          complete: function (anim) {
            if (anim.began) {
              anim.reset();
            }
          },
        });
      },
    });
    const test = new Letterize({
      targets: animateMeRef.current,
    });
    console.log(animateMeRef.current);

    var animation = anime.timeline({
      targets: test.listAll,
      delay: anime.stagger(50),
      loop: true,
    });

    animation
      .add({
        translateY: -40,
      })
      .add({
        translateY: 0,
      });

    startTypewriter();
  }, []);

  function startTypewriter() {
    new Typewriter(typewriterRef.current, {
      strings: quotes,
      autoStart: true,
      loop: true,
    });
  }

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
    const duration = 2000;
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
      <div className={landingCss.welcomeContainer}>
        <div className={landingCss.titleContainer}>
          <div className={landingCss.title} ref={titleRef}>
            <div ref={animateMeRef} id="animateMe">
              Welcome to quizMAte
            </div>
          </div>
          <div className={landingCss.starFormation}>
            <Lottie options={{ animationData: starFormation }} />
          </div>
          <div className={landingCss.astro}>
            <Lottie
              options={{
                animationData: astro,
                loop: true,
                autoplay: true,
              }}
            />
          </div>
        </div>
        <div className={landingCss.welcomeMessage}>
          Use our study card generator to easily create personalized flashcards
          and achieve academic success. Join the thousands of students who have
          transformed their study habits and reached their goals with Quizmate!
        </div>
        <div className={landingCss.beginJourney}>
          <Link
            className={landingCss.beginJourneyLink}
            to="/studycards"
            ref={messageRef}
          >
            Let's begin your journey to success today!
          </Link>
        </div>

        <div className={landingCss.typewriter} ref={typewriterRef}></div>
      </div>

      <div className={landingCss.ellipseContainer}>
        <svg
          className={landingCss.svgEllipse}
          width="100%"
          height="100%"
          src="../assets/img/Ellipse.svg"
        ></svg>
      </div>
      <div className={landingCss.constellationContainer}>
        <div className={landingCss.svgConstellation}></div>
      </div>
      <div className={landingCss.entireConstellationContainer}>
        <div className={landingCss.svgEntireConstellation}></div>
        <div className={landingCss.svgEntireConstellation2}></div>
      </div>
    </div>
  );
}
