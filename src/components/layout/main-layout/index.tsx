import React from 'react';
import { useRouter } from 'next/router';
import { AdminLayout } from '../admin-layout';
import { SiteLayout } from '../site-layout';

export const MainLayout: React.FC = ({ children }) => {
    const { pathname } = useRouter()

    if (pathname.startsWith('/admin')) return <AdminLayout>{children}</AdminLayout>

    return <SiteLayout>{children}</SiteLayout>
}