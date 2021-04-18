import React from 'react'
import FetchMovie from './files'

function App() {

  const ClickHandle = ()=>{
    FetchMovie()
  }


  return (
    <div className="App">
      <button onClick = {ClickHandle}>DownLoad</button>
    </div>
  );
}

export default React.memo(App)
