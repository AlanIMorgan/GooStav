const navMenu = document.getElementById("sites_list");
const newSiteModal = document.getElementById("new_site_modal");
const siteNameInpt = document.getElementById("site_name");
const siteLinkInpt = document.getElementById("site_link");
const siteKeywrdsInpt = document.getElementById("site_keywords");

const sharingSite = window.location.search;

const urlParams = new URLSearchParams(sharingSite);

if (urlParams.get('link') != null){

    sharedSiteLink = urlParams.get("link");

    navMenu.classList.add("nav__li-submenu-ul_list");

    newSiteModal.classList.replace("hidden", "new_site_modal-form");

    siteLinkInpt.value = sharedSiteLink;

    siteNameInpt.focus();
}

// Background

homeImg = document.getElementById("home_img").getElementsByTagName("img")[0];

bckgrndInpt = document.getElementById("bckgrnd_sttng");

bckgrndInpt.addEventListener("input", ()=>{changeBackground(bckgrndInpt.value); location.reload();});

localStorage.getItem("bckgrnd") != null ?

    changeBackground(localStorage.getItem("bckgrnd") ) :

homeImg.src = "";

function isEmptyOrSpaces (str) {

    return str == null || str.match(/^\s*$/) !== null;
}

function changeBackground (url){

    switch (url.includes("http") ){

        case false:

            localStorage.removeItem("bckgrnd");

            localStorage.removeItem("comp_bck");
        break;

        default:

            localStorage.setItem("bckgrnd", url);

            localStorage.removeItem("comp_bck");

            homeImg.src = url;

            document.getElementById("img_mask").style = "z-index: 1;";
        break;
    }
} /* 

document.getElementById("random_wpp").addEventListener("click", ()=>{

    resolution = window.innerWidth + "x" + window.innerHeight;

    fetch("https://source.unsplash.com/random/" + resolution + "/?night")

    .then(response => {

        changeBackground(response.url);

        location.reload();
    })

    .catch(err => console.log('Solicitud fallida', err) );
}); */

document.getElementById("delete_wpp").addEventListener("click", ()=>{changeBackground(''); location.reload();});

// Nickname

const nickName = document.getElementById("nick_sttng");

const searchInpt = document.getElementById("google-search");

nickName.addEventListener("blur", ()=>{

    newNick = nickName.value;

    if (isEmptyOrSpaces(newNick) ){

        localStorage.removeItem("user");

        return location.reload();
    }

    if (newNick != localStorage.getItem("user") ){

        localStorage.setItem("user", nick);

        return location.reload();
    }

    return
});

switch (localStorage.getItem("user") ){

    case null:

        searchInpt.placeholder = "¿Buscas películas, música o libros?";

    break;

    default:

        nickName.value = localStorage.getItem("user");

        searchInpt.placeholder = "¡Hola, " + nickName.value + "!";

    break;
}

// Menus

const navBtn = document.getElementById('nav_btn');
const navListBtn = document.getElementById('nav_btn-list');
const profileNavBtn = document.getElementById('nav_profile_btn');
const resultsBoxC = document.getElementById("results_box_container");
const results = document.getElementById("results_box");
const profileNavMenu = document.getElementById("profile_menu");
const fullScreenBtn = document.getElementById("full_screen_btn");
const home = document.querySelector(".home");

navBtn.addEventListener("click", showHideNav);

navListBtn.addEventListener("click", ()=>{

    navMenu.classList.toggle("nav__li-submenu-ul_list");
    profileNavMenu.classList.remove("block");
});

profileNavBtn.addEventListener("click", ()=>{

    profileNavMenu.classList.toggle("block");
    navMenu.classList.remove("nav__li-submenu-ul_list");
});

fullScreenBtn.addEventListener("click", ()=>{

    home.requestFullscreen();
});

home.addEventListener("click", ()=>{

    navMenu.classList.remove("nav__li-submenu-ul_list");
    profileNavMenu.classList.remove("block");
});

function showHideNav(){

    navMenu.classList.toggle("block");
    navMenu.classList.remove("hide");
    navMenu.classList.remove("nav__li-submenu-ul_list");

    profileNavMenu.classList.replace("block", "hide");
}

// CLOCK

const clockSttng = document.getElementById("clock_sttng");

