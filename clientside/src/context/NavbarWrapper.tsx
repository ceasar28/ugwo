import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
 import Sidebar from '../layout/Sidebar';
import FloatingNavbar from '../layout/FloatingNavbar';

interface Props {
    children: React.ReactNode;
}

const NavbarWrapper = ({ children }: Props) => {
    const location = useLocation();
    const [showNavbar, setShowNavbar] = useState<boolean>(true);
    const [showSidebar, setShowSidebar] = useState<boolean>(true);

    useEffect(() => {
        const restrictedPaths = [
            '/mainContent',
            '/connect', 
        ];

        const showNavbarPaths = [
            '/dashboard',
            '/transaction',
            '/send',
            '/request',
            '/deposit',
            '/invoice',
            '/transaction',
        ];

        if (restrictedPaths.includes(location.pathname)) {
            setShowNavbar(false);
            setShowSidebar(false);
        } else if (showNavbarPaths.includes(location.pathname)) {
            setShowNavbar(false);
            setShowSidebar(true);
        } else {
            setShowNavbar(true);
            setShowSidebar(false);
        }
    }, [location]);

    return (
        <div>
            {showNavbar && <FloatingNavbar />}
            {showSidebar && <Sidebar />}
            {!(!showNavbar || !showSidebar) && children}
        </div>
    );
};

export default NavbarWrapper;