//Made By: Charles M Milam Jr | Date: 11-10-23 | jeopardy.js
//****************************************************************************************************

//testing url 
fetchedURL();
function fetchedURL(){
let urltest = `https://jservice.io/api/categories?&id=${randomNum}`
fetch(urltest)//retrieving url
.then(res => {//connected pass or fail
    if(res.ok){
        console.log('API STATUS\n %c successfully connected','color: green',"✅");
    } else {
        console.log('API STATUS\n %c connection failed', 'color: red',"❌");
    }
})};

createBoard();// create game
function createBoard(dataArray){
    const gameBoard = document.getElementById('gameBoard')//gameBoard link main div
for(let i = 0; i < 6; i++){
    const categories = document.createElement('div')
        categories.setAttribute('class', 'categories');
        categories.innerText = dataArray;
        gameBoard.appendChild(categories);
};
for(let i = 0; i < 30; i++){
    const categories = document.createElement('div');
    const amount = 200 * (i + 1)
        categories.setAttribute('class', 'questionbox');
        categories.innerText = amount;
        gameBoard.appendChild(categories);
}};

function randomNum(){//random number generator
    return Math.floor(Math.random() * (11000) + 1);
};

dataArray = []; //categories data
createCategories();
function createCategories(){
    for(let i = 0; i < 6; i++){
        const retrievURL = fetch(`https://jservice.io/api/categories?&id=${randomNum}`);
        let allData = Promise.all([retrievURL]);
        allData.then((res) => {
            dataArray = res
            createBoard(allData);
            console.log(res);
        })
    };
};



