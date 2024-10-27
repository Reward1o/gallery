import axios from 'axios';

export const API_KEY = "obHuDZLTw6a771LAxoEOrAX0O6UZbVdztuNSmwC3Siu3ZaS1DYP7xsDa";
const BASE_URL = "https://api.pexels.com/v1/";
const VIDEO_URL = "https://api.pexels.com/videos/";

const pixelsApi = (url: string) => {
   return axios.create({
      baseURL: url,
      headers: {
         Authorization: API_KEY,
      },
   })
}


export const searchPhoto = async (query: string, page: number) => {
   const response = await pixelsApi(BASE_URL).get(`/search`, {
      params: {
         page,
         query,
         per_page: 21,
      },
   });
   return response.data.photos;
};

export const searchVideo = async (query: string, page: number) => {
   const response = await pixelsApi(VIDEO_URL).get(`/search`, {
      params: {
         page,
         query,
         size: 'medium',
         per_page: 21,
      },
   });
   return response.data.videos;
};


export const searchPhotoCollection = async (page: number) => {
   const response = await pixelsApi(BASE_URL).get(`/curated`, {
      params: {
         page,
         per_page: 21,
      },
   });
   return response.data.photos;
};
