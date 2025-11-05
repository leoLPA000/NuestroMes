/**
 * 🎵 REPRODUCTOR DE MÚSICA ROMÁNTICA
 * Sistema de audio con controles personalizados
 */

class ReproductorRomantico {
    constructor() {
        this.audio = null;
        this.playing = false;
        this.currentTrack = 0;
        this.volume = 0.3; // Volumen inicial 30%
        this.minimizado = false;
        
        // Lista de canciones (URLs o rutas locales)
        this.playlist = [
            {
                titulo: 'Canción Romántica 1',
                artista: 'Artista',
                src: 'audio/cancion1.mp3'
            },
            {
                titulo: 'Canción Romántica 2',
                artista: 'Artista',
                src: 'audio/cancion2.mp3'
            },
            {
                titulo: 'Canción Romántica 3',
                artista: 'Artista',
                src: 'audio/cancion3.mp3'
            }
        ];
        
        this.init();
    }
    
    init() {
        // Crear elemento de audio
        this.audio = new Audio();
        this.audio.volume = this.volume;
        this.audio.loop = false;
        
        // Evento cuando termina una canción
        this.audio.addEventListener('ended', () => {
            this.siguiente();
        });
        
        // Cargar primera canción
        this.cargarCancion(0);
        
        // Crear controles
        this.crearControles();
        
        // Bind eventos
        this.bindEventos();
    }
    
    crearControles() {
        const controles = document.createElement('div');
        controles.className = 'reproductor-container';
        controles.innerHTML = `
            <div class="reproductor-info">
                <span class="icono-musica">🎵</span>
                <div class="info-cancion">
                    <div class="cancion-titulo">Música Romántica</div>
                    <div class="cancion-artista">Para Rocío 💕</div>
                </div>
            </div>
            
            <div class="reproductor-controles">
                <button class="btn-control btn-anterior" title="Anterior">
                    <span>⏮️</span>
                </button>
                
                <button class="btn-control btn-play" title="Reproducir/Pausar">
                    <span class="icono-play">▶️</span>
                    <span class="icono-pause" style="display:none">⏸️</span>
                </button>
                
                <button class="btn-control btn-siguiente" title="Siguiente">
                    <span>⏭️</span>
                </button>
                
                <div class="volumen-container">
                    <button class="btn-control btn-volumen" title="Volumen">
                        <span class="icono-volumen-alto">🔊</span>
                        <span class="icono-volumen-bajo" style="display:none">🔉</span>
                        <span class="icono-volumen-mute" style="display:none">🔇</span>
                    </button>
                    <input type="range" class="volumen-slider" min="0" max="100" value="30">
                </div>
            </div>
            
            <button class="btn-minimizar-reproductor" title="Minimizar">➖</button>
        `;
        
        document.body.appendChild(controles);
        
        // Crear botón flotante minimizado
        const botonFlotante = document.createElement('button');
        botonFlotante.className = 'reproductor-minimizado';
        botonFlotante.title = 'Abrir reproductor';
        botonFlotante.innerHTML = '🎵';
        botonFlotante.style.display = 'none';
        document.body.appendChild(botonFlotante);
    }
    
    bindEventos() {
        // Play/Pause
        const btnPlay = document.querySelector('.btn-play');
        btnPlay.addEventListener('click', () => this.togglePlay());
        
        // Anterior
        const btnAnterior = document.querySelector('.btn-anterior');
        btnAnterior.addEventListener('click', () => this.anterior());
        
        // Siguiente
        const btnSiguiente = document.querySelector('.btn-siguiente');
        btnSiguiente.addEventListener('click', () => this.siguiente());
        
        // Volumen slider
        const volumenSlider = document.querySelector('.volumen-slider');
        volumenSlider.addEventListener('input', (e) => {
            this.cambiarVolumen(e.target.value / 100);
        });
        
        // Botón volumen (mute/unmute)
        const btnVolumen = document.querySelector('.btn-volumen');
        btnVolumen.addEventListener('click', () => this.toggleMute());
        
        // Minimizar reproductor
        const btnMinimizar = document.querySelector('.btn-minimizar-reproductor');
        btnMinimizar.addEventListener('click', () => this.minimizar());
        
        // Abrir desde minimizado
        const btnFlotante = document.querySelector('.reproductor-minimizado');
        btnFlotante.addEventListener('click', () => this.maximizar());
    }
    
