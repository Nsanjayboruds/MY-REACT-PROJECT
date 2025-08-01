import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Github from './components/Github/Github';
import Viewproject from './components/viewproject/Viewproject';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/github" element={<Github />} />
        </Route>
        <Route path="/viewproject" element={<Viewproject />} />
      </Routes>
    </Router>
  );
}

export default App;
