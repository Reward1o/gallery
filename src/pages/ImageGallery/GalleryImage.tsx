import {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import PhotoCard from "./PhotoCard.tsx";

interface GalleryImageProps {
   searchPhoto?: (query: string, page: number) => Promise<any[]>;
   searchCollection?: (page: number) => Promise<any[]>;
}

const GalleryImage: FC<GalleryImageProps> = ({searchPhoto, searchCollection}) => {
   const [photos, setPhotos] = useState<any[]>([]);
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState(true);
   const [page, setPage] = useState(1);
   const [query, setQuery] = useState("nature");
   const [search, setSearch] = useState('');
   const observerRef = useRef<IntersectionObserver | null>(null);
   const lastPhotoElementRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const fetchPhotos = async () => {
         setLoading(true);
         setError(null);
         try {
            if (searchPhoto) {
               const result = await searchPhoto(query, page);
               setPhotos((prevPhoto) => [...prevPhoto, ...result]);
            } else if (searchCollection) {
               const result = await searchCollection(page);
               setPhotos((prevPhoto) => [...prevPhoto, ...result]);
            }

         } catch (error) {
            setError('Ошибка запроса ' + error);
         } finally {
            setLoading(false);
         }
      };
      fetchPhotos();
   }, [query, page, searchPhoto, searchCollection]);

   useEffect(() => {
      if (loading) return;

      const loadMorePhotos = () => {
         setPage((prevPage) => prevPage + 1);
      };

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
         if (entries[0].isIntersecting) {
            loadMorePhotos();
         }
      });

      const currentLastPhotoElement = lastPhotoElementRef.current;

      if (currentLastPhotoElement) {
         observerRef.current.observe(currentLastPhotoElement);
      }

      return () => {
         if (observerRef.current && currentLastPhotoElement) {
            observerRef.current.unobserve(currentLastPhotoElement);
         }
      };
   }, [loading, photos]);

   if (loading && page === 1) return <div>Загрузка...</div>;
   if (error) return <div>{error}</div>;

   const textChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
   }

   const handleClick = () => {
      setPhotos([]);
      setPage(1);
      setQuery(search);
      setSearch('');
   }

   return (
      <>
         {searchPhoto &&
					 <>
						 <input type="text" value={search} onChange={textChange} placeholder="Введите запрос..."/>
						 <button onClick={handleClick}>Поиск</button>
					 </>
         }
         <div className="gallery">
            {photos.map((photo, index) => (
               <div key={photo.id} ref={index === photos.length - 1 ? lastPhotoElementRef : null}>
                  <PhotoCard photo={photo}/>
               </div>
            ))}
         </div>
         {loading && <div>More Photo...</div>}
      </>

   );
};

export default GalleryImage;