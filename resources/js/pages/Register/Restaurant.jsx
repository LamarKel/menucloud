import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Restaurant({ plans }) {
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        restaurant_name: '',
        cuisine_type: '',
        address: '',
        city: '',
        phone: '',
        owner_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        plan_id: plans[1]?.id ?? plans[0]?.id ?? '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('register.restaurant.store'), form, {
            onError: (errs) => {
                setErrors(errs);
                setStep(1);
            },
        });
    };

    const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";
    const errorClass = "text-red-500 text-xs mt-1";

    return (
        <>
            <Head title="Registra tu Restaurante — MenuCloud" />

            <div className="min-h-screen bg-gray-50 flex flex-col">

                {/* Header */}
                <div className="bg-gray-900 py-4 px-6 flex items-center justify-between">
                    <div>
                        <span className="text-xl font-bold text-yellow-400" style={{ fontFamily: 'Georgia, serif' }}>MenuCloud</span>
                        <span className="text-gray-400 text-sm ml-2">Menús Digitales</span>
                    </div>
                    <a href="/login" className="text-sm text-gray-300 hover:text-white">
                        ¿Ya tienes cuenta? Inicia sesión →
                    </a>
                </div>

                <div className="flex-1 flex items-center justify-center py-10 px-4">
                    <div className="w-full max-w-xl">

                        {/* Título */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">Registra tu Restaurante</h1>
                            <p className="text-gray-500 mt-2">30 días gratis · Sin tarjeta de crédito · Activación en 24h</p>
                        </div>

                        {/* Steps */}
                        <div className="flex items-center justify-center gap-2 mb-8">
                            {[1, 2, 3].map((s) => (
                                <div key={s} className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${step > s ? 'bg-green-500 text-white' :
                                        step === s ? 'bg-yellow-400 text-gray-900' :
                                            'bg-gray-200 text-gray-500'
                                        }`}>
                                        {step > s ? '✓' : s}
                                    </div>
                                    {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-green-500' : 'bg-gray-200'}`}></div>}
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

                                {/* Step 1: Restaurante */}
                                {step === 1 && (
                                    <div className="space-y-4">
                                        <h2 className="font-semibold text-gray-800 text-lg mb-4">1. Información del Restaurante</h2>
                                        <div>
                                            <label className={labelClass}>Nombre del restaurante *</label>
                                            <input
                                                type="text"
                                                value={form.restaurant_name}
                                                onChange={e => setForm({ ...form, restaurant_name: e.target.value })}
                                                className={inputClass}
                                                placeholder="Ej: La Casa Italiana"
                                            />
                                            {errors.restaurant_name && <p className={errorClass}>{errors.restaurant_name}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClass}>Tipo de cocina *</label>
                                            <input
                                                type="text"
                                                value={form.cuisine_type}
                                                onChange={e => setForm({ ...form, cuisine_type: e.target.value })}
                                                className={inputClass}
                                                placeholder="Ej: Italiana, Criolla, Mariscos"
                                            />
                                            {errors.cuisine_type && <p className={errorClass}>{errors.cuisine_type}</p>}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={labelClass}>Ciudad</label>
                                                <input
                                                    type="text"
                                                    value={form.city}
                                                    onChange={e => setForm({ ...form, city: e.target.value })}
                                                    className={inputClass}
                                                    placeholder="Santiago"
                                                />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Teléfono</label>
                                                <input
                                                    type="text"
                                                    value={form.phone}
                                                    onChange={e => setForm({ ...form, phone: e.target.value })}
                                                    className={inputClass}
                                                    placeholder="+1 809-555-0000"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className={labelClass}>Dirección</label>
                                            <input
                                                type="text"
                                                value={form.address}
                                                onChange={e => setForm({ ...form, address: e.target.value })}
                                                className={inputClass}
                                                placeholder="Calle, número, sector"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => form.restaurant_name && form.cuisine_type && setStep(2)}
                                            className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-xl transition-colors"
                                        >
                                            Continuar →
                                        </button>
                                    </div>
                                )}

                                {/* Step 2: Propietario */}
                                {step === 2 && (
                                    <div className="space-y-4">
                                        <h2 className="font-semibold text-gray-800 text-lg mb-4">2. Datos del Propietario</h2>
                                        <div>
                                            <label className={labelClass}>Nombre completo *</label>
                                            <input
                                                type="text"
                                                value={form.owner_name}
                                                onChange={e => setForm({ ...form, owner_name: e.target.value })}
                                                className={inputClass}
                                                placeholder="Tu nombre completo"
                                            />
                                            {errors.owner_name && <p className={errorClass}>{errors.owner_name}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClass}>Email *</label>
                                            <input
                                                type="email"
                                                value={form.email}
                                                onChange={e => setForm({ ...form, email: e.target.value })}
                                                className={inputClass}
                                                placeholder="correo@turestaurante.com"
                                            />
                                            {errors.email && <p className={errorClass}>{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClass}>Contraseña *</label>
                                            <input
                                                type="password"
                                                value={form.password}
                                                onChange={e => setForm({ ...form, password: e.target.value })}
                                                className={inputClass}
                                                placeholder="Mínimo 8 caracteres"
                                            />
                                            {errors.password && <p className={errorClass}>{errors.password}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClass}>Confirmar contraseña *</label>
                                            <input
                                                type="password"
                                                value={form.password_confirmation}
                                                onChange={e => setForm({ ...form, password_confirmation: e.target.value })}
                                                className={inputClass}
                                                placeholder="Repite la contraseña"
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="flex-1 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                                            >
                                                ← Atrás
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => form.owner_name && form.email && form.password && setStep(3)}
                                                className="flex-2 flex-1 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-xl transition-colors"
                                            >
                                                Continuar →
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Plan */}
                                {step === 3 && (
                                    <div className="space-y-4">
                                        <h2 className="font-semibold text-gray-800 text-lg mb-4">3. Elige tu Plan</h2>
                                        <div className="space-y-3">
                                            {plans.map(plan => (
                                                <div
                                                    key={plan.id}
                                                    onClick={() => setForm({ ...form, plan_id: plan.id })}
                                                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${form.plan_id === plan.id
                                                        ? 'border-yellow-400 bg-yellow-50'
                                                        : 'border-gray-100 hover:border-gray-200'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <div className="font-semibold text-gray-800">{plan.name}</div>
                                                            <div className="text-xs text-gray-500 mt-0.5">
                                                                {plan.max_products >= 999 ? 'Productos ilimitados' : `Hasta ${plan.max_products} productos`}
                                                                {plan.has_promotions && ' · Promociones'}
                                                                {plan.has_statistics && ' · Estadísticas'}
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-2xl font-bold text-yellow-600">${plan.price}</div>
                                                            <div className="text-xs text-gray-400">/mes</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
                                            🎁 <strong>30 días gratis</strong> — Tu cuenta será activada por nuestro equipo en menos de 24 horas. Te notificaremos por email.
                                        </div>
                                        {errors.plan_id && <p className={errorClass}>{errors.plan_id}</p>}
                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setStep(2)}
                                                className="flex-1 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                                            >
                                                ← Atrás
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-xl transition-colors"
                                            >
                                                Enviar Solicitud ✓
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}