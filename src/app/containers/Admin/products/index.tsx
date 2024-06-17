import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase-config";

interface Product {
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
}

const AdminProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    productKey: '',
    name: '',
    description: '',
    guildToUsing: '',
    weight: '',
    price: 0,
    expiryDay: '',
    imageUrl: '',
    quantity: 0,
    status: 1,
  });
  const [editProduct, setEditProduct] = useState<Product>({
    productKey: '',
    name: '',
    description: '',
    guildToUsing: '',
    weight: '',
    price: 0,
    expiryDay: '',
    imageUrl: '',
    quantity: 0,
    status: 1,
  });

  const formatPrice = (price: number): string => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const getToken = (): string | void => {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user && user.token) {
      return user.token;
    } else {
      navigate("/admin/login");
    }
  };

  const token = getToken();

  const uploadFile = async (): Promise<string> => {
    if (!imageUpload) return Promise.reject('No image file selected');
    const imageRef = ref(storage, `${imageUpload.name}`);
    await uploadBytes(imageRef, imageUpload);
    return getDownloadURL(imageRef);
  };

  useEffect(() => {
    if (token) {
      axios.get('https://vietafoodtrial.somee.com/api/product', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setProducts(response.data.data.items);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch products: ' + error.message);
        setLoading(false);
      });
    }
  }, [token]);

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      axios.delete(`https://vietafoodtrial.somee.com/api/product/${selectedProduct.productKey}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setProducts(products.filter(product => product.productKey !== selectedProduct.productKey));
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
        console.log(response.data)
      })
      .catch(error => {
        setError('Failed to delete product: ' + error.message);
        setIsDeleteModalOpen(false);
      });
    }
  };

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleConfirmCreate = async () => {
    try {
      const imageUrl = await uploadFile();
      const productToCreate = { ...newProduct, imageUrl };
      axios.post('https://vietafoodtrial.somee.com/api/product', productToCreate, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        setProducts([...products, response.data]);
        setIsCreateModalOpen(false);
        setNewProduct({
          productKey: '',
          name: '',
          description: '',
          guildToUsing: '',
          weight: '',
          price: 0,
          expiryDay: '',
          imageUrl: '',
          quantity: 0,
          status: 1,
        });
        setImageUpload(null);
      })
      .catch(error => {
        setError('Failed to create product: ' + error.message);
        setIsCreateModalOpen(false);
      });
    } catch (error) {
      setError('Failed to upload image');
      setIsCreateModalOpen(false);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditProduct(product);
    setIsEditModalOpen(true);
  };

  const handleConfirmEdit = async () => {
    try {
      let imageUrl = editProduct.imageUrl;
      if (imageUpload) {
        imageUrl = await uploadFile();
      }
      const productToEdit = { ...editProduct, imageUrl };
      axios.put(`https://vietafoodtrial.somee.com/api/product/${editProduct.productKey}`, productToEdit, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        setProducts(products.map(p => (p.productKey === editProduct.productKey ? response.data : p)));
        setIsEditModalOpen(false);
        setEditProduct({
          productKey: '',
          name: '',
          description: '',
          guildToUsing: '',
          weight: '',
          price: 0,
          expiryDay: '',
          imageUrl: '',
          quantity: 0,
          status: 1,
        });
        setImageUpload(null);
      })
      .catch(error => {
        setError('Failed to edit product: ' + error.message);
        setIsEditModalOpen(false);
      });
    } catch (error) {
      setError('Failed to upload image');
      setIsEditModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
    setEditProduct({ ...editProduct, [name]: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handleCreateClick}
        >
          Tạo sản phẩm mới
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tên sản phẩm 
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mô tả
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Giá
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hạn sử dụng
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hướng dẫn sử dụng
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Link ảnh
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Số lượng trong kho 
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map(product => (
            <tr key={product.productKey}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={product.imageUrl} alt={product.name} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.weight}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 text-wrap">{product.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatPrice(product.price)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.expiryDay}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 text-wrap">{product.guildToUsing}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <a href={product.imageUrl} className="text-sm text-gray-900 underline text-wrap">Link ảnh</a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 text-wrap">{product.quantity}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => handleEditClick(product)}
                >
                  Sửa
                </button>
                <button 
                  className="ml-2 text-red-600 hover:text-red-900" 
                  onClick={() => handleDeleteClick(product)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        open={isDeleteModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-delete-title"
        aria-describedby="modal-delete-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1
          }}
        >
          <Typography id="modal-delete-title" variant="h6" component="h2">
            Xác nhận xóa
          </Typography>
          <Typography id="modal-delete-description" sx={{ mt: 2 }}>
            Bạn có chắc chắn muốn xóa sản phẩm này không?
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleConfirmDelete}>
              Có
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCloseModal}>
              Không
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isCreateModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-create-title"
        aria-describedby="modal-create-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1
          }}
        >
          <Typography id="modal-create-title" variant="h6" component="h2">
            Tạo sản phẩm mới
          </Typography>
          <TextField
            label="Tên sản phẩm"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Mô tả"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Hướng dẫn sử dụng"
            name="guildToUsing"
            value={newProduct.guildToUsing}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Khối lượng"
            name="weight"
            value={newProduct.weight}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Giá"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Hạn sử dụng"
            name="expiryDay"
            value={newProduct.expiryDay}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          {/* <TextField
            label="Link ảnh"
            name="imageUrl"
            value={newProduct.imageUrl}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          /> */}
          <TextField
            label="Số lượng trong kho"
            name="quantity"
            type="number"
            value={newProduct.quantity}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <p>chọn ảnh</p>
          <input
            type="file"
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                setImageUpload(event.target.files[0]);
              }
            }}
          />
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleConfirmCreate}>
              Tạo
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCloseModal}>
              Hủy
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={isEditModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-edit-title"
        aria-describedby="modal-edit-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1
          }}
        >
          <Typography id="modal-edit-title" variant="h6" component="h2">
            Chỉnh sửa sản phẩm
          </Typography>
          <TextField
            label="Tên sản phẩm"
            name="name"
            value={editProduct.name}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Mô tả"
            name="description"
            value={editProduct.description}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Hướng dẫn sử dụng"
            name="guildToUsing"
            value={editProduct.guildToUsing}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Khối lượng"
            name="weight"
            value={editProduct.weight}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Giá"
            name="price"
            type="number"
            value={editProduct.price}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Hạn sử dụng"
            name="expiryDay"
            value={editProduct.expiryDay}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Link ảnh"
            name="imageUrl"
            value={editProduct.imageUrl}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <input
            type="file"
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                setImageUpload(event.target.files[0]);
              }
            }}
          />
          <TextField
            label="Số lượng trong kho"
            name="quantity"
            type="number"
            value={editProduct.quantity}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={handleConfirmEdit}>
              Chỉnh sửa
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCloseModal}>
              Hủy
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminProductDetails;
