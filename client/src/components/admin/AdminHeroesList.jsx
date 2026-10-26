import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
  X,
  Layers,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import api, { getResolvedImageUrl } from '../../services/api';
import AdminLayout from './AdminLayout';
import AdminConfirmModal from './AdminConfirmModal';
import AdminImageUpload from './AdminImageUpload';
import { useHeroes } from '../../context/HeroesContext';

// ── Styled Components ────────────────────────────────────────────────────────

const Spinner = styled.div`
  width: 28px;
  height: 28px;
  border: 2px solid var(--tn-n-300);
  border-top-color: var(--tn-acc-700);
  border-radius: 50%;
  animation: _spin 0.8s linear infinite;
  margin: 60px auto;
  @keyframes _spin { to { transform: rotate(360deg); } }
`;

const Kicker = styled.p`
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--tn-gold-700);
  margin-bottom: 4px;
  font-weight: 700;
`;

const PageH1 = styled.h1`
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--tn-text);
  margin-bottom: 6px;
`;

const Subtitle = styled.p`
  font-size: 13.5px;
  color: var(--tn-muted);
  margin-bottom: 24px;
  line-height: 1.5;
`;

const TopPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--tn-rule);
  padding-bottom: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

const TopActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const FilterTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const FilterTab = styled.button`
  background: ${({ $active }) => ($active ? 'var(--tn-acc-700)' : 'var(--tn-n-100)')};
  color: ${({ $active }) => ($active ? '#FFFFFF' : 'var(--tn-text)')};
  border: 1px solid ${({ $active }) => ($active ? 'var(--tn-acc-700)' : 'var(--tn-line)')};
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease;
  font-family: inherit;

  &:hover {
    background: ${({ $active }) => ($active ? 'var(--tn-acc-800)' : 'var(--tn-n-200)')};
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--tn-surface, #fff);
  border: 1px solid var(--tn-line);
  padding: 0 12px;
  height: 38px;
  min-width: 260px;

  input {
    border: none;
    outline: none;
    font-size: 13px;
    color: var(--tn-text);
    background: transparent;
    width: 100%;
    font-family: inherit;

    &::placeholder {
      color: var(--tn-muted);
    }
  }
`;

const BtnPrimary = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 16px;
  background: var(--tn-acc-700);
  color: #fff;
  border: none;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 150ms ease, transform 150ms ease;

  &:hover {
    background: var(--tn-acc-800);
    transform: translateY(-1px);
  }
`;

const BtnSecondary = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  padding: 0 14px;
  background: var(--tn-n-100);
  color: var(--tn-text);
  border: 1px solid var(--tn-rule);
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    background: var(--tn-n-200);
  }
`;

const HeroesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 22px;
  margin-bottom: 40px;
`;

const Card = styled.div`
  background: var(--tn-surface, #fff);
  border: 1px solid var(--tn-rule);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: border-color 200ms ease, box-shadow 200ms ease;

  &:hover {
    border-color: var(--tn-acc-400);
    box-shadow: 0 8px 24px rgba(42, 28, 33, 0.08);
  }
`;

const CardHeader = styled.div`
  padding: 12px 16px;
  background: var(--tn-n-50, #faf8f5);
  border-bottom: 1px solid var(--tn-line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const CardLocation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

const LocationTitle = styled.h3`
  font-size: 13.5px;
  font-weight: 700;
  color: var(--tn-text);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LocationRoute = styled.a`
  font-size: 11.5px;
  color: var(--tn-acc-700);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

const StatusPill = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
  background: ${({ $active }) => ($active ? '#E8F5E9' : '#FFEBEE')};
  color: ${({ $active }) => ($active ? '#2E7D32' : '#C62828')};
  flex-shrink: 0;
`;

/* ── Hero Preview Mockup en la tarjeta ── */
const HeroMockup = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  background-color: #502b3a;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 16px;
  box-sizing: border-box;
`;

const HeroMockupBg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $pos }) => $pos || 'center'};
  filter: brightness(1) contrast(1.02);
