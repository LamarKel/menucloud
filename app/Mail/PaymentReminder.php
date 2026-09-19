<?php

namespace App\Mail;

use App\Models\Restaurant;
use App\Models\Subscription;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PaymentReminder extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Restaurant $restaurant, public Subscription $subscription) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Tu pago vence pronto — KeMenu',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.payment-reminder',
        );
    }
}
