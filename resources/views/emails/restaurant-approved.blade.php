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
            background: #27ae60;
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

        .btn {
            display: block;
            background: #C9A84C;
            color: #1a1611;
            text-decoration: none;
            padding: 14px 24px;
            border-radius: 10px;
            font-weight: bold;
            font-size: 15px;
            text-align: center;
            margin: 24px 0;
        }

        .tip {
            background: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 8px;
            padding: 14px 16px;
            font-size: 13px;
            color: #0369a1;
            margin: 16px 0;
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
            <div class="badge">✓ Restaurante Aprobado</div>
        </div>
        <div class="body">
            <div class="title">¡Tu restaurante fue aprobado! 🎉</div>
            <p class="text">Hola <strong>{{ $restaurant->owner_name }}</strong>, nos complace informarte que tu restaurante <strong>{{ $restaurant->name }}</strong> ha sido aprobado en MenuCloud. ¡Ya puedes acceder a tu panel y comenzar a configurar tu menú digital!</p>

            <div class="box">
                <div class="box-title">Tus datos de acceso</div>
                <div class="box-item">🌐 <strong>Panel:</strong> <a href="{{ url('/login') }}" style="color: #C9A84C;">{{ url('/login') }}</a></div>
                <div class="box-item">📧 <strong>Email:</strong> {{ $restaurant->email }}</div>
                <div class="box-item">🔑 <strong>Contraseña:</strong> La que registraste al crear tu cuenta</div>
            </div>

            <a href="{{ url('/login') }}" class="btn">Acceder a mi Panel →</a>

            <div class="tip">
                💡 <strong>Tip:</strong> Lo primero que debes hacer es agregar las categorías de tu menú y luego los productos. Después personaliza los colores desde "Mi Restaurante".
            </div>

            <p class="text">Tu menú digital estará disponible en:</p>
            <div class="box">
                <div class="box-item" style="font-size: 15px; color: #C9A84C; font-weight: bold;">
                    {{ url('/menu/' . $restaurant->slug) }}
                </div>
            </div>

            <p class="text" style="font-size: 13px; color: #888;">¿Necesitas ayuda? Escríbenos a <a href="mailto:soporte@menucloud.com" style="color: #C9A84C;">soporte@menucloud.com</a></p>
        </div>
        <div class="footer">
            © 2026 MenuCloud · Todos los derechos reservados<br>
            Menús digitales profesionales para restaurantes
        </div>
    </div>
</body>

</html>