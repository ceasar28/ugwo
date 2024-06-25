import { useEffect, useState } from "react"
import Logo from '../../assets/logo.svg'
import { useNavigate } from "react-router-dom"


const MainContent = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
            navigate('/connect')
        }, 7000);

        return () => clearTimeout(timer)
    },[])
    return (
        <div className="w-screen h-[50rem]" style={{ display: visible ?  'flex' : 'none'}}>
            <div className="w-screen flex justify-center items-center">
            <img src={Logo} alt="" className="w-[30rem]  flex justify-center items-center "/>
           </div>           
        </div> 
    )
}

export default MainContent
