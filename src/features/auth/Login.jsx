import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, selectCurrentToken } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { LoginForm } from "@/components/login-form";
import ClickSpark from "@/components/ui/ClickSpark";
import LightRays from "@/components/ui/LightRays";
import Antigravity from "@/components/Antigravity";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const [login, { isLoading }] = useLoginMutation();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // If already logged in, skip the login page and go to Welcome Let's also check localStorage natively
  useEffect(() => {
    if (token) {
      navigate("/chat");
    }
  }, [token, navigate]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ user, pwd }).unwrap();
      console.log("Login Success! Response:", userData);
      dispatch(setCredentials(userData));
      setUser("");
      setPwd("");
      navigate("/chat");
    } catch (err) {
      console.error("Login Failed:", err);
      setErrMsg(err?.data?.detail || "Login Failed. Please check your credentials.");
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);
  const handlePwdInput = (e) => setPwd(e.target.value);

  return (
    <ClickSpark
      sparkColor="#ffffff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="relative min-h-screen w-full bg-[#0B0C11] flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background: Antigravity & LightRays */}
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
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
          <div className="absolute inset-0 w-full h-full opacity-30">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={0.5}
              lightSpread={0.4}
              rayLength={2.5}
              followMouse={true}
              mouseInfluence={0.05}
              noiseAmount={0}
              distortion={0}
              className="w-full h-full"
              pulsating={false}
              fadeDistance={1}
              saturation={1}
            />
          </div>
        </div>

        {/* Floating elements & Logo */}
        <div className="relative z-10 w-full max-w-lg flex flex-col items-center mb-8">
          <Link
            to="/"
            className="text-white font-bold text-4xl md:text-5xl tracking-tight transition-transform hover:scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-1"
          >
            AskYourPdf
          </Link>
          <p className="text-gray-400 text-base font-light">
            AI-powered PDF Intelligence
          </p>
        </div>

        {/* LoginForm Container */}
        <div className="relative z-10 w-full max-w-lg">
          <LoginForm
            user={user}
            pwd={pwd}
            onChangeUser={handleUserInput}
            onChangePwd={handlePwdInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            errMsg={errMsg}
          />
        </div>
      </div>
    </ClickSpark>
  );
};

export default Login;
