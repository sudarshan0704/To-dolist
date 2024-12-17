import logo from './logo.svg';
import './App.css';
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home';
function App() {
  return (
    <div className="App">
    <Home/>
    </div>
  );
}

export default App;
