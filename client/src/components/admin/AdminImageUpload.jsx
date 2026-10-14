import { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import {
  UploadCloud,
  Trash2,
  RefreshCw,
  ExternalLink,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
  Link as LinkIcon,
  CheckCircle2,
  X,
} from 'lucide-react';
import api, { getResolvedImageUrl } from '../../services/api';

// ── Styled Components ────────────────────────────────────────────────────────

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--tn-muted);
  display: flex;
  align-items: center;
  gap: 6px;
`;

const SubHelper = styled.span`
  font-size: 11px;
  color: var(--tn-muted);
  font-weight: 400;
  text-transform: none;
`;

const ModeToggleBtn = styled.button`
  background: none;
  border: none;
  font-size: 11px;
  color: var(--tn-acc-700);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  border-radius: 3px;
  transition: all 150ms ease;

  &:hover {
    background: var(--tn-acc-100);
    text-decoration: underline;
  }
`;

// Dropzone cuando no hay imagen
const DropZone = styled.div`
  position: relative;
  border: 2px dashed ${(p) => (p.$isDragging ? 'var(--tn-acc-700)' : 'var(--tn-rule)')};
  background: ${(p) => (p.$isDragging ? 'var(--tn-acc-100)' : 'var(--tn-bg)')};
  border-radius: 4px;
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: all 200ms ease;
  min-height: ${(p) => (p.$aspectRatio === 'bottle' ? '180px' : '150px')};

  &:hover {
    border-color: var(--tn-n-400);
    background: var(--tn-surface);
  }

  ${(p) =>
    p.$uploading &&
    css`
      pointer-events: none;
      opacity: 0.8;
    `}
`;

const IconCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--tn-surface);
  border: 1px solid var(--tn-line);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: var(--tn-acc-700);
  transition: transform 200ms ease;

  ${DropZone}:hover & {
    transform: translateY(-2px);
    background: var(--tn-acc-100);
  }
`;

const MainText = styled.p`
  margin: 0 0 4px;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--tn-text);

  span {
    color: var(--tn-acc-700);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

const FormatsBadge = styled.span`
  font-size: 11px;
  color: var(--tn-muted);
`;

// Preview card cuando sí hay imagen cargada
const PreviewCard = styled.div`
  position: relative;
  border: 1px solid var(--tn-rule);
  background: var(--tn-bg);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

const ImageDisplayArea = styled.div`
  position: relative;
  width: 100%;
  height: ${(p) => (p.$aspectRatio === 'bottle' ? '240px' : '200px')};
  background-color: #faf9f9;
  /* Patrón tenue de transparencia para destacar botellas con fondo transparente */
  background-image: 
    linear-gradient(45deg, #f0ebec 25%, transparent 25%),
    linear-gradient(-45deg, #f0ebec 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #f0ebec 75%),
    linear-gradient(-45deg, transparent 75%, #f0ebec 75%);
  background-size: 16px 16px;
  background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 250ms ease;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.08));

  ${PreviewCard}:hover & {
    transform: scale(1.02);
  }
`;

const ImageStatusBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(4px);
  border: 1px solid var(--tn-line);
  border-radius: 12px;
  padding: 3px 8px;
  font-size: 10.5px;
  font-weight: 600;
  color: var(--tn-verde-700);
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const ActionBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--tn-surface);
  border-top: 1px solid var(--tn-line);
  gap: 8px;
  flex-wrap: wrap;
`;

const UrlInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  color: var(--tn-muted);
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 500px) {
    max-width: 140px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
`;

const ActionBtn = styled.button`
  height: 30px;
  padding: 0 10px;
  font-size: 12px;
  font-weight: 500;
  font-family: var(--tn-font);
  border: 1px solid var(--tn-rule);
  background: var(--tn-bg);
  color: ${(p) => (p.$danger ? 'var(--tn-rojo-700)' : 'var(--tn-text)')};
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    background: ${(p) => (p.$danger ? 'var(--tn-rojo-100)' : 'var(--tn-n-100)')};
    border-color: ${(p) => (p.$danger ? 'var(--tn-rojo-700)' : 'var(--tn-n-400)')};
  }

  ${(p) =>
    p.$primary &&
    css`
      background: var(--tn-acc-700);
      color: #fff;
      border-color: var(--tn-acc-700);

      &:hover {
        background: var(--tn-acc-800);
        border-color: var(--tn-acc-800);
      }
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Loading overlay
const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 10;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--tn-acc-700);
`;

const SpinIcon = styled(Loader2)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Error banner
const ErrorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--tn-rojo-100);
  border: 1px solid #f8b4b4;
  border-radius: 3px;
  font-size: 12px;
  color: var(--tn-rojo-700);
`;

// Manual URL input area
const ManualInputRow = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  background: var(--tn-surface);
  padding: 8px;
  border: 1px solid var(--tn-rule);
  border-radius: 4px;
`;

const ManualInput = styled.input`
  flex: 1;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--tn-rule);
  border-radius: 3px;
  font-family: var(--tn-font);
  font-size: 12.5px;
  color: var(--tn-text);
  background: var(--tn-bg);
  outline: none;

  &:focus {
    border-color: var(--tn-acc-700);
  }
