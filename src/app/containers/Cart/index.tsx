import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { open } from '../../components/State/Slice/CheckOutSlice';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../store';
import CheckOutItem from './CheckOutItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { clear } from '../../components/State/Slice/CartSlice';
import { Link } from 'react-router-dom';
const formatPrice = (price: number): string => {
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

export function Cart() {
  const dispatch = useDispatch();
  const { amount, cartItems, total } = useSelector((state: RootState) => state.cart);

  return (
    <div className="bg-black bg-opacity-70 fixed z-50 top-0 left-0 w-full h-screen">
      <div className="h-full bg-primary sm:w-[40rem] min-w-[15rem] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between text-white">
            <div 
              onClick={() => dispatch(open())}
              className="flex items-center cursor-pointer"
            >
              <ArrowBackIosIcon />
              <span className="uppercase text-[0.95rem] select-none">Tiếp tục mua hàng</span>
            </div>
            <div>Giỏ hàng ({amount})</div>
          </div>
          <div className='mt-8'>
            {cartItems.length === 0 ? (
              <div className="text-center text-2xl uppercase text-white">Chưa có sản phẩm nào trong giỏ hàng!</div>
            ) : (
              <>
                {cartItems.map(cartItem => (
                  <CheckOutItem cartItem={cartItem} />
                ))}
                <div className="flex justify-between mt-12 text-white">
                  <div className="font-bold text-lg">Tổng tiền: {formatPrice(total)}</div>
                  <div className="font-bold text-lg">
                    <div onClick={() => dispatch(clear())}>
                  <DeleteIcon className="cursor-pointer"/>
                    </div>
                  </div>
                </div>
                <Link to="/checkout">
                <div onClick={() => dispatch(open())} className="text-center bg-white text-primary p-3 mt-8 rounded-xl">
                    Đến trang Thanh Toán
                </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
