import clsx from 'clsx';
import { TokenOffer } from '@api/PortfolioOfferApi';
import Typography from '@components/Typography';
import { tokensLogoSrcMap } from '@app/data/tokens';
import styles from './TokenOfferLine.module.scss';

export interface TokenOfferLineProps {
  tokenOffer: TokenOffer;
  lineIndex: number;
  selectedToken?: string;
  onTokenSelect?: (token: string, lineIndex: number) => void;
}

const TokenOfferLine = ({ tokenOffer, selectedToken, onTokenSelect, lineIndex }: TokenOfferLineProps) => {
  const renderToken = (tokenName: string, tokenSrc: string, alt: string) => {
    const tokenClassName = clsx(styles.token, {
      [styles.selectedToken]: selectedToken === tokenName,
      [styles.selectableToken]: Boolean(onTokenSelect),
    });

    return (
      <div className={tokenClassName} onClick={() => onTokenSelect?.(tokenName, lineIndex)}>
        <img width={45} height={45} className={styles.tokenImage} src={tokenSrc} alt={alt} />
        <Typography className={styles.tokenName} variant="h6">
          {tokenName}
        </Typography>
      </div>
    );
  };

  return (
    <div className={styles.tokenOfferLine}>
      {renderToken(tokenOffer.firstToken, tokensLogoSrcMap[tokenOffer.firstToken], 'first token')}
      <Typography color="gradient1" variant="h1">
        OR
      </Typography>
      {renderToken(tokenOffer.secondToken, tokensLogoSrcMap[tokenOffer.secondToken], 'second token')}
    </div>
  );
};

export default TokenOfferLine;
