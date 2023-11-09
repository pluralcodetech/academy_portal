function showErolModal(event) {
    event.preventDefault();
    const getModal = document.getElementById("en-modal");
    getModal.style.display = "block";
}

function closehModal() {
    const myModal = document.getElementById("en-modal");
    myModal.style.display = "none";
}
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

        const manualProfile = JSON.stringify({
            "name": eName,
            "email": eEmail,
            "phone_number": ePhone,
            "course_of_interest": text,
            "mode_of_learning": dclass,
            "country": eCountry,
            "state": eState,
            "currency": dcurrency,
            "cohort_id": eCohort,
            "amount_paid": eAmount,
            "program_type": dmode,
            "academy_level": eLevel,
            "age": eAge,
            "payment_plan": dpart,
            "course_id": eCourse,
            "referral_code": eRefe,
            "balance": eBal
        });

        const getMyStorage = localStorage.getItem("adminLogin");
        const myStorage = JSON.parse(getMyStorage);
        const storageToken = myStorage.token;

        const myHead = new Headers();
        myHead.append('Content-Type', 'application/json');
        myHead.append('Authorization', `Bearer ${storageToken}`);

        const fbal = {
            method: 'POST',
            headers: myHead,
            body: manualProfile
        }

        const url = "https://backend.pluralcode.institute/admin/manual-enrollment";

        fetch(url, fbal)
        .then(response => response.json())
        .then(result => {
            console.log(result)

            if (result.message === "Enrollment completed") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#25067C'
                })

                setTimeout(() => {
                    location.reload()
                }, 3000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: '#25067C'
                })
                getSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }
}

