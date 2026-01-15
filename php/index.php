<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Página web romántica para Rocío, celebrando nuestro primer mes juntos con mensajes de amor personalizados.">
    <meta name="author" content="Leo">
    <meta name="theme-color" content="#e63946">
    <title>❤️Para Rocío ❤️</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="img/corazon.svg">
    
    <!-- Estilos -->
    <link rel="stylesheet" href="css/estilos.css">
    
    <!-- Fuentes -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Great+Vibes&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <header class="hero">
            <h1 class="titulo-principal">Para ti, Rocío ❤️ vida php</h1>
            <p class="subtitulo">Nuestro primer mes juntos</p>
            <div class="fecha-especial">8 de noviembre, 2025</div>
        </header>

        <section class="intro">
            <p class="mensaje-intro">
                Mi amor, esta página es para ti. Cada categoría guarda mensajes especiales 
                para acompañarte en cualquier momento. Léeme cuando lo necesites... 💕
            </p>
        </section>

        <section class="categorias">
            <h2 class="seccion-titulo">Elige cómo te sientes hoy</h2>
            
            <div class="grid-categorias" role="navigation" aria-label="Categorías de mensajes">
                <a href="mensajes.html?categoria=feliz" class="categoria-card feliz" aria-label="Ver mensajes para cuando estés feliz">
                    <div class="icono" role="img" aria-label="Emoji feliz">😄</div>
                    <h3>Cuando estés feliz</h3>
                    <p>Celebremos juntos tu alegría</p>
                </a>

                <a href="mensajes.html?categoria=triste" class="categoria-card triste" aria-label="Ver mensajes para cuando estés triste">
                    <div class="icono" role="img" aria-label="Emoji triste">😢</div>
                    <h3>Cuando estés triste</h3>
                    <p>Deja que te abrace con palabras</p>
                </a>

                <a href="mensajes.html?categoria=enojada" class="categoria-card enojada" aria-label="Ver mensajes para cuando estés enojada">
                    <div class="icono" role="img" aria-label="Emoji enojado">😤</div>
                    <h3>Cuando estés enojada</h3>
                    <p>Respira... aquí estoy para ti</p>
                </a>

                <a href="mensajes.html?categoria=amor" class="categoria-card amor" aria-label="Ver mensajes sobre por qué te amo">
                    <div class="icono" role="img" aria-label="Emoji corazón">❤️</div>
                    <h3>Por qué te amo</h3>
                    <p>Las razones nunca terminan</p>
                </a>

                <a href="mensajes.html?categoria=nostalgia" class="categoria-card nostalgia" aria-label="Ver mensajes para cuando me extrañes">
                    <div class="icono" role="img" aria-label="Emoji luna">🌙</div>
                    <h3>Cuando me extrañes</h3>
                    <p>Estoy más cerca de lo que piensas</p>
                </a>

                <a href="mensajes.html?categoria=motivacion" class="categoria-card motivacion" aria-label="Ver mensajes motivacionales">
                    <div class="icono" role="img" aria-label="Emoji músculo">💪</div>
                    <h3>Cuando necesites fuerza</h3>
                    <p>Eres más fuerte de lo que crees</p>
                </a>
            </div>
        </section>

        <section class="acceso-rapido">
            <a href="mis-mensajes.html" class="btn-mis-mensajes">
                <span class="icono-btn">✍️</span>
                <div class="texto-btn">
                    <strong>Mis Mensajes</strong>
                    <small id="contadorMisMensajes">0 mensajes guardados</small>
                </div>
            </a>
        </section>

        <footer class="pie-pagina">
            <div class="contador-dias">
                <p class="texto-contador">Llevamos juntos:</p>
                <p class="numero-dias" id="diasJuntos">1 mes</p>
                <p class="texto-pequeno">Desde el 8 de octubre, 2025 💕</p>
            </div>
            <p>Con todo mi amor para Rocío Milagros Fernández 💕</p>
            <p class="firma">— Tu Leo que te adora</p>
        </footer>
    </div>

    <!-- Efectos visuales -->
    <div id="efectos-fondo"></div>
    
    <!-- Contenedor para partículas del cursor -->
    <div id="cursor-particles"></div>
    
    <!-- Supabase SDK (necesario para storage y DB) -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="js/supabaseConfig.js"></script>
    
    <!--<script src="js/efectos.js"></script> -->
    <script src="js/cursorEffects.js"></script>
    <script src="js/musica.js"></script>
    <script src="js/galeria.js"></script>
    <script src="js/modoOscuro.js"></script>
    <script src="js/formulario.js"></script>
    <script>
        // Contador de días juntos
        function calcularDiasJuntos() {
            const fechaInicio = new Date('2025-10-08'); // 8 de octubre 2025
            const hoy = new Date();
            const diferencia = hoy - fechaInicio;
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            
            let texto = '';
            if (dias === 0) {
                texto = '¡Hoy comenzamos! 🎉';
            } else if (dias === 1) {
                texto = '1 día hermoso';
            } else if (dias < 30) {
                texto = dias + ' días increíbles';
            } else if (dias < 60) {
                texto = '1 mes maravilloso';
            } else if (dias < 365) {
                const meses = Math.floor(dias / 30);
                const diasRestantes = dias % 30;
                texto = meses + (meses === 1 ? ' mes' : ' meses');
                if (diasRestantes > 0) {
                    texto += ' y ' + diasRestantes + (diasRestantes === 1 ? ' día' : ' días');
                }
            } else {
                const anos = Math.floor(dias / 365);
                const diasRestantes = dias % 365;
                texto = anos + (anos === 1 ? ' año' : ' años');
                if (diasRestantes > 0) {
                    const meses = Math.floor(diasRestantes / 30);
                    if (meses > 0) {
                        texto += ' y ' + meses + (meses === 1 ? ' mes' : ' meses');
                    }
                }
            }
            
            const elemento = document.getElementById('diasJuntos');
            if (elemento) {
                elemento.textContent = texto;
                elemento.style.animation = 'heartbeat 2s infinite';
            }
        }
        
        // Calcular al cargar
        calcularDiasJuntos();
        
        // Actualizar contador de mensajes personalizados
        function actualizarContadorMensajes() {
            const mensajes = JSON.parse(localStorage.getItem('mensajesPersonalizados') || '[]');
            const contador = document.getElementById('contadorMisMensajes');
            if (contador) {
                const num = mensajes.length;
                contador.textContent = num === 0 ? 'Sin mensajes aún' : 
                                      num === 1 ? '1 mensaje guardado' : 
                                      `${num} mensajes guardados`;
            }
        }
        
        actualizarContadorMensajes();
        
        // Actualizar cuando cambie localStorage
        window.addEventListener('storage', actualizarContadorMensajes);
    </script>
</body>
</html>
