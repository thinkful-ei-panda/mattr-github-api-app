'use strict';

const searchURL = 'https://api.github.com/users/';

function displayResults(responseJson) {
//   console.log(responseJson);
  $('#results-list').empty();
  for (let i in responseJson){
    console.log(responseJson[i])
    
    $('#results-list').append(
      `<li>
      <h3>${responseJson[i].name}</h3>
      <a href="${responseJson[i].html_url} target="blank">${responseJson[i].name}</a>
      </li>`
    )}
  $('#results').removeClass('hidden');
};

function getNews(query) {
  const url = `${searchURL}${query}/repos`;
  console.log(url);

  const options = {
    headers: new Headers({
      'content-type': 'application/json',
      'accept': 'application/vnd.github.nebula-preview+json'
    })
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    console.log(searchTerm)
    getNews(searchTerm);
  });
}

$(watchForm);