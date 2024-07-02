import React from 'react';
import { IProduct } from "../../../../types/product";
import { add } from '../../components/State/Slice/CartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getStatusInfo = (status?: number) => {
  switch (status) {
    case 1:
      return { text: "Còn hàng", className: "text-green-500" };
    case 2:
      return { text: "Ko còn sử dụng, đã xóa", className: "text-gray-400" };
    case 3:
      return { text: "Hết hàng", className: "text-red-500" };
    default:
      return { text: "Không rõ trạng thái", className: "text-yellow-500" };
  }
};

const formatPrice = (price: number): string => {
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const ProductDetailCell: React.FC<IProduct> = (props) => {
  const dispatch = useDispatch();
  const {
    productKey,
    name,
    description,
    guideToUsing,
    price,
    weight,
    expiryDay,
    imageUrl,
    status
  } = props;

  const { text: statusText, className: statusClassName } = getStatusInfo(status);
  const handleAddToCart = () => {
    dispatch(add(props));
    toast.success("Đã thêm 1 sản phẩm vào giỏ!");
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 md:mt-14 px-4 sm:px-6 lg:px-8">

      <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-1 px-4">
          <div className="h-[460px] rounded-lg mb-4">
            <img className="w-full h-full object-cover" src={imageUrl} alt={productKey} />
          </div>
          <div className="flex -mx-2 mb-4">
            <div className="w-full px-2">
              <button onClick={handleAddToCart} className="w-full bg-primary text-white py-2 px-4 rounded-full font-bold hover:bg-secondary text-lg">
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
        <div className="md:flex-1 px-4">
          <h2 className="text-2xl font-bold text-primary mb-2">{name}</h2>
          <p className="text-gray-700 md:text-md text-base mb-4">{description}</p>
          <div className="flex mb-4">
            <div className="mr-4">
              <span className="font-bold text-gray-400">Giá: </span>
              <span className="text-red-500 font-bold">{formatPrice(price!)}</span>
            </div>
            <div>
              <span className="font-bold text-gray-400">Tình trạng: </span>
              <span className={`font-bold ${statusClassName}`}>{statusText}</span>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-bold text-gray-400">Khối lượng:</span>
            <p className="text-gray-700 text-base mt-2">
              {weight}
            </p>
          </div>
          <div className="mb-4">
            <span className="font-bold text-gray-400">Hạn sử dụng:</span>
            <p className="text-gray-700 text-base mt-2">
              {expiryDay}
            </p>
          </div>
          <div>
            <span className="font-bold text-gray-400">Hướng dẫn sử dụng:</span>
            <p className="text-gray-700 text-base mt-2">
              {guideToUsing}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCell;
