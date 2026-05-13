import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function productDetail() {
  const [quantity, setQuantity] = useState(1);
  const stock = 15; // Giả lập hàng tồn
  const sold = 120; // Giả lập đã bán
  
  const images = [
    "https://via.placeholder.com/600x400?text=Image+1",
    "https://via.placeholder.com/600x400?text=Image+2",
    "https://via.placeholder.com/600x400?text=Image+3"
  ];

  const handleQtyChange = (type) => {
    if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
    if (type === 'inc' && quantity < stock) setQuantity(q => q + 1);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Breadcrumb / Danh mục */}
      <div className="text-sm text-gray-500 mb-4">
        Trang chủ &gt; Danh mục &gt; Tên sản phẩm
      </div>

      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-xl shadow-sm">
        {/* Cột trái: Swiper Images */}
        <div className="w-full md:w-1/2">
          <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} className="rounded-lg">
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img src={img} alt={`Slide ${idx}`} className="w-full h-[400px] object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Cột phải: Thông tin sản phẩm */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">Tên Sản Phẩm Đang Bán</h1>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Đã bán: <strong className="text-black">{sold}</strong></span>
            <span>|</span>
            <span>Tình trạng: <strong className={stock > 0 ? "text-green-600" : "text-red-600"}>
              {stock > 0 ? `Còn hàng (${stock} sản phẩm)` : "Hết hàng"}
            </strong></span>
          </div>

          <div className="text-4xl font-bold text-red-600">1.500.000đ</div>

          {/* Tăng giảm số lượng */}
          <div className="flex items-center gap-4 mt-6">
            <span className="font-medium">Số lượng:</span>
            <div className="flex items-center border rounded">
              <button onClick={() => handleQtyChange('dec')} className="px-4 py-2 bg-gray-100 hover:bg-gray-200">-</button>
              <input type="text" readOnly value={quantity} className="w-12 text-center outline-none" />
              <button onClick={() => handleQtyChange('inc')} className="px-4 py-2 bg-gray-100 hover:bg-gray-200">+</button>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 font-bold text-lg transition">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* Section Sản phẩm tương tự */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-4">Sản Phẩm Tương Tự</h3>
        {/* Render Grid các ProductCard giống trang chủ */}
      </div>
    </div>
  );
}