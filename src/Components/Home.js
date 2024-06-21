import React from 'react'
import Notes from './Notes';
import LoadingPlaceholder from './LoadingPlaceholder';

const Home = (props) => {

  return (
    <div>
      <Notes showAlert={props.showAlert}/>
    </div>
  );
}

export default Home