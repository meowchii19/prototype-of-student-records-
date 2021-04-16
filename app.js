class Record {
    constructor(
        lastName,
        firstName,
        age,
        course,
        year
    ){
        this.lastName = lastName,
        this.firstName = firstName,
        this.age = age,
        this.course = course,
        this.year = year
    }
}


let studentLists = [{
    "lastName": "regala",
    "firstName": "carlo",
    "age": "20",
    "course": "dev",
    "year": "4th"
  }]


// GETTING VALUES FROM INPUTS

let rowIndex;    //DECLARING ROWINDEX HERE SO THAT IT WONT SHOW UNDEFINED
$lastNameInput = document.querySelector('[data-lastname]')
$firstNameInput = document.querySelector('[data-firstname]')
$ageInput = document.querySelector('[data-age]')
$courseInput = document.querySelector('[data-course]')
$yearInput = document.querySelector('[data-year]')


//ADDING RECORDS

const submit = document.querySelector('[data-submit]')
submit.addEventListener('click', function(e) {
    submitForm(e)
})

function submitForm(e){
    if(h2.classList.contains('edit')){   // ADDING CLASS TO H2 AS EDIT AND REMOVING IT AFTER SUBMITTING SO THAT ITS NOT GONNA DELETE THE RECORD WHEN JUST SUBMITTING AND NOT EDITING RECORD
        deleteRecord(rowIndex.id)
    }
    addStudentToRecords(e);
}

const formBtn = document.querySelectorAll('[data-form-pop]')
const form = document.querySelector('.home-form')

function addStudentToRecords(e) {
    e.preventDefault()
    let lastName = $lastNameInput.value
    let firstName = $firstNameInput.value
    let age = $ageInput.value
    let course = $courseInput.value
    let year = $yearInput.value
    
    let newRecord = new Record(lastName, firstName, age, course, year)
    studentLists.push(newRecord)
    updateStudentLists()
    closePopUp()
}


function clearForm(){
    $firstNameInput.value = "";
    $lastNameInput.value = "";
    $ageInput.value = "";
    $courseInput.value = "";
    $yearInput.value = "";

    h2.classList.remove('edit')
}

//UPDATE AND DELETE UI HANDLERS

function updateStudentLists() {
    tbody.innerHTML = ''
    clearForm()
    for (let student of studentLists){
        createList(student)
        populateStorage()
    }
}

function editRecord(e) {
    studentLists.forEach((record, index) => {
        if(Number(e.id) === index) {   //THE ID OF TABLE ROW AND INDEX MUST BE MATCH SO THAT THE VALUE OF INPUTS ON POP UP FORM WILL BE THE VALUES OF SELECTED ROW
            $lastNameInput.value = record.lastName,
            $firstNameInput.value = record.firstName,
            $ageInput.value =  record.age,
            $courseInput.value = record.course,
            $yearInput.value = record.year
            openPopUp()
        }

    }) 
}

//REMOVING SELECTED ROW WHEN DELETED
function removeRow(el){
    el.parentElement.parentElement.parentElement.remove()
    clearForm()
}


function deleteRecord(index){
    studentLists.splice(index,1)
    populateStorage()
  
}

//ADDING AND DELETING STORAGE

const populateStorage = () => {
    localStorage.setItem('records', JSON.stringify(studentLists));
}

const getStorage = () => {
    studentLists = JSON.parse(localStorage.getItem('records'));
}

//HANDLING POP UPS AND FORMS

const overLay = document.querySelector('[data-overlay]')
const exitBtn = document.querySelector('[data-exit]')

exitBtn.addEventListener('click', function(event){
    event.preventDefault()
    closePopUp()
})

window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closePopUp();
    
})

const popUp = document.querySelector('[data-pop]')
const addStudentbtn = document.querySelector('[data-addbtn]')
addStudentbtn.addEventListener('click', openPopUp)

