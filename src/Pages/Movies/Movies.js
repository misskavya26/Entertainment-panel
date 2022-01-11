import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '../../components/Card/Card';
import BottomPagination from '../../components/BottomPagination/BottomPagination';
import Geners from '../../components/Geners/Geners';
import useGener from '../../hooks/useGener';

const Movies = () => {

    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [numofpages, setnumofpages] = useState();
    const [geners, setGeners] = useState([]);
    const [selectedGeners, setSelectedGeners] = useState([]);
    const genreforURL = useGener(selectedGeners);

    const fetchMovie = async () => {
        const { data } = await axios.get(` https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)


        setContent(data.results);
        setnumofpages(data.total_pages);
        // console.log(data.results);
    }

    useEffect(() => {
        window.scroll(0, 0);
        fetchMovie();
        // eslint-disable-next-line
    }, [genreforURL, page]
    )

    return (
        <>
            <span className="page-title">Movies</span>

            <Geners
                geners={geners}
                setGeners={setGeners}
                selectedGeners={selectedGeners}
                setSelectedGeners={setSelectedGeners}
                type='movie'
                setPage={setPage}
            />

            <div className="trending">
                {content && content.map((value) => {
                    return <Card
                        key={value.id}
                        id={value.id}
                        title={value.title || value.name}
                        image={value.poster_path}
                        type='movie'
                        date={value.release_date || value.first_air_date}
                        rating={value.vote_average}
                    />
                })}
                {numofpages > 1 && (
                    <BottomPagination
                        setPage={setPage}
                        numofpages={numofpages}
                    />
                )}
            </div>
        </>
    )
}

export default Movies
