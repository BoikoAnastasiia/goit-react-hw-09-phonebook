import styles from './Search.module.css';
import { useSelector, useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import contactsSelectors from '../../redux/contacts/contacts-selectors';
import { changeFilter } from '../../redux/contacts/contacts-actions';
import SearchIcon from '@material-ui/icons/Search';

export default function Search() {
  const dispatch = useDispatch();
  const value = useSelector(contactsSelectors.getFilter);
  const onChange = e => dispatch(changeFilter(e.target.value));

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <SearchIcon color="inherit" />
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={styles.input}
        />
      </label>
    </div>
  );
}
Search.propTypes = {
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};
