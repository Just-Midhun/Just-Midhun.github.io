let urlSet=[];

let inputTaken=document.getElementById("input-el");
let output=document.getElementById("savedValues");
let saved=document.getElementById("save");
let clear=document.getElementById("clear");

let urlFromLocalStorage=JSON.parse(localStorage.getItem("urlSet"));//get items stored in local storage

if(urlFromLocalStorage){
    urlSet=urlFromLocalStorage;
    renderValue();
}

saved.addEventListener("click", saveUrl);
clear.addEventListener("click", clearUrl);

function saveUrl() {

    urlSet.push(inputTaken.value); //.values used to get input values
    inputTaken.value = "";//used to clear the input prompt
    localStorage.setItem("urlSet", JSON.stringify(urlSet));//storing values to local storage on site by saving array in string format 
    renderValue();
}

function renderValue() {

    let listItems="";
    for(let i = 0; i < urlSet.length; i++) {
        
        listItems +="<li><a target='_blank' href='"+urlSet[i]+"'>"+ urlSet[i] + "</a></li>"; //used to create a tag to target link and open on new tab by blanktarget
        /*can also be written as :
        `
        <li>
            <a target="_blank" href='${urlSet[i]}'>
                ${urlSet[i]}
            </a>
        </li>
        `
        */
    }
    output.innerHTML=listItems;//innerHTML used to render html stuff in js

}

function clearUrl(){
    localStorage.clear();
    urlSet=[];
    renderValue();
} 
    
