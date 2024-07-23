// controllers/projectController.js

const Project = require('../models/Projects');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("assignees");
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("assignees");
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAssigneesByProjectId = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('assignees');
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, data: project.assignees });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json({ success: true, data: savedProject , message: "Project created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("assignees");
    if (!updatedProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get project by userId
exports.getProjectsByUserId = async (req, res) => {
  try {
    const user = req.userId;
    const projects = await Project.find({ $or:[{assignees: user} , {type:'general'}]}).populate('assignees');
    if (projects) {
      return res
        .status(200)
        .json({ success: true, data: projects, error: false });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No projects found", error: true });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, error: true });
  }
};
exports.getProjectsByUserIdAdmin = async (req, res) => {
  try {
    const user = req.params.id;
    const projects = await Project.find({ $or:[{assignees: user} , {type:'general'}]});
    if (projects) {
      return res
        .status(200)
        .json({ success: true, data: projects, error: false });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No projects found", error: true });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message, error: true });
  }
};



