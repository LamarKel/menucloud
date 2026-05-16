import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm<{ email: string; password: string; remember: boolean }>({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Iniciar Sesión — MenuCloud" />

            <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #1a1611 0%, #2c2418 50%, #1a1611 100%)' }}>

                {/* Panel izquierdo — Branding */}
                <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 border-r border-white/10">
                    <div>
                        <span className="text-3xl font-bold text-yellow-400" style={{ fontFamily: 'Georgia, serif' }}>MenuCloud</span>
                        <p className="text-gray-500 text-sm mt-1">Menús Digitales para Restaurantes</p>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-white leading-tight mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                            Gestiona tu menú<br />
                            <span style={{ color: '#C9A84C' }}>desde cualquier lugar</span>
                        </h2>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            Accede a tu panel para actualizar productos, crear promociones y personalizar tu menú digital en tiempo real.
                        </p>
                        <div className="space-y-3">
                            {[
                                '✓ Actualiza precios al instante',
                                '✓ Crea promociones y descuentos',
                                '✓ Personaliza colores y estilo',
                                '✓ Comparte tu menú con un QR',
                            ].map(item => (
                                <div key={item} className="text-sm text-gray-400">{item}</div>
                            ))}
                        </div>
                    </div>
                    <div className="text-xs text-gray-600">
                        © 2026 MenuCloud · Todos los derechos reservados
                    </div>
                </div>

                {/* Panel derecho — Formulario */}
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="w-full max-w-md">

                        {/* Logo móvil */}
                        <div className="lg:hidden text-center mb-8">
                            <span className="text-3xl font-bold text-yellow-400" style={{ fontFamily: 'Georgia, serif' }}>MenuCloud</span>
                        </div>

                        <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <h1 className="text-2xl font-bold text-white mb-1">Bienvenido de vuelta</h1>
                            <p className="text-gray-400 text-sm mb-6">Ingresa tus credenciales para acceder a tu panel</p>

                            {status && (
                                <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                                    {status}
                                </div>
                            )}
                            {status && (
                                <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                                    {status}
                                </div>
                            )}

                            {(errors.email || errors.password) && (
                                <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
                                    {errors.email || errors.password}
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
                                    />

                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="text-sm font-medium text-gray-300">Contraseña</label>
                                        {canResetPassword && (
                                            <Link href={route('password.request')} className="text-xs text-yellow-400 hover:text-yellow-300">
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            className="w-full px-4 py-3 pr-12 rounded-xl text-sm text-white outline-none transition-all"
                                            style={{
                                                background: 'rgba(255,255,255,0.07)',
                                                border: errors.password ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.12)',
                                            }}
                                            placeholder="Tu contraseña"
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                                        >
                                            {showPassword ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={data.remember}
                                        onChange={e => setData('remember', e.target.checked)}
                                        className="w-4 h-4 rounded"
                                        style={{ accentColor: '#C9A84C' }}
                                    />
                                    <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer">
                                        Recordarme
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                                    style={{ backgroundColor: '#C9A84C', color: '#1a1611' }}
                                >
                                    {processing ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                                </button>
                            </form>
                            {/* Divider */}
                            <div className="flex items-center gap-3 my-2">
                                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }}></div>
                                <span className="text-xs text-gray-500">o continúa con</span>
                                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }}></div>
                            </div>

                            {/* Google Button */}
                            <a
                                href="/auth/google"
                                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90"
                                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continuar con Google
                            </a>

                            <p className="text-center text-sm text-gray-500 mt-6">
                                ¿No tienes cuenta?{' '}
                                <Link href="/registro" className="text-yellow-400 hover:text-yellow-300 font-medium">
                                    Registra tu restaurante
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}