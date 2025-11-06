/**
 * 📸 GALERÍA DE FOTOS ROMÁNTICA
 * Lightbox con carrusel y efectos suaves
 */

class GaleriaRomantica {
    constructor() {
        this.currentIndex = 0;
        this.fotosBase = [
            {
                src: 'galeria/foto1.jpg',
                titulo: 'Nuestro Primer Momento',
                fecha: '8 de octubre, 2025',
                descripcion: 'El día que todo comenzó 💕',
                tipo: 'base'
            },
            {
                src: 'galeria/foto2.jpg',
                titulo: 'Juntos',
                fecha: 'Octubre 2025',
                descripcion: 'Cada momento a tu lado es especial 🌹',
                tipo: 'base'
            },
            {
                src: 'galeria/foto3.jpg',
                titulo: 'Felicidad',
                fecha: 'Octubre 2025',
                descripcion: 'Tu sonrisa ilumina mi mundo ✨',
                tipo: 'base'
            },
            {
                src: 'galeria/foto4.jpg',
                titulo: 'Amor',
                fecha: 'Noviembre 2025',
                descripcion: 'Contigo todo es mejor 💝',
                tipo: 'base'
            }
        ];
        
        this.fotos = [];
        // Cargar fotos desde Supabase (si está disponible) y luego inicializar
        this.cargarFotos().then(() => this.init());
    }
    
