import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { notification } from 'antd';
import { getCurrentUserApi, getProductsApi } from "../util/api";

export default function Home() {
  // State lưu thông tin user. Nếu null tức là chưa đăng nhập.
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState({
    newest: [],
    bestSelling: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Dùng useEffect để gọi API kiểm tra đăng nhập khi component được mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await getCurrentUserApi();
            if (!userRes?.message) {
                setUser(userRes.user ? userRes.user : userRes);
            } else {
                // Chỉ báo lỗi nếu có token nhưng token lỗi, bỏ qua nếu chưa đăng nhập
                if(localStorage.getItem('token')){
                  notification.error({
                      message: "Unauthorized",
                      description: userRes.message
                  });
                }
            }

        const productRes = await getProductsApi(); 
        if (productRes && productRes.data) {
           setProducts({
             newest: productRes.data.newest || [],
             bestSelling: productRes.data.bestSelling || []
           });
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-blue-600">MyShop</h1>
        
        {user && (
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 font-medium">
              <User size={20} /> Xin chào, {user.name}
            </span>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto p-4 space-y-8">
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">🔥 Khuyến Mãi Mùa Hè - Giảm đến 50%</h2>
          <p>Nhập mã SUMMER2026 để được giảm giá thêm.</p>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-4 border-b pb-2">✨ Mới Nhất</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.newest.length > 0 ? (
                products.newest.map((item) => (
                    <ProductCard 
                        key={item._id} 
                        id={item._id}
                        name={item.name} 
                        price={formatPrice(item.price)} 
                    />
                ))
            ) : (
                <p className="text-gray-500 col-span-full">Đang cập nhật sản phẩm...</p>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-4 border-b pb-2">🏆 Bán Chạy Nhất</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.bestSelling.length > 0 ? (
                products.bestSelling.map((item) => (
                    <ProductCard 
                        key={item._id} 
                        id={item._id}
                        name={item.name} 
                        price={formatPrice(item.price)} 
                        badge="Hot" 
                    />
                ))
            ) : (
              <p className="text-gray-500 col-span-full">Đang cập nhật sản phẩm...</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function ProductCard({ id, name, price, badge }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition relative flex flex-col">
      {badge && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded absolute top-2 right-2">{badge}</span>}
      <div className="h-40 bg-gray-200 rounded mb-4"></div>
      <h4 className="font-semibold line-clamp-2 flex-grow">{name}</h4>
      <p className="text-red-500 font-bold mt-2">{price}</p>
      
      {/* Sửa lại link để trỏ đúng id sản phẩm */}
      <Link to={`/product/${id}`} className="block text-center bg-blue-600 text-white mt-3 py-2 rounded hover:bg-blue-700">
        Xem chi tiết
      </Link>
    </div>
  );
}