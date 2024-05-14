import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { PortfolioOffer } from '@app/api/PortfolioOfferApi';
import LayeredCard from '@app/components/LayeredCard';
import Button from '@app/components/Button';
import Typography from '@app/components/Typography';
import LayeredLogo from '@app/components/LayeredLogo';
import { tokensLogoSrcMap } from '@app/data/tokens';

export interface ChoosePortfolioProps {
  offer: PortfolioOffer;
  onSubmit: (offerId: string, selectedTokens: string[]) => void;
  onResetButtonClick: () => void;
  isPortfolioCreationInProgress: boolean;
}

const StyledTokenChoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTokenLogo = styled.img`
  width: 55px;
  height: 55px;
  margin-bottom: 16px;

  @media (${({ theme }) => theme.devices.tablet}) {
    width: 80px;
    height: 80px;
  }
`;

const ChoosePortfolioContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 38px;

  @media (${({ theme }) => theme.devices.laptop}) {
    flex-direction: row;
    align-items: center;
    row-gap: 0;
    column-gap: 72px;
  }
`;

const VersusLayeredCard = styled(LayeredCard)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 265px;
  color: ${({ theme }) => theme.palette.white};

  @media (${({ theme }) => theme.devices.tablet}) {
    width: 300px;
    height: 400px;
  }
`;

const StyledSelectTokenButton = styled(Button)`
  min-width: 250px;

  @media (${({ theme }) => theme.devices.tablet}) {
    min-width: 350px;
  }
`;

const StyledFinalActionButton = styled(Button)`
  min-width: 347px;
`;

const ChoosePortfolio = ({
  offer,
  onResetButtonClick,
  onSubmit,
  isPortfolioCreationInProgress,
}: ChoosePortfolioProps) => {
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);

  const selectToken = useCallback((token: string) => {
    setSelectedTokens((previousTokens) => [...previousTokens, token]);
  }, []);

  const handleSubmitButtonClick = useCallback(() => {
    onSubmit(offer.id, selectedTokens);
  }, [offer.id, selectedTokens, onSubmit]);

  const renderTokenChoice = (token: string) => {
    return (
      <StyledTokenChoiceContainer>
        <StyledTokenLogo
          src={tokensLogoSrcMap[token]}
          alt={`${token} selection choice`}
        />
        <StyledSelectTokenButton onClick={() => selectToken(token)}>
          {token}
        </StyledSelectTokenButton>
      </StyledTokenChoiceContainer>
    );
  };

  const renderTokenSelectionStep = () => {
    const { firstToken, secondToken } =
      offer.tokenOffers[selectedTokens.length];

    return (
      <>
        {renderTokenChoice(firstToken)}
        <VersusLayeredCard>
          <Typography variant="h1">vs</Typography>
        </VersusLayeredCard>
        {renderTokenChoice(secondToken)}
      </>
    );
  };

  const renderSubmitPortfolioStep = () => {
    return (
      <>
        <StyledFinalActionButton loading={isPortfolioCreationInProgress} onClick={handleSubmitButtonClick}>
          Submit
        </StyledFinalActionButton>
        <LayeredLogo />
        <StyledFinalActionButton onClick={onResetButtonClick}>
          Reset
        </StyledFinalActionButton>
      </>
    );
  };

  return (
    <ChoosePortfolioContainer>
      {offer.tokenOffers.length > selectedTokens.length
        ? renderTokenSelectionStep()
        : renderSubmitPortfolioStep()}
    </ChoosePortfolioContainer>
  );
};

export default ChoosePortfolio;