`;

const HeroMockupOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top right,
    rgba(35, 15, 25, 0.36) 0%,
    rgba(35, 15, 25, 0.16) 46%,
    rgba(35, 15, 25, 0.04) 78%,
    rgba(35, 15, 25, 0) 100%
  );
  z-index: 1;
`;

const HeroMockupContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  color: #fff;
`;

const MockupTag = styled.p`
  font-size: 8.5px;
  letter-spacing: 0.18em;
  font-weight: 700;
  color: #c2a478;
  text-transform: uppercase;
  margin: 0 0 4px 0;
`;

const MockupTitle = styled.h4`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 19px;
  font-weight: 500;
  color: #fff;
  line-height: 1.08;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MockupSubtitle = styled.p`
  font-size: 10.5px;
  line-height: 1.35;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardBody = styled.div`
  padding: 14px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DetailRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const DetailLabel = styled.span`
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--tn-muted);
`;

const DetailValue = styled.span`
  font-size: 12.5px;
  color: var(--tn-text);
  line-height: 1.4;
`;

const CardFooter = styled.div`
  padding: 10px 16px;
  border-top: 1px solid var(--tn-line);
  background: var(--tn-n-50, #faf8f5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const ActionBtn = styled.button`
  background: none;
  border: 1px solid var(--tn-line);
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--tn-text);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 150ms ease;
  font-family: inherit;

  &:hover {
    background: var(--tn-n-100);
    border-color: var(--tn-acc-600);
    color: var(--tn-acc-700);
  }
