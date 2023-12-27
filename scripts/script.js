let articleOpened = 0;

function prepareForArticle() {
    if(articleOpened !== 0) {
        document.getElementById("title").className = "articleTitle";
    }
    else
    {
        document.getElementById("title").className = "title";
    }
}

function openArticle(article) {
    if(articleOpened !== 0) {
        closeArticle();
    }
    articleOpened = article;
    prepareForArticle();
    document.getElementById(article).className = "articleHoover";

    // change article text

    //read JSON file
    let articles = readTextFile("../articles/articles.json");

    //parse JSON file
    let articlesParsed = JSON.parse(articles);

    //change text
    document.getElementById("articleTitle").innerHTML = articlesParsed[article].title;
    document.getElementById("articleText").innerHTML = articlesParsed[article].text;

    //change article tags
    document.getElementById("articleTitle").className = "visible";
    document.getElementById("articleText").className = "visible";
}

function closeArticle() {
    document.getElementById(articleOpened.toString()).className = "hoover";
    articleOpened = 0;
    prepareForArticle();

    //change article tags
    document.getElementById("articleTitle").className = "hidden";
    document.getElementById("articleText").className = "hidden";
}

function checkToCloseArticle() {
    const specifiedElement = document.getElementById('nav');

    document.addEventListener('click', event => {
        const isClickInside = specifiedElement.contains(event.target)

        if (!isClickInside) {
            closeArticle();
        }
    })
}

function loadTitlesAndArticles() {

    // load titles

    //read JSON file
    let articles = readTextFile("../articles/articles.json");

    //parse JSON file
    let articlesParsed = JSON.parse(articles);

    //create HTML elements
    for(let i = 1; i < getObjectLength(articlesParsed) + 1; i++) {
        //create element
        let element = document.createElement("p");
        element.setAttribute("class", "hoover");
        element.setAttribute("id", i.toString());
        element.setAttribute("onclick", "openArticle(" + i.toString() + ")");

        //adds text
        let text = document.createTextNode(articlesParsed[i].title);
        element.appendChild(text);

        //adds element to screen
        element.innerHTML = articlesParsed[i].title;
        document.getElementById("nav").appendChild(element);
    }

    // load a article

    //create HTML elements
    //create element
    let elementTitle = document.createElement("h1");
    let elementText = document.createElement("p");
    elementTitle.setAttribute("id", "articleTitle");
    elementTitle.setAttribute("class", "hidden");
    elementText.setAttribute("id", "articleText");
    elementText.setAttribute("class", "hidden");

    //add text
    let textTitle = document.createTextNode(articlesParsed[1].title);
    let textText = document.createTextNode(articlesParsed[1].text);
    elementTitle.appendChild(textTitle);
    elementText.appendChild(textText);

    //add element to screen
    document.getElementById("article").appendChild(elementTitle);
    document.getElementById("article").appendChild(elementText);
}

function readTextFile(file) {
    let fileContent = "";
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4)  {
            if(rawFile.status === 200 || rawFile.status === 0) {
                let allText = rawFile.responseText;
                fileContent = allText;
                console.log(allText);
            }
        }
    }
    rawFile.send(null);
    return fileContent;
}

function getObjectLength(obj){
    let i = 0;
    for (let x in obj){
        if(obj.hasOwnProperty(x)){
            i++;
        }
    }
    return i;
}