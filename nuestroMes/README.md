# 💕 NuestroMes - Página Web Romántica

## 🎯 Descripción
**NuestroMes** es una página web romántica e interactiva creada como regalo digital para celebrar el primer mes de relación con Rocío. El sitio presenta mensajes personalizados clasificados por emociones, con animaciones suaves y un diseño romántico.

---

## ✨ Características

- 🌹 **6 categorías emocionales**: Feliz, Triste, Enojada, Amor, Nostalgia y Motivación
- 💌 **Mensajes personalizados**: Más de 40 mensajes románticos en español
- 🎨 **Diseño romántico**: Colores rojo (#e63946) y morado (#8e44ad)
- ✨ **Animaciones suaves**: Corazones flotantes, pétalos cayendo, efectos hover
- 📱 **Responsive**: Optimizado para móvil y escritorio
- 🎭 **Interactivo**: Botón de mensaje sorpresa, efectos al hacer clic

---

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: PHP 7.4+ (para lectura dinámica de mensajes)
- **Datos**: JSON (sin base de datos)
- **Tipografías**: Dancing Script, Great Vibes (Google Fonts)

---

## 📂 Estructura del Proyecto

```
NuestroMes/
│
├── index.php              → Portada principal con categorías
├── mensajes.php           → Muestra mensajes por categoría
│
├── css/
│   └── estilos.css        → Estilos, animaciones y responsive
│
├── js/
│   └── efectos.js         → Animaciones e interactividad
│
├── data/
│   └── mensajes.json      → Mensajes clasificados por emoción
│
├── img/                   → Imágenes (rosa, corazón, fondo)
│
└── README.md              → Este archivo
```

---

## 🚀 Instalación Local

### Requisitos
- PHP 7.4 o superior
- Servidor local (XAMPP, WAMP, MAMP, o similar)

### Pasos

1. **Clona o descarga el proyecto**:
   ```bash
   git clone https://github.com/leoLPA000/NuestroMes.git
   ```

2. **Mueve la carpeta al directorio de tu servidor**:
   - **XAMPP**: `C:\xampp\htdocs\nuestroMes\`
   - **WAMP**: `C:\wamp64\www\nuestroMes\`
   - **MAMP**: `/Applications/MAMP/htdocs/nuestroMes/`

3. **Inicia tu servidor local**:
   - Abre XAMPP/WAMP/MAMP y arranca Apache

4. **Accede en tu navegador**:
   ```
   http://localhost/nuestroMes/
   ```

---

## 🌐 Despliegue en Hosting

### Opción 1: Hosting con PHP (Recomendado)
Proveedores sugeridos: **InfinityFree**, **000webhost**, **Hostinger**, **SiteGround**

1. Sube todos los archivos vía FTP o panel de control
2. Asegúrate de que la estructura de carpetas se mantenga
3. Verifica que PHP esté habilitado (versión 7.4+)
4. Accede a tu dominio: `https://tudominio.com/`

### Opción 2: GitHub Pages (Conversión a HTML estático)
⚠️ **Nota**: GitHub Pages no soporta PHP. Necesitas convertir `index.php` y `mensajes.php` a HTML estático con JavaScript.

**Alternativa rápida**:
1. Usa `index.html` en lugar de `index.php`
2. Carga `mensajes.json` con `fetch()` en JavaScript
3. Genera páginas estáticas para cada categoría

---

## 🎨 Personalización

### Cambiar nombre de tu novia
Edita los siguientes archivos:

**`index.php`** (líneas 10, 17, 51):
```php
<title>NuestroMes ❤️ Para [NOMBRE]</title>
<h1 class="titulo-principal">Para ti, [NOMBRE] ❤️</h1>
<p>Con todo mi amor para [NOMBRE COMPLETO] 💕</p>
```

**`mensajes.php`** (líneas 46, 51):
```php
<title><?php echo $tituloCategoria; ?> - Para [NOMBRE]</title>
<p class="dedicatoria">Para mi [NOMBRE] hermosa 💕</p>
```

### Agregar más mensajes
Edita `data/mensajes.json` y añade más objetos al array de cada categoría:

```json
{
  "texto": "Tu nuevo mensaje aquí...",
  "emoji": "💕",
  "nota": "Una nota opcional"
}
```

### Cambiar colores
Edita `css/estilos.css` (líneas 5-12):

```css
:root {
    --rojo-amor: #TU_COLOR_ROJO;
    --morado-suave: #TU_COLOR_MORADO;
    --blanco-suave: #TU_COLOR_FONDO;
}
```

### Agregar imágenes
Coloca tus imágenes en la carpeta `img/` y referencialas en el CSS o HTML:

```css
body {
    background-image: url('../img/fondo.jpg');
}
```

---

## 📱 Pruebas

### Probar en móvil (misma red Wi-Fi)
1. Encuentra tu IP local:
   - **Windows**: `ipconfig` en CMD → busca "IPv4"
   - **Mac/Linux**: `ifconfig` en Terminal → busca "inet"

2. En tu móvil, accede a:
   ```
   http://TU_IP_LOCAL/nuestroMes/
   ```
   Ejemplo: `http://192.168.1.5/nuestroMes/`

---

## 🐛 Solución de Problemas

### Problema: Página en blanco
- **Solución**: Verifica que Apache esté corriendo y que PHP esté habilitado

### Problema: No se cargan los mensajes
- **Solución**: Verifica que `data/mensajes.json` existe y tiene formato JSON válido
- **Herramienta**: Usa [JSONLint](https://jsonlint.com/) para validar

### Problema: Animaciones no funcionan
- **Solución**: Verifica que `js/efectos.js` esté enlazado correctamente
- **Consola**: Abre DevTools (F12) y revisa errores en la pestaña Console

### Problema: Estilos no se aplican
- **Solución**: 
  - Verifica la ruta de `css/estilos.css`
  - Limpia caché del navegador (Ctrl + Shift + R)
  - Verifica que Google Fonts cargue correctamente

---

## 💡 Mejoras Futuras (Opcionales)

- [ ] 🎵 Agregar música de fondo (con control de play/pause)
- [ ] 📥 Botón para descargar carta en PDF
- [ ] 🔐 Sistema de login simple para privacidad
- [ ] 📝 Formulario para añadir nuevos mensajes
- [ ] 🌍 Modo multiidioma (español/inglés)
- [ ] 📊 Contador de días juntos (actualizable)
- [ ] 🎁 Sección de galería de fotos

---

## 👨‍💻 Autor

Creado con ❤️ por **Leo** para **Rocío Milagros Fernández**

- **GitHub**: [@leoLPA000](https://github.com/leoLPA000)
- **Proyecto**: NuestroMes
- **Fecha**: 5 de noviembre, 2025

---

## 📜 Licencia

Este proyecto es de uso personal. Si deseas usarlo como base para tu propio proyecto romántico, siéntete libre de hacerlo. Solo recuerda personalizarlo con tus propios mensajes. 💕

---

## 💬 Mensaje Final

> *"El amor no se mide en días, sino en momentos. Este es nuestro primer mes, pero el inicio de toda una vida juntos."*
>
> — Para Rocío, con todo mi amor 🌹

---

## 📞 Soporte

Si tienes dudas o encuentras algún problema, abre un **Issue** en GitHub o contacta directamente.

**¡Disfruta tu regalo digital, Rocío!** 💕✨
