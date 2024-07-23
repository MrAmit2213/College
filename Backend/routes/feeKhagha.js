// routes/feeRoutes.js
const express = require('express');
const router = express.Router();
const Fee = require('../models/feeKhagha');

// Create a new fee object or update an existing one
router.post('/addFee', async (req, res) => {
    try {
        const { className, fees } = req.body;
        let fee = await Fee.findOne({ className });

        if (!fee) {
            fee = new Fee({ className, fees });
        } else {
            fee.fees = fees;
        }

        await fee.save();
        res.status(201).json(fee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all fee objects
router.get('/getFee', async (req, res) => {
    try {
        const fees = await Fee.find();
        res.json(fees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete the fee Objects.
router.delete('/deleteFee/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedFee = await Fee.findByIdAndDelete(id);

        if (!deletedFee) {
            return res.status(404).json({ message: "Class details not found" });
        }

        res.json({ message: "Fee details deleted successfully", deletedFee });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
