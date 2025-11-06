-- ==============================================================================
-- SUPABASE SETUP SQL - NuestroMes (Configuración temporal para pruebas sin auth)
-- ==============================================================================
-- ADVERTENCIA: Estas políticas son ABIERTAS y permiten acceso anónimo.
-- Solo para desarrollo/pruebas. Para producción debes implementar autenticación.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. TABLA: canciones (ya existe, añadir columnas owner y publico si faltan)
-- ------------------------------------------------------------------------------
ALTER TABLE public.canciones
ADD COLUMN IF NOT EXISTS owner uuid DEFAULT NULL,
ADD COLUMN IF NOT EXISTS publico boolean DEFAULT TRUE;

-- Habilitar RLS en canciones
ALTER TABLE public.canciones ENABLE ROW LEVEL SECURITY;

-- Política temporal: permitir SELECT a todos (anónimos)
DROP POLICY IF EXISTS canciones_select_all ON public.canciones;
CREATE POLICY canciones_select_all ON public.canciones
  FOR SELECT
  USING (true);

-- Política temporal: permitir INSERT a todos (anónimos) - SOLO PARA PRUEBAS
DROP POLICY IF EXISTS canciones_insert_temp ON public.canciones;
CREATE POLICY canciones_insert_temp ON public.canciones
  FOR INSERT
  WITH CHECK (true);

-- Política temporal: permitir DELETE a todos (anónimos) - SOLO PARA PRUEBAS
DROP POLICY IF EXISTS canciones_delete_temp ON public.canciones;
CREATE POLICY canciones_delete_temp ON public.canciones
  FOR DELETE
  USING (true);

-- Política temporal: permitir UPDATE a todos (anónimos) - SOLO PARA PRUEBAS
DROP POLICY IF EXISTS canciones_update_temp ON public.canciones;
CREATE POLICY canciones_update_temp ON public.canciones
  FOR UPDATE
  USING (true);

-- ------------------------------------------------------------------------------
-- 2. TABLA: fotos (metadata de imágenes)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fotos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text,
  descripcion text,
  url text NOT NULL,            -- URL pública del archivo en Storage
  path text NOT NULL,           -- Path dentro del bucket (ej: 'fotos/2025-11-06_imagen.jpg')
  tipo text DEFAULT 'foto',     -- Tipo de contenido
  owner uuid,                   -- ID del usuario (null si anónimo)
  publico boolean DEFAULT TRUE, -- Si es público o privado
  creado_en timestamptz DEFAULT now()
);

-- Habilitar RLS en fotos
ALTER TABLE public.fotos ENABLE ROW LEVEL SECURITY;

-- Política temporal: permitir SELECT a todos
DROP POLICY IF EXISTS fotos_select_all ON public.fotos;
CREATE POLICY fotos_select_all ON public.fotos
  FOR SELECT
  USING (true);

-- Política temporal: permitir INSERT a todos - SOLO PARA PRUEBAS
DROP POLICY IF EXISTS fotos_insert_temp ON public.fotos;
CREATE POLICY fotos_insert_temp ON public.fotos
  FOR INSERT
  WITH CHECK (true);

-- Política temporal: permitir DELETE a todos - SOLO PARA PRUEBAS
DROP POLICY IF EXISTS fotos_delete_temp ON public.fotos;
CREATE POLICY fotos_delete_temp ON public.fotos
  FOR DELETE
  USING (true);

-- Política temporal: permitir UPDATE a todos - SOLO PARA PRUEBAS
DROP POLICY IF EXISTS fotos_update_temp ON public.fotos;
CREATE POLICY fotos_update_temp ON public.fotos
  FOR UPDATE
  USING (true);

-- ------------------------------------------------------------------------------
-- 3. TABLA: mensajes (mensajes de texto entre usuarios)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.mensajes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  autor uuid,                    -- ID del usuario que escribió (null si anónimo)
  texto text NOT NULL,
  privado boolean DEFAULT FALSE, -- Si es privado (solo visible para el autor)
  referencia_tipo text,          -- Opcional: 'foto' | 'cancion' para enlazar media
  referencia_id uuid,            -- Opcional: ID de la foto o canción relacionada
  creado_en timestamptz DEFAULT now()
);

-- Habilitar RLS en mensajes
ALTER TABLE public.mensajes ENABLE ROW LEVEL SECURITY;

-- Política temporal: permitir SELECT a todos
DROP POLICY IF EXISTS mensajes_select_all ON public.mensajes;
CREATE POLICY mensajes_select_all ON public.mensajes
  FOR SELECT
  USING (true);

-- Política temporal: permitir INSERT a todos - SOLO PARA PRUEBAS
DROP POLICY IF EXISTS mensajes_insert_temp ON public.mensajes;
CREATE POLICY mensajes_insert_temp ON public.mensajes
  FOR INSERT
  WITH CHECK (true);

-- Política temporal: permitir DELETE a todos - SOLO PARA PRUEBAS
DROP POLICY IF EXISTS mensajes_delete_temp ON public.mensajes;
CREATE POLICY mensajes_delete_temp ON public.mensajes
  FOR DELETE
  USING (true);

-- Política temporal: permitir UPDATE a todos - SOLO PARA PRUEBAS
DROP POLICY IF EXISTS mensajes_update_temp ON public.mensajes;
CREATE POLICY mensajes_update_temp ON public.mensajes
  FOR UPDATE
  USING (true);

-- ------------------------------------------------------------------------------
-- 4. ÍNDICES (mejoran performance de consultas)
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_fotos_owner ON public.fotos(owner);
CREATE INDEX IF NOT EXISTS idx_fotos_creado_en ON public.fotos(creado_en DESC);

CREATE INDEX IF NOT EXISTS idx_canciones_owner ON public.canciones(owner);
CREATE INDEX IF NOT EXISTS idx_canciones_creado_en ON public.canciones(creado_en DESC);

CREATE INDEX IF NOT EXISTS idx_mensajes_autor ON public.mensajes(autor);
CREATE INDEX IF NOT EXISTS idx_mensajes_creado_en ON public.mensajes(creado_en DESC);
CREATE INDEX IF NOT EXISTS idx_mensajes_referencia ON public.mensajes(referencia_tipo, referencia_id);

-- ==============================================================================
-- FIN DEL SCRIPT
-- ==============================================================================
-- NOTA IMPORTANTE:
-- Las políticas de Storage (storage.objects) NO se pueden crear aquí si no eres
-- owner de la tabla. Debes crearlas desde la UI de Supabase:
-- Storage → Buckets → archivos → Configuration → Policies
-- 
-- Consulta el archivo SUPABASE-STORAGE-POLICIES.md para los pasos detallados.
-- ==============================================================================
