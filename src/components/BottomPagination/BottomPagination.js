import React from 'react'
import Pagination from '@mui/material/Pagination';

const BottomPagination = ({ setPage, numofpages = 10 }) => {

    const handlerPage = (page) => {
        setPage(page);
        window.scroll(0, 0);
    }

    return (
        <>
            <Pagination
                style={{ fontWeight: "bold", color: "black", }}
                size='medium'
                count={numofpages}
                color='secondary'
                onChange={(event) => { handlerPage(event.target.textContent) }}
            />
        </>
    )
}

export default BottomPagination
