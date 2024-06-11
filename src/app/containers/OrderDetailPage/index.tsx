import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import Lottie from "lottie-react";
import loading from "../../../assets/loading.json";
import Checkbox from '@mui/material/Checkbox';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
type CustomerInfo = {
  customerInfoKey: string;
  name: string;
  email: string;
  address: string;
  phone: string;
};

type Product = {
  productKey: string;
  name: string;
  description: string;
  guildToUsing: string;
  weight: string;
  price: number;
  expiryDay: string;
  imageUrl: string;
  quantity: number;
  status: number;
};

type OrderDetail = {
  orderDetailKey: string;
  product: Product;
  quantity: number;
  actualPrice: number;
};

type CouponInfo = {
  couponKey: string;
  couponCode: string;
  description: string;
  discountPercentage: number;
  numOfUses: number;
  expiredDate: string;
  createdBy: string;
  createdDate: string;
};

type Order = {
  orderKey: string;
  customerInfo: CustomerInfo;
  orderDetails: OrderDetail[];
  couponInfo?: CouponInfo;
  createdAt: string;
  totalPrice: number;
  status: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: Order;
};
const LoadingContainer = styled.div`
  ${tw`flex justify-center items-center mt-[100px] md:mt-0 w-full h-full`}
`;
const formatPrice = (price: number): string => {
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
const translateStatus = (status: string): string => {
    switch (status) {
      case "Unpaid":
        return "Chưa thanh toán";
      case "Paid":
        return "Đã thanh toán";
      case "Shipping":
        return "Đang giao hàng";
      case "Delivered":
        return "Đã giao hàng thành công";
      default:
        return status; // Fallback to original status if no match is found
    }
  };
  
const PageContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-full
    h-full
    mt-[68px]
    items-center
  `}
`;

const OrderDetailContainer = styled.div`
  ${tw`
    w-full 
    max-w-screen-2xl
    flex 
    flex-col
  `}
`;

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>(); 
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const apiUrl = `https://vietafoodtrial.somee.com/api/order/${id}`;
        console.log(apiUrl)
        const response = await axios.get<ApiResponse>(apiUrl);
        if (response.data.success) {
          setOrder(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return (
        <LoadingContainer>
        <Lottie animationData={loading} loop={true} />
      </LoadingContainer> 
    );
  }

  const { customerInfo, orderDetails, couponInfo, createdAt, totalPrice, status } = order;

  // Calculate subtotal (Tạm tính)
  const subTotal = orderDetails.reduce((acc, detail) => acc + detail.actualPrice, 0);


  return (
    <PageContainer>
      <OrderDetailContainer>
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
          <div className="flex justify-start item-start space-y-2 flex-col">
            <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-primary">Đơn hàng #{order.orderKey}</h1>
            {status === "Unpaid" ? (
            <div>
            <div className="block p-3 border border-primary text-gray-600 w-full text-sm ">
            <label className="font-bold inline-block mb-3 text-sm uppercase">
              Thanh toán
            </label>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-row justify-center items-center">
                <Checkbox defaultChecked />
                <p className="text-center font-semibold" >
                Chuyển khoản qua ngân hàng MB
                </p>
                </div>
                <div className="flex justify-center">
                <img className="w-full md:max-w-screen-md" src={`https://api.vietqr.io/image/970422-0835488888-2fl0HC9.jpg?accountName=HUYNH%20NGUYEN%20TUAN%20DUY&amount=${totalPrice}&addInfo=${order.customerInfo.phone} ${order.orderKey}`} />
                </div>
                <p className="text-start" >
                Chủ tài khoản: Huỳnh Nguyễn Tuấn Duy - STK: 0835488888
                </p>
                <p className="text-start" >
                Ngân hàng MB, Chi nhánh Bình Phước
                </p>
                <p className="text-start" >
                Mục nội dung gửi: {order.customerInfo.phone} {order.orderKey}
                </p>
                <p className="text-start p-2 text-md bg-gray-300" >
                <WarningAmberIcon/>
                {" "}Sau khi hoàn tất chuyển khoản, thư xác nhận thanh toán sẽ được gửi vào hòm thư của email đặt hàng. Trong trường hợp quá 3 tiếng mà chưa nhận được thư xác nhận, bạn vui lòng kiểm tra mục spam hoặc nhắn tin qua fanpage VietaFood tại{" "}
                <a className="underline" href="https://www.facebook.com/VietaFood">https://www.facebook.com/VietaFood</a>
                {" "}- hoặc gọi số hotline 0835488888 để được hỗ trợ.
                </p>
              </div>
            </div>
          </div>) : (<div></div>) }
            <h1 className="text-lg lg:text-2xl font-medium leading-7 lg:leading-9 text-red-500">Trạng thái: {translateStatus(status)}</h1>
            <p className="text-base font-medium leading-6 text-gray-600">Ngày đặt hàng: {new Date(createdAt).toLocaleString()}</p>
          </div>
          <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col justify-start items-start bg-secondary px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-white">Chi tiết</p>
                {orderDetails.map((detail) => (
                  <div key={detail.orderDetailKey} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img className="w-full hidden md:block" src={detail.product.imageUrl} alt={detail.product.name} />
                      <img className="w-full md:hidden" src={detail.product.imageUrl} alt={detail.product.name} />
                    </div>
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start ">
                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-white">{detail.product.name}</h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                        
                          <p className="text-sm leading-none text-white"><span className=" text-gray-800">Trọng lượng: </span>{detail.product.weight}</p>
                          <p className="text-sm leading-none text-white"><span className=" text-gray-800">Hạn sử dụng: </span>{detail.product.expiryDay}</p>
                        </div>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base xl:text-lg leading-6">{formatPrice(detail.product.price)}</p>
                        <p className="text-basexl:text-lg leading-6 text-gray-800">x {detail.quantity}</p>
                        <p className="text-base xl:text-lg font-semibold leading-6 text-white">{formatPrice(detail.product.price * detail.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                  <h3 className="text-xl font-semibold leading-5 text-gray-800">Tóm tắt đơn hàng</h3>
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div className="flex justify-between w-full">
                      <p className="text-base leading-4 text-gray-800">Tạm tính</p>
                      <p className="text-base leading-4 text-gray-600">{formatPrice(subTotal)}</p>
                    </div>
                    {couponInfo?.couponCode ? (
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base leading-4 text-gray-800">Coupon <span className="bg-gray-200 p-1 text-xs font-medium leading-3 text-gray-800">{couponInfo.couponCode}</span></p>
                      <p className="text-base leading-4 text-gray-600">- {couponInfo.discountPercentage}%</p>
                    </div>): <div></div> }
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base leading-4 text-gray-800">Giao hàng</p>
                      <p className="text-base leading-4 text-gray-600">{formatPrice(30000)}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base font-semibold leading-4 text-gray-800">Tổng cộng</p>
                    <p className="text-base font-semibold leading-4 text-gray-600">{formatPrice(totalPrice)}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                  <h3 className="text-xl font-semibold leading-5 text-gray-800">Vận chuyển</h3>
                  <div className="flex justify-between items-start w-full">
                    <div className="flex justify-center items-center space-x-4">
                      <div className="w-8 h-8">
                        <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                      </div>
                      <div className="flex flex-col justify-start items-center">
                        <p className="text-lg leading-6 font-semibold text-gray-800">Giao hàng tiêu chuẩn<br /><span className="font-normal">Từ 3 - 6 ngày làm việc</span></p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold leading-6 text-gray-800">{formatPrice(30000)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">Khách hàng</h3>
              <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                <div className="flex flex-col justify-start items-start flex-shrink-0">
                  <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                    <img src="/public/favicon.ico" alt="avatar" />
                    <div className="flex justify-start items-start flex-col space-y-2">
                      <p className="text-base font-semibold leading-4 text-left text-gray-800">{customerInfo.name}</p>
                    </div>
                  </div>
                  <div className="flex justify-center text-gray-800 md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                    <img className="" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg" alt="email" />
                    <img className="hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg" alt="email" />
                    <p className="cursor-pointer text-sm leading-5">{customerInfo.email}</p>
                  </div>
                </div>
                <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                  <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                      <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Địa chỉ giao hàng</p>
                      <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{customerInfo.address}</p>
                    </div>
                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                      <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Số điện thoại</p>
                      <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{customerInfo.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </OrderDetailContainer>
    </PageContainer>
  );
};

export default OrderDetail;
