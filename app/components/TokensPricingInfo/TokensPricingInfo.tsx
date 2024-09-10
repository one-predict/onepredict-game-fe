import _ from 'lodash';
import clsx from 'clsx';
import { CoinsPricingInfo } from '@api/CoinsPricingInfoApi';
import TokenType from '@enums/TokenType';
import Typography from '@components/Typography';
import ColoredPoints from '@components/ColoredPoints';
import TokenImage from '@components/TokenImage';
import { getDateFromUnixTimestamp } from '@utils/date';
import styles from './TokensPricingInfo.module.scss';
import TimeAge from '@components/TimeAgo';

export interface TokensPricingInfoProps {
  className?: string;
  tokens: TokenType[];
  info: CoinsPricingInfo;
}

const PRICE_ROUND = 4;
const PERCENTAGE_ROUND = 2;

const TokensPricingInfo = ({ className, tokens, info }: TokensPricingInfoProps) => {
  return (
    <div className={clsx(styles.tokensPricingInfoContainer, className)}>
      {tokens.map((token) => {
        const lastUpdated = getDateFromUnixTimestamp(info.pricingDetails[token].lastUpdateTimestamp);

        return (
          <div className={styles.singleTokenPricingInfo}>
            <TimeAge date={lastUpdated} color="gray" variant="subtitle2" className={styles.lastUpdated} />
            <div className={styles.logoContainer}>
              <TokenImage token={token} />
            </div>
            <div>
              <Typography className={styles.tokenName} variant="h3" color="gradient1">
                {_.capitalize(token)}
              </Typography>
              <div className={styles.pricingLine}>
                <Typography variant="h6">Price:</Typography>
                <Typography variant="subtitle2" color="yellow">
                  ${_.round(info.pricingDetails[token].price, PRICE_ROUND)}
                </Typography>
              </div>
              <div className={styles.pricingLine}>
                <Typography variant="h6">24H Price Change:</Typography>
                <ColoredPoints
                  variant="subtitle2"
                  postfix="%"
                  hideTriangle
                  points={_.round(info.pricingDetails[token].percentChange24h, PERCENTAGE_ROUND)}
                />
              </div>
              <div className={styles.pricingLine}>
                <Typography variant="h6">1H Price Change:</Typography>
                <ColoredPoints
                  alignment="right"
                  variant="subtitle2"
                  postfix="%"
                  hideTriangle
                  points={_.round(info.pricingDetails[token].percentChange1h, PERCENTAGE_ROUND)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TokensPricingInfo;
