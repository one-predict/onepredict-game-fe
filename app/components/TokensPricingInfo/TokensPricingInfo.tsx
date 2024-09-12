import _ from 'lodash';
import clsx from 'clsx';
import { CoinsPricingInfo } from '@api/CoinsPricingInfoApi';
import TokenType from '@enums/TokenType';
import Typography from '@components/Typography';
import ColoredPoints from '@components/ColoredPoints';
import TokenImage from '@components/TokenImage';
import styles from './TokensPricingInfo.module.scss';
import TokenChartImage from '../TokenChartImage';

export interface TokensPricingInfoProps {
  className?: string;
  tokens: TokenType[];
  info: CoinsPricingInfo;
}

const PERCENTAGE_ROUND = 2;

const TokensPricingInfo = ({ className, tokens, info }: TokensPricingInfoProps) => {
  return (
    <div className={clsx(styles.tokensPricingInfoContainer, className)}>
      {tokens.map((token) => {
        const points = _.round(info.pricingDetails[token].percentChange24h, PERCENTAGE_ROUND)
        return (
          <div className={styles.singleTokenPricingInfo}>
            <div className={styles.logoContainer}>
              <TokenImage token={token} className={styles.tokenImage} />
            </div>
            <div>
              <Typography className={styles.tokenName} variant="subtitle2" color="primary">
                {_.upperCase(token)}
              </Typography>
              <div className={styles.pricingLine}>
                <ColoredPoints
                  variant="subtitle2"
                  postfix="%"
                  hideTriangle
                  points={points}
                />
              </div>
            </div>
            <TokenChartImage points={points} className={styles.tokenChartImage} />
          </div>
        );
      })}

    </div>
  );
};

export default TokensPricingInfo;
