const mongoose = require('mongoose');

// Category schema
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },  // URL for category image
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]  // Relationship with Product
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
