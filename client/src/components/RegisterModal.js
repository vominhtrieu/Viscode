import React from "react";
import { Modal, message, Button, Input, Form, Checkbox } from "antd";
import axios from "axios";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import AuthService from "../services/auth.services";

export default function RegisterModal(props) {

  const onFinish = (values) => {
    AuthService.register(values.username, values.password).then(
      () => {
        window.location.reload();
      },
      (error) => {
        message.error("Register in failed. Check your info and try again");
      }
    );
  };

  return (
    <>
      <Modal
        title="Register new account"
        visible={props.visible}
        onCancel={props.onClose}
        footer={null}
      >
        <Form onFinish={onFinish} on>
          <Form.Item name="username" rules={[
            {
              required: true,
              message: "Please input your username!"
            }
          ]}>
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              style={{ fontSize: "20px" }}
              type="text"
            />
          </Form.Item>
          <Form.Item name="password" rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}>
            <Input
              prefix={<LockOutlined />}
              placeholder="Password"
              style={{ fontSize: "20px" }}
              type="password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              style={{ fontSize: "20px" }}
              type="password"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              shape="round"
              style={{ width: "100%" }}
            >
              Create account
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: "center", display: "flex" }}>
            Already have an account?
            <Button
              type="text"
              style={{
                border: "none",
                cursor: "pointer",
                color: "#0275d8",
                textDecoration: "underline",
                paddingLeft: "1em",
              }}
            >
              Log in here
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
