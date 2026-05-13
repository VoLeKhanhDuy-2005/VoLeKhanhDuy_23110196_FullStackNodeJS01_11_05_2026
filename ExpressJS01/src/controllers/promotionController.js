const { getActivePromotionsService } = require('../services/promotionService');

const getActivePromotions = async (req, res) => {
    try {
        const data = await getActivePromotionsService();
        return res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Lỗi khi lấy dữ liệu khuyến mãi"
        });
    }
};

module.exports = { getActivePromotions };