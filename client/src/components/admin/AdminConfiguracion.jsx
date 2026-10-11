import { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';
import AdminLayout from './AdminLayout';
import AdminConfirmModal from './AdminConfirmModal';
import { Phone, Share2, Megaphone, CalendarOff, Save, Plus, Trash2 } from 'lucide-react';

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid var(--tn-n-300);
  border-top-color: var(--tn-acc);
  border-radius: 50%;
  animation: _spin 0.8s linear infinite;
  margin: 30px auto;
  @keyframes _spin { to { transform: rotate(360deg); } }
`;

const Kicker = styled.p`
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--tn-gold-700);
  margin-bottom: 4px;
`;

const PageH1 = styled.h1`
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--tn-text);
  margin-bottom: 24px;
`;

const TabsRow = styled.div`
  display: flex;
  border-bottom: 2px solid var(--tn-rule);
  margin-bottom: 24px;
  overflow-x: auto;
`;

const Tab = styled.button`
  height: 44px;
  padding: 0 18px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${(p) => (p.$active ? 'var(--tn-acc)' : 'transparent')};
  font-family: var(--tn-font);
  font-size: 14px;
  font-weight: ${(p) => (p.$active ? '700' : '400')};
  color: ${(p) => (p.$active ? 'var(--tn-acc-700)' : 'var(--tn-muted)')};
  cursor: pointer;
  transition: color 150ms ease, border-color 150ms ease;
  margin-bottom: -2px;
  white-space: nowrap;
  &:hover { color: var(--tn-acc-700); }
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid var(--tn-rule);
  padding: 24px;
  max-width: 720px;
  margin-bottom: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;

  label {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--tn-muted);
  }

  input, textarea {
    padding: 9px 12px;
    border: 1px solid var(--tn-rule);
    font-family: inherit;
    font-size: 14px;
    background: #fff;
    &:focus { outline: none; border-color: var(--tn-acc-700); }
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;

  input {
    width: 18px;
    height: 18px;
    accent-color: var(--tn-acc-700);
    cursor: pointer;
  }
`;

const BtnPrimary = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  padding: 0 18px;
  background: var(--tn-acc-700);
  color: #fff;
  border: none;
  font-family: var(--tn-font);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: background 150ms ease;
  &:hover { background: var(--tn-acc-800); }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  margin-top: 14px;
`;

const Th = styled.th`
  padding: 10px 12px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--tn-muted);
  border-bottom: 1px solid var(--tn-rule);
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid var(--tn-line);
  color: var(--tn-text);
  vertical-align: middle;
`;

const ActionBtn = styled.button`
  background: none;
  border: none;
  color: var(--tn-rojo-700);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

const AlertSuccess = styled.div`
  padding: 12px 16px;
  background: var(--tn-verde-100);
  color: var(--tn-verde-700);
  font-size: 13.5px;
  font-weight: 600;
  margin-bottom: 20px;
  max-width: 720px;
`;

const AdminConfiguracion = () => {
  const [tab, setTab] = useState('contacto');
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [vacacionDelete, setVacacionDelete] = useState(null);

  const [config, setConfig] = useState({
    telefono: '',
    whatsapp: '',
    emailContacto: '',
    emailReservas: '',
    emailEventos: '',
    direccion: '',
    googleMapsUrl: '',
    instagramUrl: '',
    facebookUrl: '',
    tripAdvisorUrl: '',
    bannerActivo: false,
    bannerTexto: '',
    bannerEnlace: '',
    diasVacaciones: [],
  });

  const [nuevaVacacion, setNuevaVacacion] = useState({
    fechaInicio: '',
    fechaFin: '',
    motivo: '',
  });

  const cargarConfiguracion = async () => {
    try {
      setLoading(true);
      const data = await api.get('/configuracion');
      setConfig(data);
    } catch (err) {
      console.error('Error cargando configuración:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let activo = true;
    api.get('/configuracion')
      .then((data) => {
        if (activo) {
          setConfig(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error cargando configuración:', err);
        if (activo) setLoading(false);
      });
    return () => {
      activo = false;
    };
  }, []);

  const handleGuardarConfig = async (e) => {
    e.preventDefault();
    try {
      setGuardando(true);
      setMensajeExito('');
      await api.put('/configuracion', config);
      setMensajeExito('Configuración guardada correctamente.');
      setTimeout(() => setMensajeExito(''), 3500);
    } catch (err) {
      alert(err.message || 'Error al guardar la configuración');
    } finally {
      setGuardando(false);
    }
  };

  const handleAgregarVacacion = async (e) => {
    e.preventDefault();
    if (!nuevaVacacion.fechaInicio || !nuevaVacacion.fechaFin) {
      alert('Debes indicar fecha de inicio y fin.');
      return;
    }
    try {
      await api.post('/configuracion/vacaciones', nuevaVacacion);
      setNuevaVacacion({ fechaInicio: '', fechaFin: '', motivo: '' });
      cargarConfiguracion();
    } catch (err) {
      alert(err.message || 'Error al registrar el período de vacaciones');
    }
  };

  const handleEliminarVacacion = async () => {
    if (!vacacionDelete) return;
    try {
      await api.delete(`/configuracion/vacaciones/${vacacionDelete.id}`);
      setVacacionDelete(null);
      cargarConfiguracion();
    } catch (err) {
      console.error('Error al eliminar vacaciones:', err);
      alert('Error al eliminar el período de vacaciones');
    }
  };

  return (
    <AdminLayout section="Configuración">
      <Kicker>Sistema & Operación</Kicker>
      <PageH1>Configuración General</PageH1>

      <TabsRow>
        <Tab $active={tab === 'contacto'} onClick={() => setTab('contacto')}>
          <Phone size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Contacto & Bodega
        </Tab>
        <Tab $active={tab === 'redes'} onClick={() => setTab('redes')}>
          <Share2 size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Redes Sociales
        </Tab>
        <Tab $active={tab === 'banner'} onClick={() => setTab('banner')}>
          <Megaphone size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Banner de Aviso
        </Tab>
        <Tab $active={tab === 'vacaciones'} onClick={() => setTab('vacaciones')}>
          <CalendarOff size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Días de Vacaciones / Bloqueos (Catas)
        </Tab>
      </TabsRow>

      {mensajeExito && <AlertSuccess>{mensajeExito}</AlertSuccess>}

      {loading ? (
        <Spinner />
      ) : (
        <>
          {tab === 'contacto' && (
            <Card as="form" onSubmit={handleGuardarConfig}>
              <FormRow>
                <FormGroup>
                  <label>Teléfono de Contacto</label>
                  <input
                    type="text"
                    value={config.telefono || ''}
                    onChange={(e) => setConfig({ ...config, telefono: e.target.value })}
                    placeholder="+34 971 87 20 18"
                  />
                </FormGroup>
                <FormGroup>
                  <label>WhatsApp de Reservas</label>
                  <input
                    type="text"
                    value={config.whatsapp || ''}
                    onChange={(e) => setConfig({ ...config, whatsapp: e.target.value })}
                    placeholder="+34 620 12 34 56"
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <label>Email General</label>
                  <input
                    type="email"
                    value={config.emailContacto || ''}
                    onChange={(e) => setConfig({ ...config, emailContacto: e.target.value })}
                    placeholder="info@bodegasantacatarina.com"
                  />
                </FormGroup>
                <FormGroup>
                  <label>Email Reservas de Catas</label>
                  <input
                    type="email"
                    value={config.emailReservas || ''}
                    onChange={(e) => setConfig({ ...config, emailReservas: e.target.value })}
                    placeholder="reservas@bodegasantacatarina.com"
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <label>Email Eventos Privados / Bodas</label>
                <input
                  type="email"
                  value={config.emailEventos || ''}
                  onChange={(e) => setConfig({ ...config, emailEventos: e.target.value })}
                  placeholder="eventos@bodegasantacatarina.com"
                />
              </FormGroup>

              <FormGroup>
                <label>Dirección Física de la Finca</label>
                <input
                  type="text"
                  value={config.direccion || ''}
                  onChange={(e) => setConfig({ ...config, direccion: e.target.value })}
                  placeholder="Finca Son Aloy, Ma-3140, km 3, 07314 Sencelles, Mallorca"
                />
              </FormGroup>

              <FormGroup>
                <label>Enlace Google Maps / Ubicación</label>
                <input
                  type="url"
                  value={config.googleMapsUrl || ''}
                  onChange={(e) => setConfig({ ...config, googleMapsUrl: e.target.value })}
                  placeholder="https://maps.google.com/?q=..."
                />
              </FormGroup>

              <BtnPrimary type="submit" disabled={guardando}>
                <Save size={15} strokeWidth={2} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                {guardando ? 'Guardando...' : 'Guardar Cambios de Contacto'}
              </BtnPrimary>
            </Card>
          )}

          {tab === 'redes' && (
            <Card as="form" onSubmit={handleGuardarConfig}>
              <FormGroup>
                <label>Instagram URL</label>
                <input
                  type="url"
                  value={config.instagramUrl || ''}
                  onChange={(e) => setConfig({ ...config, instagramUrl: e.target.value })}
                  placeholder="https://instagram.com/bodegasantacatarina"
                />
              </FormGroup>

              <FormGroup>
                <label>Facebook URL</label>
                <input
                  type="url"
                  value={config.facebookUrl || ''}
                  onChange={(e) => setConfig({ ...config, facebookUrl: e.target.value })}
                  placeholder="https://facebook.com/bodegasantacatarina"
                />
              </FormGroup>

              <FormGroup>
                <label>TripAdvisor URL</label>
                <input
                  type="url"
                  value={config.tripAdvisorUrl || ''}
                  onChange={(e) => setConfig({ ...config, tripAdvisorUrl: e.target.value })}
                  placeholder="https://tripadvisor.es/..."
                />
              </FormGroup>

              <BtnPrimary type="submit" disabled={guardando}>
                <Save size={15} strokeWidth={2} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                {guardando ? 'Guardando...' : 'Guardar Enlaces de Redes'}
              </BtnPrimary>
            </Card>
          )}

          {tab === 'banner' && (
            <Card as="form" onSubmit={handleGuardarConfig}>
              <SwitchLabel>
                <input
                  type="checkbox"
                  checked={Boolean(config.bannerActivo)}
                  onChange={(e) => setConfig({ ...config, bannerActivo: e.target.checked })}
                />
                Mostrar Banner de Aviso Superior en el sitio público
              </SwitchLabel>

              <FormGroup>
                <label>Texto del Aviso</label>
                <textarea
                  rows={2}
                  value={config.bannerTexto || ''}
                  onChange={(e) => setConfig({ ...config, bannerTexto: e.target.value })}
                  placeholder="Ej: 🍇 Ya disponible la nueva añada Gran Selección 2023..."
                />
              </FormGroup>

              <FormGroup>
                <label>Enlace de Destino (Opcional)</label>
                <input
                  type="text"
                  value={config.bannerEnlace || ''}
                  onChange={(e) => setConfig({ ...config, bannerEnlace: e.target.value })}
                  placeholder="/vinos o enlace externo"
                />
              </FormGroup>

              <BtnPrimary type="submit" disabled={guardando}>
                <Save size={15} strokeWidth={2} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                {guardando ? 'Guardando...' : 'Guardar Configuración del Banner'}
              </BtnPrimary>
            </Card>
          )}

          {tab === 'vacaciones' && (
            <div style={{ maxWidth: 720 }}>
              <Card as="form" onSubmit={handleAgregarVacacion}>
                <h3 style={{ fontSize: 16, marginBottom: 12 }}>Bloquear Período de Vacaciones o Cierre</h3>
                <p style={{ fontSize: 13, color: 'var(--tn-muted)', marginBottom: 16 }}>
                  Los días incluidos en estos períodos quedarán bloqueados automáticamente en el calendario de reservas de catas y visitas.
                </p>

                <FormRow>
                  <FormGroup>
                    <label>Fecha Desde</label>
                    <input
                      type="date"
                      required
                      value={nuevaVacacion.fechaInicio}
                      onChange={(e) => setNuevaVacacion({ ...nuevaVacacion, fechaInicio: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Fecha Hasta (Inclusive)</label>
                    <input
                      type="date"
                      required
                      value={nuevaVacacion.fechaFin}
                      onChange={(e) => setNuevaVacacion({ ...nuevaVacacion, fechaFin: e.target.value })}
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <label>Motivo del Cierre / Nota</label>
                  <input
                    type="text"
                    value={nuevaVacacion.motivo}
                    onChange={(e) => setNuevaVacacion({ ...nuevaVacacion, motivo: e.target.value })}
                    placeholder="Ej: Cierre de temporada / Fiestas de fin de año"
                  />
                </FormGroup>

                <BtnPrimary type="submit">
                  <Plus size={15} strokeWidth={2} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                  Agregar Bloqueo de Calendario
                </BtnPrimary>
              </Card>

              <Card>
                <h3 style={{ fontSize: 15, marginBottom: 10 }}>Períodos de Vacaciones / Cierres Registrados</h3>
                <Table>
                  <thead>
                    <tr>
                      <Th>Desde</Th>
                      <Th>Hasta</Th>
                      <Th>Motivo</Th>
                      <Th style={{ textAlign: 'right' }}>Acción</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {(config.diasVacaciones || []).map((vac) => (
                      <tr key={vac.id}>
                        <Td><strong>{new Date(vac.fechaInicio).toLocaleDateString('es-ES')}</strong></Td>
                        <Td><strong>{new Date(vac.fechaFin).toLocaleDateString('es-ES')}</strong></Td>
                        <Td><span style={{ color: 'var(--tn-muted)' }}>{vac.motivo || 'Vacaciones'}</span></Td>
                        <Td style={{ textAlign: 'right' }}>
                          <ActionBtn onClick={() => setVacacionDelete(vac)}>
                            <Trash2 size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                            Eliminar
                          </ActionBtn>
                        </Td>
                      </tr>
                    ))}
                    {(!config.diasVacaciones || config.diasVacaciones.length === 0) && (
                      <tr>
                        <Td colSpan={4} style={{ textAlign: 'center', color: 'var(--tn-muted)', padding: 20 }}>
                          No hay fechas bloqueadas actualmente.
                        </Td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card>
            </div>
          )}
        </>
      )}

      {/* Confirmar eliminación de vacaciones */}
      {vacacionDelete && (
        <AdminConfirmModal
          isOpen={Boolean(vacacionDelete)}
          title="Eliminar Bloqueo de Vacaciones"
          message={`¿Deseas desbloquear el período del ${new Date(vacacionDelete.fechaInicio).toLocaleDateString('es-ES')} al ${new Date(vacacionDelete.fechaFin).toLocaleDateString('es-ES')}?`}
          onConfirm={handleEliminarVacacion}
          onCancel={() => setVacacionDelete(null)}
        />
      )}
    </AdminLayout>
  );
};

export default AdminConfiguracion;
