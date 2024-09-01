const sideMenu = document.getElementById("sideMenu");
const quickMenu = document.getElementById("quickMenu");

async function fetchJSONData(path) {
    const responce = await fetch(path);
    const json = await responce.json();
    return json;
}

async function loadPagesLinks() {
    sideMenu.innerHTML = `<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>`;
    let pages = await getLocalStoragePages();
    
    for (let i = 0; i < pages.length; i++) {
        sideMenu.innerHTML += `<button type="button" onclick="openPage(${i})">${pages[i].Name}</button>`;
    }

    let pagesAddedToQuickMenu = 0;
    pages.sort((a, b) => b.UsageCount - a.UsageCount);
    for (let i = 0; i < pages.length; i++) {
        if (pagesAddedToQuickMenu < 2) {
            quickMenu.innerHTML += `<button type="button" onclick="openPage(${i})">${pages[i].Name}</button>`;
            pagesAddedToQuickMenu++;
        }
    }
}

function openNav() {
    sideMenu.style.width = "250px";
}

function closeNav() {
    sideMenu.style.width = "0px";
}

async function updateLocalStoragePages() {
    let jsonPages = await fetchJSONData("pages.json");

    if (localStorage.getItem("pages") !== null) {
        const localStoragePages = JSON.parse(localStorage.getItem("pages"));

        for (let i = 0; i < jsonPages.length; i++) {
            for (let j = 0; j < localStoragePages.length; j++) {
                if (jsonPages[i].Name == localStoragePages[j].Name) {
                    
                    jsonPages[i].UsageCount = localStoragePages[j].UsageCount;
                    break;
                }
            }
        }
    }
    
    await setLocalStoragePages(jsonPages);
}

async function openPage(pageIndex) {
    let pages = await getLocalStoragePages();
    pages[pageIndex].UsageCount++;
    await setLocalStoragePages(pages);
    open(pages[pageIndex].Path);
}

async function resetPagesUsageCount() {
    await setLocalStoragePages(await fetchJSONData("pages.json"));
}

async function setLocalStoragePages(array) {
    localStorage.setItem("pages", JSON.stringify(array));
}

async function getLocalStoragePages() {
    return await JSON.parse(localStorage.getItem("pages"));
}