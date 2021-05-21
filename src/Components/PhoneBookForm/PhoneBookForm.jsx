import { Component } from 'react';
import styles from './PhoneBook.module.css';
import { connect } from 'react-redux';
import contactsOperations from '../../redux/contacts/contacts-operations';
import contactsSelectors from '../../redux/contacts/contacts-selectors';
import AddIcon from '@material-ui/icons/Add';

import Fab from '@material-ui/core/Button';

class PhoneBookForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.props.contacts.some(name => name.name === this.state.name))
      return alert(`${this.state.name} is already in your contacts`);
    this.props.onSubmit(this.state);

    this.reset();
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({ name: '', number: ' ' });
  };

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label className={styles.label}> Name </label>
        <input
          onChange={this.handleChange}
          value={this.state.name}
          className={styles.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
        <label className={styles.label}> Phone number </label>

        <input
          type="tel"
          onChange={this.handleChange}
          className={styles.input}
          name="number"
          pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
          title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
          required
        />
        {/* <button type="submit" className={styles.button}>
          Add
        </button> */}

        <Fab type="submit" color="#ffffff" aria-label="add">
          <AddIcon />
        </Fab>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  contacts: contactsSelectors.getVisibleContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: text => dispatch(contactsOperations.addContact(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneBookForm);
