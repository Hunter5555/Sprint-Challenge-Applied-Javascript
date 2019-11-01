// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Stduy the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.

const cardContainer = document.querySelector('.cards-container')

let propContainer = [];
axios.get('https://lambda-times-backend.herokuapp.com/articles')
.then(res => {

    for (prop in res.data.articles) {
        propContainer.push(prop);
    }
    propContainer.forEach(cur => {
        res.data.articles[cur].forEach( item => {
            cardContainer.appendChild(cardMaker(item));
        })
    })
})
.catch(err => {
    console.log(err);
})

const cardMaker = arr => {

    const main = document.createElement('div');
    const headline = document.createElement('div');
    const author = document.createElement('div');
    const imgContainer = document.createElement('div');
    const img = document.createElement('img');
    const span = document.createElement('span');


    main.classList.add('card');
    headline.classList.add('headline');
    author.classList.add('author');
    imgContainer.classList.add('img-container');


    main.appendChild(headline);
    main.appendChild(author);
    author.appendChild(imgContainer);
    author.appendChild(span);
    imgContainer.appendChild(img);
    
    headline.textContent = arr.headline;
    img.src = arr.authorPhoto;
    span.textContent = `By ${arr.authorName}`;

    return main;
}