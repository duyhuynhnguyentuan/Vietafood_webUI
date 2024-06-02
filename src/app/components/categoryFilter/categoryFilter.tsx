import { useState } from 'react';

export function CategoryFilter() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-[150px] text-gray-900 dark:text-gray-100">
      <div className="relative w-full group">
        <label className="text-xs text-gray-400">Lọc theo</label>
        <button
          onClick={toggleDropdown}
          className="py-2.5 px-3 w-full md:text-sm text-site bg-transparent border border-dimmed focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded font-semibold"
        >
          All
        </button>
        {isOpen && (
          <div className="absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] rounded-md overflow-hidden shadow-lg min-w-[200px] w-max opacity-100 duration-200 p-1 bg-gray-100 dark:bg-gray-800 border border-dimmed text-xs md:text-sm">
            <div onClick={closeDropdown} className="w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
              Tất cả
            </div>
            <div onClick={closeDropdown} className="w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
              A-Z
            </div>
            <div onClick={closeDropdown} className="w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
              Giá: Cao đến thấp
            </div>
            <div onClick={closeDropdown} className="w-full block cursor-pointer hover:bg-white dark:hover:bg-gray-900 dark:bg-gray-800 hover:text-link px-3 py-2 rounded-md">
              Giá: Thấp đến cao
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
