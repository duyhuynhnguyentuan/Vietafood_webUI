import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { open } from '../../components/State/Slice/CheckOutSlice';
import {useDispatch} from "react-redux";

export function Cart(){
    const dispatch = useDispatch()
    return(
        <div className="bg-black bg-opacity-70 fixed z-50 top-0 left-0 w-full h-screen">
            <div className="h-full bg-primary sm:w-[40rem] min-w-[15rem] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between  ">
                        <div 
                        onClick={() => dispatch(open())}
                        className="flex items-center cursor-pointer">
                            <ArrowBackIosIcon/>
                            <span className="uppercase text-[0.95rem] select-none">Continue Shopping</span>
                        </div>
                     <div>Shopping Bag(0)</div>
                    </div>
                </div>
            </div>
        </div>
    )
}