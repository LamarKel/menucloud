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
                session()->flash('google_error', 'No existe una cuenta con este email. Regístrate primero.');
                return redirect()->route('login');
            }

            if (!$user->restaurant_id || !$user->restaurant) {
                session()->flash('google_error', 'Tu cuenta no tiene un restaurante asociado. Contacta al administrador.');
                return redirect()->route('login');
            }

            if ($user->restaurant->status === 'pending') {
                session()->flash('google_error', 'Tu restaurante está pendiente de aprobación.');
                return redirect()->route('login');
            }

            if ($user->restaurant->status === 'suspended') {
                session()->flash('google_error', 'Tu cuenta está suspendida. Contacta al administrador.');
                return redirect()->route('login');
            }

            Auth::login($user, true);

            if ($user->role === 'superadmin') {
                return redirect()->route('admin.dashboard');
            }

            return redirect()->route('panel.dashboard');
        } catch (\Exception $e) {
            session()->flash('google_error', 'Error al iniciar sesión con Google. Intenta de nuevo.');
            return redirect()->route('login');
        }
    }
}
