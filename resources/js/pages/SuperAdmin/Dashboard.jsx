import PanelLayout from '@/Layouts/PanelLayout';
import { Head } from '@inertiajs/react';
import {
    BuildingStorefrontIcon,
    CheckCircleIcon,
    ClockIcon,
    CurrencyDollarIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard({ stats, recent_restaurants, pending_restaurants }) {
    const statCards = [
        {
            label: 'Ingresos del mes',
            value: `$${Number(stats.monthly_revenue).toLocaleString()}`,
            icon: CurrencyDollarIcon,
            color: 'text-yellow-600',
            bg: 'bg-yellow-50',
        },
        {
            label: 'Restaurantes activos',
            value: stats.active_restaurants,
            icon: CheckCircleIcon,
            color: 'text-green-600',
            bg: 'bg-green-50',
        },
        {
            label: 'Solicitudes pendientes',
            value: stats.pending_restaurants,
            icon: ClockIcon,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
        },
        {
            label: 'Total restaurantes',
            value: stats.total_restaurants,
            icon: BuildingStorefrontIcon,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
        },
    ];

    const statusBadge = (status) => {
        const styles = {
            active: 'bg-green-100 text-green-700',
            pending: 'bg-yellow-100 text-yellow-700',
            suspended: 'bg-red-100 text-red-700',
        };
        const labels = {
            active: 'Activo',
            pending: 'Pendiente',
            suspended: 'Suspendido',
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    return (
        <PanelLayout title="Dashboard">
            <Head title="Dashboard — Super Admin" />

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-gray-500">{card.label}</span>
                                <div className={`${card.bg} p-2 rounded-lg`}>
                                    <Icon className={`w-5 h-5 ${card.color}`} />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Pendientes */}
                {pending_restaurants.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                            <ExclamationCircleIcon className="w-5 h-5 text-yellow-500" />
                            <h3 className="font-semibold text-gray-800">Solicitudes pendientes</h3>
                            <span className="ml-auto bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-0.5 rounded-full">
                                {pending_restaurants.length}
                            </span>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {pending_restaurants.map((r) => (
                                <div key={r.id} className="p-4 flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-800 text-sm">{r.name}</p>
                                        <p className="text-xs text-gray-500">{r.owner_name} · {r.email}</p>
                                    </div>
                                    {statusBadge(r.status)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recientes */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800">Restaurantes recientes</h3>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {recent_restaurants.map((r) => (
                            <div key={r.id} className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-800 text-sm">{r.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {r.plan?.name ?? 'Sin plan'} · {r.created_at}
                                    </p>
                                </div>
                                {statusBadge(r.status)}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </PanelLayout>
    );
}