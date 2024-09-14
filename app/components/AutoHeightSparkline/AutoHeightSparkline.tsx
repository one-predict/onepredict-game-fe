import { SparklinesLine } from '@lueton/react-sparklines';
import useResizeObserver from 'use-resize-observer';
import styles from './AutoHeightSparkline.module.scss';

export interface AutoHeightSparklineProps {
  data: number[];
  fill?: string;
  stroke?: string;
  startAtZero?: boolean;
}

const AutoHeightSparkline = ({ data, stroke, startAtZero, fill }: AutoHeightSparklineProps) => {
  const { ref, width, height } = useResizeObserver<HTMLDivElement>();

  return (
    <div ref={ref} className={styles.sparklineOuterWrapper}>
      <SparklinesLine
        margin={0}
        stroke={stroke}
        fill={fill}
        curved
        width={width}
        startAtZero={startAtZero}
        height={height}
        data={data}
      />
    </div>
  );
};

export default AutoHeightSparkline;
