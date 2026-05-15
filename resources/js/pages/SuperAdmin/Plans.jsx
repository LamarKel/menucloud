import PanelLayout from '@/Layouts/PanelLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    PlusIcon,
    PencilIcon,
    CheckIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

export default function Plans({ plans }) {
    const [showModal, setShowModal] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [form, setForm] = useState({
        name: '',
        price: '',
        max_products: '',
        max_categories: '',
        has_promotions: false,
        has_custom_domain: false,
        has_statistics: false,
        max_admins: '',
        is_active: true,
    });

    const openCreate = () => {
        setEditingPlan(null);
        setForm({
            name: '',
            price: '',
            max_products: '',
            max_categories: '',
            has_promotions: false,
            has_custom_domain: false,
            has_statistics: false,
            max_admins: '',
            is_active: true,
        });
        setShowModal(true);
    };

    const openEdit = (plan) => {
        setEditingPlan(plan);
        setForm({
            name: plan.name,
            price: plan.price,
            max_products: plan.max_products,
            max_categories: plan.max_categories,
            has_promotions: plan.has_promotions,
            has_custom_domain: plan.has_custom_domain,
            has_statistics: plan.has_statistics,
            max_admins: plan.max_admins,
            is_active: plan.is_active,
        });
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingPlan) {
            router.put(route('admin.plans.update', editingPlan.id), form, {
                onSuccess: () => setShowModal(false),
            });
        } else {
            router.post(route('admin.plans.store'), form, {
                onSuccess: () => setShowModal(false),
            });
        }
    };

    const featureCheck = (value) => value
        ? <CheckIcon className="w-5 h-5 text-green-500" />
        : <XMarkIcon className="w-5 h-5 text-gray-300" />;

    return (
        <PanelLayout title="Planes">
            <Head title="Planes" />

            <div className="flex justify-end mb-6">
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    Nuevo Plan
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div key={plan.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-bold text-gray-800">{plan.name}</h3>
                                <button
                                    onClick={() => openEdit(plan)}
                                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    <PencilIcon className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-yellow-500">${plan.price}</span>
                                <span className="text-gray-400 text-sm">/mes</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                                {plan.restaurants_count} restaurante(s) activos
                            </p>
                        </div>
                        <div className="p-6 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Productos</span>
                                <span className="font-medium">{plan.max_products === 999 ? 'Ilimitados' : plan.max_products}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Categorías</span>
                                <span className="font-medium">{plan.max_categories === 999 ? 'Ilimitadas' : plan.max_categories}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Admins</span>
                                <span className="font-medium">{plan.max_admins === 999 ? 'Ilimitados' : plan.max_admins}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Promociones</span>
                                {featureCheck(plan.has_promotions)}
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Estadísticas</span>
                                {featureCheck(plan.has_statistics)}
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Dominio propio</span>
                                {featureCheck(plan.has_custom_domain)}
                            </div>
                            <div className="pt-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${plan.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                    {plan.is_active ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {editingPlan ? 'Editar Plan' : 'Nuevo Plan'}
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium  text-gray-700 mb-1">Nombre *</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 text-gray-900 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio (USD) *</label>
                                    <input
                                        type="number"
                                        value={form.price}
                                        onChange={e => setForm({ ...form, price: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 text-gray-900 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Máx. productos</label>
                                    <input
                                        type="number"
                                        value={form.max_products}
                                        onChange={e => setForm({ ...form, max_products: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 text-gray-900 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Máx. categorías</label>
                                    <input
                                        type="number"
                                        value={form.max_categories}
                                        onChange={e => setForm({ ...form, max_categories: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 text-gray-900 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Máx. admins</label>
                                    <input
                                        type="number"
                                        value={form.max_admins}
                                        onChange={e => setForm({ ...form, max_admins: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 text-gray-900 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                {[
                                    { key: 'has_promotions', label: 'Promociones' },
                                    { key: 'has_statistics', label: 'Estadísticas' },
                                    { key: 'has_custom_domain', label: 'Dominio personalizado' },
                                    { key: 'is_active', label: 'Plan activo' },
                                ].map(({ key, label }) => (
                                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={form[key]}
                                            onChange={e => setForm({ ...form, [key]: e.target.checked })}
                                            className="w-4 h-4 text-yellow-400 rounded"
                                        />
                                        <span className="text-sm text-gray-700">{label}</span>
                                    </label>
                                ))}
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
                                    {editingPlan ? 'Actualizar' : 'Crear Plan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </PanelLayout>
    );
}