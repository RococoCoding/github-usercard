import axios from 'axios'
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
    name, screenname, location, profile, followers, following, bio
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/


/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
async function getMyProfileData() {
  let myData = axios.get(`https://api.github.com/users/RococoCoding`)
  let wait = await myData
    console.log(wait)
}
getMyProfileData()
  
  // .then(followers => followerGetter(followers))
  // 


function followerGetter(followersURL) {
  axios.get(`${followersURL}`)
    .then(response => {return response.data})
    .then(followersArray => {
      followersArray.forEach(follower => {
        axios.get(`${follower.url}`)
        .then(response => cardMaker(response.data));
      });
    });
}

function cardMaker(person) {
  let card = document.createElement("div");
    card.classList.add("card");
  let img = document.createElement("img");
    img.setAttribute("src", `${person.avatar_url}`);
  let cardInfo = document.createElement("div")
    cardInfo.classList.add("card-info");
  let h3 = document.createElement("h3");
    h3.classList.add("name");
    h3.textContent = `${person.name}`;
  let username = document.createElement("p");
    username.classList.add("username");
    username.textContent = `${person.login}`;
  let location = document.createElement("p");
    location.textContent = `Location: ${person.location}`;
  let profile = document.createElement("p");
  let a = document.createElement("a");
    a.setAttribute("href", `${person.html_url}`);
    a.textContent = `Profile: ${person.html_url}`;
    profile.appendChild(a);
  let followers = document.createElement("p");
    followers.textContent = `Followers: ${person.followers}`;
  let following = document.createElement("p");
    following.textContent = `Following: ${person.following}`;
  let bio = document.createElement("p");
    bio.textContent = (`Bio: ${person.bio}`);
  card.appendChild(img);
  card.appendChild(cardInfo);
  cardInfo.appendChild(h3);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  document.querySelector(".cards").append(card);
  return person.followers_url;
}
/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
