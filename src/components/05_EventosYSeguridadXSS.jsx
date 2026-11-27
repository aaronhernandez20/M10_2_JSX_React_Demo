import { useState } from 'react';

// ============================================================================
// [CLAVE EXPOSICIÓN 5] EVENTOS EN JSX Y SEGURIDAD AUTOMÁTICA CONTRA XSS
// ----------------------------------------------------------------------------
// 1. EVENTOS:
//    - En HTML: onclick="saludar()" (cadena de texto).
//    - En JSX:  onClick={saludar}   (referencia a función en camelCase).
//    - Si necesita argumentos: onClick={() => saludar('DAM2')}.
//      ¡ERROR TÍPICO!: escribir onClick={saludar('DAM2')} ejecuta la función
//      inmediatamente al renderizar, no al hacer clic.
// 2. PREVENCIÓN DE XSS (Cross-Site Scripting):
//    - JSX escapa automáticamente cualquier cadena insertada dentro de { }.
//    - Si un atacante introduce `<script>` o `<img onerror=...>`, React lo
//      pinta como texto plano seguro sin ejecutar código JavaScript.
// ============================================================================

const PAYLOADS = [
  { id: 'p1', nombre: 'Script', codigo: "<script>alert('XSS')</script>" },
  { id: 'p2', nombre: 'Imagen onerror', codigo: "<img src=x onerror=alert('XSS')>" },
  { id: 'p3', nombre: 'Enlace javascript:', codigo: "<a href=\"javascript:alert('XSS')\">Haz clic</a>" }
];

export default function EventosYSeguridadXSS() {
  const [historial, setHistorial] = useState([]);
  const [contador, setContador] = useState(1);
  const [entradaUsuario, setEntradaUsuario] = useState(
    "<img src=x onerror='alert'('Ataque XSS') ' /> <script>alert('Hack')</script>"
  );

  // Guarda el evento al principio y se queda solo con los 5 más recientes
  const registrarEvento = (texto) => {
    const nuevo = { id: contador, texto: texto };
    setHistorial([nuevo, ...historial].slice(0, 5));
    setContador(contador + 1);
  };

  // Manejador sin parámetros (se pasa como referencia: onClick={manejarClickSimple})
  const manejarClickSimple = () => {
    registrarEvento(`Clic simple registrado a las ${new Date().toLocaleTimeString()}`);
  };

  // Manejador con parámetros (requiere función flecha: onClick={() => manejarConParametro(...)})
  const manejarConParametro = (accion) => {
    registrarEvento(`Acción ejecutada con parámetro: "${accion}"`);
  };

  const ultimoEvento = historial.length > 0 ? historial[0].texto : 'Ninguno todavía';

  return (
    <section className="card">
      <h2>5. Manejo de Eventos y Protección Nativa contra XSS</h2>
      <p className="subtitle">
        Prueba los botones de eventos y comprueba cómo JSX neutraliza automáticamente código HTML/JS malicioso.
      </p>

      <div className="grid-2">
        <div className="box box-success">
          <h3>Sintaxis de Eventos (Synthetic Events)</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-soft)' }}>
            Último evento: <strong style={{ color: 'var(--primary)' }}>{ultimoEvento}</strong>
          </p>
          <div className="btn-row">
            {/* Referencia directa a la función */}
            <button type="button" className="btn" onClick={manejarClickSimple}>
              onClick=&#123;fn&#125;
            </button>
            {/* Función flecha para pasar argumentos sin ejecutar en el render */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => manejarConParametro('Exportar PDF')}
            >
              onClick=&#123;() =&gt; fn(arg)&#125;
            </button>
          </div>

          <h3>Historial (últimos 5 eventos)</h3>
          {historial.length === 0 ? (
            <p style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>Todavía no hay eventos registrados.</p>
          ) : (
            <ul className="list" style={{ marginTop: '0.4rem' }}>
              {historial.map((evento) => (
                <li key={evento.id} className="list-item" style={{ fontSize: '0.85rem' }}>
                  <span>#{evento.id}</span>
                  <span>{evento.texto}</span>
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            className="btn btn-danger"
            style={{ marginTop: '0.75rem' }}
            disabled={historial.length === 0}
            onClick={() => setHistorial([])}
          >
            Limpiar historial
          </button>
        </div>

        <div className="box box-warn">
          <h3>Escapado automático contra XSS</h3>
          <label htmlFor="xss-input">Introduce HTML o un payload XSS:</label>
          <input
            id="xss-input"
            type="text"
            className="input"
            value={entradaUsuario}
            onChange={(e) => setEntradaUsuario(e.target.value)}
          />

          <div className="btn-row" style={{ marginTop: '0.6rem' }}>
            {PAYLOADS.map((payload) => (
              <button
                key={payload.id}
                type="button"
                className="btn btn-secondary"
                onClick={() => setEntradaUsuario(payload.codigo)}
              >
                Cargar payload XSS de prueba: {payload.nombre}
              </button>
            ))}
          </div>
          <div
            style={{
              marginTop: '0.75rem',
              padding: '0.65rem',
              backgroundColor: 'var(--surface-alt)',
              borderRadius: '8px',
              fontFamily: 'Consolas, monospace',
              fontSize: '0.85rem',
              wordBreak: 'break-all'
            }}
          >
            {/* JSX escapa automáticamente esta cadena: NO se ejecuta el script */}
            Salida renderizada segura: {entradaUsuario}
          </div>
        </div>
      </div>

      <p className="file-hint">
        Archivo para mostrar en VS Code: <code className="code-inline">src/components/05_EventosYSeguridadXSS.jsx</code>
      </p>
    </section>
  );
}
