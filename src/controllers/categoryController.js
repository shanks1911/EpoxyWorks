const Category = require('../models/categoryModel');
const Product = require('../models/adminModel'); 

const getCategoryProducts = async (req, res) => {
    try {
        const categoryId = req.params.categoryId; // Get the category ID from the URL
        const category = await Category.findById(categoryId).populate('products').exec();

        if (!category) {
            return res.status(404).send('Category not found');
        }

        res.render('category', { 
            category: category.name, 
            description: category.description,
            products: category.products, 
            isAuthenticated: req.isAuthenticated // Pass authentication info if required
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = { getCategoryProducts };
