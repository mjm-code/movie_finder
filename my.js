//js code 

//get Api key from http://www.omdbapi.com/ and paste it here
const apiKey = '';

const resultsSection = document.getElementById('results');

const searchFilm = (e) => {
    const userInput = document.getElementById('searchBar').value;
    resultsSection.innerHTML = ' ';
    callApi(userInput);
} 

const callApi = (title) => {
    fetch(`http://www.omdbapi.com/?s=${title}&apikey=${apiKey}`)
    .then( res => res.json() )
    .then( 
            data => displayMovies(data)  
            
        );
}

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


