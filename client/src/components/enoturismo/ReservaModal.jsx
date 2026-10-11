import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.6);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  border-radius: 8px;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  color: ${({ theme }) => theme.colors.textLight};
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  
  label {
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    font-size: 14px;
  }
  
  input, select, textarea {
    padding: ${({ theme }) => theme.spacing.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    font-family: inherit;
    font-size: 14px;
  }
`;

const BlockedNotice = styled.div`
  background: #fdf2f2;
  border-left: 4px solid #c93b3b;
  color: #8c1d1d;
  padding: 10px 14px;
  font-size: 13.5px;
  border-radius: 4px;
  margin-top: 4px;
  line-height: 1.4;
`;

const ClosuresNotice = styled.div`
  background: #fdfaf3;
  border: 1px solid #ebd8a0;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12.5px;
  color: #7d5b12;
  margin-bottom: 8px;
`;

const PrimaryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing.md};
  transition: background-color 150ms ease, opacity 150ms ease;
  
  &:hover:not(:disabled) {
    background-color: #b5952f;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ReservaModal = ({ isOpen, onClose, selectedExperience }) => {
  const [step, setStep] = useState(1);
  const [vacaciones, setVacaciones] = useState([]);
  const [fechaHora, setFechaHora] = useState('');
  const [asistentes, setAsistentes] = useState('2');
  const [idioma, setIdioma] = useState('es');
  const [datosContacto, setDatosContacto] = useState({ nombre: '', email: '', telefono: '' });
  const [conflictoVacacion, setConflictoVacacion] = useState(null);

  // Cargar calendario de bloqueos/vacaciones desde la API
  useEffect(() => {
    if (isOpen) {
      api.get('/configuracion/vacaciones')
        .then((data) => {
          if (Array.isArray(data)) {
            setVacaciones(data);
          }
        })
        .catch((err) => {
          console.warn('[ReservaModal] Error al obtener calendario de vacaciones:', err);
        });
    }
  }, [isOpen]);

  // Validar si la fecha seleccionada cae dentro de algún período de vacaciones
  const validarFecha = (valor) => {
    setFechaHora(valor);
    if (!valor) {
      setConflictoVacacion(null);
      return;
    }

    const fechaSeleccionada = new Date(valor.split('T')[0]);
    fechaSeleccionada.setHours(0, 0, 0, 0);

    const match = vacaciones.find((v) => {
      if (!v.activo) return false;
      const inicio = new Date(v.fechaInicio);
      inicio.setHours(0, 0, 0, 0);
      const fin = new Date(v.fechaFin);
      fin.setHours(23, 59, 59, 999);
      return fechaSeleccionada >= inicio && fechaSeleccionada <= fin;
    });

    if (match) {
      const fechaFmt = new Date(match.fechaInicio).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const finFmt = new Date(match.fechaFin).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      setConflictoVacacion({
        motivo: match.motivo || 'Cierre de bodega / Período vacacional',
        periodo: `${fechaFmt} al ${finFmt}`,
      });
    } else {
      setConflictoVacacion(null);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (conflictoVacacion) {
      return;
    }
    setStep((s) => s + 1);
  };

  const handleClose = () => {
    setStep(1);
    setFechaHora('');
    setConflictoVacacion(null);
    onClose();
  };

  const todayStr = new Date().toISOString().split('T')[0] + 'T00:00';

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <ModalContainer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={handleClose}>&times;</CloseButton>
          
          {step === 1 && (
            <>
              <Title>Reservar: {selectedExperience?.title || 'Experiencia Santa Catarina'}</Title>

              {vacaciones.filter((v) => v.activo && new Date(v.fechaFin) >= new Date()).length > 0 && (
                <ClosuresNotice>
                  ℹ️ <strong>Aviso del calendario:</strong> La bodega cuenta con fechas especiales de cierre programadas. Consulta el selector para verificar disponibilidad.
                </ClosuresNotice>
              )}

              <Form onSubmit={handleNext}>
                <InputGroup>
                  <label htmlFor="reserva-fecha">Fecha y Horario</label>
                  <input
                    id="reserva-fecha"
                    type="datetime-local"
                    min={todayStr}
                    value={fechaHora}
                    onChange={(e) => validarFecha(e.target.value)}
                    required
                  />
                  {conflictoVacacion && (
                    <BlockedNotice>
                      ⛔ <strong>Fecha no disponible:</strong> La bodega se encontrará cerrada ({conflictoVacacion.periodo}) con motivo de: <em>{conflictoVacacion.motivo}</em>. Por favor seleccioná otra fecha para tu visita.
                    </BlockedNotice>
                  )}
                </InputGroup>

                <InputGroup>
                  <label htmlFor="reserva-asistentes">Número de asistentes</label>
                  <input
                    id="reserva-asistentes"
                    type="number"
                    min="1"
                    max="30"
                    value={asistentes}
                    onChange={(e) => setAsistentes(e.target.value)}
                    required
                  />
                </InputGroup>

                <InputGroup>
                  <label htmlFor="reserva-idioma">Idioma de la experiencia</label>
                  <select
                    id="reserva-idioma"
                    value={idioma}
                    onChange={(e) => setIdioma(e.target.value)}
                    required
                  >
                    <option value="es">Español</option>
                    <option value="ca">Catalán / Mallorquín</option>
                    <option value="en">Inglés</option>
                    <option value="de">Alemán</option>
                  </select>
                </InputGroup>

                <PrimaryButton type="submit" disabled={!fechaHora || !!conflictoVacacion}>
                  Continuar a datos personales
                </PrimaryButton>
              </Form>
            </>
          )}

          {step === 2 && (
            <>
              <Title>Tus datos de reserva</Title>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: '14px' }}>
                Reserva para: <strong>{selectedExperience?.title}</strong> · {fechaHora.replace('T', ' ')} hs ({asistentes} personas)
              </div>
              <Form onSubmit={handleNext}>
                <InputGroup>
                  <label htmlFor="reserva-nombre">Nombre completo</label>
                  <input
                    id="reserva-nombre"
                    type="text"
                    value={datosContacto.nombre}
                    onChange={(e) => setDatosContacto({ ...datosContacto, nombre: e.target.value })}
                    required
                  />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="reserva-email">Email</label>
                  <input
                    id="reserva-email"
                    type="email"
                    value={datosContacto.email}
                    onChange={(e) => setDatosContacto({ ...datosContacto, email: e.target.value })}
                    required
                  />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="reserva-telefono">Teléfono / WhatsApp</label>
                  <input
                    id="reserva-telefono"
                    type="tel"
                    value={datosContacto.telefono}
                    onChange={(e) => setDatosContacto({ ...datosContacto, telefono: e.target.value })}
                    required
                  />
                </InputGroup>
                <PrimaryButton type="submit">Confirmar Reserva</PrimaryButton>
              </Form>
            </>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <Title>¡Solicitud de Reserva Recibida!</Title>
              <p style={{ margin: '16px 0', lineHeight: 1.6 }}>
                Muchas gracias <strong>{datosContacto.nombre}</strong>. Hemos registrado tu reserva para <strong>{selectedExperience?.title}</strong> el día <strong>{fechaHora.replace('T', ' ')} hs</strong>.
              </p>
              <p style={{ fontSize: '13.5px', color: '#666', marginBottom: '24px' }}>
                Te hemos enviado la confirmación por correo electrónico a <strong>{datosContacto.email}</strong> con las indicaciones para llegar a Bodega Santa Catarina.
              </p>
              <PrimaryButton onClick={handleClose}>Entendido, cerrar</PrimaryButton>
            </div>
          )}
        </ModalContainer>
      </Overlay>
    </AnimatePresence>
  );
};

export default ReservaModal;
