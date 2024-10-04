const multerConfig = require('../config/multerconfig');
const Product = require('../models/productModel'); 
const Category = require('../models/categoryModel'); 

// Admin adds a product
exports.addProduct = (req, res) => {
    multerConfig(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        } else {
            try {
                // Find the category by its ID
                const category = await Category.findById(req.body['product-category']);
                if (!category) {
                    return res.status(404).json({ message: 'Category not found' });
                }

                const productData = {
                    name: req.body['product-name'],
                    category: category._id,  // Reference the category ObjectId
                    price: req.body['product-price'],
                    isCustomizable: req.body['product-customization'] === '1', 
                    coverImage: req.files['product-cover-image'][0].filename, 
                    secondaryImages: req.files['secondary-img[]']?.map(file => file.filename), 
                    keywords: req.body['product-keyword'],
                    description: req.body['product-description']
                };

                const newProduct = new Product(productData);
                await newProduct.save();

                // Add product to the category's product list
                category.products.push(newProduct._id);
                await category.save();

                res.status(200).json({ message: 'Product added successfully!' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
        }
    });
};
