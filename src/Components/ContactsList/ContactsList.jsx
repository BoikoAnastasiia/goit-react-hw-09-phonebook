import styles from './ContactList.module.css';
import propTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import contactsOperations from '../../redux/contacts/contacts-operations';
import contactsSelectors from '../../redux/contacts/contacts-selectors';

export default function ContactsList() {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getVisibleContacts);
  return (
    <ul className={styles.container}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={styles.list}>
          <div className={styles.buttonContainer}>
            <button
              className={styles.delete}
              onClick={() => dispatch(contactsOperations.deleteContact(id))}
            >
              -
            </button>
          </div>
          <div>
            <p className={styles.name}>{name} </p>
            <span className={styles.number}>{number}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

ContactsList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.number.isRequired,
    }),
  ),
};
