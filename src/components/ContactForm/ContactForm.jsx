import {useState} from 'react';
import styles from './styles.module.css';
import shortid from 'shortid';

export function ContactForm({contacts, addContact}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

 const onInputChange = e => {
   let { name, value } = e.currentTarget;
   setIsDisabled(false)
   switch (name) {
     case 'name':
       setName(value)
       break;
   case 'number':
       setNumber(value)
       break;
     default:
       break;
   }
   
    let finder = contacts.find(
      contact =>
        contact.name.toLowerCase() === value.toLowerCase() ||
        contact.number === value
    );
   if (finder) {
      setIsDisabled(true)
     alert(`${value} is already in contacts.`);
     setName('');
    }
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

 const handleSubmit = e => {
    e.preventDefault();
    const contact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };

    addContact(contact);
   resetForm();   
  };

    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={e => onInputChange(e)}
          />
        </label>
        <label>
          Number:
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={e => onInputChange(e)}
          />
        </label>

        <button
          className={styles.submitButton}
          type="submit"
          disabled={isDisabled}
        >
          add contact
        </button>
      </form>
    );
  
}
