import Logo from '../../assets/logo.svg';
import { useNavigate } from "react-router-dom";

const Connect = () => {
    const navigate = useNavigate();
    return (
        <div className="w-screen h-[40rem] flex flex-col justify-center items-center">
            <img src={Logo} alt="Logo" className="w-[30rem] mb-8"/>
            <button 
                className='bg-[--bg-color] px-4 w-[10rem] text-[--text-extra] py-2 flex justify-center items-center'
                onClick={() => navigate('/dashboard')}
            >
                Connect Wallet
            </button>
        </div>
    );
}

export default Connect;

