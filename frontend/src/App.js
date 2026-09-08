import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import Home from './pages/Home';
import History from './pages/History';
import About from './pages/About';
import Work from './pages/Work';
import Projects from './pages/Projects';
import Products from './pages/Products';
import GalleryPage from './pages/GalleryPage';
import Contact from './pages/Contact';
import routes from './siteRoutes.json';
const pages = { Home, History, About, Work, Projects, Products, GalleryPage, Contact };
export default function App() {
 return <BrowserRouter basename="/asopumamaki"><Routes><Route element={<SiteLayout />}>
 {routes.map(route => {const Page = pages[route.page]; return <Route key={route.path} path={route.path} element={<Page category={route.category} />} />;})}
 <Route path="*" element={<section className="section-padding container-custom"><h1 className="section-title">Página no encontrada</h1><Link to="/" className="btn-primary">Volver al inicio</Link></section>} />
 </Route></Routes></BrowserRouter>;
}
