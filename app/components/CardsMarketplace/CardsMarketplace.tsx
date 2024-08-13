import { GameCard } from '@api/GameCardApi';
import Typography from '@components/Typography';
import GameCardsGrid from '@components/GameCardsGrid';
import styles from './CardsMarketplace.module.scss';

export interface CardsMarketplaceProps {
  className?: string;
  gameCards: GameCard[];
  onCardClick: (card: GameCard) => void;
  isCardPurchased: (card: GameCard) => boolean;
}

const CardsMarketplace = ({ isCardPurchased, gameCards, onCardClick, className }: CardsMarketplaceProps) => {
  return (
    <GameCardsGrid
      className={className}
      gameCards={gameCards}
      onCardClick={onCardClick}
      previewCardClassName={styles.marketplaceGameCardPreview}
      renderPreviewCardFooter={(card) => (
        <div className={styles.gameCardPreviewFooterContent}>
          {isCardPurchased(card) ? (
            <Typography variant="h5" color="primary">
              Purchased
            </Typography>
          ) : (
            <>
              <img src="/images/mini-aipick-coin.png" alt="mini-aipick-coin" />
              <Typography variant="h5" color="primary">
                {card.price}
              </Typography>
            </>
          )}
        </div>
      )}
    />
  );
};

export default CardsMarketplace;
