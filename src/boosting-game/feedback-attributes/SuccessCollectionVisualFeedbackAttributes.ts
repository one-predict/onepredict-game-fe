import TemporaryVisualFeedbackType from '@app/enums/TemporaryVisualFeedbackType';

export interface SuccessCollectionVisualFeedbackAttributes {
  type: TemporaryVisualFeedbackType.SuccessCollection;
  score: number;
}

export default SuccessCollectionVisualFeedbackAttributes;
