import { useState, useCallback } from 'react';
import styles from './PhoneBook.module.css';
import { useDispatch, useSelector } from 'react-redux';
import contactsOperations from '../../redux/contacts/contacts-operations';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Button';

export default function PhoneBookForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(state => state.contacts.contacts);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      if (contacts.some(name => name.name === name))
        return alert(`${name} is already in your contacts`);
      reset();
      dispatch(contactsOperations.addContact({ name, number }));
    },
    [dispatch, name, number],
  );

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'number':
        return setNumber(value);
      default:
        return;
    }
  };

  const reset = () => {
    setNumber('');
    setName('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}> Name </label>
      <input
        onChange={handleChange}
        value={name}
        className={styles.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required
      />
      <label className={styles.label}> Phone number </label>

      <input
        onChange={handleChange}
        type="tel"
        className={styles.input}
        value={number}
        name="number"
        pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
        title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
        required
      />
      <Fab type="submit" color="inherit" aria-label="add">
        <AddIcon />
      </Fab>
    </form>
  );
}
