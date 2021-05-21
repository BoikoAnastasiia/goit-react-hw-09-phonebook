import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../redux/auth';
import styles from '../Components/PhoneBookForm/PhoneBook.module.css';

export default function LoginView() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeName = useCallback(event => {
    setName(event.currentTarget.value);
  }, []);

  const handleChangePassword = useCallback(event => {
    setPassword(event.currentTarget.value);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    onLogin();
    reset();
  };

  const reset = () => {
    setPassword('');
    setName('');
  };

  const onLogin = () => dispatch(authOperations.logIn);

  return (
    <div className={styles.loginContainer}>
      <h1>Страница логина</h1>

      <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
        <label className={styles.label}>
          email
          <input
            className={styles.input}
            type="email"
            name="email"
            value={name}
            onChange={handleChangeName}
          />
        </label>

        <label className={styles.label}>
          Password
          <input
            className={styles.input}
            type="password"
            name="password"
            value={password}
            onChange={handleChangePassword}
          />
        </label>

        <button className={styles.button} type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