clockSttng.addEventListener("input", ()=>{

    if (clockSttng.checked){

        localStorage.setItem("clock", "true");

        return location.reload();
    }

    localStorage.removeItem("clock");

    return location.reload();
} );

if (localStorage.getItem("clock") != null){

    clockSttng.checked = true;

    createClock();
}

const clockContainer = document.getElementById("clock");

function createClock() {

    setInterval( ()=>{

        date = new Date();

        hrs = date.getHours();
        mins = date.getMinutes();
        secs = date.getSeconds();

        period = "AM";

        if (hrs == "00" || 0) {

            hrs = 12;

            showCalendar(currentMonth, currentYear);
        }

        else if (hrs > 12) {

            hrs = hrs - 12;

            period = "PM";
        }

        hrs = hrs < 10 ? "0" + hrs : hrs;

        mins = mins < 10 ? "0" + mins : mins;

        secs = secs < 10 ? "0" + secs : secs;

        time = `${hrs}:${mins}:${secs} ${period}`;

        clockContainer.innerText = time;

    }, 1000);
}

//CALENDAR

const today = new Date();

currentMonth = today.getMonth();
currentYear = today.getFullYear();

const selectYear = document.getElementById("year");

selectYear.addEventListener("input", jump);

const selectMonth = document.getElementById("month");

selectMonth.addEventListener("input", jump);

selectYear.value = currentYear;

selectMonth.value = selectMonth;

months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const monthAndYear = document.getElementById("monthAndYear");

function next(){

    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    
    currentMonth = (currentMonth + 1) % 12;
    
    showCalendar(currentMonth, currentYear);
}

function previous(){

    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    
    showCalendar(currentMonth, currentYear);
}

function jump(){

    currentYear = parseInt(selectYear.value);

    currentMonth = parseInt(selectMonth.value);

    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year){

    let firstDay = (new Date(year, month)).getDay();

    tbl = document.getElementById("calendar"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;

    selectYear.value = year;

    selectMonth.value = month;

    // creating all cells
    let date = 1;

    for (let i = 0; i < 6; i++){ // creates a table row

        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) { // creating individual cells, filing them up with data

            if (i === 0 && j < firstDay) {

                cell = document.createElement("td");

                cellText = document.createTextNode("");

                cell.appendChild(cellText);

                row.appendChild(cell);
            }

            else if (date > daysInMonth(month, year)) {

                break;
            }

            else {

                cell = document.createElement("td");

                cellText = document.createTextNode(date);

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {

                    cell.classList.add("today"); // color today's date
                }

                cell.appendChild(cellText);

                row.appendChild(cell);

                date++;
            }
        }

        tbl.appendChild(row); // appending each row into calendar body.
    }
}

// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear){

    return 32 - new Date(iYear, iMonth, 32).getDate();
}

let firstDay = (new Date(year, month) ).getDay();

tbl = document.getElementById("calendar"); // body of the calendar

// clearing all previous cells
tbl.innerHTML = "";

// filing data about month and in the page via DOM
monthAndYear.innerHTML = months[month] + " " + year;

selectYear.value = year;

selectMonth.value = month;

// creating all cells
let date = 1;

for (let i = 0; i < 6; i++) { // creates a table row
    
    let row = document.createElement("tr");

    for (let j = 0; j < 7; j++) { // creating individual cells, filing them up with data.

        if (i === 0 && j < firstDay) {

            cell = document.createElement("td");

            cellText = document.createTextNode("");

            cell.appendChild(cellText);

            row.appendChild(cell);
        }

        else if (date > daysInMonth(month, year)) {

            break;
        }

        else {

            cell = document.createElement("td");

            cellText = document.createTextNode(date);

            if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) { // color today's date

                cell.classList.add("bg-info");
            }

            cell.appendChild(cellText);

            row.appendChild(cell);

            date++;
        }
    }

    tbl.appendChild(row); // appending each row into calendar body.
}

showCalendar(currentMonth, currentYear);

// FAVORITES

const favoritesSttng = document.getElementById("favorites_sttng");
const favoritesRow = document.getElementById("favorites_menu");

if (localStorage.getItem("hideFavorites") ){

    favoritesRow.classList.add("hidden");

    favoritesSttng.checked = false;
}else{

    favoritesRow.classList.remove("hidden");

    if (favoritesRow.scrollWidth > favoritesRow.clientWidth){

        favoritesRow.style.justifyContent = "flex-start";
    }
}

