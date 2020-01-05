export async function fetchConcerts() {
  try {
    const response = await fetch(
      "https://hl-candidate-events.herokuapp.com/concerts?_sort=name&_order=asc"
    );
    return response.json();
  } catch (error) {
    console.log("Failed to fetch all concerts", error);
  }
}

export async function fetchConcert(concertId) {
  try {
    const response = await fetch(
      `https://hl-candidate-events.herokuapp.com/concerts/${concertId}`
    );
    return response.json();
  } catch (error) {
    console.log(`Failed to fetch the concert with id '${concertId}'`, error);
  }
}

export async function fetchArtists() {
  try {
    const response = await fetch(
      "https://hl-candidate-events.herokuapp.com/artists?_sort=name&_order=asc"
    );
    return response.json();
  } catch (error) {
    console.log("Failed to fetch all artists", error);
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
      `Failed to fetch artists with ids [${artistIds.join(",")}]`,
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
    return response.json();
  } catch (error) {
    console.log(`Failed to fetch artist with id '${artistId}'`, error);
  }
}

export async function fetchVenues() {
  try {
    const response = await fetch(
      "https://hl-candidate-events.herokuapp.com/venues?_sort=name&_order=asc"
    );
    return response.json();
  } catch (error) {
    console.log("Failed to fetch all venues.", error);
  }
}

export async function fetchVenueBySlug(slug) {
  try {
    const response = await fetch(
      `https://hl-candidate-events.herokuapp.com/venues?slug=${slug}`
    );
    return response.json();
  } catch (error) {
    console.log(`Failed to fetch venue with slug '${slug}'`, error);
  }
}
