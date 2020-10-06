import React from "react";
import "./Card.css";

class Card extends React.Component {
    render() {
        const {
            card: { name, imageUrl, set, text, type },
        } = this.props;
        return (
            <section className="Card">
            <div>
                <img alt={name} className="Card-image" src={imageUrl} />
            </div>
            <article className="Card-info">
                <div>
                <strong>Name:</strong> {name}
                </div>
                {text && (
                <div>
                    <strong>Text:</strong> {text}
                </div>
                )}
                <div>
                <strong>Set Name:</strong> {set.name}
                </div>
                <div>
                <strong>Type:</strong> {type}
                </div>
            </article>
            </section>
        );
    }
  
};

export default Card;
