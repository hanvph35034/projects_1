import { useState } from 'react';
import Default from '/Avatar.png';
const Image = ({ src, alt, failImage = Default, className, ...pros }: any) => {
  const [imageDefault, setimageDefault] = useState("")
  const handlDefaultImage = () => {
    setimageDefault(failImage)
  }
  return <img className={className} src={imageDefault || src} {...pros} alt={alt} onError={handlDefaultImage} />;
};
export default Image;
