import { useState } from 'react';
import ResumenKPIs from './ResumenKPIs.jsx';

// ============================================================================
// [CLAVE EXPOSICIÓN 6] DEMO INTEGRADORA DE TODAS LAS CARACTERÍSTICAS DE JSX
// ----------------------------------------------------------------------------
// Este componente reúne en un caso real de aula:
// - Fragmentos (<>...</>) y atributos camelCase (className, onClick, onChange)
// - Expresiones JS { } y estilos en línea dinámicos style={{ }}
// - Renderizado condicional (ternario + && booleano seguro)
// - Listas con .map() y key única estable
// - Comunicación mediante props y composición de componentes
// ============================================================================

const EXPEDIENTES = [
  { id: 101, nombre: 'Lucía Serrano', nota: 8.7, modulos: ['DI', 'PSP', 'AD'] },
  { id: 102, nombre: 'Marcos Vega', nota: 4.3, modulos: ['DI', 'SGE'] },
  { id: 103, nombre: 'Sofía Navarro', nota: 9.5, modulos: ['DI', 'PSP', 'AD', 'PMDM'] }
];

function TarjetaExpediente({ alumno, seleccionado, onSeleccionar }) {
  const aprobado = alumno.nota >= 5;

  return (
    <article
      className="box"
      style={{
        borderColor: seleccionado ? 'var(--primary)' : 'var(--border)',
        borderWidth: seleccionado ? '2px' : '1px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>{alumno.nombre}</h3>
        <span className={`badge ${aprobado ? 'badge-ok' : 'badge-fail'}`}>
          {aprobado ? `Aprobado (${alumno.nota})` : `Pendiente (${alumno.nota})`}
        </span>
      </div>

      {alumno.modulos.length > 0 && (
        <div className="btn-row" style={{ marginTop: '0.6rem' }}>
          {alumno.modulos.map((mod) => (
            <span key={`${alumno.id}-${mod}`} className="code-inline">
              {mod}
            </span>
          ))}
        </div>
      )}

      <div className="btn-row">
        <button type="button" className="btn" onClick={() => onSeleccionar(alumno)}>
          {seleccionado ? 'Expediente seleccionado' : 'Seleccionar expediente'}
        </button>
      </div>
    </article>
  );
}

export default function DemoIntegradora() {
  const [expedientes, setExpedientes] = useState(EXPEDIENTES);
  const [soloAprobados, setSoloAprobados] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('nota-desc');

  const [formNombre, setFormNombre] = useState('');
  const [formNota, setFormNota] = useState('');
  const [formModulos, setFormModulos] = useState('');
  const [errorForm, setErrorForm] = useState('');

  const agregarExpediente = (e) => {
    e.preventDefault();
    const nota = Number(formNota);

    if (formNombre.trim() === '') {
      setErrorForm('El nombre es obligatorio.');
      return;
    }
    if (formNota === '' || nota < 0 || nota > 10) {
      setErrorForm('La nota debe ser un número entre 0 y 10.');
      return;
    }

    const listaModulos = formModulos
      .split(',')
      .map((m) => m.trim().toUpperCase())
      .filter((m) => m !== '');

    const nuevo = {
      id: Date.now(),
      nombre: formNombre.trim(),
      nota: nota,
      modulos: listaModulos
    };

    setExpedientes([...expedientes, nuevo]);
    setFormNombre('');
    setFormNota('');
    setFormModulos('');
    setErrorForm('');
  };

  const textoBusqueda = busqueda.trim().toLowerCase();

  // Primero filtramos (aprobados + búsqueda) y después ordenamos una copia
  const listaFiltrada = expedientes.filter((a) => {
    const cumpleAprobado = soloAprobados ? a.nota >= 5 : true;
    const cumpleBusqueda = a.nombre.toLowerCase().includes(textoBusqueda);
    return cumpleAprobado && cumpleBusqueda;
  });

  const listaOrdenada = [...listaFiltrada].sort((a, b) => {
    if (orden === 'nota-desc') return b.nota - a.nota;
    if (orden === 'nota-asc') return a.nota - b.nota;
    return a.nombre.localeCompare(b.nombre);
  });

  return (
    <>
      <section className="card">
        <h2>6. Ejemplo Integrador: Panel de Expedientes DAM2</h2>
        <p className="subtitle">
          Composición de componentes reutilizables aplicando todas las reglas de JSX.
        </p>

        <form onSubmit={agregarExpediente} className="box" style={{ marginBottom: '1rem' }}>
          <h3 style={{ marginTop: 0 }}>Añadir nuevo expediente</h3>
          <div className="btn-row" style={{ alignItems: 'flex-end' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label htmlFor="form-nombre">Nombre *</label>
              <input
                id="form-nombre"
                type="text"
                className="input"
                placeholder="Ej.: Pablo Ruiz"
                value={formNombre}
                onChange={(e) => setFormNombre(e.target.value)}
              />
            </div>
            <div style={{ flex: '0 1 110px' }}>
              <label htmlFor="form-nota">Nota (0-10)</label>
              <input
                id="form-nota"
                type="number"
                className="input"
                min="0"
                max="10"
                step="0.1"
                value={formNota}
                onChange={(e) => setFormNota(e.target.value)}
              />
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <label htmlFor="form-modulos">Módulos (separados por comas)</label>
              <input
                id="form-modulos"
                type="text"
                className="input"
                placeholder="Ej.: DI, PSP, AD"
                value={formModulos}
                onChange={(e) => setFormModulos(e.target.value)}
              />
            </div>
            <button type="submit" className="btn">Añadir expediente</button>
          </div>
          {errorForm && (
            <p role="alert" style={{ color: 'var(--red)', fontSize: '0.88rem', marginTop: '0.5rem' }}>
              {errorForm}
            </p>
          )}
        </form>

        <div className="btn-row" style={{ marginBottom: '1rem', alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setSoloAprobados((prev) => !prev)}
          >
            {soloAprobados ? 'Mostrar todos los alumnos' : 'Filtrar solo aprobados (>= 5)'}
          </button>

          <input
            type="text"
            className="input"
            style={{ flex: '1 1 220px', marginTop: 0 }}
            placeholder="Buscar alumno por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select
            className="input"
            style={{ flex: '0 1 220px', marginTop: 0 }}
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="nota-desc">Nota (mayor a menor)</option>
            <option value="nota-asc">Nota (menor a mayor)</option>
            <option value="nombre">Nombre (A-Z)</option>
          </select>

          {seleccionado && (
            <span className="pill">
              Seleccionado: {seleccionado.nombre} (ID #{seleccionado.id})
            </span>
          )}
        </div>

        <ResumenKPIs alumnos={listaOrdenada} />

        {listaOrdenada.length === 0 && (
          <p className="box box-warn">No se encontraron expedientes con esos criterios</p>
        )}

        <div className="grid-2">
          {listaOrdenada.map((alumno) => (
            <TarjetaExpediente
              key={alumno.id}
              alumno={alumno}
              seleccionado={seleccionado?.id === alumno.id}
              onSeleccionar={setSeleccionado}
            />
          ))}
        </div>

        <p className="file-hint">
          Archivo para mostrar en VS Code: <code className="code-inline">src/components/06_DemoIntegradora.jsx</code>
        </p>
      </section>
    </>
  );
}
