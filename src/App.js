// Importaçoes
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// Paginas
import Home from './components/pages/Home/Home';
import Company from './components/pages/Company/Company';
import Contact from './components/pages/Contact/Contact';
import NewProject from './components/pages/Newproject/Newproject';
import Projects from './components/pages/Projects/Projects';
import Project from './components/pages/Project/Project';

// Componetes
import Container from './components/layout/Container/Container';
import Navbar from './components/layout/Navbar/Navbar'
import Footer from './components/layout/Footer/Footer'

// Pagina principal
function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass='min-height'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route path='/company' element={<Company />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/newproject' element={<NewProject />}></Route>
          <Route path='/project/:id' element={<Project />}></Route>
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
