// Async Await
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
   try {
      const inputKeyword = document.querySelector('.input-keyword');
      const movies = await getMovie(inputKeyword.value);
      updateUI(movies);
   } catch (error) {
      alert(error);
   }
});

function getMovie(keyword) {
   return fetch('http://www.omdbapi.com/?apikey=29d9f331&s=' + keyword)
      .then(response => {
         if (!response.ok) {
            throw new Error(response.statusText);
         }
         return response.json();
      })
      .then(response => {
         if (response.Response === "False") {
            throw new Error(response.Error);
         }
         return response.Search;
      });
}

function updateUI(movies) {
   let cards = '';
   movies.forEach(m => cards += showCards(m));
   const movieContainer = document.querySelector('.movie-container');
   movieContainer.innerHTML = cards;
}

// event binding
document.addEventListener('click', async function (e) {
   try {
      if (e.target.classList.contains('modal-detail-button')) {
         const imdbid = e.target.dataset.imdbid;
         const movieDetail = await getMovieDetail(imdbid);
         updateUIDetail(movieDetail);
      }
   } catch (error) {
      console.log(error);
   }
})

function getMovieDetail(imdb) {
   return fetch('http://www.omdbapi.com/?apikey=29d9f331&i=' + imdb)
      .then(response => {
         console.log(response);
         return response.json();
      })
      .then(m => {
         return m;
      });
}

function updateUIDetail(m) {
   const movieDetail = showMovieDetails(m);
   const modalBody = document.querySelector('.modal-body');
   modalBody.innerHTML = movieDetail;
}




function showCards(m) {
   return `<div class="col-md-4 my-3">
             <div class="card">
               <img src="${m.Poster}" class="card-img-top">
               <div class="card-body">
                 <h5 class="card-title">${m.Title}</h5>
                 <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                 <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Details</a>
               </div>
             </div>
           </div>`;
}

function showMovieDetails(m) {
   return `<div class="container-fluid">
             <div class="row">
               <div class="col-md-3">
                 <img src="${m.Poster}" class="img-fluid">
               </div>
               <div class="col-md">
                 <ul class="list-group">
                   <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                   <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                   <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                   <li class="list-group-item"><strong>Writter : </strong>${m.Writer}</li>
                   <li class="list-group-item"><strong>Plot : </strong> <br> ${m.Plot}</li>
                 </ul>
               </div>
             </div>
           </div>`;
}