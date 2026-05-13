const Promotion = require('../models/promotion');

const getActivePromotionsService = async () => {
    try {
        const now = new Date();
        
        const activePromotions = await Promotion.find({
            isActive: true,
            startDate: { $lte: now },
            endDate: { $gte: now },
            $expr: { $lt: ["$usedCount", "$usageLimit"] } // Lượt dùng < Giới hạn
        })
        .sort({ createdAt: -1 }) // Sắp xếp mới nhất lên đầu
        .limit(5);

        return activePromotions;
    } catch (error) {
        console.log("Lỗi ở Promotion Service:", error);
        throw error;
    }
};

module.exports = {
    getActivePromotionsService
};