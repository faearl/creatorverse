import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, useRoutes, useNavigate } from "react-router-dom";
import AddCreator from './pages/AddCreator.jsx';
import EditCreator from './pages/EditCreator.jsx';
import ShowCreators from './pages/ShowCreators.jsx';
import ViewCreator from './pages/ViewCreator.jsx';
import { supabase } from './client.js'


function Home() {
  const navigate = useNavigate();

  function handleViewCreators() {
    if (document.getElementById('creators')) {
      document.getElementById('creators').scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/creators')
    }
  }

  return (
    <div className="home">
      <h1 className="site-title">Creatorverse</h1>
      <div className="home-buttons">
        <button onClick={handleViewCreators}>View Creators</button>
        <button onClick={() => navigate('/add')}>Add Creator</button>
      </div>
    </div>
  )
}

function AppRoutes({ creators, setCreators }) {
  let element = useRoutes([
    { path: "/", element: <ShowCreators creators={creators} /> },
    { path: "/creators", element: <ShowCreators creators={creators} /> },
    { path: "/add", element: <AddCreator setCreators={setCreators} /> },
    { path: "/edit/:id", element: <EditCreator setCreators={setCreators} creators={creators} /> },
    { path: "/view/:id", element: <ViewCreator setCreators={setCreators} creators={creators} /> },
  ]);
  return element;
}

function App() {
  const [creators, setCreators] = useState(null)
  useEffect(() => {
    async function fetchCreators() {

      const { data, error } = await supabase.from('creators').select('*');
      if (error) {
        console.log(error)
      }
      else {
        setCreators(data);
      }
    }
    fetchCreators();

  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Home />
        <AppRoutes creators={creators} setCreators={setCreators} />
      </BrowserRouter>
    </div>
  );
}

export default App