import {useState} from 'react';
import styles from './styles.module.css';
import shortid from 'shortid';

export function ContactForm({contacts, addContact}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  // onNameChange = e => {
  //   this.setState({ isDisabled: false });
  //   this.setState({ name: e.currentTarget.value });
  //   let name = e.currentTarget.value;
  //   let finder = this.props.contacts.find(contact => contact.name === name);
  //   if (finder) {
  //     this.setState({ isDisabled: true });
  //     alert('Такой уже есть');
  //     this.setState({ name: '' });
  //   }
  // };

  // onNumberChange = e => {
  //   this.setState({ isDisabled: false });
  //   this.setState({ number: e.currentTarget.value });
  //   let number = e.currentTarget.value;
  //   let finder = this.props.contacts.find(contact => contact.number === number);
  //   if (finder) {
  //     this.setState({ isDisabled: true });
  //     alert('Такой уже есть');
  //     this.setState({ number: '' });
  //   }
  // };

 const onInputChange = e => {
   let { name, value } = e.currentTarget; // *? Возможно фиксить логику...
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
   
    // this.setState({ [name]: value }); // *? Возможно фиксить логику...
    let finder = contacts.find(
      contact =>
        contact.name.toLowerCase() === value.toLowerCase() ||
        contact.number === value
    );
   if (finder) {
      setIsDisabled(true)
     alert(`${value} is already in contacts.`);
     setName('');
      // this.setState({ [name]: '' }); // *? Возможно фиксить логику...
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
   resetForm();  // * Скорей всего нужно будет заменить вызов функции
  
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