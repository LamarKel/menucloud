<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Protege los endpoints que Dicbot consulta para reconciliación
 * (GET /api/v1/restaurants/{tenant}/menu y /menu/version).
 */
class VerifyDicbotToken
{
    public function handle(Request $request, Closure $next): Response
    {
        $esperado = config('services.pidebot.read_token');
        $recibido = $request->bearerToken();

        if (!$esperado || !$recibido || !hash_equals($esperado, $recibido)) {
            abort(401, 'Token inválido.');
        }

        return $next($request);
    }
}
