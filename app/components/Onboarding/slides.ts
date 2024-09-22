import { OnboardingSlideData } from './OnboardingSlide';
import { TOKEN_NAME } from '@constants/token';

const onboardingSlides: OnboardingSlideData[] = [
  {
    title: 'Create your portfolio',
    description: `Create portfolios of 6 diverse tokens and earn ${TOKEN_NAME} coins based on market moves`,
    image: {
      src: '/images/onboarding/onboarding-1.png',
      height: 300,
      width: 390,
    },
  },
  {
    title: 'Apply for Tournaments',
    description: `Create portfolios of 6 diverse tokens and earn ${TOKEN_NAME} coins based on market moves`,
    image: {
      src: '/images/onboarding/onboarding-2.png',
      height: 300,
      width: 390,
    },
  },
  {
    title: 'Gaming cards',
    description: `Build a winning strategy with powerful cards. Hedge your portfolio's exposure to crypto market fluctuations and win more!`,
    image: {
      src: '/images/onboarding/onboarding-3.png',
      height: 300,
      width: 350,
    },
  },
];

export default onboardingSlides;
