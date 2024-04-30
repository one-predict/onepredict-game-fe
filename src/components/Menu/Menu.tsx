import styled from 'styled-components';
import backgroundLarge from "../../assets/background-large.png";
import Button from "../Button";
import Typography from "../Typography";
import Header from "../Header/Header.tsx";


const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
`;

const StyledMenuCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  width: 380px;
  border: 2px solid #AD3ED0;
  padding: 32px 21px;
  border-radius: 24px;
  
  @media (${({ theme }) => theme.devices.tablet}) {
    width: 546px;
    padding: 32px 21px;
  }
`;

const StyledBackgroundImage = styled.img`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  z-index: -1;
`;

const StyledGameMenuButton = styled(Button)`
  margin-top: 24px;
  width: 100%;

  @media (${({ theme }) => theme.devices.tablet}) {
    width: unset;
  }
`;

const StyledReadyToPlayTypography = styled(Typography)`
  margin-top: 20px;
`;

export interface MenuProps {
  username: string;
  onStartGameClick: () => void;
}

const Menu = ({ username, onStartGameClick }: MenuProps) => {
  return (
    <StyledMenu>
      <Header />
      <StyledMenuCard>
        <Typography variant="h1">Hello, {username}!</Typography>
        <StyledReadyToPlayTypography variant="h5">Ready to play? Click to the button</StyledReadyToPlayTypography>
        <StyledGameMenuButton onClick={onStartGameClick}>Start Game</StyledGameMenuButton>
      </StyledMenuCard>
      <StyledBackgroundImage src={backgroundLarge} />
    </StyledMenu>
  );
};

export default Menu;
