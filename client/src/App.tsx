import { Outlet } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import EventForm from './components/EventForm';

function App() {
  return (
    <div>
      <Navbar />
      <main className='container pt-5'>
        <EventForm/>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
