import {useState, useEffect} from 'react';
import Contacts from './components/Contacts/Contacts';
import styles from './components/styles.module.css';
import { Filter } from './components/Filter/Filter';
import { ContactForm } from './components/ContactForm/ContactForm';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
     const data = localStorage.getItem('contacts');
    const parsedData = JSON.parse(data);
    if (parsedData) {
      setContacts(parsedData)
    }
  }, [])

 const addContact = contact => {
    setContacts(prevState => [...prevState, contact])
  };

 const onInput = e => {
    setFilter(e.currentTarget.value)
  };

  const filtered = () => {
    return [...contacts].filter(contact =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

 const deleteItem = e => {
    const elemToRemove = e.currentTarget.parentNode.id;
    setContacts(contacts.filter(item => item.id !== elemToRemove))
 };
  
   useEffect(() => {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    
  }, [contacts])

    return (
      <div className={styles.wrapper}>
        <h1>Phonebook</h1>
        <ContactForm
          addContact={addContact}
          contacts={contacts}
        />

        <h1>Contacts</h1>
        <Filter onInput={onInput} />
        <Contacts
          contacts={contacts}
          filter={filter}
          filtered={filtered}
          deleteItem={deleteItem}
        />
      </div>
    );
  
}
