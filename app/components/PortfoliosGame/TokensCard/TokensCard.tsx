import { useMemo, useState } from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import { CoinsHistoricalRecord } from '@api/CoinsHistoryApi';
import { TokenDirection } from '@api/TokensOfferApi';
import { PortfolioSelectedToken } from '@api/PortfolioApi';
import useCoinsSparklinePoints from '@hooks/useCoinsSparklinePoints';
import PortfolioGameTokenImage from '@components/PortfoliosGame/PortfolioGameTokenImage';
import ColoredPoints from '@components/ColoredPoints';
import Typography from '@components/Typography';
import TokenPointsSparkline from '@components/TokenPointsSparkline';
import TimeAge from '@components/TimeAgo';
import Switch from '@components/Switch';
import BoldArrowIcon from '@assets//icons/bold-arrow.svg?react';
import { getDateFromUnixTimestamp } from '@utils/date';
import styles from './TokensCard.module.scss';

export interface TokensCardProps {
  className?: string;
  availableTokens: string[];
  selectedTokens: PortfolioSelectedToken[];
  onTokenClick?: (token: string) => void;
  onTokenDirectionSelect?: (token: string, direction: TokenDirection) => void;
  coinsHistoricalRecords?: CoinsHistoricalRecord[];
}

const PERCENTAGE_ROUND = 2;

const TokensCard = ({
  availableTokens,
  selectedTokens,
  onTokenClick,
  className,
  onTokenDirectionSelect,
  coinsHistoricalRecords,
}: TokensCardProps) => {
  const [showPricingInfo, setShowPricingInfo] = useState(false);

  const selectedTokensMap = useMemo(() => {
    return _.keyBy(selectedTokens, 'id');
  }, [selectedTokens]);

  const sparklinePointsByCoin = useCoinsSparklinePoints(coinsHistoricalRecords);

  const renderTokenFront = (token: string) => {
    const isTokenSelected = selectedTokensMap[token];
    const tokenDirection = selectedTokensMap[token]?.direction;

    return (
      <div className={clsx(styles.tokenFront, isTokenSelected && styles.selectedTokenFront)} key={token}>
        {isTokenSelected && (
          <div
            onClick={() => onTokenDirectionSelect?.(token, 'growth')}
            className={clsx(styles.growthButton, {
              [styles.selectedGrowthButton]: tokenDirection === 'growth',
              [styles.nonSelectedDirectionButton]: tokenDirection !== 'growth' && !onTokenDirectionSelect,
            })}
          >
            <div className={styles.directionButtonContent}>
              <BoldArrowIcon className={styles.arrow} />
              Moon
            </div>
          </div>
        )}
        <div onClick={() => onTokenClick?.(token)} className={styles.tokenInformation}>
          <PortfolioGameTokenImage className={styles.tokenFrontImage} token={token} />
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
              <BoldArrowIcon className={styles.arrow} />
              Doom
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTokenBack = (token: string) => {
    if (!sparklinePointsByCoin || !coinsHistoricalRecords) {
      return null;
    }

    const periodOpenPrice = coinsHistoricalRecords[0].prices[token];
    const periodClosePrice = coinsHistoricalRecords[coinsHistoricalRecords.length - 1].prices[token];

    const percentageDifference = ((periodClosePrice - periodOpenPrice) / periodOpenPrice) * 100;

    return (
      <div className={styles.tokenBack}>
        <PortfolioGameTokenImage className={styles.tokenBackImage} token={token} />
        <Typography variant="subtitle2" color="primary">
          {_.upperCase(token)}
        </Typography>
        <ColoredPoints
          variant="subtitle2"
          postfix="%"
          hideTriangle
          points={_.round(percentageDifference, PERCENTAGE_ROUND)}
        />
        <div className={styles.sparklinesContainer}>
          <TokenPointsSparkline positive={percentageDifference >= 0} data={sparklinePointsByCoin[token]} />
        </div>
      </div>
    );
  };

  const renderCoinsHistoryPeriodInformation = () => {
    if (!coinsHistoricalRecords || !showPricingInfo) {
      return null;
    }

    const lastUpdateTimestamp = coinsHistoricalRecords[coinsHistoricalRecords.length - 1].timestamp;

    return (
      <div className={styles.coinsHistoryPeriodInformation}>
        <TimeAge variant="subtitle2" color="gray" date={getDateFromUnixTimestamp(lastUpdateTimestamp)} />
        <Typography variant="subtitle2" color="gray">
          ({coinsHistoricalRecords.length - 1}H)
        </Typography>
      </div>
    );
  };

  return (
    <div className={clsx(styles.tokensCard, className)}>
      {renderCoinsHistoryPeriodInformation()}
      {coinsHistoricalRecords && (
        <Switch
          checked={showPricingInfo}
          onChange={() => setShowPricingInfo(!showPricingInfo)}
          label="Prices"
          className={styles.pricingSwitch}
        />
      )}
      <div className={styles.tokensGrid}>
        {availableTokens.map((token) => {
          return (
            <div key={token} className={styles.token}>
              <div className={clsx(styles.tokenInnerWrapper, showPricingInfo && styles.flippedTokenInnerWrapper)}>
                {renderTokenFront(token)}
                {renderTokenBack(token)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TokensCard;
