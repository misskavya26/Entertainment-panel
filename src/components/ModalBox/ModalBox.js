import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './ModalBox.css';
import Carousel from '../Carousel/Carousel';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '80%',
//     height: '80%',
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

export default function BasicModal({ children, type, id }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [content, setContent] = React.useState([]);
    const [video, setVideo] = React.useState();

    const fetchData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setContent(data);
        // console.log(data);
    }

    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)

        // console.log(data.results[0]?.key);
        setVideo(data.results[0]?.key);
    }

    React.useEffect(() => {
        fetchData();
        fetchVideo();
        //eslint-disable-next-line
    }, [])

    return (
        <>
            <div
                className="card"
                onClick={handleOpen}>
                {children}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='modal'
            >
                <Box className='style'>
                    {content &&
                        <div className="ModalBox">
                            <img
                                src={content.poster_path ? `${img_500}${content.poster_path}` : unavailable}
                                alt={content.name || content.title}
                                className='modal_potrait_image'
                            />
                            <img
                                src={content.backdrop_path ? `${img_500}${content.backdrop_path}` : unavailableLandscape}
                                alt={content.name || content.title}
                                className='modal_landscape_image'
                            />

                            <div className="about">
                                <span className="modal_title">
                                    {content.name || content.title}
                                    ({(content.first_air_date || content.release_date || "----").substring(0, 4)})
                                </span>

                                {content.tagline &&
                                    (<em className='modal_tagline'>{content.tagline} </em>)}

                                <span className="modal_description">
                                    {content.overview}
                                </span>

                                <div>
                                    <Carousel type={type} id={id} />
                                </div>

                                <Button
                                    className='button'
                                    variant="contained"
                                    startIcon={<YouTubeIcon />}
                                    href={`https://www.youtube.com/watch?v=${video}`}
                                    target="_blank"
                                    color='secondary'
                                >
                                    Watch the Trailer
                                </Button>

                            </div>
                        </div>

                    }
                </Box>
            </Modal>
        </>
    );
}