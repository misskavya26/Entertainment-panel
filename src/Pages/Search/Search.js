import { Button, Tab, Tabs, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './Search.css';
import axios from 'axios';
import Card from '../../components/Card/Card';
import BottomPagination from '../../components/BottomPagination/BottomPagination';

const Search = () => {

    const [type, setType] = useState(0);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numofpages, setnumofpages] = useState();

    const fetchSearch = async () => {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
                }&language=en-US&query=${search}&page=${page}&include_adult=false`);

            setContent(data.results);
            setnumofpages(data.total_pages);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
    }, [type, page])

    return (
        <>
            <div className='search'>
                <TextField
                    style={{ flex: 1, fontFamily: "'Mulish', sans-serif", fontWeight: "bold" }}
                    className='searchBox'
                    label='Search'
                    variant='filled'
                    color='secondary'
                    onChange={(event) => setSearch(event.target.value)}
                />
                <Button
                    variant='contained' color='secondary'
                    style={{ marginLeft: '10px' }}
                    onClick={fetchSearch}
                >
                    <SearchIcon fontSize='large' />
                </Button>
            </div>

            <Tabs
                style={{ flex: 1 }}
                value={type}
                indicatorColor='secondary'
                textColor='secondary'
                aria-label="disabled tabs example"
                onChange={(event, value) => {
                    setType(value);
                    setPage(1);
                }}
            >
                <Tab
                    style={{
                        width: '50%', fontWeight: "bold",
                        fontFamily: "'Mulish', sans-serif",
                    }} label="Search Movies" />
                <Tab
                    style={{
                        width: '50%',
                        fontWeight: "bold",
                        fontFamily: "'Mulish', sans-serif",
                    }}
                    label="Search TV Series" />
            </Tabs>
            <div className="trending">
                {content && content.map((value) => {
                    return <Card
                        key={value.id}
                        id={value.id}
                        title={value.title || value.name}
                        image={value.poster_path}
                        type={type ? 'tv' : 'movie'}
                        date={value.release_date || value.first_air_date}
                        rating={value.vote_average}
                    />
                })}

                {search &&
                    !content &&
                    (type ? <h2>No TV Series Found</h2> : <h2>No Movies Found</h2>)}

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

export default Search
