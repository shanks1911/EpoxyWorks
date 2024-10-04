const mongoose = require('mongoose');

// Product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
    isCustomizable: { type: Boolean, required: true },
    coverImage: { type: String, required: true },
    secondaryImages: { type: [String], required: false },
    keywords: { type: String, required: true },
    description: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
