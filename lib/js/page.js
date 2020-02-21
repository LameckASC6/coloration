let pages = document.getElementById("pages");
let add = document.getElementById("add");
let editPageButtons = document.getElementsByClassName("fa-ellipsis-v");
let editPages = document.getElementsByClassName("editPage");
let deleting = document.getElementsByClassName("delete");
let renames = document.getElementsByClassName("rename");
let cancelRenameButtons = document.getElementsByClassName("cancelRename");
let faked = document.getElementById("faked");

faked.addEventListener("click", function(e){
    e.preventDefault;
    window.location.href = "../paint.html";
});

let renamePages = document.querySelector(".center");

let editPageOn = false;
let cancel = false;
let editRenamePageOn = false;

document.addEventListener("click", function (e) {
    for (let i = 0; i < editPageButtons.length; i++) {
        let num = i;
        for (let i = 0; i < deleting.length; i++) {
            if (deleting[i].parentElement.parentElement.querySelector(".fa-ellipsis-v") == editPageButtons[num]) {
                deleting[i].addEventListener('click', function (e) {
                    e.preventDefault;
                    deleting[i].parentElement.parentElement.parentElement.removeChild(deleting[i].parentElement.parentElement);
                });
            }
        }

        editPageButtons[i].addEventListener('click', function (e) {
            let x = i;
            e.preventDefault;
            if (editPageOn == false) {
                for (let i = 0; i < editPages.length; i++) {
                    editPages[i].style.display = "none";
                    if (editPages[i].parentElement.querySelector(".fa-ellipsis-v") == editPageButtons[x]) {
                        editPages[i].style.display = "block";
                    }
                }
                editPageOn = true;
            } else if (editPageOn == true) {
                for (let i = 0; i < editPages.length; i++) {
                    if (editPages[i].parentElement.querySelector(".fa-ellipsis-v") == editPageButtons[x]) {
                        editPages[i].style.display = "none";
                    }
                }
                editPageOn = false;
            }
        });
    }

    for(let i=0; i < cancelRenameButtons.length; i++){
        cancelRenameButtons[i].addEventListener("click", function(e){
            cancel = true;
        });
    }

    for (let i = 0; i < renames.length; i++) {
        renames[i].addEventListener('click', function (e) {
            let y = i;
            e.preventDefault;
            if (editRenamePageOn == false) {
                for (let i = 0; i < renamePages.length; i++) {
                    renamePages[i].style.display = "none";
                    if (renamePages[i].parentElement.querySelector(".rename") == renames[y]) {
                        return renamePages[i].style.display = "block";
                    }
                }
                editRenamePageOn = true;
            } else if (editRenamePageOn == true && cancel == true) {
                for (let i = 0; i < renamePages.length; i++) {
                    if (renamePages[i].parentElement.querySelector(".rename") == renames[y]) {
                        return renamePages[i].style.display = "none";
                    }
                }
                editRenamePageOn = false;
                cancel = false;
            }
        });
    }

});

add.addEventListener('click', function (e) {
    e.preventDefault;
    let fullPage = document.createElement('div');
    let page = document.createElement('div');
    let preview = document.createElement('div');
    let title = document.createElement('div');
    let text = document.createElement('h1');
    let editPageButton = document.createElement('i');
    let editPage = document.createElement('div');
    let rename = document.createElement('h1');
    let editDelete = document.createElement('h1');
    let center = document.createElement('div');
    let renamePage = document.createElement('div');
    let paddingRename = document.createElement('div');
    let renameTitle = document.createElement('h1');
    let askRename = document.createElement('h1');
    let newName = document.createElement('input');
    let flexEndRenameButton = document.createElement('div');
    let cancelRename = document.createElement('button');
    let okRename = document.createElement('button');

    center.setAttribute("class", "center");
    renamePage.setAttribute("class", "renamePage");
    paddingRename.setAttribute("class", "paddingRename");
    renameTitle.setAttribute("class", "renameTitle");
    askRename.setAttribute("class", "askRename");
    newName.setAttribute("class", "newName");
    newName.setAttribute("type", "text");
    newName.setAttribute("placeholder", "New Name");
    flexEndRenameButton.setAttribute("class", "flexEndRenameButton");
    cancelRename.setAttribute("class", "cancelRename");
    okRename.setAttribute("class", "okRename");

    fullPage.appendChild(center);
    center.appendChild(renamePage);
    renamePage.appendChild(paddingRename);
    paddingRename.appendChild(renameTitle);
    paddingRename.appendChild(askRename);
    paddingRename.appendChild(newName);
    paddingRename.appendChild(flexEndRenameButton);
    flexEndRenameButton.appendChild(cancelRename);
    flexEndRenameButton.appendChild(okRename);

    editDelete.setAttribute("class", "delete");
    rename.setAttribute("class", "rename");
    editPage.setAttribute("class", "editPage");
    preview.setAttribute("class", "preview");
    title.setAttribute("class", "title")
    page.setAttribute("class", "page");
    fullPage.setAttribute("class", "fullPage");
    text.setAttribute("class", "text");
    editPageButton.setAttribute("class", "fas fa-ellipsis-v")

    let texts = pages.getElementsByClassName("text");

    pages.appendChild(fullPage);
    fullPage.appendChild(page);
    page.appendChild(preview);
    page.appendChild(title);
    title.appendChild(text);
    title.appendChild(editPageButton);
    fullPage.appendChild(editPage);
    editPage.appendChild(rename);
    editPage.appendChild(editDelete);

    rename.innerText = "Rename";
    editDelete.innerText = "Delete";

    for (let i = 0; i < texts.length; i++) {
        //do something to each div like
        if (texts[i].innerText != `Untitled - ${i}`) {
            texts[i].innerText = `Untitled - ${i}`;
        }
    }
});