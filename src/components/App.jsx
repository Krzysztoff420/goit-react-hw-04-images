import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ColorRing } from 'react-loader-spinner';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { fetchImages } from './Api/fetchImages.js';


export class App extends Component {
  state = {
    isLoading: false,
    images: [],
    totalHits: null,
    q: '',
    page: 1,
  };

  handleChange = text => {
    this.setState({
      q: text,
    });
  };

  handleRequest = async () => {
    this.setState({
      isLoading: true,
      page: 1,
    });

    const { q } = this.state;

    const imagesFromApi = await fetchImages({ q });

    this.setState(state => ({
      images: imagesFromApi.hits,
      totalHits: imagesFromApi.totalHits,
      isLoading: false,
      page: this.state.page + 1,
    }));
  };

  handleLoadMore = async () => {
    this.setState({
      isLoading: true,
    });

    const { q, page } = this.state;

    const imagesFromApi = await fetchImages({ q, page });

    this.setState(state => ({
      images: state.images.concat(imagesFromApi.hits),
      isLoading: false,
      page: state.page + 1,
    }));
  };

  render() {
    const { images, totalHits, isLoading, page } = this.state;
    const totalPages = Math.ceil(totalHits / 12);

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
          onInputChange={this.handleChange}
          onFetchImages={this.handleRequest}
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
          <Button onLoadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}




