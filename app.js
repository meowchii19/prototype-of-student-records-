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

let studentLists = []


$lastNameInput = document.querySelector('[data-lastname]')
$firstNameInput = document.querySelector('[data-firstname]')
$ageInput = document.querySelector('[data-age]')
$courseInput = document.querySelector('[data-course]')
$yearInput = document.querySelector('[data-year]')


//ADDING RECORDS
function addStudentToRecords(e) {
    e.preventDefault()
    let lastName = $lastNameInput.value
    let firstName = $firstNameInput.value
    let age = $ageInput.value
    let course = $courseInput.value
    let year = $yearInput.value
    
    let newRecord = new Record(lastName, firstName, age, course, year)
    studentLists.push(newRecord)
    updateBooksGrid()
    closePopUp()
}

const populateStorage = () => {
    localStorage.setItem('records', JSON.stringify(studentLists));
}

const getStorage = () => {
    myLibrary = JSON.parse(localStorage.getItem('records'));
}


//UPDATE AND DELETE
function updateBooksGrid() {
    console.log(studentLists)
    tbody.innerHTML = ''
    for (let student of studentLists){
        createList(student)

    }
}

function deleteRecord(index){
    console.log(studentLists)
    studentLists.splice(index, 1)
    console.log(studentLists)
}

//POP UP FORM

const submit = document.querySelector('[data-submit]')
submit.addEventListener('click', addStudentToRecords)
const addStudentbtn = document.querySelector('[data-addbtn]')
const popUp = document.querySelector('[data-pop]')
const overLay = document.querySelector('[data-overlay]')
const exitBtn = document.querySelector('[data-exit]')

exitBtn.addEventListener('click', function(event){
    event.preventDefault()
    closePopUp()
})

addStudentbtn.addEventListener('click', openPopUp)

window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closePopUp();
})

function openPopUp(){
    popUp.classList.add('active')
    overLay.classList.add('active')
}

function closePopUp() {
    form.reset()
    popUp.classList.remove('active')
    overLay.classList.remove('active')
}

const form = document.querySelector('[data-form-pop]')




//REMOVING SELECTED ROW WHEN DELETED
function removeRow(el,){
    return el.parentElement.parentElement.parentElement.remove()

}



let tbody = document.querySelector('.tbody');
table = document.querySelector('[data-table]')

function createList(e){
    let count = 0

    for(let i=0; i<table.rows.length; i++){
        count++
    }
    const tr = document.createElement('tr')
    tr.setAttribute('id', 'myTr')
    tr.setAttribute('id', `${count-1}`)
    console.log(table.rows.length)
    tr.innerHTML = `<td>1</td>
    <td id='lastname'>${e.lastName}</td>
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

{/* <button id="update" class="update secondary" data-secondary1="">
      <i class="fa fa-check-circle"></i>
  </button>
  <button id="exit" class="exit secondary" data-secondary2="">
      <i class="fa fa-times-circle"></i>
  </button> */}


function addClass(e){
    const pb = document.querySelector('.secondarybtn')
    let btn = e.target.classList
    let parentbtn = e.target.parentElement
    
    if (btn.contains('edit')){
        let rowIndex = parentbtn.parentElement.parentElement.parentElement.id
        editRecord(rowIndex)
    }
    if(btn.contains('delete')){
        removeRow(parentbtn)
    }
}



// const updateTable = () => {
//     myLibrary.forEach((book, index) => {
//       Object.keys(book).forEach(prop => {
//         let $newTd = document.createElement('td');
//         $newTd.textContent = book[prop];
//         $row.appendChild($newTd);
//       }); 
  
//       $row.appendChild(createReadSChtatusTd(book));
//       $row.appendChild(createEditTd(book, index));
//       $row.appendChild(createDeleteTd(index));
//       $tbody.appendild($row);
//     });
  
// }
  
// //LOGGING OUT

const signOutBtn = document.querySelector('.signout')

signOutBtn.addEventListener('click', signOut)

function signOut(){
  location.replace('./index.html')
}


function editRecord(e) {
    
    studentLists.forEach((record, index) => {
        if(Number(e) === index) {
            $lastNameInput.value = record.lastName,
            $firstNameInput.value = record.firstName,
            $ageInput.value =  record.age,
            $courseInput.value = record.course,
            $yearInput.value = record.year    
        }
    openPopUp()
})
}

