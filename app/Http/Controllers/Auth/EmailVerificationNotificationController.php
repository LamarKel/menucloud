<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            $dashboardRoute = $request->user()->role === 'superadmin' ? 'admin.dashboard' : 'panel.dashboard';

            return redirect()->intended(route($dashboardRoute, absolute: false));
        }

        try {
            $request->user()->sendEmailVerificationNotification();
        } catch (\Throwable $e) {
            Log::error('No se pudo enviar el correo de verificación de email', [
                'user_id' => $request->user()->id,
                'email' => $request->user()->email,
                'error' => $e->getMessage(),
            ]);
        }

        return back()->with('status', 'verification-link-sent');
    }
}
