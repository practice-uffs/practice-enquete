import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import HeaderLogo from './Components/headerLogo.jsx';

import Enquete from './Components/Enquete.jsx';

import NewsLetter from './Components/newsLetter.jsx';
import Footer from './Components/Footer.jsx';


function App() {
  return (
    <div className="App">
      <HeaderLogo />

      <Enquete />

      <NewsLetter />
      <Footer />
    </div>
  );
}

export default App;
