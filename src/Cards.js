import React from "react";
import Card from "./Card";
import "./Cards.css";

class Cards extends React.Component {
	state = {
		cards: [],
		loading: false,
		page: 1,
		searchedCards: [],
		searchTerm: "",
	};

  getCards = () => {
    const { cards, page } = this.state;
    const nextPage = page + 1;
    this.setState({ loading: true });
    fetch(
    	`https://api.elderscrollslegends.io/v1/cards?page=${nextPage}&pageSize=20`
    )
		.then((response) => response.json())
		.then((data) =>
			this.setState({ cards: cards.concat(data.cards), page: nextPage })
		)
		.catch((err) => console.log(err))
		.finally(() => this.setState({ loading: false }));
  	}

	handleSearch = (event) => {
		// TODO: what am I searching? all results?
		const { cards } = this.state;
		const searchTerm = event.target.value.toLowerCase();
		const searchedCards = cards.filter((card) =>
			card.name.toLowerCase().includes(searchTerm)
		);
		this.setState({ searchedCards, searchTerm });
	};

	handleScroll = () => {
		const windowHeight =
			"innerHeight" in window
			? window.innerHeight
			: document.documentElement.offsetHeight;
		const body = document.body;
		const html = document.documentElement;
		const docHeight = Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight
		);
		const windowBottom = windowHeight + window.pageYOffset;
		if (windowBottom >= docHeight) {
			this.getCards();
		}
	}

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
	this.setState({ loading: true });
    fetch(`https://api.elderscrollslegends.io/v1/cards?page=1&pageSize=20`)
		.then((response) => response.json())
		.then((data) => this.setState({ cards: data.cards }))
		.catch((err) => console.log(err))
		.finally(() => this.setState({ loading: false }));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const { cards, loading, searchedCards, searchTerm } = this.state;
    const cardsToDisplay = searchTerm ? searchedCards : cards;
    return (
	<main className="Container">
		<h1>Elder Scrolls</h1>

		<div className="Search-container">
			<label className="Label" htmlFor="search">
			Search by name:{" "}
			</label>
			<input id="search" name="search" onChange={this.handleSearch} />
		</div>

		{cards.length && (
			<div className="Grid-row">
			{cardsToDisplay.map((card) => {
				const { id } = card;
				return <Card key={id} card={card} />;
			})}
			</div>
		)}
		{loading && <h1>Loading...</h1>}
	</main>
    );
  }
}

export default Cards;
