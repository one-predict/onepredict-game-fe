import SuccessCollectionVisualFeedbackAttributes from './SuccessCollectionVisualFeedbackAttributes';
import MissedCollectionVisualFeedbackAttributes from './MissedCollectionVisualFeedbackAttributes';

export type GameVisualFeedbackAttributes =
  | SuccessCollectionVisualFeedbackAttributes
  | MissedCollectionVisualFeedbackAttributes;
