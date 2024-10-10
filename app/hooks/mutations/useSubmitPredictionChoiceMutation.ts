import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { DefaultError, useMutation, useQueryClient } from '@tanstack/react-query';
import { usePredictionChoiceApi } from '@providers/ApiProvider';
import { PredictionChoice, SubmitPredictionChoiceParams } from '@api/PredictionChoiceApi';

const useSubmitPredictionChoiceMutation = () => {
  const predictionChoiceApi = usePredictionChoiceApi();

  const queryClient = useQueryClient();

  const handleMutationSuccess = useCallback(
    async (choice: PredictionChoice) => {
      await queryClient.invalidateQueries({ queryKey: ['prediction-choices', { my: true }] });

      toast.success(`Your choice for #${choice.round} round was submitted.`);
    },
    [queryClient],
  );

  return useMutation<PredictionChoice, DefaultError, SubmitPredictionChoiceParams>({
    mutationFn: (params: SubmitPredictionChoiceParams) => predictionChoiceApi.submitChoice(params),
    onSuccess: handleMutationSuccess,
  });
};

export default useSubmitPredictionChoiceMutation;
