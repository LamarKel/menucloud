import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function Show({ restaurant }) {
    const settings = restaurant.settings;
    const primaryColor = settings?.primary_color ?? '#C9A84C';
    const bgColor = settings?.bg_color ?? '#1a1611';
    const textColor = settings?.text_color ?? '#ffffff';
    const cardColor = settings?.card_color ?? '#ffffff0f';
    const navColor = settings?.nav_color ?? '#1a1611';

    const [activeCategory, setActiveCategory] = useState(
        restaurant.categories?.[0]?.id ?? null
    );
    const [selectedProduct, setSelectedProduct] = useState(null);
    const categoryRefs = useRef({});
    const isScrolling = useRef(false);

    useEffect(() => {
        const observers = [];
        restaurant.categories?.forEach(cat => {
            const el = categoryRefs.current[cat.id];
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !isScrolling.current) {
                        setActiveCategory(cat.id);
                    }
                },
                { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => observers.forEach(o => o.disconnect());
    }, [restaurant.categories]);

    const scrollToCategory = (catId) => {
        isScrolling.current = true;
        setActiveCategory(catId);
        const el = categoryRefs.current[catId];
        if (el) {
            const offset = 120;
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
            setTimeout(() => { isScrolling.current = false; }, 800);
        }
    };

    return (
        <>
            <Head title={restaurant.name} />

            <div className="min-h-screen" style={{ backgroundColor: bgColor }}>

                {/* Header con banner */}
                <div style={{ backgroundColor: navColor, borderBottom: `1px solid ${primaryColor}20` }}>
                    {/* Banner */}
                    {restaurant.banner && (
                        <div className="relative w-full overflow-hidden" style={{ height: '140px' }}>
                            <img
                                src={`/storage/${restaurant.banner}`}
                                alt={restaurant.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }}></div>
                        </div>
                    )}

                    {/* Info del restaurante */}
                    <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-3">
                        {restaurant.logo && (
                            <img
                                src={`/storage/${restaurant.logo}`}
                                alt={restaurant.name}
                                className="w-11 h-11 rounded-full object-cover border-2 flex-shrink-0"
                                style={{
                                    borderColor: primaryColor,
                                    marginTop: restaurant.banner ? '-20px' : '0',
                                    position: 'relative',
                                    zIndex: 10,
                                }}
                            />
                        )}
                        <div className="flex-1 min-w-0">
                            <h1 className="text-base font-bold leading-tight" style={{ color: textColor }}>
                                {restaurant.name}
                            </h1>
                        </div>
                        <div className="flex gap-3 flex-shrink-0">
                            {settings?.social_instagram && (
                                <a
                                    href={`https://instagram.com/${settings.social_instagram.replace('@', '')}`}
                                    target="_blank"
                                    className="transition-opacity hover:opacity-80"
                                >
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                                        <defs>
                                            <radialGradient id="ig-gradient" cx="30%" cy="107%" r="150%">
                                                <stop offset="0%" stopColor="#fdf497" />
                                                <stop offset="5%" stopColor="#fdf497" />
                                                <stop offset="45%" stopColor="#fd5949" />
                                                <stop offset="60%" stopColor="#d6249f" />
                                                <stop offset="90%" stopColor="#285AEB" />
                                            </radialGradient>
                                        </defs>
                                        <rect width="24" height="24" rx="6" fill="url(#ig-gradient)" />
                                        <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none" />
                                        <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
                                    </svg>
                                </a>
                            )}
                            {settings?.social_whatsapp && (
                                <a
                                    href={`https://wa.me/${settings.social_whatsapp.replace(/\D/g, '')}`}
                                    target="_blank"
                                    className="transition-opacity hover:opacity-80"
                                >
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                                        <rect width="24" height="24" rx="6" fill="#25D366" />
                                        <path d="M12 4.5C7.86 4.5 4.5 7.86 4.5 12c0 1.32.34 2.56.94 3.64L4.5 19.5l3.96-.93A7.47 7.47 0 0012 19.5c4.14 0 7.5-3.36 7.5-7.5S16.14 4.5 12 4.5zm3.67 10.4c-.15.42-.88.8-1.22.85-.31.04-.7.06-1.13-.07a10.3 10.3 0 01-1.02-.38c-1.8-.78-2.97-2.6-3.06-2.72-.09-.12-.75-1-.75-1.9 0-.91.47-1.35.64-1.54.17-.18.37-.23.49-.23h.35c.11 0 .27-.04.42.32l.6 1.46c.05.12.08.27.01.43l-.22.45-.33.34c-.11.11-.22.24-.1.47.13.23.57.95 1.23 1.54.85.76 1.56 1 1.78 1.1.22.1.35.09.48-.05l.54-.64c.14-.18.27-.15.46-.09l1.42.67c.17.08.28.12.32.19.04.07.04.44-.1.86z" fill="white" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div >

                {/* Promociones */}
                {
                    settings?.show_promotions && restaurant.promotions?.length > 0 && (
                        <div style={{ backgroundColor: `${primaryColor}10`, borderBottom: `1px solid ${primaryColor}20` }}>
                            <div className="max-w-5xl mx-auto px-6 py-3">
                                <div className="flex gap-3 overflow-x-auto pb-1">
                                    {restaurant.promotions.map(promo => (
                                        <div
                                            key={promo.id}
                                            className="flex-shrink-0 rounded-xl px-4 py-2.5 min-w-44"
                                            style={{ backgroundColor: cardColor, border: `1px solid ${primaryColor}30` }}
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="font-semibold text-xs" style={{ color: textColor }}>
                                                    {promo.name}
                                                </span>
                                                <span className="font-bold text-xs" style={{ color: primaryColor }}>
                                                    {promo.type === 'percent' && `${promo.discount_value}%`}
                                                    {promo.type === 'fixed' && `$${promo.discount_value}`}
                                                    {promo.type === 'bogo' && '2x1'}
                                                    {promo.type === 'combo' && 'Combo'}
                                                </span>
                                            </div>
                                            {promo.description && (
                                                <p className="text-xs mt-0.5" style={{ color: `${textColor}60` }}>
                                                    {promo.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Categorías sticky */}
                {
                    restaurant.categories?.length > 0 && (
                        <div
                            className="sticky top-0 z-20"
                            style={{ backgroundColor: navColor, borderBottom: `1px solid ${primaryColor}20`, backdropFilter: 'blur(12px)' }}
                        >
                            <div className="max-w-5xl mx-auto px-6">
                                <div className="flex gap-2 py-3 overflow-x-auto">
                                    {restaurant.categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => scrollToCategory(cat.id)}
                                            className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap"
                                            style={activeCategory === cat.id
                                                ? { backgroundColor: primaryColor, color: bgColor }
                                                : { backgroundColor: `${textColor}10`, color: `${textColor}80` }
                                            }
                                        >
                                            {cat.icon && <span className="mr-1">{cat.icon}</span>}
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Contenido */}
                <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">
                    {restaurant.categories?.map(cat => (
                        <div key={cat.id} ref={el => categoryRefs.current[cat.id] = el}>

                            {/* Título categoría */}
                            <div className="flex items-center gap-3 mb-4">
                                {cat.icon && <span className="text-2xl">{cat.icon}</span>}
                                <h2 className="text-xl font-bold" style={{ color: textColor }}>{cat.name}</h2>
                                <div className="flex-1 h-px" style={{ backgroundColor: `${textColor}15` }}></div>
                            </div>

                            {/* Grid productos */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {cat.products?.map(product => (
                                    <div
                                        key={product.id}
                                        className="rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-2xl"
                                        style={{
                                            backgroundColor: cardColor,
                                            border: `1px solid ${primaryColor}15`,
                                        }}
                                        onClick={() => setSelectedProduct(product)}
                                    >
                                        {product.image ? (
                                            <img
                                                src={`/storage/${product.image}`}
                                                alt={product.name}
                                                className="w-full object-cover"
                                                style={{ height: '140px' }}
                                            />
                                        ) : (
                                            <div
                                                className="w-full flex items-center justify-center text-4xl"
                                                style={{ height: '140px', backgroundColor: `${primaryColor}15` }}
                                            >
                                                🍽️
                                            </div>
                                        )}
                                        <div className="p-3">
                                            <h3
                                                className="font-semibold text-sm leading-tight line-clamp-2"
                                                style={{ color: textColor }}
                                            >
                                                {product.name}
                                            </h3>
                                            {product.description && (
                                                <p
                                                    className="text-xs mt-1 line-clamp-2"
                                                    style={{ color: `${textColor}60` }}
                                                >
                                                    {product.description}
                                                </p>
                                            )}
                                            <div className="flex items-center justify-between mt-2">
                                                <span
                                                    className="font-bold text-base"
                                                    style={{ color: primaryColor }}
                                                >
                                                    ${Number(product.price).toFixed(2)}
                                                </span>
                                                {product.is_featured && (
                                                    <span className="text-xs">⭐</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div
                    className="text-center py-8 mt-4"
                    style={{ borderTop: `1px solid ${textColor}10` }}
                >
                    <p className="text-xs" style={{ color: `${textColor}40` }}>
                        Menú digital por <strong style={{ color: primaryColor }}>MenuCloud</strong>
                    </p>
                </div>

                {/* Modal producto */}
                {
                    selectedProduct && (
                        <div
                            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
                            style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
                            onClick={() => setSelectedProduct(null)}
                        >
                            <div
                                className="w-full md:max-w-lg rounded-t-2xl md:rounded-2xl overflow-hidden"
                                style={{
                                    backgroundColor: bgColor,
                                    border: `1px solid ${primaryColor}20`,
                                    maxHeight: '90vh',
                                    overflowY: 'auto',
                                }}
                                onClick={e => e.stopPropagation()}
                            >
                                {selectedProduct.image ? (
                                    <img
                                        src={`/storage/${selectedProduct.image}`}
                                        alt={selectedProduct.name}
                                        className="w-full object-cover"
                                        style={{ height: '260px' }}
                                    />
                                ) : (
                                    <div
                                        className="w-full flex items-center justify-center text-6xl"
                                        style={{ height: '180px', backgroundColor: `${primaryColor}15` }}
                                    >
                                        🍽️
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <h2 className="text-2xl font-bold" style={{ color: textColor }}>
                                            {selectedProduct.name}
                                        </h2>
                                        <span
                                            className="text-2xl font-bold flex-shrink-0"
                                            style={{ color: primaryColor }}
                                        >
                                            ${Number(selectedProduct.price).toFixed(2)}
                                        </span>
                                    </div>
                                    {selectedProduct.description && (
                                        <p
                                            className="text-sm leading-relaxed mb-4"
                                            style={{ color: `${textColor}80` }}
                                        >
                                            {selectedProduct.description}
                                        </p>
                                    )}
                                    <div className="flex gap-4 text-xs mb-5" style={{ color: `${textColor}50` }}>
                                        {settings?.show_calories && selectedProduct.calories && (
                                            <span>🔥 {selectedProduct.calories} kcal</span>
                                        )}
                                        {settings?.show_allergens && selectedProduct.allergens && (
                                            <span>⚠️ {selectedProduct.allergens}</span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setSelectedProduct(null)}
                                        className="w-full py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
                                        style={{ backgroundColor: primaryColor, color: bgColor }}
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div >
        </>
    );
}