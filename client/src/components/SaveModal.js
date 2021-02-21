import React from "react";
import { Modal, List, message, Button, Input } from "antd";
import axios from "axios";
import { API_HOST } from "../config/constant";
import { FileOutlined, FolderOutlined } from "@ant-design/icons";

export default function SaveModal(props) {
  const [parent, setParent] = React.useState(null);
  const [folder, setFolder] = React.useState({ folders: [], files: [] });
  const [folderName, setFolderName] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [newFolderVisible, setNewFolderVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  React.useEffect(() => {
    if (!props.visible) return;
    axios
      .get(`${API_HOST}/my-files`)
      .then((res) => {
        setFolder(res.data);
      })
      .catch((err) => {
        message.error(`Cannot fetch your files. ${err}`);
      });
  }, [props.visible]);

  const save = () => {
    if (fileName === "") return;
    const temp = folder;
    const existedFile = folder.files.find((file) => file.name === fileName);
    if (!existedFile)
      setFolder(Object.assign({}, folder, { files: [...folder.files, { name: fileName, date: Date.now() }] }));
    axios
      .post(`${API_HOST}/my-files/files`, {
        data: props.xml,
        parent: folder._id,
        fileName: fileName,
      })
      .then(() => message.success("Saved"))
      .catch((err) => {
        if (!existedFile) setFolder(temp);
        message.error(`Error occurs. ${err}`);
      });
  };

  const closeNewFolder = () => setNewFolderVisible(false);

  const createFolder = () => {
    if (folderName === "") return;
    closeNewFolder();
    const temp = folder;
    setFolder(Object.assign({}, folder, { folders: [...folder.folders, { name: folderName, date: Date.now() }] }));
    axios
      .post(`${API_HOST}/my-files/folders`, {
        parent: folder._id,
        folderName: folderName,
      })
      .catch((err) => {
        message.error(err);
        setFolder(temp);
      });
  };

  const checkFolderExisted = Boolean(folder.folders.find((folder) => folder.name === folderName));

  const openFolder = () => {
    axios
      .get(`${API_HOST}/my-files/folders/${selectedItem}`)
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
      <Input
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        style={{ width: "100%", margin: "0 10px" }}
        placeholder="File name..."
      />
      <Button onClick={save} disabled={fileName === ""} type="primary">
        Save
      </Button>
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
      setFileName(item.name);
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
              onDoubleClick={item.type === "folder" ? openFolder : null}
              onClick={() => onItemClick(item)}
              style={{
                padding: "2px 24px",
                border: "none",
                cursor: "pointer",
                background: item._id === selectedItem ? "rgba(0,0,0,0.08)" : "white",
              }}
            >
              <List.Item.Meta
                avatar={
                  item.type === "folder" ? (
                    <FolderOutlined style={{ color: "rgba(0,0,0,0.6)", fontSize: 22 }} />
                  ) : (
                    <FileOutlined style={{ fontSize: 22 }} />
                  )
                }
                title={
                  <span style={{ color: item.type === "folder" ? "rgba(0,0,0,0.6)" : "black", fontWeight: "normal" }}>
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
