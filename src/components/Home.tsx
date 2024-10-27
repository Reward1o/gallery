import {FC} from 'react';
import {searchPhotoCollection} from "../api/pixels.ts";
import GalleryImage from "../pages/ImageGallery/GalleryImage.tsx";

const Home: FC = () => {

   return (
      <div className='home-page'>
         <h1>
            Фотографии, отобранные командой Pexels
         </h1>
         <GalleryImage searchCollection={searchPhotoCollection}/>
      </div>
   );
};

export default Home;