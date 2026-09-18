import PanelLayout from '@/Layouts/PanelLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Profile({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const profileForm = useForm({
        name: user.name,
        email: user.email,
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });
    const currentPasswordInput = useRef(null);
    const passwordInput = useRef(null);

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.patch(route('profile.update'), { preserveScroll: true });
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
            onError: (errors) => {
                if (errors.password) {
                    passwordForm.reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }
                if (errors.current_password) {
                    passwordForm.reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    const inputClass = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400';
    const labelClass = 'block text-sm font-medium text-gray-700 mb-1';
    const errorClass = 'text-red-500 text-xs mt-1';

    return (
        <PanelLayout title="Mi Perfil">
            <Head title="Mi Perfil" />

            <div className="max-w-2xl space-y-6">
                {/* Información de la cuenta */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-800 mb-1">Información de la cuenta</h3>
                    <p className="text-sm text-gray-500 mb-5">Actualiza tu nombre y correo electrónico</p>

                    <form onSubmit={submitProfile} className="space-y-4">
                        <div>
                            <label className={labelClass}>Nombre</label>
                            <input
                                type="text"
                                value={profileForm.data.name}
                                onChange={e => profileForm.setData('name', e.target.value)}
                                className={inputClass}
                                required
                            />
                            {profileForm.errors.name && <p className={errorClass}>{profileForm.errors.name}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Correo electrónico</label>
                            <input
                                type="email"
                                value={profileForm.data.email}
                                onChange={e => profileForm.setData('email', e.target.value)}
                                className={inputClass}
                                required
                            />
                            {profileForm.errors.email && <p className={errorClass}>{profileForm.errors.email}</p>}
                        </div>

                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div className="text-sm text-gray-600">
                                Tu correo no está verificado.{' '}
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="text-yellow-600 hover:text-yellow-700 underline"
                                >
                                    Reenviar correo de verificación
                                </Link>
                                {status === 'verification-link-sent' && (
                                    <p className="text-green-600 mt-1">Se envió un nuevo enlace de verificación.</p>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={profileForm.processing}
                                className="px-4 py-2 text-sm bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors disabled:opacity-50"
                            >
                                Guardar cambios
                            </button>
                            {profileForm.recentlySuccessful && (
                                <span className="flex items-center gap-1 text-sm text-green-600">
                                    <CheckCircleIcon className="w-4 h-4" /> Guardado
                                </span>
                            )}
                        </div>
                    </form>
                </div>

                {/* Cambiar contraseña */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-800 mb-1">Cambiar contraseña</h3>
                    <p className="text-sm text-gray-500 mb-5">Usa una contraseña larga y segura para proteger tu cuenta</p>

                    <form onSubmit={submitPassword} className="space-y-4">
                        <div>
                            <label className={labelClass}>Contraseña actual</label>
                            <input
                                ref={currentPasswordInput}
                                type="password"
                                value={passwordForm.data.current_password}
                                onChange={e => passwordForm.setData('current_password', e.target.value)}
                                className={inputClass}
                                autoComplete="current-password"
                            />
                            {passwordForm.errors.current_password && <p className={errorClass}>{passwordForm.errors.current_password}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Nueva contraseña</label>
                            <input
                                ref={passwordInput}
                                type="password"
                                value={passwordForm.data.password}
                                onChange={e => passwordForm.setData('password', e.target.value)}
                                className={inputClass}
                                autoComplete="new-password"
                            />
                            {passwordForm.errors.password && <p className={errorClass}>{passwordForm.errors.password}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Confirmar nueva contraseña</label>
                            <input
                                type="password"
                                value={passwordForm.data.password_confirmation}
                                onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                                className={inputClass}
                                autoComplete="new-password"
                            />
                            {passwordForm.errors.password_confirmation && <p className={errorClass}>{passwordForm.errors.password_confirmation}</p>}
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={passwordForm.processing}
                                className="px-4 py-2 text-sm bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors disabled:opacity-50"
                            >
                                Actualizar contraseña
                            </button>
                            {passwordForm.recentlySuccessful && (
                                <span className="flex items-center gap-1 text-sm text-green-600">
                                    <CheckCircleIcon className="w-4 h-4" /> Guardado
                                </span>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </PanelLayout>
    );
}
