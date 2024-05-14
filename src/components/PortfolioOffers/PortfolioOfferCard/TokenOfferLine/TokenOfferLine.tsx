import styled from 'styled-components';
import { TokenOffer } from '@api/PortfolioOfferApi';
import Typography from '@components/Typography';
import { tokensLogoSrcMap } from "@app/data/tokens";

export interface TokenOfferLineProps {
  tokenOffer: TokenOffer;
  selectedTokens?: string[];
}

const StyledTokenContainer = styled.div<{
  $selected?: boolean;
  $withGrayscale?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 110px;

  ${({ $withGrayscale }) => {
    return $withGrayscale ? `
      filter: grayscale(100%);
      opacity: 0.25;
    ` : '';
  }}
  
  & > p {
    color: ${({ theme, $selected }) => $selected ? theme.palette.seaGreen : theme.palette.white};
  }
  
  & > img {
    border: 2px solid ${({ theme, $selected }) => $selected ? theme.palette.seaGreen : theme.palette.white};
  }
`;

const StyledTokenOfferLineContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.white};
`;

const StyledTokenLogo = styled.img`
  width: 45px;
  height: 45px;
  margin-bottom: 8px;
  box-sizing: border-box;
  border-radius: 50%;

  @media (${({ theme }) => theme.devices.tablet}) {
    width: 60px;
    height: 60px;
  }
`;

const TokenOfferLine = ({
  tokenOffer,
  selectedTokens,
}: TokenOfferLineProps) => {
  const renderToken = (tokenName: string, tokenSrc: string, alt: string) => {
    const selected = selectedTokens?.includes(tokenName);

    return (
      <StyledTokenContainer $selected={selected} $withGrayscale={selectedTokens && !selected}>
        <StyledTokenLogo
          src={tokenSrc}
          alt={alt}
        />
        <Typography variant="body2">{tokenName}</Typography>
      </StyledTokenContainer>
    );
  };

  return (
    <StyledTokenOfferLineContainer>
      {renderToken(
        tokenOffer.firstToken,
        tokensLogoSrcMap[tokenOffer.firstToken],
        'first token',
      )}
      <Typography variant="h2">vs</Typography>
      {renderToken(
        tokenOffer.secondToken,
        tokensLogoSrcMap[tokenOffer.secondToken],
        'second token',
      )}
    </StyledTokenOfferLineContainer>
  );
};

export default TokenOfferLine;
