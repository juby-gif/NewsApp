import React from "react";
import "./Card.css";

const Card = ({ title, subtitle, body, imageUrl, resizable, className }) => {
  const cardStyle = resizable ? { className } : null;

  return (
    <div className="card" style={cardStyle}>
      {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
      {title && <h2 className="card-title">{title}</h2>}
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
      <div className="card-content">
        {body}
      </div>
    </div>
  );
};

export default Card;
