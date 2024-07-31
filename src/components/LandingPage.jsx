import React from "react";
import logo from "../assets/logo.svg";
import FullLogo from "../assets/FullLogo.svg";
import { MenuOutlined } from "@ant-design/icons";
import Lottie from "react-lottie";
import animationData from "../assets/animation.json";
import { motion } from "framer-motion";
import { Button, Typography } from "antd";
import morocco from "../assets/morocco.svg";
import woman from "../assets/Recycling-woman.svg";
import { useNavigate } from "react-router-dom";

import "./landingPage.css";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function LandingPage(props) {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <header className="header">
        <div className="user-info">
          <img className="logo" src={FullLogo} alt="user image" />
        </div>
        <MenuOutlined size="large" />
      </header>
      <motion.section
        id="home"
        className="sec1"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="sec1-content">
          <div className="text">
            <Typography.Title level={3}>
              Simplifying Recycling <br /> for Every Moroccan{" "}
              <img src={morocco} alt="morocco" className="morocco" />
            </Typography.Title>
            <Typography.Paragraph>
              Recycle you Household's waste While earning money for a greener
              morocco.
            </Typography.Paragraph>
          </div>
          <div className="buttons">
            <Button type="primary" onClick={() => navigate("/login")}>
              Get Started
            </Button>
            <Button type="text" onClick={() => navigate("/registration")}>
              Sign Up
            </Button>
          </div>
        </div>
        <Lottie
          options={defaultOptions}
          style={{
            width: "65%", // Set the width to 35% of the parent container
            margin: 0,
          }}
        />
      </motion.section>
      <motion.section
        id="home"
        className="sec2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <img
          src={woman}
          style={{
            width: "45%", // Set the width to 35% of the parent container
            margin: 0,
          }}
        />
        <div className="sec2-content">
          <div className="text">
            <Typography.Title level={3}>
              Sort, Call, Eearn, Repeat
            </Typography.Title>
            <Typography.Paragraph>
              Help us recycle your waste by sorting it and calling us to pick it
              up.
            </Typography.Paragraph>
          </div>
          <div className="buttons">
            <Button type="primary" onClick={() => navigate("login")}>
              Login
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default LandingPage;
