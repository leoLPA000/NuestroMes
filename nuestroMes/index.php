<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NuestroMes ❤️ Para Rocío</title>
    <link rel="stylesheet" href="css/estilos.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Great+Vibes&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <header class="hero">
            <h1 class="titulo-principal">Para ti, Rocío ❤️</h1>
            <p class="subtitulo">Nuestro primer mes juntos</p>
            <div class="fecha-especial">5 de noviembre, 2025</div>
        </header>

        <section class="intro">
            <p class="mensaje-intro">
                Mi amor, esta página es para ti. Cada categoría guarda mensajes especiales 
                para acompañarte en cualquier momento. Léeme cuando lo necesites... 💕
            </p>
        </section>

        <section class="categorias">
            <h2 class="seccion-titulo">Elige cómo te sientes hoy</h2>
            
            <div class="grid-categorias">
                <a href="mensajes.php?categoria=feliz" class="categoria-card feliz">
                    <div class="icono">😄</div>
                    <h3>Cuando estés feliz</h3>
                    <p>Celebremos juntos tu alegría</p>
                </a>

                <a href="mensajes.php?categoria=triste" class="categoria-card triste">
                    <div class="icono">😢</div>
                    <h3>Cuando estés triste</h3>
                    <p>Deja que te abrace con palabras</p>
                </a>

                <a href="mensajes.php?categoria=enojada" class="categoria-card enojada">
                    <div class="icono">😤</div>
                    <h3>Cuando estés enojada</h3>
                    <p>Respira... aquí estoy para ti</p>
                </a>

                <a href="mensajes.php?categoria=amor" class="categoria-card amor">
                    <div class="icono">❤️</div>
                    <h3>Por qué te amo</h3>
                    <p>Las razones nunca terminan</p>
                </a>

                <a href="mensajes.php?categoria=nostalgia" class="categoria-card nostalgia">
                    <div class="icono">🌙</div>
                    <h3>Cuando me extrañes</h3>
                    <p>Estoy más cerca de lo que piensas</p>
                </a>

                <a href="mensajes.php?categoria=motivacion" class="categoria-card motivacion">
                    <div class="icono">💪</div>
                    <h3>Cuando necesites fuerza</h3>
                    <p>Eres más fuerte de lo que crees</p>
                </a>
            </div>
        </section>

        <footer class="pie-pagina">
            <p>Con todo mi amor para Rocío Milagros Fernández 💕</p>
            <p class="firma">— Tu Leo que te adora</p>
        </footer>
    </div>

    <!-- Efectos visuales -->
    <div id="efectos-fondo"></div>
    
    <script src="js/efectos.js"></script>
</body>
</html>
