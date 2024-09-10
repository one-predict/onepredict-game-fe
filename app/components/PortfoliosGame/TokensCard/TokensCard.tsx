import { useMemo } from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import { TokenDirection } from '@api/TokensOfferApi';
import TokenImage from '@components/TokenImage';
import BoldArrow from '@assets//icons/bold-arrow.svg?react';
import { PortfolioSelectedToken } from '@api/PortfolioApi';
import styles from './TokensCard.module.scss';

export interface TokensCardProps {
  className?: string;
  availableTokens: string[];
  selectedTokens: PortfolioSelectedToken[];
  onTokenClick?: (token: string) => void;
  onTokenDirectionSelect?: (token: string, direction: TokenDirection) => void;
}

const TokensCard = ({
  availableTokens,
  selectedTokens,
  onTokenClick,
  className,
  onTokenDirectionSelect,
}: TokensCardProps) => {
  const selectedTokensMap = useMemo(() => {
    return _.keyBy(selectedTokens, 'id');
  }, [selectedTokens]);

  return (
    <div className={clsx(styles.tokensCard, className)}>
      {availableTokens.map((token) => {
        const isTokenSelected = selectedTokensMap[token];
        const tokenDirection = selectedTokensMap[token]?.direction;

        return (
          <div className={clsx(styles.token, isTokenSelected && styles.selectedToken)} key={token}>
            {isTokenSelected && (
              <div
                onClick={() => onTokenDirectionSelect?.(token, 'growth')}
                className={clsx(styles.growthButton, {
                  [styles.selectedGrowthButton]: tokenDirection === 'growth',
                  [styles.nonSelectedDirectionButton]: tokenDirection !== 'growth' && !onTokenDirectionSelect,
                })}
              >
                <div className={styles.directionButtonContent}>
                  <BoldArrow className={styles.arrow} />
                  Moon
                </div>
              </div>
            )}
            <div onClick={() => onTokenClick?.(token)} className={styles.tokenInformation}>
              <TokenImage className={styles.tokenImage} token={token} />
              {token}
            </div>
            {isTokenSelected && (
              <div
                onClick={() => onTokenDirectionSelect?.(token, 'falling')}
                className={clsx(styles.fallButton, {
                  [styles.selectedFallButton]: tokenDirection === 'falling',
                  [styles.nonSelectedDirectionButton]: tokenDirection !== 'falling' && !onTokenDirectionSelect,
                })}
              >
                <div className={styles.directionButtonContent}>
                  <BoldArrow className={styles.arrow} />
                  Doom
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TokensCard;
