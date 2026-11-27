# M10.2. JSX con React — Proyecto de Demostración para el Aula

**Alumno:** Aarón Hernández Moreno · 2º DAM · Desarrollo de Interfaces

**Aplicación desplegada en Vercel:** https://m102jsxreactdemo.vercel.app/

**Repositorio:** https://github.com/aaronhernandez20/M10_2_JSX_React_Demo

Proyecto educativo en **React 18 + Vite** diseñado para explicar paso a paso todas las características de **JSX (JavaScript XML)** directamente desde Visual Studio Code.

## Puesta en marcha rápida (3 pasos)

1. Abre esta carpeta en **Visual Studio Code**.
2. Abre una terminal integrada (`Ctrl + ñ` o `Ctrl + \``) y ejecuta:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Se abrirá automáticamente en `http://localhost:5173`.

## Guion sugerido para la exposición en clase

Cada pestaña de la aplicación corresponde a un archivo numerado dentro de `src/components/`, con comentarios guiados (`[CLAVE EXPOSICIÓN]`):

1. `01_SintaxisYFragmentos.jsx` — Nodo raíz único, Fragmentos (`<>...</>`), cierre obligatorio, `className`, `htmlFor` y componentes en Mayúscula.
2. `02_ExpresionesYEstilos.jsx` — Llaves `{ }` (expresiones vs. sentencias), estilos en línea `style={{ }}` en `camelCase` y valores ignorados por React.
3. `03_RenderizadoCondicional.jsx` — *Early return*, operador ternario (`? :`) y operador `&&` con la **trampa del `0`** ya corregida.
4. `04_ListasYKeys.jsx` — Transformación de arrays con `.map()` y la importancia real de la prop `key` en el algoritmo de reconciliación.
5. `05_EventosYSeguridadXSS.jsx` — Eventos `onClick={fn}` vs. `onClick={() => fn(arg)}` y demostración práctica de protección automática contra **XSS**.
6. `06_DemoIntegradora.jsx` — Ejemplo completo integrando todas las reglas de JSX en un mini-panel de módulos.

## Mejoras implementadas (tickets 01–10)

Cada ticket se ha subido en su propio commit.

| Ticket | Archivo(s) | Mejora |
|---|---|---|
| 01 | `App.jsx`, `index.css` | Botón para cambiar entre tema claro y oscuro (clase CSS en el contenedor principal) y footer con nombre, módulo y año dinámico. |
| 02 | `01_SintaxisYFragmentos.jsx` | Input controlado con `useState`: error en rojo con `role="alert"` si tiene menos de 3 caracteres y saludo «Bienvenido/a al portal, X». |
| 03 | `02_ExpresionesYEstilos.jsx` | Selector de IVA (21 %, 10 %, 4 %), descuento de 0 a 50 % y desglose con 2 decimales. El total se pinta en verde si hay descuento. |
| 04 | `03_RenderizadoCondicional.jsx` | Corregida la trampa del `0` (`notificaciones > 0 &&`), botón «Marcar todas como leídas» desactivado con 0 y mensaje «Estás al día». |
| 05 | `04_ListasYKeys.jsx` | Bloqueo de módulos duplicados sin distinguir mayúsculas, buscador por nombre o código y contador «Mostrando X de Y módulos». |
| 06 | `05_EventosYSeguridadXSS.jsx` | Historial de los últimos 5 eventos con `.map()` y `key` única, botón «Limpiar historial» y 3 botones para cargar payloads XSS de prueba. |
| 07 | `06_DemoIntegradora.jsx` | Búsqueda por nombre combinada con «Solo aprobados», ordenación por nota o por nombre y mensaje cuando no hay resultados. |
| 08 | `06_DemoIntegradora.jsx` | Los expedientes pasan a `useState` y se pueden añadir con un formulario controlado (nombre obligatorio, nota de 0 a 10, módulos separados por comas). |
| 09 | `ResumenKPIs.jsx` | Componente nuevo que recibe la prop `alumnos` y muestra total, nota media y % de aprobados. Se actualiza con los filtros y los alumnos añadidos. |
| 10 | `06_DemoIntegradora.jsx` | Los expedientes se guardan en `localStorage` y el botón «Restablecer datos iniciales» vuelve a los 3 originales. |

## Despliegue

Desplegado en **Vercel** con el preset de Vite (`npm run build`, carpeta de salida `dist`):
https://m102jsxreactdemo.vercel.app/

