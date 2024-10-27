import {FC} from 'react';
import GalleryImage from "./GalleryImage.tsx";
import {searchPhoto} from "../../api/pixels.ts";

const Image: FC = () => {
   return (
      <div className="image-page">
         <h1>Галерея Фотографий</h1>
         <GalleryImage searchPhoto={searchPhoto}/>
      </div>
   );
};

export default Image;