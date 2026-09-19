<?php

namespace App\Console\Commands;

use App\Mail\PaymentReminder;
use App\Mail\SubscriptionSuspended;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class CheckSubscriptionBilling extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'billing:check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Envía recordatorios de pago próximos a vencer y suspende restaurantes con pagos vencidos';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $adminEmails = User::where('role', 'superadmin')->pluck('email');
        $today = now()->startOfDay();

        $subscriptions = Subscription::where('status', '!=', 'cancelled')
            ->with('restaurant', 'plan')
            ->get();

        foreach ($subscriptions as $subscription) {
            $restaurant = $subscription->restaurant;

            if (! $restaurant) {
                continue;
            }

            $dueInDays = $today->diffInDays($subscription->next_billing_date, false);

            if ($dueInDays < 0 && $subscription->status !== 'overdue') {
                $subscription->update(['status' => 'overdue']);
                $restaurant->update(['status' => 'suspended']);

                $this->sendMail($adminEmails, $restaurant, $subscription, SubscriptionSuspended::class, 'suspensión');

                $this->info("Suspendido: {$restaurant->name} (venció {$subscription->next_billing_date->toDateString()})");

                continue;
            }

            if ($dueInDays >= 0 && $dueInDays <= 3 && $subscription->reminder_sent_at === null) {
                $subscription->update(['reminder_sent_at' => $today]);

                $this->sendMail($adminEmails, $restaurant, $subscription, PaymentReminder::class, 'recordatorio');

                $this->info("Recordatorio enviado: {$restaurant->name} (vence {$subscription->next_billing_date->toDateString()})");
            }
        }
    }

    /**
     * @param  Collection<int, string>  $adminEmails
     * @param  class-string<Mailable>  $mailableClass
     */
    private function sendMail($adminEmails, $restaurant, Subscription $subscription, string $mailableClass, string $tipo): void
    {
        try {
            Mail::to($restaurant->email)->send(new $mailableClass($restaurant, $subscription));
        } catch (\Throwable $e) {
            Log::error("No se pudo enviar el correo de {$tipo} de suscripción al restaurante", [
                'restaurant_id' => $restaurant->id,
                'email' => $restaurant->email,
                'error' => $e->getMessage(),
            ]);
        }

        foreach ($adminEmails as $adminEmail) {
            try {
                Mail::to($adminEmail)->send(new $mailableClass($restaurant, $subscription));
            } catch (\Throwable $e) {
                Log::error("No se pudo enviar el correo de {$tipo} de suscripción al admin", [
                    'restaurant_id' => $restaurant->id,
                    'admin_email' => $adminEmail,
                    'error' => $e->getMessage(),
                ]);
            }
        }
    }
}
