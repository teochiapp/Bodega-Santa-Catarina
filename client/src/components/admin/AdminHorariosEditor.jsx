import { useState } from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const DayRow = styled.div`
  display: grid;
  grid-template-columns: 78px 1fr;
  gap: 10px;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid var(--tn-line);

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

const DayName = styled.span`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--tn-muted);
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
`;

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 4px 3px 10px;
  border: 1px solid var(--tn-rule);
  background: #fff;
  font-size: 13px;

  small { color: var(--tn-muted); font-size: 11px; }
  button {
    display: flex;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--tn-rojo-700);
    padding: 2px;
  }
`;

const AddInput = styled.input`
  width: 92px;
  padding: 4px 6px;
  border: 1px dashed var(--tn-rule);
  font-size: 13px;
  background: transparent;
`;

const CupoInput = styled.input`
  width: 64px;
  padding: 4px 6px;
  border: 1px dashed var(--tn-rule);
  font-size: 13px;
  background: transparent;
`;

const DIAS = [
  { dia: 1, nombre: 'Lunes' },
  { dia: 2, nombre: 'Martes' },
  { dia: 3, nombre: 'Miércoles' },
  { dia: 4, nombre: 'Jueves' },
  { dia: 5, nombre: 'Viernes' },
  { dia: 6, nombre: 'Sábado' },
  { dia: 0, nombre: 'Domingo' },
];

const FilaDia = ({ dia, nombre, horarios, onChange }) => {
  const [hora, setHora] = useState('');
  const [cupo, setCupo] = useState('');

  const agregar = () => {
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(hora)) return;
    if (horarios.some((h) => h.diaSemana === dia && h.hora === hora)) return;
    onChange([...horarios, { diaSemana: dia, hora, cupo: cupo === '' ? null : Number(cupo) }]);
    setHora('');
    setCupo('');
  };

  const delDia = horarios
    .filter((h) => h.diaSemana === dia)
    .sort((a, b) => a.hora.localeCompare(b.hora));

  return (
    <DayRow>
      <DayName>{nombre}</DayName>
      <Chips>
        {delDia.map((h) => (
          <Chip key={h.hora}>
            {h.hora}
            {h.cupo ? <small>· {h.cupo} pl.</small> : null}
            <button
              type="button"
              aria-label={`Quitar ${h.hora} del ${nombre}`}
              onClick={() => onChange(horarios.filter((x) => !(x.diaSemana === dia && x.hora === h.hora)))}
            >
              <X size={13} />
            </button>
          </Chip>
        ))}
        <AddInput
          type="time"
          aria-label={`Nuevo horario ${nombre}`}
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), agregar())}
          onBlur={agregar}
        />
        <CupoInput
          type="number"
          min="1"
          placeholder="Cupo"
          aria-label={`Cupo específico ${nombre}`}
          value={cupo}
          onChange={(e) => setCupo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), agregar())}
        />
      </Chips>
    </DayRow>
  );
};

/**
 * Editor de la plantilla semanal de horarios de una cata.
 * value: [{ diaSemana (0=dom..6=sáb), hora: 'HH:mm', cupo: number|null }]
 */
const AdminHorariosEditor = ({ value, onChange }) => (
  <Wrap>
    {DIAS.map(({ dia, nombre }) => (
      <FilaDia key={dia} dia={dia} nombre={nombre} horarios={value} onChange={onChange} />
    ))}
  </Wrap>
);

export default AdminHorariosEditor;
