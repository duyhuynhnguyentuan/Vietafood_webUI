import { IProduct } from '../../../../types/product';
import ClearIcon from '@mui/icons-material/Clear';
import { increase, decrease, remove } from '../../components/State/Slice/CartSlice';
import { useDispatch } from 'react-redux';
interface IProductProps extends IProduct {
  cartItem: IProduct;
}

const formatPrice = (price: number): string => {
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const CheckOutItem = ({ cartItem }: IProductProps) => {
  const dispatch = useDispatch();
  return (
    <div className='flex justify-between items-center border border-solid border-white p-4 mb-6 text-white'>
      <div className="flex items-center gap-4">
        <img src={cartItem.imageUrl} alt={cartItem.name} className='w-20 h-20 object-cover' />
      </div>
      <div className='flex flex-col items-start max-w-[6.8rem]'>
        <div>{cartItem.name}</div>
        <div className="flex items-center gap-4 mt-2">
          <button className='w-8 h-8 text-primary bg-white rounded-full' onClick={() => dispatch(decrease(cartItem))}>-</button>
          <div>{cartItem.amount}</div>
          <button className='w-8 h-8 text-primary bg-white rounded-full' onClick={() => dispatch(increase(cartItem))}>+</button>
        </div>
      </div>
      <div className='flex flex-col items-center gap-3 '>
        <div onClick={() => dispatch(remove(cartItem))}>
        <ClearIcon className='cursor-pointer text-xl'/>
        </div>
        <div>{(cartItem.price && cartItem.amount) ? formatPrice(cartItem.price * cartItem.amount) : '0.0 VND'}</div>
      </div>
    </div>
  );
};

export default CheckOutItem;
