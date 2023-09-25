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
        localStorage.setItem("clist", JSON.stringify(result))
        result.diplomacourses.map((item) => {
            data +=`
              <option value="${item.id}">${item.name}</option>
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

function showEntry() {
    const course = document.querySelector(".course")
    const listEntry = localStorage.getItem("clist");
    const listAll = JSON.parse(listEntry);

    let data = [];

    listAll.certcourses.map((item) => {
        data +=`
          <option value="${item.id}">${item.name}</option>
        `
        course.innerHTML = data;
    })
}

function showDiploma() {
    const course = document.querySelector(".course")
    const listEntry = localStorage.getItem("clist");
    const listAll = JSON.parse(listEntry);

    let data = [];

    listAll.diplomacourses.map((item) => {
        data +=`
          <option value="${item.id}">${item.name}</option>
        `
        course.innerHTML = data;
    })
}

function admitStudent(event) {
    event.preventDefault();

    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    const eName = document.querySelector(".ename").value;
    const eEmail = document.querySelector(".enemail").value;
    const ePhone = document.querySelector(".ephone").value;
    const eAge = document.querySelector(".eage").value;
    const eMode = document.getElementsByName("stone");
    const eCourse = document.querySelector(".course").value;
    const eCohort = document.querySelector(".cohort").value;
    const eAmount = document.querySelector(".eamount").value;
    const eLevel = document.querySelector(".elevel").value;
    const eClass = document.getElementsByName("mode");
    const eCurrency = document.getElementsByName("baba");
    const eCountry = document.querySelector(".country").value;
    const eState = document.querySelector(".state").value;
    const ePart = document.getElementsByName("pay");
    const eRefe = document.querySelector(".eref").value;
    const eBal = document.querySelector(".ebal").value;

    const eCourse2 = document.querySelector(".course");
    let text = eCourse2.options[eCourse2.selectedIndex].text;

    let dmode;
    let dclass;
    let dpart;
    let dcurrency;

    for (let i = 0; i < eMode.length; i++) {
        if (eMode[i].checked) {
            dmode = eMode[i].value
        }
    }

    for (let i = 0; i < eClass.length; i++) {
        if (eClass[i].checked) {
            dclass = eClass[i].value
        }
    }

    for (let i = 0; i < ePart.length; i++) {
        if (ePart[i].checked) {
            dpart = ePart[i].value
        }
    }

    for (let i = 0; i < eCurrency.length; i++) {
        if (eCurrency[i].checked) {
            dcurrency = eCurrency[i].value
        }
    }

    if(eName === "" || eEmail === "" || ePhone === "" || eAge === "" || eCourse === "" 
    || eCohort === "" || eAmount === "" || eLevel === "" 
    || eCountry === "" || eState === "") {
        Swal.fire({
            icon: 'info',
            text: 'All Fields are Required!',
            confirmButtonColor: '#25067C'
        })
        getSpin.style.display = "none";
    }
    else {
        
    }



}