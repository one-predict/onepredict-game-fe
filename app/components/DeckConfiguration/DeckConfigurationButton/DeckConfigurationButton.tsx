import clsx from 'clsx';
import styles from './DeckConfigurationButton.module.scss';
import { useRef } from 'react';

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
  const containerRef = useRef<HTMLDivElement | null>(null);

  const shouldShowInteractionIcon = index === deckCardsCount;
  const isActive = isCardSelectingInProgress && index === deckCardsCount;

  const handleDeckCardButtonClick = () => {
    if (index === deckCardsCount) {
      onAddDeckCardButtonClick();
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className={clsx(styles.deckConfigurationButton, isActive && styles.activeDeckConfigurationButton)}
      onClick={handleDeckCardButtonClick}
      key={index}
    >
      {shouldShowInteractionIcon ? <div className={styles.interactiveIcon} /> : null}
    </div>
  );
};

export default DeckConfigurationButton;
