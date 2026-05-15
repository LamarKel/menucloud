import PanelLayout from '@/Layouts/PanelLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ShoppingBagIcon,
    TagIcon,
    MegaphoneIcon,
    QrCodeIcon,
    ArrowTopRightOnSquareIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard({ restaurant, stats }) {
    const progress = Math.min((stats.total_products / stats.max_products) * 100, 100);
    const progressColor = progress >= 90 ? 'bg-red-500' : progress >= 70 ? 'bg-yellow-500' : 'bg-green-500';

    const statCards = [
        { label: 'Total productos', value: stats.total_products, icon: ShoppingBagIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Disponibles', value: stats.available_products, icon: ShoppingBagIcon, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Categorías', value: stats.total_categories, icon: TagIcon, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Promociones activas', value: stats.total_promotions, icon: MegaphoneIcon, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    ];

    return (
        <PanelLayout title="Dashboard">
            <Head title="Dashboard" />

            {/* Bienvenida */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl p-6 mb-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">{restaurant.name}</h2>
                        <p className="text-gray-300 text-sm mt-1">
                            {restaurant.cuisine_type} · {restaurant.city}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${restaurant.status === 'active'
                                    ? 'bg-green-500/20 text-green-300'
                                    : 'bg-red-500/20 text-red-300'
                                }`}>
                                {restaurant.status === 'active' ? 'Activo' : 'Inactivo'}
                            </span>
                            <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs font-medium">
                                Plan {restaurant.plan?.name}
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <a
                            href={route('menu.show', restaurant.slug)}
                            target="_blank"
                            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
                        >
                            <QrCodeIcon className="w-4 h-4" />
                            Ver Menú
                            <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                        </a>
                        <p className="text-gray-400 text-xs mt-2">
                            menucloud.app/menu/{restaurant.slug}
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs text-gray-500">{card.label}</span>
                                <div className={`${card.bg} p-2 rounded-lg`}>
                                    <Icon className={`w-4 h-4 ${card.color}`} />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Límite de productos */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">Uso del plan</h3>
                    <span className="text-sm text-gray-500">
                        {stats.total_products} / {stats.max_products} productos
                    </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                        className={`h-2.5 rounded-full transition-all ${progressColor}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
                {progress >= 90 && (
                    <div className="flex items-center gap-2 mt-3 text-red-600 text-sm">
                        <ExclamationTriangleIcon className="w-4 h-4" />
                        <span>Estás cerca del límite. Considera actualizar tu plan.</span>
                    </div>
                )}
            </div>

            {/* Accesos rápidos */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Accesos rápidos</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { href: route('panel.products.index'), label: 'Agregar producto', icon: ShoppingBagIcon },
                        { href: route('panel.categories.index'), label: 'Ver categorías', icon: TagIcon },
                        { href: route('panel.promotions.index'), label: 'Nueva promoción', icon: MegaphoneIcon },
                        { href: route('panel.settings.edit'), label: 'Configuración', icon: QrCodeIcon },
                    ].map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center gap-2 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-yellow-200 transition-colors text-center"
                            >
                                <Icon className="w-6 h-6 text-gray-600" />
                                <span className="text-xs text-gray-600 font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>

        </PanelLayout>
    );
}
