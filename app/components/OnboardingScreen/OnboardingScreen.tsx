import { useCallback } from 'react';
import useOnboardUserMutation from '@hooks/mutations/useOnboardUserMutation';
import { PageLayout } from '@components/Layouts';
import Onboarding from '@components/Onboarding';

const OnboardingScreen = () => {
  const { mutateAsync: finishUserOnboarding } = useOnboardUserMutation();

  const handleOnboardingComplete = useCallback(async () => {
    await finishUserOnboarding(undefined);
  }, [finishUserOnboarding]);

  return (
    <PageLayout>
      <Onboarding onBoardingComplete={handleOnboardingComplete} />
    </PageLayout>
  );
};

export default OnboardingScreen;
