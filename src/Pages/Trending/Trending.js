import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Card from '../../components/Card/Card';
import './Trending.css';
import BottomPagination from '../../components/BottomPagination/BottomPagination';

const Trending = () => {

    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);

    const fetchApi = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

        setContent(data.results);
        // console.log(data.results);
    }

    useEffect(() => {
        window.scroll(0, 0);
        fetchApi();
        // eslint-disable-next-line
    }, [page])

    return (
        <>
            <span className="page-title">Trending</span>
            <div className="trending">
                {content && content.map((value) => {
                    return <Card
                        key={value.id}
                        id={value.id}
                        title={value.title || value.name}
                        image={value.poster_path}
                        type={value.media_type}
                        date={value.release_date || value.first_air_date}
                        rating={value.vote_average}
                    />
                })}
                <BottomPagination setPage={setPage} />
            </div>
        </>
    )
}

export default Trending
