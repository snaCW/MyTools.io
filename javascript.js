const sideMenu = document.getElementById("sideMenu");

async function fetchJSONData(path) {
    const responce = await fetch(path);
    const json = await responce.json();
    return json;
}
async function loadSideNavOptions() {
    sideMenu.innerHTML = `<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>`;
    const pages = await fetchJSONData("pages.json");
    pages.forEach(page => {
        pagePath = page[0].path;
        pageName = page[0].name;
        document.getElementById("sideMenu").innerHTML += `<a href="${pagePath}">${pageName}</a>`;
    });
}

function openNav() {
    loadSideNavOptions();
    document.getElementById("sideMenu").style.width = "250px";
}

function closeNav() {
    document.getElementById("sideMenu").style.width = "0px";
}