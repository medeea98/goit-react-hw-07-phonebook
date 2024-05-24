import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import PropTypes from 'prop-types';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else {
      setNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNaN(number)) {
      addContact(name, number);
      setName('');
      setNumber('');
    } else {
      alert('Please enter a valid phone number.');
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <label>Phone Number</label>
      <input 
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        placeholder="Phone Number"
        required
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired, 
};

export default ContactForm;
