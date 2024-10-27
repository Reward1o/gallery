import {FC} from 'react';

interface PhotoCardProps {
   photo: {
      id: number;
      src: {
         medium: string;
         large: string;
         portrait: string;
         original: string;
      };
      photographer: string;
      photographer_url: string;
      alt: string;
   }
}

const PhotoCard: FC<PhotoCardProps> = ({photo}) => {
   return (
      <div className="photo-card">
         <a href={photo.src.original}
            target="_blank"
            rel="noopener noreferren"
         >
            <img src={photo.src.portrait} alt={photo.alt}/>
         </a>
         <a href={photo.photographer_url}
            target="_blank"
            rel="noopener noreferren"
            className='photo-card_photographer'
         >
            {photo.photographer}
         </a>
      </div>
   );
};

export default PhotoCard;