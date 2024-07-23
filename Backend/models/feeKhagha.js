const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    className: { type: String, required: true },
    fees: [{
        feeType: { type: String, required: true },
        feeAmount: { type: Number, required: true }
    }]
});

module.exports = mongoose.model('feeKhagha', feeSchema);