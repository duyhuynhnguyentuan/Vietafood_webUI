import { Link } from "react-router-dom";

export default function NotFoundPage(){
    return(
        <div className="mt-[200px] h-[300px]">
        <div className="text-4xl text-primary text-center flex flex-col justify-center">
            <span className="text-red-500 font-mono">
            404 Not Found
            </span>
            <Link to="/" className="underline">Quay về trang chủ</Link>
        </div>
        </div>
    )
}