favoritesSttng.addEventListener("click", ()=>{

    favoritesSttng.checked ? localStorage.setItem("hideFavorites", "true") : localStorage.removeItem("hideFavorites");

    location.reload();
});

const deleteFavorites = document.getElementById("delete_favorites");

if (localStorage.getItem("favorites") != null){

    let favorites = localStorage.getItem("favorites");

    favs = favorites.split(";;;");

    favs.forEach(e => {

        if (e.length > 0) {

            let option = document.createElement("option");

            option.setAttribute("value", e);

            deleteFavorites.appendChild(option);

            option.innerText = e;
        }
    });

    deleteFavorites.addEventListener("input", ()=>{

        if (deleteFavorites.value == "all"){

            let favoritesAlert = confirm("¿Estás seguro de que quieres quedarte sin favoritos?");

            if (favoritesAlert){

                localStorage.removeItem("favorites");

                return location.reload();
            }

            return deleteFavorites.value = '';
        }

        let favoriteAlert = confirm("Estás apunto de eliminar: " + deleteFavorites.value);

        if (favoriteAlert){

            favs.splice(favs.indexOf(deleteFavorites.value), 1 );

            newFavs = favs.join(";;;");

            newFavs.length > 0 ? localStorage.setItem("favorites", newFavs) : localStorage.removeItem("favorites");

            return location.reload();
        }

        return deleteFavorites.value = '';
    });
}

// HISTORY

const historySttng = document.getElementById("history_sttng");

if (localStorage.getItem("history") == "noHistory"){

    historySttng.checked = false;
}

historySttng.addEventListener("click", ()=>{

    if (historySttng.checked){

        localStorage.removeItem("history");

        return location.reload();
    }

    localStorage.setItem("history", "noHistory");

    return location.reload();
});

// SEARCH ENGINES

const addSearchEngine = document.getElementById("add_search_engine");
const SearchEngineModal = document.getElementById("new_search_engine_modal");

addSearchEngine.addEventListener("click", ()=>{

    SearchEngineModal.classList.replace("hidden", "new_search_engine_modal-form");

    profileNavMenu.scrollTo(0, profileNavMenu.scrollHeight);

    profileNavMenu.classList.add("ovrflw_hddn");

    document.getElementById("search_engine_name").focus();
});

const cancelSearchEngine = document.getElementById("cancel-search_engine");

cancelSearchEngine.addEventListener("click", ()=>{

    document.getElementById("search_engine_name").value = "";

    document.getElementById("search_engine_link").value = "";

    SearchEngineModal.classList.replace("new_search_engine_modal-form", "hidden");
    
    profileNavMenu.classList.remove("ovrflw_hddn");
});

SearchEngineModal.addEventListener('keydown', (e)=>{

    switch (e.key) {

		case "Tab":

			e.preventDefault();

		break;
    }
});

const addSEBtn = document.getElementById("cache_search_engine");

addSEBtn.addEventListener("click", ()=>{

    const newSEName = document.getElementById("search_engine_name").value;
    const newSELink = document.getElementById("search_engine_link").value;

    cachedSearchEngines = '';

    if (localStorage.getItem("search_engines") ){

        cachedSearchEngines = localStorage.getItem("search_engines") + ',';
    }

    localStorage.setItem("search_engines", cachedSearchEngines + newSEName + ";;;" + newSELink);

    return location.reload();
});

const deleteSearchEngines = document.getElementById("delete_search_engines");
const searchEngineMenu = document.getElementById("s_engine");

if (localStorage.getItem("search_engines") != null){

    let searchEngines = localStorage.getItem("search_engines");

    engines = searchEngines.split(",");

    engines.forEach(e => {

        if (e.length > 0) {

            let option = document.createElement("option");

            option.setAttribute("value", e);

            deleteSearchEngines.appendChild(option);

            option.innerText = e.split(";;;")[0];
        }
    });

    deleteSearchEngines.addEventListener("input", ()=>{

        if (deleteSearchEngines.value == "all"){

            let enginesAlert = confirm("¿Estás seguro de que quieres borrar tus buscadores?");

            if (enginesAlert){

                localStorage.removeItem("search_engines");

                localStorage.removeItem("searchEngine");

                return location.reload();
            }

            return deleteSearchEngines.value = '';
        }

        let engineAlert = confirm("Estás apunto de eliminar: " + deleteSearchEngines.value.split(";;;")[0]);

        if (engineAlert){

            engines.splice(engines.indexOf(deleteSearchEngines.value), 1 );

            newEngines = engines.join(",");

            newEngines.length > 0 ? localStorage.setItem("search_engines", newEngines) : localStorage.removeItem("search_engines");

            localStorage.removeItem("searchEngine");

            return location.reload();
        }

        return deleteSearchEngines.value = '';
    });
}

