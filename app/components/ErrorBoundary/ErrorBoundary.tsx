import { ReactNode, Component } from 'react';
import { PageLayout } from '@components/Layouts';
import Typography from '@components/Typography';
import styles from './ErrorBoundary.module.scss';

export interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { error: false };
  }

  public componentDidCatch() {
    this.setState({ error: true });
  }

  public render() {
    const { error } = this.state;
    const { children } = this.props;

    return error ? (
      <PageLayout>
        <img className={styles.logo} src="/images/big-logo.png" alt="logo" />
        <Typography alignment="center" variant="h1" color="primary">
          Oops...Something went wrong.
        </Typography>
      </PageLayout>
    ) : (
      <>{children}</>
    );
  }
}
