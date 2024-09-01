const sideMenu = document.getElementById("sideMenu");
const quickMenu = document.getElementById("quickMenu");

async function fetchJSONData(path) {
    const responce = await fetch(path);
    const json = await responce.json();
    return json;
}

async function loadPagesLinks() {
    sideMenu.innerHTML = `<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>`;
    const pages = JSON.parse(localStorage.getItem("pages"));
    pages.sort((a, b) => b.UsageCount - a.UsageCount);

    let pagesAddedToQuickMenu = 0;
    pages.forEach(page => {
        sideMenu.innerHTML += `<a href="${page.Path}" class="sideMenuButton" onclick="increasePageUsageCount(this)">${page.Name}</a>`;

        if (pagesAddedToQuickMenu < 4) {
            quickMenu.innerHTML += `<a href="${page.Path}" class="quickMenuButton" onclick="increasePageUsageCount(this)">${page.Name}</a>`;
            pagesAddedToQuickMenu++;
        }
    });
}

function openNav() {
    sideMenu.style.width = "250px";
}

function closeNav() {
    sideMenu.style.width = "0px";
}

async function updateLocalStoragePages() {
    const jsonPages = await fetchJSONData("pages.json");
    if (localStorage.getItem("pages") === null) {
        localStorage.setItem("pages", JSON.stringify(jsonPages));
        return;
    }
    
    let localStoragePages = JSON.parse(localStorage.getItem("pages"));

    let indexesToAdd = [];
    for (let i = 0; i < jsonPages.length(); i++) {
        let isPageFound = false;

        for (let j = 0; j < localStoragePages.length(); j++) {
            if (jsonPages[i].Name == localStoragePages[j].Name) {
                isPageFound = true;

                localStoragePages[j].Path = jsonPages[i].Path;
                break;
            }
        }

        if (!isPageFound) {
            indexesToAdd.push(i);
        }
    }
    
    indexesToAdd.forEach(index => {
        localStoragePages.push(jsonPages[index]);
    });
    localStorage.setItem("pages", JSON.stringify(localStoragePages));
}

async function increasePageUsageCount(pageClicked) {
    const pages = JSON.parse(localStorage.getItem("pages"));
    for (let i = 0; i < pages.length(); i++) {
        if (pages[i].Name == pageClicked.innerText) {
            pages[i].UsageCount++;
            break;
        }
    }
    localStorage.setItem("pages", JSON.stringify(localStoragePages));
}

async function resetPagesUsageCount() {
    localStorage.setItem("pages", JSON.stringify(await fetchJSONData("pages.json")));
}