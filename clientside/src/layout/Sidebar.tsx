import {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { sidebar } from '../pages/utilites/data/data';
import left from '../../../clientside/src/assets/left.svg'
import right from '../../../clientside/src/assets/right.svg'
import Logo from '../../../clientside/src/assets/logo.svg'




const Sidebar = () => {
    const navigate = useNavigate(); 
    const [open, setOpen] = useState(true);

    
      const toggleBar = () => {
        setOpen(!open);
      };
    
     
    return (
          <div className='h-screen absolute top-0'>
     
      <div style={{ width: open ? '200px' : '100px' }} className="w-[400px] h-screen bg-[--layer-color] p-8 fixed z-50 sm:block hidden">
        <div className="flex items-center">
          <div onClick={() => navigate('/overview')} className="cursor-pointer  flex items-center ">
            <img src={Logo} alt="Logo" className="w-[5rem]" />
            
          </div>
          <div onClick={toggleBar} className="absolute right-[-20px]">
            {!open ? (
              <img src={left} alt="Expand" className="bg-[--text-extra] rounded-2xl p-2 w-[35px]" />
            ) : (
              <img src={right} alt="Collapse" className="bg-[--text-extra] rounded-2xl p-2 w-[35px]" />
            )}
          </div>
        </div>
        <div className="mt-14">
      
          {sidebar.map((item, index) => (
            <NavLink to={item.path} key={index} className="flex bg-[--bg-color-color] items-center gap-2 py-3">             
              <img src={item.icon} alt="" className="w-[25px]" />
              <p style={{ display: open ? 'block' : 'none' }}>{item.name}</p>          
            </NavLink>
          ))}
        </div>            
      </div>

      <div className="fixed bottom-0 w-full h-[5rem] bg-[--layer-color] flex items-center justify-center z-50 lg:hidden">
  {sidebar.map((item, index) => (
    <NavLink to={item.path} key={index} className="flex  items-center gap-2 py-3 justify-around w-full px-4">
      <img src={item.icon} alt="" className="w-[25px]" />
    </NavLink>
  ))}
</div>

    </div>
    )
}

export default Sidebar
