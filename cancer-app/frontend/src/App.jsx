import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Pipeline from './components/Pipeline';
import Dashboard from './components/Dashboard';
import Predictor from './components/Predictor';
import CancerCards from './components/CancerCards';
import CancerEducation from './components/CancerEducation';
import Developers from './components/Developers';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Hero />
            <About />
            <Pipeline />
            <Dashboard />
            <Predictor />
            <CancerCards />
            <CancerEducation />
            <Developers />
            <TechStack />
            <Footer />
        </div>
    );
}

export default App;
