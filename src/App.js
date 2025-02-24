import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/Newproject';
import Container from './components/layout/Container';

function App() {
  return (
    <Router>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/company'>Contato</Link>
        <Link to='/contact'>Empresa</Link>
        <Link to='/newproject'>Novo Projeto</Link>
      </div>
      <Container customClass='min-height'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/company' element={<Company />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/newproject' element={<NewProject />}></Route>
        </Routes>
      </Container>
      <p>Footer</p>
    </Router>
  );
}

export default App;
