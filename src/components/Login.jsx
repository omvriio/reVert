import React, { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

function Login(props) {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const success = () => {
    messageApi.success("Message Sent Successfully!");
  };

  const error = () => {
    messageApi.error("Failed to send message!");
  };

  const onFinish = (values) => {
    success();
    const userData = { username: values.username, password: values.password };
    axios
      .post("http://127.0.0.1:5000/login", userData)
      .then((r) => {
        navigate("/user-page", { state: r.data.user });
      })
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };
  const onFinishFailed = (errorInfo) => {
    error();
  };

  return (
    <div className="login">
      {contextHolder}
      <div className="login-form">
        <Typography.Title level={3}>
          Back to the Recycling Community
        </Typography.Title>
        <Typography.Paragraph>
          Use your username or phone number to Log In
        </Typography.Paragraph>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log In
            </Button>
          </Form.Item>

          <p>
            You don't have an account yet ?{" "}
            <a onClick={() => navigate("/registration")}>Create account</a>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Login;
