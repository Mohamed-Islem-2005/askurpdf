"use client";

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCurrentEmail,
  selectCurrentUser,
  selectCurrentToken,
  LogOut as logoutAction,
} from "@/features/auth/authSlice";
import Chatbot from "@/features/chat/Chatbot";
import toast, { Toaster } from "react-hot-toast";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/animate-ui/components/radix/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/animate-ui/primitives/radix/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu";
import {
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  Calendar,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  FileText,
  LogOut,
  MessageSquare,
  MoreHorizontal,
  Plus,
  SquarePen,
  Settings2,
  Sparkles,
  SquareTerminal,
  Star,
  Trash2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  CheckCircle2,
  Video,
  Layers,
  Cpu,
  ArrowRight,
  Search,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const DATA = {
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          id: "chatbot",
          title: "Chat",
        },
        {
          id: "playground-history",
          title: "History",
        },
        {
          id: "playground-starred",
          title: "Starred",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          id: "doc-intro",
          title: "Introduction",
        },
        {
          id: "doc-get-started",
          title: "Get Started",
        },
        {
          id: "doc-tutorials",
          title: "Tutorials",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          id: "settings-general",
          title: "General",
        },
        {
          id: "settings-themes",
          title: "Themes",
        },
        {
          id: "settings-font",
          title: "Fonts",
        },
      ],
    },
  ],
};

// Database of tutorials
const TUTORIAL_VIDEOS = [
  {
    title: "1. Getting Started with AskYourPdf",
    description:
      "Learn the fundamentals of AskYourPdf. See how to navigate your workspace, initiate document-scoped chats, and explore standard interface panels.",
    url: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34327-large.mp4",
    duration: "1:02",
    thumbnail:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=350&q=80",
  },
  {
    title: "2. Advanced Semantic Citations",
    description:
      "Deep dive into RAG-powered citations. Learn how the AI references pages and paragraphs inside your PDFs so you can audit answers instantly.",
    url: "https://assets.mixkit.co/videos/preview/mixkit-hand-holding-smartphone-with-social-media-icons-42358-large.mp4",
    duration: "0:45",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=350&q=80",
  },
  {
    title: "3. Workspace Folders & Settings",
    description:
      "Discover how to organize multiple documents into scoped collections, configure RAG models (temperature, creativity), and manage account preferences.",
    url: "https://assets.mixkit.co/videos/preview/mixkit-blogging-at-home-42340-large.mp4",
    duration: "1:15",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=350&q=80",
  },
];

