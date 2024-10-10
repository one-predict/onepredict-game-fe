import { PredictionChoice } from '@api/PredictionChoiceApi';
import PreviousRoundsListItem from './PreviousRoundsListItem';
import styles from './PreviousRoundsList.module.scss';

export interface PreviousRoundsListProps {
  choices: PredictionChoice[];
}

const PreviousRoundsList = ({ choices }: PreviousRoundsListProps) => {
  return (
    <div className={styles.previousRoundListContainer}>
      {choices.map((choice) => (
        <PreviousRoundsListItem key={choice.id} choice={choice} />
      ))}
    </div>
  );
};

export default PreviousRoundsList;
