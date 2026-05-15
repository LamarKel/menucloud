import { Head, Link } from '@inertiajs/react';

export default function Success() {
    return (
        <>
            <Head title="Solicitud Enviada — MenuCloud" />

            <div className="min-h-screen bg-gray-50 flex flex-col">

                {/* Header */}
                <div className="bg-gray-900 py-4 px-6">
                    <span className="text-xl font-bold text-yellow-400" style={{ fontFamily: 'Georgia, serif' }}>MenuCloud</span>
                </div>

                <div className="flex-1 flex items-center justify-center px-4">
                    <div className="text-center max-w-md">

                        {/* Icono */}
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800 mb-3">¡Solicitud Enviada!</h1>
                        <p className="text-gray-500 mb-6 leading-relaxed">
                            Tu solicitud fue recibida exitosamente. Nuestro equipo la revisará y recibirás un email de confirmación en menos de <strong>24 horas</strong> con acceso a tu panel.
                        </p>

                        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 text-left space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold text-xs flex-shrink-0">1</div>
                                <span className="text-gray-600">Revisamos tu solicitud (menos de 24h)</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold text-xs flex-shrink-0">2</div>
                                <span className="text-gray-600">Te enviamos email de aprobación y acceso</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold text-xs flex-shrink-0">3</div>
                                <span className="text-gray-600">Configuras tu menú y lo compartes con tus clientes</span>
                            </div>
                        </div>

                        <Link
                            href="/login"
                            className="inline-block w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-xl transition-colors text-center"
                        >
                            Ir al Login
                        </Link>

                        <p className="text-xs text-gray-400 mt-4">
                            ¿Tienes preguntas? Escríbenos a <strong>soporte@menucloud.com</strong>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}