import { Head, Link } from '@inertiajs/react';

export default function Landing() {
    const features = [
        { icon: '📱', title: 'Menú Digital QR', desc: 'Tus clientes escanean un código QR y ven tu menú al instante. Sin descargar apps.' },
        { icon: '🎨', title: 'Personalización Total', desc: 'Elige tus colores, fuentes y estilo. Tu menú refleja la identidad de tu restaurante.' },
        { icon: '⚡', title: 'Actualizaciones en Tiempo Real', desc: 'Cambia precios, agrega platos o desactiva productos al instante desde tu panel.' },
        { icon: '🎯', title: 'Promociones y Ofertas', desc: 'Crea descuentos, combos y promociones especiales que atraen más clientes.' },
        { icon: '📊', title: 'Panel Completo', desc: 'Gestiona categorías, productos, promociones y la configuración de tu restaurante.' },
        { icon: '🔒', title: 'Seguro y Confiable', desc: 'Tu información protegida. Cada restaurante tiene su propio espacio privado.' },
    ];

    const plans = [
        {
            name: 'Basic',
            price: '50',
            color: '#3b82f6',
            features: ['Hasta 30 productos', '5 categorías', 'Menú QR', 'Soporte por email', '1 administrador'],
        },
        {
            name: 'Pro',
            price: '100',
            color: '#C9A84C',
            popular: true,
            features: ['Hasta 100 productos', '15 categorías', 'Promociones ilimitadas', 'Estadísticas', '3 administradores', 'Soporte prioritario'],
        },
        {
            name: 'Premium',
            price: '200',
            color: '#8b5cf6',
            features: ['Productos ilimitados', 'Categorías ilimitadas', 'Todo del Pro', 'Dominio propio', 'Admins ilimitados', 'Soporte 24/7 WhatsApp'],
        },
    ];

    return (
        <>
            <Head title="MenuCloud — Menús Digitales para Restaurantes" />

            <div className="min-h-screen bg-gray-900 text-white">

                {/* NAV */}
                <nav className="border-b border-white/10 sticky top-0 z-50 bg-gray-900/95 backdrop-blur">
                    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div>
                            <span className="text-2xl font-bold text-yellow-400" style={{ fontFamily: 'Georgia, serif' }}>MenuCloud</span>
                            <span className="text-gray-400 text-sm ml-2 hidden sm:inline">Menús Digitales</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <a href="#planes" className="text-sm text-gray-300 hover:text-white hidden sm:block">Precios</a>
                            <Link href="/login" className="text-sm text-gray-300 hover:text-white px-3 py-1.5">
                                Iniciar Sesión
                            </Link>
                            <Link
                                href="/registro"
                                className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                                style={{ backgroundColor: '#C9A84C', color: '#1a1611' }}
                            >
                                Registrar Restaurante
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* HERO */}
                <section className="max-w-6xl mx-auto px-6 py-20 text-center">
                    <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-medium px-4 py-1.5 rounded-full mb-6 tracking-wide">
                        ✦ PLATAFORMA DE MENÚS DIGITALES
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                        Tu menú digital,<br />
                        <span style={{ color: '#C9A84C' }}>siempre a un QR</span><br />
                        de distancia
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                        Crea un menú digital profesional para tu restaurante en minutos. Tus clientes escanean y ven tu menú actualizado al instante. Sin papel, sin costos de impresión.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/registro"
                            className="px-8 py-4 rounded-xl font-bold text-base transition-opacity hover:opacity-90"
                            style={{ backgroundColor: '#C9A84C', color: '#1a1611' }}
                        >
                            Registra tu Restaurante Gratis →
                        </Link>
                        <a
                            href="#caracteristicas"
                            className="px-8 py-4 rounded-xl font-medium text-base border border-white/20 text-gray-300 hover:bg-white/5 transition-colors"
                        >
                            Ver características
                        </a>
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-10 text-sm text-gray-500">
                        <span>✓ 30 días gratis</span>
                        <span>✓ Sin tarjeta de crédito</span>
                        <span>✓ Activación en 24h</span>
                    </div>
                </section >

                {/* DEMO MENU PREVIEW */}
                <section className="max-w-4xl mx-auto px-6 pb-20">
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ background: '#1e1a14' }}>
                        <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                            </div>
                            <div className="flex-1 bg-white/5 rounded-md px-3 py-1 text-xs text-gray-500 text-center">
                                menucloud.app/tu-restaurante
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: 'rgba(201,168,76,0.2)' }}>🍝</div>
                                <div>
                                    <div className="font-bold text-white">La Casa Italiana</div>
                                    <div className="text-xs text-gray-400">Italiana · Santiago</div>
                                </div>
                            </div>
                            <div className="flex gap-2 mb-4 overflow-x-auto">
                                {['Entradas', 'Pastas', 'Postres', 'Bebidas'].map((cat, i) => (
                                    <div key={cat} className="px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0" style={i === 0 ? { background: '#C9A84C', color: '#1a1611' } : { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}>
                                        {cat}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {[
                                    { name: 'Ensalada César', price: '8.50', emoji: '🥗' },
                                    { name: 'Spaghetti Carbonara', price: '15.00', emoji: '🍝' },
                                    { name: 'Tiramisú', price: '7.50', emoji: '🍮' },
                                ].map(p => (
                                    <div key={p.name} className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,168,76,0.15)' }}>
                                        <div className="h-16 flex items-center justify-center text-3xl" style={{ background: 'rgba(201,168,76,0.08)' }}>{p.emoji}</div>
                                        <div className="p-2.5">
                                            <div className="text-xs font-semibold text-white">{p.name}</div>
                                            <div className="text-sm font-bold mt-1" style={{ color: '#C9A84C' }}>${p.price}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section >

                {/* CARACTERÍSTICAS */}
                <section id="caracteristicas" className="max-w-6xl mx-auto px-6 py-20 border-t border-white/10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>Todo lo que necesitas</h2>
                        <p className="text-gray-400">Una plataforma completa para digitalizar tu restaurante</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map(f => (
                            <div key={f.title} className="rounded-xl p-5 border border-white/10 hover:border-yellow-400/30 transition-colors" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                <div className="text-3xl mb-3">{f.icon}</div>
                                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* PLANES */}
                <section id="planes" className="max-w-6xl mx-auto px-6 py-20 border-t border-white/10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>Planes para cada restaurante</h2>
                        <p className="text-gray-400">Sin contratos. Cancela cuando quieras. 30 días gratis.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {plans.map(plan => (
                            <div
                                key={plan.name}
                                className="rounded-2xl p-6 border transition-all"
                                style={{
                                    background: plan.popular ? 'rgba(201,168,76,0.06)' : 'rgba(255,255,255,0.03)',
                                    borderColor: plan.popular ? '#C9A84C' : 'rgba(255,255,255,0.1)',
                                    borderWidth: plan.popular ? 2 : 1,
                                }}
                            >
                                {plan.popular && (
                                    <div className="text-xs font-semibold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full inline-block mb-4">
                                        MÁS POPULAR
                                    </div>
                                )}
                                <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">{plan.name}</div>
                                <div className="text-4xl font-bold mb-1" style={{ color: plan.color }}>${plan.price}</div>
                                <div className="text-gray-400 text-sm mb-6">por mes · 30 días gratis</div>
                                <div className="space-y-2 mb-6">
                                    {plan.features.map(f => (
                                        <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
                                            <span style={{ color: plan.color }}>✓</span>
                                            {f}
                                        </div>
                                    ))}
                                </div>
                                <Link
                                    href="/registro"
                                    className="block text-center py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
                                    style={plan.popular
                                        ? { backgroundColor: '#C9A84C', color: '#1a1611' }
                                        : { border: `1px solid ${plan.color}`, color: plan.color }
                                    }
                                >
                                    Comenzar Gratis
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA FINAL */}
                <section className="max-w-3xl mx-auto px-6 py-20 text-center border-t border-white/10">
                    <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                        ¿Listo para digitalizar tu restaurante?
                    </h2>
                    <p className="text-gray-400 mb-8">Únete a los restaurantes que ya usan MenuCloud para ofrecer una experiencia moderna a sus clientes.</p>
                    <Link
                        href="/registro"
                        className="inline-block px-10 py-4 rounded-xl font-bold text-base transition-opacity hover:opacity-90"
                        style={{ backgroundColor: '#C9A84C', color: '#1a1611' }}
                    >
                        Registra tu Restaurante Gratis →
                    </Link>
                </section>

                {/* FOOTER */}
                <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500">
                    <p>© 2026 MenuCloud · Todos los derechos reservados</p>
                    <p className="mt-1">Menús digitales profesionales para restaurantes</p>
                </footer>
            </div >
        </>
    );
}