import {FC} from 'react';
import GalleryVideo from "./GalleryVideo.tsx";

const Video: FC = () => {
   return (
      <div className='video-page'>
         <h1>Галерея Видео</h1>
         <GalleryVideo/>
      </div>
   );
};

export default Video;