import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onInputChange, onFetchImages }) => {
  const onSubmit = evt => {
    evt.preventDefault();

    onFetchImages();
  };

  const handleInput = evt => {
    const text = evt.target.value;

    onInputChange(text);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          onChange={handleInput}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onFetchImages: PropTypes.func.isRequired,
};