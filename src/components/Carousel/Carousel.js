import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../config/config';
import './Carousel.css';

const handleDragStart = (e) => e.preventDefault();

const Gallery = ({ type, id }) => {

    const [credit, setCredit] = useState([]);

    const fetchCast = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setCredit(data.cast);
    }

    useEffect(() => {
        fetchCast();
        // eslint-disable-next-line
    }, [])

    const items = credit.map((value) => {
        return <div className="carouselItem">
            <img
                src={value.profile_path ? `${img_300}${value.profile_path}` : noPicture}
                alt={value?.name}
                onDragStart={handleDragStart}
                className='carousel_img'
            />
            <strong className="carousel_txt">{value?.name}</strong>
        </div>
    })

    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 7,
        },
    };

    return (
        <AliceCarousel
            mouseTracking
            infinite
            disableButtonsControls
            disableDotsControls
            responsive={responsive}
            items={items}
            autoPlay
        />
    );
}

export default Gallery;