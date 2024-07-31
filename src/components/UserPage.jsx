import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import male from "../assets/male.svg";
import plastic from "../assets/plastic.png";
import glass from "../assets/glass.png";
import cardboard from "../assets/cardboard.png";
import metal from "../assets/metal.png";
import coin from "../assets/coin.png";
import coins from "../assets/coins.png";
import { motion } from "framer-motion";

import Webcam from "react-webcam";
import "./userPage.css";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
  SmileOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Typography, Card, Button, Statistic, FloatButton } from "antd";

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const { Meta } = Card;

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

function UserPage(props) {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  const location = useLocation();
  const { state } = location;
  let user = state;
  useEffect(() => {
    setBalance(user.Plastic + user.Glass + user.Paper + user.Metal);
  }, []);
  return (
    <div className="user-page">
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => navigate("/scanner", { state: user })}
        style={{ marginRight: "47%" }}
      ></FloatButton>

      <header className="header">
        <div className="user-info">
          <img className="user-image" src={male} alt="user image" />
          <h1> {user.UserName}</h1>
          <p>{user.Phone}</p>
        </div>
        <div>
          <Typography.Title level={1} type="success">
            {balance}
            {"  "}
            <img style={{ width: 30, height: 30 }} src={coins} />
          </Typography.Title>
        </div>
      </header>
      <main>
        <Typography.Title level={3}>
          Welcome back {user.UserName}
        </Typography.Title>
        <motion.section
          id="metrics"
          className="sec1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="user-metrics">
            <Statistic
              title="CO2 Emissions Avoided"
              value={30.78}
              suffix="Kg"
            />
            <Statistic title="Total Energy Saved" value={11.43} suffix="Kw" />

            <Statistic
              title="Enviromental Impact"
              value={4.28}
              precision={2}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />

            <Statistic
              title="Income monthly"
              value={9.3}
              precision={2}
              valueStyle={{
                color: "#cf1322",
              }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </div>
        </motion.section>
        <motion.section
          id="balance"
          className="sec2"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="user-balance">
            <Typography.Title level={3}>
              Account Balance{"  "}
              <img style={{ width: 30, height: 30 }} src={coins} />
            </Typography.Title>

            <Typography.Title level={2} type="success">
              {balance}
            </Typography.Title>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 10,
                marginTop: 20,
              }}
            >
              <Button
                icon={<DollarOutlined />}
                onClick={() => navigate("/shope", { state: user })}
              >
                Buy
              </Button>
              <Button
                type="primary"
                style={{ background: "green" }}
                icon={<SmileOutlined />}
              >
                Donate
              </Button>
            </div>
          </div>
        </motion.section>
        <motion.section
          id="stats"
          className="sec3"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="user-stats">
            <Typography.Title level={3}>Your Stats</Typography.Title>
            <div className="user-stats-container">
              <div className="row1">
                <Card
                  style={{
                    width: 150,
                    padding: 10,
                  }}
                  cover={<img alt="plastic" src={plastic} />}
                >
                  <Meta
                    title={
                      <Typography.Title level={5}>
                        {user.Plastic}
                        {"  "}
                        <img style={{ width: 15, height: 15 }} src={coin} />
                      </Typography.Title>
                    }
                    description="Plastic"
                  />
                </Card>
                <Card
                  style={{
                    width: 150,
                    padding: 10,
                  }}
                  cover={<img alt="glass" src={glass} />}
                >
                  <Meta
                    title={
                      <Typography.Title level={5}>
                        {user.Glass}
                        {"  "}
                        <img style={{ width: 15, height: 15 }} src={coin} />
                      </Typography.Title>
                    }
                    description="Glass"
                  />
                </Card>
              </div>
              <div className="row2">
                <Card
                  style={{
                    width: 150,
                    padding: 10,
                  }}
                  cover={<img alt="paper" src={cardboard} />}
                >
                  <Meta
                    title={
                      <Typography.Title level={5}>
                        {user.Paper}
                        {"  "}
                        <img style={{ width: 15, height: 15 }} src={coin} />
                      </Typography.Title>
                    }
                    description="Paper"
                  />
                </Card>
                <Card
                  style={{
                    width: 150,
                    padding: 10,
                  }}
                  cover={<img alt="metal" src={metal} />}
                >
                  <Meta
                    title={
                      <Typography.Title level={5}>
                        {user.Metal}
                        {"  "}
                        <img style={{ width: 15, height: 15 }} src={coin} />
                      </Typography.Title>
                    }
                    description="Metal"
                  />
                </Card>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default UserPage;
