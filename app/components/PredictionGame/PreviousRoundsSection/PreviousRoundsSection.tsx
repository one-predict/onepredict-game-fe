import Collapse from 'react-collapse';
import { useState } from 'react';
import clsx from 'clsx';
import { PredictionChoice } from '@api/PredictionChoiceApi';
import Typography from '@components/Typography';
import PreviousRoundsList from '@components/PredictionGame/PreviousRoundsList';
import PredictionGameSection from '@components/PredictionGame/PredictionGameSection';
import ChevronIcon from '@assets/icons/chevron.svg?react';
import styles from './PreviousRoundsSection.module.scss';

export interface PreviousRoundsSectionProps {
  previousRoundsChoices: PredictionChoice[];
}

const PreviousRoundsSection = ({ previousRoundsChoices }: PreviousRoundsSectionProps) => {
  const [showPreviousRounds, setShowPreviousRounds] = useState(true);

  return (
    <PredictionGameSection>
      <Typography variant="h4">Previous Rounds</Typography>
      {!!previousRoundsChoices.length && (
        <ChevronIcon
          onClick={() => setShowPreviousRounds(!showPreviousRounds)}
          className={clsx(styles.chevronIcon, showPreviousRounds && styles.rotatedChevronIcon)}
        />
      )}
      {previousRoundsChoices.length ? (
        <Collapse.UnmountClosed isOpened={showPreviousRounds}>
          <PreviousRoundsList choices={previousRoundsChoices} />
        </Collapse.UnmountClosed>
      ) : (
        <Typography variant="subtitle2" color="secondary">
          The results of your predictions will be shown here.
        </Typography>
      )}
    </PredictionGameSection>
  );
};

export default PreviousRoundsSection;
