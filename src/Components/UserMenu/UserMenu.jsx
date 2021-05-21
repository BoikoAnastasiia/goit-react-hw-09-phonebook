import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { authSelectors, authOperations } from '../../redux/auth';
import defaultAvatar from './default-avatar.jpg';
import Button from '@material-ui/core/Button';
import styles from './user-menu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUsername);

  const onLogOut = useCallback(() => {
    dispatch(authOperations.logOut());
  }, [dispatch]);

  return (
    <div className={styles.userMenuWrapper}>
      <img
        src={defaultAvatar}
        alt={name}
        width="32"
        className={styles.userMenuAvatar}
      />
      <span className={styles.name}>{name}</span>
      <Button variant="outlined" color="inherit" onClick={onLogOut}>
        Logout
      </Button>
    </div>
  );
}
