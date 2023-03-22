import { useEffect, useState } from 'react';
import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [imgTags, setImgTags] = useState('');

  const openModal = evt => {
    const imageId = evt.target.id;
    const selectedImg = images.find(image => image.id === Number(imageId));

    setIsModalOpen(true);
    setImgUrl(selectedImg.largeImageURL);
    setImgTags(selectedImg.tags);
  };

  const escFunction = evt => {
    if (evt.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', escFunction);
  }, []);

  useEffect(() => {
    return document.removeEventListener('keydown', escFunction);
  }, []);

  return (
    <>
      {images.map(image => (
        <li key={image.id} className={css.imageGalleryItem}>
          <img
            id={image.id}
            className={css.imageGalleryItemImage}
            src={image.webformatURL}
            alt={image.tags}
            onClick={openModal}
          />
        </li>
      ))}
      {isModalOpen && (
        <Modal
          imageUrl={imgUrl}
          imageTags={imgTags}
          onCloseModal={closeModal}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
};
