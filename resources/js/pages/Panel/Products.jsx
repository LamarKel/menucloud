import PanelLayout from '@/Layouts/PanelLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    PhotoIcon,
} from '@heroicons/react/24/outline';

export default function Products({ products, categories, max_products }) {
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        category_id: '',
        allergens: '',
        calories: '',
        is_available: true,
        is_featured: false,
        sort_order: 0,
    });
    const [image, setImage] = useState(null);
    const [search, setSearch] = useState('');
    const [filterCat, setFilterCat] = useState('');

    const openCreate = () => {
        setEditing(null);
        setForm({ name: '', description: '', price: '', category_id: '', allergens: '', calories: '', is_available: true, is_featured: false, sort_order: 0 });
        setImage(null);
        setShowModal(true);
    };

    const openEdit = (product) => {
        setEditing(product);
        setForm({
            name: product.name,
            description: product.description ?? '',
            price: product.price,
            category_id: product.category_id ?? '',
            allergens: product.allergens ?? '',
            calories: product.calories ?? '',
            is_available: product.is_available,
            is_featured: product.is_featured,
            sort_order: product.sort_order,
        });
        setImage(null);
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append('name', form.name);
        data.append('description', form.description);
        data.append('price', form.price);
        data.append('category_id', form.category_id);
        data.append('allergens', form.allergens);
        data.append('calories', form.calories);
        data.append('is_available', form.is_available ? '1' : '0');
        data.append('is_featured', form.is_featured ? '1' : '0');
        data.append('sort_order', form.sort_order);

        if (image) data.append('image', image);

        if (editing) {
            data.append('_method', 'PUT');
            router.post(route('panel.products.update', editing.id), data, {
                forceFormData: true,
                onSuccess: () => setShowModal(false),
                onError: (errors) => console.log(errors),
            });
        } else {
            router.post(route('panel.products.store'), data, {
                forceFormData: true,
                onSuccess: () => setShowModal(false),
                onError: (errors) => console.log(errors),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('¿Eliminar este producto?')) {
            router.delete(route('panel.products.destroy', id));
        }
    };

    const filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchCat = filterCat === '' || p.category_id == filterCat;
        return matchSearch && matchCat;
    });

    return (
        <PanelLayout title="Productos">
            <Head title="Productos" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                <div className="flex gap-3 flex-wrap">
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-52"
                    />
                    <select
                        value={filterCat}
                        onChange={e => setFilterCat(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="">Todas las categorías</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{products.length} / {max_products} productos</span>
                    <button
                        onClick={openCreate}
                        className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                        <PlusIcon className="w-4 h-4" />
                        Nuevo Producto
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((p) => (
                    <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="h-36 bg-gray-50 flex items-center justify-center relative">
                            {p.image
                                ? <img src={`/storage/${p.image}`} alt={p.name} className="w-full h-full object-cover" />
                                : <PhotoIcon className="w-10 h-10 text-gray-300" />
                            }
                            {p.is_featured && (
                                <span className="absolute top-2 left-2 bg-yellow-400 text-gray-900 text-xs font-medium px-2 py-0.5 rounded-full">
                                    Destacado
                                </span>
                            )}
                            {!p.is_available && (
                                <span className="absolute top-2 right-2 bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded-full">
                                    No disponible
                                </span>
                            )}
                        </div>
                        <div className="p-4">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <h3 className="font-semibold text-gray-800 text-sm">{p.name}</h3>
                                    <p className="text-xs text-gray-400 mt-0.5">{p.category?.name ?? 'Sin categoría'}</p>
                                </div>
                                <span className="text-lg font-bold text-yellow-600 flex-shrink-0">${Number(p.price).toFixed(2)}</span>
                            </div>
                            {p.description && (
                                <p className="text-xs text-gray-500 mt-2 line-clamp-2">{p.description}</p>
                            )}
                            <div className="flex items-center justify-between mt-3">
                                <div className="flex gap-1 text-xs text-gray-400">
                                    {p.calories && <span>{p.calories} kcal</span>}
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => openEdit(p)}
                                        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        <PencilIcon className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="col-span-3 text-center py-16 text-gray-400">
                        <PhotoIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>No hay productos. ¡Agrega el primero!</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {editing ? 'Editar Producto' : 'Nuevo Producto'}
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                    <textarea
                                        value={form.description}
                                        onChange={e => setForm({ ...form, description: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        rows={2}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio (USD) *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={form.price}
                                        onChange={e => setForm({ ...form, price: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                                    <select
                                        value={form.category_id}
                                        onChange={e => setForm({ ...form, category_id: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    >
                                        <option value="">Sin categoría</option>
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Calorías</label>
                                    <input
                                        type="number"
                                        value={form.calories}
                                        onChange={e => setForm({ ...form, calories: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Alérgenos</label>
                                    <input
                                        type="text"
                                        value={form.allergens}
                                        onChange={e => setForm({ ...form, allergens: e.target.value })}
                                        placeholder="Ej: Gluten, Lácteos, Huevo"
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setImage(e.target.files[0])}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.is_available}
                                        onChange={e => setForm({ ...form, is_available: e.target.checked })}
                                        className="w-4 h-4 text-yellow-400 rounded"
                                    />
                                    <span className="text-sm text-gray-700">Disponible</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.is_featured}
                                        onChange={e => setForm({ ...form, is_featured: e.target.checked })}
                                        className="w-4 h-4 text-yellow-400 rounded"
                                    />
                                    <span className="text-sm text-gray-700">Destacado</span>
                                </label>
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
                                    {editing ? 'Actualizar' : 'Crear Producto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </PanelLayout>
    );
}