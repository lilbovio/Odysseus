# Odysseus · Acompañante de Estudio Universitario

Odysseus es una plataforma web de estudio y retención espaciada (algoritmo FSRS) diseñada para estudiantes universitarios. Integra gestión de materias, sesiones diarias de repaso activo, simuladores de exámenes con citas verificadas a apuntes y un agente de consulta contextual con límites estrictos de fuente.

---

## 🎨 Sistema de Diseño (Tokens, Claymorphism & Glassmorphism)

- **Cero Gradientes**: El volumen y la profundidad se construyen exclusivamente mediante sombras físicas multidireccionales (`box-shadow`), biseles internos (`inset`) y refracción sobre discos planos sólidos posicionados detrás de los paneles de vidrio esmerilado.
- **Paleta de Colores (Strictly Flat Solid)**:
  - Base de lienzo: `#111418` (deep matte canvas)
  - Base de arcilla (Clay): `#20252B` / `#1D2024`
  - Primario (Mint): `#7BFDD3` / `#5CE0B8`
  - Secundario (Amber): `#F4BE4E` / `#FFC857`
  - Terciario / Alertas (Coral): `#FF8A6B` / `#FFBAA8`
  - Materias: Derecho (`#5CE0B8`), Salud (`#F4BE4E`), Economía (`#6DB8F2`), Tecnología (`#B8E06A`), Arte (`#F28DAE`)
- **Tipografía**:
  - Títulos y destacados: `Bricolage Grotesque` (peso 600)
  - Cuerpo de lectura e interfaz: `Manrope` (pesos 400, 500, 600)
  - Código, citas, porcentajes y metadatos: `JetBrains Mono`
- **Iconografía**: `Material Symbols Outlined` (Google Fonts).

---

## 📱 Responsividad Unificada

Un solo código base responsivo:
- **Escritorio ($\ge 1024\text{px}$)**: Barra lateral fija de vidrio esmerilado (`width: 240px`), cuadrícula de 12 columnas (`max-w-[1380px]`), barra flotante de consulta contextual y acceso a perfil en cabecera.
- **Móvil ($< 768\text{px}$)**: Cabecera compacta con marca e isotipo, barra de navegación inferior de vidrio esmerilado con pestañas principales (`Hoy`, `Materias`, `Preguntar`, `Estudiar`), controles adaptados a pantalla táctil ($\ge 44\text{px}$).

---

## 📂 Estructura del Proyecto

```
/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx         # Shell responsivo con refracción de fondo
│   │   │   ├── Sidebar.tsx           # Barra lateral fija de vidrio (desktop)
│   │   │   ├── BottomTabBar.tsx      # Barra inferior de vidrio (móvil)
│   │   │   ├── Header.tsx            # Cabecera compartida
│   │   │   └── FloatingQueryBar.tsx  # Píldora flotante para dudas rápidas
│   │   └── ui/
│   │       ├── CircularProgress.tsx  # Medidores circulares SVG
│   │       ├── ClayButton.tsx        # Botones táctiles volumétricos
│   │       ├── ClayCard.tsx          # Tarjetas arcillosas con relieve
│   │       ├── ClayChip.tsx          # Píldoras y filtros interactivos
│   │       ├── Icon.tsx              # Wrapper para Material Symbols
│   │       └── SourceModal.tsx       # Visor modal de citas documentales
│   ├── context/
│   │   └── AuthContext.tsx           # Abstracción de autenticación (listo para Amazon Cognito)
│   ├── design-tokens/
│   │   └── tokens.ts                 # Constantes de colores, radios y sombras
│   ├── features/
│   │   ├── hoy/                      # Dashboard principal (repaso diario, entregas, actividad)
│   │   ├── materias/                 # Catálogo de materias, métricas y detalle (/materias/:id)
│   │   ├── preguntar/                # Chat con verificación de citas y límites de fuente
│   │   ├── estudiar/                 # Hub de modos y simulador de quiz interactivo
│   │   ├── clases/                   # Alta de nueva asignatura e indexación de temario
│   │   ├── yo/                       # Perfil del alumno, sincronización con Classroom y FSRS
│   │   └── onboarding/               # Flujo inicial de calibración de carrera y ciclo
│   ├── hooks/
│   │   └── useOdysseusData.ts        # Hooks de React Query con tipado estricto
│   ├── locales/
│   │   └── es-MX.ts                  # Centralización de todos los textos en español (México)
│   ├── services/
│   │   ├── types.ts                  # Contratos de TypeScript de la API
│   │   ├── documents.service.ts      # Servicio de documentos indexados
│   │   ├── study.service.ts          # Servicio de repasos, materias y quizzes
│   │   ├── sessions.service.ts       # Servicio de entregas y actividad
│   │   ├── agent.service.ts          # Servicio de consultas con citas documentales
│   │   ├── integrations.service.ts   # Servicio de sincronización con Google Classroom
│   │   ├── profile.service.ts        # Servicio de perfil de usuario y racha
│   │   └── index.ts                  # Cliente API unificado (`api`)
│   ├── App.tsx                       # Configuración de React Router y TanStack Query
│   ├── index.css                     # Tailwind v4, variables de tema y clases de arcilla
│   └── main.tsx                      # Punto de entrada de React
```

---

## ⚡ Capa de Datos Desacoplada

Los componentes **nunca** consumen datos mock directamente. Todas las interacciones se realizan a través de hooks de **TanStack Query** (`useDailyReview`, `useSubjects`, `useQuizQuestion`, etc.), los cuales llaman a interfaces en `/services`:

```ts
import { useDailyReview } from '@/hooks/useOdysseusData';

export const MyComponent = () => {
  const { data: review, isLoading } = useDailyReview();
  // ...
};
```

Para conectar el backend real (AWS API Gateway + DynamoDB + S3 + Amazon Cognito), solo se requiere reemplazar la implementación de cada interfaz en `/services/*.service.ts` con llamadas `fetch` o `axios` firmadas con el JWT de Cognito, sin alterar ningún componente de interfaz.

---

## 🚀 Cómo Ejecutar la Aplicación

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   El servidor se abrirá en `http://localhost:3000`.

3. **Verificar tipos y compilar para producción**:
   ```bash
   npm run build
   ```

---

## 🗺️ Rutas Disponibles

| Ruta | Descripción |
| :--- | :--- |
| `/hoy` | Dashboard de inicio: constancia semanal, repaso del día, entregas próximas sincronizadas con Classroom y actividad reciente. |
| `/materias` | Vista general de asignaturas activas con medidores de dominio circular, filtros por área, búsqueda y sugerencias. |
| `/materias/:id` | Detalle de la materia: temario por unidades, documentos indexados y visor de extractos. |
| `/preguntar` | Asistente de consulta contextual con modo estricto ("Solo mis materiales"), detección de límites de fuente e inspección de citas en panel lateral. |
| `/estudiar` | Hub de estudio: Repaso del día, Quiz de un tema, Simulacro de examen y temas débiles. |
| `/estudiar/quiz` | Interfaz de preguntas interactivas con feedback conceptual inmediato, descarte de opciones y verificación de confianza. |
| `/clases/nueva` | Formulario para dar de alta una materia y subir programa analítico (PDF). |
| `/yo` | Perfil del estudiante, métricas de retención, estado de sincronización con Google Classroom y parámetros del algoritmo FSRS. |
| `/onboarding` | Calibración de bienvenida para nuevo ciclo escolar. |
