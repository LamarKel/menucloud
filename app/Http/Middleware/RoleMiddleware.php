<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;


class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!$request->user()) {
            return redirect()->route('login');
        }

        if ($request->user()->role !== $role) {
            abort(403, 'No tienes permiso para acceder a esta sección.');
        }

        if ($role === 'restaurant') {
            $user = $request->user();

            if (!$user->restaurant_id || !$user->restaurant) {
                Auth::logout();
                return redirect()->route('login')->withErrors([
                    'email' => 'Tu cuenta no tiene un restaurante asociado. Contacta al administrador.',
                ]);
            }

            if ($user->restaurant->status === 'suspended') {
                Auth::logout();
                return redirect()->route('login')->withErrors([
                    'email' => 'Tu cuenta está suspendida. Contacta al administrador.',
                ]);
            }

            if ($user->restaurant->status === 'pending') {
                Auth::logout();
                return redirect()->route('login')->withErrors([
                    'email' => 'Tu restaurante está pendiente de aprobación.',
                ]);
            }
        }

        return $next($request);
    }
}
