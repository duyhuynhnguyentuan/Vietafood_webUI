import React from 'react'

type IAdminOrderSummaryProps = {
    revenue: number;
    totalOrders: number;
}
const AdminOrderSummary: React.FC<IAdminOrderSummaryProps> = (props) => { 
    const {
        revenue,
        totalOrders
    } = props
    const formatPrice = (price: number): string => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
      };
  return (

    <div className="grid gap-4 lg:gap-8 md:grid-cols-3 mb-10 ">
        <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
            <div className="space-y-2">
                <div
                    className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                    <span>Doanh thu (chưa trừ shipping)</span>
                </div>

                <div className="text-3xl dark:text-gray-100">
                    {formatPrice(revenue)}
                </div>

            </div>
        </div>

        <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
            <div className="space-y-2">
                <div
                    className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                    <span>Tổng số đơn hàng</span>
                </div>

                <div className="text-3xl dark:text-gray-100">
                    {totalOrders}
                </div>
            </div>

        </div>
    </div>

  )
}

export default AdminOrderSummary