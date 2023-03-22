import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  closeModal = () => {
    const { onCloseModal } = this.props;
    onCloseModal();
  };

  render() {
    const { imageUrl, imageTags } = this.props;

    return (
      <div className={css.overlay} onClick={this.closeModal}>
        <div className={css.modal}>
          <img src={imageUrl} alt={imageTags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageTags: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};