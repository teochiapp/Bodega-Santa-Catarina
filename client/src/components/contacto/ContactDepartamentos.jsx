import styled from 'styled-components';

const SectionWrapper = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors?.background || '#F2ECE4'};
  box-sizing: border-box;
`;

const Container = styled.div`
  max-width: 1240px;
  margin: clamp(3.5rem, 5vw, 4.5rem) auto clamp(4rem, 6vw, 6rem) auto;
  padding: 0 clamp(1.5rem, 4vw, 3rem);
  box-sizing: border-box;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
  font-size: clamp(1.8rem, 2.5vw, 2.3rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  margin: 0 0 2rem 0;
  line-height: 1.2;
`;

const DeptList = styled.div`
  width: 100%;
  border-top: 1px solid rgba(80, 43, 58, 0.14);
`;

const DeptRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.15rem 0;
  border-bottom: 1px solid rgba(80, 43, 58, 0.14);
  box-sizing: border-box;
  transition: background-color 0.2s ease;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.45rem;
    padding: 1rem 0;
  }
`;

const DeptName = styled.span`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
`;

const DeptEmails = styled.div`
  display: flex;
  gap: clamp(1rem, 2.5vw, 2.5rem);
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const EmailLink = styled.a`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.86rem;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  text-decoration: none;
  transition: color 0.2s ease;
  word-break: break-all;

  &:hover {
    color: ${({ theme }) => theme.colors?.secondary || '#BA9C74'};
    text-decoration: underline;
  }
`;

const departamentos = [
  {
    nombre: 'ENOTURISMO',
    emails: [
      'lfunes@bodegasantacatarina.com',
      'enoturismo@bodegasantacatarina.com'
    ]
  },
  {
    nombre: 'DIRECCIÓN',
    emails: ['bfesitosa@bodegasantacatarina.com']
  },
  {
    nombre: 'ADMINISTRACIÓN',
    emails: ['administracion@bodegasantacatarina.com']
  },
  {
    nombre: 'COMERCIAL',
    emails: ['comercial@bodegasantacatarina.com']
  },
  {
    nombre: 'ENOLOGÍA Y BODEGA',
    emails: ['laboratorio@bodegasantacatarina.com']
  },
  {
    nombre: 'VIÑEDOS',
    emails: ['tmayrata@bodegasantacatarina.com']
  }
];

const ContactDepartamentos = () => {
  return (
    <SectionWrapper>
      <Container>
        <SectionTitle>Contactos por departamento</SectionTitle>
        <DeptList>
          {departamentos.map((dept) => (
            <DeptRow key={dept.nombre}>
              <DeptName>{dept.nombre}</DeptName>
              <DeptEmails>
                {dept.emails.map((email) => (
                  <EmailLink key={email} href={`mailto:${email}`}>
                    {email}
                  </EmailLink>
                ))}
              </DeptEmails>
            </DeptRow>
          ))}
        </DeptList>
      </Container>
    </SectionWrapper>
  );
};

export default ContactDepartamentos;
