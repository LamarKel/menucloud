import PanelLayout from '@/Layouts/PanelLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    PlusIcon,
    TrashIcon,
    CurrencyDollarIcon,
    CalendarIcon,
} from '@heroicons/react/24/outline';

export default function Payments({ payments, restaurants, totalRevenue, monthRevenue }) {
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        restaurant_id: '',
        amount: '',
        method: 'transfer',
        reference: '',
        paid_at: new Date().toISOString().split('T')[0],
        notes: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('admin.payments.store'), form, {
            onSuccess: () => {
                setShowModal(false);
                setForm({ restaurant_id: '', amount: '', method: 'transfer', reference: '', paid_at: new Date().toISOString().split('T')[0], notes: '' });
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('¿Eliminar este pago?')) {
            router.delete(route('admin.payments.destroy', id));
        }
    };

    const methodLabels = { transfer: 'Transferencia', cash: 'Efectivo' };
    const methodColors = { transfer: 'bg-blue-100 text-blue-700', cash: 'bg-green-100 text-green-700' };

    return (
        <PanelLayout title="Pagos">
            <Head title="Pagos" />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">Ingresos del mes</span>
                        <div className="bg-yellow-50 p-2 rounded-lg">
                            <CurrencyDollarIcon className="w-4 h-4 text-yellow-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">${Number(monthRevenue).toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">Ingresos totales</span>
                        <div className="bg-green-50 p-2 rounded-lg">
                            <CurrencyDollarIcon className="w-4 h-4 text-green-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">${Number(totalRevenue).toLocaleString()}</p>
                </div>
            </div>

            {/* Header */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    Registrar Pago
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurante</th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Método</th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Referencia</th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {payments.data.map((payment) => (
                            <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-800 text-sm">
                                        {payment.subscription?.restaurant?.name ?? '—'}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        Plan {payment.subscription?.plan?.name}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-lg font-bold text-green-600">
                                        ${Number(payment.amount).toFixed(2)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${methodColors[payment.method]}`}>
                                        {methodLabels[payment.method]}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-600">{payment.reference ?? '—'}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-600">{payment.paid_at}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => handleDelete(payment.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {payments.data.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-400 text-sm">
                                    No hay pagos registrados aún
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800">Registrar Pago</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Restaurante *</label>
                                <select
                                    value={form.restaurant_id}
                                    onChange={e => {
                                        const selectedId = parseInt(e.target.value);
                                        const selected = restaurants.find(r => r.id === selectedId);
                                        const planPrice = selected?.active_subscription?.plan?.price ?? '';
                                        setForm({ ...form, restaurant_id: e.target.value, amount: planPrice });
                                    }}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    required
                                >
                                    <option value="">Seleccionar restaurante</option>
                                    {restaurants.map(r => (
                                        <option key={r.id} value={r.id}>
                                            {r.name} — Plan {r.active_subscription?.plan?.name ?? 'Sin plan'} (${r.active_subscription?.plan?.price ?? '0'}/mes)
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Monto (USD) *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={form.amount}
                                        onChange={e => setForm({ ...form, amount: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Método *</label>
                                    <select
                                        value={form.method}
                                        onChange={e => setForm({ ...form, method: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    >
                                        <option value="transfer">Transferencia</option>
                                        <option value="cash">Efectivo</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Referencia / Comprobante</label>
                                <input
                                    type="text"
                                    value={form.reference}
                                    onChange={e => setForm({ ...form, reference: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    placeholder="Número de transferencia"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha del pago *</label>
                                <input
                                    type="date"
                                    value={form.paid_at}
                                    onChange={e => setForm({ ...form, paid_at: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                                <textarea
                                    value={form.notes}
                                    onChange={e => setForm({ ...form, notes: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    rows={2}
                                    placeholder="Observaciones opcionales..."
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors"
                                >
                                    Registrar Pago
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </PanelLayout>
    );
}