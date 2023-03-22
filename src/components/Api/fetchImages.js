import { createParamsString } from './createParamsString';

const fetchUrl = 'https://pixabay.com/api/';
const constantParams = {
  key: '32222044-655cc419c9aea65946173f7db',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

const constantParamsString = Object.keys(constantParams)
  .map(key => `${key}=${constantParams[key]}`)
  .join('&');

export const fetchImages = async params => {
  const urlParams = createParamsString(params);
  const res = await fetch(`${fetchUrl}${urlParams}&${constantParamsString}`);
  const resBody = await res.json();

  return resBody;
};
