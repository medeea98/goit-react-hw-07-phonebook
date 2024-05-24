import React, { useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, addContact, deleteContact, setFilter } from '../store';

export const App = () => {
  const contacts = useSelector(state => state.items);
  const isLoading = useSelector(state => state.isLoading);
  // const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (name, number) => {
    dispatch(addContact({ name, number }));
  };

  const handleFilterChange = (filterValue) => {
    // dispatch(setFilter(filterValue));
  };

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  const filteredContacts = contacts.filter(contact => {
      return typeof contact.name === 'string' && contact.name.toLowerCase().includes(filter.toLowerCase())
    }
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ContactList contacts={filteredContacts} onDelete={handleDelete} />
      )}
    </div>
  );
};
