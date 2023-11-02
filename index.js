const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/artists";

const state = {
  getArtists: [],
};

const artistsList = document.querySelector("#artists");

const addArtistForm = document.querySelector("#addArtists");
addArtistForm.addEventListener("submit", addArtistForm);

/**
 * Sync state with the API and rerender
 */
async function render() {
  await getArtists();
  renderArtists();
}
render();

/**
 * Update state with artists from API
 */
async function getArtists() {
  // This is almost identical to the example code in slides;
  // point out that we're using the response to update state
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.artists = json.data;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Handle form submission for adding a artist
 * @param {Event} event
 */
async function addArtist(event) {
  // This function is essentially just a wrapper around `createArtist`,
  // so you can move through it quickly.
  // You can discuss why we might want to have a separate function
  // or you can just put all the logic in here instead - your preference!
  event.preventDefault();

  await createArtists(
    addArtistForm.title.value,
    addArtistForm.imageUrl.value,
    addArtistForm.instructions.value
  );
}

/**
 * Ask API to create a new artist and rerender
 * @param {string} name name of artist
 * @param {string} imageUrl url of artist image
 * @param {string} description description of the artist
 */
async function createArtists(name, imageUrl, description) {
  try {
    // Take some time to explain the arguments being passed to `fetch`
    // since this is the first time students are seeing this.
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, imageUrl, description }),
    });
    const json = await response.json();

    // This is a good time to explain how we're handling errors.
    // Refer to the API documentation!
    // Differentiate between a network error and an API error.
    if (json.error) {
      throw new Error(json.message);
    }

    // Explain that making a call to the API doesn't actually change
    // the client state, so we'll need to refetch the data.
    render();
  } catch (error) {
    console.error(error);
  }
}

/**
 * Ask API to update an existing artist and rerender
 * NOTE: This is not currently used in the app, but it's here for reference.
 * @param {number} id id of the recipe to update
 * @param {string} name new name of artist
 * @param {string} imageUrl new url of artist image
 * @param {string} description new description for artist
 */
async function updateRecipe(id, name, imageUrl, description) {
  // This is almost identical to `createArtist`; here, you can spend some time
  // talking about REST principles and different HTTP methods.
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, imageUrl, description }),
    });
    const json = await response.json();

    if (json.error) {
      throw new Error(json.message);
    }

    render();
  } catch (error) {
    console.error(error);
  }
}

/**
 * Ask API to delete a artist and rerender
 * @param {number} id id of artist to delete
 */
async function deleteArtist(id) {
  // This is much simpler than `createArtist` so you can move through it quickly.
  // Instead, focus on how the event listener is attached to a rendered button
  // so that the correct artist is deleted.
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    // Explain that we're handling errors differently here, since
    // a successful deletion only sends back a status code.
    if (!response.ok) {
      throw new Error("Artist could not be deleted.");
    }

    render();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Render artists from state
 */
function renderArtists() {
  if (!state.artists.length) {
    artistsList.innerHTML = `<li>No artists found.</li>`;
    return;
  }
  // This uses a combination of `createElement` and `innerHTML`;
  // point out that you can use either one, but `createElement` is
  // more flexible and `innerHTML` is more concise.
  const artistCards = state.artists.map((artist) => {
    const artistCard = document.createElement("li");
    artistCard.classList.add("artists");
    artistCard.innerHTML = `
      <h2>${artist.name}</h2>
      <img src="${artist.imageUrl}" alt="${artist.name}" />
      <p>${artist.description}</p>
    `;
    return li;
  }

    // We use createElement because we need to attach an event listener.
    // If we used `innerHTML`, we'd have to use `querySelector` as well.
    const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Recipe";
  artistCards.append(deleteButton);

  // Explain how closure allows us to access the correct artist id
  deleteButton.addEventListener("click", () => deleteArtist(artist.id));

  return artistCard;
});
artistList.replaceChildren(...artistCards);
}