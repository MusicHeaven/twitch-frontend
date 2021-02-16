// If you don't want to host your server code and client code together, you can 
// pay AWS to host your server with HTTPS then config the api url endpoints like below
// const SERVER_ORIGIN = '<Your server's url>'; 
const SERVER_ORIGIN = '/jupiter';
// because frontend and backend will be on the same server, so do not need orirign (http://...:8080)
 
// endpoint
const loginUrl = `${SERVER_ORIGIN}/login`;
 
export const login = (credential) => {
    // fetch is a web api, return an obj of this class
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // to allow cookie response to backend
    credentials: 'include',
    body: JSON.stringify(credential)
    // the fetch request is not execute instantly, if execute successfully, do the following
    // but after fetch, the code after then will be execute (then was not execute)
    // method in "then" was put into the queue, when response was returned, this task will be execute
  }).then((response) => {
      // if successfully connect to the server
    if (response.status !== 200) {
      throw Error('Fail to log in');
    }
 
    return response.json();
  })
}
 
/*
fetch return promise, promise has a function call "then", this behavior call AJAX. which is async, which means the code was not executed as the order it's written
you can also write the then function
fetch (

).then((response) => {
    return response.json()
}).then((input) => {return input.json()})

content returned from previous then will be the used as input for the nest then

then is also a function. 
it will call the call back fuction that has been passed to it
*/
const registerUrl = `${SERVER_ORIGIN}/register`;
 
export const register = (data) => {
  return fetch(registerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to register');
    }
  })
}
 
const logoutUrl = `${SERVER_ORIGIN}/logout`;
 
export const logout = () => {
  return fetch(logoutUrl, {
    method: 'POST',
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to log out');
    }
  })
}
 
const topGamesUrl = `${SERVER_ORIGIN}/game`;
 
export const getTopGames = () => {
  return fetch(topGamesUrl).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to get top games');
    }
 
    return response.json();
  })
}
 
const getGameDetailsUrl = `${SERVER_ORIGIN}/game?game_name=`;
 
const getGameDetails = (gameName) => {
  return fetch(`${getGameDetailsUrl}${gameName}`).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to find the game');
    }
 
    return response.json();
  });
}
 
const searchGameByIdUrl = `${SERVER_ORIGIN}/search?game_id=`;
 
export const searchGameById = (gameId) => {
  return fetch(`${searchGameByIdUrl}${gameId}`).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to find the game');
    }
    return response.json();
  })
}
 
export const searchGameByName = (gameName) => {
  return getGameDetails(gameName).then((data) => {
    if (data && data.id) {
      return searchGameById(data.id);
    }
 
    throw Error('Fail to find the game')
  })
}
 
const favoriteItemUrl = `${SERVER_ORIGIN}/favorite`;
 
export const addFavoriteItem = (favItem) => {
  return fetch(favoriteItemUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ favorite: favItem })
  }).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to add favorite item');
    }
  })
}
 
export const deleteFavoriteItem = (favItem) => {
  return fetch(favoriteItemUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ favorite: favItem })
  }).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to delete favorite item');
    }
  })
}
 
export const getFavoriteItem = () => {
  return fetch(favoriteItemUrl, {
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to get favorite item');
    }
 
    return response.json();
  })
}
 
const getRecommendedItemsUrl = `${SERVER_ORIGIN}/recommendation`;
 
export const getRecommendations = () => {
  return fetch(getRecommendedItemsUrl, {
    credentials: 'include',
  }).then((response) => {
    if (response.status !== 200) {
      throw Error('Fail to get recommended item');
    }
 
    return response.json();
  })
}
