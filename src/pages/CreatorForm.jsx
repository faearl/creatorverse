import "./CreaterForm.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

function CreatorForm({ title, onSubmit, initialValues = {} }) {
    const navigate = useNavigate()

    const [name, setName] = useState(initialValues.name || '')
    const [description, setDescription] = useState(initialValues.description || '')
    const [url, setUrl] = useState(initialValues.url || '')
    const [imageURL, setImageURL] = useState(initialValues.imageURL || '')

    function handleSubmit() {
        onSubmit({ name, description, url, imageURL })
    }

    function onCancel() {
        navigate(-1)
    }

    return (
        <div className="form-wrapper" id="form">
            <div className="form">
                <h1 className="form-title">{title}</h1>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Channel URL</label>
                    <input type="text" placeholder="Enter channel URL" value={url} onChange={(e) => setUrl(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input type="text" placeholder="Enter image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
                </div>
                <div className="form-buttons">
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default CreatorForm