    cargarCancion(index) {
        if (index >= 0 && index < this.playlist.length) {
            this.currentTrack = index;
            const cancion = this.playlist[index];
            this.audio.src = cancion.src;
            
            // Actualizar info visual
            const titulo = document.querySelector('.cancion-titulo');
            const artista = document.querySelector('.cancion-artista');
            
            if (titulo) titulo.textContent = cancion.titulo;
            if (artista) artista.textContent = cancion.artista;
        }
    }
    
    togglePlay() {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        this.audio.play().catch(err => {
            console.log('Error al reproducir:', err);
        });
        this.playing = true;
        
        // Actualizar iconos
        document.querySelector('.icono-play').style.display = 'none';
        document.querySelector('.icono-pause').style.display = 'inline';
        
        // Animar icono de música
        document.querySelector('.icono-musica').classList.add('pulsando');
    }
    
    pause() {
        this.audio.pause();
        this.playing = false;
        
        // Actualizar iconos
        document.querySelector('.icono-play').style.display = 'inline';
        document.querySelector('.icono-pause').style.display = 'none';
        
        // Quitar animación
        document.querySelector('.icono-musica').classList.remove('pulsando');
    }
    
    siguiente() {
        const nextIndex = (this.currentTrack + 1) % this.playlist.length;
        this.cargarCancion(nextIndex);
        if (this.playing) {
            this.play();
        }
    }
    
    anterior() {
        const prevIndex = this.currentTrack === 0 
            ? this.playlist.length - 1 
            : this.currentTrack - 1;
        this.cargarCancion(prevIndex);
        if (this.playing) {
            this.play();
        }
    }
    
    cambiarVolumen(nivel) {
        this.volume = nivel;
        this.audio.volume = nivel;
        
        // Actualizar iconos de volumen
        const alto = document.querySelector('.icono-volumen-alto');
        const bajo = document.querySelector('.icono-volumen-bajo');
        const mute = document.querySelector('.icono-volumen-mute');
        
        alto.style.display = 'none';
        bajo.style.display = 'none';
        mute.style.display = 'none';
        
        if (nivel === 0) {
            mute.style.display = 'inline';
        } else if (nivel < 0.5) {
            bajo.style.display = 'inline';
        } else {
            alto.style.display = 'inline';
        }
    }
    
    toggleMute() {
        if (this.audio.volume > 0) {
            this.audio.volume = 0;
            document.querySelector('.volumen-slider').value = 0;
            this.cambiarVolumen(0);
        } else {
            this.audio.volume = this.volume;
            document.querySelector('.volumen-slider').value = this.volume * 100;
            this.cambiarVolumen(this.volume);
        }
    }
    
    minimizar() {
        this.minimizado = true;
        const reproductor = document.querySelector('.reproductor-container');
        const botonFlotante = document.querySelector('.reproductor-minimizado');
        
        reproductor.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            reproductor.style.display = 'none';
            botonFlotante.style.display = 'flex';
            botonFlotante.style.animation = 'bounceIn 0.5s ease';
        }, 300);
    }
    
    maximizar() {
        this.minimizado = false;
        const reproductor = document.querySelector('.reproductor-container');
        const botonFlotante = document.querySelector('.reproductor-minimizado');
        
        botonFlotante.style.animation = 'fadeOut 0.2s ease';
        setTimeout(() => {
            botonFlotante.style.display = 'none';
            reproductor.style.display = 'flex';
            reproductor.style.animation = 'slideInRight 0.5s ease';
        }, 200);
    }
    
    mostrar() {
        const reproductor = document.querySelector('.reproductor-container');
        reproductor.style.display = 'flex';
        reproductor.style.animation = 'fadeIn 0.3s ease';
    }
}

// Inicializar cuando el DOM esté listo
let reproductorGlobal;

document.addEventListener('DOMContentLoaded', () => {
    reproductorGlobal = new ReproductorRomantico();
    
    // Preguntar al usuario si quiere música (opcional)
    // setTimeout(() => {
    //     if (confirm('¿Quieres escuchar música romántica? 🎵💕')) {
    //         reproductorGlobal.play();
    //     }
    // }, 2000);
});
