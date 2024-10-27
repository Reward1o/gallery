import {ChangeEvent, FC, useEffect, useState} from 'react';
import {searchVideo} from "../../api/pixels.ts";
import VideoCard from "./VideoCard.tsx";
import ModalVideo from "../../components/ModalVideo.tsx";
import Modal from "react-modal";

const GalleryVideo: FC = () => {
   const [videos, setVideos] = useState<any[]>([]);
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState(true);
   const [page, setPage] = useState(1);
   const [query, setQuery] = useState("nature");
   const [search, setSearch] = useState('');
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedVideo, setSelectedVideo] = useState<any | null>(null);

   useEffect(() => {
      const fetchVideos = async () => {
         setLoading(true);
         setError(null);
         try {
            const result = await searchVideo(query, page);
            setVideos((prevVideo) => [...prevVideo, ...result]);
         } catch (error) {
            setError('Ошибка запроса ' + error);
         } finally {
            setLoading(false);
         }
      };
      fetchVideos();
   }, [query, page]);

   useEffect(() => {
      Modal.setAppElement('#root'); // Замените на ваш ID корневого элемента
   }, []);

   const loadMoreVideos = () => {
      setPage((prevPage) => prevPage + 1);
   };

   const textChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
   }

   const handleClick = () => {
      setVideos([]);
      setPage(1);
      setQuery(search);
      setSearch('');
   }

   const openModal = (video: any) => {
      const hdVideo = video.video_files.filter((vd: {quality: string}) => vd.quality === 'hd');
      if (hdVideo.length > 0) {
         setSelectedVideo(hdVideo);
      } else {
         setSelectedVideo(null);
      }
      setIsModalOpen(true);
   }

   const closeModal = () => {
      setIsModalOpen(false);
      setSelectedVideo(null);
   }

   if (loading && page === 1) return <div>Загрузка...</div>;
   if (error) return <div>{error}</div>;

   return (
      <>
         <input type="text" value={search} onChange={textChange} placeholder="Введите запрос..."/>
         <button onClick={handleClick}>Поиск</button>
         <div className="gallery">
            {videos.map((video) => (
               <div key={video.id}>
                  <VideoCard video={video} openModal={() => openModal(video)}/>
               </div>
            ))}
            {isModalOpen && selectedVideo && ( // Проверяем, открыто ли модальное окно и выбрано ли видео
               <ModalVideo closeModal={closeModal} isModalOpen={isModalOpen} video={selectedVideo} />
            )}
         </div>
         {loading ? loading : <button className='more-video' onClick={loadMoreVideos}>More Video</button>}
      </>
   );
};

export default GalleryVideo;