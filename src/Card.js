import React from 'react';
import './Card.css';
class Card extends React.Component {
  //   transform: translate(10px, 20px) rotate(20deg);
  constructor(props) {
    super(props);
    let angle = Math.random() * 90 - 45;
    let xPos = Math.random() * 40 - 20;
    let yPos = Math.random() * 40 - 20;

    this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
  }
  render() {
    return (
      <div>
        <img
          style={{ transform: this._transform }}
          className="Card"
          src={this.props.image}
          alt={this.props.name}
        />
      </div>
    );
  }
}

export default Card;
