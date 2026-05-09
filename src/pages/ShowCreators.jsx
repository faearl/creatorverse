// ShowCreators.jsx
import Card from "../components/Card.jsx";
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ShowCreators({creators}) {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/creators') {
      document.getElementById('creators')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  if (creators === null) {
    return (<div class="loader"></div>)
  }
  if (creators.length === 0) {
    return (<h1>No Creators Yet</h1>)
  }
  return (
    <div id="creators">
      <h1 className="page-title">All Creators:</h1>
      <div className="cards-container">
        {creators.map((creator) => (
          <Card
            key={creator.id}
            id = {creator.id}
            name={creator.name}
            URL={creator.url}
            description={creator.description}
            imageURL={creator.imageURL} />
        ))}
      </div>
    </div>
  )
}

export default ShowCreators