import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none; /* Se oculta en mobile, se usarán en el MobileMenu */
  }
`;

const IconButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }

  svg {
    width: 20px;
    height: 20px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const GiftIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13" />
    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
  </svg>
);

const BagIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const NavButtons = () => {
  return (
    <ButtonsContainer>
      <IconButton to="/tienda" title="Tarjetas de regalo">
        <GiftIcon />
      </IconButton>
      <IconButton to="/vinos" title="Nuestros Vinos">
        <BagIcon />
      </IconButton>
    </ButtonsContainer>
  );
};

export default NavButtons;
