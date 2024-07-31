import React, { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./registration.css";
import axios from "axios";

function Registration(props) {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const success = () => {
    messageApi.success("Registration Successful!");
  };

  const error = () => {
    messageApi.error("Failed to register!");
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    success();
    const userData = {
      username: values.username,
      password: values.password,
      phone: values.phone,
      adress: values.adress,
    };
    axios
      .post("http://127.0.0.1:5000/add_user", userData)
      .then((r) => {
        navigate("/login");
      })
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };

  const onFinishFailed = (errorInfo) => {
    error();
  };

  return (
    <div className="registration">
      {contextHolder}
      <div className="registration-form">
        <Typography.Title level={3}>
          Join the Recycling Community
        </Typography.Title>
        <Typography.Paragraph>
          Create an account to join our community
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

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Adress"
            name="adress"
            rules={[
              {
                required: true,
                message: "Please input your adress!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>

          <p>
            Already have an account? <a href="/login">Log In</a>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Registration;
