import {FC} from 'react';
import Modal from "react-modal";

interface ModalProps {
   isModalOpen: boolean;
   closeModal: () => void;
   video: {
      link: string;
   }[];

}

const ModalVideo: FC<ModalProps> = ({isModalOpen, closeModal, video}) => {

   return (
      <Modal
         isOpen={isModalOpen}
         onRequestClose={closeModal}
         className='modal'
         overlayClassName='modal-overlay'
      >
         <img className='pexels'
              style={{top: '25px', left: '25px'}} src="https://images.pexels.com/lib/api/pexels.png"
              alt="logotype"/>
         <video playsInline
                src={video[1].link || video[0].link}
                width='960px'
                height='540px'
                controls
                muted
                autoPlay
         ></video>
         <button className='closeButton' onClick={closeModal}>X</button>
      </Modal>
   );
};

export default ModalVideo;