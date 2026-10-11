import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

// ── Animaciones ───────────────────────────────────────────────────────────────

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-6px); }
  40%       { transform: translateX(6px); }
  60%       { transform: translateX(-4px); }
  80%       { transform: translateX(4px); }
`;

// ── Estilos ───────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  animation: ${fadeIn} 200ms ease forwards;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  &.error {
    animation: ${shake} 0.4s ease;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--tn-muted);
`;

const Input = styled.input`
  height: 36px;
  padding: 0 12px;
  border: 1px solid ${(p) => (p.$hasError ? 'var(--tn-rojo-700)' : 'var(--tn-rule)')};
  border-radius: 0;
  font-family: var(--tn-font);
  font-size: 14px;
  color: var(--tn-text);
  background: var(--tn-bg);
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease;
  width: 100%;

  &:hover {
    border-color: var(--tn-n-400);
  }

  &:focus {
    border-color: var(--tn-acc);
    box-shadow: inset 0 0 0 1px var(--tn-acc);
  }

  &::placeholder {
    color: var(--tn-n-400);
    font-size: 13px;
  }
`;

const SubmitButton = styled.button`
  margin-top: 4px;
  height: 38px;
  padding: 0 14px;
  background: var(--tn-acc-700);
  color: #fff;
  border: none;
  border-radius: 0;
  font-family: var(--tn-font);
  font-size: 13.5px;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: background 150ms ease;
  width: 100%;

  &:hover:not(:disabled) {
    background: var(--tn-acc-800);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const InfoNotice = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  line-height: 1.4;
  color: #855d14;
  background: #fef9ed;
  border: 1px solid #eedda5;
  border-left: 3px solid #c89528;
  padding: 10px 12px;
`;

const ErrorMsg = styled.p`
  font-size: 13px;
  color: var(--tn-rojo-700);
  padding: 10px 14px;
  background: var(--tn-rojo-100);
  border: 1px solid var(--tn-line);
  border-left: 3px solid var(--tn-rojo-700);
`;

// ── Componente ────────────────────────────────────────────────────────────────

const LoginForm = () => {
  const [searchParams] = useSearchParams();
  const motivoExpirado = searchParams.get('motivo') === 'expirado';

  const [email, setEmail] = useState('admin@bodegasantacatarina.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [formShaking, setFormShaking] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      const { token } = await api.post('/auth/login', { email, password });
      login(token);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
      setFormShaking(true);
      setTimeout(() => setFormShaking(false), 500);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Wrapper>
      <Form
        onSubmit={handleSubmit}
        className={formShaking ? 'error' : ''}
        noValidate
      >
        {motivoExpirado && (
          <InfoNotice role="status">
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>Tu sesión ha expirado o no es válida. Por favor, iniciá sesión nuevamente.</span>
          </InfoNotice>
        )}

        {error && <ErrorMsg role="alert">{error}</ErrorMsg>}

        <FormGroup>
          <Label htmlFor="login-email">
            <Mail size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Email
          </Label>
          <Input
            id="login-email"
            type="email"
            placeholder="admin@bodegasantacatarina.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            $hasError={Boolean(error)}
            required
            autoComplete="email"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="login-password">
            <Lock size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            Contraseña
          </Label>
          <Input
            id="login-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            $hasError={Boolean(error)}
            required
            autoComplete="current-password"
          />
        </FormGroup>

        <SubmitButton type="submit" disabled={cargando} id="btn-login-submit">
          <LogIn size={15} strokeWidth={2} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};

export default LoginForm;
