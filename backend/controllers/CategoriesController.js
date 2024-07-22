const categoryModal = require('../models/Categories');
exports.addCategory = async (req, res) => {
    try {
        const newCategory = new categoryModal({
            name: req.body.name
        });

        const category = await newCategory.save();

        res.status(200).json({
            success: true,
            error: false,
            message: "Category Added",
            data: category
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message
        });
    }
};

exports.getCategory = async (req, res) => {
    try {
        const categories = await categoryModal.find();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await categoryModal.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};