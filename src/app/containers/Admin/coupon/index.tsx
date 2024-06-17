import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface Coupon {
    couponKey: string;
    couponCode: string;
    description: string;
    discountPercentage: number;
    numOfUses: number;
    expiredDate: string;
    email: string | null;
    createdDate: string;
}

const AdminCouponDetails: React.FC = () => {
    
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

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
        const fetchCoupons = async () => {
            try {
                const response = await axios.get('https://vietafoodtrial.somee.com/api/coupon', {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCoupons(response.data.data.items);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCoupons();
    }, [token]);

    const handleClickOpen = (coupon: Coupon) => {
        setSelectedCoupon(coupon);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = async () => {
        if (selectedCoupon) {
            try {
                await axios.delete(`https://vietafoodtrial.somee.com/api/coupon/${selectedCoupon.couponKey}`, {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCoupons(coupons.filter(coupon => coupon.couponKey !== selectedCoupon.couponKey));
            } catch (error) {
                console.error('Error deleting coupon:', error);
            } finally {
                setOpen(false);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Danh sách Coupon</h2>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
                    Thêm Coupon
                </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mã Coupon
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            % Giảm
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Số lượt sử dụng
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Người tạo
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thời gian 
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {coupons.map((coupon) => (
                        <tr key={coupon.couponKey}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {coupon.couponCode}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {coupon.description}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{coupon.discountPercentage} (%)</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {coupon.numOfUses}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {coupon.email || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Ngày tạo: {new Date(coupon.createdDate).toLocaleDateString()}<br />
                                Ngày hết hạn: {new Date(coupon.expiredDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-indigo-600 hover:text-indigo-900">Sửa</button>
                                <button className="ml-2 text-red-600 hover:text-red-900" onClick={() => handleClickOpen(coupon)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Xác nhận xóa"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn muốn xóa mã coupon này không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AdminCouponDetails;
