import { REGEX_BASE64_IMAGE } from './constants';

function isBase64Image(image: string) {
  return REGEX_BASE64_IMAGE.test(image);
}

export default isBase64Image;
