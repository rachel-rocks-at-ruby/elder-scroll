import React from "react";
import Card from "./Card";
import "./Cards.css";

class Cards extends React.Component {
	state = {
		cards: [],
		displayCards: [],
		loading: false,
		page: 1,
		searchedCards: [],
		searchTerm: "",
	};

	getCardsToDisplay = () => {
		const { cards, page, searchedCards, searchTerm } = this.state;
		const nextPage = page + 1;
		const displayCards = searchTerm
			? searchedCards.slice(0, nextPage * 20 + 1)
			: cards.slice(0, nextPage * 20 + 1);
		this.setState({ loading: true });
		this.setState({ displayCards, loading: false, page: nextPage })
	}

	handleSearch = (event) => {
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
			this.getCardsToDisplay();
		}
	}

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
	this.setState({ loading: true });
    fetch(`https://api.elderscrollslegends.io/v1/cards`)
		.then((response) => response.json())
		.then((data) =>
		this.setState({
			cards: data.cards,
			displayCards: data.cards.slice(0, 21),
		})
		)
		.catch((err) => console.log(err))
		.finally(() => this.setState({ loading: false }));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const { displayCards, loading } = this.state;
    return (
		<main className="Container">
			<h1>Elder Scrolls</h1>

			<div className="Search-container">
				<label className="Label" htmlFor="search">
				Search by name:{" "}
				</label>
				<input id="search" name="search" onChange={this.handleSearch} />
			</div>

			{displayCards.length && (
				<div className="Grid-row">
				{displayCards.map((card) => {
					const { id } = card;
					return <Card key={id} card={card} />;
				})}
				</div>
			)}
			{loading && <div className="Loading">Loading</div>}
		</main>
    );
  }
}

export default Cards;
