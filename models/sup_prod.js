const mongoose = require('mongoose');

const supplierProductSchema = mongoose.Schema({
    Supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    Product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, { collection: 'sup_prod' });

const SupplierProduct = mongoose.model('SupplierProduct', supplierProductSchema);

module.exports = SupplierProduct;
