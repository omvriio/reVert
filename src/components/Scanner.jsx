import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CameraOutlined, HomeOutlined } from "@ant-design/icons";
import { InputNumber, Button, message, Typography } from "antd";
import Webcam from "react-webcam";
import coin from "../assets/coin.png";
import "./scanner.css";
import axios from "axios";

const SEUIL = 200;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Scanner() {
  const [image, setImage] = useState("");
  const [scannedItemCount, setScannedItemCount] = useState(1);
  const [scannedItemValue, setScannedItemValues] = useState(5);
  const [amount, setAmount] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("plastic");
  const navigate = useNavigate();

  const location = useLocation();
  const { state } = location;
  let user = state;

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Item added successfully",
    });
  };

  const successQuest = () => {
    messageApi.open({
      type: "success",
      content: "Quest sent successfully, wait for agent validation",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Item was rejected",
    });
  };
  const handleAccept = async () => {
    const res = true;
    if (res) {
      const total = amount + scannedItemValue * scannedItemCount;
      success();
    }
    setImage(null);
  };

  return (
    <div className="scanner-page">
      {contextHolder}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Title level={1}>
          Scanne Items <CameraOutlined />
        </Typography.Title>

        <Button
          onClick={() => navigate("/user-page", { state: user })}
          type="primary"
          icon={<HomeOutlined />}
        >
          Home
        </Button>
      </div>
      <main>
        {image ? (
          <div>
            <img src={image} alt="captured" />
            <div>
              You scannned {type} : {scannedItemValue} x{" "}
              <InputNumber
                min={1}
                max={1000}
                defaultValue={1}
                onChange={(value) => setScannedItemCount(value)}
              />{" "}
              = {scannedItemValue * scannedItemCount}{" "}
              <img style={{ width: 15, height: 15 }} src={coin} />
            </div>
            <div style={{ marginTop: 30 }}>
              <Button onClick={() => setImage(null)}>Skip</Button>
              <Button
                onClick={handleAccept}
                type="primary"
                style={{ marginLeft: 20 }}
              >
                Accept
              </Button>
            </div>
          </div>
        ) : (
          <Webcam width={450} height={400}>
            {({ getScreenshot }) => (
              <Button
                type="primary"
                icon={<CameraOutlined />}
                loading={loading}
                onClick={async () => {
                  const imageSrc = getScreenshot();
                  setLoading(true);
                  await axios
                    .post("http://127.0.0.1:5000/run_model", {
                      image: imageSrc,
                    })
                    .then((res) => {
                      setScannedItemValues(res.data["Value"]);
                      setType(res.data["Categorie"]);
                      console.log(res.data);
                    })
                    .catch((e) => console.log(e))
                    .finally(() => setLoading(false));
                  setImage(imageSrc);
                }}
                iconPosition={"end"}
              >
                Scan
              </Button>
            )}
          </Webcam>
        )}
      </main>
      <footer>
        <Typography.Title level={1} type="success">
          {amount}
        </Typography.Title>
        <img style={{ width: 40, height: 40 }} src={coin} />
        <Button
          style={{ marginLeft: 30, marginRight: -60 }}
          type="primary"
          disabled={amount < SEUIL}
          onClick={async () => {
            successQuest();
            await sleep(2000);
            navigate("/user-page", { state: user });
          }}
        >
          Request agent (min 200)
        </Button>
      </footer>
    </div>
  );
}

export default Scanner;
