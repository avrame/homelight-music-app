export async function fetchConcerts() {
  try {
    const response = await fetch(
      "https://hl-candidate-events.herokuapp.com/concerts"
    );
    return await response.json();
  } catch (error) {
    console.log("Fetching all concerts failed", error);
  }
}

export async function fetchConcert(concertId) {
  try {
    const response = await fetch(
      `https://hl-candidate-events.herokuapp.com/concerts/${concertId}`
    );
    return await response.json();
  } catch (error) {
    console.log(`Fetching a concert with id '${concertId}' failed`, error);
  }
}

export async function fetchArtists() {
  try {
    const response = await fetch(
      "https://hl-candidate-events.herokuapp.com/artists"
    );
    return await response.json();
  } catch (error) {
    console.log("Fetching all Artists failed", error);
  }
}

export async function fetchArtistsList(artistIds) {
  try {
    const promises = artistIds.map(fetchArtistPromise);
    const responses = await Promise.all(promises);
    const artistsArray = [];
    for (const response of responses) {
      artistsArray.push(await response.json());
    }
    return artistsArray;
  } catch (error) {
    console.log(
      `Fetching artists with ids [${artistIds.join(",")}] failed`,
      error
    );
  }
}

export async function fetchArtistPromise(artistId) {
  return fetch(`https://hl-candidate-events.herokuapp.com/artists/${artistId}`);
}

export async function fetchArtist(artistId) {
  try {
    const response = await fetchArtistPromise(artistId);
    return await response.json();
  } catch (error) {
    console.log(`Fetching artist with id '${artistId}' failed`, error);
  }
}
