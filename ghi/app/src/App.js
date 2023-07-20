import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import HatList from './HatList';
import HatForm from './HatForm';

function App({hats, shoes}) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="shoes">
            <Route path="" element={<ShoesList shoes={shoes} />} />
          </Route>
          <Route path='hats'>
            <Route index element={<HatList hats={hats} />}/>
          </Route>
          <Route path='hats'>
            <Route path='new' element={<HatForm />}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
