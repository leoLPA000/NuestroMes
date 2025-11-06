/**
 * 📝 FORMULARIO DE NUEVOS MENSAJES
 * Sistema para que Rocío agregue sus propios mensajes románticos
 */

class FormularioMensajes {
    constructor() {
        this.init();
    }
    
    init() {
        this.crearBotonFormulario();
        this.crearModal();
        this.bindEventos();
        this.cargarMensajesGuardados();
    }
    
    crearBotonFormulario() {
        // Verificar si ya existe
        if (document.querySelector('.btn-formulario')) return;
        
        const boton = document.createElement('button');
        boton.className = 'btn-formulario';
        boton.innerHTML = `
            <span class="icono-formulario">✍️</span>
            <span class="texto-formulario">Agregar Mensaje</span>
        `;
        boton.title = 'Escribe tu propio mensaje romántico';
        
        document.body.appendChild(boton);
        
        boton.addEventListener('click', () => {
            this.abrirFormulario();
        });
    }
    
    crearModal() {
        const modal = document.createElement('div');
        modal.className = 'formulario-modal';
        modal.innerHTML = `
            <div class="formulario-overlay"></div>
            
            <div class="formulario-contenido">
                <button class="formulario-cerrar" title="Cerrar">✖️</button>
                
                <div class="formulario-header">
                    <h2 class="formulario-titulo">✍️ Escribe tu Mensaje</h2>
                    <p class="formulario-subtitulo">Agrega tus propias palabras de amor 💕</p>
                </div>
                
                <form class="formulario-form" id="formNuevoMensaje">
                    <div class="form-grupo">
                        <label for="categoriaSelect" class="form-label">
                            <span class="label-icono">📂</span>
                            Categoría:
                        </label>
                        <select id="categoriaSelect" name="categoria" required class="form-select">
                            <option value="">Elige una categoría...</option>
                            <option value="feliz">😄 Cuando estés feliz</option>
                            <option value="triste">😢 Cuando estés triste</option>
                            <option value="enojada">😤 Cuando estés enojada</option>
                            <option value="amor">❤️ Por qué te amo</option>
                            <option value="nostalgia">🌙 Cuando me extrañes</option>
                            <option value="motivacion">💪 Cuando necesites fuerza</option>
                        </select>
                    </div>
                    
                    <div class="form-grupo">
                        <label for="emojiSelect" class="form-label">
                            <span class="label-icono">😊</span>
                            Emoji (opcional):
                        </label>
                        <div class="emoji-selector">
                            <select id="emojiSelect" name="emoji" class="form-select">
                                <option value="">Sin emoji</option>
                                <option value="❤️">❤️ Corazón rojo</option>
                                <option value="💕">💕 Dos corazones</option>
                                <option value="💖">💖 Corazón brillante</option>
                                <option value="💝">💝 Corazón con lazo</option>
                                <option value="💗">💗 Corazón creciendo</option>
                                <option value="💓">💓 Corazón latiendo</option>
                                <option value="💞">💞 Corazones girando</option>
                                <option value="💘">💘 Corazón con flecha</option>
                                <option value="🌹">🌹 Rosa</option>
                                <option value="🌸">🌸 Flor</option>
                                <option value="✨">✨ Chispas</option>
                                <option value="⭐">⭐ Estrella</option>
                                <option value="🌟">🌟 Estrella brillante</option>
                                <option value="🦋">🦋 Mariposa</option>
                                <option value="🌈">🌈 Arcoíris</option>
                            </select>
                            <span class="emoji-preview" id="emojiPreview">❤️</span>
                        </div>
                    </div>
                    
                    <div class="form-grupo">
                        <label for="textoMensaje" class="form-label">
                            <span class="label-icono">💬</span>
                            Tu mensaje:
                        </label>
                        <textarea 
                            id="textoMensaje" 
                            name="texto" 
                            required 
                            class="form-textarea"
                            placeholder="Escribe aquí tu mensaje romántico..."
                            maxlength="500"
                            rows="5"
                        ></textarea>
                        <div class="caracteres-contador">
                            <span id="caracteresActuales">0</span> / 500 caracteres
                        </div>
                    </div>
                    
                    <div class="form-grupo">
                        <label for="notaMensaje" class="form-label">
                            <span class="label-icono">📝</span>
                            Nota especial (opcional):
                        </label>
                        <input 
                            type="text" 
                            id="notaMensaje" 
                            name="nota" 
                            class="form-input"
                            placeholder="Ej: Para cuando necesites ánimos..."
                            maxlength="100"
                        >
                    </div>
                    
                    <div class="form-grupo">
                        <label for="autorMensaje" class="form-label">
                            <span class="label-icono">👤</span>
                            Firma:
                        </label>
                        <input 
                            type="text" 
                            id="autorMensaje" 
                            name="autor" 
                            class="form-input"
                            placeholder="Tu nombre..."
                            maxlength="50"
                            value="Rocío"
                        >
                    </div>
                    
                    <div class="form-acciones">
                        <button type="button" class="btn-form btn-vista-previa">
                            👁️ Vista Previa
                        </button>
                        <button type="submit" class="btn-form btn-guardar">
                            💾 Guardar Mensaje
                        </button>
                    </div>
                </form>
                
                <div class="vista-previa-container" id="vistaPrevia" style="display:none;">
                    <h3 class="vista-previa-titulo">👁️ Vista Previa</h3>
                    <div class="mensaje-preview-card">
                        <div class="preview-emoji"></div>
                        <p class="preview-texto"></p>
                        <p class="preview-nota"></p>
                        <p class="preview-autor"></p>
                    </div>
                    <button type="button" class="btn-form btn-cerrar-preview">
                        Cerrar Vista Previa
                    </button>
                </div>
                
                <div class="mensajes-guardados-section">
                    <h3 class="seccion-titulo-guardados">
                        💾 Tus Mensajes Guardados 
                        <span class="contador-guardados" id="contadorGuardados">(0)</span>
                    </h3>
                    <div id="listaMensajesGuardados" class="lista-mensajes-guardados">
                        <p class="mensaje-vacio">Aún no has guardado ningún mensaje. ¡Escribe tu primero! 💕</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    bindEventos() {
        // Cerrar modal
        const btnCerrar = document.querySelector('.formulario-cerrar');
        const overlay = document.querySelector('.formulario-overlay');
        
        btnCerrar.addEventListener('click', () => this.cerrarFormulario());
        overlay.addEventListener('click', () => this.cerrarFormulario());
        
        // Preview de emoji
        const emojiSelect = document.getElementById('emojiSelect');
        const emojiPreview = document.getElementById('emojiPreview');
        
        emojiSelect.addEventListener('change', (e) => {
            emojiPreview.textContent = e.target.value || '❤️';
        });
        
        // Contador de caracteres
        const textoMensaje = document.getElementById('textoMensaje');
        const caracteresActuales = document.getElementById('caracteresActuales');
        
        textoMensaje.addEventListener('input', (e) => {
            caracteresActuales.textContent = e.target.value.length;
            
            // Cambiar color si está cerca del límite
            if (e.target.value.length > 450) {
                caracteresActuales.style.color = 'var(--rojo-amor)';
            } else {
                caracteresActuales.style.color = 'var(--morado-suave)';
            }
        });
        
        // Vista previa
        const btnVistaPrevia = document.querySelector('.btn-vista-previa');
        btnVistaPrevia.addEventListener('click', () => this.mostrarVistaPrevia());
        
        const btnCerrarPreview = document.querySelector('.btn-cerrar-preview');
        btnCerrarPreview.addEventListener('click', () => this.ocultarVistaPrevia());
        
        // Submit del formulario
        const form = document.getElementById('formNuevoMensaje');
        form.addEventListener('submit', (e) => this.guardarMensaje(e));
        
        // ESC para cerrar
        document.addEventListener('keydown', (e) => {
            const modal = document.querySelector('.formulario-modal');
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.cerrarFormulario();
            }
        });
    }
    
    abrirFormulario() {
        const modal = document.querySelector('.formulario-modal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus en primer campo
        setTimeout(() => {
            document.getElementById('categoriaSelect').focus();
        }, 300);
    }
    
    cerrarFormulario() {
        const modal = document.querySelector('.formulario-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Ocultar vista previa si está abierta
        this.ocultarVistaPrevia();
    }
    
    mostrarVistaPrevia() {
        const categoria = document.getElementById('categoriaSelect').value;
        const emoji = document.getElementById('emojiSelect').value || '❤️';
        const texto = document.getElementById('textoMensaje').value;
        const nota = document.getElementById('notaMensaje').value;
        const autor = document.getElementById('autorMensaje').value;
        
        if (!categoria || !texto.trim()) {
            this.mostrarNotificacion('Por favor completa al menos la categoría y el mensaje', 'warning');
            return;
        }
        
        // Actualizar preview
        document.querySelector('.preview-emoji').textContent = emoji;
        document.querySelector('.preview-texto').textContent = texto;
        document.querySelector('.preview-nota').textContent = nota ? `📝 ${nota}` : '';
        document.querySelector('.preview-autor').textContent = autor ? `— ${autor}` : '';
        
        // Mostrar container
        const vistaPrevia = document.getElementById('vistaPrevia');
        vistaPrevia.style.display = 'block';
        vistaPrevia.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    ocultarVistaPrevia() {
        document.getElementById('vistaPrevia').style.display = 'none';
    }
    
    guardarMensaje(e) {
        e.preventDefault();
        
        const categoria = document.getElementById('categoriaSelect').value;
        const emoji = document.getElementById('emojiSelect').value || '❤️';
        const texto = document.getElementById('textoMensaje').value.trim();
        const nota = document.getElementById('notaMensaje').value.trim();
        const autor = document.getElementById('autorMensaje').value.trim() || 'Rocío';
        
        if (!categoria || !texto) {
            this.mostrarNotificacion('Por favor completa los campos requeridos', 'error');
            return;
        }
        
        // Crear objeto mensaje
        const mensaje = {
            id: Date.now(),
            categoria: categoria,
            emoji: emoji,
            texto: texto,
            nota: nota,
            autor: autor,
            fecha: new Date().toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
        };
        
        // Obtener mensajes guardados
        let mensajesGuardados = JSON.parse(localStorage.getItem('mensajesPersonalizados') || '[]');
        
        // Agregar nuevo mensaje
        mensajesGuardados.push(mensaje);
        
        // Guardar en localStorage
        localStorage.setItem('mensajesPersonalizados', JSON.stringify(mensajesGuardados));
        
        // Mostrar notificación de éxito
        this.mostrarNotificacion('¡Mensaje guardado con éxito! 💕', 'success');
        
        // Limpiar formulario
        document.getElementById('formNuevoMensaje').reset();
        document.getElementById('caracteresActuales').textContent = '0';
        document.getElementById('emojiPreview').textContent = '❤️';
        
        // Ocultar vista previa
        this.ocultarVistaPrevia();
        
        // Recargar lista de mensajes guardados
        this.cargarMensajesGuardados();
        
        // Crear explosión de corazones
        this.crearExplosionExito();
    }
    
    cargarMensajesGuardados() {
        const mensajesGuardados = JSON.parse(localStorage.getItem('mensajesPersonalizados') || '[]');
        const lista = document.getElementById('listaMensajesGuardados');
        const contador = document.getElementById('contadorGuardados');
        
        contador.textContent = `(${mensajesGuardados.length})`;
        
        if (mensajesGuardados.length === 0) {
            lista.innerHTML = '<p class="mensaje-vacio">Aún no has guardado ningún mensaje. ¡Escribe tu primero! 💕</p>';
            return;
        }
        
        // Ordenar por fecha (más recientes primero)
        mensajesGuardados.sort((a, b) => b.id - a.id);
        
        lista.innerHTML = mensajesGuardados.map(mensaje => `
            <div class="mensaje-guardado-card" data-id="${mensaje.id}">
                <div class="mensaje-guardado-header">
                    <span class="mensaje-emoji">${mensaje.emoji}</span>
                    <span class="mensaje-categoria-badge">${this.getCategoriaTexto(mensaje.categoria)}</span>
                    <button class="btn-eliminar-mensaje" data-id="${mensaje.id}" title="Eliminar">🗑️</button>
                </div>
                <p class="mensaje-guardado-texto">${mensaje.texto}</p>
                ${mensaje.nota ? `<p class="mensaje-guardado-nota">📝 ${mensaje.nota}</p>` : ''}
                <div class="mensaje-guardado-footer">
                    <span class="mensaje-autor">— ${mensaje.autor}</span>
                    <span class="mensaje-fecha">${mensaje.fecha}</span>
                </div>
            </div>
        `).join('');
        
        // Bind eventos de eliminación
        document.querySelectorAll('.btn-eliminar-mensaje').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                this.eliminarMensaje(id);
            });
        });
    }
    
    getCategoriaTexto(categoria) {
        const categorias = {
            'feliz': '😄 Feliz',
            'triste': '😢 Triste',
            'enojada': '😤 Enojada',
            'amor': '❤️ Amor',
            'nostalgia': '🌙 Nostalgia',
            'motivacion': '💪 Motivación'
        };
        return categorias[categoria] || categoria;
    }
    
    eliminarMensaje(id) {
        if (!confirm('¿Estás segura de que quieres eliminar este mensaje?')) {
            return;
        }
        
        let mensajesGuardados = JSON.parse(localStorage.getItem('mensajesPersonalizados') || '[]');
        mensajesGuardados = mensajesGuardados.filter(m => m.id !== id);
        localStorage.setItem('mensajesPersonalizados', JSON.stringify(mensajesGuardados));
        
        this.mostrarNotificacion('Mensaje eliminado', 'info');
        this.cargarMensajesGuardados();
    }
    
    mostrarNotificacion(mensaje, tipo = 'info') {
        // Eliminar notificaciones anteriores
        const anterior = document.querySelector('.notificacion-toast');
        if (anterior) anterior.remove();
        
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion-toast notificacion-${tipo}`;
        
        const iconos = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
        };
        