// PROFILE SETTINGS

const profileSttngs = document.getElementById("profile_settings");
const exportConfigBtn = document.getElementById("export_config");
const importConfig = document.getElementById("import_config");
const deleteConfigBtn = document.getElementById("delete_config");
const importConfigLabel = document.getElementById("import_config_label");
const moveToProfileBttns = ()=> profileNavMenu.scrollTo(0, profileNavMenu.scrollHeight);

importConfigLabel.addEventListener("dragover", (e)=> e.preventDefault() );

importConfigLabel.addEventListener("drop", (e)=>{

    e.preventDefault();

    item = e.dataTransfer.items[0];

    if (item.kind === "file") {

        file = item.getAsFile();

        toHandleConfigFile(file);
    }
});

importConfig.addEventListener("input", ()=>{

    file = importConfig.files[0];

    toHandleConfigFile(file);
});

deleteConfigBtn.addEventListener("click", ()=>{

    conf = window.confirm("¡Estás a punto de eliminar tu configuración!");

    if (conf){

        localStorage.clear();

        return location.reload();
    }

    return
});

profileSttngs.addEventListener("input", ()=>{

    switch (profileSttngs.value){

        case "export":

            content = JSON.stringify(localStorage);

            encryptedData = CryptoJS.AES.encrypt(content, "GooStav"); // "GooStav" is the passphrase

            exportConfigBtn.href = "data:application/octet-stream," + encodeURIComponent(encryptedData.toString() );

            exportConfigBtn.download = nickName.value + "_" + "gsconf.json";

            exportConfigBtn.style.display = "inline-block";

            moveToProfileBttns();
        break;

        case "import":

            importConfigLabel.style.display = "inline-block";

            moveToProfileBttns();
        break;

        case "delete":

            deleteConfigBtn.style.display = "inline-block";

            moveToProfileBttns();
        break;
    }
});

function toHandleConfigFile(file){

    reader = new FileReader();

    reader.addEventListener("load", ()=>{

        val = reader.result;

        if (isEmptyOrSpaces(val) == false){

            decryptedData = CryptoJS.AES.decrypt(val, "GooStav");

            dataString = decryptedData.toString(CryptoJS.enc.Utf8);

            profile = JSON.parse(dataString);

            profileKeys = Object.keys(profile);

            profileValues = Object.values(profile);

            localStorage.clear();

            for (let i = 0; i < profileKeys.length; i++) {

                localStorage.setItem(profileKeys[i], profileValues[i]);
            }

            return location.reload();
        }
    });

    reader.readAsText(file);

    return
}

// SHORTCUTS MENU

function element(etiqueta, atributo, valor, texto){

    let newElement = document.createElement(etiqueta);

    atributo != "" ? newElement.setAttribute(atributo, valor) : false;

    etiqueta == "div" ? newElement.setAttribute("class", "nav__submenu-element-section") : false;

    navMenu.appendChild(newElement);

    if (etiqueta == 'a'){

        let newAnchor = document.createElement("div");

        newAnchor.setAttribute("class", "nav__submenu-element");

        newElement.appendChild(newAnchor);

        let newAnchorName = document.createElement("p");

        newAnchorName.setAttribute("title", texto);

        newAnchor.appendChild(newAnchorName);

        newAnchorName.innerText = texto;

        return
    }

    newElement.innerText = texto;

    return
}

element("button", "class", "mas-de-google", "Añadir sitio");

masSites = document.querySelector(".mas-de-google");

masSites.style.display = "inline-block";

masSites.addEventListener("click", ()=>{

    navMenu.scrollTo(0, 0);

    newSiteModal.classList.replace("hidden", "new_site_modal-form");

    navMenu.classList.add("ovrflw_hddn");

    return siteNameInpt.focus();
});

cancel = document.getElementById("cancel");

cancel.addEventListener("click", closeSiteForm);

