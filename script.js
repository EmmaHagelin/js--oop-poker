// Del 1

class Card {
    constructor(suit, name, value) {
        this.suit = suit; //Färg 
        this.name = name; //Ex Kung, eller siffror
        this.value = value; //Värde
    }

    toString() {
        return `${this.name} ${this.suit} (${this.value})`;
    }
}

class Deck {
    constructor() {
        this.cards = [];
        this.createDeck();
    }

    createDeck() {
        const suits = ["Hjärter", "Ruter", "Klöver", "Spader"];
        const names = ["2", "3", "4", "5", "6", "7", "8", "9", "10",
            "Knekt", "Dam", "Kung", "Ess"];
        this.cards = [];
        for (const suit of suits) {
            names.forEach((name, i) => {
                this.cards.push(new Card(suit, name, i + 2)); //"2" får värdet två, Ess får värdet 14
            });
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw() {
        return this.cards.pop(); //tar översta kortet
    }
}


//testkod
const deck = new Deck();
console.log(deck.cards.map(c => c.toString()));
deck.shuffle();
console.log(deck.cards.map(c => c.toString()));


// Del två
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }

    receiveCard(card) {
        this.hand.push(card);
    }

    discard(index) {
        return this.hand.splice(index, 1)[0]; //tar fram kortet
    }

    getHandValue() {
        return this.hand.reduce((sum, card) => sum + card.value, 0);
    }

    showHand() {
        return this.hand.map((c, i) => `[${i}] ${c}`).join(", ");
    }
}
 
const slim = new Player("Slim");
const luke = new Player("Luke");
console.log(slim, luke);

for (let i = 0; i < 5; i++) {
  slim.receiveCard(deck.draw());
  luke.receiveCard(deck.draw());
}

//testkod
console.log("Kvar i leken:", deck.cards.length); // 42
console.log(slim.name, slim.showHand(), "Värde:", slim.getHandValue());
console.log(luke.name, luke.showHand(), "Värde:", luke.getHandValue());

// del 3

const discardPile = [];

discardPile.push(slim.discard(0), slim.discard(0)); 
discardPile.push(luke.discard(0), luke.discard(0));

slim.receiveCard(deck.draw()); 
slim.receiveCard(deck.draw());
luke.receiveCard(deck.draw()); 
luke.receiveCard(deck.draw());

//testkod
console.log("Kvar i leken", deck.cards.length);

// Del 4
discardPile.push(...slim.hand.splice(0));
discardPile.push(...luke.hand.splice(0));
deck.cards.push(...discardPile.splice(0));

//testkod
console.log(slim.hand.length, luke.hand.length, discardPile.length, deck.cards.length);
deck.shuffle();

//Del 5

class Dealer {
    constructor() {
        this.deck = new Deck(); //Dealern äger leken
        this.discardPile = [];
    }

    shuffle() {
        this.deck.shuffle();
    }

    deal(players, numberOfCards) {
        for (let i = 0; i < numberOfCards; i++) {
            for (const player of players) {
                player.receiveCard(this.deck.draw());
            }
        }
    }

    //fyll på varje spelares hand upp till fem kort
    refill(players, handSize = 5) {
        for (const player of players) {
            while (player.hand.length < handSize) {
                player.receiveCard(this.deck.draw());
            }
        }
    }

    collectCards(players) {
        for (const player of players) {
            this.discardPile.push(...player.hand.splice(0));
        }
        this.deck.cards.push(...this.discardPile.splice(0));
    }
}

//testkod
const dealer = new Dealer();
const players = [new Player("Slim"), new Player("Luke")];
dealer.shuffle();
dealer.deal(players, 5);
players.forEach(p => console.log(p.name, p.showHand()));

