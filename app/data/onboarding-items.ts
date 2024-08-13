import { IOnboardingItem } from '@components/Onboarding';

export const getOnboardingItems = (): IOnboardingItem[] => {
  return [
    {
      title: 'Create your portfolio',
      description: `Select 6 tokens you believe will perform well in the next 24 hours. 
Track their performance and earn AiPick points every day!`,
      image: '/images/onboarding/onboarding-1.png',
    },
    {
      title: 'Apply for Tournaments',
      description: `Compete in thrilling tournaments and climb the ranks. Win maximum AiPick from the prize pool.`,
      image: '/images/onboarding/onboarding-2.png',
    },
    {
      title: 'Gaming cards',
      description: `Build a winning strategy with powerful cards. Hedge your portfolio's exposure to crypto market fluctuations and win more!`,
      image: '/images/onboarding/onboarding-3.png',
    },
    {
      title: 'Active Points',
      description: `Take action with your camera and supercharge your portfolio tokens. Be active, earn more, and reap the rewards.`,
      image: '/images/onboarding/onboarding-4.png',
    },
  ];
};
