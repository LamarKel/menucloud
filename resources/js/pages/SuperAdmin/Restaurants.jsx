import PanelLayout from '@/Layouts/PanelLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    PlusIcon,
    CheckCircleIcon,
    XCircleIcon,
    TrashIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

export default function Restaurants({ restaurants, plans }) {
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        owner_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        cuisine_type: '',
        plan_id: '',
    });

    const filtered = restaurants.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.owner_name.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase())
    );

    const closeModal = () => {
        setShowModal(false);
        clearErrors();
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.restaurants.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    const handleApprove = (id) => {
        router.patch(route('admin.restaurants.approve', id));
    };

    const handleSuspend = (id) => {
        if (confirm('¿Seguro que deseas suspender este restaurante?')) {
            router.patch(route('admin.restaurants.suspend', id));
        }
    };

    const handleDelete = (id) => {
        if (confirm('¿Seguro que deseas eliminar este restaurante? Esta acción no se puede deshacer.')) {
            router.delete(route('admin.restaurants.destroy', id));
        }
    };

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
        <PanelLayout title="Restaurantes">
            <Head title="Restaurantes" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="relative">
                    <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar restaurante..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-72"
                    />
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    Nuevo Restaurante
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurante</th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Ingresos</th>
                            <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filtered.map((r) => (
                            <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="font-medium text-gray-800 text-sm">{r.name}</p>
                                    <p className="text-xs text-gray-400">{r.cuisine_type} · {r.city}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-gray-700">{r.owner_name}</p>
                                    <p className="text-xs text-gray-400">{r.email}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-700">{r.plan?.name ?? '—'}</span>
                                </td>
                                <td className="px-6 py-4">
                                    {statusBadge(r.status)}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm font-medium text-gray-800">
                                        ${Number(r.total_revenue).toLocaleString()}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        {r.status === 'pending' && (
                                            <button
                                                onClick={() => handleApprove(r.id)}
                                                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                title="Aprobar"
                                            >
                                                <CheckCircleIcon className="w-5 h-5" />
                                            </button>
                                        )}
                                        {r.status === 'active' && (
                                            <button
                                                onClick={() => handleSuspend(r.id)}
                                                className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                                title="Suspender"
                                            >
                                                <XCircleIcon className="w-5 h-5" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(r.id)}
                                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Eliminar"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-sm">
                                    No se encontraron restaurantes
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800">Nuevo Restaurante</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {Object.keys(errors).length > 0 && (
                                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                                    {Object.values(errors).map((message, i) => (
                                        <p key={i}>{message}</p>
                                    ))}
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del restaurante *</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Propietario *</label>
                                    <input
                                        type="text"
                                        value={data.owner_name}
                                        onChange={e => setData('owner_name', e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                                    <input
                                        type="text"
                                        value={data.city}
                                        onChange={e => setData('city', e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg text-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de cocina</label>
                                    <input
                                        type="text"
                                        value={data.cuisine_type}
                                        onChange={e => setData('cuisine_type', e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-3 text-gray-900 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Plan *</label>
                                    <select
                                        value={data.plan_id}
                                        onChange={e => setData('plan_id', e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-3 text-gray-900 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        required
                                    >
                                        <option value="">Seleccionar plan</option>
                                        {plans.map(p => (
                                            <option key={p.id} value={p.id}>{p.name} — ${p.price}/mes</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-sm bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Creando...' : 'Crear Restaurante'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </PanelLayout>
    );
}