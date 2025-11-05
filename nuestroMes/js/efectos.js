// efectos.js - Animaciones e interactividad para NuestroMes
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarEfectos();
    crearCorazonesFlotantes();
    crearPetalosRosa();
    animarTarjetas();
});

// ============================================================
// INICIALIZAR EFECTOS
// ============================================================
function inicializarEfectos() {
    console.log('💕 Efectos cargados para Rocío');
    
    // Agregar clase de cargado
    document.body.classList.add('cargado');
    
    // Detectar hover en categorías
    const categorias = document.querySelectorAll('.categoria-card');
    categorias.forEach(card => {
        card.addEventListener('mouseenter', function() {
            crearExplosionCorazones(this);
        });
    });
}

// ============================================================
// CORAZONES FLOTANTES
// ============================================================
function crearCorazonesFlotantes() {
    const contenedor = document.getElementById('efectos-fondo');
    if (!contenedor) return;
    
    const numCorazones = window.innerWidth < 768 ? 10 : 15;
    
    for (let i = 0; i < numCorazones; i++) {
        setTimeout(() => {
            const corazon = document.createElement('div');
            corazon.className = 'corazon-flotante';
            corazon.innerHTML = Math.random() > 0.5 ? '❤️' : '💕';
            
            // Posición aleatoria
            corazon.style.left = Math.random() * 100 + '%';
            corazon.style.fontSize = (Math.random() * 20 + 15) + 'px';
            corazon.style.animationDuration = (Math.random() * 5 + 8) + 's';
            corazon.style.animationDelay = (Math.random() * 3) + 's';
            corazon.style.opacity = Math.random() * 0.4 + 0.3;
            
            contenedor.appendChild(corazon);
            
            // Remover después de la animación
            setTimeout(() => {
                corazon.remove();
            }, 15000);
        }, i * 800);
    }
    
    // Repetir cada 12 segundos
    setInterval(() => {
        crearCorazonesFlotantes();
    }, 12000);
}

// ============================================================
// PÉTALOS DE ROSA
// ============================================================
function crearPetalosRosa() {
    const contenedor = document.getElementById('efectos-fondo');
    if (!contenedor) return;
    
    const numPetalos = window.innerWidth < 768 ? 8 : 12;
    
    for (let i = 0; i < numPetalos; i++) {
        setTimeout(() => {
            const petalo = document.createElement('div');
            petalo.className = 'petalo-rosa';
            petalo.innerHTML = '🌸';
            
            // Posición y animación aleatoria
            petalo.style.left = Math.random() * 100 + '%';
            petalo.style.fontSize = (Math.random() * 15 + 10) + 'px';
            petalo.style.animationDuration = (Math.random() * 8 + 10) + 's';
            petalo.style.animationDelay = (Math.random() * 2) + 's';
            petalo.style.opacity = Math.random() * 0.5 + 0.3;
            
            contenedor.appendChild(petalo);
            
            // Remover después de caer
            setTimeout(() => {
                petalo.remove();
            }, 18000);
        }, i * 1200);
    }
    
    // Repetir cada 15 segundos
    setInterval(() => {
        crearPetalosRosa();
    }, 15000);
}

// ============================================================
// EXPLOSIÓN DE CORAZONES AL HOVER
// ============================================================
function crearExplosionCorazones(elemento) {
    const rect = elemento.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 5; i++) {
        const corazon = document.createElement('div');
        corazon.className = 'corazon-explosion';
        corazon.innerHTML = '💖';
        corazon.style.left = centerX + 'px';
        corazon.style.top = centerY + 'px';
        corazon.style.fontSize = (Math.random() * 10 + 12) + 'px';
        
        // Dirección aleatoria
        const angulo = (Math.PI * 2 * i) / 5;
        const distancia = Math.random() * 50 + 30;
        const tx = Math.cos(angulo) * distancia;
        const ty = Math.sin(angulo) * distancia;
        
        corazon.style.setProperty('--tx', tx + 'px');
        corazon.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(corazon);
        
        setTimeout(() => {
            corazon.remove();
        }, 1000);
    }
}

// ============================================================
// ANIMAR TARJETAS DE MENSAJES
// ============================================================
function animarTarjetas() {
    const mensajes = document.querySelectorAll('.mensaje-card');
    
    mensajes.forEach((mensaje, index) => {
        mensaje.addEventListener('click', function() {
            // Agregar efecto de pulso
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulsoCorazon 0.6s ease';
            }, 10);
        });
    });
}

// ============================================================
// ESTILOS CSS INYECTADOS PARA EFECTOS
// ============================================================
const estilosEfectos = document.createElement('style');
estilosEfectos.textContent = `
    .corazon-flotante {
        position: fixed;
        pointer-events: none;
        z-index: 999;
        animation: flotarArriba 12s linear infinite;
        user-select: none;
    }
    
    @keyframes flotarArriba {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .petalo-rosa {
        position: fixed;
        pointer-events: none;
        z-index: 998;
        animation: caerPetalo 15s ease-in infinite;
        user-select: none;
    }
    
    @keyframes caerPetalo {
        0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.8;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .corazon-explosion {
        position: fixed;
        pointer-events: none;
        z-index: 1000;
        animation: explotar 1s ease-out forwards;
        user-select: none;
    }
    
    @keyframes explotar {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes pulsoCorazon {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    body.cargado .categoria-card,
    body.cargado .mensaje-card {
        animation-play-state: running;
    }
`;

document.head.appendChild(estilosEfectos);

// ============================================================
// EFECTO DE CURSOR (OPCIONAL - para desktop)
// ============================================================
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', function(e) {
        // Cada 100ms crear una estela sutil
        if (Math.random() > 0.95) {
            const estela = document.createElement('div');
            estela.className = 'cursor-estela';
            estela.innerHTML = '✨';
            estela.style.left = e.pageX + 'px';
            estela.style.top = e.pageY + 'px';
            estela.style.position = 'absolute';
            estela.style.pointerEvents = 'none';
            estela.style.fontSize = '12px';
            estela.style.opacity = '0.6';
            estela.style.transition = 'all 0.8s ease';
            estela.style.zIndex = '9999';
            
            document.body.appendChild(estela);
            
            setTimeout(() => {
                estela.style.opacity = '0';
                estela.style.transform = 'translateY(-30px) scale(1.5)';
            }, 10);
            
            setTimeout(() => {
                estela.remove();
            }, 800);
        }
    });
}

// ============================================================
// LOG ROMÁNTICO EN CONSOLA (easter egg)
// ============================================================
console.log('%c💕 Para Rocío, con todo mi amor 💕', 'color: #e63946; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c🌹 Este sitio fue hecho con mucho cariño por Leo 🌹', 'color: #8e44ad; font-size: 14px; font-style: italic;');
console.log('%c❤️ Nuestro primer mes juntos - 5 de noviembre, 2025 ❤️', 'color: #e63946; font-size: 12px;');
