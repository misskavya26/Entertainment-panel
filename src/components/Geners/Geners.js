import { Chip } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'

const Geners = ({ geners, setGeners, selectedGeners, setSelectedGeners, type, setPage }) => {

    const handleAdd = (genre) => {
        setSelectedGeners([...selectedGeners, genre]);
        setGeners(geners.filter((g) => g.id !== genre.id));
        setPage(1);
    };

    const removeIt = (genre) => {
        setSelectedGeners(selectedGeners.filter((s) => s.id !== genre.id));
        setGeners([...geners, genre]);
        setPage(1);
    }

    const fetchGeners = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setGeners(data.genres);
        // console.log(data.genres);
    }

    useEffect(() => {
        fetchGeners();

        return () => {
            setGeners({});
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>

            {selectedGeners.map((value) => (
                <Chip
                    label={value.name}
                    key={value.id}
                    clickable
                    variant='outlined'
                    style={{
                        margin: 2, padding: 2,
                        fontWeight: "bold"
                    }}
                    size='medium'
                    onDelete={() => removeIt(value)}
                />
            ))}

            {geners.map((value) => (
                <Chip
                    label={value.name}
                    key={value.id}
                    clickable
                    // color='secondary'
                    // variant='outlined'
                    style={{ margin: 2, padding: 2, fontWeight: "bold" }}
                    size='medium'
                    onClick={() => handleAdd(value)}
                />
            ))}
        </>
    )
}

export default Geners
