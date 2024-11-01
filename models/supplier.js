const mongoose = require('mongoose');

const supplierSchema = mongoose.Schema({
    Supplier: { type: String, required: true },
    Address: { type: String, required: true },
    Phone: { type: String, required: true },
    Email: { type: String, required: true }
});
const Supplier = mongoose.model('Supplier', supplierSchema, 'supplier');

module.exports = Supplier;