function openPopUp(){
    popUp.classList.add('active')
    overLay.classList.add('active')
}

function closePopUp() {
    
    popUp.classList.remove('active')
    overLay.classList.remove('active')
}



// CREATING DOM ELEMENTS 

let tbody = document.querySelector('.tbody');
let ta,table = document.querySelector('[data-table]')

function createList(e){

    // GIVING TABLE ROW AN ID SO THAT THE VALUE CAN BE RETRIEVE WHEN SELECTED
    let count = 0
    for(let i=0; i<table.rows.length; i++){
        count++
    }
    const tr = document.createElement('tr')
    tr.classList.add('myTr')
    tr.setAttribute('id', `${count-1}`)    // HAD TO SET COUNT TO -1 BECAUSE ITS NOT GONNA MATCH THE INDEX OF RECORD 
    tr.innerHTML = `<td>${count}</td>
    <td class='lastname'>${e.lastName}</td>
    <td id='firstname'>${e.firstName}</td>
    <td id='age'>${e.age}</td>
    <td id='course'>${e.course}</td>
    <td id='year'>${e.year}</td>
    <td>
        <div class="td-buttons">
            <div class="btn primarybtn">
             <button id="edit" class="edit primary" data-primary1="">
                 <i class="fa fa-marker"></i>
             </button>
             <button id="delete" class="delete primary" data-primary2="">
                 <i class="fa fa-trash"></i>
             </button>
         </div>
         </div> 

     </td>`
    tbody.appendChild(tr)

}


//CHANGING THE ACTION BUTTONS
const buttons = document.querySelectorAll('[data-table]')
buttons.forEach(button => button.addEventListener('click', addClass))
const h2 = document.querySelector('.h2')

function addClass(e){
    let btn = e.target.classList
    let parentbtn = e.target.parentElement
  
  rowIndex = parentbtn.parentElement.parentElement.parentElement// TAKING THE INDEX OF SELECTED ROW. 
    if (btn.contains('edit')){   
        h2.innerHTML = 'Edit Record'
        h2.classList.add('edit')
    editRecord(rowIndex)
    }
    if(btn.contains('delete')){
        removeRow(parentbtn)
        deleteRecord(Number(rowIndex.id))
        updateStudentLists()
    }
}


//HANDLING SEARCH QUERY

const SEARCHBTN = document.querySelector('[data-search-button]')
const SEARCHINPUT = document.querySelector('[data-search-input]')
const tr = document.getElementsByTagName('tr')
SEARCHBTN.addEventListener('click', (e) => {
    searchQuery()
})

function searchQuery(){
    let filter = SEARCHINPUT.value.toUpperCase()
    const tRow = table.getElementsByTagName('tr')
    
    for(let i=0; i<tRow.length; i++){ //LOOPING THROUGH TR's
        td = tr[i].querySelector('.lastName') //TARGETING THE TD WITH THE CLASS OF LASTNAME
        if(td) {
            lastNameValue = td.textContent || td.innerText; 
            if(lastNameValue.toUpperCase().indexOf(filter) > -1){ //IF TD's CONTENTS DOES NOT MATCH WITH THE SEARCH QUERY. TD's DISPLAY WILL BE EMPTY  WILL DISPLAY THE TD THAT MATCHES THE QUERY
                tr[i].style.display = ''
            }else {
              tr[i].style.display = 'None'  //WILL DISPLAY NOTHING IF QUERY FOUND NOTHING
            }
        }
    }
}

// GETTING THE DATA FROM STORAGE WHEN DOM LOADED
document.addEventListener('DOMContentLoaded', () => {

    if(!localStorage.getItem('records')){  
        populateStorage()

    } else{
        getStorage()

    }
    updateStudentLists()
})


// LOGGING OUT
const signOutBtn = document.querySelector('.signout')
signOutBtn.addEventListener('click', signOut)

function signOut(){
  location.replace('./index.html')
}
