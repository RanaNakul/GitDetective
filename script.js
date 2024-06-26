const url = "https://api.github.com/users/";
const root = document.documentElement.style;
const noresults = document.querySelector('.error');
const btnmode = document.querySelector("#btn-mode");
const modetext = document.querySelector("#mode-text");
const modeicon = document.querySelector('#mode-icon');
const btnsubmit = document.querySelector("#submit");
const input = document.querySelector("#input");
const avatar = document.querySelector(".avatar");
const userName = document.querySelector("#name")
const date = document.querySelector("#date");
const user = document.querySelector("#user");
const bio = document.querySelector(".bio");
const repos = document.querySelector("#repos");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");
const user_location = document.querySelector("#location");
const page = document.querySelector("#page");
const twitter = document.querySelector("#twitter");
const company = document.querySelector("#company");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];



init();

btnsubmit.addEventListener("click" ,function () {
    if(input.value !== ""){
        getUserData(url + input.value);
    }
});

input.addEventListener("keydown",(e) => {
    if(!e){
        var e = window.event;
    }
    if(e.key == "Enter"){
        if(input.value !== ""){
            getUserData(url + input.value);
        }
    }
});

input.addEventListener("input" , function(){
    noresults.style.display = "none";
});

btnmode.addEventListener("click" , function () {
    if(darkMode == false){
        darkModeProperties();
    }else{
        lightModeProperties();
    }
});

function getUserData(getUrl){
    fetch(getUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            updateProfile(data);
        })
        .catch((error) => {
            throw error;
        });
}

function updateProfile(data){   
    if(data.message !== "Not Found"){
        noresults.style.display = "none";
        function checkNull(param1, param2){
            if(param1 === "" || param1 === null){
                param2.style.opacity = 0.5;
                param2.previousElementSibling.style.opacity=0.5;
                return false;
            }else{
                return true;
            }
        }
        avatar.src = data?.avatar_url;
        userName.innerText = data?.name === null ? data?.login : data?.name;
        user.innerText = `@${data?.login}`;
        user.href = data?.html_url;
        datesegments = data?.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
        bio.innerText = data?.bio == null ? "This profile has no bio" : data?.bio;
        repos.innerText = data?.public_repos;
        followers.innerText = data?.followers;
        following.innerText = data?.following;
        user_location.innerText = checkNull(data?.location, user_location) ? data?.location : "Not Available";
        page.innerText = checkNull(data?.blog, page) ? data?.blog : "Not Available";
        page.href = checkNull(data?.blog, page) ? data?.blog : "#";
        twitter.innerText = checkNull(data?.twitter_username, twitter) ? data?.twitter_username : "Not Available";
        twitter.href = checkNull(data?.twitter_username, twitter) ? `https://twitter.com/${data?.twitter_username}` : "#";
        company.innerText = checkNull(data?.company, company) ? data?.company : "Not Available";

    }else{
        noresults.style.display = "block";
    }
}

function init(){
    let darkMode = false;

    const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    if(localStorage.getItem("dark-mode") === null){
        if(prefersDarkMode){
            darkModeProperties();
        }
        else{
            lightModeProperties();
        }
    }
    else{
            if(localStorage.getItem("dark-mode") === "true"){
                darkModeProperties();
        }
        else{
                lightModeProperties();
        }

    }

    getUserData(url + "rananakul")
}

function darkModeProperties(){
    root.setProperty("--lm-bg","#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modetext.innerText = "LIGHT";
    modeicon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    localStorage.setItem("dark-mode", true);
}

function lightModeProperties(){
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modetext.innerText = "DARK";
    modeicon.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    localStorage.setItem("dark-mode", false);
}
