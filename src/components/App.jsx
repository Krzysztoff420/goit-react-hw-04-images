import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ColorRing } from 'react-loader-spinner';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { fetchImages } from './Api/fetchImages.js';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const totalPages = Math.ceil(totalHits / 12);

  const handleChange = text => {
    setQuery(text);
  };

  const handleRequest = async () => {
    setIsLoading(true);

    const imagesFromApi = await fetchImages({ q: query });

    setImages(imagesFromApi.hits);
    setTotalHits(imagesFromApi.totalHits);
    setIsLoading(false);
    setPage(page + 1);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);

    const imagesFromApi = await fetchImages({ q: query, page });

    setImages(images.concat(imagesFromApi.hits));
    setIsLoading(false);

    setPage(page + 1);
  };

  useEffect(() => {
    setPage(1);
  }, [query]);

    return (
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar
          onInputChange={handleChange}
          onFetchImages={handleRequest}
        />
        <ImageGallery>
          <ImageGalleryItem images={images} />
        </ImageGallery>
        {isLoading && (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
        {totalPages > 1 && totalPages >= page && (
          <Button onLoadMore={handleLoadMore} />
        )}
      </div>
    );
  }





