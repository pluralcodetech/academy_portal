// function to get list of countries
function getListOfCountries() {
    const getCountry = document.querySelector(".country")
    const getMethod = {
        method: 'GET'
    }

    let data = [];

    const url = `https://countriesnow.space/api/v0.1/countries/states`;

    fetch(url, getMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        localStorage.setItem("states", JSON.stringify(result.data))
        result.data.map((item) => {
            data += `
              <option>${item.name}</option>
            `
            getCountry.innerHTML = data;
        })
    })
    .catch(error => console.log('error', error));
}

// function to get the states of a country
function getStateByCountry() {
    let country = document.querySelector(".country").value;
    let state = document.querySelector(".state");
    let stateShow = document.querySelector(".hidestate");


    const getAllStates = localStorage.getItem("states");
    const alState = JSON.parse(getAllStates);

    let data = [];

    alState.map((item) => {
        if (country === item.name) {
            if(item.states.length === 0) {
                data +=`
                  <option>No state found</option>
                `
            }
            else {
                item.states.map((state) => {
                    data += `
                      <option>${state.name}</option>
                    `
                })
            }
        }

        state.innerHTML = data;
        stateShow.style.display = "block";
    })
}

// courses list
function enrolCourses() {
    const course = document.querySelector(".course")
    const getMyStorage = localStorage.getItem("adminLogin");
    const myStorage = JSON.parse(getMyStorage);
    const storageToken = myStorage.token;

    const myHead = new Headers();
    myHead.append('Content-Type', 'application/json');
    myHead.append('Authorization', `Bearer ${storageToken}`);

    const courseMethod = {
        method: 'GET',
        headers: myHead
    }

    let data = [];

    const url = "https://backend.pluralcode.institute/course-list";

    fetch(url, courseMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.diplomacourses.map((item) => {
            data +=`
              <option value="${item.name}">${item.name}</option>
            `
            course.innerHTML = data;
        })
    })
    .catch(error => console.log('error', error));
}

// cohort list
function enrolCohort() {
    const cohort = document.querySelector(".cohort")
    const getMyStorage = localStorage.getItem("adminLogin");
    const myStorage = JSON.parse(getMyStorage);
    const storageToken = myStorage.token;

    const myHead = new Headers();
    myHead.append('Content-Type', 'application/json');
    myHead.append('Authorization', `Bearer ${storageToken}`);

    const courseMethod = {
        method: 'GET',
        headers: myHead
    }

    let data = [];

    const url = "https://backend.pluralcode.institute/cohort-list";

    fetch(url, courseMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.data.map((item) => {
            data +=`
              <option value="${item.id}">${item.name}</option>
            `
            cohort.innerHTML = data;
        })
    })
    .catch(error => console.log('error', error));
}