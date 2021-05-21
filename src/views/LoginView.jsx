import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../redux/auth';

const styles = {
  form: {
    width: 320,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
  },
};

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
    <div>
      <h1>Страница логина</h1>

      <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
        <label style={styles.label}>
          email
          <input
            type="email"
            name="email"
            value={name}
            onChange={handleChangeName}
          />
        </label>

        <label style={styles.label}>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChangePassword}
          />
        </label>

        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
