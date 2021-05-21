import { Component } from 'react';
import { connect } from 'react-redux';
import PhoneBookForm from '../Components/PhoneBookForm';
import Search from '../Components/Search';
import ContactsList from '../Components/ContactsList';

import { contactsOperations, contactsSelectors } from '../redux/contacts';

const containerView = {
  marginLeft: 'auto',
  marginRight: 'auto',
  width: 600,
};

class ContactView extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <div style={containerView}>
        <PhoneBookForm />
        <Search />
        <ContactsList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoadingContacts: contactsSelectors.getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactView);
