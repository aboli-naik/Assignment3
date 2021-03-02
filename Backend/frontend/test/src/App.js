import './App.css';
import Hello from './components/Hello';
import Myclass from './components/Myclass';
import Name from './components/Name';
import Examples from './components/Examples';
import Form from './components/Form';

function App() {

  function click(){

    alert("clicke using this prop")
  }
  return (
    <div className='container'>
      <Hello name="aboli"/>
      <Myclass email ="aboli@gmail.com" myclick= {click} />
    <Name/>
 
    <Form/>
    </div>
  );
}

export default App;
