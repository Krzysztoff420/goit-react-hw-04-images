import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ imageUrl, imageTags, onCloseModal }) => {
  const closeModal = () => {
    onCloseModal();
  };

  return (
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
        <img src={imageUrl} alt={imageTags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageTags: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};