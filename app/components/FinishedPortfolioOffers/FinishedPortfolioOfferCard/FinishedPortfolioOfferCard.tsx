import { useState } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Collapse from 'react-collapse';
import { PortfolioOffer } from '@api/PortfolioOfferApi';
import { Portfolio } from '@api/PortfolioApi';
import Typography from '@components/Typography';
import PortfolioOfferCard from '@components/PortfolioOfferCard';
import ExpandIcon from '@assets/icons/expand.svg?react';
import CrossIcon from '@assets/icons/cross.svg?react';
import ColoredPoints from '@components/ColoredPoints';
import styles from './FinishedPortfolioOfferCard.module.scss';

export interface FinishedPortfolioOfferCardProps {
  offer: PortfolioOffer;
  portfolio: Portfolio | null;
}

const getNoResultsText = (portfolio: Portfolio | null) => {
  if (!portfolio) {
    return 'No Results';
  }

  return !portfolio.isAwarded ? 'Waiting for results...' : '';
};

const FinishedPortfolioOfferCard = ({ offer, portfolio }: FinishedPortfolioOfferCardProps) => {
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
          <Collapse className={styles.collapseContainer} isOpened={expanded}>
            <PortfolioOfferCard offer={offer} selectedTokensMap={portfolio?.selectedTokens || []} />
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

export default FinishedPortfolioOfferCard;
