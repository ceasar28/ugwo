import { NavLink } from "react-router-dom"
import { sidebar } from "../pages/utilites/data/data"


const FloatingNavbar = () => {
    return (
        <div>
            <div>
                {sidebar.map((item, index ) => (
                    <NavLink  to={item.path} key={index}>
                        <img src={item.icon} alt="" className=""/>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default FloatingNavbar
