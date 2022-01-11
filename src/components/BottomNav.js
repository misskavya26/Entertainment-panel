import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);

    const history = useNavigate();

    useEffect(() => {

        if (value === 0) {
            history('/');
        }
        else if (value === 1) {
            history('/movies');
        }
        else if (value === 2) {
            history('/tvseries');
        }
        else if (value === 3) {
            history('/search');
        }
    }, [value, history])

    return (
        <Box
            sx=
            {{
                width: '100%',
                bottom: '0',
                position: 'fixed',
                zIndex: '100',
                fontFamily: "'Mulish', sans-serif",
            }}>

            <BottomNavigation
                style={{ backgroundColor: '#330033', }}
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction
                    label="Trending"
                    style={{ color: '#ffccff', }}
                    icon={<WhatshotIcon />}

                />
                <BottomNavigationAction
                    label="Movies"
                    style={{ color: '#ffccff' }}
                    icon={<MovieCreationIcon />}

                />
                <BottomNavigationAction
                    label="TV Series"
                    style={{ color: '#ffccff' }}
                    icon={<TvIcon />}

                />

                <BottomNavigationAction
                    label="Search"
                    style={{ color: '#ffccff' }}
                    icon={<SearchIcon />}

                />
            </BottomNavigation>
        </Box>
    );
}