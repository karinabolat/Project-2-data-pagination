/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const search = document.querySelector('header');
const searchBar = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;
search.insertAdjacentHTML('beforeend', searchBar); 

const input = document.getElementById('search');
const searchButton = search.querySelector('button');
const label = input.parentNode;
const notFound = document.createElement('p'); //paragraph to hold not found message if search is unsuccessful
notFound.className = 'no-results';
const div = search.parentNode;
div.appendChild(notFound);

//function creates 9 student elements to be displayed on a page.

function showPage (list, page) {
   const startIndex = (page*9) - 9;
   const endIndex = page*9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';

   for (let i=0; i < list.length; i++) {
      if (startIndex <= i && i < endIndex) {
         const student =
            `<li class="student-item cf">
               <div class="student-details">
               <img class="avatar" src="${list[i]['picture']['large']}" alt="Profile Picture">
               <h3>${list[i]['name']['first']} ${list[i]['name']['last']}</h3>
               <span class="email">${list[i]['email']}</span>
               </div>
               <div class="joined-details">
               <span class="date">Joined ${list[i]['registered']['date']}</span>
               </div>
            </li>`;
         studentList.insertAdjacentHTML('beforeend', student); 
      }
   }
}

// function creates and inserts pagination buttons and shows corresponding 'active' page

function addPagination (list) {
   const numberOfButtons = Math.ceil(list.length/9);
   const allPageButtons = document.querySelector('.link-list');
   allPageButtons.innerHTML = '';

   if (numberOfButtons == 0) {
      return;
   } else {
      for (let i=1; i <= numberOfButtons; i++) {
         const pageButton =
            `<li>
            <button type="button">${i}</button>
            </li>`;
         allPageButtons.insertAdjacentHTML('beforeend', pageButton);
      }
      
      const buttons = allPageButtons.getElementsByTagName('button');
      buttons[0].className = 'active';
         
      allPageButtons.addEventListener('click', (event) => {//to dynamically change 'active' button
         const button = event.target;
         if (button.tagName === 'BUTTON') {
            for (let i=0; i < buttons.length; i++ ) {
               buttons[i].className = '';
            }
            button.className = 'active';
            const page = button.textContent;
            showPage(list, page); 
         }
      });
   }
}

showPage(data, 1);
addPagination(data);

// arrow function to filter student names against search input

const filter = () => {
   const text = input.value;
   const filteredStudents = [];
   notFound.textContent = '';

   if (text.includes(' ')) {   
      return [];
   } else {
      for (let i=0; i < data.length; i++) {
         const existingName = `${data[i]['name']['first']} ${data[i]['name']['last']}`.toUpperCase();
         if (existingName.includes(text.toUpperCase())) {
            filteredStudents.push(data[i]);
         }
      }
   }

   if (filteredStudents.length == 0) { // if there are no matches, shows not found message 
      notFound.textContent = 'No results found';
   }
   
   showPage(filteredStudents, 1);
   addPagination(filteredStudents);
}

label.addEventListener('change', filter);
input.addEventListener('keyup', filter);