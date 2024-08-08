import { Onboarding } from '@components/Onboarding';
import { getOnboardingItems } from '@app/data/onboarding-items';

const OnboardingPage = () => {
  return (
    <>
      <Onboarding items={getOnboardingItems()} />
    </>
  );
};

export default OnboardingPage;