`;

const DangerBtn = styled.button`
  background: none;
  border: none;
  padding: 6px;
  color: var(--tn-muted);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 150ms ease;

  &:hover {
    color: var(--tn-rojo-700, #d32f2f);
  }
`;

/* ── Modal de Edición / Creación ── */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(42, 28, 33, 0.6);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
`;

const ModalBox = styled.div`
  background: var(--tn-bg, #fff);
  border: 1px solid var(--tn-rule);
  width: 100%;
  max-width: 860px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.22);
`;

const ModalHeader = styled.div`
  height: 52px;
  padding: 0 20px;
  border-bottom: 2px solid var(--tn-rule);
  background: var(--tn-surface, #fff);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: var(--tn-text);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ModalCloseBtn = styled.button`
  background: none;
  border: none;
  color: var(--tn-text);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--tn-acc-700);
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? '1 / -1' : 'auto')};
`;

const FormLabel = styled.label`
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--tn-muted);
`;

const Input = styled.input`
  height: 38px;
  padding: 0 12px;
  border: 1px solid var(--tn-rule);
  background: var(--tn-surface, #fff);
  color: var(--tn-text);
  font-size: 13.5px;
  outline: none;
  font-family: inherit;

  &:focus {
    border-color: var(--tn-acc-700);
  }
`;

const Textarea = styled.textarea`
  padding: 10px 12px;
  border: 1px solid var(--tn-rule);
  background: var(--tn-surface, #fff);
  color: var(--tn-text);
  font-size: 13.5px;
  outline: none;
  font-family: inherit;
  resize: vertical;
  min-height: 70px;

  &:focus {
    border-color: var(--tn-acc-700);
  }
`;

const Select = styled.select`
  height: 38px;
  padding: 0 12px;
  border: 1px solid var(--tn-rule);
  background: var(--tn-surface, #fff);
  color: var(--tn-text);
  font-size: 13.5px;
  outline: none;
  font-family: inherit;

  &:focus {
    border-color: var(--tn-acc-700);
  }
`;

const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--tn-text);
  cursor: pointer;
  margin-top: 6px;

  input {
    width: 16px;
    height: 16px;
    accent-color: var(--tn-acc-700);
  }
`;

/* ── Live Preview en el Modal ── */
const LivePreviewBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid var(--tn-rule);
  padding: 14px;
  background: var(--tn-n-50, #faf8f5);
  border-radius: 2px;
`;

const LivePreviewLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--tn-gold-700);
  display: flex;
  align-items: center;
  gap: 6px;
`;

const LiveHeroBanner = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background-color: #502b3a;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 22px;
  box-sizing: border-box;
`;

const LiveBannerBg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $pos }) => $pos || 'center'};
  filter: brightness(1) contrast(1.02);
`;

const LiveBannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top right,
    rgba(35, 15, 25, 0.36) 0%,
    rgba(35, 15, 25, 0.16) 46%,
    rgba(35, 15, 25, 0.04) 78%,
    rgba(35, 15, 25, 0) 100%
  );
  z-index: 1;
`;

const LiveBannerContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  color: #fff;
  max-width: 650px;
`;

const LiveBannerTag = styled.p`
  font-size: 9px;
  letter-spacing: 0.2em;
  font-weight: 700;
  color: #c2a478;
  text-transform: uppercase;
  margin: 0 0 6px 0;
`;

const LiveBannerTitle = styled.h3`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 400;
  color: #fff;
  line-height: 1.05;
  margin: 0 0 8px 0;
`;

const LiveBannerSub = styled.p`
  font-size: 11.5px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.88);
  margin: 0;
`;

const ModalFooter = styled.div`
  padding: 14px 20px;
  border-top: 1px solid var(--tn-rule);
  background: var(--tn-surface, #fff);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex-shrink: 0;
`;

// ── Grupos de navegación para filtrado rápido ──
const GRUPOS = [
  { id: 'todos', label: 'Todas las páginas' },
  { id: 'bodega', label: 'La Bodega' },
  { id: 'vinos', label: 'Vinos' },
  { id: 'enoturismo', label: 'Enoturismo' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'tienda-blog', label: 'Tienda & Blog' },
  { id: 'contacto', label: 'Contacto' },
];

const AdminHeroesList = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeGroup, setActiveGroup] = useState('todos');

  // Modal de edición / creación
  const [editingHero, setEditingHero] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);

  // Modales de confirmación
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [resetting, setResetting] = useState(false);

  // Notificación breve
  const [toastMessage, setToastMessage] = useState('');

  const { refreshHeroes } = useHeroes();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const loadHeroes = async () => {
    try {
      setLoading(true);
      const data = await api.get('/heroes');
      if (Array.isArray(data)) {
        setHeroes(data);
      }
    } catch (err) {
      console.error('Error al cargar heroes:', err);
      showToast('Error al cargar los heroes de páginas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHeroes();
  }, []);

  // Filtrado de heroes
  const filteredHeroes = useMemo(() => {
    return heroes.filter((h) => {
      // Filtro por grupo
      if (activeGroup === 'bodega' && !h.seccion?.startsWith('bodega') && h.seccion !== 'la-bodega') {
        return false;
      }
      if (activeGroup === 'vinos' && !h.seccion?.startsWith('vinos')) {
        return false;
      }
      if (activeGroup === 'enoturismo' && !h.seccion?.startsWith('enoturismo')) {
        return false;
      }
      if (activeGroup === 'eventos' && !h.seccion?.startsWith('eventos')) {
        return false;
      }
      if (activeGroup === 'tienda-blog' && h.seccion !== 'tienda-fisica' && h.seccion !== 'blog') {
        return false;
      }
      if (activeGroup === 'contacto' && h.seccion !== 'contacto') {
        return false;
      }

      // Filtro por texto de búsqueda
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        (h.ubicacion || '').toLowerCase().includes(term) ||
        (h.ruta || '').toLowerCase().includes(term) ||
        (h.titulo || '').toLowerCase().includes(term) ||
        (h.subtitulo || '').toLowerCase().includes(term) ||
        (h.tag || '').toLowerCase().includes(term)
      );
    });
  }, [heroes, activeGroup, searchTerm]);

  // Abrir editor para un hero existente
  const handleEdit = (hero) => {
    setEditingHero({ ...hero });
    setIsModalOpen(true);
  };

  // Abrir editor para nuevo hero
  const handleNew = () => {
    setEditingHero({
      seccion: '',
      ubicacion: '',
      ruta: '',
      tag: '',
      titulo: '',
      subtitulo: '',
      descripcion: '',
      imagen: '/assets/Santa_Catarina_372.jpg',
      imagenAlt: 'Bodega Santa Catarina · Mallorca',
      posicion: 'center',
      orden: heroes.length + 1,
      activo: true,
    });
    setIsModalOpen(true);
  };

  // Guardar cambios
  const handleSave = async (e) => {
    e?.preventDefault();
    if (!editingHero.seccion?.trim()) {
      alert('La clave identificadora de sección es obligatoria.');
      return;
    }
    if (!editingHero.titulo?.trim()) {
      alert('El título de la cabecera es obligatorio.');
      return;
    }

    try {
      setGuardando(true);
      if (editingHero.id) {
        // Actualizar
        await api.put(`/heroes/${editingHero.id}`, editingHero);
        showToast('Cabecera actualizada con éxito');
      } else {
        // Crear
        await api.post('/heroes', editingHero);
        showToast('Nueva cabecera creada con éxito');
      }

      setIsModalOpen(false);
      setEditingHero(null);
      await loadHeroes();
      refreshHeroes();
    } catch (err) {
      console.error('Error al guardar hero:', err);
      alert(err.message || 'Error al guardar la cabecera');
    } finally {
      setGuardando(false);
    }
  };

  // Confirmar eliminación
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/heroes/${deleteTarget.id}`);
      showToast('Cabecera eliminada');
      setDeleteTarget(null);
      await loadHeroes();
      refreshHeroes();
    } catch (err) {
      console.error('Error al eliminar hero:', err);
      alert(err.message || 'Error al eliminar la cabecera');
    }
  };

  // Confirmar restauración a valores iniciales
  const handleResetConfirm = async () => {
    try {
      setResetting(true);
      await api.post('/heroes/reset', {});
      showToast('Valores iniciales restaurados exitosamente');
      setIsResetConfirmOpen(false);
      await loadHeroes();
      refreshHeroes();
    } catch (err) {
      console.error('Error al restaurar heroes:', err);
      alert(err.message || 'Error al restaurar los valores iniciales');
    } finally {
      setResetting(false);
    }
  };

  // Alternar estado activo rápidamente
  const handleToggleActivo = async (hero) => {
    try {
      await api.put(`/heroes/${hero.id}`, { activo: !hero.activo });
      setHeroes((prev) =>
        prev.map((item) => (item.id === hero.id ? { ...item, activo: !hero.activo } : item))
      );
      refreshHeroes();
      showToast(`Cabecera ${!hero.activo ? 'activada' : 'desactivada'}`);
    } catch (err) {
      console.error('Error al cambiar estado activo:', err);
    }
  };

  return (
    <AdminLayout section="Cabeceras (Hero / Breadcrumb)">
      <Kicker>CONTENIDO & CABECERAS</Kicker>
      <PageH1>Cabeceras de Páginas (Heroes / Breadcrumbs)</PageH1>
      <Subtitle>
        Configura la imagen de fondo, el título y el subtítulo de la cabecera (breadcrumb) que
        se muestra en cada sección del sitio web. Los cambios se reflejan inmediatamente en la web.
      </Subtitle>

      {toastMessage && (
        <div
          style={{
            background: 'var(--tn-acc-700)',
            color: '#fff',
            padding: '10px 18px',
            marginBottom: '16px',
            borderRadius: '2px',
            fontSize: '13px',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CheckCircle2 size={16} />
          {toastMessage}
        </div>
      )}

      {/* ── Barra Superior: Búsqueda, Restaurar y Nuevo ── */}
      <TopPanel>
        <SearchBox>
          <Search size={16} color="var(--tn-muted)" />
          <input
            type="text"
            placeholder="Buscar por ubicación, ruta o título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>

        <TopActions>
          <BtnSecondary onClick={() => setIsResetConfirmOpen(true)} title="Restaurar contenido inicial">
            <RotateCcw size={15} />
            Restaurar Valores Iniciales
          </BtnSecondary>

          <BtnPrimary onClick={handleNew}>
            <Plus size={16} />
            Nueva Cabecera
          </BtnPrimary>
        </TopActions>
      </TopPanel>

      {/* ── Filtros por categoría / sección ── */}
      <FilterTabs>
        {GRUPOS.map((g) => (
          <FilterTab
            key={g.id}
            $active={activeGroup === g.id}
            onClick={() => setActiveGroup(g.id)}
          >
            {g.label}
          </FilterTab>
        ))}
      </FilterTabs>

      {/* ── Cuadrícula de Cabeceras ── */}
      {loading ? (
        <Spinner />
      ) : filteredHeroes.length === 0 ? (
        <div
          style={{
            padding: '48px 24px',
            textAlign: 'center',
            background: 'var(--tn-surface, #fff)',
            border: '1px solid var(--tn-rule)',
            color: 'var(--tn-muted)',
            fontSize: '14px',
          }}
        >
          No se encontraron cabeceras para el filtro seleccionado.
        </div>
      ) : (
        <HeroesGrid>
          {filteredHeroes.map((hero) => {
            const previewImg = getResolvedImageUrl(hero.imagen) || '/assets/Santa_Catarina_372.jpg';
            return (
              <Card key={hero.id}>
                <CardHeader>
                  <CardLocation>
                    <LocationTitle title={hero.ubicacion}>{hero.ubicacion}</LocationTitle>
                    {hero.ruta && (
                      <LocationRoute
                        href={hero.ruta}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Ver página en sitio público"
                      >
                        {hero.ruta}
                        <ExternalLink size={11} />
                      </LocationRoute>
                    )}
                  </CardLocation>

                  <StatusPill
                    $active={hero.activo}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleToggleActivo(hero)}
                    title="Clic para cambiar estado"
                  >
                    {hero.activo ? 'Activa' : 'Inactiva'}
                  </StatusPill>
                </CardHeader>

                {/* Vista previa en miniatura de la cabecera */}
                <HeroMockup>
                  <HeroMockupBg
                    src={previewImg}
                    alt={hero.imagenAlt || hero.titulo}
                    $pos={hero.posicion}
                    loading="lazy"
                  />
                  <HeroMockupOverlay />
                  <HeroMockupContent>
                    {hero.tag && <MockupTag>{hero.tag}</MockupTag>}
                    <MockupTitle title={hero.titulo}>{hero.titulo}</MockupTitle>
                    {hero.subtitulo && (
                      <MockupSubtitle title={hero.subtitulo}>{hero.subtitulo}</MockupSubtitle>
                    )}
                  </HeroMockupContent>
                </HeroMockup>

                <CardBody>
                  <DetailRow>
                    <DetailLabel>Título</DetailLabel>
                    <DetailValue style={{ fontWeight: 600 }}>{hero.titulo}</DetailValue>
                  </DetailRow>

                  {hero.subtitulo && (
                    <DetailRow>
                      <DetailLabel>Subtítulo</DetailLabel>
                      <DetailValue style={{ fontSize: '12px', color: 'var(--tn-muted)' }}>
                        {hero.subtitulo}
                      </DetailValue>
                    </DetailRow>
                  )}

                  <DetailRow>
                    <DetailLabel>Clave de Sección</DetailLabel>
                    <DetailValue style={{ fontFamily: 'monospace', fontSize: '11.5px', color: 'var(--tn-acc-700)' }}>
                      {hero.seccion}
                    </DetailValue>
                  </DetailRow>
                </CardBody>

                <CardFooter>
                  <ActionBtn onClick={() => handleEdit(hero)}>
                    <Pencil size={13} />
                    Editar Cabecera
                  </ActionBtn>

                  <DangerBtn onClick={() => setDeleteTarget(hero)} title="Eliminar cabecera">
                    <Trash2 size={15} />
                  </DangerBtn>
                </CardFooter>
              </Card>
            );
          })}
        </HeroesGrid>
      )}

      {/* ── Modal de Edición / Creación de Cabecera ── */}
      {isModalOpen && editingHero && (
        <ModalOverlay onClick={() => !guardando && setIsModalOpen(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                <Layers size={17} color="var(--tn-acc-700)" />
                {editingHero.id
                  ? `Editar Cabecera: ${editingHero.ubicacion || editingHero.seccion}`
                  : 'Nueva Cabecera de Página'}
              </ModalTitle>
              <ModalCloseBtn onClick={() => !guardando && setIsModalOpen(false)} aria-label="Cerrar">
                <X size={18} />
              </ModalCloseBtn>
            </ModalHeader>

            <form onSubmit={handleSave}>
              <ModalBody>
                {/* ── Live Preview en Tiempo Real ── */}
                <LivePreviewBox>
                  <LivePreviewLabel>
                    <Sparkles size={13} />
                    Vista previa en tiempo real (Cómo se verá en la web)
                  </LivePreviewLabel>

                  <LiveHeroBanner>
                    <LiveBannerBg
                      src={
                        getResolvedImageUrl(editingHero.imagen) ||
                        '/assets/Santa_Catarina_372.jpg'
                      }
                      alt={editingHero.imagenAlt || editingHero.titulo || 'Hero Preview'}
                      $pos={editingHero.posicion}
                    />
                    <LiveBannerOverlay />
                    <LiveBannerContent>
                      {editingHero.tag && <LiveBannerTag>{editingHero.tag}</LiveBannerTag>}
                      <LiveBannerTitle>
                        {editingHero.titulo ? (
                          editingHero.titulo.split('\n').map((line, i) => (
                            <span key={i}>
                              {line}
                              {i < editingHero.titulo.split('\n').length - 1 && <br />}
                            </span>
                          ))
                        ) : (
                          <span style={{ opacity: 0.5 }}>[Título de la cabecera]</span>
                        )}
                      </LiveBannerTitle>
                      {editingHero.subtitulo && (
                        <LiveBannerSub>{editingHero.subtitulo}</LiveBannerSub>
                      )}
                    </LiveBannerContent>
                  </LiveHeroBanner>
                </LivePreviewBox>

                <FormGrid>
                  <FormGroup>
                    <FormLabel>Ubicación / Nombre de la Página *</FormLabel>
                    <Input
                      type="text"
                      placeholder="Ej: Vinos · Colección STA"
                      value={editingHero.ubicacion || ''}
                      onChange={(e) =>
                        setEditingHero((prev) => ({ ...prev, ubicacion: e.target.value }))
                      }
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Clave de Sección (Identificador único) *</FormLabel>
                    <Input
                      type="text"
                      placeholder="Ej: vinos-sta"
                      value={editingHero.seccion || ''}
                      onChange={(e) =>
                        setEditingHero((prev) => ({
                          ...prev,
                          seccion: e.target.value.toLowerCase().trim(),
                        }))
                      }
                      required
                      disabled={!!editingHero.id}
                      style={{
                        fontFamily: 'monospace',
                        background: editingHero.id ? 'var(--tn-n-100)' : undefined,
                      }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Ruta de la Página en la Web (URL)</FormLabel>
                    <Input
                      type="text"
                      placeholder="Ej: /vinos/coleccion-sta"
                      value={editingHero.ruta || ''}
                      onChange={(e) =>
                        setEditingHero((prev) => ({ ...prev, ruta: e.target.value }))
                      }
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Tag / Kicker superior (Dorado)</FormLabel>
                    <Input
                      type="text"
                      placeholder="Ej: NUESTRA COLECCIÓN · GAMA STA"
                      value={editingHero.tag || ''}
                      onChange={(e) =>
                        setEditingHero((prev) => ({ ...prev, tag: e.target.value }))
                      }
                    />
                  </FormGroup>

                  <FormGroup $fullWidth>
                    <FormLabel>Título Principal * (Admite salto de línea)</FormLabel>
                    <Input
                      type="text"
                      placeholder="Ej: Monovarietales Autóctonos"
                      value={editingHero.titulo || ''}
                      onChange={(e) =>
                        setEditingHero((prev) => ({ ...prev, titulo: e.target.value }))
                      }
                      required
                    />
                  </FormGroup>

                  <FormGroup $fullWidth>
                    <FormLabel>Subtítulo o Descripción de la cabecera</FormLabel>
                    <Textarea
                      placeholder="Ej: Manto Negro, Callet, Prensal Blanc y Giró Ros. La máxima pureza y nobleza..."
                      value={editingHero.subtitulo || ''}
                      onChange={(e) =>
                        setEditingHero((prev) => ({ ...prev, subtitulo: e.target.value }))
                      }
                    />
                  </FormGroup>

                  {/* ── Subida de Imagen con AdminImageUpload ── */}
                  <FormGroup $fullWidth>
                    <AdminImageUpload
                      label="Imagen de Fondo / Breadcrumb (Hero)"
                      subHelper="Formatos recomendados: JPG, WEBP, PNG. Resolución ideal: 1920x600px o superior."
                      value={editingHero.imagen || ''}
                      onChange={(newUrl) =>
                        setEditingHero((prev) => ({ ...prev, imagen: newUrl }))
                      }
                      previewHeight="160px"
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Posición de la Imagen (Alineación vertical)</FormLabel>
                    <Select
                      value={editingHero.posicion || 'center'}
                      onChange={(e) =>
                        setEditingHero((prev) => ({ ...prev, posicion: e.target.value }))
                      }
                    >
                      <option value="center">Centrada (center)</option>
                      <option value="center 58%">Ajustada Tienda (center 58%)</option>
                      <option value="top">Superior (top)</option>
                      <option value="bottom">Inferior (bottom)</option>
                      <option value="center 30%">Ligeramente arriba (center 30%)</option>
                      <option value="center 70%">Ligeramente abajo (center 70%)</option>
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Texto Alternativo de Imagen (Alt SEO)</FormLabel>
                    <Input
                      type="text"
                      placeholder="Ej: Bodega Santa Catarina · Finca Son Aloy"
                      value={editingHero.imagenAlt || ''}
                      onChange={(e) =>
                        setEditingHero((prev) => ({ ...prev, imagenAlt: e.target.value }))
                      }
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Orden de visualización</FormLabel>
                    <Input
                      type="number"
                      value={editingHero.orden || 0}
                      onChange={(e) =>
                        setEditingHero((prev) => ({
                          ...prev,
                          orden: parseInt(e.target.value, 10) || 0,
                        }))
                      }
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Estado</FormLabel>
                    <CheckboxLabel>
                      <input
                        type="checkbox"
                        checked={editingHero.activo}
                        onChange={(e) =>
                          setEditingHero((prev) => ({ ...prev, activo: e.target.checked }))
                        }
                      />
                      Cabecera activa y visible en la web
                    </CheckboxLabel>
                  </FormGroup>
                </FormGrid>
              </ModalBody>

              <ModalFooter>
                <BtnSecondary
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={guardando}
                >
                  Cancelar
                </BtnSecondary>
                <BtnPrimary type="submit" disabled={guardando}>
                  {guardando ? 'Guardando...' : 'Guardar Cambios'}
                </BtnPrimary>
              </ModalFooter>
            </form>
          </ModalBox>
        </ModalOverlay>
      )}

      {/* ── Modal de Confirmación de Eliminación ── */}
      <AdminConfirmModal
        isOpen={!!deleteTarget}
        title="Eliminar Cabecera"
        message={`¿Estás seguro de que deseas eliminar la cabecera de "${deleteTarget?.ubicacion}"? La página en la web volverá a sus valores predeterminados de código.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        danger
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* ── Modal de Confirmación de Restauración ── */}
      <AdminConfirmModal
        isOpen={isResetConfirmOpen}
        title="Restaurar Cabeceras a Valores Iniciales"
        message="¿Deseas restaurar todas las 16 cabeceras de página a sus títulos, subtítulos, etiquetas e imágenes originales? Esta acción sobrescribirá las modificaciones actuales."
        confirmText={resetting ? 'Restaurando...' : 'Restaurar Valores'}
        cancelText="Cancelar"
        danger={false}
        onConfirm={handleResetConfirm}
        onCancel={() => !resetting && setIsResetConfirmOpen(false)}
      />
    </AdminLayout>
  );
};

export default AdminHeroesList;
