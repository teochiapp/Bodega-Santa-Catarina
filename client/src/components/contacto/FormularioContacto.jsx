import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const SectionWrapper = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background || 'rgb(242, 236, 228)'};
  box-sizing: border-box;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(3.5rem, 6vw, 5.5rem) clamp(1.5rem, 4vw, 3.5rem);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(3rem, 5vw, 5rem);
  align-items: start;
  box-sizing: border-box;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
`;

/* ─── COLUMNA IZQUIERDA: FORMULARIO ─── */
const FormColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(203, 160, 82)'};
  text-transform: uppercase;
  margin: 0 0 12px 0;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2rem, 3.2vw, 2.75rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 0 0 2rem 0;
  line-height: 1.15;

  span {
    display: inline-block;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

const RowTwoCols = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin-bottom: 6px;
  text-transform: uppercase;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  background-color: #FFFFFF;
  border: 1px solid rgba(80, 43, 58, 0.16);
  border-radius: 2px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 200ms ease, box-shadow 200ms ease;

  &::placeholder {
    color: rgba(80, 43, 58, 0.4);
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
    box-shadow: 0 0 0 2px rgba(194, 164, 120, 0.18);
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.85rem 2.5rem 0.85rem 1rem;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  background-color: #FFFFFF;
  border: 1px solid rgba(80, 43, 58, 0.16);
  border-radius: 2px;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
  appearance: none;
  transition: border-color 200ms ease, box-shadow 200ms ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
    box-shadow: 0 0 0 2px rgba(194, 164, 120, 0.18);
  }
`;

const SelectCaret = styled.span`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.7;

  svg {
    width: 12px;
    height: 12px;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.85rem 1rem;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  background-color: #FFFFFF;
  border: 1px solid rgba(80, 43, 58, 0.16);
  border-radius: 2px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 200ms ease, box-shadow 200ms ease;
  resize: vertical;
  min-height: 130px;

  &::placeholder {
    color: rgba(80, 43, 58, 0.4);
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
    box-shadow: 0 0 0 2px rgba(194, 164, 120, 0.18);
  }
`;

const SubmitBtn = styled.button`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.71rem;
  letter-spacing: 0.2em;
  font-weight: 700;
  padding: 1.05rem;
  background-color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  color: rgb(242, 236, 228);
  border: none;
  cursor: pointer;
  margin-top: 4px;
  width: 100%;
  text-transform: uppercase;
  transition: background-color 200ms ease, transform 150ms ease;

  &:hover {
    background-color: #643547;
  }

  &:active {
    transform: scale(0.99);
  }
`;

const PrivacyText = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.74rem;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.6;
  opacity: 0.88;
  margin: 4px 0 0 0;
`;

const SuccessNotification = styled(motion.div)`
  background-color: #2e7d32;
  color: #FFFFFF;
  padding: 1rem 1.25rem;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.88rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

/* ─── COLUMNA DERECHA: TARJETAS REGALO, CÓMO LLEGAR Y SÍGUENOS ─── */
const SideColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const GiftCardBox = styled.div`
  background: rgb(244, 242, 235);
  border: 1px solid rgb(224, 221, 213);
  border-radius: 8px;
  padding: 1.6rem;
  margin-bottom: 2.25rem;
`;

const GiftEyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.66rem;
  letter-spacing: 0.2em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  margin: 0 0 10px 0;
  text-transform: uppercase;
`;

const GiftTitle = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: 1.21rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 0 0 8px 0;
  line-height: 1.25;
`;

const GiftDescription = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.86rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.9;
  margin: 0 0 12px 0;
`;

const GiftLink = styled.a`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.71rem;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  text-decoration: underline;
  font-weight: 600;
  display: inline-block;
  transition: opacity 150ms ease;

  &:hover {
    opacity: 0.8;
  }
`;

const DirectionsSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const DirectionsHeading = styled.h3`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: 1.41rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 0 0 1.25rem 0;
`;

const DirectionItem = styled.div`
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(203, 160, 82, 0.18);

  &:last-of-type {
    border-bottom: 1px solid rgba(203, 160, 82, 0.18);
  }
`;

const DirectionTitle = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 0 0 4px 0;
`;

const DirectionDescription = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.84rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.9;
  margin: 0;
`;

const SocialSection = styled.div`
  margin-top: 1.75rem;
`;

const SocialLabel = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 0 0 14px 0;
  text-transform: uppercase;
`;

const SocialButtonsList = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const SocialPill = styled.a`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  border: 1px solid rgba(203, 160, 82, 0.35);
  padding: 0.45rem 0.95rem;
  text-decoration: none;
  background-color: transparent;
  border-radius: 2px;
  transition: all 200ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
    color: #FFFFFF;
    border-color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  }
`;

const FormularioContacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    asunto: 'general',
    mensaje: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset visual tras 6 segundos
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        nombre: '',
        telefono: '',
        email: '',
        asunto: 'general',
        mensaje: '',
      });
    }, 6000);
  };

  return (
    <SectionWrapper>
      <Container>
        {/* ── COLUMNA IZQUIERDA ── */}
        <FormColumn
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow>ESCRÍBENOS</Eyebrow>
          <Title>
            <span>¿En qué podemos</span>
            <br />
            <span>ayudarte?</span>
          </Title>

          <AnimatePresence>
            {submitted && (
              <SuccessNotification
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                ¡Gracias por escribirnos! Tu mensaje ha sido enviado con éxito. Nos pondremos en contacto contigo a la brevedad.
              </SuccessNotification>
            )}
          </AnimatePresence>

          <Form onSubmit={handleSubmit}>
            <RowTwoCols>
              <FormGroup>
                <Label htmlFor="input-nombre">NOMBRE *</Label>
                <Input
                  id="input-nombre"
                  name="nombre"
                  type="text"
                  required
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="input-telefono">TELÉFONO</Label>
                <Input
                  id="input-telefono"
                  name="telefono"
                  type="tel"
                  placeholder="+34 ..."
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </FormGroup>
            </RowTwoCols>

            <FormGroup>
              <Label htmlFor="input-email">EMAIL *</Label>
              <Input
                id="input-email"
                name="email"
                type="email"
                required
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="input-asunto">ASUNTO</Label>
              <SelectWrapper>
                <Select
                  id="input-asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                >
                  <option value="general">Consulta general</option>
                  <option value="enoturismo">Reserva de experiencia</option>
                  <option value="eventos">Eventos y bodas</option>
                  <option value="tienda">Consulta sobre tienda física</option>
                  <option value="regalo">Tarjeta regalo</option>
                  <option value="prensa">Prensa y comunicación</option>
                </Select>
                <SelectCaret aria-hidden="true">
                  <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </SelectCaret>
              </SelectWrapper>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="input-mensaje">MENSAJE *</Label>
              <Textarea
                id="input-mensaje"
                name="mensaje"
                required
                rows="5"
                placeholder="Cuéntanos cómo podemos ayudarte..."
                value={formData.mensaje}
                onChange={handleChange}
              />
            </FormGroup>

            <SubmitBtn type="submit">
              ENVIAR MENSAJE
            </SubmitBtn>

            <PrivacyText>
              Al enviar este formulario aceptas nuestra política de privacidad. Tus datos serán tratados exclusivamente para responder a tu consulta.
            </PrivacyText>
          </Form>
        </FormColumn>

        {/* ── COLUMNA DERECHA ── */}
        <SideColumn
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Tarjetas Regalo */}
          <GiftCardBox>
            <GiftEyebrow>TARJETAS REGALO</GiftEyebrow>
            <GiftTitle>Disponibles en formato físico y digital</GiftTitle>
            <GiftDescription>
              Canjeables por cualquiera de nuestras experiencias — catas, visitas guiadas, experiencias gastronómicas... Válidas 12 meses. Contáctanos para solicitar tu tarjeta regalo.
            </GiftDescription>
            <GiftLink href="mailto:info@bodegasantacatarina.com">
              info@bodegasantacatarina.com
            </GiftLink>
          </GiftCardBox>

          {/* Cómo llegar */}
          <DirectionsSection>
            <DirectionsHeading>Cómo llegar</DirectionsHeading>

            <DirectionItem>
              <DirectionTitle>En coche</DirectionTitle>
              <DirectionDescription>
                Desde Palma: dirección Inca por la MA-13, salida Sencelles. 30 minutos desde el centro de Palma.
              </DirectionDescription>
            </DirectionItem>

            <DirectionItem>
              <DirectionTitle>Desde el aeropuerto</DirectionTitle>
              <DirectionDescription>
                Aeropuerto de Palma de Mallorca (PMI) a 35 km. Recomendamos alquilar un vehículo o solicitar transfer privado.
              </DirectionDescription>
            </DirectionItem>

            <DirectionItem>
              <DirectionTitle>Transfer privado</DirectionTitle>
              <DirectionDescription>
                Organizamos transfers desde tu hotel o el aeropuerto. Consúltalo al reservar tu experiencia.
              </DirectionDescription>
            </DirectionItem>
          </DirectionsSection>

          {/* Síguenos */}
          <SocialSection>
            <SocialLabel>SÍGUENOS</SocialLabel>
            <SocialButtonsList>
              <SocialPill
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </SocialPill>
              <SocialPill
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </SocialPill>
              <SocialPill
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </SocialPill>
              <SocialPill
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
              </SocialPill>
            </SocialButtonsList>
          </SocialSection>
        </SideColumn>
      </Container>
    </SectionWrapper>
  );
};

export default FormularioContacto;
