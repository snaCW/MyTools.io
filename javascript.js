function fetchJSONData(path)
{
    fetch(path)
    .then((res) => {
        if (!res.ok)
        {
            throw new Error("HTTP error! Status: ${res.status}");
        }
        return res.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Unable to fetch data:", error));
}
function loadSideNavOptions()
{
    document.getElementById("sideMenu").innerHTML = `<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>`;
    pages = fetchJSONData("pages.json");
    pages.forEach(page => {
        pagePath = page[0].path;
        pageName = page[0].name;
        document.getElementById("sideMenu").innerHTML += `<a href="${pagePath}">${pageName}</a>`;
    });
}

function openNav()
{
    loadSideNavOptions();
    document.getElementById("sideMenu").style.width = "250px";
}

function closeNav()
{
    document.getElementById("sideMenu").style.width = "0px";
}