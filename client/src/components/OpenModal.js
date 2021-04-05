import React from "react";
import { Modal, List, message, Button, Input } from "antd";
import axios from "axios";
import { API_HOST } from "../config/constant";
import { FileOutlined, FolderOutlined } from "@ant-design/icons";
import UserService from "../services/user.services";

export default function OpenModal(props) {
  const [parent, setParent] = React.useState(null);
  const [folder, setFolder] = React.useState({ folders: [], files: [] });
  const [folderName, setFolderName] = React.useState("");
  const [newFolderVisible, setNewFolderVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);

  React.useEffect(() => {
    if (!props.visible) return;
    UserService.getUserFiles().then((res) => {
      try {
        setFolder(res.data);
      } catch (err) {
        message.error(`Cannot fetch your files. ${err}`);
      }
    });
  }, [props.visible]);

  const closeNewFolder = () => setNewFolderVisible(false);

  const createFolder = () => {
    if (folderName === "") return;
    closeNewFolder();
    const temp = folder;
    setFolder(
      Object.assign({}, folder, {
        folders: [...folder.folders, { name: folderName, date: Date.now() }],
      })
    );
    UserService.createFolder(folderName, folder._id).catch((err) => {
      message.error("Cannot create folder");
      setFolder(temp);
    });
  };

  const openFile = () => {
    window.open(`/${selectedFile}`);
  };

  const checkFolderExisted = Boolean(
    folder.folders.find((folder) => folder.name === folderName)
  );

  const openFolder = () => {
    UserService.openFolder(selectedItem)
      .then(({ data }) => {
        setParent(folder);
        setFolder(data);
      })
      .catch((err) => {
        message.error("Cannot open this folder. Please try again!");
      });
  };

  const footer = (
    <div style={{ display: "flex" }}>
      <Button disabled={parent === null} onClick={() => setFolder(parent)}>
        Back
      </Button>
      <Button onClick={() => setNewFolderVisible(true)} type="primary">
        New folder
      </Button>

      <div style={{ marginLeft: "auto" }}>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button
          onClick={openFile}
          disabled={selectedFile === null}
          type="primary"
        >
          Open
        </Button>
      </div>
    </div>
  );

  const folders = folder.folders.map((folder) =>
    Object.assign({}, folder, {
      type: "folder",
    })
  );

  const files = folder.files.map((file) =>
    Object.assign({}, file, {
      type: "file",
    })
  );

  const all = folders.concat(files);
  const onItemClick = (item) => {
    if (item.type === "file") {
      setSelectedFile(item._id);
    } else {
      setSelectedFile(null);
    }
    setSelectedItem(item._id);
  };

  return (
    <>
      <Modal
        width={400}
        title="New folder"
        visible={newFolderVisible}
        okButtonProps={{ disabled: folderName === "" || checkFolderExisted }}
        onCancel={closeNewFolder}
        onOk={createFolder}
      >
        <Input
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Folder name"
          onPressEnter={createFolder}
        />
      </Modal>
      <Modal
        bodyStyle={{ padding: "5px 0", height: 200, overflowY: "auto" }}
        onCancel={props.onClose}
        title="Your file"
        visible={props.visible}
        footer={footer}
      >
        <List
          dataSource={all}
          renderItem={(item) => (
            <List.Item
              onDoubleClick={item.type === "folder" ? openFolder : openFile}
              onClick={() => onItemClick(item)}
              style={{
                padding: "2px 24px",
                border: "none",
                cursor: "pointer",
                background:
                  item._id === selectedItem ? "rgba(0,0,0,0.08)" : "white",
              }}
            >
              <List.Item.Meta
                avatar={
                  item.type === "folder" ? (
                    <FolderOutlined
                      style={{ color: "rgba(0,0,0,0.6)", fontSize: 22 }}
                    />
                  ) : (
                    <FileOutlined style={{ fontSize: 22 }} />
                  )
                }
                title={
                  <span
                    style={{
                      color:
                        item.type === "folder" ? "rgba(0,0,0,0.6)" : "black",
                      fontWeight: "normal",
                    }}
                  >
                    {item.name}
                  </span>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
}
