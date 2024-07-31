import React, { useState } from "react";
import "./shope.css";
import { Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import male from "../assets/male.svg";
import coins from "../assets/coins.png";
import shampoobar from "../assets/shampoo-bar.webp";
import minibamboo from "../assets/Mini-Bamboo-Hair-Brush.webp";
import ReusablePaper from "../assets/Reusable-Paper-Towels.webp";
import BambooToothbrushes from "../assets/Bamboo-Toothbrushes.webp";
import HairScrunchies from "../assets/Hair-Scrunchies.webp";
import ToothpasteTablets from "../assets/Toothpaste-Tablets.jpg";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { Tag, Card, Modal, message } from "antd";
const { Meta } = Card;

function Shope(props) {
  const [selectedItemPrice, setSelectedItemPrice] = useState(0);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const success = () => {
    messageApi.open({
      type: "success",
      content:
        "The item will be shipped to your address in the next upcoming days",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "You don't Have enough coins to buy this item",
    });
  };

  const location = useLocation();
  const { state } = location;
  let user = state;
  const [balance, setBalance] = useState(
    user.Plastic + user.Glass + user.Paper + user.Metal
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if (balance >= selectedItemPrice) {
      user.Plastic -= 400;
      user.Glass -= 400;
      user.Paper -= 1000;
      user.Metal -= 200;
      success();
      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      await sleep(2000);
      navigate("/user-page", { state: user });
    } else {
      error();
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="shope-page">
      <Modal
        title="Confirmation"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {contextHolder}
        <p>
          {selectedItemName} will cost you {selectedItemPrice}{" "}
          <img style={{ width: 20, height: 20 }} src={coins} />
        </p>
      </Modal>
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
          Eco Friendly Products Available for Purchase
        </Typography.Title>
        <motion.section
          id="metrics"
          className="sec1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div class="grid-container">
            <Card
              style={{
                width: 200,
              }}
              cover={<img alt="shampoobar" src={shampoobar} />}
              actions={[
                <ShoppingCartOutlined
                  key="setting"
                  onClick={() => {
                    setSelectedItemName("Shampoo Bar");
                    setSelectedItemPrice(5000);
                    showModal();
                  }}
                />,
                <Tag color="#87d068">5000</Tag>,
              ]}
            >
              <Meta title="Shampoo Bar" description="www.earthhero.com" />
            </Card>
            <Card
              style={{
                width: 200,
              }}
              cover={<img alt="Mini-Bamboo" src={minibamboo} />}
              actions={[
                <ShoppingCartOutlined
                  key="setting"
                  onClick={() => {
                    setSelectedItemName("Mini Bamboo Hair Brush");
                    setSelectedItemPrice(7500);
                    showModal();
                  }}
                />,
                <Tag color="#87d068">7 500</Tag>,
              ]}
            >
              <Meta
                title="Mini Bamboo Hair Brush"
                description="www.earthhero.com"
              />
            </Card>
            <Card
              style={{
                width: 200,
              }}
              cover={<img alt="Reusable-Paper" src={ReusablePaper} />}
              actions={[
                <ShoppingCartOutlined
                  key="setting"
                  onClick={() => {
                    setSelectedItemName("Reusable Paper Towels");
                    setSelectedItemPrice(9500);
                    showModal();
                  }}
                />,
                <Tag color="#87d068">9 500</Tag>,
              ]}
            >
              <Meta
                title="Reusable Paper Towels"
                description="www.zerowastestore.com"
              />
            </Card>
            <Card
              style={{
                width: 200,
              }}
              cover={<img alt="Reusable-Paper" src={BambooToothbrushes} />}
              actions={[
                <ShoppingCartOutlined
                  key="setting"
                  onClick={() => {
                    setSelectedItemName("Bamboo Toothbrush");
                    setSelectedItemPrice(2000);
                    showModal();
                  }}
                />,
                <Tag color="#87d068">2 000</Tag>,
              ]}
            >
              <Meta
                title="Bamboo Toothbrush"
                description="www.ecogirlshop.com"
              />
            </Card>
            <Card
              style={{
                width: 200,
              }}
              cover={<img alt="HairScrunchies" src={HairScrunchies} />}
              actions={[
                <ShoppingCartOutlined
                  key="setting"
                  onClick={() => {
                    setSelectedItemName("Hair Scrunchies");
                    setSelectedItemPrice(4000);
                    showModal();
                  }}
                />,
                <Tag color="#87d068">4 000</Tag>,
              ]}
            >
              <Meta title="Hair Scrunchies" description="www.earthhero.com" />
            </Card>
            <Card
              style={{
                width: 200,
              }}
              cover={
                <img
                  alt="ToothpasteTablets"
                  src={ToothpasteTablets}
                  onClick={() => {
                    setSelectedItemName("Toothpaste Tablets");
                    setSelectedItemPrice(3500);
                    showModal();
                  }}
                />
              }
              actions={[
                <ShoppingCartOutlined key="setting" />,
                <Tag color="#87d068">3 500</Tag>,
              ]}
            >
              <Meta
                title="Toothpaste Tablets"
                description="www.ecogirlshop.com"
              />
            </Card>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default Shope;
