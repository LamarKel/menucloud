import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Recuperar Contraseña — MenuCloud" />

            <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1611 0%, #2c2418 50%, #1a1611 100%)' }}>
                <div className="w-full max-w-md px-4">

                    {/* Logo */}
                    <div className="text-center mb-8">
                        <a href="/">
                            <span className="text-3xl font-bold text-yellow-400" style={{ fontFamily: 'Georgia, serif' }}>MenuCloud</span>
                        </a>
                        <p className="text-gray-500 text-sm mt-1">Menús Digitales para Restaurantes</p>
                    </div>

                    <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>

                        {/* Icono */}
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(201,168,76,0.15)' }}>
                            <svg className="w-7 h-7" fill="none" stroke="#C9A84C" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        </div>

                        <h1 className="text-2xl font-bold text-white text-center mb-2">¿Olvidaste tu contraseña?</h1>
                        <p className="text-gray-400 text-sm text-center mb-6 leading-relaxed">
                            No hay problema. Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
                        </p>

                        {status && (
                            <div className="mb-5 p-4 rounded-xl text-sm text-center" style={{ background: 'rgba(39,174,96,0.15)', border: '1px solid rgba(39,174,96,0.3)', color: '#2ecc71' }}>
                                ✓ {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
                                    style={{
                                        background: 'rgba(255,255,255,0.07)',
                                        border: errors.email ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.12)',
                                    }}
                                    placeholder="correo@turestaurante.com"
                                    autoComplete="email"
                                    autoFocus
                                />
                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                                style={{ backgroundColor: '#C9A84C', color: '#1a1611' }}
                            >
                                {processing ? 'Enviando...' : 'Enviar enlace de recuperación'}
                            </button>
                        </form>

                        <div className="text-center mt-6">
                            <a href="/login" className="text-sm text-gray-400 hover:text-yellow-400 transition-colors">
                                ← Volver al login
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}