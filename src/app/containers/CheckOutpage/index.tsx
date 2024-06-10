import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { Marginer } from "../../components/marginer";
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon } from "../../components/State/Slice/CartSlice";
import { RootState } from '../../store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const formatPrice = (price: number): string => {
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
interface City {
  Name: string;
  Id: string;
  Districts: District[];
}

interface District {
  Name: string;
  Id: string;
  Wards: Ward[];
}

interface Ward {
  Name: string;
  Id: string;
}

const CheckOutPage: React.FC = () => {
  const [couponDescription, setCouponDescription] = useState<string>("");
  const [couponInput, setCouponInput] = useState<string>("");
  const [couponName, setCouponName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [ward, setWard] = useState<string>("");
  const navigate = useNavigate()
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const dispatch = useDispatch();
  const { amount, cartItems, total, finalTotal } = useSelector((state: RootState) => state.cart);
  useEffect(() => {
    const citis = document.getElementById("city") as HTMLSelectElement;
    const districts = document.getElementById("district") as HTMLSelectElement;
    const wards = document.getElementById("ward") as HTMLSelectElement;

    axios
      .get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
      .then(result => {
        renderCity(result.data);
      });

    function renderCity(data: City[]) {
      for (const x of data) {
        citis.options[citis.options.length] = new Option(x.Name, x.Id);
      }

      citis.onchange = function (this: GlobalEventHandlers) {
        const inputElement = this as HTMLInputElement;
        districts.length = 1;
        wards.length = 1;
        if (inputElement.value !== "") {
          const result = data.filter(n => n.Id === inputElement.value);
          for (const k of result[0].Districts) {
            districts.options[districts.options.length] = new Option(k.Name, k.Id);
          }
        }
      };

      districts.onchange = function (event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        wards.length = 1;
        const dataCity = data.filter(n => n.Id === citis.value);
        if (selectElement.value !== "") {
          const dataWards = dataCity[0].Districts.filter(n => n.Id === selectElement.value)[0].Wards;
          for (const w of dataWards) {
            wards.options[wards.options.length] = new Option(w.Name, w.Id);
          }
        }
      };
    }
  }, []);

  const getAddress = (): string => {
    const city = document.getElementById("city") as HTMLSelectElement;
    const district = document.getElementById("district") as HTMLSelectElement;
    const ward = document.getElementById("ward") as HTMLSelectElement;
    const addressInput = document.getElementById("address") as HTMLInputElement;

    const cityText = city.options[city.selectedIndex].text;
    const districtText = district.options[district.selectedIndex].text;
    const wardText = ward.options[ward.selectedIndex].text;
    const addressText = addressInput.value;

    return `${addressText}, ${wardText}, ${districtText}, ${cityText}`;
  };

  const applyCoupon = () => {
    const couponCode = couponInput;
    setCouponDescription("Đang tìm mã giảm giá...");
    axios.get(`https://vietafoodtrial.somee.com/api/coupon/${couponCode}`)
      .then(response => {
        if (response.data.success) {
          setCouponDescription(`Đã áp dụng: "${response.data.data.description}" !`);
          dispatch(addCoupon(response.data.data.discountPercentage));
          setCouponName(response.data.data.couponCode);
        } else {
          setCouponDescription("Mã giảm giá không hợp lệ");
          dispatch(addCoupon(0));
        }
      })
      .catch(error => {
        console.error("Error applying coupon:", error);
        setCouponDescription("Không tìm thấy coupon!");
        dispatch(addCoupon(0));
      });
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!email) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!name) {
      newErrors.name = "Tên không được để trống";
    }

    if (!phone) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^\d+$/.test(phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!address) {
      newErrors.address = "Địa chỉ không được để trống";
    }

    if (!city) {
      newErrors.city = "Vui lòng chọn tỉnh thành";
    }

    if (!district) {
      newErrors.district = "Vui lòng chọn quận huyện";
    }

    if (!ward) {
      newErrors.ward = "Vui lòng chọn phường xã";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleOrder = () => {
    if (validateForm()) {
      const id = toast.loading("Đơn hàng đang được thực hiện...")
      const order = {
        customerInfo: {
          name,
          email,
          address: getAddress(),
          phone,
        },
        items: cartItems.map(item => ({
          productKey: item.productKey,
          quantity: item.amount,
          actualPrice: (item.price! * item.amount),
        })),
        couponCode: couponName,
        totalPrice: finalTotal,
      };
      console.log(order);
      axios.post('https://vietafoodtrial.somee.com/api/order', order)
        .then(response => {
          console.log("Order placed successfully:", response.data);
          toast.update(id, {render: "Đơn hàng được tạo thành công!", type: "success", isLoading: false});
          console.log(response.data.data.orderKey)
          console.log(response.data)
          redirect(`/orderDetail/${response.data.data.orderKey}`)
          navigate(`/orderDetail/${response.data.data.orderKey}`)
        })
        .catch(error => {
          console.error("Error placing order:", error);
          toast.update(id, {render: "Đã xảy ra lỗi...", type: "error", isLoading: false });
        });
    }
  };

  return (
    <div className="container mx-auto mt-[100px]">
      {amount === 0 ? (
        <div className="flex flex-col justify-center">
          <Marginer margin="4em" direction="vertical"/>
        <div className="text-center text-4xl font-black text-primary">Không có sản phẩm nào trong giỏ hàng</div>
        <Link to="/" className="text-center underline"> bấm vào đây để quay lại trang chủ</Link>
        <Marginer margin="4em" direction="vertical"/>
        </div>
      ):(
        <div>
      <div className="text-center text-4xl font-black text-primary">Thanh Toán</div>
      <div className="sm:flex shadow-md flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl text-primary">Đơn hàng</h1>
            <h2 className="font-semibold text-2xl text-primary">{amount} sản phẩm</h2>
          </div>
          {cartItems.map(cartItem => (
          <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-primary">
            <div className="md:w-4/12 2xl:w-1/4 w-full">
              <img src={cartItem.imageUrl} alt="San pham" className="h-full object-center object-cover md:block hidden" />
              <img src={cartItem.imageUrl} alt="San pham" className="md:hidden w-full h-full object-center object-cover" />
            </div>
            <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
              <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">Vietafood</p>
              <div className="flex items-center justify-between w-full">
                <p className="text-base font-black leading-none text-gray-800">{cartItem.name}</p>
                <div className="py-2 px-1 border border-primary mr-6 focus:outline-none">
                  x {cartItem.amount}
                </div>
              </div>
              <p className="text-xs leading-3 text-gray-600 pt-2">Khối lượng: {cartItem.weight}</p>
              <p className="text-xs leading-3 text-gray-600 py-4">Hạn sử dụng: {cartItem.expiryDay}</p>
              <div className="flex items-center justify-between pt-5">
                <p className="text-base font-black leading-none text-primary">{formatPrice(cartItem.price!)}</p>
              </div>
            </div>
          </div>
           ))}
          <div className="flex font-semibold text-primary text-sm mt-10">
            <Link to="/">
              <span className="flex items-center">
                <svg className="fill-current mr-2 text-primary w-4" viewBox="0 0 448 512">
                  <path
                    d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Quay lại trang mua hàng 
              </span>
            </Link>
          </div>
        </div>
        <div id="summary" className="w-full md:w-1/2 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b border-primary pb-8 text-primary">Thông tin mua hàng</h1>
          <div className="flex justify-between mt-5 mb-5">
            <span className="font-semibold text-sm uppercase">Tạm tính</span>
            <span className="font-semibold text-sm">{formatPrice(total)}</span>
          </div>
          <div className="flex flex-col space-y-4 mt-4 mb-5">
            <span className="">
              <h1 className="text-sm font-extralight">Email</h1>
              <input
                type="email"
                placeholder="Nhập email tại đây"
                className="p-2 text-sm w-full border border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </span>
            <span className="">
              <h1 className="text-sm font-extralight">Tên</h1>
              <input
                type="text"
                placeholder="Nhập tên tại đây"
                className="p-2 text-sm w-full border border-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </span>
            <span className="">
              <h1 className="text-sm font-extralight">Số điện thoại</h1>
              <input
                type="tel"
                placeholder="Nhập số điện thoại tại đây"
                className="p-2 text-sm w-full border border-primary"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </span>
            <span className=" flex flex-col">
              <h1 className="text-sm font-extralight">Địa chỉ</h1>
              <input
                type="text"
                placeholder="Nhập địa chỉ chi tiết tại đây"
                id="address"
                className="p-2 text-sm w-full border border-primary"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
              <select required className="form-select border mt-2 p-2 border-primary form-select-sm mb-3" id="city" aria-label=".form-select-sm" value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="" selected>Chọn tỉnh thành</option>           
              </select>
              {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
              <select required className="form-select border  border-primary  p-2 form-select-sm mb-3" id="district" aria-label=".form-select-sm" value={district} onChange={(e) => setDistrict(e.target.value)}>
                <option value="" selected>Chọn quận huyện</option>
              </select>
              {errors.district && <p className="text-red-500 text-xs">{errors.district}</p>}
              <select required className="form-select  border p-2 border-primary form-select-sm" id="ward" aria-label=".form-select-sm" value={ward} onChange={(e) => setWard(e.target.value)}>
                <option value="" selected>Chọn phường xã</option>
              </select>
              {errors.ward && <p className="text-red-500 text-xs">{errors.ward}</p>}
            </span>
          </div>
          <div>
            <label className="font-bold inline-block mb-3 text-sm uppercase">
              Thanh toán
            </label>
            <div className="block p-3 border border-primary text-gray-600 w-full text-sm ">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-row justify-center items-center">
                  <Checkbox defaultChecked disabled />
                  <p className="text-center font-semibold">
                    Chuyển khoản qua ngân hàng MB
                  </p>
                </div>
                <p className="text-start p-2 text-md bg-gray-300">
                  <WarningAmberIcon />
                  {" "}Sau khi bấm đặt đơn hàng bạn sẽ được chuyển đến trang thông tin đơn hàng kèm với mã QR để thực hiện thanh toán{" "}
                </p>
              </div>
            </div>
          </div>
          <div>
            <label className="font-bold inline-block mb-3 text-sm uppercase">
              Vận chuyển
            </label>
            <select className="block p-2 border border-primary text-gray-600 w-full text-sm">
              <option>Giao hàng tận nơi - chuyển phát thương mại điện tử - 30.000đ</option>
            </select>
          </div>
          <div className="my-10 p-4 border border-tertiary">
            <label className="font-semibold inline-block mb-3 text-sm uppercase">
              Mã giảm giá
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Nhập mã giảm giá tại đây"
              className="p-2 text-sm w-full border border-primary"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
            />
              {couponDescription && (
                <p className="text-primary font-medium mt-2">{couponDescription}</p>
              )}
            <button
              className="mt-5 bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
              onClick={applyCoupon}
            >
              Áp dụng mã
            </button>
          </div>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Tổng cộng</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
            <button
              className="bg-primary font-semibold hover:bg-secondary py-3 text-sm text-white uppercase w-full"
              onClick={handleOrder}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
      <Marginer margin="4em" direction="vertical" />
      </div>
    )}
    </div>
  );
};

export default CheckOutPage;
