import styles from './LevelProgressBar.module.scss';

export interface LevelProgressBarProps {
  size?: number;
  progress?: number;
  level?: number;
}

const LevelProgressBar = ({ size = 80, progress = 0, level = 1 }: LevelProgressBarProps) => {
  const strokeWidth = 20;
  const radius = 90;
  const normalizedSize = 2 * radius + strokeWidth;
  const viewBox = `0 0 ${normalizedSize} ${normalizedSize}`;
  const strokeDasharray = 2 * Math.PI * radius;
  const strokeDashoffset = strokeDasharray * (1 - progress / 100);

  return (
    <svg
      className={styles.levelProgressBar}
      width={size}
      height={size}
      viewBox={viewBox}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'rgba(161, 236, 223, 0.4)', stopOpacity: 1 }} />
          <stop offset="47.26%" style={{ stopColor: 'rgba(157, 188, 255, 0.4)', stopOpacity: 1 }} />
          <stop offset="98.45%" style={{ stopColor: 'rgba(204, 143, 255, 0.4)', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#2CD8D5', stopOpacity: 1 }} />
          <stop offset="48%" style={{ stopColor: '#6B8DD6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#8E37D7', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <circle
        r={radius}
        cx={radius + strokeWidth / 2}
        cy={radius + strokeWidth / 2}
        fill="transparent"
        stroke="url(#backgroundGradient)"
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset="0"
      ></circle>
      <circle
        r={radius}
        cx={radius + strokeWidth / 2}
        cy={radius + strokeWidth / 2}
        stroke="url(#progressGradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        fill="transparent"
      ></circle>
      <text className={styles.progressText} x="50%" y="-55%" textAnchor="middle" dominantBaseline="middle">
        {progress}%
      </text>
      <text className={styles.levelText} x="50%" y="-35%" textAnchor="middle" dominantBaseline="middle">
        {level} Level
      </text>
    </svg>
  );
};

export default LevelProgressBar;
