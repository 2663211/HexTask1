const inputBox=document.getElementById("input-box");
const listContainer=document.getElementById("list-container");
function addTask(){
    if(inputBox.value===''){
        alert("You must write something");
    }
    else{
        let li=document.createElement("li");
        li.innerHTML=inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);
    }

    inputBox.value="";
    saveData();
}
/*checks if the element clicked on is a list or a span */
listContainer.addEventListener("click", function(e){
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");/* if its a list then it displays the checked icon to show that it is checkes*/
        saveData();
    }
    else if(e.target.tagName==="SPAN"){
        e.target.parentElement.remove();/*when the element clickes on is a span it should remove the element */
        saveData();
    }
    
}, false);


/*saving the list in the browser */
function saveData(){/* will take what is in the list and store it in the local storage with the name data */
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){/* will give all the items stored in the local storage with the name data */
    listContainer.innerHTML=localStorage.getItem("data");
}

showTask();