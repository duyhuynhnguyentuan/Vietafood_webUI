import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



import {
  Box,
  Button,
  Modal,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';


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

const statusMapping: { [key: string]: number } = {
  "Đã thanh toán": 2,
  "Chưa Thanh Toán": 1,
  "Đang giao hàng": 3,
  "Thành công": 4
};

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
} | null;

type Order = {
  orderKey: string;
  customerInfo: CustomerInfo;
  orderDetails: OrderDetail[];
  couponInfo: CouponInfo;
  createdAt: string;
  totalPrice: number;
  status: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: {
    items: Order[];
  };
};

const AdminOrderDetails: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [selectedSendEmailOrder, setSelectedSendEmailOrder] = useState<Order | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [openSendEmailModal, setOpenSendEmailModal] = useState(false);
  const navigate = useNavigate();

 
  function getToken() {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user && user.token) {
      return user.token;
    } else {
      navigate("/admin/login");
    }
  }
  const token = getToken();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          'https://vietafoodtrial.somee.com/api/order',
          {
            headers: {
              'accept': '*/*',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        const sortedOrders = response.data.data.items.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        setOrders(sortedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [token, navigate]);

  // Axios interceptor to handle 401 errors
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        alert('Hãy đăng nhập lại');
        navigate('/admin/login');
        navigate(0);
      }
      return Promise.reject(error);
    }
  );

  const handleOpenSendEmail = (order: Order) => {
    setSelectedSendEmailOrder(order);
    setOpenSendEmailModal(true);
  };
  const handleCloseSendEmail = () => {
    setSelectedSendEmailOrder(null);
    setOpenSendEmailModal(false);
  };
  const handleOpenDelete = (orderKey: string) => {
    setSelectedOrder(orderKey);
    setOpenDeleteModal(true);
  };
  const handleCloseDelete = () => {
    setSelectedOrder(null);
    setOpenDeleteModal(false);
  };
  const handleOpenStatus = (orderKey: string) => {
    setSelectedOrder(orderKey);
    setOpenStatusModal(true);
  };
  const handleCloseStatus = () => {
    setSelectedOrder(null);
    setOpenStatusModal(false);
  };

  const handleDelete = async () => {
    if (selectedOrder) {
      try {
        await axios.delete(`https://vietafoodtrial.somee.com/api/order/${selectedOrder}`, {
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
          }
        });
        setOrders(orders.filter(order => order.orderKey !== selectedOrder));
        handleCloseDelete();
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const sendEmail = async (order:Order) => {
    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order }),
      });
  
      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  

  const handleSendEmail = async () => {
    if (selectedSendEmailOrder) {
      const orderToUpdate = orders.find(order => order === selectedSendEmailOrder);
      if (orderToUpdate) {
        try {
          const requestData = {
            customerInfoKey: orderToUpdate.customerInfo.customerInfoKey,
            status: statusMapping["Đã thanh toán"] // Setting status to "Paid"
          };

          // Make API call to update order status
          await axios.put(
            `https://vietafoodtrial.somee.com/api/order/${orderToUpdate.orderKey}`,
            requestData,
            {
              headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );

          // Update state with new order status
          setOrders(orders.map(order =>
            order.orderKey === orderToUpdate.orderKey ? { ...order, status: "Đã thanh toán" } : order
          ));

          // Send confirmation email
          await sendEmail(orderToUpdate);

          handleCloseSendEmail();
        } catch (error) {
          console.error('Error updating order status and sending email:', error);
        }
      }
    }
  };

  const handleStatusChange = async () => {
    if (selectedOrder && selectedStatus) {
      const orderToUpdate = orders.find(order => order.orderKey === selectedOrder);
      if (orderToUpdate) {
        try {
          const requestData = {
            customerInfoKey: orderToUpdate.customerInfo.customerInfoKey,
            status: statusMapping[selectedStatus]
          };
          await axios.put(
            `https://vietafoodtrial.somee.com/api/order/${selectedOrder}`,
            requestData,
            {
              headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
          setOrders(orders.map(order =>
            order.orderKey === selectedOrder ? { ...order, status: selectedStatus } : order
          ));
          handleCloseStatus();
        } catch (error) {
          console.error('Error updating order status:', error);
        }
      }
    }
  };

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tên khách hàng
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sản phẩm
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trạng thái
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tổng đơn hàng
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mã giảm giá
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order: Order) => (
            <tr key={order.orderKey}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{order.customerInfo.name}</div>
                    <div className="text-sm text-gray-700">{order.customerInfo.email}</div>
                    <div className="text-sm text-gray-500">{order.customerInfo.phone}</div>
                    <div className="text-sm text-gray-500">{order.customerInfo.address}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {order.orderDetails.map((detail: OrderDetail) => (
                  <div key={detail.orderDetailKey} className="text-sm text-gray-900">
                    {detail.product.name} x{detail.quantity}
                  </div>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  order.status !== 'Unpaid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {translateStatus(order.status)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatPrice(order.totalPrice)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.couponInfo ? order.couponInfo.description : 'Không'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  className="bg-indigo-600 p-2 text-white rounded-md"
                  onClick={() => handleOpenSendEmail(order)}
                >
                  Xác nhận đã thanh toán và gửi mail
                </button>
                <button
                  className="bg-orange-300 p-2 ml-2 text-white rounded-md"
                  onClick={() => handleOpenStatus(order.orderKey)}
                >
                  Cập nhật trạng thái đơn hàng
                </button>
                <button
                  className="ml-2 bg-red-600 p-2 text-white rounded-md"
                  onClick={() => handleOpenDelete(order.orderKey)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        open={openSendEmailModal}
        onClose={handleCloseSendEmail}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Bạn có chắc chắn muốn xác nhận thanh toán và gửi email? Hãy kiểm tra kỹ
          </Typography>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleCloseSendEmail} variant="contained" color="success">
              Không
            </Button>
            <Button onClick={handleSendEmail} variant="contained" color="error" style={{ marginLeft: 8 }}>
              Có
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDelete}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Bạn có chắc chắn muốn xóa?
          </Typography>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleCloseDelete} variant="contained" color="success">
              Không
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error" style={{ marginLeft: 8 }}>
              Có
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Status Update Modal */}
      <Modal
        open={openStatusModal}
        onClose={handleCloseStatus}
        aria-labelledby="modal-status-title"
        aria-describedby="modal-status-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-status-title" variant="h6" component="h2">
            Cập nhật trạng thái đơn hàng
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="status-select-label">Trạng thái</InputLabel>
            <Select
              labelId="status-select-label"
              value={selectedStatus}
              label="Trạng thái"
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <MenuItem value="Đã thanh toán">Đã thanh toán</MenuItem>
              <MenuItem value="Chưa Thanh Toán">Chưa Thanh Toán</MenuItem>
              <MenuItem value="Đang giao hàng">Đang giao hàng</MenuItem>
              <MenuItem value="Thành công">Thành công</MenuItem>
            </Select>
          </FormControl>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleCloseStatus} variant="contained" color="success">
              Hủy
            </Button>
            <Button onClick={handleStatusChange} variant="contained" color="primary" style={{ marginLeft: 8 }}>
              Cập nhật
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AdminOrderDetails;