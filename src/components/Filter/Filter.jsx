import PropTypes from 'prop-types';
import styles from './styles.module.css';

export function Filter({filter, onInput}) {

    return (
      <div>
        <p className={styles.text}>Find contacts by name</p>
        <input
          name="filter"
          value={filter}
          onChange={e => onInput(e)}
        />
      </div>
    );
  
}

Filter.propTypes = {
  onInput: PropTypes.func,
};