`;

// ── Component ────────────────────────────────────────────────────────────────

export default function AdminImageUpload({
  value = '',
  onChange,
  label = 'Imagen de Portada',
  helper = 'Formatos recomendados: PNG, JPG, WEBP. Máximo 10 MB.',
  aspectRatio = 'auto', // 'bottle' | 'landscape' | 'auto'
  id,
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showManualUrl, setShowManualUrl] = useState(false);
  const [manualUrlInput, setManualUrlInput] = useState('');
  const [imageLoadError, setImageLoadError] = useState(false);

  const fileInputRef = useRef(null);

  // Trigger file dialog
  const handleOpenFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Upload a selected file to the backend
  const uploadFile = async (file) => {
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecciona un archivo de imagen válido (JPG, PNG, WebP, GIF, SVG).');
      return;
    }

    // Validar tamaño (10 MB máx)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setError('La imagen supera el límite de 10 MB. Elige una imagen más liviana.');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      setImageLoadError(false);

      const formData = new FormData();
      formData.append('imagen', file);

      const res = await api.upload('/upload', formData);

      if (res && res.url) {
        if (typeof onChange === 'function') {
          onChange(res.url);
        }
      } else {
        throw new Error('Respuesta inesperada del servidor.');
      }
    } catch (err) {
      console.error('Error al subir imagen:', err);
      setError(err.message || 'Error al conectar con el servidor para subir la imagen.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // File input change
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  // Drag and Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  // Clear / remove current image
  const handleRemoveImage = () => {
    if (typeof onChange === 'function') {
      onChange('');
    }
    setImageLoadError(false);
    setError(null);
  };

  // Apply manual URL
  const handleApplyManualUrl = () => {
    if (!manualUrlInput.trim()) return;
    if (typeof onChange === 'function') {
      onChange(manualUrlInput.trim());
    }
    setManualUrlInput('');
    setShowManualUrl(false);
    setImageLoadError(false);
  };

  const hasImage = Boolean(value && value.trim() !== '');
  const resolvedUrl = hasImage ? getResolvedImageUrl(value) : '';

  return (
    <Container>
      {/* Label and quick actions */}
      <HeaderRow>
        <Label htmlFor={id}>
          <ImageIcon size={14} color="var(--tn-acc-700)" />
          {label}
        </Label>
        <ModeToggleBtn
          type="button"
          onClick={() => {
            setShowManualUrl(!showManualUrl);
            setManualUrlInput(value || '');
          }}
        >
          <LinkIcon size={12} />
          {showManualUrl ? 'Cerrar URL manual' : hasImage ? 'Editar URL' : 'O ingresar URL'}
        </ModeToggleBtn>
      </HeaderRow>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        id={id}
        accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/svg+xml, image/avif"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Manual URL Input dropdown / toggle */}
      {showManualUrl && (
        <ManualInputRow>
          <ManualInput
            type="text"
            placeholder="https://... o /uploads/... o /assets/..."
            value={manualUrlInput}
            onChange={(e) => setManualUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleApplyManualUrl();
              }
            }}
          />
          <ActionBtn type="button" $primary onClick={handleApplyManualUrl}>
            Aplicar
          </ActionBtn>
          <ActionBtn type="button" onClick={() => setShowManualUrl(false)}>
            <X size={13} />
          </ActionBtn>
        </ManualInputRow>
      )}

      {/* Main Image view or DropZone */}
      {hasImage ? (
        <PreviewCard>
          <ImageDisplayArea $aspectRatio={aspectRatio}>
            {uploading && (
              <LoadingOverlay>
                <SpinIcon size={24} />
                Subiendo nueva imagen...
              </LoadingOverlay>
            )}

            {!imageLoadError ? (
              <PreviewImage
                src={resolvedUrl}
                alt={label}
                onError={() => setImageLoadError(true)}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '16px', color: 'var(--tn-muted)' }}>
                <AlertCircle size={28} color="var(--tn-rojo-700)" style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--tn-text)' }}>
                  No se pudo cargar la vista previa
                </div>
                <div style={{ fontSize: '11px', marginTop: 4 }}>
                  URL: {value}
                </div>
              </div>
            )}

            <ImageStatusBadge>
              <CheckCircle2 size={12} /> Imagen lista
            </ImageStatusBadge>
          </ImageDisplayArea>

          <ActionBar>
            <UrlInfo title={value}>
              <LinkIcon size={12} />
              {value}
            </UrlInfo>

            <ButtonGroup>
              <ActionBtn
                type="button"
                onClick={handleOpenFileDialog}
                disabled={uploading}
                title="Seleccionar otra imagen de tu equipo"
              >
                <RefreshCw size={12} />
                Cambiar imagen
              </ActionBtn>

              <ActionBtn
                type="button"
                $danger
                onClick={handleRemoveImage}
                disabled={uploading}
                title="Eliminar esta imagen"
              >
                <Trash2 size={12} />
                Eliminar
              </ActionBtn>

              {resolvedUrl && (
                <ActionBtn
                  as="a"
                  href={resolvedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Abrir imagen en pestaña nueva"
                  style={{ textDecoration: 'none' }}
                >
                  <ExternalLink size={12} />
                </ActionBtn>
              )}
            </ButtonGroup>
          </ActionBar>
        </PreviewCard>
      ) : (
        <DropZone
          $isDragging={isDragging}
          $uploading={uploading}
          $aspectRatio={aspectRatio}
          onClick={handleOpenFileDialog}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {uploading ? (
            <LoadingOverlay>
              <SpinIcon size={28} />
              Subiendo imagen desde tu equipo...
            </LoadingOverlay>
          ) : (
            <>
              <IconCircle>
                <UploadCloud size={24} />
              </IconCircle>
              <MainText>
                Arrastra tu imagen aquí o <span>selecciona un archivo</span> de tu PC
              </MainText>
              <FormatsBadge>{helper}</FormatsBadge>
            </>
          )}
        </DropZone>
      )}

      {/* Error message if any */}
      {error && (
        <ErrorBox>
          <AlertCircle size={15} style={{ flexShrink: 0 }} />
          <span style={{ flex: 1 }}>{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
          >
            <X size={13} />
          </button>
        </ErrorBox>
      )}

      {!hasImage && helper && <SubHelper>{helper}</SubHelper>}
    </Container>
  );
}
