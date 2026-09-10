<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],
    'google' => [
        'client_id' => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect' => env('GOOGLE_REDIRECT_URI'),
    ],

    'pidebot' => [
        'url' => env('PIDEBOT_URL', 'http://localhost:3000'),
        // Firma HMAC del push de menú (MenuCloud → Dicbot). Debe ser igual a
        // MENUCLOUD_SECRET en el .env de Dicbot.
        'secret' => env('MENUCLOUD_SECRET'),
        // Token que Dicbot debe mandar como Bearer al leer versión/menú de
        // reconciliación. Debe ser igual a MENUCLOUD_TOKEN en el .env de Dicbot.
        'read_token' => env('MENUCLOUD_READ_TOKEN'),
        // Token que MenuCloud manda como Bearer al consultar el semáforo
        // (GET /api/menu-version/:tenant). Debe ser igual a DICBOT_API_TOKEN
        // en el .env de Dicbot.
        'dicbot_token' => env('DICBOT_API_TOKEN'),
    ],

];
