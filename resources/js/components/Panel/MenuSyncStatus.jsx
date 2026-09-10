import { useEffect, useState } from 'react';

/**
 * Semáforo de sincronización de menú (Capa 4 de la spec de Dicbot).
 * Barra tranquilizadora, no una alarma: mientras está montado (pantalla de
 * menú abierta), pregunta cada 5s si Dicbot ya confirmó la última versión.
 */
export default function MenuSyncStatus() {
    const [estado, setEstado] = useState(null); // { synced, remoteVersion, localVersion }

    useEffect(() => {
        let activo = true;

        async function consultar() {
            try {
                const res = await fetch(route('panel.menu-sync-status'), {
                    headers: { Accept: 'application/json' },
                });
                if (!res.ok) return;
                const data = await res.json();
                if (activo) setEstado(data);
            } catch {
                // silencioso: el semáforo simplemente no actualiza este tick
            }
        }

        consultar();
        const id = setInterval(consultar, 5000);
        return () => {
            activo = false;
            clearInterval(id);
        };
    }, []);

    if (!estado || estado.synced === null) return null;

    if (estado.synced) {
        const hora = estado.remoteUpdatedAt
            ? new Date(estado.remoteUpdatedAt).toLocaleTimeString('es-DO', { hour: '2-digit', minute: '2-digit' })
            : '';
        return (
            <div className="flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-3 py-1.5 rounded-full border border-green-200">
                <span>✅</span>
                <span>El bot ya tiene tu menú actualizado{hora ? ` · ${hora}` : ''}</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 text-sm font-medium px-3 py-1.5 rounded-full border border-yellow-200">
            <span>⏳</span>
            <span>El bot todavía no confirma el cambio</span>
        </div>
    );
}
