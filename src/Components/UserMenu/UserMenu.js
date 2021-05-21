import React from 'react';
import { connect } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';
import defaultAvatar from './default-avatar.jpg';
import Button from '@material-ui/core/Button';
import styles from './user-menu.module.css';

const UserMenu = ({ avatar, name, onLogout }) => (
  <div className={styles.userMenuWrapper}>
    <img src={avatar} alt={name} width="32" className={styles.userMenuAvatar} />
    <span className={styles.name}>{name}</span>
    <Button variant="outlined" color="white" onClick={onLogout}>
      Logout
    </Button>
  </div>
);
const mapStateToProps = state => ({
  name: authSelectors.getUsername(state),
  avatar: defaultAvatar,
});

const mapDispatchToProps = {
  onLogout: authOperations.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
