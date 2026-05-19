import PanelLayout from '@/Layouts/PanelLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

export default function Settings({ restaurant, settings }) {
    const [form, setForm] = useState({
        name: restaurant.name ?? '',
        owner_name: restaurant.owner_name ?? '',
        phone: restaurant.phone ?? '',
        address: restaurant.address ?? '',
        city: restaurant.city ?? '',
        cuisine_type: restaurant.cuisine_type ?? '',
        description: restaurant.description ?? '',
        primary_color: settings?.primary_color ?? '#C9A84C',
        font_choice: settings?.font_choice ?? 'inter',
        show_calories: settings?.show_calories ?? true,
        show_allergens: settings?.show_allergens ?? true,
        show_promotions: settings?.show_promotions ?? true,
        social_instagram: settings?.social_instagram ?? '',
        social_facebook: settings?.social_facebook ?? '',
        social_whatsapp: settings?.social_whatsapp ?? '',
        bg_color: settings?.bg_color ?? '#1a1611',
        text_color: settings?.text_color ?? '#ffffff',
        card_color: settings?.card_color ?? '#ffffff0f',
        nav_color: settings?.nav_color ?? '#1a1611',
    });
    const [logo, setLogo] = useState(null);
    const [banner, setBanner] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        // Campos de texto normales
        data.append('name', form.name);
        data.append('owner_name', form.owner_name);
        data.append('phone', form.phone);
        data.append('address', form.address);
        data.append('city', form.city);
        data.append('cuisine_type', form.cuisine_type);
        data.append('description', form.description);
        data.append('primary_color', form.primary_color);
        data.append('font_choice', form.font_choice);
        data.append('social_instagram', form.social_instagram);
        data.append('social_facebook', form.social_facebook);
        data.append('social_whatsapp', form.social_whatsapp);
        data.append('bg_color', form.bg_color);
        data.append('text_color', form.text_color);
        data.append('card_color', form.card_color);
        data.append('nav_color', form.nav_color);

        // Booleanos como 1 o 0
        data.append('show_calories', form.show_calories ? '1' : '0');
        data.append('show_allergens', form.show_allergens ? '1' : '0');
        data.append('show_promotions', form.show_promotions ? '1' : '0');

        // Imágenes
        if (logo) data.append('logo', logo);
        if (banner) data.append('banner', banner);

        data.append('_method', 'PUT');

        router.post(route('panel.settings.update'), data, {
            forceFormData: true,
            onSuccess: () => {
                //    alert('Configuración guardada exitosamente.');
                setLogo(null);
                setBanner(null);
            },
            onError: (errors) => {
                console.log(errors);
                //   alert('Error al guardar. Revisa la consola.');
            },
        });
    };


    return (
        <PanelLayout title="Mi Restaurante">
            <Head title="Configuración" />

            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">

                {/* Info general */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Información del Restaurante</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del restaurante *</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Propietario *</label>
                            <input
                                type="text"
                                value={form.owner_name}
                                onChange={e => setForm({ ...form, owner_name: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                            <input
                                type="text"
                                value={form.phone}
                                onChange={e => setForm({ ...form, phone: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                            <input
                                type="text"
                                value={form.city}
                                onChange={e => setForm({ ...form, city: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de cocina</label>
                            <input
                                type="text"
                                value={form.cuisine_type}
                                onChange={e => setForm({ ...form, cuisine_type: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                            <input
                                type="text"
                                value={form.address}
                                onChange={e => setForm({ ...form, address: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                rows={3}
                                placeholder="Describe tu restaurante..."
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Logo del restaurante</label>
                            {restaurant.logo && (
                                <div className="mb-2">
                                    <img
                                        src={`/storage/${restaurant.logo}`}
                                        alt="Logo"
                                        className="w-16 h-16 rounded-full object-cover border border-gray-200"
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setLogo(e.target.files[0])}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none"
                            />
                            <p className="text-xs text-gray-400 mt-1">Recomendado: imagen cuadrada, mínimo 200x200px</p>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Banner del restaurante</label>
                            {restaurant.banner && (
                                <div className="mb-2">
                                    <img
                                        src={`/storage/${restaurant.banner}`}
                                        alt="Banner"
                                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setBanner(e.target.files[0])}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none"
                            />
                            <p className="text-xs text-gray-400 mt-1">Recomendado: imagen horizontal, mínimo 1200x400px</p>
                        </div>
                    </div>
                </div>

                {/* Apariencia */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Apariencia del Menú</h3>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Color primario</label>
                            <div className="flex gap-2 items-center">
                                <input type="color" value={form.primary_color} onChange={e => setForm({ ...form, primary_color: e.target.value })} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
                                <input type="text" value={form.primary_color} onChange={e => setForm({ ...form, primary_color: e.target.value })} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Color de fondo</label>
                            <div className="flex gap-2 items-center">
                                <input type="color" value={form.bg_color} onChange={e => setForm({ ...form, bg_color: e.target.value })} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
                                <input type="text" value={form.bg_color} onChange={e => setForm({ ...form, bg_color: e.target.value })} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Color del texto</label>
                            <div className="flex gap-2 items-center">
                                <input type="color" value={form.text_color} onChange={e => setForm({ ...form, text_color: e.target.value })} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
                                <input type="text" value={form.text_color} onChange={e => setForm({ ...form, text_color: e.target.value })} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Color de tarjetas</label>
                            <div className="flex gap-2 items-center">
                                <input type="color" value={form.card_color.substring(0, 7)} onChange={e => setForm({ ...form, card_color: e.target.value })} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
                                <input type="text" value={form.card_color} onChange={e => setForm({ ...form, card_color: e.target.value })} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Color de navegación</label>
                            <div className="flex gap-2 items-center">
                                <input type="color" value={form.nav_color} onChange={e => setForm({ ...form, nav_color: e.target.value })} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
                                <input type="text" value={form.nav_color} onChange={e => setForm({ ...form, nav_color: e.target.value })} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fuente</label>
                            <select value={form.font_choice} onChange={e => setForm({ ...form, font_choice: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                                <option value="inter">Inter (moderna)</option>
                                <option value="playfair">Playfair (elegante)</option>
                                <option value="roboto">Roboto (clásica)</option>
                            </select>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="rounded-xl overflow-hidden border border-gray-200">
                        <div className="px-4 py-2 text-xs font-medium text-gray-500 bg-gray-50 border-b border-gray-200">
                            Vista previa
                        </div>
                        <div className="p-4" style={{ backgroundColor: form.bg_color }}>
                            <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: `1px solid ${form.primary_color}30` }}>
                                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: form.primary_color }}></div>
                                <span className="text-sm font-bold" style={{ color: form.text_color }}>Nombre Restaurante</span>
                            </div>
                            <div className="flex gap-2 mb-3">
                                <div className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: form.primary_color, color: form.bg_color }}>Categoría</div>
                                <div className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: form.card_color, color: form.text_color }}>Otra</div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {[1, 2].map(i => (
                                    <div key={i} className="rounded-lg overflow-hidden" style={{ backgroundColor: form.card_color, border: `1px solid ${form.primary_color}20` }}>
                                        <div className="h-12" style={{ backgroundColor: `${form.primary_color}30` }}></div>
                                        <div className="p-2">
                                            <div className="text-xs font-semibold" style={{ color: form.text_color }}>Producto {i}</div>
                                            <div className="text-xs font-bold mt-1" style={{ color: form.primary_color }}>$12.00</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-6 mt-4">
                        {[
                            { key: 'show_calories', label: 'Mostrar calorías' },
                            { key: 'show_allergens', label: 'Mostrar alérgenos' },
                            { key: 'show_promotions', label: 'Mostrar promociones' },
                        ].map(({ key, label }) => (
                            <label key={key} className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={form[key]} onChange={e => setForm({ ...form, [key]: e.target.checked })} className="w-4 h-4 text-yellow-400 rounded" />
                                <span className="text-sm text-gray-700">{label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Redes sociales */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Redes Sociales</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                            <input
                                type="text"
                                value={form.social_instagram}
                                onChange={e => setForm({ ...form, social_instagram: e.target.value })}
                                placeholder="@turestaurante"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                            <input
                                type="text"
                                value={form.social_facebook}
                                onChange={e => setForm({ ...form, social_facebook: e.target.value })}
                                placeholder="facebook.com/turestaurante"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                            <input
                                type="text"
                                value={form.social_whatsapp}
                                onChange={e => setForm({ ...form, social_whatsapp: e.target.value })}
                                placeholder="+1 809-555-0000"
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Link del menú */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Link de tu Menú</h3>
                    <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
                            {window.location.origin}/menu/{restaurant.slug}
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/menu/${restaurant.slug}`);
                                alert('Link copiado!');
                            }}
                            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                        >
                            Copiar
                        </button>
                        <a
                            href={`/menu/${restaurant.slug}`}
                            target="_blank"
                            className="px-4 py-2 text-sm bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors"
                        >
                            Ver Menú
                        </a>
                    </div>
                </div>

                {/* Código QR */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Código QR de tu Menú</h3>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-3 bg-white border border-gray-200 rounded-xl" id="qr-container">
                                <QRCode
                                    value={`${window.location.origin}/menu/${restaurant.slug}`}
                                    size={180}
                                    bgColor="#ffffff"
                                    fgColor="#1a1611"
                                    qrStyle="dots"
                                    eyeRadius={6}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    const canvas = document.querySelector('#qr-container canvas');
                                    if (canvas) {
                                        const link = document.createElement('a');
                                        link.download = `qr-${restaurant.slug}.png`;
                                        link.href = canvas.toDataURL();
                                        link.click();
                                    }
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Descargar QR
                            </button>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                Imprime este código QR y colócalo en tus mesas, menús físicos, tarjetas de presentación o redes sociales.
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                Tus clientes solo tienen que escanearlo con la cámara de su celular para ver tu menú digital al instante.
                            </p>
                            <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-xs text-gray-500">
                                <strong>URL del menú:</strong><br />
                                {window.location.origin}/menu/{restaurant.slug}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </PanelLayout >
    );
}