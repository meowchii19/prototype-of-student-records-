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

//POP UP FORM

const addStudentbtn = document.querySelector('[data-addbtn]')
const popUp = document.querySelector('[data-pop]')
const overLay = document.querySelector('[data-overlay]')

addStudentbtn.addEventListener('click', openPopUp)

window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closePopUp();
})

function openPopUp(){
    form.reset()
    popUp.classList.add('active')
    overLay.classList.add('active')
}

function closePopUp() {
    popUp.classList.remove('active')
    overLay.classList.remove('active')
}



//UI Handlers
const form = document.querySelector('.home-form')
form.addEventListener('submit', addStudent)

function addToStudentLists(newStudent) {
    studentLists.push(newStudent);
    return true
}


function addStudent(e) {
    e.preventDefault()
    addToStudentLists(getDataInputs())
    updateBooksGrid()
    closePopUp()
}

//REMOVING SELECTED ROW WHEN DELETED
function removeRow(el){
    return el.parentElement.parentElement.parentElement.remove()
}

const tbody = document.querySelector('.tbody')
const CONTENT = document.querySelector('.content')

function updateBooksGrid() {
    tbody.innerHTML = ''
    for (let student of studentLists){
        createList(student)
    }
}
  

//get data from inputs
function getDataInputs(record){

    const lastName = document.querySelector('[data-lastname]').value
    const firstName = document.querySelector('[data-firstname]').value
    const age = document.querySelector('[data-age]').value
    const course = document.querySelector('[data-course]').value
    const year = document.querySelector('[data-year]').value

   return new Record(lastName, firstName, age, course, year)
}


function createList(e){
    
    const tr = document.createElement('tr')
    tr.setAttribute('id', 'myTr')
    tr.innerHTML = `<td>1</td>
    <td>${e.lastName}</td>
    <td>${e.firstName}</td>
    <td>${e.age}</td>
    <td>${e.course}</td>
    <td>${e.year}</td>
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
         <div class="btn secondarybtn">
             <button id="update" class="update secondary" data-secondary1="">
                 <i class="fa fa-check-circle"></i>
             </button>
             <button id="exit" class="exit secondary" data-secondary2="">
                 <i class="fa fa-times-circle"></i>
             </button>
         </div>
         </div> 

     </td>`
    tbody.appendChild(tr)
}

//CHANGING THE ACTION BUTTONS
const buttons = document.querySelectorAll('[data-table]')

buttons.forEach(button => button.addEventListener('click', addClass))

function addClass(e){

    console.log(e.target)
    const pb = document.querySelector('.secondarybtn')
    let btn = e.target.classList
    let parentbtn = e.target.parentElement
    
    if (btn.contains('edit')){
        parentbtn.innerHTML = ` <button id="update" class="update secondary" data-secondary1="">
        <i class="fa fa-check-circle"></i>
    </button>
    <button id="exit" class="exit secondary" data-secondary2="">
        <i class="fa fa-times-circle"></i>
    </button>`
    }
    if(btn.contains('update') || btn.contains('exit')){
        parentbtn.innerHTML = `<button id="edit" class="edit primary" data-primary1="">
        <i class="fa fa-marker"></i>
    </button>
    <button id="delete" class="delete primary" data-primary2="">
        <i class="fa fa-trash"></i>
    </button>`
    }
    if(btn.contains('delete')){
        removeRow(parentbtn)
    }

}


//LOGGING OUT

const signOutBtn = document.querySelector('.signout')

signOutBtn.addEventListener('click', signOut)

function signOut(){
  location.replace('./index.html')
}

const logInBtn = document.querySelector('[data-login]')
loginbtn.addEventListener('click', logIn)


function logIn(){
    location.replace('./homepage.html')
}
