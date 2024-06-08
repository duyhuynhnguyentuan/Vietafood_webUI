import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    navigate(`/products?Name=${searchTerm}`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[480px] w-full">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full h-12 shadow p-4 pr-12 rounded-full border-2 border-primary focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
          placeholder="Tìm kiếm"
        />
        <button type="submit" className="absolute top-0 right-0 h-12 w-12 flex items-center justify-center">
          <svg
            className="text-primary h-5 w-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            xmlSpace="preserve"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
          </svg>
        </button>
      </div>
    </form>
  );
}
