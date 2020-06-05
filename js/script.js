// script.js
// Weekly Assignment No. 6



class PlayingCard {
    constructor(element, face, suit) {
        /*
        Create properties for:
        - element
        - suit
        - face
        - img (set this to `img/${face}_of_${suit}.png`)
        - state (set this to 0)
        */
        this.element = element
        this.suit = suit
        this.face = face
        // face and suit are passed in through parameter
        this.img = `img/${face}_of_${suit}.png`
        this.state = 0


        // anonymous function
        this.element.addEventListener('click', () => {
            /*
            - The event listener should be for a click event
            - The event listener should have logic to switch out the this.element.src
            - It should also change the state if the card is flipped (this.state 0 or 1)
            - To show the back of the card use 'img/back.png'
            */

            // if state == 0, then front of card is shown
            // if state == 1, then back of card is shown
            if (this.state == 0) {

                this.element.src = this.img
                this.state = 1

            } else if (this.state == 1) {

                this.element.src = 'img/back.png'
            }
        })
    }

    showFaces() {
        this.element.src = this.img
    }

    showBacks() {
        this.element.src = 'img/back.png'
    }

// * end of playingCard class *
}


// this function is called by buildDeck() function
// it is called to create the image
function createCardImage() {
    /*
    - Create a constant named img and have it create a new img element
    - Set the src property of the img to 'img/back.png'
    - return the img
    */

    // creates a new img element, img.src is the image
    const img = document.createElement('img')
    img.src = 'img/back.png'
    return img


// * end of createCardImage *
}



function displayDeck() {
    /*
    - Create a loop that iterates through each card in the deck array
    - in the loop, append the card.element to the container
    - Use a forEach with an arrow function
    */

    // the forEach method calls a function once for each item
    // in an array, in order
    deck.forEach(card => {

        // container is an empty div
        container.appendChild(card.element)

    })

    // * end of displayDeck() function *
}

// shuffles deck, the deck array is assorted 
// randomly, using the Math.random() function
function shuffleDeck() {
    for (let i = 0; i < 1000; i++) {
        deck.sort(() => Math.random() - 0.5)
    }
}


function removeCard() {
    if (deck.length != 0) {
        card = document.querySelector('img')
        card.remove() // remove element
        deck.shift()  // clear it out of array
        if (deck.length == 0) {
            actions.innerHTML = 'No cards left in the deck. :-('
        }
    }
}

// this function builds the deck
function buildDeck() {
    // two arrays below
    const suits = ['hearts', 'spades', 'diamonds', 'clubs']
    const faces = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']

    suits.forEach(suit => {
        faces.forEach(face => {
            /*
            - Call the createdCardImage() function and assign the return img element to a variable named image
            - Set the id attribute of the image to `${face}_of_${suit}.png`
            - Use the .push method to push a new PlayingCard object into the deck array
            - Do the .push and object creation in a single statement
            */
            const image = createCardImage()

            image.setAttribute('id', `${face}_of_${suit}.png`)
            
            // deck is declared as an empty array, a global var
            // a new instance of PlayingCard is put into the 'deck' array
            deck.push(new PlayingCard(image, face, suit))
        })
    })
}

function clearActions() {
    actions.innerHTML = ''
}


// ** create an array for var deck, global variable ** 
let deck = []

const container = document.querySelector('#container')
const actions = document.querySelector('#actions')
const shuffleBtn = document.querySelector('#shuffle')
const removeBtn = document.querySelector('#remove')
const newDeckBtn = document.querySelector('#newdeck')
const showFacesBtn = document.querySelector('#showfaces')
const showBacksBtn = document.querySelector('#showbacks')

//
shuffleBtn.addEventListener('click', () => {
    actions.innerHTML = 'The deck of cards has been shuffled.'
    container.innerHTML = ''
    shuffleDeck() // shuffles deck
    setTimeout(displayDeck, 500) // displays the deck
    setTimeout(clearActions, 5000) // clears the statement
})

removeBtn.addEventListener('click', () => {
    actions.innerHTML = 'A card was removed.'
    removeCard() // removes card
    setTimeout(clearActions, 5000)
})
// deck array is created, deck is built, then displayed
newDeckBtn.addEventListener('click', () => {
    actions.innerHTML = 'A new deck of cards has been created.'
    deck = []
    container.innerHTML = ''
    buildDeck()
    setTimeout(displayDeck, 500)
    setTimeout(clearActions, 5000)
})

showFacesBtn.addEventListener('click', () => {
    actions.innerHTML = 'All card faces are now showing.'
     // for each card in the deck, showFaces() function
     // is called. deck is an instance of class PlayingCard
    deck.forEach(card => {
        card.showFaces()
    })
})

showBacksBtn.addEventListener('click', () => {
    actions.innerHTML = 'All card backs are now showing.'
    // for each card in the deck, showBacks() function
    // is called. deck is an instance of class PlayingCard
    deck.forEach(card => {
        card.showBacks()
    })
})
// The functions below are called when document is opened
// deck is built, shuffled and displayed
buildDeck()
shuffleDeck()
displayDeck()