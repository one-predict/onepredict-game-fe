import { useCallback, useState } from 'react';
import TokenType from '@enums/TokenType';
import { TokensOffer, TokenDirection } from '@api/TokensOfferApi';
import useCoinsPricingInfoQuery from '@hooks/queries/useCoinsPricingInfoQuery';
import { PortfolioSelectedToken } from '@api/PortfolioApi';
import { SubmitButton } from '@components/Button';
import Typography from '@components/Typography';
import TokensCard from '@components/PortfoliosGame/TokensCard';
import TimeRemaining from '@components/TimeRemaining';
import Popup from '@components/Popup';
import TokensPricingInfo from '@components/TokensPricingInfo';
import Loader from "@components/Loader";
import DollarIcon from '@assets/icons/dollar.svg?react';
import styles from './SubmitPortfolio.module.scss';

export interface SubmitPortfolioProps {
  offer: TokensOffer;
  onSubmit: (offerId: string, selectedTokens: PortfolioSelectedToken[]) => void;
  isSubmitInProgress?: boolean;
}

const MAX_TOKENS_PER_PORTFOLIO = 6;

const SubmitPortfolio = ({ offer, onSubmit, isSubmitInProgress }: SubmitPortfolioProps) => {
  const [selectedTokens, setSelectedTokens] = useState<PortfolioSelectedToken[]>([]);
  const [showPricingInfo, setShowPricingInfo] = useState(false);

  const { data: pricingInfo } = useCoinsPricingInfoQuery();

  const handleTokenClick = useCallback(
    (token: string) => {
      setSelectedTokens((previousSelectedTokens) => {
        const hasToken = previousSelectedTokens.some((selectedToken) => selectedToken.id === token);

        if (hasToken) {
          return previousSelectedTokens.filter((selectedToken) => selectedToken.id !== token);
        }

        if (previousSelectedTokens.length >= MAX_TOKENS_PER_PORTFOLIO) {
          const [, ...restTokens] = previousSelectedTokens;

          return [...restTokens, { id: token, direction: 'growth' }];
        }

        return [...previousSelectedTokens, { id: token, direction: 'growth' }];
      });
    },
    [setSelectedTokens],
  );

  const handleTokenDirectionSelect = useCallback(
    (token: string, direction: TokenDirection) => {
      setSelectedTokens((previousSelectedTokens) => {
        return previousSelectedTokens.map((selectedToken) => {
          if (selectedToken.id === token) {
            return { ...selectedToken, direction };
          }

          return selectedToken;
        });
      });
    },
    [setSelectedTokens],
  );

  return (
    <div className={styles.submitPortfolioContainer}>
      <Typography color="gradient1" variant="h1">
        Make your choice
      </Typography>
      <Typography alignment="center" className={styles.submitPortfolioDescription} variant="body1">
        Choose {MAX_TOKENS_PER_PORTFOLIO} coins you want to add to your portfolio
      </Typography>
      <TimeRemaining unixTimestamp={offer.timestamp}>
        {({ remainingDays, remainingHours, remainingMinutes }) => {
          return (
            <Typography color="yellow" alignment="center" variant="body2">
              Offer ends in {remainingDays}d {remainingHours}h {remainingMinutes}m
            </Typography>
          );
        }}
      </TimeRemaining>
      <div onClick={() => setShowPricingInfo(true)} className={styles.pricesSection}>
        <Typography variant="h6">Prices</Typography>
        <DollarIcon className={styles.dollarIcon} />
      </div>
      <TokensCard
        className={styles.chooseTokensCard}
        availableTokens={offer.tokens}
        selectedTokens={selectedTokens}
        onTokenClick={handleTokenClick}
        onTokenDirectionSelect={handleTokenDirectionSelect}
      />
      <SubmitButton
        disabled={selectedTokens.length !== MAX_TOKENS_PER_PORTFOLIO}
        onClick={() => onSubmit(offer.id, selectedTokens)}
        loading={isSubmitInProgress}
      >
        Submit
      </SubmitButton>
      <Popup isOpen={showPricingInfo} onClose={() => setShowPricingInfo(false)}>
        <Typography variant="h1" color="primary">
          Tokens Info
        </Typography>
        {pricingInfo ? (
          <TokensPricingInfo
            className={styles.tokensPricingInfo}
            tokens={offer.tokens as TokenType[]}
            info={pricingInfo}
          />
        ) : (
          <Loader centered />
        )}
      </Popup>
    </div>
  );
};

export default SubmitPortfolio;
