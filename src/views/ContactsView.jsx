import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhoneBookForm from '../Components/PhoneBookForm';
import Search from '../Components/Search';
import ContactsList from '../Components/ContactsList';

import { contactsOperations, contactsSelectors } from '../redux/contacts';

const containerView = {
  marginLeft: 'auto',
  marginRight: 'auto',
  width: 600,
};

export default function ContactView() {
  const dispatch = useDispatch();
  const isLoadingContacts = useSelector(contactsSelectors.getLoading);

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  return (
    <div style={containerView}>
      <PhoneBookForm />
      <Search />
      {isLoadingContacts && <p>Loading...</p>}
      <ContactsList />
    </div>
  );
}
