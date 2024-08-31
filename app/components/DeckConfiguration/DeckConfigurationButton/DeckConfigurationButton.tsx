import clsx from 'clsx';
import styles from './DeckConfigurationButton.module.scss';

export interface DeckConfigurationButtonProps {
  index: number;
  deckCardsCount: number;
  onAddDeckCardButtonClick: () => void;
  isCardSelectingInProgress?: boolean;
}

const DeckConfigurationButton = ({
  index,
  deckCardsCount,
  isCardSelectingInProgress,
  onAddDeckCardButtonClick,
}: DeckConfigurationButtonProps) => {
  const shouldShowInteractionIcon = index === deckCardsCount;
  const isActive = isCardSelectingInProgress && index === deckCardsCount;

  const handleDeckCardButtonClick = () => {
    if (index === deckCardsCount) {
      onAddDeckCardButtonClick();
    }
  };

  return (
    <div
      className={clsx(styles.deckConfigurationButton, isActive && styles.activeDeckConfigurationButton)}
      onClick={handleDeckCardButtonClick}
      key={index}
    >
      {shouldShowInteractionIcon ? <div className={styles.interactiveIcon} /> : null}
    </div>
  );
};

export default DeckConfigurationButton;
