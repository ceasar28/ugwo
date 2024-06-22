import Dashboard from '../../../assets/dashboard1.svg'
import Invoice from '../../../assets/reciept1.svg'
import Transaction from '../../../assets/transaction.svg'
import Settings from '../../../assets/settings.svg'


interface SidebarItem {
    name: string;
    path: string;
    icon: string; 
}

export const sidebar: SidebarItem[] = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: Dashboard
    },
    {
        name: 'Invoice',
        path: '/invoice',
        icon: Invoice
    },
    {
        name: 'Transaction',
        path: '/transaction',
        icon: Transaction
    }
];