const DocumentationPortal = ({ activeView, setActiveView }) => {
  const [activeTab, setActiveTab] = React.useState(activeView);

  // Keep active tab in sync with the parent activeView
  React.useEffect(() => {
    setActiveTab(activeView);
  }, [activeView]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setActiveView(tabId);
  };

  // Video player state
  const videoRef = React.useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [isMuted, setIsMuted] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  // Auto-play next video or loop
  const currentVideo = TUTORIAL_VIDEOS[currentVideoIndex];

  React.useEffect(() => {
    // When changing videos, reset player state
    setIsPlaying(false);
    setCurrentTime(0);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentVideoIndex]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => console.error("Video play failed:", err));
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setCurrentTime(curr);
    setProgress((curr / dur) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    if (!videoRef.current || !duration) return;
    const seekPct = parseFloat(e.target.value);
    const newTime = (seekPct / 100) * duration;
    videoRef.current.currentTime = newTime;
    setProgress(seekPct);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    if (!videoRef.current) return;
    const vol = parseFloat(e.target.value);
    videoRef.current.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    const nextMute = !isMuted;
    videoRef.current.muted = nextMute;
    setIsMuted(nextMute);
    if (nextMute) {
      videoRef.current.volume = 0;
    } else {
      videoRef.current.volume = volume || 0.5;
    }
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen(); // Safari
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen(); // IE11
    }
  };

  const formatTime = (timeInSecs) => {
    if (isNaN(timeInSecs)) return "0:00";
    const mins = Math.floor(timeInSecs / 60);
    const secs = Math.floor(timeInSecs % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Stepper state for Get Started
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    {
      title: "Upload Your Document",
      desc: "Drag & drop your files securely into the portal. We encrypt and index your content using secure vector storage.",
      icon: Layers,
      highlight: "Supports PDF, DOCX, TXT formats up to 100MB.",
    },
    {
      title: "Semantic Analysis",
      desc: "Our private AI parses tables, paragraphs, and figures, forming a dense embedding context in real-time.",
      icon: Cpu,
      highlight: "Completed in under 3 seconds per 100 pages.",
    },
    {
      title: "Query & Verify Citations",
      desc: "Ask complex questions in natural language. Click page indexes in responses to inspect exact citations in source PDFs.",
      icon: Sparkles,
      highlight: "100% audit-ready, secure corporate answering.",
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl animate-fade-in pb-16">
      {/* Header section */}
      <div className="border-b border-white/5 pb-6">
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2 flex items-center gap-2">
          <BookOpen className="size-8 text-indigo-500" />
          <span>Documentation Center</span>
        </h2>
        <p className="text-gray-400 font-light text-sm">
          Everything you need to master PDF querying, instant workspace
          intelligence, and citations auditing.
        </p>
      </div>

      {/* Premium Horizontal Navigation Tabs */}
      <div className="flex border-b border-white/5 p-1 bg-[#13141A]/30 rounded-xl max-w-md">
        {[
          { id: "doc-intro", label: "Introduction" },
          { id: "doc-get-started", label: "Get Started" },
          { id: "doc-tutorials", label: "Video Tutorials" },
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold tracking-wide transition-all cursor-pointer relative ${
                isSelected
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Contents with animations */}
      <div className="transition-all duration-300">
        {activeTab === "doc-intro" && (
          <div className="flex flex-col gap-8 max-w-4xl animate-slide-up">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold w-fit uppercase tracking-widest">
                  Welcome to AskYourPdf
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Unlock Knowledge Locked in Static Documents
                </h3>
                <p className="text-gray-300 leading-relaxed font-light">
                  AskYourPdf transforms dense, unsearchable manuals, research
                  papers, and corporate reports into **interactive semantic
                  workspaces**. Leveraging private, secured Retrieval-Augmented
                  Generation (RAG), you can ask questions and immediately
                  receive verified responses backed by source citations.
                </p>
              </div>
              <div className="w-full md:w-80 h-48 rounded-2xl border border-white/5 bg-[#13141A] p-6 flex flex-col justify-center items-center text-center gap-3 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-50 pointer-events-none" />
                <Bot className="size-10 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="text-white font-bold text-lg">
                  Instant Auditing
                </span>
                <span className="text-gray-400 text-xs font-light px-4">
                  Verify answers with interactive page citations in real-time.
                </span>
              </div>
            </div>

            {/* Core Features Grid */}
            <div className="grid gap-6 sm:grid-cols-3 mt-4">
              <div className="bg-[#13141A] border border-white/5 p-6 rounded-2xl flex flex-col gap-3 hover:border-white/10 transition-all shadow-xl hover:shadow-indigo-500/[0.01]">
                <div className="size-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center">
                  <Layers className="size-5 text-indigo-400" />
                </div>
                <h4 className="text-white font-bold text-base">
                  Multi-File Scoping
                </h4>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  Analyze and index multiple files simultaneously, holding
                  cross-document conversation sessions natively.
                </p>
              </div>

              <div className="bg-[#13141A] border border-white/5 p-6 rounded-2xl flex flex-col gap-3 hover:border-white/10 transition-all shadow-xl hover:shadow-indigo-500/[0.01]">
                <div className="size-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center">
                  <Cpu className="size-5 text-indigo-400" />
                </div>
                <h4 className="text-white font-bold text-base">
                  High-Speed Vectors
                </h4>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  Documents are chunked, embedded, and stored in secure cloud
                  nodes, giving you millisecond RAG lookup responses.
                </p>
              </div>

              <div className="bg-[#13141A] border border-white/5 p-6 rounded-2xl flex flex-col gap-3 hover:border-white/10 transition-all shadow-xl hover:shadow-indigo-500/[0.01]">
                <div className="size-10 rounded-xl bg-[#13141A] border border-emerald-500/20 flex items-center justify-center bg-emerald-500/5">
                  <CheckCircle2 className="size-5 text-emerald-400" />
                </div>
                <h4 className="text-white font-bold text-base">
                  Privacy Shield
                </h4>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  Your documents are completely isolated, encrypted in transit
                  and at rest, and never used to train public models.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "doc-get-started" && (
          <div className="flex flex-col gap-8 max-w-4xl animate-slide-up">
            <div className="flex flex-col gap-2">
              <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">
                Walkthrough Stepper
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Three Simple Steps to Intelligence
              </h3>
            </div>

            {/* Stepper Tabs & Details */}
            <div className="flex flex-col md:flex-row gap-8 items-stretch mt-2">
              {/* Left Column Steps Navigator */}
              <div className="w-full md:w-80 flex flex-col gap-3 shrink-0">
                {steps.map((step, idx) => {
                  const IconComponent = step.icon;
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`w-full p-4 rounded-xl text-left border flex items-center gap-4 transition-all cursor-pointer relative overflow-hidden ${
                        isActive
                          ? "bg-[#181a24] border-indigo-500 shadow-lg"
                          : "bg-[#13141A]/50 border-white/5 hover:bg-[#13141A] hover:border-white/10"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 h-full w-1 bg-indigo-500" />
                      )}
                      <div
                        className={`size-10 rounded-lg flex items-center justify-center shrink-0 border ${
                          isActive
                            ? "bg-indigo-600/20 border-indigo-500 text-indigo-400 font-bold"
                            : "bg-white/5 border-transparent text-gray-500 font-bold"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4
                          className={`text-sm font-bold truncate ${isActive ? "text-white" : "text-gray-400"}`}
                        >
                          {step.title}
                        </h4>
                        <span className="text-gray-500 text-xs font-light block truncate">
                          Click to see details
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column Step Visual & Details */}
              <div className="flex-1 rounded-2xl bg-[#13141A]/80 border border-white/5 p-8 flex flex-col justify-between relative shadow-xl">
                <div className="flex flex-col gap-4">
                  <div className="size-14 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2">
                    {React.createElement(steps[activeStep].icon, {
                      className: "size-7",
                    })}
                  </div>
                  <h4 className="text-white text-xl font-bold">
                    Step {activeStep + 1}: {steps[activeStep].title}
                  </h4>
                  <p className="text-gray-300 leading-relaxed font-light text-md">
                    {steps[activeStep].desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-indigo-400 font-mono bg-indigo-500/5 border border-indigo-500/10 px-3 py-1.5 rounded-lg w-fit">
                    Pro-Tip: {steps[activeStep].highlight}
                  </div>
                  {activeStep < steps.length - 1 ? (
                    <button
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 self-end sm:self-auto cursor-pointer transition-all"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveView("chatbot-new")}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 self-end sm:self-auto cursor-pointer transition-all"
                    >
                      <span>Let's Start!</span>
                      <CheckCircle2 className="size-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "doc-tutorials" && (
          <div className="flex flex-col gap-6 w-full animate-slide-up">
            <div className="flex flex-col gap-1.5">
              <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">
                Video guides
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                AskYourPdf Video Training
              </h3>
            </div>

            {/* Video Dashboard */}
            <div className="grid gap-6 lg:grid-cols-3 items-start mt-2">
              {/* Video Player Section */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="relative aspect-video rounded-2xl bg-black overflow-hidden border border-white/10 group shadow-2xl">
                  {/* HTML5 Video Element */}
                  <video
                    ref={videoRef}
                    src={currentVideo.url}
                    onClick={handlePlayPause}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className="w-full h-full object-cover"
                    preload="metadata"
                  />

                  {/* Glassmorphic Play Overlay Button when paused */}
                  {!isPlaying && (
                    <button
                      onClick={handlePlayPause}
                      className="absolute inset-0 m-auto size-16 rounded-full bg-white/15 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white backdrop-blur-md cursor-pointer transition-transform scale-100 hover:scale-105 duration-200 shadow-xl z-20"
                    >
                      <Play className="size-6 fill-white ml-0.5" />
                    </button>
                  )}

                  {/* Custom Glassmorphic Controls Bar */}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-10">
                    {/* Progress Slider */}
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={progress}
                      onChange={handleSeek}
                      className="w-full h-1 accent-indigo-500 rounded-lg cursor-pointer bg-white/20 hover:h-1.5 transition-all"
                    />

                    {/* Button Row */}
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-4">
                        {/* Play/Pause icon */}
                        <button
                          onClick={handlePlayPause}
                          className="text-white hover:text-indigo-400 transition-colors cursor-pointer"
                        >
                          {isPlaying ? (
                            <Pause className="size-5 fill-white" />
                          ) : (
                            <Play className="size-5 fill-white" />
                          )}
                        </button>

                        {/* Mute/Volume icon */}
                        <div className="flex items-center gap-2 group/volume relative">
                          <button
                            onClick={handleToggleMute}
                            className="text-white hover:text-indigo-400 transition-colors cursor-pointer"
                          >
                            {isMuted ? (
                              <VolumeX className="size-5" />
                            ) : (
                              <Volume2 className="size-5" />
                            )}
                          </button>
                          <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.1}
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-16 h-1 bg-white/20 accent-indigo-500 rounded-lg cursor-pointer opacity-100 scale-100 transition-all"
                          />
                        </div>

                        {/* Duration Tracker */}
                        <div className="text-xs font-mono text-gray-300">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Fullscreen icon */}
                        <button
                          onClick={handleFullscreen}
                          className="text-white hover:text-indigo-400 transition-colors cursor-pointer"
                          title="Fullscreen"
                        >
                          <Maximize className="size-4.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Info Card */}
                <div className="bg-[#13141A] border border-white/5 p-6 rounded-2xl flex flex-col gap-2 shadow-xl">
                  <h4 className="text-white font-bold text-lg">
                    {currentVideo.title}
                  </h4>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    {currentVideo.description}
                  </p>
                </div>
              </div>

              {/* Video Playlist Sidebar */}
              <div className="bg-[#13141A]/50 border border-white/5 rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
                <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">
                  Tutorial Playlist
                </span>
                <div className="flex flex-col gap-3">
                  {TUTORIAL_VIDEOS.map((video, idx) => {
                    const isCurrent = currentVideoIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentVideoIndex(idx)}
                        className={`w-full p-2.5 rounded-xl text-left flex items-start gap-3 transition-all cursor-pointer border ${
                          isCurrent
                            ? "bg-indigo-600/10 border-indigo-500/30 text-white"
                            : "bg-transparent border-transparent hover:bg-white/5 text-gray-400 hover:text-white"
                        }`}
                      >
                        {/* Image Thumbnail with play overlay */}
                        <div className="relative size-16 rounded-lg overflow-hidden shrink-0 bg-black border border-white/10">
                          <img
                            src={video.thumbnail}
                            className="w-full h-full object-cover opacity-80"
                            alt=""
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Video className="size-4 text-white" />
                          </div>
                          {isCurrent && (
                            <div className="absolute bottom-1 right-1 bg-indigo-600 text-[9px] font-bold px-1.5 py-0.5 rounded text-white">
                              Playing
                            </div>
                          )}
                        </div>

                        {/* Title & Duration */}
                        <div className="min-w-0 flex-1">
                          <h5 className="text-xs font-bold leading-snug line-clamp-2">
                            {video.title}
                          </h5>
                          <span className="text-[10px] text-gray-500 block font-mono mt-1">
                            Duration: {video.duration}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2 p-4 bg-[#13141A] border border-white/5 rounded-xl text-center flex flex-col gap-2">
                  <span className="text-white text-xs font-bold">
                    Have Specific Questions?
                  </span>
                  <span className="text-gray-400 text-[11px] leading-relaxed">
                    Our interactive AI assistant is always ready to explain
                    concepts instantly inside your chat dashboard.
                  </span>
                  <button
                    onClick={() => setActiveView("chatbot")}
                    className="mt-2 py-2 px-3 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-bold text-[11px] rounded-lg cursor-pointer hover:bg-indigo-600 hover:text-white transition-all block w-full"
                  >
                    Open Personal Chatbot
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const THEMES = {
  indigo: {
    name: "Midnight Void",
    desc: "Original AskYourPdf deep cosmic dark mode layout",
    bgMain: "#0B0C11",
    bgPanel: "#13141A",
    bgHover: "#181a24",
    bgInput: "#1C1D24",
    bgMuted: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderHover: "rgba(255, 255, 255, 0.1)",
    textMain: "#ffffff",
    textMuted: "#9ca3af",
    textFaint: "#6b7280",
    primary: "#4f46e5",
    hover: "#6366f1",
    text400: "#818cf8",
    text500: "#6366f1",
    border500: "#6366f1",
    glow25: "rgba(79, 70, 229, 0.25)",
    glow40: "rgba(79, 70, 229, 0.4)",
    bg10: "rgba(79, 70, 229, 0.1)",
    bg20: "rgba(79, 70, 229, 0.2)",
  },
  emerald: {
    name: "Abyssal Slate",
    desc: "Deep slate ocean dark mode with cyan/emerald highlights",
    bgMain: "#020617",
    bgPanel: "#0f172a",
    bgHover: "#1e293b",
    bgInput: "#0f172a",
    bgMuted: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderHover: "rgba(255, 255, 255, 0.1)",
    textMain: "#f8fafc",
    textMuted: "#94a3b8",
    textFaint: "#64748b",
    primary: "#06b6d4",
    hover: "#22d3ee",
    text400: "#22d3ee",
    text500: "#06b6d4",
    border500: "#06b6d4",
    glow25: "rgba(6, 182, 212, 0.25)",
    glow40: "rgba(6, 182, 212, 0.4)",
    bg10: "rgba(6, 182, 212, 0.1)",
    bg20: "rgba(6, 182, 212, 0.2)",
  },
  rose: {
    name: "Volcanic Ash",
    desc: "Warm stone dark mode with deep crimson magma accents",
    bgMain: "#1c1917",
    bgPanel: "#292524",
    bgHover: "#44403c",
    bgInput: "#292524",
    bgMuted: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderHover: "rgba(255, 255, 255, 0.1)",
    textMain: "#fafaf9",
    textMuted: "#a8a29e",
    textFaint: "#78716c",
    primary: "#e11d48",
    hover: "#f43f5e",
    text400: "#fb7185",
    text500: "#f43f5e",
    border500: "#f43f5e",
    glow25: "rgba(225, 29, 72, 0.25)",
    glow40: "rgba(225, 29, 72, 0.4)",
    bg10: "rgba(225, 29, 72, 0.1)",
    bg20: "rgba(225, 29, 72, 0.2)",
  },
  amber: {
    name: "Cyberpunk Gold",
    desc: "Vibrant yellow and deep amber layout with glowing accents",
    bgMain: "#141004",
    bgPanel: "#211a0a",
    bgHover: "#332912",
    bgInput: "#211a0a",
    bgMuted: "rgba(245, 158, 11, 0.08)",
    borderColor: "rgba(245, 158, 11, 0.15)",
    borderHover: "rgba(245, 158, 11, 0.3)",
    textMain: "#fffbeb",
    textMuted: "#d4b872",
    textFaint: "#8f8362",
    primary: "#f59e0b",
    hover: "#fbbf24",
    text400: "#fbbf24",
    text500: "#f59e0b",
    border500: "#f59e0b",
    glow25: "rgba(245, 158, 11, 0.25)",
    glow40: "rgba(245, 158, 11, 0.4)",
    bg10: "rgba(245, 158, 11, 0.1)",
    bg20: "rgba(245, 158, 11, 0.2)",
  },
  dracula: {
    name: "Dracula Purple",
    desc: "The legendary developer dark theme with neon pink tones",
    bgMain: "#282a36",
    bgPanel: "#44475a",
    bgHover: "#6272a4",
    bgInput: "#44475a",
    bgMuted: "rgba(189, 147, 249, 0.1)",
    borderColor: "rgba(189, 147, 249, 0.15)",
    borderHover: "rgba(189, 147, 249, 0.3)",
    textMain: "#f8f8f2",
    textMuted: "#bfbfbf",
    textFaint: "#6272a4",
    primary: "#ff79c6",
    hover: "#ff92df",
    text400: "#ff92df",
    text500: "#ff79c6",
    border500: "#ff79c6",
    glow25: "rgba(255, 121, 198, 0.25)",
    glow40: "rgba(255, 121, 198, 0.4)",
    bg10: "rgba(255, 121, 198, 0.1)",
    bg20: "rgba(255, 121, 198, 0.2)",
  },
  forest: {
    name: "Deep Forest",
    desc: "Lush dark pine green environment with bright lime highlights",
    bgMain: "#052e16",
    bgPanel: "#064e3b",
    bgHover: "#065f46",
    bgInput: "#064e3b",
    bgMuted: "rgba(16, 185, 129, 0.08)",
    borderColor: "rgba(16, 185, 129, 0.15)",
    borderHover: "rgba(16, 185, 129, 0.3)",
    textMain: "#ecfdf5",
    textMuted: "#a7f3d0",
    textFaint: "#34d399",
    primary: "#10b981",
    hover: "#34d399",
    text400: "#34d399",
    text500: "#10b981",
    border500: "#10b981",
    glow25: "rgba(16, 185, 129, 0.25)",
    glow40: "rgba(16, 185, 129, 0.4)",
    bg10: "rgba(16, 185, 129, 0.1)",
    bg20: "rgba(16, 185, 129, 0.2)",
  },
  monochrome: {
    name: "Pure OLED Black",
    desc: "Maximum contrast pitch black workspace for OLED displays",
    bgMain: "#000000",
    bgPanel: "#0a0a0a",
    bgHover: "#171717",
    bgInput: "#0a0a0a",
    bgMuted: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderHover: "rgba(255, 255, 255, 0.15)",
    textMain: "#ffffff",
    textMuted: "#a3a3a3",
    textFaint: "#737373",
    primary: "#f5f5f5",
    hover: "#ffffff",
    text400: "#f5f5f5",
    text500: "#e5e5e5",
    border500: "#e5e5e5",
    glow25: "rgba(255, 255, 255, 0.15)",
    glow40: "rgba(255, 255, 255, 0.25)",
    bg10: "rgba(255, 255, 255, 0.1)",
    bg20: "rgba(255, 255, 255, 0.2)",
  },
  cherry: {
    name: "Cherry Blossom",
    desc: "Deep dark maroon aesthetics with soft spring pink accents",
    bgMain: "#2e0b16",
    bgPanel: "#4a1224",
    bgHover: "#6b1933",
    bgInput: "#4a1224",
    bgMuted: "rgba(244, 114, 182, 0.1)",
    borderColor: "rgba(244, 114, 182, 0.15)",
    borderHover: "rgba(244, 114, 182, 0.3)",
    textMain: "#fdf2f8",
    textMuted: "#fbcfe8",
    textFaint: "#f472b6",
    primary: "#ec4899",
    hover: "#f472b6",
    text400: "#f472b6",
    text500: "#ec4899",
    border500: "#ec4899",
    glow25: "rgba(236, 72, 153, 0.25)",
    glow40: "rgba(236, 72, 153, 0.4)",
    bg10: "rgba(236, 72, 153, 0.1)",
    bg20: "rgba(236, 72, 153, 0.2)",
  },
  synthwave: {
    name: "Synthwave Neon",
    desc: "Retro 80s futuristic dark violet with neon cyan accents",
    bgMain: "#1e1b4b",
    bgPanel: "#312e81",
    bgHover: "#3730a3",
    bgInput: "#312e81",
    bgMuted: "rgba(34, 211, 238, 0.1)",
    borderColor: "rgba(34, 211, 238, 0.2)",
    borderHover: "rgba(34, 211, 238, 0.4)",
    textMain: "#e0e7ff",
    textMuted: "#c7d2fe",
    textFaint: "#818cf8",
    primary: "#06b6d4",
    hover: "#22d3ee",
    text400: "#22d3ee",
    text500: "#06b6d4",
    border500: "#06b6d4",
    glow25: "rgba(6, 182, 212, 0.4)",
    glow40: "rgba(6, 182, 212, 0.6)",
    bg10: "rgba(6, 182, 212, 0.15)",
    bg20: "rgba(6, 182, 212, 0.25)",
  },
  sepia: {
    name: "Vintage Espresso",
    desc: "A highly readable warm coffee dark mode for eye comfort",
    bgMain: "#27211b",
    bgPanel: "#3d342b",
    bgHover: "#4f4337",
    bgInput: "#3d342b",
    bgMuted: "rgba(217, 119, 6, 0.08)",
    borderColor: "rgba(217, 119, 6, 0.15)",
    borderHover: "rgba(217, 119, 6, 0.3)",
    textMain: "#fdf8f5",
    textMuted: "#d4c1b4",
    textFaint: "#a69182",
    primary: "#d97706",
    hover: "#f59e0b",
    text400: "#f59e0b",
    text500: "#d97706",
    border500: "#d97706",
    glow25: "rgba(217, 119, 6, 0.25)",
    glow40: "rgba(217, 119, 6, 0.4)",
    bg10: "rgba(217, 119, 6, 0.1)",
    bg20: "rgba(217, 119, 6, 0.2)",
  },
  light: {
    name: "Clean Snow (Light Mode)",
    desc: "Pristine white workspace with high contrast dark text and indigo accents",
    bgMain: "#f8fafc",
    bgPanel: "#ffffff",
    bgHover: "#f1f5f9",
    bgInput: "#ffffff",
    bgMuted: "rgba(0, 0, 0, 0.04)",
    borderColor: "rgba(0, 0, 0, 0.08)",
    borderHover: "rgba(0, 0, 0, 0.18)",
    textMain: "#0f172a",
    textMuted: "#334155",
    textFaint: "#64748b",
    primary: "#4f46e5",
    hover: "#6366f1",
    text400: "#4f46e5",
    text500: "#4338ca",
    border500: "#4f46e5",
    glow25: "rgba(79, 70, 229, 0.15)",
    glow40: "rgba(79, 70, 229, 0.25)",
    bg10: "rgba(79, 70, 229, 0.08)",
    bg20: "rgba(79, 70, 229, 0.15)",
  },
};

const FONTS = {
  outfit: {
    name: "Outfit (Default)",
    desc: "A clean, modern, and friendly geometric sans-serif",
    family: "'Outfit', sans-serif",
  },
  inter: {
    name: "Inter",
    desc: "The absolute gold-standard of crisp, highly-legible UI typography",
    family: "'Inter', sans-serif",
  },
  jakarta: {
    name: "Plus Jakarta Sans",
    desc: "A gorgeous, wide, and premium modern aesthetic",
    family: "'Plus Jakarta Sans', sans-serif",
  },
  space: {
    name: "Space Grotesk",
    desc: "A tech-forward, futuristic developer geometric font",
    family: "'Space Grotesk', sans-serif",
  },
  dmsans: {
    name: "DM Sans",
    desc: "A highly legible, beautifully minimal geometric sans",
    family: "'DM Sans', sans-serif",
  },
  jetbrains: {
    name: "JetBrains Mono",
    desc: "A cool hacker terminal aesthetic for ultimate developer focus",
    family: "'JetBrains Mono', monospace",
  },
  playfair: {
    name: "Playfair Display",
    desc: "A high-end luxury serif for a classic, sophisticated vibe",
    family: "'Playfair Display', serif",
  },
};

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const email = useSelector(selectCurrentEmail) || "user@example.com";
  const user = useSelector(selectCurrentUser) || "User";
  const token = useSelector(selectCurrentToken);

  const handleLogout = () => {
    navigate("/");
    setTimeout(() => {
      dispatch(logoutAction());
    }, 0);
  };

  // Active view state
  const [activeView, setActiveView] = React.useState("chatbot");

  // Active theme state
  const [activeTheme, setActiveTheme] = React.useState(() => {
    return localStorage.getItem("ayp-active-theme") || "indigo";
  });

  React.useEffect(() => {
    localStorage.setItem("ayp-active-theme", activeTheme);
  }, [activeTheme]);

  const themeConfig = THEMES[activeTheme] || THEMES.indigo;

  // Active font state
  const [activeFont, setActiveFont] = React.useState(() => {
    return localStorage.getItem("ayp-active-font") || "outfit";
  });

  React.useEffect(() => {
    localStorage.setItem("ayp-active-font", activeFont);
  }, [activeFont]);

  const fontConfig = FONTS[activeFont] || FONTS.outfit;

  const dynamicStyles = `
    /* Live Theme Accent Overrides for ${activeTheme} */
    .bg-indigo-600 { background-color: ${themeConfig.primary} !important; }
    .hover\\:bg-indigo-500:hover { background-color: ${themeConfig.hover} !important; }
    .text-indigo-400 { color: ${themeConfig.text400} !important; }
    .text-indigo-500 { color: ${themeConfig.text500} !important; }
    .border-indigo-500 { border-color: ${themeConfig.border500} !important; }
    .border-indigo-500\\/30 { border-color: ${themeConfig.border500}4d !important; }
    .border-indigo-500\\/20 { border-color: ${themeConfig.border500}33 !important; }
    .border-indigo-500\\/10 { border-color: ${themeConfig.border500}1a !important; }
    .bg-indigo-600\\/10 { background-color: ${themeConfig.bg10} !important; }
    .bg-indigo-600\\/20 { background-color: ${themeConfig.bg20} !important; }
    .bg-indigo-500\\/5 { background-color: ${themeConfig.border500}0d !important; }
    .bg-indigo-500\\/10 { background-color: ${themeConfig.border500}1a !important; }
    .shadow-indigo-600\\/25 { --tw-shadow-color: ${themeConfig.glow25} !important; box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color) !important; }
    .shadow-indigo-600\\/40 { --tw-shadow-color: ${themeConfig.glow40} !important; }
    .accent-indigo-500 { accent-color: ${themeConfig.primary} !important; }
    .accent-indigo-600 { accent-color: ${themeConfig.primary} !important; }
    .text-indigo-600 { color: ${themeConfig.primary} !important; }
    .hover\\:text-indigo-400:hover { color: ${themeConfig.text400} !important; }

    /* Structural Full Space Overrides */
    .bg-\\[\\#0B0C11\\] { background-color: ${themeConfig.bgMain} !important; }
    .bg-\\[\\#13141A\\] { background-color: ${themeConfig.bgPanel} !important; }
    .bg-\\[\\#181a24\\] { background-color: ${themeConfig.bgHover} !important; }
    .bg-\\[\\#1C1D24\\] { background-color: ${themeConfig.bgInput} !important; }
    .hover\\:bg-\\[\\#13141A\\]:hover { background-color: ${themeConfig.bgPanel} !important; }
    .hover\\:bg-\\[\\#181a24\\]:hover { background-color: ${themeConfig.bgHover} !important; }
    .border-white\\/5 { border-color: ${themeConfig.borderColor} !important; }
    .border-white\\/10 { border-color: ${themeConfig.borderHover} !important; }
    .hover\\:border-white\\/10:hover { border-color: ${themeConfig.borderHover} !important; }
    .bg-white\\/5 { background-color: ${themeConfig.bgMuted} !important; }
    .bg-white\\/\\[0\\.05\\] { background-color: ${themeConfig.bgMuted} !important; }
    .bg-white\\/\\[0\\.01\\] { background-color: ${themeConfig.bgMuted} !important; }
    .text-white { color: ${themeConfig.textMain} !important; }
    .bg-indigo-600.text-white, .bg-indigo-600 .text-white { color: ${activeTheme === 'monochrome' ? '#000000' : '#ffffff'} !important; }
    .bg-indigo-500.text-white, .bg-indigo-500 .text-white { color: ${activeTheme === 'monochrome' ? '#000000' : '#ffffff'} !important; }
    .text-gray-400 { color: ${themeConfig.textMuted} !important; }
    .text-gray-300 { color: ${themeConfig.textMuted} !important; }
    .text-gray-200 { color: ${themeConfig.textMain} !important; }
    .text-gray-500 { color: ${themeConfig.textFaint} !important; }

    /* Global Typography Override for ${activeFont} */
    body, .font-sans, h1, h2, h3, h4, h5, h6, p, span, div, button, input {
      font-family: ${fontConfig.family} !important;
    }
    
    /* Preserve monospace elements explicitly unless JetBrains is selected globally */
    ${
      activeFont !== "jetbrains"
        ? `
    code, pre, .font-mono {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
    }
    `
        : ""
    }
  `;

  // Multi-chat states lifted from Chatbot
  const [chatSessions, setChatSessions] = React.useState([]);
  const [activeChatId, setActiveChatId] = React.useState(null);
  const [remainingSlots, setRemainingSlots] = React.useState(10);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchChatSessions = async (selectNewId = null) => {
    if (!token) return;
    try {
      const response = await fetch("http://localhost:8000/chat-sessions", {
        credentials: 'include',
      });
      if (response.status === 401) {
        dispatch(logoutAction());
        return;
      }
      if (response.ok) {
        const data = await response.json();
        setChatSessions(data.sessions || []);
        setRemainingSlots(data.remaining !== undefined ? data.remaining : 10);

        if (selectNewId) {
          setActiveChatId(selectNewId);
        } else if (data.sessions && data.sessions.length > 0 && !activeChatId) {
          setActiveChatId(data.sessions[0].chat_id);
        }
      }
    } catch (error) {
      console.error("Failed to fetch chat sessions:", error);
    }
  };

  const handleDeleteSession = async (chatId, filename) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the chat for "${filename}"? This will delete the document and all message history.`,
      )
    )
      return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/chat-sessions/${chatId}`,
        {
          method: "DELETE",
          credentials: 'include',
        },
      );
      if (response.status === 401) {
        dispatch(logoutAction());
        return;
      }
      if (response.ok) {
        if (activeChatId === chatId) {
          setActiveChatId(null);
        }
        await fetchChatSessions();
        toast.success(`File "${filename}" deleted successfully!`);
      } else {
        const errorData = await response.json();
        toast.error(
          `Failed to delete chat: ${errorData.detail || "Unknown error"}`,
        );
      }
    } catch (error) {
      console.error("Delete session error:", error);
      toast.error("Error deleting chat session.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStar = async (chatId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/chat-sessions/${chatId}/star`,
        {
          method: "PUT",
          credentials: 'include',
        },
      );
      if (response.status === 401) {
        dispatch(logoutAction());
        return;
      }
      if (response.ok) {
        await fetchChatSessions();
      } else {
        const errorData = await response.json();
        alert(`Failed to toggle star: ${errorData.detail || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Star toggle error:", error);
    }
  };

  React.useEffect(() => {
    fetchChatSessions();
  }, [token]);

  // Find active group and sub-item for breadcrumb display
  const activeGroup = DATA.navMain.find((group) =>
    group.items?.some((subItem) => subItem.id === activeView),
  );
  const activeSubItem = activeGroup?.items?.find(
    (subItem) => subItem.id === activeView,
  );

  // Render content based on selected state view
  const renderContent = () => {
    switch (activeView) {
      case "chatbot":
        return (
          <Chatbot
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
            chatSessions={chatSessions}
            fetchChatSessions={fetchChatSessions}
            remainingSlots={remainingSlots}
            handleToggleStar={handleToggleStar}
          />
        );
      case "chatbot-new":
        return (
          <Chatbot
            initialCreateView={true}
            activeChatId={activeChatId}
            setActiveChatId={setActiveChatId}
            chatSessions={chatSessions}
            fetchChatSessions={fetchChatSessions}
            remainingSlots={remainingSlots}
            handleToggleStar={handleToggleStar}
          />
        );
      case "playground-history":
        return (
          <div className="flex flex-col gap-6 w-full">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                Playground History
              </h2>
              <p className="text-gray-400 font-light text-sm">
                Access your past document analyses and active conversation
                rooms. ({10 - remainingSlots}/10 active)
              </p>
            </div>

            {chatSessions.length === 0 ? (
              <div className="min-h-[300px] rounded-2xl bg-[#13141A]/50 border border-white/5 p-8 text-gray-400 font-light flex flex-col justify-center items-center gap-4">
                <Bot className="size-10 text-indigo-500 animate-pulse" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    No Conversations Yet
                  </h3>
                  <p className="text-sm text-gray-400 max-w-sm">
                    You don't have any document-scoped chat sessions running.
                    Start one now to ask questions!
                  </p>
                </div>
                <button
                  onClick={() => setActiveView("chatbot-new")}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl cursor-pointer transition-all flex items-center gap-2"
                >
                  <Plus className="size-4" /> Start a Conversation
                </button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {chatSessions.map((session) => {
                  const dateStr = session.created_at;
                  let formattedDate = "";
                  try {
                    if (dateStr) {
                      const date = new Date(dateStr);
                      formattedDate = date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                    }
                  } catch (e) {}

                  return (
                    <div
                      key={session.chat_id}
                      className="group relative rounded-2xl bg-[#13141A] border border-white/5 p-5 flex flex-col justify-between hover:border-white/10 hover:shadow-lg hover:shadow-indigo-500/[0.02] transition-all duration-200"
                    >
                      <button
                        onClick={() => handleToggleStar(session.chat_id)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-yellow-400 p-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-all shrink-0 z-10"
                        title={
                          session.is_starred
                            ? "Unstar Conversation"
                            : "Star Conversation"
                        }
                      >
                        <Star
                          className={`size-4 ${session.is_starred ? "text-yellow-400 fill-yellow-400" : ""}`}
                        />
                      </button>

                      <div className="flex items-start gap-3">
                        <div className="size-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                          <FileText className="size-5 text-indigo-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4
                            className="text-white text-sm font-semibold truncate pr-6"
                            title={session.filename}
                          >
                            {session.filename}
                          </h4>
                          <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-1">
                            <Calendar className="size-3 shrink-0" />
                            <span>{formattedDate || "Recently created"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-6">
                        <button
                          onClick={() => {
                            setActiveChatId(session.chat_id);
                            setActiveView("chatbot");
                          }}
                          className="flex-1 py-2 rounded-xl bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <MessageSquare className="size-3.5" />
                          <span>Open Chat</span>
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteSession(
                              session.chat_id,
                              session.filename,
                            )
                          }
                          className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-all cursor-pointer"
                          title="Delete session"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      case "playground-starred":
        const starredSessions = chatSessions.filter((s) => s.is_starred);
        return (
          <div className="flex flex-col gap-6 w-full">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                Starred Conversations
              </h2>
              <p className="text-gray-400 font-light text-sm">
                Your pinned analyses and most important insights.
              </p>
            </div>

            {starredSessions.length === 0 ? (
              <div className="min-h-[300px] rounded-2xl bg-[#13141A]/50 border border-white/5 p-8 text-gray-400 font-light flex flex-col justify-center items-center gap-4">
                <Star className="size-10 text-yellow-500 animate-pulse" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    No Starred Chats
                  </h3>
                  <p className="text-sm text-gray-400 max-w-sm">
                    Star your most important analyses inside active chats or
                    from Playground History to pin them here!
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {starredSessions.map((session) => {
                  const dateStr = session.created_at;
                  let formattedDate = "";
                  try {
                    if (dateStr) {
                      const date = new Date(dateStr);
                      formattedDate = date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                    }
                  } catch (e) {}

                  return (
                    <div
                      key={session.chat_id}
                      className="group relative rounded-2xl bg-[#13141A] border border-white/5 p-5 flex flex-col justify-between hover:border-white/10 hover:shadow-lg hover:shadow-indigo-500/[0.02] transition-all duration-200"
                    >
                      <button
                        onClick={() => handleToggleStar(session.chat_id)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-yellow-400 p-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-all shrink-0 z-10"
                        title={
                          session.is_starred
                            ? "Unstar Conversation"
                            : "Star Conversation"
                        }
                      >
                        <Star className="size-4 text-yellow-400 fill-yellow-400" />
                      </button>

                      <div className="flex items-start gap-3">
                        <div className="size-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                          <FileText className="size-5 text-indigo-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4
                            className="text-white text-sm font-semibold truncate pr-6"
                            title={session.filename}
                          >
                            {session.filename}
                          </h4>
                          <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-1">
                            <Calendar className="size-3 shrink-0" />
                            <span>{formattedDate || "Recently created"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-6">
                        <button
                          onClick={() => {
                            setActiveChatId(session.chat_id);
                            setActiveView("chatbot");
                          }}
                          className="flex-1 py-2 rounded-xl bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <MessageSquare className="size-3.5" />
                          <span>Open Chat</span>
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteSession(
                              session.chat_id,
                              session.filename,
                            )
                          }
                          className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-all cursor-pointer"
                          title="Delete session"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      case "playground-settings":
        return (
          <div className="flex flex-col gap-6 w-full">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                Playground Settings
              </h2>
              <p className="text-gray-400 font-light text-sm">
                Configure your active AI engine parameters.
              </p>
            </div>
            <div className="rounded-2xl bg-[#13141A] border border-white/5 p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2 max-w-md">
                <label className="text-white font-medium text-sm">
                  Model Selection
                </label>
                <div className="bg-[#1C1D24] border border-white/5 px-4 py-2.5 rounded-lg text-sm text-gray-300">
                  gpt-4o-mini (default)
                </div>
              </div>
              <div className="flex flex-col gap-2 max-w-md">
                <label className="text-white font-medium text-sm">
                  Temperature (Creativity)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    className="w-full accent-indigo-600"
                    defaultValue={70}
                  />
                  <span className="text-xs text-indigo-400 font-mono">0.7</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "doc-intro":
      case "doc-get-started":
      case "doc-tutorials":
        return (
          <DocumentationPortal
            activeView={activeView}
            setActiveView={setActiveView}
          />
        );
      case "doc-changelog":
        return (
          <div className="flex flex-col gap-6 max-w-2xl">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                Changelog
              </h2>
              <p className="text-gray-400 font-light text-sm">
                Follow updates made to the platform.
              </p>
            </div>
            <div className="border-l border-indigo-500/30 pl-6 flex flex-col gap-2 mt-2">
              <span className="text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                v1.2.0 — May 2026
              </span>
              <h4 className="text-white font-medium">
                State-Based SPA Layout & Collapsible Sidebar
              </h4>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Removed static placeholder routes. Fully integrated single-page
                React state tracking (`activeView`) for dynamic layout updates
                without changing the browser URL.
              </p>
            </div>
          </div>
        );
      case "settings-general":
        return (
          <div className="flex flex-col gap-8 w-full max-w-4xl animate-fade-in pb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
                General Settings
              </h2>
              <p className="text-gray-400 font-light text-sm">
                Manage your account profile, workspace security, and uploaded
                document knowledge base.
              </p>
            </div>

            {/* Profile & Account Details Grid */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* User Identity Card */}
              <div className="md:col-span-1 bg-[#13141A] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center gap-4 relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent pointer-events-none" />

                {/* Large Avatar */}
                <div className="h-16 w-16 rounded-full bg-indigo-600 text-white font-black flex items-center justify-center text-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] border border-indigo-500/30">
                  {(user?.[0] || email?.[0] || "U").toUpperCase()}
                </div>

                <div className="flex flex-col gap-1 min-w-0 w-full">
                  <h3
                    className="text-white font-bold text-lg truncate"
                    title={user}
                  >
                    {user}
                  </h3>
                  <span
                    className="text-gray-400 text-xs font-light truncate"
                    title={email}
                  >
                    {email}
                  </span>
                </div>

                <div className="flex flex-col gap-2 w-full pt-2 border-t border-white/5 mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Account Type</span>
                    <span className="text-indigo-400 font-bold bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 uppercase tracking-wider text-[9px]">
                      User
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Security Shield</span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-wider text-[9px]">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Workspace quota/progress */}
              <div className="md:col-span-2 bg-[#13141A] border border-white/5 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                <div className="flex flex-col gap-4">
                  <h3 className="text-white font-bold text-md flex items-center gap-2">
                    <Layers className="size-5 text-indigo-400" />
                    <span>Workspace Allocation</span>
                  </h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    AskYourPdf gives you a secure personal sandbox to upload
                    your reference files. You are currently utilizing our
                    private high-performance vectors storage nodes.
                  </p>
                </div>

                {/* Quota bar */}
                <div className="flex flex-col gap-2.5 mt-6">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">
                      Files Uploaded: {chatSessions.length} /{" "}
                      {chatSessions.length + remainingSlots}
                    </span>
                    <span className="text-indigo-400 font-semibold">
                      {Math.round(
                        (chatSessions.length /
                          (chatSessions.length + remainingSlots || 10)) *
                          100,
                      )}
                      % Capacity
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                      style={{
                        width: `${(chatSessions.length / (chatSessions.length + remainingSlots || 10)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Document Management Section */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-lg font-bold flex items-center gap-2">
                  <FileText className="size-5 text-indigo-400" />
                  <span>Document Knowledge Base</span>
                </h3>
                <span className="text-xs text-gray-500 bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg">
                  {chatSessions.length} total files
                </span>
              </div>

              {chatSessions.length === 0 ? (
                <div className="min-h-[220px] rounded-2xl border border-dashed border-white/10 bg-[#13141A]/30 flex flex-col items-center justify-center text-center p-6 gap-3">
                  <FileText className="size-10 text-gray-600 animate-pulse" />
                  <span className="text-white font-bold text-sm">
                    No documents uploaded yet
                  </span>
                  <span className="text-gray-500 text-xs font-light max-w-sm px-6">
                    Ready to query PDFs? Navigate back to the Playground Chat
                    view, upload your manual or research document, and start
                    analyzing.
                  </span>
                  <button
                    onClick={() => setActiveView("chatbot")}
                    className="mt-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl cursor-pointer transition-all shadow-lg shadow-indigo-600/25"
                  >
                    Go to Chat Upload
                  </button>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {chatSessions.map((session) => {
                    const dateStr = session.created_at;
                    let formattedDate = "";
                    try {
                      if (dateStr) {
                        const date = new Date(dateStr);
                        formattedDate = date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                      }
                    } catch (e) {}

                    return (
                      <div
                        key={session.chat_id}
                        className="group relative rounded-xl bg-[#13141A] border border-white/5 p-4 flex flex-col justify-between hover:border-white/10 hover:shadow-lg transition-all duration-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="size-9 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                            <FileText className="size-4.5 text-indigo-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4
                              className="text-white text-sm font-semibold truncate pr-4"
                              title={session.filename}
                            >
                              {session.filename}
                            </h4>
                            <span className="text-gray-500 text-[10px] font-mono block mt-0.5">
                              {formattedDate || "Recently uploaded"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
                          <button
                            onClick={() => {
                              setActiveChatId(session.chat_id);
                              setActiveView("chatbot");
                            }}
                            className="flex-1 py-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <MessageSquare className="size-3" />
                            <span>Open Chat</span>
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteSession(
                                session.chat_id,
                                session.filename,
                              )
                            }
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-all cursor-pointer"
                            title="Delete Document"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      case "settings-themes":
        return (
          <div className="flex flex-col gap-8 w-full max-w-4xl animate-fade-in pb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
                Workspace Theme Selection
              </h2>
              <p className="text-gray-400 font-light text-sm">
                Choose a high-end customized color accent to personalize your
                entire dashboard experience.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 mt-2">
              {Object.entries(THEMES).map(([themeKey, themeItem]) => {
                const isSelected = activeTheme === themeKey;
                return (
                  <button
                    key={themeKey}
                    onClick={() => setActiveTheme(themeKey)}
                    className={`p-4 rounded-2xl text-left border flex flex-col justify-between gap-4 transition-all cursor-pointer relative overflow-hidden h-40 ${
                      isSelected
                        ? "bg-[#181a24] border-indigo-500 shadow-xl shadow-indigo-600/15 scale-[1.02]"
                        : "bg-[#13141A]/50 border-white/5 hover:bg-[#13141A] hover:border-white/10 hover:shadow-lg"
                    }`}
                  >
                    {/* Check badge/Color indicator */}
                    <div className="flex items-center justify-between w-full">
                      <div
                        className="size-8 rounded-full border border-white/10 shrink-0 shadow-lg"
                        style={{ backgroundColor: themeItem.primary }}
                      />
                      {isSelected && (
                        <span className="text-indigo-400 text-[10px] font-bold bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20 uppercase tracking-wider">
                          Active
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 flex flex-col justify-end mt-2">
                      <h4 className="text-white text-base font-bold truncate">
                        {themeItem.name}
                      </h4>
                      <p className="text-gray-400 text-xs font-light line-clamp-2 leading-relaxed mt-1">
                        {themeItem.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      case "settings-font":
        return (
          <div className="flex flex-col gap-8 w-full max-w-4xl animate-fade-in pb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
                Typography Engine
              </h2>
              <p className="text-gray-400 font-light text-sm">
                Select a premium Google Font to instantly reshape the aesthetics
                and readability of your dashboard.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mt-2">
              {Object.entries(FONTS).map(([fontKey, fontItem]) => {
                const isSelected = activeFont === fontKey;
                return (
                  <button
                    key={fontKey}
                    onClick={() => setActiveFont(fontKey)}
                    className={`p-4 rounded-2xl text-left border flex flex-col justify-between gap-4 transition-all cursor-pointer relative overflow-hidden h-40 ${
                      isSelected
                        ? "bg-[#181a24] border-indigo-500 shadow-xl shadow-indigo-600/15 scale-[1.02]"
                        : "bg-[#13141A]/50 border-white/5 hover:bg-[#13141A] hover:border-white/10 hover:shadow-lg"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div
                        className="flex items-center justify-center size-10 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg"
                        style={{ fontFamily: fontItem.family }}
                      >
                        Aa
                      </div>
                      {isSelected && (
                        <span className="text-indigo-400 text-[10px] font-bold bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20 uppercase tracking-wider">
                          Active
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 flex flex-col justify-end mt-2">
                      <h4
                        className="text-white text-base font-bold truncate"
                        style={{ fontFamily: fontItem.family }}
                      >
                        {fontItem.name}
                      </h4>
                      <p
                        className="text-gray-400 text-xs font-light line-clamp-2 leading-relaxed mt-1"
                        style={{ fontFamily: fontItem.family }}
                      >
                        {fontItem.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      default:
        return (
          <div className="min-h-[400px] rounded-2xl bg-[#13141A] border border-white/5 p-6 text-gray-400 font-light flex flex-col items-center justify-center gap-2">
            <h3 className="text-md font-semibold text-white">
              Dynamic Content Panel
            </h3>
            <p className="text-sm text-gray-500">
              Active View ID:{" "}
              <code className="text-indigo-400 bg-indigo-600/10 px-2 py-1 rounded">
                {activeView}
              </code>
            </p>
          </div>
        );
    }
  };

  return (
    <SidebarProvider
      style={{
        "--sidebar": themeConfig.bgMain,
        "--sidebar-accent": themeConfig.bgPanel,
        "--sidebar-accent-foreground": themeConfig.textMain,
        "--sidebar-border": themeConfig.borderColor,
        "--background": themeConfig.bgMain,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: dynamicStyles }} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#1E1F29",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
          },
        }}
      />
      <Sidebar collapsible="icon" className="border-r border-gray-500">
        <SidebarHeader className="h-16 flex flex-row items-center justify-between px-4 border-b border-gray-500 overflow-hidden shrink-0">
          <div 
            className="flex items-center gap-2 min-w-0 cursor-pointer hover:opacity-80 transition-opacity group-data-[collapsible=icon]:-ml-1"
            onClick={() => navigate("/")}
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-indigo-600 text-white shrink-0 shadow-[0_0_15px_rgba(79,70,229,0.4)]">
              <Bot className="size-4" />
            </div>
            <span className="truncate font-bold text-white text-md tracking-tight group-data-[collapsible=icon]:hidden transition-opacity duration-200">
              AskYourPdf
            </span>
          </div>

          <button
            onClick={() => setActiveView("chatbot-new")}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/5 transition-all group-data-[collapsible=icon]:hidden cursor-pointer"
            title="New Chat"
          >
            <SquarePen className="size-4" />
          </button>
        </SidebarHeader>

        <SidebarContent>
          {/* Nav Main */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-400 text-xs tracking-wider uppercase px-2 mb-2 font-semibold group-data-[collapsible=icon]:hidden">
              Platform
            </SidebarGroupLabel>
            <SidebarMenu>
              {DATA.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className="text-gray-300 hover:text-gray-500 hover:bg-white/5"
                        onClick={() => {
                          if (item.title === "Documentation") {
                            setActiveView("doc-intro");
                          }
                        }}
                      >
                        {item.icon && (
                          <item.icon className="text-gray-400 size-4 group-hover/collapsible:text-white" />
                        )}
                        <span className="font-medium text-sm group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                        <ChevronRight className="ml-auto text-gray-500 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className="border-l border-gray-500 ml-4 pl-3 group-data-[collapsible=icon]:hidden">
                        {item.items?.map((subItem) => {
                          const isSelected = activeView === subItem.id;
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={`text-gray-400 hover:text-gray-500 py-1.5 cursor-pointer rounded-md transition-colors ${
                                  isSelected
                                    ? "bg-white/5 text-gray-500 font-medium"
                                    : ""
                                }`}
                                onClick={() => setActiveView(subItem.id)}
                              >
                                <div className="flex w-full text-left">
                                  <span className="text-sm font-light">
                                    {subItem.title}
                                  </span>
                                </div>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          {/* Nav Main */}
        </SidebarContent>

        <SidebarFooter>
          {/* Nav User */}
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground text-gray-300 hover:text-white"
                  >
                    <div className="h-8 w-8 rounded-full bg-white text-black font-extrabold flex items-center justify-center text-xs shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                      {(user?.[0] || email?.[0] || "U").toUpperCase()}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold text-white">
                        {user}
                      </span>
                      <span className="truncate text-xs text-gray-400">
                        {email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4 text-gray-400" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-[#13141A] border border-white/10 text-white"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-2 py-2 text-left text-sm">
                      <div className="h-8 w-8 rounded-full bg-white text-black font-extrabold flex items-center justify-center text-xs shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        {(user?.[0] || email?.[0] || "U").toUpperCase()}
                      </div>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold text-white">
                          {user}
                        </span>
                        <span className="truncate text-xs text-gray-400">
                          {email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="gap-2 p-2 hover:bg-white/5 cursor-pointer rounded-md">
                      <Sparkles className="size-4 text-indigo-400" />
                      <span className="text-sm">Upgrade to Pro</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem 
                      className="gap-2 p-2 hover:bg-white/5 cursor-pointer rounded-md"
                      onClick={() => setActiveView("settings-general")}
                    >
                      <BadgeCheck className="size-4 text-gray-400" />
                      <span className="text-sm">Account</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="gap-2 p-2 hover:bg-red-500/10 hover:text-red-400 cursor-pointer rounded-md"
                  >
                    <LogOut className="size-4 text-red-400" />
                    <span className="text-sm font-medium">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
          {/* Nav User */}
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="bg-[#0B0C11] text-white">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-500 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-[#0B0C11]">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-gray-400 hover:text-gray-500" />
            <Separator
              orientation="vertical"
              className="mr-2 h-4 bg-white/10"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink className="text-gray-400 hover:text-white text-sm font-light">
                    {activeGroup?.title || "Platform"}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-gray-600" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white text-sm font-medium">
                    {activeSubItem?.title || "General"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-6 bg-[#0B0C11] overflow-y-auto">
          {renderContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Chat;
