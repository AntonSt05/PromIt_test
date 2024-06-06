import React from 'react';
import Converter from './components/Converter';
import './App.scss';

const App: React.FC = () => {
    return (
        <div className="app-container">
            <Converter />
        </div>
    );
};

export default App;