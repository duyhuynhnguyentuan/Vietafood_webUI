import {useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logoImg from "../../../../assets/logo.png"
import loading from "../../../../assets/loading.json";
import Lottie from "lottie-react";
const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://vietafoodtrial.somee.com/api/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        const token = response.data.data.token;
        const expirationTime = JSON.parse(atob(token.split('.')[1])).exp * 1000; // c
        console.log(expirationTime)

        localStorage.setItem('user', JSON.stringify({
          email: response.data.data.email,
          token: token,
          expiration: expirationTime,
        }));
        setIsLoading(false);
        navigate('/admin/dashboard');
      } else {
        alert("Đăng nhập thất bại");
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert('Login failed!');
    }
  };

  return (
    <div className="bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("https://picsum.photos/1920/1080")' }}>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-3xl flex flex-col justify-center items-center font-bold mb-8 text-center">
            <img src={logoImg} className="size-20" />
           <span className="text-primary">
            Đăng nhập
           </span>
            </h1>
            {isLoading ? (
                <Lottie animationData={loading} loop={true} />
            ) : (
          <form>
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2" htmlFor="email">
                Email 
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div onClick={() => {
                alert("Quên thì nhớ đi má =))")
              }} className="text-gray-600 underline hover:text-gray-800">
                Forgot your password? 
              </div>
            </div>
            <div className="mb-6">
              <button
                className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
        )}
        </div>
      </div>
    </div>
  );
};

export default Login;