        notificacion.innerHTML = `
            <span class="notificacion-icono">${iconos[tipo]}</span>
            <span class="notificacion-texto">${mensaje}</span>
        `;
        
        document.body.appendChild(notificacion);
        
        // Animación de entrada
        setTimeout(() => notificacion.classList.add('show'), 100);
        
        // Auto-cerrar después de 3 segundos
        setTimeout(() => {
            notificacion.classList.remove('show');
            setTimeout(() => notificacion.remove(), 300);
        }, 3000);
    }
    
    crearExplosionExito() {
        const numCorazones = 15;
        const contenedor = document.body;
        
        for (let i = 0; i < numCorazones; i++) {
            const corazon = document.createElement('div');
            corazon.className = 'corazon-explosion';
            corazon.textContent = ['❤️', '💕', '💖', '💝'][Math.floor(Math.random() * 4)];
            
            const angulo = (360 / numCorazones) * i;
            const radio = 150;
            
            corazon.style.left = '50%';
            corazon.style.top = '50%';
            corazon.style.setProperty('--angulo', `${angulo}deg`);
            corazon.style.setProperty('--distancia', `${radio}px`);
            corazon.style.animationDelay = `${i * 0.05}s`;
            
            contenedor.appendChild(corazon);
            
            setTimeout(() => corazon.remove(), 2000);
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new FormularioMensajes();
});
