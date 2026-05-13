const productService = require('../services/productService');

const searchProducts = async (req, res) => {
    try {
        const data = await productService.getProductsWithFilters(req.query);
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getHomePageProducts = async (req,res)=>{
    try {
        const data = await productService.getHomePageProducts();
        res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    searchProducts, getHomePageProducts
}

// const productService = require('../services/productService');

// /**
//  * ấy dữ liệu cho Trang chủ (Sản phẩm mới, bán chạy, khuyến mãi)
//  */
// const getHomePageData = async (req, res) => {
//     try {
//         const data = await productService.getHomePageProducts();
        
//         res.status(200).json({
//             success: true,
//             data: data
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Lỗi khi lấy dữ liệu trang chủ: ' + error.message
//         });
//     }
// };

// /**
//  * @desc    Lấy danh sách sản phẩm kết hợp tìm kiếm, lọc, sắp xếp và phân trang
//  * @route   GET /api/products
//  * @access  Public
//  */
// const searchProducts = async (req, res) => {
//     try {
//         // Truyền toàn bộ query string từ URL (vd: ?search=abc&minPrice=100) vào service
//         const data = await productService.getProductsWithFilters(req.query);
        
//         res.status(200).json({
//             success: true,
//             data: data
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Lỗi khi tìm kiếm sản phẩm: ' + error.message
//         });
//     }
// };

// /**
//  * @desc    Lấy chi tiết 1 sản phẩm và các sản phẩm tương tự
//  * @route   GET /api/products/:id
//  * @access  Public
//  */
// const getProductDetail = async (req, res) => {
//     try {
//         const { id } = req.params;
        
//         // 1. Lấy thông tin sản phẩm chính
//         const product = await productService.getProductById(id);
        
//         // 2. Lấy danh sách sản phẩm tương tự dựa vào danh mục của sản phẩm chính
//         const relatedProducts = await productService.getRelatedProducts(id, product.category);
        
//         res.status(200).json({
//             success: true,
//             data: {
//                 product,
//                 relatedProducts
//             }
//         });
//     } catch (error) {
//         res.status(404).json({
//             success: false,
//             message: 'Không tìm thấy sản phẩm: ' + error.message
//         });
//     }
// };

// /**
//  * @desc    Thêm sản phẩm mới (Dành cho Admin)
//  * @route   POST /api/products
//  * @access  Private/Admin
//  */
// const createProduct = async (req, res) => {
//     try {
//         const newProduct = await productService.createProduct(req.body);
        
//         res.status(201).json({
//             success: true,
//             message: 'Tạo sản phẩm thành công',
//             data: newProduct
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: 'Lỗi khi tạo sản phẩm: ' + error.message
//         });
//     }
// };

// /**
//  * @desc    Cập nhật thông tin sản phẩm (Dành cho Admin)
//  * @route   PUT /api/products/:id
//  * @access  Private/Admin
//  */
// const updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedProduct = await productService.updateProduct(id, req.body);
        
//         if (!updatedProduct) {
//             return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại' });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Cập nhật sản phẩm thành công',
//             data: updatedProduct
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             message: 'Lỗi khi cập nhật sản phẩm: ' + error.message
//         });
//     }
// };

// /**
//  * @desc    Xóa sản phẩm (Dành cho Admin)
//  * @route   DELETE /api/products/:id
//  * @access  Private/Admin
//  */
// const deleteProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedProduct = await productService.deleteProduct(id);

//         if (!deletedProduct) {
//             return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại' });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Đã xóa sản phẩm thành công'
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Lỗi khi xóa sản phẩm: ' + error.message
//         });
//     }
// };

// module.exports = {
//     getHomePageData,
//     searchProducts,
//     getProductDetail,
//     createProduct,
//     updateProduct,
//     deleteProduct
// };