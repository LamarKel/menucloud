import PanelLayout from '@/layouts/PanelLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    MegaphoneIcon,
} from '@heroicons/react/24/outline';

export default function Promotions({ promotions }) {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        name: '',
        description: '',
        type: 'percent',
        discount_value: '',
        valid_from: '',
        valid_until: '',
        is_active: true,
    });

    const openCreate = () => {
        setEditing(null);
        setForm({ name: '', description: '', type: 'percent', discount_value: '', valid_from: '', valid_until: '', is_active: true });
        setShowModal(true);
    };

    const openEdit = (promo) => {
        setEditing(promo);
        setForm({
            name: promo.name,
            description: promo.description ?? '',
            type: promo.type,
            discount_value: promo.discount_value ?? '',
            valid_from: promo.valid_from ?? '',
            valid_until: promo.valid_until ?? '',
            is_active: promo.is_active,
        });
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            router.put(route('panel.promotions.update', editing.id), form, {
                onSuccess: () => setShowModal(false),
            });
        } else {
            router.post(route('panel.promotions.store'), form, {
                onSuccess: () => setShowModal(false),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('¿Eliminar esta promoción?')) {
            router.delete(route('panel.promotions.destroy', id));
        }
    };

    const handleToggle = (promo) => {
        router.put(route('panel.promotions.update', promo.id), {
            ...promo,
            is_active: !promo.is_active,
        });
    };

    const typeLabels = {
        percent: 'Porcentaje',
        fixed: 'Precio fijo',
        bogo: '2x1',
        combo: 'Combo',
    };

    const typeColors = {
        percent: 'bg-blue-100 text-blue-700',
        fixed: 'bg-green-100 text-green-700',
        bogo: 'bg-purple-100 text-purple-700',
        combo: 'bg-orange-100 text-orange-700',
    };

    return (
        <PanelLayout title="Promociones">
            <Head title="Promociones" />

            <div className="flex justify-end mb-6">
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    Nueva Promoción
                </button>
            </div>

            <div className="space-y-4">
                {promotions.map((promo) => (
                    <div key={promo.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-gray-800">{promo.name}</h3>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[promo.type]}`}>
                                        {typeLabels[promo.type]}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${promo.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                        {promo.is_active ? 'Activa' : 'Inactiva'}
                                    </span>
                                </div>
                                {promo.description && (
                                    <p className="text-sm text-gray-500 mb-2">{promo.description}</p>
                                )}
                                <div className="flex gap-4 text-xs text-gray-400">
                                    {promo.discount_value && (
                                        <span>Descuento: <strong className="text-gray-700">
                                            {promo.type === 'percent' ? `${promo.discount_value}%` : `$${promo.discount_value}`}
                                        </strong></span>
                                    )}
                                    {promo.valid_from && <span>Desde: {promo.valid_from}</span>}
                                    {promo.valid_until && <span>Hasta: {promo.valid_until}</span>}
                                </div>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                                <button
                                    onClick={() => handleToggle(promo)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${promo.is_active
                                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                        }`}
                                >
                                    {promo.is_active ? 'Desactivar' : 'Activar'}
                                </button>
                                <button
                                    onClick={() => openEdit(promo)}
                                    className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <PencilIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(promo.id)}
                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {promotions.length === 0 && (
                    <div className="text-center py-16 text-gray-400">
                        <MegaphoneIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>No hay promociones. ¡Crea la primera!</p>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {editing ? 'Editar Promoción' : 'Nueva Promoción'}
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                <textarea
                                    value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    rows={2}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                                    <select
                                        value={form.type}
                                        onChange={e => setForm({ ...form, type: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    >
                                        <option value="percent">Porcentaje</option>
                                        <option value="fixed">Precio fijo</option>
                                        <option value="bogo">2x1</option>
                                        <option value="combo">Combo</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Valor del descuento</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={form.discount_value}
                                        onChange={e => setForm({ ...form, discount_value: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Válida desde</label>
                                    <input
                                        type="date"
                                        value={form.valid_from}
                                        onChange={e => setForm({ ...form, valid_from: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Válida hasta</label>
                                    <input
                                        type="date"
                                        value={form.valid_until}
                                        onChange={e => setForm({ ...form, valid_until: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.is_active}
                                    onChange={e => setForm({ ...form, is_active: e.target.checked })}
                                    className="w-4 h-4 text-yellow-400 rounded"
                                />
                                <span className="text-sm text-gray-700">Promoción activa</span>
                            </label>
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
                                    {editing ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </PanelLayout>
    );
}