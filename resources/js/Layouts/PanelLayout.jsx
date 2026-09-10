import { Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import MenuSyncStatus from '@/Components/Panel/MenuSyncStatus';
import {
    ChartPieIcon,
    BuildingStorefrontIcon,
    StarIcon,
    TagIcon,
    SquaresPlusIcon,
    MegaphoneIcon,
    Cog6ToothIcon,
    Bars3Icon,
    XMarkIcon,
    ArrowRightOnRectangleIcon,
    UserCircleIcon,
    CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 4000);
        return () => clearTimeout(timer);
    }, [flash]);

    if (!visible) return null;

    return (
        <>
            {flash?.success && (
                <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-pulse">
                    <span>✓</span>
                    <span>{flash.success}</span>
                    <button onClick={() => setVisible(false)} className="ml-2 opacity-70 hover:opacity-100">✕</button>
                </div>
            )}
            {flash?.error && (
                <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-red-500 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium">
                    <span>✕</span>
                    <span>{flash.error}</span>
                    <button onClick={() => setVisible(false)} className="ml-2 opacity-70 hover:opacity-100">✕</button>
                </div>
            )}
        </>
    );
}

export default function PanelLayout({ children, title, showSyncStatus = false }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const isSuperAdmin = user.role === 'superadmin';
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const superAdminNav = [
        { href: route('admin.dashboard'), label: 'Dashboard', icon: ChartPieIcon },
        { href: route('admin.restaurants.index'), label: 'Restaurantes', icon: BuildingStorefrontIcon },
        { href: route('admin.plans.index'), label: 'Planes', icon: StarIcon },
        { href: route('admin.payments.index'), label: 'Pagos', icon: CurrencyDollarIcon },
    ];

    const restaurantNav = [
        { href: route('panel.dashboard'), label: 'Dashboard', icon: ChartPieIcon },
        { href: route('panel.products.index'), label: 'Productos', icon: SquaresPlusIcon },
        { href: route('panel.categories.index'), label: 'Categorías', icon: TagIcon },
        { href: route('panel.promotions.index'), label: 'Promociones', icon: MegaphoneIcon },
        { href: route('panel.settings.edit'), label: 'Mi Restaurante', icon: Cog6ToothIcon },

    ];

    const navItems = isSuperAdmin ? superAdminNav : restaurantNav;

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-900 text-white transition-all duration-300 flex flex-col`}>

                {/* Logo */}
                <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                    {sidebarOpen && (
                        <div>
                            <h1 className="text-xl font-bold text-yellow-400">MenuCloud</h1>
                            <p className="text-xs text-gray-400">
                                {isSuperAdmin ? 'Super Admin' : 'Panel Restaurante'}
                            </p>
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-gray-400 hover:text-white p-1 rounded"
                    >
                        {sidebarOpen
                            ? <XMarkIcon className="w-5 h-5" />
                            : <Bars3Icon className="w-5 h-5" />
                        }
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = window.location.pathname === new URL(item.href).pathname;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                    ? 'bg-yellow-500 text-gray-900'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                {sidebarOpen && (
                                    <span className="text-sm font-medium">{item.label}</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User */}
                <div className="p-4 border-t border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 font-bold text-sm flex-shrink-0">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        {sidebarOpen && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                                <button
                                    onClick={handleLogout}
                                    className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1 mt-0.5"
                                >
                                    <ArrowRightOnRectangleIcon className="w-3 h-3" />
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    {showSyncStatus && <MenuSyncStatus />}
                </header>
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
            <FlashMessage />

        </div>
    );
}