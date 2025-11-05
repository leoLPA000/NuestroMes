/**
 * 📸 GALERÍA DE FOTOS ROMÁNTICA
 * Lightbox con carrusel y efectos suaves
 */

class GaleriaRomantica {
    constructor() {
        this.currentIndex = 0;
        this.fotos = [
            {
                src: 'galeria/foto1.jpg',
                titulo: 'Nuestro Primer Momento',
                fecha: '8 de octubre, 2025',
                descripcion: 'El día que todo comenzó 💕'
            },
            {
                src: 'galeria/foto2.jpg',
                titulo: 'Juntos',
                fecha: 'Octubre 2025',
                descripcion: 'Cada momento a tu lado es especial 🌹'
            },
            {
                src: 'galeria/foto3.jpg',
                titulo: 'Felicidad',
                fecha: 'Octubre 2025',
                descripcion: 'Tu sonrisa ilumina mi mundo ✨'
            },
            {
                src: 'galeria/foto4.jpg',
                titulo: 'Amor',
                fecha: 'Noviembre 2025',
                descripcion: 'Contigo todo es mejor 💝'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.crearBotonGaleria();
        this.crearModal();
        this.bindEventos();
    }
    
    crearBotonGaleria() {
        // Verificar si ya existe
        if (document.querySelector('.btn-galeria')) return;
        
        const boton = document.createElement('button');
        boton.className = 'btn-galeria';
        boton.innerHTML = `
            <span class="icono-galeria">📸</span>
            <span class="texto-galeria">Galería</span>
        `;
        boton.title = 'Ver nuestra galería de fotos';
        
        document.body.appendChild(boton);
        
        boton.addEventListener('click', () => {
            this.abrir();
        });
    }
    
    crearModal() {
        const modal = document.createElement('div');
        modal.className = 'galeria-modal';
        modal.innerHTML = `
            <div class="galeria-overlay"></div>
            
            <div class="galeria-contenido">
                <button class="galeria-cerrar" title="Cerrar">✖️</button>
                
                <button class="galeria-nav galeria-prev" title="Anterior">
                    <span>❮</span>
                </button>
                
                <div class="galeria-imagen-container">
                    <img src="" alt="" class="galeria-imagen">
                    <div class="galeria-info">
                        <h3 class="galeria-titulo"></h3>
                        <p class="galeria-fecha"></p>
                        <p class="galeria-descripcion"></p>
                        <div class="galeria-contador">
                            <span class="contador-actual">1</span> / <span class="contador-total">4</span>
                        </div>
                    </div>
                </div>
                
                <button class="galeria-nav galeria-next" title="Siguiente">
                    <span>❯</span>
                </button>
                
                <div class="galeria-thumbnails">
                    ${this.fotos.map((foto, index) => `
                        <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                            <img src="${foto.src}" alt="${foto.titulo}" onerror="this.src='img/placeholder.jpg'">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    bindEventos() {
        // Cerrar
        const btnCerrar = document.querySelector('.galeria-cerrar');
        const overlay = document.querySelector('.galeria-overlay');
        
        btnCerrar.addEventListener('click', () => this.cerrar());
        overlay.addEventListener('click', () => this.cerrar());
        
        // Navegación
        const btnPrev = document.querySelector('.galeria-prev');
        const btnNext = document.querySelector('.galeria-next');
        
        btnPrev.addEventListener('click', () => this.anterior());
        btnNext.addEventListener('click', () => this.siguiente());
        
        // Thumbnails
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => this.irAFoto(index));
        });
        
        // Teclado
        document.addEventListener('keydown', (e) => {
            const modal = document.querySelector('.galeria-modal');
            if (!modal.classList.contains('active')) return;
            
            if (e.key === 'ArrowLeft') this.anterior();
            if (e.key === 'ArrowRight') this.siguiente();
            if (e.key === 'Escape') this.cerrar();
        });
    }
    
    abrir(index = 0) {
        const modal = document.querySelector('.galeria-modal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        this.mostrarFoto(index);
    }
    
    cerrar() {
        const modal = document.querySelector('.galeria-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    mostrarFoto(index) {
        this.currentIndex = index;
        const foto = this.fotos[index];
        
        // Actualizar imagen
        const img = document.querySelector('.galeria-imagen');
        img.style.opacity = '0';
        
        setTimeout(() => {
            img.src = foto.src;
            img.alt = foto.titulo;
            img.style.opacity = '1';
        }, 200);
        
        // Actualizar info
        document.querySelector('.galeria-titulo').textContent = foto.titulo;
        document.querySelector('.galeria-fecha').textContent = foto.fecha;
        document.querySelector('.galeria-descripcion').textContent = foto.descripcion;
        document.querySelector('.contador-actual').textContent = index + 1;
        document.querySelector('.contador-total').textContent = this.fotos.length;
        
        // Actualizar thumbnails
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }
    
    siguiente() {
        const nextIndex = (this.currentIndex + 1) % this.fotos.length;
        this.mostrarFoto(nextIndex);
    }
    
    anterior() {
        const prevIndex = this.currentIndex === 0 
            ? this.fotos.length - 1 
            : this.currentIndex - 1;
        this.mostrarFoto(prevIndex);
    }
    
    irAFoto(index) {
        this.mostrarFoto(index);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new GaleriaRomantica();
});
