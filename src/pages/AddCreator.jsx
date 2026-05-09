// AddCreator.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CreatorForm from './CreatorForm'
import { supabase } from '../client'

function AddCreator({ setCreators }) {
  const navigate = useNavigate()

  async function handleSubmit({ name, description, url, imageURL }) {
    const { data, error } = await supabase
      .from('creators')
      .insert({ name, description, url, imageURL })
      .select()
    if (error) {
      console.log(error)
    } else {
      setCreators((prev) => [...prev, data[0]])
      navigate('/creators')
    }
  }

  useEffect(() => {
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <CreatorForm
      title="Add Creator"
      onSubmit={handleSubmit}
    />
  )
}

export default AddCreator