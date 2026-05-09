// EditCreator.jsx
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import CreatorForm from './CreatorForm'
import { supabase } from '../client'

function EditCreator({ setCreators, creators }) {
  const navigate = useNavigate()
  let params = useParams();
  const creator = creators.filter(creator => creator.id === Number(params.id))

  async function handleSubmit({ name, description, url, imageURL }) {
    const { data, error } = await supabase
      .from('creators')
      .update({ name, description, url, imageURL }).eq('id', creator[0].id)
      .select()
    if (error) {
      console.log(error)
    } else {
      setCreators((prev) => prev.map(c => c.id === creator[0].id ? data[0] : c))
      navigate(`/view/${creator[0].id}`)
    }
  }
  useEffect(() => {
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <CreatorForm
      title="Editing"
      onSubmit={handleSubmit}
      initialValues={creator[0]}
    />
  )
}

export default EditCreator