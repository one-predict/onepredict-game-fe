import styles from './NextButton.module.scss';

interface NextButtonProps {
  onClick: () => void;
  percentage: number;
}
export const NextButton = ({ onClick, percentage = 0 }: NextButtonProps) => {
  const fixedPercentage = Math.min(100, percentage + 15);
  const gradientStyle = {
    background: fixedPercentage < 100 ? `conic-gradient(transparent 0, #FFFFFF ${fixedPercentage}%)` : 'transparent',
  };

  return (
    <a onClick={onClick} className={styles.nextButton}>
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.44531 12H20.4453M20.4453 12L14.4453 6M20.4453 12L14.4453 18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={styles.gradientBorder} style={gradientStyle}></span>
    </a>
  );
};
