const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['general', 'personal'],
        default: 'general',
    },
    assignees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    description: {
        type: String,
    },
    projectCode :{
        type: String,
    },
    projectStatus : {
        type: String,
        enum: ['completed', 'in_planning', 'in_progress', 'in_support', 'on_hold'],
    },
    projectScope : [{
        type: String,
        enum: ['Web Application', 'Admin Panel', 'Mobile App Android', 'Mobile App Ios', 'Mobile App Hybrid'],
    }],
    estimatedStartDate : {
        type: Date,
    },
    estimatedEndDate : {
        type: Date,
    },
    actualStartDate : {
        type: Date,
    },
    actualEndDate : {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

projectSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
