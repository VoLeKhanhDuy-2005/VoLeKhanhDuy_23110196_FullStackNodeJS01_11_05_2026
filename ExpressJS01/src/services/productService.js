const Product = require('../models/product');

const getHomePageProducts = async () => {
    const [newestProducts, bestSellingProducts, promotionalProducts] = await Promise.all([
        Product.find().sort({ createdAt: -1 }).limit(8),
        Product.find({ isHot: true }).sort({ sold: -1 }).limit(8),
        Product.find({ discountPrice: { $gt: 0 } }).limit(4)
    ]);
    
    return {
        newest: newestProducts,
        bestSelling: bestSellingProducts,
        promotions: promotionalProducts
    };
};

module.exports = { getHomePageProducts };