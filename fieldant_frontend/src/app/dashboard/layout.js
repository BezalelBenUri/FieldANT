//import { useAuth } from '../../../utils/auth'; // Import your authentication context or hook
import Link from 'next/link';

import userHeader from '@/components/userHeader';


export default function DashboardLayout({ children }) {

    return (
        <div className = "user-dashboard-layout">
            <userHeader />
            <main>{children}</main>
        </div>
    )
}