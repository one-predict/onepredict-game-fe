import { useState } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Collapse from 'react-collapse';
import { TokensOffer } from '@api/TokensOfferApi';
import { Portfolio } from '@api/PortfolioApi';
import Typography from '@components/Typography';
import PortfolioCard from '@components/PortfoliosGame/PortfolioCard';
import ColoredPoints from '@components/ColoredPoints';
import ExpandIcon from '@assets/icons/expand.svg?react';
import CrossIcon from '@assets/icons/cross.svg?react';
import styles from './FinishedTokensOfferCard.module.scss';

export interface FinishedTokensOfferCardProps {
  offer: TokensOffer;
  portfolio: Portfolio | null;
}

const getNoResultsText = (portfolio: Portfolio | null) => {
  if (!portfolio) {
    return 'No Results';
  }

  return !portfolio.isAwarded ? 'Waiting for results...' : '';
};

const FinishedTokensOfferCard = ({ offer, portfolio }: FinishedTokensOfferCardProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const formattedDate = dayjs(offer.date).format('YYYY-MM-DD');

  return (
    <div
      className={clsx(styles.finishedPortfolioOfferCard, {
        [styles.expandedFinishedPortfolioOfferCard]: expanded,
      })}
    >
      {expanded && (
        <Typography color="gradient1" variant="h1">
          Your points
        </Typography>
      )}
      <Typography className={styles.offerDate} variant="subtitle2">
        {formattedDate}
      </Typography>
      {portfolio && portfolio.isAwarded && portfolio.earnedCoins ? (
        <>
          <ColoredPoints points={portfolio.earnedCoins} />
          <Collapse theme={{ collapse: styles.collapseContainer, content: styles.collapseContent }} isOpened={expanded}>
            <PortfolioCard portfolio={portfolio} />
          </Collapse>
        </>
      ) : (
        <>
          <Typography variant="subtitle1">{getNoResultsText(portfolio)}</Typography>
        </>
      )}
      {portfolio && portfolio.isAwarded && (
        <div className={styles.toggleIconContainer} onClick={() => setExpanded(!expanded)}>
          {expanded ? <CrossIcon /> : <ExpandIcon />}
        </div>
      )}
    </div>
  );
};

export default FinishedTokensOfferCard;
