import React, { useEffect } from 'react';
import { Navbar } from './Components/NavBar/Navbar';
import { Welcome } from './Components/Welcome/Welcome';
import { Assignments } from './Components/Assignments/Assignments';
import { Lectures } from './Components/Lectures/Lectures';
import { Labs } from './Components/Labs and Sections/Labs';
import { Hours } from './Components/Hours/Hours';
import { Resources } from './Components/Resources/Resources';
import { Staff } from './Components/Staff/Staff';
import './App.scss'

import { handleOnMove, updateLastMousePosition, originPosition } from './MouseEffects';

function App() {
  /** 
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleOnMove(e);
    const handleTouchMove = (e: TouchEvent) => handleOnMove(e);
    const handleMouseLeave = () => updateLastMousePosition(originPosition);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  */
  return (
    <div className="App">
      <Navbar />
      <Welcome />
      <Lectures />
      <Labs />
      <Assignments />
      <Resources />
      <Hours />  
      <Staff />
    </div>
  );
}

export default App;

