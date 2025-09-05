// DOM-Manupulation

const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const quoteAuthor = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')  
const loader = document.getElementById('loader')

// Show Loading
function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}


// Complete
function complete(){
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Get Quote From API
async function getQuote() {
    try {
      loading();

    const apiUrl = 'https://api.quotable.io/random'
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check if the quote author field is blank so filled it by 'Unknown'!
    if(!data.author){
      quoteAuthor.textContent = 'Unknown';
    }else{
      quoteAuthor.textContent = data.author;
    }

    // check quote text to determine styling

    if(data.content > 50){
      quoteText.classList.add('long-quote')
    }else{
      quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = data.content;
    complete();
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
}


// Tweet Quote
function tweetQuote(){
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent};`
   window.open(twitterUrl, '_blank')
}

//  Event Listeners
newQuoteBtn.addEventListener('click',getQuote)
twitterBtn.addEventListener('click',tweetQuote )

// On Load
getQuote();


