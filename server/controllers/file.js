const File = require("../models/File");
const Folder = require("../models/Folder");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

if (!fs.existsSync(path.join(__dirname, "../files"))) {
  fs.mkdirSync(path.join(__dirname, "../files"));
}

exports.getMyFiles = async (req, res) => {
  try {
    const folder = await Folder.findOne({ name: "root", user: mongoose.Types.ObjectId(req.userId) }).populate({
      path: "folders files",
      options: { sort: { name: 1 } },
    });
    res.json(folder);
  } catch (err) {
    console.log(err);
    res.status(500).json("Unable to list your files");
  }
};

exports.getFolder = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id).populate({
      path: "folders files",
      options: { sort: { name: 1 } },
    });
    if (!folder) {
      return res.status(404).json("Folder not existed");
    }
    res.json(folder);
  } catch (err) {
    console.log(err);
    res.status(500).json("Unable to list your files");
  }
};

exports.getFile = (req, res) => {
  if (fs.existsSync(path.join(__dirname, `../files/${req.params.id}`))) {
    const data = fs.readFileSync(path.join(__dirname, `../files/${req.params.id}`)).toString();
    res.json({ data });
  } else {
    res.status(404).json("File not found");
  }
};

exports.createNewFile = async (req, res) => {
  try {
    if (req.body.fileName === "") return res.status(400).json("Empty file name");
    const parent = await Folder.findById(req.body.parent).populate("folders files");
    if (!parent) {
      return res.status(400).json("Parent not exist");
    }
    let file = parent.files.find((file) => file.name === req.body.fileName);
    if (!file) {
      file = await File.create({ name: req.body.fileName });
      parent.files.push(file._id);
      await parent.save();
    }

    fs.writeFileSync(path.join(__dirname, `../files/${file._id}`), req.body.data);
    res.json(file);
  } catch (err) {
    console.log(err);
    res.status(500).json("Unable to create file");
  }
};

exports.createNewFolder = async (req, res) => {
  try {
    const parent = await Folder.findById(req.body.parent).populate("folders files");
    if (!parent) {
      return res.status(400).json("Parent not exist");
    }
    if (parent.folders.find((folder) => folder.name === req.body.folderName)) {
      return res.status(400).json("Folder name existed");
    }
    const folder = await Folder.create({ name: req.body.folderName });
    parent.folders.push(folder._id);

    await parent.save();
    res.json(folder);
  } catch (err) {
    console.log(err);
    res.status(500).json("Unable to create folder");
  }
};
