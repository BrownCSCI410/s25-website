import React from 'react';
import { Navbar } from './Components/NavBar/Navbar';
import { Welcome } from './Components/Welcome/Welcome';
import { Assignments } from './Components/Assignments/Assignments';
import { Lectures } from './Components/Lectures/Lectures';
import { Labs } from './Components/Labs and Sections/Labs';
import { Hours } from './Components/Hours/Hours';
import { Resources } from './Components/Resources/Resources';
import { Staff } from './Components/Staff/Staff';
import { TournamentResults } from './Components/TournamentResults/TournamentResults';
import './App.scss'


function App() {
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
      <TournamentResults />
    </div>
  );
}

export default App;

