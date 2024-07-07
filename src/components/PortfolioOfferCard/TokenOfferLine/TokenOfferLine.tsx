import styled from 'styled-components';
import { TokenOffer } from '@api/PortfolioOfferApi';
import Typography, { GradientTypography } from '@components/Typography';
import { tokensLogoSrcMap } from '@app/data/tokens';

export interface TokenOfferLineProps {
  tokenOffer: TokenOffer;
  lineIndex: number;
  selectedToken?: string;
  onTokenSelect?: (token: string, lineIndex: number) => void;
}

const StyledTokenContainer = styled.div<{
  $selected?: boolean;
  $selectable?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 110px;
  cursor: ${({ $selectable }) => $selectable ? 'pointer' : 'default'};
  
  & > h6 {
    color: ${({ theme, $selected }) => $selected ? theme.palette.white : '#626262'};
  }
  
  & > img {
    border: 1px solid ${({ theme, $selected }) => $selected ? theme.palette.white : '#626262'};
    filter: ${({ $selected }) => $selected ? 'none' : 'grayscale(100%)'};
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
  background: linear-gradient(139.83deg, rgba(220, 216, 255, 0.2) 13.92%, rgba(10, 0, 104, 0.2) 86.22%);

  @media (${({ theme }) => theme.devices.tablet}) {
    width: 60px;
    height: 60px;
  }
`;

const TokenOfferLine = ({
  tokenOffer,
  selectedToken,
  onTokenSelect,
  lineIndex,
}: TokenOfferLineProps) => {
  const renderToken = (tokenName: string, tokenSrc: string, alt: string) => {
    return (
      <StyledTokenContainer
        onClick={() => onTokenSelect?.(tokenName, lineIndex)}
        $selected={selectedToken === tokenName}
        $selectable={Boolean(onTokenSelect)}
      >
        <StyledTokenLogo
          src={tokenSrc}
          alt={alt}
        />
        <Typography variant="h6">{tokenName}</Typography>
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
      <GradientTypography variant="h1">OR</GradientTypography>
      {renderToken(
        tokenOffer.secondToken,
        tokensLogoSrcMap[tokenOffer.secondToken],
        'second token',
      )}
    </StyledTokenOfferLineContainer>
  );
};

export default TokenOfferLine;
