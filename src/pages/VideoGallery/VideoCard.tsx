import {FC} from 'react';

interface VideoCardProps {
   video: {
      image: string;
      url: string;
      user: {
         name: string;
         url: string;
      };
      video_files: {
         link: string;
      }[];
   };
   openModal: () => void;
}

const VideoCard: FC<VideoCardProps> = ({video, openModal}) => {
   return (
      <div className="video-card">
            <img src={video.image} alt={video.user.name} onClick={openModal}/>
         <a href={video.user.url}
            target="_blank"
            rel="noopener noreferren"
            className='video-card_videogragher'
         >
            {video.user.name}
         </a>
      </div>
   );
};

export default VideoCard;