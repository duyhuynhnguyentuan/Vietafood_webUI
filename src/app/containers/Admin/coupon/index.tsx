import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

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
    const [createOpen, setCreateOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
    const [newCoupon, setNewCoupon] = useState<Omit<Coupon, 'couponKey' | 'createdDate'>>({
        couponCode: '',
        description: '',
        discountPercentage: 0,
        numOfUses: 0,
        expiredDate: '',
        email: ''
    });
    const [editCoupon, setEditCoupon] = useState<Omit<Coupon, 'couponKey' | 'createdDate'>>({
        couponCode: '',
        description: '',
        discountPercentage: 0,
        numOfUses: 0,
        expiredDate: '',
        email: ''
    });

    function getToken() {
        const user = JSON.parse(localStorage.getItem('user')!);
        if (user && user.token) {
            return user.token;
        } else {
            navigate("/admin/login");
        }
    }

    function getEmail() {
        const user = JSON.parse(localStorage.getItem('user')!);
        if (user && user.email) {
            return user.email;
        } else {
            navigate("/admin/login");
        }
    }

    const email = getEmail();
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

    const handleEditOpen = (coupon: Coupon) => {
        setSelectedCoupon(coupon);
        setEditCoupon({
            couponCode: coupon.couponCode,
            description: coupon.description,
            discountPercentage: coupon.discountPercentage,
            numOfUses: coupon.numOfUses,
            expiredDate: coupon.expiredDate,
            email: coupon.email
        });
        setEditOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCreateOpen(false);
        setEditOpen(false);
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

    const handleCreateOpen = () => {
        setCreateOpen(true);
    };

    const handleCreate = async () => {
        try {
            await axios.post('https://vietafoodtrial.somee.com/api/coupon', {
                ...newCoupon,
                email: email,
                expiredDate: parseInt(newCoupon.expiredDate, 10)
            }, {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // Refresh coupon list after creation
            const response = await axios.get('https://vietafoodtrial.somee.com/api/coupon', {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`
                }
            });
            setCoupons(response.data.data.items);
        } catch (error) {
            console.error('Error creating coupon:', error);
        } finally {
            setCreateOpen(false);
        }
    };

    const handleEdit = async () => {
        if (selectedCoupon) {
            try {
                await axios.put(`https://vietafoodtrial.somee.com/api/coupon/${selectedCoupon.couponKey}`, {
                    ...editCoupon,
                    expiredDate: parseInt(editCoupon.expiredDate, 10)
                }, {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                // Refresh coupon list after edit
                const response = await axios.get('https://vietafoodtrial.somee.com/api/coupon', {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCoupons(response.data.data.items);
            } catch (error) {
                console.error('Error editing coupon:', error);
            } finally {
                setEditOpen(false);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCoupon({
            ...newCoupon,
            [name]: value
        });
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditCoupon({
            ...editCoupon,
            [name]: value
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Danh sách Coupon</h2>
                <button onClick={handleCreateOpen} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
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
                                {coupon.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Ngày tạo: {new Date(coupon.createdDate).toLocaleDateString()}<br />
                                Ngày hết hạn: {new Date(coupon.expiredDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleEditOpen(coupon)}>Sửa</button>
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
            <Dialog
                open={createOpen}
                onClose={handleClose}
                aria-labelledby="create-dialog-title"
            >
                <DialogTitle id="create-dialog-title">{"Thêm Coupon"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="couponCode"
                        label="Mã Coupon"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCoupon.couponCode}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Mô tả"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newCoupon.description}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="discountPercentage"
                        label="Phần trăm giảm giá"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newCoupon.discountPercentage}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="numOfUses"
                        label="Số lượt sử dụng"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newCoupon.numOfUses}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="expiredDate"
                        label="Số ngày hết hạn"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newCoupon.expiredDate}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleCreate} color="primary">
                        Tạo
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={editOpen}
                onClose={handleClose}
                aria-labelledby="edit-dialog-title"
            >
                <DialogTitle id="edit-dialog-title">{"Sửa Coupon"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="couponCode"
                        label="Mã Coupon"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editCoupon.couponCode}
                        onChange={handleEditInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Mô tả"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editCoupon.description}
                        onChange={handleEditInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="discountPercentage"
                        label="Phần trăm giảm giá"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={editCoupon.discountPercentage}
                        onChange={handleEditInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="numOfUses"
                        label="Số lượt sử dụng"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={editCoupon.numOfUses}
                        onChange={handleEditInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="expiredDate"
                        label="Số ngày hết hạn"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={editCoupon.expiredDate}
                        onChange={handleEditInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleEdit} color="primary">
                        Sửa
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AdminCouponDetails;
