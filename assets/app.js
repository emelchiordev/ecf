
import './styles/app.css';
import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar';

const App = () => {
    return <>
        <NavBar />
    </>

}

const rootElement = document.querySelector('#app')
ReactDOM.render(<App />, rootElement)