function toGetManualEnrolment() {

    const paginationContainer = document.getElementById('pagination-container');
    const indexTable = document.querySelector(".tableindexErol");
    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "inline-block";

    const getMyStorage = localStorage.getItem("adminLogin");
    const myStorage = JSON.parse(getMyStorage);
    const storageToken = myStorage.token;

    const myHead = new Headers();
    myHead.append('Content-Type', 'application/json');
    myHead.append('Authorization', `Bearer ${storageToken}`);

    const fbal = {
        method: 'GET',
        headers: myHead,
    }

    let data = [];

    const url = "https://backend.pluralcode.institute/admin/get-enrolment-data/?enrollment_type=admission_form";

    fetch(url, fbal)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.data.data.length === 0) {
            indexTable.innerHTML = "No Records Found!";
            getSpin.style.display = "none";
        }
        else {
            result.data.data.map((item) => {
                if (item.currency === "USD") {
                    data +=`
                   <tr>
                     <td>${item.name}</td>
                     <td>${item.email}</td>
                     <td>${item.phone_number}</td>
                     <td>${item.country}</td>
                     <td>${item.state}</td>
                     <td>${item.program_type}</td>
                     <td>${item.mode_of_learning}</td>
                     <td>${item.level_of_education}</td>
                     <td>${item.course_of_interest}</td>
                     <td>${item.age}</td>
                     <td>${item.date}</td>
                     <td>${item.year}</td>
                     <td>${item.month}</td>
                     <td>$${item.amount_paid}</td>
                     <td>$${item.balance}</td>
                     <td>${item.referral_code}</td>
                     <td>${item.registeration_number}</td>
                     <td>${item.enrollment_source}</td>
                     <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                   </tr>
                `
                }

                if (item.currency === "NGN") {
                    data +=`
                   <tr>
                     <td>${item.name}</td>
                     <td>${item.email}</td>
                     <td>${item.phone_number}</td>
                     <td>${item.country}</td>
                     <td>${item.state}</td>
                     <td>${item.program_type}</td>
                     <td>${item.mode_of_learning}</td>
                     <td>${item.level_of_education}</td>
                     <td>${item.course_of_interest}</td>
                     <td>${item.age}</td>
                     <td>${item.date}</td>
                     <td>${item.year}</td>
                     <td>${item.month}</td>
                     <td>₦${item.amount_paid}</td>
                     <td>₦${item.balance}</td>
                     <td>${item.referral_code}</td>
                     <td>${item.registeration_number}</td>
                     <td>${item.enrollment_source}</td>
                     <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                   </tr>
                `
                }
                
                indexTable.innerHTML = data;
                getSpin.style.display = "none";
            })
        }

        let totalPages = result.data.total_pages;
        let currentPage = result.data.page;
        let maxVisiblePages = 5;

        function createPagination() {
            paginationContainer.innerHTML = '';

            const startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
            const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

            for (let page = startPage; page <= endPage; page++) {
                const pageElement = document.createElement('span');
                pageElement.textContent = page;
                pageElement.className = page === currentPage ? 'mactive' : '';
                pageElement.classList.add("monc");
                pageElement.addEventListener('click', () => onPageClick(page));
                paginationContainer.appendChild(pageElement);
            }

            if (startPage > 1) {
                const prevDots = document.createElement('span');
                prevDots.textContent = '...';
                prevDots.className = 'dots';
                paginationContainer.insertBefore(prevDots, paginationContainer.firstChild);
            }
            if (endPage < totalPages) {
                const nextDots = document.createElement('span');
                nextDots.textContent = '...';
                nextDots.className = 'dots';
                paginationContainer.appendChild(nextDots);
            }
            
        }
        function onPageClick(page) {
            currentPage = page;
            console.log(currentPage)
            const getSpin = document.querySelector(".pagemodal");
            getSpin.style.display = "block";

            const getMyStorage = localStorage.getItem("adminLogin");
            const myStorage = JSON.parse(getMyStorage);
            const storageToken = myStorage.token;

            const myHead = new Headers();
            myHead.append('Content-Type', 'application/json');
            myHead.append('Authorization', `Bearer ${storageToken}`);

            const fbal = {
                method: 'GET',
                headers: myHead
            }

            let data = [];

           const url = `https://backend.pluralcode.institute/admin/get-enrolment-data/?enrollment_type=admission_form&page=${currentPage}`;

           fetch(url, fbal)
           .then(response => response.json())
           .then(result => {
               console.log(result)
               result.data.data.map((item) => {
                if (item.currency === "USD") {
                    data +=`
                   <tr>
                     <td>${item.name}</td>
                     <td>${item.email}</td>
                     <td>${item.phone_number}</td>
                     <td>${item.country}</td>
                     <td>${item.state}</td>
                     <td>${item.program_type}</td>
                     <td>${item.mode_of_learning}</td>
                     <td>${item.level_of_education}</td>
                     <td>${item.course_of_interest}</td>
                     <td>${item.age}</td>
                     <td>${item.date}</td>
                     <td>${item.year}</td>
                     <td>${item.month}</td>
                     <td>$${item.amount_paid}</td>
                     <td>$${item.balance}</td>
                     <td>${item.referral_code}</td>
                     <td>${item.registeration_number}</td>
                     <td>${item.enrollment_source}</td>
                     <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                   </tr>
                `
                }

                if (item.currency === "NGN") {
                    data +=`
                   <tr>
                     <td>${item.name}</td>
                     <td>${item.email}</td>
                     <td>${item.phone_number}</td>
                     <td>${item.country}</td>
                     <td>${item.state}</td>
                     <td>${item.program_type}</td>
                     <td>${item.mode_of_learning}</td>
                     <td>${item.level_of_education}</td>
                     <td>${item.course_of_interest}</td>
                     <td>${item.age}</td>
                     <td>${item.date}</td>
                     <td>${item.year}</td>
                     <td>${item.month}</td>
                     <td>₦${item.amount_paid}</td>
                     <td>₦${item.balance}</td>
                     <td>${item.referral_code}</td>
                     <td>${item.registeration_number}</td>
                     <td>${item.enrollment_source}</td>
                     <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                   </tr>
                `
                }
                indexTable.innerHTML = data;
                getSpin.style.display = "none";
            })
           })
           .catch(error => console.log('error', error));
            createPagination()
        }

        createPagination();
    })
    .catch(error => console.log('error', error));
}

function myAdvisorList() {
    const getPage = document.querySelector(".pagemodal");
    getPage.style.display = "block";

    const tableVisor = document.querySelector(".tablevisor")
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

    const url = "https://backend.pluralcode.institute/admin/get-advisors";

    fetch(url, courseMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.data.map((item) => {
            data += `
               <tr>
                 <td>${item.name}</td>
                 <td>${item.email}</td>
                 <td>${item.contact_details}</td>
                 <td>${item.school}</td>
                 <td>${item.referral_code}</td>
                 <td><a href="advisor-view.html?ref=${item.referral_code}"><button class="view-adv">View Enrolment</button></a></td>
               </tr>
            `
            tableVisor.innerHTML = data;
            getPage.style.display = "none";
        })
    })
    .catch(error => console.log('error', error));
}