// App.js
import React from 'react';
import FoodTracker from './components/FoodTracker';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <div className="pages">
        <FoodTracker />
      </div>
      <Footer />
    </div>
  );
}

export default App;
