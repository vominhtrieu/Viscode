import React from "react";
import { Modal, message, Button, Input, Form, Checkbox } from "antd";
import axios from "axios";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import AuthService from "../services/auth.services";
import RegisterModal from "./RegisterModal";

export default function SignInModal(props) {
  const { updateUser } = props;

  const [registerModalVisible, setRegisterModalVisible] = React.useState(false);

  const onFinish = (values) => {
    AuthService.login(values.username, values.password).then(
      () => {
        updateUser();
        props.onClose();
      },
      (error) => {
        message.error("Log in failed. Wrong username or password");
      }
    );
  };

  const onRegisterClick = () => {
    setRegisterModalVisible(true);
    props.onClose();
  }

  return (
    <>
      <RegisterModal
        visible={registerModalVisible}
        onClose={() => setRegisterModalVisible(false)}
      />
      <Modal
        title="Sign In"
        visible={props.visible}
        onCancel={props.onClose}
        footer={null}
      >
        <Form onFinish={onFinish} on>
          <Form.Item name="username">
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              style={{ fontSize: "20px" }}
              type="text"
            />
          </Form.Item>
          <Form.Item name="password">
            <Input
              prefix={<LockOutlined />}
              placeholder="Password"
              style={{ fontSize: "20px" }}
              type="password"
            />
          </Form.Item>
          <Form.Item
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="" style={{ float: "right" }}>
              Forgot password
            </a>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              shape="round"
              style={{ width: "100%" }}
            >
              Sign In
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: "center", display: "flex" }}>
            Or
            <Button
              type="text"
              onClick={onRegisterClick}
              style={{
                border: "none",
                cursor: "pointer",
                color: "#0275d8",
                textDecoration: "underline",
                paddingLeft: "1em",
              }}
            >
              register now!
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
