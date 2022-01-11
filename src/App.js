import './App.css';
import Header from './components/header/Header';
import SimpleBottomNavigation from './components/BottomNav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import TVSeries from './Pages/TVSeries/TVSeries';
import Search from './Pages/Search/Search';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="app">
        <Container>
          <Routes>
            <Route exact path='/' element={<Trending />} />
            <Route exact path='/movies' element={<Movies />} />
            <Route exact path='/tvseries' element={<TVSeries />} />
            <Route exact path='/search' element={<Search />} />

          </Routes>
        </Container>
      </div>

      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
