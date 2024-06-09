import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Marginer } from "../../components/marginer";
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
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
  useEffect(() => {
    const citis = document.getElementById("city") as HTMLSelectElement;
    const districts = document.getElementById("district") as HTMLSelectElement;
    const wards = document.getElementById("ward") as HTMLSelectElement;
   

    axios
    .get
    ("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json").then(result => {
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

  return (
    <div className="container mx-auto mt-[100px]">
      <div className="text-center text-4xl font-black text-primary">Thanh Toán</div>
      <div className="sm:flex shadow-md flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl text-primary">Đơn hàng</h1>
            <h2 className="font-semibold text-2xl text-primary">3 sản phẩm</h2>
          </div>
          <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-primary">
            <div className="md:w-4/12 2xl:w-1/4 w-full">
              <img src="https://firebasestorage.googleapis.com/v0/b/vietafood-54b3d.appspot.com/o/1%20xoai.png?alt=media&token=b61e0f2c-727b-4d3c-8be4-d0721c922f35" alt="Black Leather Purse" className="h-full object-center object-cover md:block hidden" />
              <img src="https://firebasestorage.googleapis.com/v0/b/vietafood-54b3d.appspot.com/o/1%20xoai.png?alt=media&token=b61e0f2c-727b-4d3c-8be4-d0721c922f35" alt="Black Leather Purse" className="md:hidden w-full h-full object-center object-cover" />
            </div>
            <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
              <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">Vietafood</p>
              <div className="flex items-center justify-between w-full">
                <p className="text-base font-black leading-none text-gray-800">Xoài xấy dẻo</p>
                <div className="py-2 px-1 border border-primary mr-6 focus:outline-none">
                  x2
                </div>
              </div>
              <p className="text-xs leading-3 text-gray-600 pt-2">Khối lượng: 250 gram</p>
              <p className="text-xs leading-3 text-gray-600 py-4">Hạn sử dụng: 6 tháng kể từ ngày sản xuất</p>
              <div className="flex items-center justify-between pt-5">
                <p className="text-base font-black leading-none text-primary">50,000đ</p>
              </div>
            </div>
          </div>
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
            <span className="font-semibold text-sm">đ 50,000</span>
          </div>
          <div className="flex flex-col space-y-4 mt-4 mb-5">
            <span className="">
              <h1 className="text-sm font-extralight">Email</h1>
              <input
                type="email"
                placeholder="Nhập email tại đây"
                className="p-2 text-sm w-full border border-primary"
              />
            </span>
            <span className="">
              <h1 className="text-sm font-extralight">Tên</h1>
              <input
                type="text"
                placeholder="Nhập tên tại đây"
                className="p-2 text-sm w-full border border-primary"
              />
            </span>
            <span className="">
              <h1 className="text-sm font-extralight">Số điện thoại</h1>
              <input
                type="tel"
                placeholder="Nhập số điện thoại tại đây"
                className="p-2 text-sm w-full border border-primary"
              />
            </span>
            <span className=" flex flex-col">
              <h1 className="text-sm font-extralight">Địa chỉ</h1>
              <input
                type="text"
                placeholder="Nhập địa chỉ tại đây"
                id="address"
                className="p-2 text-sm w-full border border-primary"
              />
              <select className="form-select border mt-2 p-2 border-primary form-select-sm mb-3" id="city" aria-label=".form-select-sm">
                <option value="" selected>Chọn tỉnh thành</option>           
              </select>
              <select className="form-select border  border-primary  p-2 form-select-sm mb-3" id="district" aria-label=".form-select-sm">
                <option value="" selected>Chọn quận huyện</option>
              </select>
              <select className="form-select  border p-2 border-primary form-select-sm" id="ward" aria-label=".form-select-sm">
                <option value="" selected>Chọn phường xã</option>
              </select>
            </span>
          </div>
          <div>
            <label className="font-bold inline-block mb-3 text-sm uppercase">
              Thanh toán
            </label>
            <div className="block p-3 border border-primary text-gray-600 w-full text-sm ">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-row justify-center items-center">
                <Checkbox defaultChecked />
                <p className="text-center font-semibold" >
                Chuyển khoản qua ngân hàng MB
                </p>
                </div>
                <p className="text-start" >
                Chủ tài khoản: HHH - STK: 0835488888
                </p>
                <p className="text-start" >
                Ngân hàng MB, Chi nhánh Bình Phước
                </p>
                <p className="text-start" >
                Mục nội dung gửi: Số điện thoại_Mã đơn hàng
                </p>
                <p className="text-start p-2 text-md bg-gray-300" >
                <WarningAmberIcon/>
                {" "}Sau khi hoàn tất chuyển khoản, thư xác nhận thanh toán sẽ được gửi vào hòm thư của email đặt hàng. Trong trường hợp quá 3 tiếng mà chưa nhận được thư xác nhận, bạn vui lòng kiểm tra mục spam hoặc nhắn tin qua fanpage Vietafood tại{" "}
                <a className="underline" href="https://www.facebook.com/VietaFood">https://www.facebook.com/VietaFood</a>
                {" "}- hoặc gọi số hotline 0835488888 để được hỗ trợ.
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
            />
            <button className="mt-5 bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              Áp dụng mã
            </button>
          </div>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Tổng cộng</span>
              <span>50000đ</span>
            </div>
            <button 
              className="bg-primary font-semibold hover:bg-secondary py-3 text-sm text-white uppercase w-full"
              onClick={() => alert(getAddress())}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
      <Marginer margin="4em" direction="vertical"/>
    </div>
  );
}

export default CheckOutPage;
