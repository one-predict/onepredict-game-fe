import { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import _ from 'lodash';
import { GameCard, GameCardId } from '@api/GameCardApi';
import useAnimationEffect from '@hooks/useAnimationEffect';
import Loader from '@components/Loader';
import Typography from '@components/Typography';
import GameCardsGrid from '@components/GameCardsGrid';
import Button from '@components/Button';
import StackConfigurationCardPreview from './StackConfigurationCardPreview';
import DeckIcon from '@assets/icons/deck.svg?react';
import ArrowIcon from '@assets/icons/left-arrow.svg?react';
import LockIcon from '@assets/icons/lock.svg?react';
import styles from './CardsStackConfiguration.module.scss';

export interface CardsStackConfigurationProps {
  className?: string;
  stack: Record<string, number> | undefined;
  availableCardsSupply: Record<string, number> | undefined;
  cardsPool: Record<string, GameCard> | undefined;
  stackSlots: number | undefined;
  onObserveCard: (card: GameCard) => void;
  onSaveChanges: (cardsStack: Record<string, number>) => void;
  isCardUnavailable?: (card: GameCard, stack: Record<string, number>) => void;
  isStackSaveInProgress?: boolean;
  stackTitle?: string;
  availableCardsSectionTitle?: string;
}

const MINI_DECK_SHAKING_EFFECT_TIMEOUT = 300;

const CardsStackConfiguration = ({
  className,
  stackTitle = 'Cards',
  availableCardsSectionTitle,
  stack: derivedStack,
  stackSlots,
  availableCardsSupply,
  cardsPool,
  onSaveChanges,
  onObserveCard,
  isCardUnavailable,
  isStackSaveInProgress,
}: CardsStackConfigurationProps) => {
  const [stack, setStack] = useState<Record<string, number>>(derivedStack || {});
  const [expandStackPreview, setExpandStackPreview] = useState(false);

  const [shakeEffectId, showShakeEffect] = useAnimationEffect(MINI_DECK_SHAKING_EFFECT_TIMEOUT);

  useEffect(() => {
    if (derivedStack) {
      setStack(derivedStack);
    }
  }, [derivedStack]);

  const stackCardsCount = useMemo(() => {
    return Object.keys(stack).reduce((previousCount, cardId) => previousCount + stack[cardId], 0);
  }, [stack]);

  const isStackChanged = useMemo(() => {
    return !_.isEqual(derivedStack, stack);
  }, [derivedStack, stack]);

  const availableCards = useMemo(() => {
    if (!cardsPool || !availableCardsSupply) {
      return undefined;
    }

    return Object.keys(availableCardsSupply).map((cardId) => cardsPool[cardId]);
  }, [availableCardsSupply, cardsPool]);

  const checkCardUnavailable = useCallback(
    (card: GameCard) => {
      return stack[card.id] >= availableCardsSupply?.[card.id] || isCardUnavailable?.(card, stack);
    },
    [stack, availableCardsSupply, isCardUnavailable],
  );

  const checkIfEffectAllowed = useCallback(
    (card: GameCard) => {
      return !checkCardUnavailable(card) && stackCardsCount < stackSlots;
    },
    [checkCardUnavailable, stackCardsCount, stackSlots],
  );

  const handleCardClick = useCallback(
    (card: GameCard) => {
      if (checkCardUnavailable(card)) {
        return;
      }

      if (stackCardsCount >= stackSlots) {
        showShakeEffect();

        return;
      }

      setStack((previousStack) => ({
        ...previousStack,
        [card.id]: (previousStack[card.id] || 0) + 1,
      }));
    },
    [checkCardUnavailable, stackSlots, stackCardsCount, showShakeEffect],
  );

  const handleRemoveCardButtonClick = useCallback(
    (cardId: GameCardId) => {
      setStack((previousStack) => {
        if (previousStack[cardId] === 1) {
          const newStack = { ...previousStack };

          delete newStack[cardId];

          return newStack as Record<string, number>;
        }

        return { ...previousStack, [cardId]: previousStack[cardId] - 1 } as Record<string, number>;
      });
    },
    [setStack],
  );

  const handleSaveChangesButtonClick = useCallback(() => {
    onSaveChanges(stack);
  }, [onSaveChanges, stack]);

  if (!availableCardsSupply || !availableCards || !cardsPool || !stackSlots || !derivedStack) {
    return <Loader centered />;
  }

  const renderAvailableCardsSection = () => {
    if (availableCards.length === 0) {
      return (
        <Typography className={styles.noCardsText} alignment="center" variant="subtitle1">
          You don't have any available cards.
        </Typography>
      );
    }

    return (
      <GameCardsGrid
        onCardClick={handleCardClick}
        isEffectAllowed={checkIfEffectAllowed}
        gameCards={availableCards}
        onCardInfoIconClick={onObserveCard}
        renderPreviewCardOverlay={(card) => {
          if (!checkCardUnavailable(card)) {
            return null;
          }

          return (
            <div className={styles.previewCardOverlayContent}>
              <div className={styles.lockIconWrapper}>
                <LockIcon className={styles.lockIcon} />
              </div>
            </div>
          );
        }}
        renderPreviewCardFooter={(card) => {
          const quantity = availableCardsSupply?.[card.id] - (stack[card.id] || 0);

          return (
            <>
              <div className={styles.availableCardPreviewFooter}>
                <Typography variant="h6">
                  {quantity}/{availableCardsSupply?.[card.id]}
                </Typography>
              </div>
            </>
          );
        }}
      />
    );
  };

  const miniDeckPreviewComposedClassName = clsx(styles.miniDeckPreview, {
    [styles.shakingMiniDeckPreview]: shakeEffectId !== 0,
  });

  return (
    <div className={clsx(styles.cardsStackConfigurationContainer, className)}>
      <div key={shakeEffectId} onClick={() => setExpandStackPreview(true)} className={miniDeckPreviewComposedClassName}>
        <Typography variant="h3">{stackTitle}</Typography>
        <DeckIcon className={styles.deckIcon} />
        <Typography variant="h3">
          {stackCardsCount}/{stackSlots}
        </Typography>
      </div>
      <div className={clsx(styles.stackPreviewContainer, expandStackPreview && styles.visibleStackPreviewContainer)}>
        <ArrowIcon className={styles.arrowIcon} onClick={() => setExpandStackPreview(false)} />
        <Typography className={styles.cardsInfo} variant="h2">
          {stackTitle} {stackCardsCount}/{stackSlots}
        </Typography>
        <div className={styles.stackPreview}>
          {Object.keys(stack).map((cardId) => {
            const card = cardsPool[cardId];

            return (
              <StackConfigurationCardPreview
                key={card.id}
                quantity={stack[cardId]}
                card={card}
                onRemoveCardButtonClick={handleRemoveCardButtonClick}
              />
            );
          })}
          {stackCardsCount === 0 && (
            <Typography color="gray" className={styles.noCardsText} variant="h4">
              No {stackTitle}
            </Typography>
          )}
        </div>
      </div>
      <div className={styles.availableCardsContainer}>
        <Typography alignment="center" color="gradient1" variant="h2">
          {availableCardsSectionTitle}
        </Typography>
        {renderAvailableCardsSection()}
      </div>
      {isStackChanged && (
        <Button
          loading={isStackSaveInProgress}
          onClick={handleSaveChangesButtonClick}
          className={styles.saveChangesButton}
        >
          Save Changes
        </Button>
      )}
    </div>
  );
};

export default CardsStackConfiguration;
