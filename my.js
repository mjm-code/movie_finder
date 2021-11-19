//js code 

//get Api key from http://www.omdbapi.com/ and paste it here
var apiKey = '';

//api key reminder
if(!apiKey) apiKey = prompt('Please go to http://www.omdbapi.com/ and register to obtain api keys.\n Then paste it in my.js file or type your Omdbapi key here:');

//declare results element as variable resultsSection
const resultsSection = document.getElementById('results');

//get users input from searchBar
const searchFilm = () => {
    const userInput = document.getElementById('searchBar').value;
    console.log(userInput);
    resultsSection.innerHTML = ' ';
    callApi(userInput);
} 

//call endpoint to get movies data 
const callApi = (title) => {
    fetch(`http://www.omdbapi.com/?s=${title}&apikey=${apiKey}`)
    .then( res => res.json() )
    .then( 
            data => displayMovies(data)  
            
        );
}

//display results in resultsSection
const displayMovies = ( res ) => {
    
    
    try {
        res.Search.forEach(movie => {
            resultsSection.innerHTML += `<pre> ${movie.Title} </pre> `
            console.log(movie.Title)
        });
      }
      catch(err) {
        //error
        console.log('error');
      }

    //resultsSection.innerHTML = `<pre> ${ JSON.stringify(res) } </pre> `
}


