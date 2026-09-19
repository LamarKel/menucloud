<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f5f5f5;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 580px;
            margin: 40px auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
        }

        .header {
            background: #1a1611;
            padding: 32px;
            text-align: center;
        }

        .logo {
            color: #C9A84C;
            font-size: 28px;
            font-weight: bold;
        }

        .badge {
            background: #f59e0b;
            color: white;
            font-size: 13px;
            font-weight: bold;
            padding: 6px 16px;
            border-radius: 20px;
            display: inline-block;
            margin-top: 12px;
        }

        .body {
            padding: 32px;
        }

        .title {
            font-size: 22px;
            font-weight: bold;
            color: #1a1611;
            margin-bottom: 12px;
        }

        .text {
            color: #555;
            line-height: 1.6;
            margin-bottom: 16px;
            font-size: 15px;
        }

        .box {
            background: #f9f4ec;
            border: 1px solid #e8d5a0;
            border-radius: 8px;
            padding: 16px;
            margin: 20px 0;
        }

        .box-title {
            font-weight: bold;
            color: #1a1611;
            margin-bottom: 8px;
        }

        .box-item {
            color: #555;
            font-size: 14px;
            margin-bottom: 4px;
        }

        .footer {
            background: #f9f9f9;
            padding: 20px 32px;
            text-align: center;
            color: #999;
            font-size: 12px;
            border-top: 1px solid #eee;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <div class="logo">KeMenu</div>
            <div class="badge">Pago próximo a vencer</div>
        </div>
        <div class="body">
            <div class="title">Tu pago vence pronto</div>
            <p class="text">Hola <strong>{{ $restaurant->owner_name }}</strong>, tu próximo pago del plan <strong>{{ $subscription->plan->name }}</strong> para <strong>{{ $restaurant->name }}</strong> vence el <strong>{{ $subscription->next_billing_date->translatedFormat('d \d\e F \d\e Y') }}</strong>.</p>

            <div class="box">
                <div class="box-title">Detalles del pago</div>
                <div class="box-item"><strong>Monto:</strong> ${{ number_format($subscription->plan->price, 2) }}</div>
                <div class="box-item"><strong>Fecha de vencimiento:</strong> {{ $subscription->next_billing_date->translatedFormat('d/m/Y') }}</div>
            </div>

            <p class="text">Para evitar que tu menú digital deje de estar disponible para tus clientes, realiza tu pago antes de esa fecha.</p>

            <p class="text" style="font-size: 13px; color: #888;">¿Ya pagaste o tienes preguntas? Escríbenos a <a href="mailto:soporte@kemenu.app" style="color: #C9A84C;">soporte@kemenu.app</a></p>
        </div>
        <div class="footer">
            © 2026 KeMenu · Todos los derechos reservados
        </div>
    </div>
</body>

</html>
