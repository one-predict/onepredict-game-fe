import styled from 'styled-components';
import LayeredLogo from '@components/LayeredLogo';
import Button from '@components/Button';

export interface MenuProps {
  onCreatePortfolioButtonClick: () => void;
  onBoostPointsButtonClick: () => void;
}

const StyledMenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 38px;

  @media (${({ theme }) => theme.devices.tablet}) {
    flex-direction: row;
    align-items: center;
    row-gap: 0;
    column-gap: 72px;
  }

  @media (max-width: 1400px) {
    display: flex;
    flex-direction: column;
    row-gap: 38px;
  }
`;

const CreatePortfolioButton = styled(Button)`
  width: 100%;

  @media (${({ theme }) => theme.devices.tablet}) {
    width: 440px;
  }
`;

const BoostPointsButton = styled(Button)`
  width: 100%;

  @media (${({ theme }) => theme.devices.tablet}) {
    width: 440px;
  }
`;

const Menu = ({
  onCreatePortfolioButtonClick,
  onBoostPointsButtonClick,
}: MenuProps) => {
  return (
    <StyledMenuContainer>
      <CreatePortfolioButton onClick={onCreatePortfolioButtonClick}>
        Create Portfolio
      </CreatePortfolioButton>
      <LayeredLogo />
      <BoostPointsButton onClick={onBoostPointsButtonClick}>
        Boost Points
      </BoostPointsButton>
    </StyledMenuContainer>
  );
};

export default Menu;
