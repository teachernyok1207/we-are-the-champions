// Initializing FireBase Projects
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// Initializing Database
const appSettings = {
    databaseURL: "https://we-are-the-champion-91b5d-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

// Initializing Variables
const endorsementApp = initializeApp(appSettings)
const dbEndorsement = getDatabase(endorsementApp)
const endorsementListInDB = ref(dbEndorsement,"Endorsement")

// Initializing ElementsById
const textComment = document.getElementById("comment-text")
const publishBtn = document.getElementById("button-style")
const endorsementList = document.getElementById("endorsement-list")

// Publish Button Function
publishBtn.addEventListener("click", function(){
    let publishValue = textComment.value;
    
    if (publishValue != ""){
        push(endorsementListInDB, publishValue)
        console.log(publishValue)
        
        // Clearing textComment
        clearingTextComment()
    }else{
        alert("Please write your endorsement!")
    }
})

// Function for clearing textComment
function clearingTextComment(){
    textComment.value = ""
}

// Function for clearing List
function clearingEndorsementList(){
    endorsementList.innerHTML = ""
}

// Processing Snapshot
onValue(endorsementListInDB, function(snapshot){
    if (snapshot.exists()){
        let commentArray = Object.entries(snapshot.val())
        commentArray = commentArray.reverse()
        
        clearingEndorsementList()
        
        for (let i = 0; i < commentArray.length; i++){
            let currentComment = commentArray[i]
            appendCommentToEndorsementList(currentComment)
        }
    }else{
        endorsementList.innerHTML = `<li>No Endorsement Yet</li>`
    }
})

// Adding comment to Database
function appendCommentToEndorsementList(comment){
    // Initializing Variables
    let commentValue = comment[1]
    let newEl = document.createElement("li")
    
    newEl.textContent = commentValue
    
    endorsementList.append(newEl)
}