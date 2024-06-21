import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';

interface Props {
    children: React.ReactNode;
}

const NavbarWrapper = ({ children }: Props) => {
    const location = useLocation();
   
    const [showSidebar, setShowSidebar] = useState<boolean>(true);

    useEffect(() => {
        const restrictedPaths = [
            '/connect',
            '/',
         ];

        const showNavbarPaths = [
            '/overview',
            '/payment',
            '/wallet',
            '/company',
            '/pin',
            '/transfer',           
            '/card',
            '/address',            
            '/loan',
            '/deposit',
            '/contactUs',
            '/exchange',  
            '/loan' ,
        ];

        if (restrictedPaths.includes(location.pathname)) {
            setShowSidebar(false);
        } else if (showNavbarPaths.includes(location.pathname)) {
            setShowSidebar(true);
        } else {
            setShowSidebar(false);
        }
    }, [location]);

    return (
        <div>
            
            {showSidebar && <Sidebar />}
            {!(!showSidebar) && children}
        </div>
    );
};

export default NavbarWrapper;