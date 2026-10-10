import styled from 'styled-components';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const MapContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
  }
`;

const CountryList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CountryButton = styled.button`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.background};
  color: ${({ active, theme }) => active ? theme.colors.surface : theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  &:hover {
    background-color: ${({ active, theme }) => active ? theme.colors.primary : '#e8e2d3'};
  }
`;

const DistributorInfo = styled(motion.div)`
  flex: 2;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 8px;
  border-left: 4px solid ${({ theme }) => theme.colors.secondary};
`;

const DistributorName = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const WebsiteLink = styled.a`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-decoration: underline;
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const MapaInternacional = () => {
  const [activeCountry, setActiveCountry] = useState('Alemania');

  const distributors = {
    'Alemania': { name: 'Wein & Vinos', desc: 'Distribuidor principal en toda Alemania.', url: '#' },
    'Suiza': { name: 'Swiss Wine Imports', desc: 'Especialistas en vinos mediterráneos.', url: '#' },
    'Bélgica': { name: 'Belgian Cellars', desc: 'Distribución para hostelería.', url: '#' },
    'Canadá': { name: 'Maple Vine', desc: 'Importadores exclusivos en Ontario.', url: '#' },
    'Italia': { name: 'Vino d\'Autore', desc: 'Selección de vinos de autor europeos.', url: '#' },
    'Península (España)': { name: 'Peninsular Vinos', desc: 'Cobertura nacional en toda España peninsular.', url: '#' },
  };

  return (
    <Section>
      <Title>Distribución Internacional</Title>
      <MapContainer>
        <CountryList>
          {Object.keys(distributors).map(country => (
            <CountryButton 
              key={country} 
              active={activeCountry === country}
              onClick={() => setActiveCountry(country)}
            >
              {country}
            </CountryButton>
          ))}
        </CountryList>
        <AnimatePresence mode="wait">
          <DistributorInfo
            key={activeCountry}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DistributorName>{distributors[activeCountry].name}</DistributorName>
            <p>{distributors[activeCountry].desc}</p>
            <WebsiteLink href={distributors[activeCountry].url} target="_blank" rel="noopener noreferrer">
              Visitar sitio web
            </WebsiteLink>
          </DistributorInfo>
        </AnimatePresence>
      </MapContainer>
    </Section>
  );
};

export default MapaInternacional;
