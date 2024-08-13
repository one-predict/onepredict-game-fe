import AppSection from '@enums/AppSection';
import Typography from '@components/Typography';
import styles from './tasks.module.scss';

export const handle = {
  appSection: AppSection.Tasks,
};

const TasksPage = () => {
  return (
    <>
      <div className={styles.comingSoonSection}>
        <Typography variant="h1">Tasks are coming soon!</Typography>
      </div>
    </>
  );
};

export default TasksPage;
