import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";

export default function AboutUs({ visible, onClose }) {
  const footer = (
    <div style={{ display: "flex" }}>
      <Button onClick={onClose} style={{ marginLeft: "auto" }} type="primary">
        OK
      </Button>
    </div>
  );
  return (
    <Modal visible={visible} footer={footer} title="About us" onCancel={onClose}>
      <p>
        <b>Authors:</b> Võ Minh Triều, Nguyễn Hoàng Trung.
        <br />
        <b>Credit to:</b> Blockly, Ant Design, Intro.js.
      </p>
    </Modal>
  );
}
