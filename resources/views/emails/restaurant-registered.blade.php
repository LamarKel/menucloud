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

        .steps {
            margin: 20px 0;
        }

        .step {
            display: flex;
            gap: 12px;
            margin-bottom: 12px;
            align-items: flex-start;
        }

        .step-num {
            background: #C9A84C;
            color: #1a1611;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            flex-shrink: 0;
        }

        .step-text {
            color: #555;
            font-size: 14px;
            line-height: 1.5;
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
            <div class="logo">MenuCloud</div>
            <div style="color: rgba(255,255,255,0.5); font-size: 13px; margin-top: 4px;">Menús Digitales para Restaurantes</div>
        </div>
        <div class="body">
            <div class="title">¡Solicitud recibida exitosamente!</div>
            <p class="text">Hola <strong>{{ $restaurant->owner_name }}</strong>, hemos recibido la solicitud de registro para tu restaurante. Nuestro equipo la revisará y te notificaremos en menos de <strong>24 horas</strong>.</p>

            <div class="box">
                <div class="box-title">Datos de tu solicitud</div>
                <div class="box-item">🍽️ <strong>Restaurante:</strong> {{ $restaurant->name }}</div>
                <div class="box-item">🍴 <strong>Tipo de cocina:</strong> {{ $restaurant->cuisine_type }}</div>
                @if($restaurant->city)
                <div class="box-item">📍 <strong>Ciudad:</strong> {{ $restaurant->city }}</div>
                @endif
                <div class="box-item">📧 <strong>Email:</strong> {{ $restaurant->email }}</div>
            </div>

            <p class="text"><strong>¿Qué sigue?</strong></p>
            <div class="steps">
                <div class="step">
                    <div class="step-num">1</div>
                    <div class="step-text">Nuestro equipo revisará tu solicitud (menos de 24 horas)</div>
                </div>
                <div class="step">
                    <div class="step-num">2</div>
                    <div class="step-text">Recibirás un email de aprobación con tus credenciales de acceso</div>
                </div>
                <div class="step">
                    <div class="step-num">3</div>
                    <div class="step-text">Configuras tu menú y lo compartes con tus clientes</div>
                </div>
            </div>

            <p class="text" style="font-size: 13px; color: #888;">¿Tienes preguntas? Escríbenos a <a href="mailto:soporte@menucloud.com" style="color: #C9A84C;">soporte@menucloud.com</a></p>
        </div>
        <div class="footer">
            © 2026 MenuCloud · Todos los derechos reservados<br>
            Menús digitales profesionales para restaurantes
        </div>
    </div>
</body>

</html>