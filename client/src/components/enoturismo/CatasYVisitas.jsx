import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import CatasCatalogo from './CatasCatalogo';
import CatasBooking from './CatasBooking';
import CatasFeatures from './CatasFeatures';

const BookingToggle = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  margin: 1.5rem auto 0;
  padding: 18px 24px;
  border: 0;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.7rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  letter-spacing: 0.14em;
  cursor: pointer;
  scroll-margin-top: 110px;
`;

const CatasYVisitas = () => {
  const [catas, setCatas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [bookingAbierto, setBookingAbierto] = useState(false);
  const [cataId, setCataId] = useState('');
  const toggleRef = useRef(null);

  useEffect(() => {
    let activo = true;
    api.get('/catas')
      .then((data) => {
        if (activo) setCatas((Array.isArray(data) ? data : []).filter((c) => c.activo && c.horarios?.length));
      })
      .catch(() => {})
      .finally(() => activo && setCargando(false));
    return () => { activo = false; };
  }, []);

  const handleReservar = (id) => {
    setCataId(String(id));
    setBookingAbierto(true);
    setTimeout(() => toggleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  return (
    <div id="catas-y-visitas" style={{ scrollMarginTop: '110px' }}>
      <CatasCatalogo catas={catas} cargando={cargando} onReservar={handleReservar} />
      <BookingToggle
        ref={toggleRef}
        type="button"
        id="btn-reserva-online"
        aria-expanded={bookingAbierto}
        onClick={() => setBookingAbierto((s) => !s)}
      >
        <span>RESERVA ONLINE · CALENDARIO Y DISPONIBILIDAD</span>
        <span aria-hidden="true">{bookingAbierto ? '−' : '+'}</span>
      </BookingToggle>
      {bookingAbierto && <CatasBooking key={cataId} catas={catas} cataInicial={cataId} />}
      <CatasFeatures />
    </div>
  );
};

export default CatasYVisitas;
