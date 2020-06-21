'use strict';

const searchURL = 'https://api.github.com/users/repos';

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.value.length & i<maxResults ; i++){
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li><h3><a href="${responseJson.value[i].url}">${responseJson.value[i].title}</a></h3>
      <p>${responseJson.value[i].description}</p>
      <p>By ${responseJson.value[i].body}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNews(query) {
  const params = {
    q: query,
    pageSize: maxResults
  };
  const queryString = formatQueryParams(params);
  const url = `${searchURL}/${queryString}`;

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
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    // const maxResults = $('#js-max-results').val();
    getNews(searchTerm, maxResults);
  });
}

$(watchForm);