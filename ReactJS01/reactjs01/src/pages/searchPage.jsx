import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function searchPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sort: 'newest'
  });

  const fetchProducts = async () => {
    // Chuyển object filters thành query string (vd: ?search=abc&minPrice=100)
    const queryString = new URLSearchParams(filters).toString();
    try {
      const response = await axios.get(`http://localhost:5000/api/products?${queryString}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu", error);
    }
  };

  // Gọi API mỗi khi filters thay đổi
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex gap-6 max-w-7xl mx-auto p-4">
      {/* Sidebar Lọc */}
      <div className="w-1/4 bg-white p-4 rounded shadow-sm h-fit">
        <h3 className="font-bold text-lg mb-4">Bộ Lọc</h3>
        
        <input 
          type="text" name="search" placeholder="Tìm kiếm sản phẩm..."
          className="w-full border p-2 rounded mb-4"
          onChange={handleChange}
        />

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Danh mục</label>
          <select name="category" className="w-full border p-2 rounded" onChange={handleChange}>
            <option value="">Tất cả</option>
            <option value="electronics">Điện tử</option>
            <option value="fashion">Thời trang</option>
          </select>
        </div>

        <div className="mb-4 flex gap-2">
          <input type="number" name="minPrice" placeholder="Giá Min" className="w-1/2 border p-2 rounded" onChange={handleChange} />
          <input type="number" name="maxPrice" placeholder="Giá Max" className="w-1/2 border p-2 rounded" onChange={handleChange} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Sắp xếp</label>
          <select name="sort" className="w-full border p-2 rounded" onChange={handleChange}>
            <option value="newest">Mới nhất</option>
            <option value="price_asc">Giá tăng dần</option>
            <option value="price_desc">Giá giảm dần</option>
          </select>
        </div>
      </div>

      {/* Hiển thị kết quả */}
      <div className="w-3/4">
        <div className="grid grid-cols-3 gap-4">
           {/* Map list products lấy từ API ra đây */}
           {products.map(p => (
             <ProductCard key={p._id} name={p.name} price={p.price} />
           ))}
        </div>
      </div>
    </div>
  );
}