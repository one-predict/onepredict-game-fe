import clsx from 'clsx';
import { toast } from 'react-toastify';
import Button, { ButtonProps } from '@components/Button';
import CopyIcon from '@assets/icons/copy.svg?react';
import styles from './CopyButton.module.scss';

export interface CopyButtonProps extends Omit<ButtonProps, 'onClick'> {
  textToCopy: string;
}

const CopyButton = ({ className, textToCopy, ...restProps }: CopyButtonProps) => {
  const handleCopyButtonClick = () => {
    navigator.clipboard.writeText(textToCopy);

    toast('Link copied!');
  };

  return (
    <Button {...restProps} className={clsx(styles.copyButton, className)} onClick={handleCopyButtonClick}>
      <CopyIcon />
    </Button>
  );
};

export default CopyButton;
