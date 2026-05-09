import "./ViewCreator.css";
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../client'

function ViewCreator({ creators, setCreators }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false)

  function onDelete() {
    setShowModal(true)
    document.body.style.overflow = 'hidden'
  }

  function onCancel() {
    setShowModal(false)
    document.body.style.overflow = 'auto'
  }

  async function onConfirm() {
    const { error } = await supabase.from('creators').delete().eq('id', creator[0].id)
    if (error) {
      console.log(error)
    } else {
      setCreators((prev) => prev.filter(c => c.id !== creator[0].id))
      document.body.style.overflow = 'auto'
      navigate('/creators')
    }
  }

  useEffect(() => {
    document.getElementById('view-creator')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  let params = useParams();
  if (creators === null) return null
  const creator = creators.filter(creator => creator.id === Number(params.id))

  return (
    <div className="creator-wrapper" id="view-creator">
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h1>WAIT!!!!</h1>
            <h2>Are you sure you want to delete <span style={{ color: '#ff9ae9' }}>{creator[0].name}</span>?</h2>
            <div className="creator-buttons">
              <button className="delete-button" onClick={onConfirm}>Yes</button>
              <button className="delete-button" onClick={onCancel}>No</button>
            </div>
          </div>
        </div>
      )}
      <div className="creator">
        <div className="creator-body">
          <div className="creator-left">
            <img loading="lazy" src={creator[0].imageURL} className="creator-image" />
            <a href={creator[0].url} className="creator-link">Channel</a>
          </div>
          <div className="creator-right">
            <h1 className="creator-name">{creator[0].name}</h1>
            <p className="creator-description">{creator[0].description}</p>
          </div>
        </div>
        <div className="creator-buttons">
          <button className="edit-button" onClick={() => navigate(`/edit/${creator[0].id}`)}>Edit</button>
          <button onClick={onDelete} className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default ViewCreator