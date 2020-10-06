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
		
		this.setState({ loading: true });
		const nextPage = page + 1;
		const sliceEnd = nextPage * 20;
		const displayCards = searchTerm
			? searchedCards.slice(0, sliceEnd)
			: cards.slice(0, (nextPage, sliceEnd));
		this.setState({ displayCards, loading: false, page: nextPage });
	}

	handleSearch = (event) => {
		const { cards } = this.state;
		const searchTerm = event.target.value.toLowerCase();
		
		if (!searchTerm) {
			this.setState({
				displayCards: cards.slice(0, 20),
				page: 1,
				searchedCards: [],
				searchTerm: ""
			});
		} else {
			const searchedCards = cards.filter((card) =>
				card.name.toLowerCase().includes(searchTerm)
			);
			this.setState({
				displayCards: searchedCards.slice(0, 20),
				searchedCards,
				searchTerm,
			});
		}
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
    const { displayCards, loading, searchTerm } = this.state;
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

			{searchTerm && !displayCards.length && <h1>No search results.</h1>}
		</main>
    );
  }
}

export default Cards;
