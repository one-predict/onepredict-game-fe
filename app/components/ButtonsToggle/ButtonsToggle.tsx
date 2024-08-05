import clsx from 'clsx';
import Typography from '@components/Typography';
import styles from './ButtonsToggle.module.scss';

interface ToggleItem {
  id: string;
  title: string;
}

export interface ButtonsToggleProps {
  className?: string;
  toggles: ToggleItem[];
  selectedId: string;
  onSwitch: (id: string) => void;
}

const ButtonsToggle = ({ toggles, onSwitch, selectedId, className }: ButtonsToggleProps) => {
  return (
    <div className={clsx(styles.buttonsToggle, className)}>
      {toggles.map((item) => (
        <div
          className={clsx(styles.toggleButton, {
            [styles.selectedToggleButton]: selectedId === item.id,
          })}
          onClick={() => onSwitch(item.id)}
          key={item.id}
        >
          <Typography variant="subtitle1">{item.title}</Typography>
        </div>
      ))}
    </div>
  );
};

export default ButtonsToggle;
