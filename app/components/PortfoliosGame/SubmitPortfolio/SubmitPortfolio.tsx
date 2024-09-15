import { useCallback, useState } from 'react';
import { TokensOffer, TokenDirection } from '@api/TokensOfferApi';
import { PortfolioSelectedToken } from '@api/PortfolioApi';
import useLatestCompletedCoinsHistory from '@hooks/queries/useLatestCompletedCoinsHistory';
import { SubmitButton } from '@components/Button';
import Typography from '@components/Typography';
import TokensCard from '@components/PortfoliosGame/TokensCard';
import TimeRemaining from '@components/TimeRemaining';
import styles from './SubmitPortfolio.module.scss';

export interface SubmitPortfolioProps {
  offer: TokensOffer;
  onSubmit: (offerId: string, selectedTokens: PortfolioSelectedToken[]) => void;
  isSubmitInProgress?: boolean;
}

const MAX_TOKENS_PER_PORTFOLIO = 6;

const SubmitPortfolio = ({ offer, onSubmit, isSubmitInProgress }: SubmitPortfolioProps) => {
  const [selectedTokens, setSelectedTokens] = useState<PortfolioSelectedToken[]>([]);

  const { data: coinsHistoricalRecords } = useLatestCompletedCoinsHistory();

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
        Pick {MAX_TOKENS_PER_PORTFOLIO} Tokens
      </Typography>
      <Typography alignment="center" className={styles.submitPortfolioDescription} variant="body1">
        Select if token will go{' '}
        <Typography color="green" uppercase tag="span">
          Up
        </Typography>{' '}
        or{' '}
        <Typography uppercase color="red" tag="span">
          Down
        </Typography>
        !
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
      <TokensCard
        className={styles.chooseTokensCard}
        availableTokens={offer.tokens}
        selectedTokens={selectedTokens}
        onTokenClick={handleTokenClick}
        onTokenDirectionSelect={handleTokenDirectionSelect}
        coinsHistoricalRecords={coinsHistoricalRecords}
      />
      {selectedTokens.length === MAX_TOKENS_PER_PORTFOLIO && (
        <SubmitButton
          className={styles.submitButton}
          onClick={() => onSubmit(offer.id, selectedTokens)}
          loading={isSubmitInProgress}
        >
          Submit
        </SubmitButton>
      )}
    </div>
  );
};

export default SubmitPortfolio;
