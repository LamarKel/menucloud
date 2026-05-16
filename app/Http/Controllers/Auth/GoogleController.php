<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $user = User::where('email', $googleUser->email)->first();

            if (!$user) {
                return redirect()->route('login')->withErrors([
                    'email' => 'No existe una cuenta con este email. Regístrate primero.',
                ]);
            }

            Auth::login($user, true);

            if ($user->role === 'superadmin') {
                return redirect()->route('admin.dashboard');
            }

            // Verificar que el restaurante existe y está activo
            if (!$user->restaurant_id || !$user->restaurant) {
                Auth::logout();
                return redirect()->route('login')->withErrors([
                    'email' => 'Tu cuenta no tiene un restaurante asociado. Contacta al administrador.',
                ]);
            }

            if ($user->restaurant->status === 'pending') {
                Auth::logout();
                return redirect()->route('login')->withErrors([
                    'email' => 'Tu restaurante está pendiente de aprobación.',
                ]);
            }

            if ($user->restaurant->status === 'suspended') {
                Auth::logout();
                return redirect()->route('login')->withErrors([
                    'email' => 'Tu cuenta está suspendida. Contacta al administrador.',
                ]);
            }

            return redirect()->route('panel.dashboard');
        } catch (\Exception $e) {
            return redirect()->route('login')->withErrors([
                'email' => 'Error al iniciar sesión con Google. Intenta de nuevo.',
            ]);
        }
    }
}
