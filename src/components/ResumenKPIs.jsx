export default function ResumenKPIs({ alumnos }) {
  const total = alumnos.length;

  let sumaNotas = 0;
  alumnos.forEach((a) => {
    sumaNotas = sumaNotas + a.nota;
  });
  const notaMedia = total > 0 ? sumaNotas / total : 0;

  const aprobados = alumnos.filter((a) => a.nota >= 5).length;
  const porcentajeAprobados = total > 0 ? (aprobados / total) * 100 : 0;

  return (
    <div className="kpis">
      <div className="kpi">
        <span className="kpi-titulo">Total alumnos</span>
        <strong className="kpi-valor">{total}</strong>
      </div>
      <div className="kpi">
        <span className="kpi-titulo">Nota media</span>
        <strong className="kpi-valor">{notaMedia.toFixed(2)}</strong>
      </div>
      <div className="kpi">
        <span className="kpi-titulo">% Aprobados</span>
        <strong
          className="kpi-valor"
          style={{ color: porcentajeAprobados >= 50 ? 'var(--green)' : 'var(--red)' }}
        >
          {porcentajeAprobados.toFixed(0)} %
        </strong>
      </div>
    </div>
  );
}
