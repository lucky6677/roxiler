const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
    image: {type:String, required:true},
    sold: { type: Boolean, required: true },
    dateOfSale: { type: Date, required: true },
});

module.exports = mongoose.model('Transaction', transactionSchema);
