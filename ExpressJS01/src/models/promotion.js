const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên chương trình khuyến mãi không được để trống'],
        trim: true
    },
    code: {
        type: String,
        required: [true, 'Mã giảm giá không được để trống'],
        unique: true,
        uppercase: true, // Tự động chuyển thành chữ hoa
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed_amount'], // Phân loại: Giảm theo % hoặc Giảm thẳng tiền
        required: true
    },
    discountValue: {
        type: Number,
        required: [true, 'Giá trị giảm không được để trống'],
        min: 0
    },
    minOrderValue: {
        type: Number,
        default: 0
    },
    maxDiscountAmount: {
        type: Number,
        default: null
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    usageLimit: {
        type: Number,
        default: 100
    },
    usedCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Thêm một method ảo (virtual) để kiểm tra xem mã còn hiệu lực không
promotionSchema.virtual('isValid').get(function() {
    const now = new Date();
    return this.isActive && 
           this.usedCount < this.usageLimit && 
           now >= this.startDate && 
           now <= this.endDate;
});

const Promotion = mongoose.model('promotion', promotionSchema);

module.exports = Promotion;