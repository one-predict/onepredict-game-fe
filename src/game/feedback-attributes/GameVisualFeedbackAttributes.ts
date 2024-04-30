import SuccessCollectionVisualFeedbackAttributes from "./SuccessCollectionVisualFeedbackAttributes.ts";
import MissedCollectionVisualFeedbackAttributes from "./MissedCollectionVisualFeedbackAttributes.ts";

export type GameVisualFeedbackAttributes =
  | SuccessCollectionVisualFeedbackAttributes
  | MissedCollectionVisualFeedbackAttributes;