function closeSiteForm(){

    siteNameInpt.value = "";

    siteLinkInpt.value = "";

    siteKeywrdsInpt.value = "";

    newSiteModal.classList.replace("new_site_modal-form", "hidden");

    return navMenu.classList.remove("ovrflw_hddn");
}

newSiteModal.addEventListener("keydown", (e)=>{

    if (e.key == "Tab"){

        return e.preventDefault();
    }

    return
});

const addSiteBtn = document.getElementById("cache_site");

addSiteBtn.addEventListener("click", addSite);

element("a", "href", "chess/index.html", "Ajedrez");
element("a", "href", "calculator/index.html", "Calculadora");
element("hr", "class", "nav__submenu-element-section-separator", "");
element("div", "class", "nav__submenu-element-section", "");
element("hr", "class", "nav__submenu-element-section-separator", "");
element("div", "class", "nav__submenu-element-section", "");
element("hr", "class", "nav__submenu-element-section-separator", "");
element("div", "class", "nav__submenu-element-section", "");

const linksGroup = document.getElementsByClassName("nav__submenu-element-section");

const userLinks = linksGroup[0];

userLinks.classList.add("user_links");

const googleLinks = linksGroup[1];
const extraLinks = linksGroup[2];

function enlace(address, text, keyWords, zone){

    let newLink = document.createElement("a");

    newLink.setAttribute("href", address);

    newLink.setAttribute("target", "_blank");

    let result = document.createElement("a");

    result.setAttribute("href", address);

    result.setAttribute("target", "_blank");

    result.setAttribute("class", "result");

    results.appendChild(result);

    result.innerText = text;

    let words = document.createElement("span");

    words.setAttribute("class", "key_words");

    result.appendChild(words);

    words.innerText = keyWords + " " + address;

    let div = document.createElement("div");

    div.setAttribute("class", "nav__submenu-element");

    let p = document.createElement("p");

    p.setAttribute("title", text);

    zone.appendChild(newLink);

    newLink.appendChild(div);

    div.appendChild(p);

    p.innerText = text;

    if (zone == userLinks){

        let del = document.createElement("span");

        del.setAttribute("class", "delete_site");

        del.setAttribute("data-address", address);

        del.setAttribute("data-site", text);

        del.setAttribute("data-keywords", keyWords);

        zone.appendChild(del);

        del.innerText = "x";
    }
    return
}

enlace("", "", "", userLinks);

userLinks.getElementsByTagName("a")[0].style = "display: none !important;";

if (localStorage.getItem("bookmarks") == null){

    enlace("./", "Aquí verás tus sitios", "", userLinks);
}else{

    bookmarks = localStorage.getItem("bookmarks");

    sites = bookmarks.split(',');

    sites.forEach(e =>{

        ePrprts = e.split(";;;");

        e.length > 8 ? enlace(ePrprts[0], ePrprts[1], ePrprts[2], userLinks) : false;
    });

    userLinks.addEventListener("click", (e)=>{

        if (e.target.className == "delete_site"){

            dataSets = [

                e.target.dataset.address,
                e.target.dataset.site,
                e.target.dataset.keywords
            ]

            let conf = window.confirm("Estás a punto de borrar: " + dataSets[1]);

            if (conf){

                sites.splice(sites.indexOf(dataSets.join(";;;") ), 1);

                sites.length > 0 ? localStorage.setItem("bookmarks", sites.toString() ) : localStorage.removeItem("bookmarks");

                return window.location.reload();
            }
        }
        return
    });
}

function addSite(){

    if (isEmptyOrSpaces(siteNameInpt.value) || isEmptyOrSpaces(siteLinkInpt.value) || isEmptyOrSpaces(siteKeywrdsInpt.value) ){

        return window.alert("Por favor, asegúrate de rellenar todos los campos");
    }

    newBookmark = [

        siteLinkInpt.value,

        siteNameInpt.value,

        siteKeywrdsInpt.value.replace(',', '').toLowerCase()
    ];

    enlace(newBookmark[0], newBookmark[1], newBookmark[2], userLinks);

    newBookmark = newBookmark.join(";;;");

    if (localStorage.getItem("bookmarks") == null){

        localStorage.setItem("bookmarks", newBookmark);

        return location.reload();
    }

    sites.push(newBookmark);

    localStorage.setItem("bookmarks", sites);

    return location.reload();
}