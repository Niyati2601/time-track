const path = require("path");
const fs = require("fs");

const dataFilePath = path.join(__dirname, "../helpers/data.json");

const getData = (req, res, key) => {
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Error reading data file" });
    }

    const jsonData = JSON.parse(data);

    if (jsonData[key]) {
      res.json({ success: true, data: jsonData[key] });
    } else {
      res.status(404).json({ success: false, message: `${key} not found` });
    }
  });
};

exports.getProjects = (req, res) => {
  getData(req, res, "projects");
};

exports.getTags = (req, res) => {
  getData(req, res, "tags");
};

exports.getTickets = (req, res) => {
  getData(req, res, "tickets");
};


