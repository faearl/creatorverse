// Content Creator Info
import "./Card.css";
import { Link } from 'react-router-dom';

export default function Card({id, name,URL,description,imageURL}) {
    return (
        <div className = "card">
            <div className="card-body">
                <div className="card-left">
                    <img loading="lazy" src={imageURL} alt={name} className="card-image" />
                    <a href={URL} className="card-link">Channel</a>
                </div>
                <div className="card-right">
                   <Link to={`/view/${id}`}><h2 className="card-name">{name}</h2> </Link>
                    <p className="card-description">{description}</p>  
                </div>
            </div>
        </div>
    )
}