    async cargarFotos() {
        // Intentar cargar fotos personalizadas desde Supabase
        try {
            if (window.supabaseClient) {
                const { data, error } = await window.supabaseClient
                    .from('fotos')
                    .select('*')
                    .order('creado_en', { ascending: true });

                if (error) throw error;

                const fotosPersonalizadas = (data || []).map(f => ({
                    src: f.url,
                    titulo: f.titulo,
                    fecha: new Date(f.creado_en).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
                    descripcion: f.descripcion || '',
                    tipo: 'personalizada',
                    id: f.id,
                    path: f.path || null
                }));

                this.fotos = [...this.fotosBase, ...fotosPersonalizadas];
                return;
            }
        } catch (err) {
            console.warn('Error cargando fotos desde Supabase:', err);
        }

        // Fallback localStorage (si Supabase no está disponible)
        const fotosPersonalizadasLocal = JSON.parse(localStorage.getItem('fotosPersonalizadas') || '[]');
        this.fotos = [...this.fotosBase, ...fotosPersonalizadasLocal];
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
        
        // Crear botón de administración de fotos
        const botonAdmin = document.createElement('button');
        botonAdmin.className = 'btn-admin-galeria';
        botonAdmin.innerHTML = `
            <span class="icono-admin">➕</span>
        `;
        botonAdmin.title = 'Agregar nueva foto';
        
        document.body.appendChild(botonAdmin);
        
        botonAdmin.addEventListener('click', () => {
            this.abrirFormularioFoto();
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
                        <button class="btn-eliminar-foto" style="display:none;" title="Eliminar esta foto">🗑️ Eliminar</button>
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
        
        // Mostrar/ocultar botón eliminar (solo para fotos personalizadas)
        const btnEliminar = document.querySelector('.btn-eliminar-foto');
        if (foto.tipo === 'personalizada') {
            btnEliminar.style.display = 'block';
            btnEliminar.onclick = () => this.eliminarFoto(foto.id);
        } else {
            btnEliminar.style.display = 'none';
        }
        
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
    
    abrirFormularioFoto() {
        // Crear modal de formulario
        const modal = document.createElement('div');
        modal.className = 'modal-formulario-foto';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-contenido-foto">
                <h2>📸 Agregar Nueva Foto</h2>
                <p class="subtitulo-modal">Sube una foto especial de nosotros</p>
                
                <form id="formNuevaFoto" class="form-nueva-foto">
                    <div class="form-grupo">
                        <label for="inputFoto">Seleccionar imagen:</label>
                        <input type="file" id="inputFoto" accept="image/*" required>
                        <div class="preview-container">
                            <img id="previewFoto" src="" alt="Vista previa" style="display:none">
                        </div>
                    </div>
                    
                    <div class="form-grupo">
                        <label for="tituloFoto">Título:</label>
                        <input type="text" id="tituloFoto" placeholder="Ej: Un día especial" maxlength="50" required>
                    </div>
                    
                    <div class="form-grupo">
                        <label for="fechaFoto">Fecha:</label>
                        <input type="text" id="fechaFoto" placeholder="Ej: Octubre 2025" maxlength="30" required>
                    </div>
                    
                    <div class="form-grupo">
                        <label for="descripcionFoto">Descripción:</label>
                        <textarea id="descripcionFoto" placeholder="Una breve descripción..." maxlength="150" required></textarea>
                    </div>
                    
                    <div class="form-botones">
                        <button type="submit" class="btn-guardar-foto">💾 Guardar Foto</button>
                        <button type="button" class="btn-cancelar-foto">❌ Cancelar</button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Preview de imagen
        const inputFoto = document.getElementById('inputFoto');
        const previewFoto = document.getElementById('previewFoto');
        
        inputFoto.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    previewFoto.src = event.target.result;
                    previewFoto.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Guardar foto
        document.getElementById('formNuevaFoto').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const file = inputFoto.files[0];
            if (!file) return;
            
            const titulo = document.getElementById('tituloFoto').value;
            const fecha = document.getElementById('fechaFoto').value;
            const descripcion = document.getElementById('descripcionFoto').value;

            try {
                if (!window.supabaseClient) throw new Error('Supabase no inicializado');

                // Generar path seguro
                const timestamp = Date.now();
                const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
                const path = `fotos/${timestamp}_${safeName}`;

                // Subir archivo
                const { data: uploadData, error: uploadError } = await window.supabaseClient
                    .storage
                    .from('archivos')
                    .upload(path, file, { upsert: true });

                if (uploadError) throw uploadError;

                // Obtener URL pública
                const { data: publicUrlData } = window.supabaseClient
                    .storage
                    .from('archivos')
                    .getPublicUrl(path);

                const publicURL = publicUrlData?.publicUrl || '';

                // Insertar metadatos en la tabla fotos
                const { data: insertData, error: insertError } = await window.supabaseClient
                    .from('fotos')
                    .insert([{ titulo, descripcion, url: publicURL, tipo: 'foto', path }])
                    .select();

                if (insertError) throw insertError;

                modal.remove();
                this.mostrarNotificacion('¡Foto agregada exitosamente! 📸💕', 'success');

                // Recargar fotos desde Supabase
                await this.cargarFotos();
                
                // Actualizar la galería si está abierta
                this.actualizarGaleria();
            } catch (err) {
                console.error('Error al subir/guardar foto:', err);
                
                // Fallback: guardar en localStorage con Base64
                const reader = new FileReader();
                reader.onload = (event) => {
                    const nuevaFoto = {
                        src: event.target.result, // Base64 de la imagen
                        titulo: titulo,
                        fecha: fecha,
                        descripcion: descripcion,
                        tipo: 'personalizada',
                        id: Date.now()
                    };
                    
                    this.guardarFotoLocalStorage(nuevaFoto);
                    modal.remove();
                    this.mostrarNotificacion('Foto guardada localmente (sin conexión) 📸', 'info');
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Cancelar
        modal.querySelector('.btn-cancelar-foto').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.remove();
        });
        
        // Animación de entrada
        setTimeout(() => modal.classList.add('active'), 10);
    }
    
    guardarFotoLocalStorage(foto) {
        // Guardar en localStorage como fallback
        const fotosPersonalizadas = JSON.parse(localStorage.getItem('fotosPersonalizadas') || '[]');
        fotosPersonalizadas.push(foto);
        localStorage.setItem('fotosPersonalizadas', JSON.stringify(fotosPersonalizadas));
        this.cargarFotos();
        this.actualizarGaleria();
    }
    
    async eliminarFoto(id) {
        if (!confirm('¿Estás seguro de eliminar esta foto? 🗑️')) return;

        try {
            // Buscar la foto en la lista actual para obtener path/url
            const foto = this.fotos.find(f => String(f.id) === String(id));

            // Si hay Supabase, eliminar registro y archivo
            if (window.supabaseClient) {
                // Eliminar registro de la tabla
                const { error: delError } = await window.supabaseClient.from('fotos').delete().eq('id', id);
                if (delError) console.warn('Error eliminando registro en Supabase:', delError);

                // Eliminar archivo del storage si tenemos el path
                const path = foto?.path || (foto?.src ? (foto.src.split('/archivos/')[1] || null) : null);
                if (path) {
                    const { error: rmError } = await window.supabaseClient.storage.from('archivos').remove([path]);
                    if (rmError) console.warn('Error eliminando archivo en Storage:', rmError);
                }
            } else {
                // Fallback: eliminar de localStorage
                const fotosPersonalizadas = JSON.parse(localStorage.getItem('fotosPersonalizadas') || '[]');
                const fotosFiltradas = fotosPersonalizadas.filter(f => String(f.id) !== String(id));
                localStorage.setItem('fotosPersonalizadas', JSON.stringify(fotosFiltradas));
            }

            // Recargar fotos
            await this.cargarFotos();

            // Cerrar modal si está abierto
            this.cerrar();
            
            // Actualizar galería
            this.actualizarGaleria();
            
            this.mostrarNotificacion('Foto eliminada correctamente 🗑️', 'info');
        } catch (err) {
            console.error('Error al eliminar foto:', err);
            this.mostrarNotificacion('Error al eliminar la foto', 'info');
        }
    }
    
    actualizarGaleria() {
        // Actualizar thumbnails si la galería está abierta
        const thumbnailsContainer = document.querySelector('.galeria-thumbnails');
        if (thumbnailsContainer) {
            thumbnailsContainer.innerHTML = this.fotos.map((foto, index) => `
                <div class="thumbnail ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <img src="${foto.src}" alt="${foto.titulo}" onerror="this.src='img/placeholder.jpg'">
                </div>
            `).join('');
            
            // Re-bind eventos de thumbnails
            document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
                thumb.addEventListener('click', () => this.irAFoto(index));
            });
            
            // Actualizar contador total
            const contadorTotal = document.querySelector('.contador-total');
            if (contadorTotal) {
                contadorTotal.textContent = this.fotos.length;
            }
        }
    }
    
    mostrarNotificacion(mensaje, tipo) {
        const notif = document.createElement('div');
        notif.className = `notificacion-foto ${tipo}`;
        notif.textContent = mensaje;
        
        document.body.appendChild(notif);
        
        setTimeout(() => notif.classList.add('show'), 10);
        
        setTimeout(() => {
            notif.classList.remove('show');
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new GaleriaRomantica();
});
