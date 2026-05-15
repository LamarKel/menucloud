import PanelLayout from '@/Layouts/PanelLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    TagIcon,
} from '@heroicons/react/24/outline';

export default function Categories({ categories }) {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        name: '',
        description: '',
        icon: '',
        sort_order: 0,
        is_active: true,
    });

    const openCreate = () => {
        setEditing(null);
        setForm({ name: '', description: '', icon: '', sort_order: 0, is_active: true });
        setShowModal(true);
    };

    const openEdit = (cat) => {
        setEditing(cat);
        setForm({
            name: cat.name,
            description: cat.description ?? '',
            icon: cat.icon ?? '',
            sort_order: cat.sort_order,
            is_active: cat.is_active,
        });
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            router.put(route('panel.categories.update', editing.id), form, {
                onSuccess: () => setShowModal(false),
            });
        } else {
            router.post(route('panel.categories.store'), form, {
                onSuccess: () => setShowModal(false),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('¿Eliminar esta categoría? Los productos asociados quedarán sin categoría.')) {
            router.delete(route('panel.categories.destroy', id));
        }
    };

    return (
        <PanelLayout title="Categorías">
            <Head title="Categorías" />

            <div className="flex justify-end mb-6">
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    Nueva Categoría
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => (
                    <div key={cat.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                                    {cat.icon
                                        ? <span className="text-xl">{cat.icon}</span>
                                        : <TagIcon className="w-5 h-5 text-yellow-500" />
                                    }
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">{cat.name}</h3>
                                    <p className="text-xs text-gray-400">{cat.products_count} productos</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => openEdit(cat)}
                                    className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <PencilIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        {cat.description && (
                            <p className="text-sm text-gray-500 mt-3">{cat.description}</p>
                        )}
                        <div className="mt-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${cat.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                {cat.is_active ? 'Activa' : 'Inactiva'}
                            </span>
                        </div>
                    </div>
                ))}

                {categories.length === 0 && (
                    <div className="col-span-3 text-center py-16 text-gray-400">
                        <TagIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>No hay categorías aún. ¡Crea la primera!</p>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {editing ? 'Editar Categoría' : 'Nueva Categoría'}
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
                                <input
                                    type="text"
                                    value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Icono (emoji)</label>
                                    <input
                                        type="text"
                                        value={form.icon}
                                        onChange={e => setForm({ ...form, icon: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        placeholder="🍕"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Orden</label>
                                    <input
                                        type="number"
                                        value={form.sort_order}
                                        onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) })}
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
                                <span className="text-sm text-gray-700">Categoría activa</span>
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