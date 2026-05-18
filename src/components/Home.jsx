import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "./BlurText";
import { FaLock } from "react-icons/fa";
import documentWidgetVideo from "../assets/document widget.mp4";
import securedFilesVideo from "../assets/secure files.mp4";
import dragDropVideo from "../assets/Drag and Drop.mp4";
import SpotlightCard from "./SpotlightCard";
import { Input } from "@/components/ui/input"
import VariableProximity from "./VariableProximity";
const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
});

gsap.registerPlugin(ScrollTrigger);

import ShinyText from "./ShinyText";
import FlowingMenu from "./FlowingMenu";
import Shuffle from "./Shuffle";

const demoItems = [
  {
    link: "mailto:iskemiskem29@gmail.com",
    text: "Contact Us",
    image: "https://picsum.photos/600/400?random=1",
  },
  { link: "/login", text: "Login", image: "https://picsum.photos/600/400?random=2" },
  {
    link: "#about-us-section",
    text: "About Us",
    image: "https://picsum.photos/600/400?random=3",
  },
  {
    link: "#pricing-section",
    text: "Pricing",
    image: "https://picsum.photos/600/400?random=4",
  },
];

import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { ArrowUpRightIcon, Menu, Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextType from "./TextType";
import LightRays from "./ui/LightRays";
import ClickSpark from "./ui/ClickSpark";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import ScrollFloat from "./ScrollFloat";
import Antigravity from "./Antigravity";
import AnimatedContent from "./AnimatedContent";
import GlareHover from "./GlareHover";
import SplitText from "./SplitText";
import RotatingText from "./RotatingText";
import LetterGlitch from "./LetterGlitch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Field, FieldLabel } from "@/components/ui/field";

export function TabsDemo() {
  const [activeTab, setActiveTab] = React.useState("overview");

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full max-w-4xl mx-auto"
    >
      <TabsList className="grid w-full grid-cols-4 bg-transparent rounded-2xl p-1 mb-8">
        <TabsTrigger
          value="overview"
          className="rounded-xl hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] data-[state=active]:bg-white/10 data-[state=active]:text-white text-white py-3 text-lg transition-all"
        >
          Document Widget
        </TabsTrigger>
        <TabsTrigger
          value="analytics"
          className="rounded-xl hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] data-[state=active]:bg-white/10 data-[state=active]:text-white text-white py-3 text-lg transition-all"
        >
          Secure Documents
        </TabsTrigger>
        <TabsTrigger
          value="reports"
          className="rounded-xl hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] data-[state=active]:bg-white/10 data-[state=active]:text-white text-white py-3 text-lg transition-all"
        >
          Drag & Drop
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="rounded-xl hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] data-[state=active]:bg-white/10 data-[state=active]:text-white text-white py-3 text-lg transition-all"
        >
          Chats History
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        className="mt-4 focus-visible:outline-none w-full max-w-[1600px] border-white/10 rounded-none border focus-visible:ring-0 overflow-hidden shadow-2xl bg-black mx-auto"
      >
        {activeTab === "overview" && (
          <video
            key="vid-overview"
            ref={(el) => {
              el?.play().catch(() => {});
            }}
            src={documentWidgetVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[500px] object-cover pointer-events-none"
          />
        )}
      </TabsContent>
      <TabsContent
        value="analytics"
        className="mt-4 focus-visible:outline-none w-full max-w-[1600px] border-white/10 rounded-none border focus-visible:ring-0 overflow-hidden shadow-2xl bg-black mx-auto"
      >
        {activeTab === "analytics" && (
          <video
            key="vid-analytics"
            ref={(el) => {
              el?.play().catch(() => {});
            }}
            src={securedFilesVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[500px] object-cover pointer-events-none"
          />
        )}
      </TabsContent>
      <TabsContent
        value="reports"
        className="mt-4 focus-visible:outline-none w-full max-w-[1600px] border-white/10 rounded-none border focus-visible:ring-0 overflow-hidden shadow-2xl bg-black mx-auto"
      >
        {activeTab === "reports" && (
          <video
            key="vid-reports"
            ref={(el) => {
              el?.play().catch(() => {});
            }}
            src={dragDropVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[500px] object-cover pointer-events-none"
          />
        )}
      </TabsContent>
      <TabsContent
        value="settings"
        className="mt-4 focus-visible:outline-none w-full max-w-[1600px] border-white/10 rounded-none border focus-visible:ring-0 overflow-hidden shadow-2xl bg-black mx-auto"
      >
        {activeTab === "settings" && (
          <video
            key="vid-settings"
            ref={(el) => {
              el?.play().catch(() => {});
            }}
            src={chatHistoryVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[500px] object-cover pointer-events-none"
          />
        )}
      </TabsContent>
    </Tabs>
  );
}

export function ButtonAsChild() {
  return (
    <Button 
      size="lg" 
      className="p-7 text-[22px] cursor-pointer"
      onClick={() => document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" })}
    >
      Start For Free
    </Button>
  );
}

export function ButtonOutline() {
  return (
    <Button
      variant="outline"
      size="lg"
      className="pt-7 pb-7 pl-5 pr-5 text-[25px]"
    >
      <Link to="/login">Login</Link>
    </Button>
  );
}

export function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        className="cursor-pointer text-white hover:bg-white/10 hover:text-white"
      >
        Log In
      </Button>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          className="pr-2 cursor-pointer text-white hover:bg-white/10 hover:text-white"
        >
          Sign In
        </Button>
        <Button
          size="icon"
          variant="outline"
          aria-label="Submit"
          className="cursor-pointer border-[1.5px] border-gray-500 text-gray-300 hover:text-white hover:bg-white/10 shadow-sm bg-transparent"
        >
          <ArrowUpRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function MenubarDemo() {
  return (
    <Menubar className="border-none bg-transparent shadow-none gap-2 sm:gap-6">
      <MenubarMenu>
        <MenubarTrigger
          onClick={() =>
            document
              .getElementById("use-our-tool-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="cursor-pointer text-lg tracking-wide font-medium text-gray-300 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] hover:bg-white/10 rounded-xl px-4 py-2 focus:bg-transparent data-[state=open]:bg-transparent focus:text-white data-[state=open]:text-white"
        >
          Features
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger
          onClick={() =>
            document
              .getElementById("pricing-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="cursor-pointer text-lg tracking-wide font-medium text-gray-300 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] hover:bg-white/10 rounded-xl px-4 py-2 focus:bg-transparent data-[state=open]:bg-transparent focus:text-white data-[state=open]:text-white"
        >
          Pricing
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger 
          onClick={() => document.getElementById("about-us-section")?.scrollIntoView({ behavior: "smooth" })}
          className="cursor-pointer text-lg tracking-wide font-medium text-gray-300 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] hover:bg-white/10 rounded-xl px-4 py-2 focus:bg-transparent data-[state=open]:bg-transparent focus:text-white data-[state=open]:text-white"
        >
          About Us
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer text-lg tracking-wide font-medium text-gray-300 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] hover:bg-white/10 rounded-xl px-4 py-2 focus:bg-transparent data-[state=open]:bg-transparent focus:text-white data-[state=open]:text-white">
          Contact Us
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}

const QASection = () => {
  const sectionRef = useRef(null);
  const questionRefs = useRef([]);
  const answerRefs = useRef([]);

  const data = [
    {
      q: "Give me a quick summary of this 80-page research paper.",
      a: "ML improves healthcare diagnostics by 34%, cutting false positives and costs. Authors recommend adoption in radiology.",
    },
    {
      q: "What are the deadlines in this contract?",
      a: "Phase 1 by March 15, final delivery June 30, review ends July 14.",
    },
    {
      q: "What methodology did they use in this study?",
      a: "Mixed-methods: 1,200 survey responses + 40 interviews. Significance set at p < 0.05.",
    },
    {
      q: "Are there any compliance risks I should know about?",
      a: "Yes — Section 4.2 has unresolved GDPR issues and Clause 9 conflicts with local labor law in 3 regions.",
    },
  ];

  const scrollDir = useRef("down");
  const lastScrollY = useRef(0);

  const animateIn = (el, isUser) => {
    if (!el) return;
    gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const animateOut = (el, isUser) => {
    if (!el) return;
    if (scrollDir.current === "up") {
      gsap.to(el, {
        opacity: 0,
        x: isUser ? 120 : -120,
        y: 20,
        duration: 0.5,
        ease: "power2.in",
        overwrite: true,
      });
    } else {
      gsap.to(el, {
        opacity: 0,
        y: -30,
        duration: 0.45,
        ease: "power2.in",
        overwrite: true,
      });
    }
  };

  useEffect(() => {
    const observers = [];
    let started = false;

    questionRefs.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, x: 120, y: 20 });
    });
    answerRefs.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, x: -120, y: 20 });
    });

    const handleScroll = () => {
      scrollDir.current = window.scrollY > lastScrollY.current ? "down" : "up";
      lastScrollY.current = window.scrollY;

      if (!started) {
        started = true;

        questionRefs.current.forEach((el) => {
          if (!el) return;
          const obs = new IntersectionObserver(
            ([entry]) =>
              entry.isIntersecting ? animateIn(el, true) : animateOut(el, true),
            { threshold: 0.15 },
          );
          obs.observe(el);
          observers.push(obs);
        });

        answerRefs.current.forEach((el) => {
          if (!el) return;
          const obs = new IntersectionObserver(
            ([entry]) =>
              entry.isIntersecting
                ? animateIn(el, false)
                : animateOut(el, false),
            { threshold: 0.15 },
          );
          obs.observe(el);
          observers.push(obs);
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0B0C11] py-24 text-white px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden"
    >
      <div className="flex flex-col gap-16 w-full max-w-5xl mx-auto">
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex w-full justify-end">
              <div
                ref={(el) => {
                  if (el) questionRefs.current[index] = el;
                }}
                className="w-full max-w-[70%] bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl rounded-tr-sm px-6 py-5 shadow-xl"
              >
                <p className="text-[11px] text-blue-200 mb-2 font-bold tracking-widest uppercase opacity-80">
                  You
                </p>
                <p className="text-lg md:text-xl font-medium leading-relaxed">
                  {item.q}
                </p>
              </div>
            </div>

            <div className="flex w-full justify-start">
              <div
                ref={(el) => {
                  if (el) answerRefs.current[index] = el;
                }}
                className="w-full max-w-[70%] bg-[#13141A] border border-white/10 text-gray-200 rounded-3xl rounded-tl-sm px-6 py-5 shadow-xl"
              >
                <p className="text-[11px] text-purple-400 mb-2 font-bold tracking-widest uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse inline-block" />
                  AskYourPDF AI
                </p>
                <p className="text-lg md:text-xl leading-relaxed font-light">
                  {item.a}
                </p>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
  const horizontalSectionRef = useRef(null);
  const horizontalWrapperRef = useRef(null);
  const tabsSectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const pinSection = horizontalSectionRef.current;
      const wrapper = horizontalWrapperRef.current;

      if (pinSection && wrapper) {
        const getScrollAmount = () => wrapper.scrollWidth - window.innerWidth;

        const horizontalTween = gsap.to(wrapper, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: pinSection,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            scrub: 1,
            snap: {
              snapTo: (value) => {
                if (value > 0.95) return value;
                return Math.round(value * 3) / 3;
              },
              duration: { min: 0.2, max: 0.5 },
              delay: 0.05,
              ease: "power1.inOut",
            },
            invalidateOnRefresh: true,
          },
        });

        gsap.from(".horizontal-anim-1", {
          opacity: 0,
          scale: 0.2,
          filter: "blur(20px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".horizontal-anim-1",
            containerAnimation: horizontalTween,
            start: "left 85%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".horizontal-anim-2", {
          opacity: 0,
          y: 150,
          rotationX: -90,
          transformOrigin: "bottom",
          duration: 1.5,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".horizontal-anim-2",
            containerAnimation: horizontalTween,
            start: "left 85%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".horizontal-anim-3", {
          opacity: 0,
          scale: 0,
          rotation: 15,
          duration: 1.8,
          ease: "elastic.out(1, 0.4)",
          scrollTrigger: {
            trigger: ".horizontal-anim-3",
            containerAnimation: horizontalTween,
            start: "left 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <ClickSpark
      sparkColor="#ffffff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="w-full bg-[#0B0C11] overflow-x-hidden">
        {/* Global Navigation Wrapper */}
        <div className="absolute top-0 left-0 w-full z-[100] pointer-events-auto">
          <nav className="flex items-center justify-between w-full p-4 px-8">
            <div className="flex justify-start text-white w-[250px]">
              <Link
                to="/"
                className="whitespace-nowrap flex items-center transition-transform hover:scale-105 text-white font-bold text-2xl md:text-3xl tracking-tight drop-shadow-sm"
              >
                AskYourPdf
              </Link>
            </div>

            <div className="flex justify-center flex-1 mt-3">
              <div className="whitespace-nowrap">
                <MenubarDemo />
              </div>
            </div>

            <div className="flex justify-end w-[250px]">
              <div className="whitespace-nowrap">
                {/* Auth buttons removed */}
              </div>
            </div>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="relative min-h-screen w-full overflow-hidden flex flex-col">
          <div className="absolute inset-0 z-0 h-full w-full">
            <div className="absolute inset-0 w-full h-full opacity-60">
              <Antigravity
                count={100}
                magnetRadius={6}
                ringRadius={7}
                waveSpeed={0.4}
                waveAmplitude={1}
                particleSize={0.3}
                lerpSpeed={0.05}
                color="#ffffff"
                particleVariance={1}
                rotationSpeed={0}
                depthFactor={1}
                pulseSpeed={3}
                particleShape="capsule"
                fieldStrength={1}
              />
            </div>
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={1}
              lightSpread={0.5}
              rayLength={3}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0}
              distortion={0}
              className="w-full h-full opacity-80"
              pulsating={false}
              fadeDistance={1}
              saturation={1}
            />
          </div>

          <div className="relative z-10 flex flex-col w-full h-full">
            <div className="h-[80px] w-full shrink-0"></div>
            <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20">
              <ScrollFloat
                containerClassName="my-5"
                textClassName="text-white text-4xl sm:text-5xl md:text-6xl font-bold max-w-[950px] text-center leading-tight tracking-tight drop-shadow-sm"
                animationDuration={1.2}
                ease="back.out(1.4)"
                stagger={0.025}
                ElementType="h2"
                animateOnScroll={false}
                scrub={false}
              >
                Extract Accurate Insights from Your PDFs Instantly
              </ScrollFloat>

              <div className="flex items-center gap-4 mt-8">
                <div>
                  <GlareHover
                    glareColor="#ffffff"
                    glareOpacity={0.3}
                    glareAngle={-30}
                    transitionDuration={800}
                    playOnce={false}
                    width="fit-content"
                    height="fit-content"
                    background="transparent"
                    borderColor="transparent"
                    borderRadius="8px"
                  >
                    <AnimatedContent
                      distance={100}
                      direction="vertical"
                      reverse={false}
                      duration={0.8}
                      ease="power3.out"
                      initialOpacity={0}
                      animateOpacity={true}
                      scale={0}
                      threshold={0.1}
                      delay={1.7}
                    >
                      <ButtonAsChild />
                    </AnimatedContent>
                  </GlareHover>
                </div>

                <AnimatedContent
                  distance={100}
                  direction="vertical"
                  reverse={false}
                  duration={0.8}
                  ease="power3.out"
                  initialOpacity={0}
                  animateOpacity={true}
                  scale={0}
                  threshold={0.1}
                  delay={2}
                >
                  <ButtonOutline />
                </AnimatedContent>
              </div>
            </main>
          </div>
        </div>

        {/* Horizontal Scroll Section */}
        <div
          ref={horizontalSectionRef}
          className="h-screen w-full bg-[#0B0C11] overflow-hidden relative z-10 flex items-center"
        >
          <div ref={horizontalWrapperRef} className="flex items-center h-full">
            <div className="flex flex-col justify-center gap-4 w-screen h-full flex-shrink-0 pl-[5vw] md:pl-[10vw]">
              <AnimatedContent
                distance={150}
                direction="vertical"
                reverse={false}
                duration={1.1}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                scale={1}
                threshold={0.1}
                delay={0.5}
              >
                <div className="w-fit bg-blue-500 px-[40px] py-[15px] border border-white/20 rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-center">
                  <span className="text-3xl md:text-5xl lg:text-3xl text-white font-bold whitespace-nowrap">
                    Ask Anything,
                  </span>
                </div>
              </AnimatedContent>
              <AnimatedContent
                distance={150}
                direction="vertical"
                reverse={false}
                duration={1.1}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity={true}
                scale={1}
                threshold={0.1}
                delay={0.7}
              >
                <div className="w-fit ml-12 md:ml-24 p-[50px] bg-blue-500 py-[15px] border border-white/20 rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-center">
                  <div className="text-3xl md:text-5xl lg:text-3xl text-white font-bold whitespace-nowrap flex items-center gap-3">
                    that's right
                    <RotatingText
                      texts={["anything", "WhatEver"]}
                      mainClassName="px-2 sm:px-2 md:px-3 bg-orange-100 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                      staggerFrom="last"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                      transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 400,
                      }}
                      rotationInterval={2000}
                      splitBy="characters"
                      auto={true}
                      loop={true}
                    />
                  </div>
                </div>
              </AnimatedContent>
            </div>

            <div className="w-screen h-full flex flex-col justify-center items-center flex-shrink-0 px-8 text-center">
              <div className="horizontal-anim-1 text-5xl md:text-7xl lg:text-[7rem] text-gray-300 font-semibold whitespace-normal max-w-6xl">
                Are you exhausted of reading long PDFs?
              </div>
            </div>

            <div
              className="w-screen h-full flex flex-col justify-center items-center flex-shrink-0 px-8 text-center"
              style={{ perspective: "1000px" }}
            >
              <div className="horizontal-anim-2 text-5xl md:text-7xl lg:text-[7rem] text-gray-300 font-semibold whitespace-normal max-w-6xl">
                Getting distracted through all those files?
              </div>
            </div>

            <div className="w-screen h-full flex flex-col justify-center items-center flex-shrink-0 px-8 text-center">
              <div className="horizontal-anim-3 text-6xl md:text-8xl lg:text-[9rem] text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 font-bold drop-shadow-lg pb-4 whitespace-normal max-w-6xl">
                AskYourPDFs will help you.
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div
          id="use-our-tool-section"
          ref={tabsSectionRef}
          className="relative z-20 w-full min-h-screen bg-[#0B0C11] flex flex-col items-center justify-center p-4 sm:p-8 gap-12"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] text-center text-white font-bold drop-shadow-lg whitespace-normal max-w-6xl w-full">
            <BlurText
              text="Use Our Tool Now"
              delay={200}
              animateBy="words"
              direction="up"
              onAnimationComplete={handleAnimationComplete}
              className="justify-center"
            />
          </h1>
          <TabsDemo />
        </div>

        {/* QA Section */}
        <div className="w-full flex justify-center items-center flex-col bg-[#0B0C11]">
          <ShinyText
            className="text-6xl md:text-8xl lg:text-[50px] text-white font-extrabold text-center tracking-tight mb-12"
            text="Ask. Understand. Move Faster."
            speed={2}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
          <QASection />
        </div>

        {/* About us Section  */}
        <section id="about-us-section" className="relative w-full text-white py-24 md:py-32 overflow-hidden">
          {/* Subtle background glow for premium feel */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-600/15 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-blue-600/10 rounded-full blur-[80px] -z-10"></div>

          <div className="container relative z-10 mx-auto px-6 max-w-7xl">
            {/* 2. Section Header: High Contrast */}
            <div className="flex justify-center mb-24 md:mb-32">
              <SplitText
                text="About Us"
                className="text-5xl md:text-7xl font-bold tracking-tight text-white/90"
                delay={40}
                duration={1.5}
                ease="power4.out"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
              />
            </div>

            {/* 3. Main Content Grid */}
            {/* Switched to items-center for a more balanced "Hero" feel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Left Column: Brand Identity */}
              <div
                ref={containerRef}
                className="lg:col-span-5 flex flex-col space-y-4"
              >
                <div className="overflow-hidden">
                  <p className="text-violet-400 text-xs md:text-sm font-bold tracking-[0.3em] uppercase leading-none mb-2">
                    The Evolution of Reading
                  </p>
                </div>

                <VariableProximity
                  label="AskUrPDF"
                  className="font-black text-6xl md:text-7xl lg:text-8xl tracking-tighter text-white leading-[0.9]"
                  fromFontVariationSettings="'wght' 300"
                  toFontVariationSettings="'wght' 900"
                  containerRef={containerRef}
                  radius={200}
                  falloff="gaussian"
                />

                <p className="text-gray-500 text-sm md:text-base font-medium mt-4">
                  Finally, PDFs that talk back.
                </p>
              </div>

              {/* Right Column: The "Glass" Card */}
              <div className="lg:col-span-7">
                <div className="relative group">
                  {/* Enhanced Outer Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/30 to-blue-600/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-1000"></div>

                  <div className="relative">
                    <SpotlightCard
                      className="!bg-white/[0.03] backdrop-blur-3xl !border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-10 md:p-14 rounded-3xl"
                      spotlightColor="rgba(139, 92, 246, 0.15)"
                    >
                      <div className="space-y-6">
                        <p className="text-gray-200 text-xl md:text-2xl font-light leading-relaxed">
                          We believe interacting with information should be
                          <span className="text-white font-semibold">
                            {" "}
                            seamless.
                          </span>
                        </p>

                        <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                          <span className="text-violet-400 font-medium">
                            Ask Ur PDF
                          </span>{" "}
                          bridges the gap between static documents and dynamic
                          understanding. We leverage advanced AI to transform
                          heavy, text-dense files into
                          <span className="text-white italic">
                            {" "}
                            interactive conversations.
                          </span>
                        </p>
                      </div>

                      {/* Optional: Add a subtle CTA or "Learn More" link here for perfection */}
                      <div className="pt-8">
                        <button 
                          onClick={() => navigate(token ? "/chat" : "/login")}
                          className="text-sm font-semibold text-white/50 hover:text-violet-400 transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          Explore our technology <span>→</span>
                        </button>
                      </div>
                    </SpotlightCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Pricing Section */}
        <section
          id="pricing-section"
          className="w-full bg-[#0B0C11] py-24 px-4 sm:px-8 md:px-16 lg:px-24"
        >
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-gray-400 mt-2 text-lg md:text-xl max-w-2xl font-light">
                Choose the perfect plan to supercharge your PDF research, chats,
                and analytical summaries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-stretch">
              <div className="bg-[#13141A] border border-white/10 rounded-3xl p-8 flex flex-col h-full justify-between transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Starter
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Perfect for students and casual reading.
                  </p>
                  <div className="flex items-baseline mb-6">
                    <span className="text-5xl font-extrabold text-white">
                      $0
                    </span>
                    <span className="text-gray-400 text-sm ml-2">/ month</span>
                  </div>
                  <div className="w-full h-px bg-white/10 mb-6" />
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">
                        10 PDFs limit
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">
                        Up to 120 pages per document
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">
                        10 MB maximum file size
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">
                        Standard speed AI responses
                      </span>
                    </li>
                  </ul>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full py-6 text-md font-medium border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white cursor-pointer hover:border-white/30"
                >
                  <Link to="/login">Get Started</Link>
                </Button>
              </div>

              <div className="relative bg-gradient-to-b from-[#181a24] to-[#13141a] border-2 border-indigo-500/50 rounded-3xl p-8 flex flex-col h-full justify-between transition-all duration-300 hover:-translate-y-2 hover:border-indigo-400 shadow-[0_0_35px_rgba(99,102,241,0.15)]">
                <div className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full absolute -top-3.5 right-8 tracking-wider uppercase shadow-md shadow-indigo-600/30">
                  Most Popular
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Pro Researcher
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Designed for professionals, researchers, and creators.
                  </p>
                  <div className="flex items-baseline mb-6">
                    <span className="text-5xl font-extrabold text-white">
                      $15
                    </span>
                    <span className="text-gray-400 text-sm ml-2">/ month</span>
                  </div>
                  <div className="w-full h-px bg-white/10 mb-6" />
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm font-medium">
                        Unlimited document uploads
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm font-medium">
                        Up to 2,000 pages per PDF
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">
                        100 MB file size limit
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">
                        Access to premium AI (GPT-4)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">
                        Multi-document folders chatting
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">
                        OCR for scanned documents
                      </span>
                    </li>
                  </ul>
                </div>
                <Button
                  asChild
                  className="w-full py-6 text-md font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] text-white shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <Link to="/login">Upgrade to Pro</Link>
                </Button>
              </div>

              <div className="bg-[#13141A] border border-white/10 rounded-3xl p-8 flex flex-col h-full justify-between transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Enterprise
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Powering large legal teams, labs, and enterprises.
                  </p>
                  <div className="flex items-baseline mb-6">
                    <span className="text-5xl font-extrabold text-white">
                      $49
                    </span>
                    <span className="text-gray-400 text-sm ml-2">/ month</span>
                  </div>
                  <div className="w-full h-px bg-white/10 mb-6" />
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">
                        Unlimited files & multi-folders
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">
                        Up to 10,000 pages per PDF
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm font-medium">
                        500 MB file size limit
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm font-medium">
                        API access & custom webhooks
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm font-medium">
                        Team analytics & custom seats
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm font-medium">
                        SSO & dedicated support
                      </span>
                    </li>
                  </ul>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full py-6 text-md font-medium border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white cursor-pointer hover:border-white/30"
                >
                  <Link to="/login">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* Secure Section */}
        <section id="secure-section" className="relative mx-auto w-full max-w-[1100px] h-[60vh] min-h-[450px] my-16 rounded-3xl overflow-hidden flex items-center justify-center bg-black border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.03)]">
          {/* Background LetterGlitch */}
          <div className="absolute inset-0 z-0 opacity-30">
            <LetterGlitch
              glitchSpeed={50}
              centerVignette={true}
              outerVignette={true}
              smooth={true}
            />
          </div>

          {/* Content overlay */}
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center justify-center">
            <FaLock className="text-6xl text-white mb-6" />
            <h2 className="text-white text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              Your Data is Safe with Us.
            </h2>
            <p className="text-gray-400 w-[700px] mt-10 pt-5 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Every document is encrypted, completely isolated, and processed
              with maximum security. Your privacy is our most commitment.
            </p>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="w-full bg-[#07080B] border-t border-white/10 pt-20 pb-10 px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="max-w-6xl mx-auto flex flex-col gap-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 relative z-10">
              <div className="col-span-1 md:col-span-1 xl:col-span-2 flex flex-col gap-4">
                <Link
                  to="/"
                  className="text-white font-bold text-3xl tracking-tight transition-transform hover:scale-105 inline-block w-fit"
                >
                  AskYourPdf
                </Link>
                <p className="text-gray-400 text-base leading-relaxed max-w-sm mt-2">
                  Empowering professionals, researchers, and students to extract
                  knowledge faster. Turn your static documents into interactive
                  conversations.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="text-white font-semibold mb-2">Product</h4>
                <button
                  onClick={() =>
                    document
                      .getElementById("use-our-tool-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                >
                  Features
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("pricing-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                >
                  Pricing
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("secure-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-gray-400 hover:text-white transition-colors text-sm text-left cursor-pointer"
                >
                  Security
                </button>

              </div>

              <div className="flex flex-col gap-4">
                <h4 className="text-white font-semibold mb-2">Company</h4>
                <button
                  onClick={() =>
                    document
                      .getElementById("about-us-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-gray-400 hover:text-white transition-colors text-sm text-left cursor-pointer"
                >
                  About Us
                </button>
                <a
                  href="mailto:iskemiskem29@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Contact
                </a>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} AskYourPdf. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link
                  to="#"
                  className="text-gray-500 hover:text-white transition-transform hover:scale-110"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link
                  to="#"
                  className="text-gray-500 hover:text-white transition-transform hover:scale-110"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ClickSpark>
  );
};

export default Home;
