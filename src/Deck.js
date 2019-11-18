import React from 'react';
import Card from './Card';
import axios from 'axios';
import './Deck.css';
const BASE_API_URL = 'https://deckofcardsapi.com/api/deck';

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawn: []
    };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    let deck = await axios.get(`${BASE_API_URL}/new/shuffle/`);
    this.setState({
      deck: deck.data
    });
  }

  async getCard() {
    let id = this.state.deck.deck_id;
    try {
      let cardURL = `${BASE_API_URL}/${id}/draw/`;
      // MAKE REQUEST USING DECK ID
      let cardRes = await axios.get(cardURL);
      if (!cardRes.data.success) {
        throw new Error('No Card Remaining');
      }
      // SET STATE USING NEW CARD INFO
      let card = cardRes.data.cards[0];
      this.setState(st => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }));
    } catch (err) {
      alert(err);
    }
  }

  render() {
    const cards = this.state.drawn.map(c => (
      <Card key={c.id} name={c.name} image={c.image} />
    ));
    return (
      <div>
        <h1 className="Deck-title">
          <i class="fas fa-heart"></i> Card Dealer <i class="fas fa-heart"></i>
        </h1>
        <h2 className="Deck-title sub-title">
          <i class="fas fa-heart"></i> Simple React Demo{' '}
          <i class="fas fa-heart"></i>
        </h2>
        <button className="Deck-btn" onClick={this.getCard}>
          Get Card
        </button>
        <div className="Deck-cardarea">{cards}</div>
      </div>
    );
  }
}

export default Deck;
