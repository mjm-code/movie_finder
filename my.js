//js code 

//get Api key from http://www.omdbapi.com/ and paste it here
var apiKey = '';
var movies;
var mainBox = document.getElementById('mainBox');

//api key reminder
if(!apiKey) apiKey = prompt('Please head to http://www.omdbapi.com/ and register to obtain api keys.\n Then paste it in my.js file or type your Omdbapi key here:');

//declare results element as variable resultsSection
const resultsSection = document.getElementById('results');

//get users input from searchBar
const searchFilm = () => {
    const userInput = document.getElementById('searchBar').value;
    resultsSection.innerHTML = ' ';
    callApi(userInput);
} 

//call endpoint to get movies data 
const callApi = (title) => {
    if(!apiKey) alert('There is a problem with your API key!');
    fetch(`http://www.omdbapi.com/?s=${title}&apikey=${apiKey}`)
    .then( res => res.json() )
    .then( 
            
            data => displayMovies(data)             
        );
}

//display results in resultsSection
const displayMovies = ( res ) => {
    movies = res;
    
    try {
        res.Search.forEach(movie => {
            resultsSection.scrollIntoView();
            resultsSection.style.backgroundColor = 'rgba(240, 248, 255, 0.87)';
            resultsSection.innerHTML += `<li id="${movie.imdbID}" onclick=(movieDetails('${movie.imdbID}'))><img src=${movie.Poster} height="70px" width="60px" alt="${movie.imdbID}"/><a> ${movie.Title} </a></li> `
            
        });
      }
      catch(err) {
        //error
        console.log('error');
      }

    //resultsSection.innerHTML = `<pre> ${ JSON.stringify(res) } </pre> `
}

//make a call to api backend to obtain detailed response and bind detailedCard to resultsSection
const movieDetails = (id) => {
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
    .then( res => res.json() )
    .then( 
            
            data => {
                bindDetailsToScreen(data);
            }            
        );
}


const bindDetailsToScreen = (movie) => {
    console.log(movie);
    resultsSection.innerHTML = ' ';
    resultsSection.style.backgroundColor= 'black';
    resultsSection.appendChild(detailedCard(movie));
}

const detailedCard = (m) => {
    let card = document.createElement('div');
    card.style.display = 'flex';
    card.style.flexDirection= 'column';
    card.style.position = 'relative';
    card.style.marginBottom = '200px';

    //background
    let background = document.createElement('div');
    let el = background.style;
        el.position = 'absolute';
        el.top = '0';
        el.left= '0';
        // el.margin= '5px 5px 5px 0px';
        el.width = '100%';
        el.height = '100%';
        el.maxWidth = '800px';
        el.backgroundImage = `url('${m.Poster}')`;
        el.backgroundSize = '75vw 80vh';
        el.filter= 'blur(50px)';
        el.webkitFilter= 'blur(10px)';
        el.opacity= '0.5';
        el.zIndex= '0';
    
    card.appendChild(background);    
    
    //title
    let title = document.createElement('h5');
    title.innerHTML = m.Title;
    let el2 = title.style;
        el2.zIndex= '10';
        el2.textAlign= 'center';
        el2.minWidth= '100%';
    
    card.appendChild(title);

    //info
    let info = document.createElement('div');
        info.style.display = 'flex';
        info.style.justifyContent = 'space-around';
        info.style.fontSize= 'medium';
        info.zIndex ='55';
    
    let type = document.createElement('p');
        type.innerHTML =`Type: ${m.Type}` ;  
        type.style.zIndex = '55';  

    let length = document.createElement('p');
        length.innerHTML =  `Length: ${m.Runtime}`;
        length.style.zIndex = '55';

    info.appendChild(type);
    info.appendChild(length);
    card.appendChild(info);

    //image
    let image = document.createElement('img');
        image.src = m.Poster;
    let el3 = image.style;
        el3.width= '200px';
        el3.height= '250px';
        el3.flex = '1';
        el3.zIndex= '55';
        
    //description
    let description = document.createElement('p');
        description.innerHTML= m.Plot;
    let el4 = description.style;
        el4.flex= '2';
        el4.fontSize= 'medium';
        el4.zIndex= '50';
        el4.padding= '10px';

    let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.padding = '20px';
        body.style.justifyContent= 'space-between';
        body.style.alignItems= 'center';
        body.appendChild(image);
        body.appendChild(description);

    card.appendChild(body);

    return card;
}


const goToPage = (e, id) => {
    e.preventDefault();
    mainBox.innerHTML = `<h1> ${id} </h1><div class="header"><h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </h4></div>`;
}

