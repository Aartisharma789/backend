const express = require('express');
const { getAllProducts, getProductDetails, updateProduct, deleteProduct, getProductReviews, deleteReview, createProductReview, createProduct, getAdminProducts, getProducts } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/products/all').get(getProducts);

router.route('/admin/products').get(isAuthenticatedUser, getAdminProducts);
router.route('/admin/product/new').post(isAuthenticatedUser, createProduct);

router.route('/admin/product/:id')
		.put(isAuthenticatedUser,updateProduct)
		.delete(isAuthenticatedUser,deleteProduct);

router.route('/product/:id').get(getProductDetails);

router.route('/review').put(isAuthenticatedUser, createProductReview);

router.route('/admin/reviews')
		.get(getProductReviews)
		.delete(isAuthenticatedUser, deleteReview);

module.exports = router;