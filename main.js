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

function getCourseQuiz() {
    const pageSpin = document.querySelector(".pagemodal2");
    pageSpin.style.display = "block";

    const qCourse = document.querySelector(".qcourse");
    const qCourse2 = document.querySelector(".qcourse2");

    const getCourse = localStorage.getItem("clist");
    const courseItem = JSON.parse(getCourse);

    let coData = [];
    let mone = {
        id: 83,
        name: "All"
    };

    let mdata = [];
    mdata.push(mone)

    for (i = 0; i < mdata.length; i++) {
        courseItem.diplomacourses.unshift(mdata[i]);
    }

    courseItem.diplomacourses.map((item) => {
        if (item.name === "All") {
            return coData += `
             <option value="">${item.name}</option>

            `
        }
        else {
            return coData += `
            <option value="${item.id}">${item.name}</option>
        `
        }
        

    })
    qCourse.innerHTML = coData;
    qCourse2.innerHTML = coData;
    pageSpin.style.display = "none";


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
    const eRefe = document.querySelector(".evoucher").value;
    const eBal = document.querySelector(".ebal").value;
    const eadv = document.querySelector(".eadvisor").value;

    const eCourse2 = document.querySelector(".course");
    let text = eCourse2.options[eCourse2.selectedIndex].text;

    let dmode;
    let dclass;
    let dpart;
    let dcurrency;
    let cf;

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
    || eCountry === "" || eState === "" || eadv === "") {
        Swal.fire({
            icon: 'info',
            text: 'All Fields are Required!',
            confirmButtonColor: '#25067C'
        })
        getSpin.style.display = "none";
    }
    else {
        const getList = localStorage.getItem("clist");
        const list = JSON.parse(getList);
        console.log(list)
        list.diplomacourses.map((item) => {
            if (item.id === JSON.parse(eCourse) && dclass === "Onsite" && dcurrency === "NGN") cf = item.course_onsite_fees.onsite_course_full_payment_fees_ngn.onsite_course_fee_ngn;
            if (item.id === JSON.parse(eCourse) && dclass === "Onsite" && dcurrency === "USD") cf = item.course_onsite_fees.onsite_course_full_payment_fees_usd.onsite_course_fee_usd;
            if (item.id === JSON.parse(eCourse) && dclass === "Virtual" && dcurrency === "NGN") cf = item.course_virtual_fee.virtual_course_full_payment_fees_ngn.virtual_course_fee_ngn;
            if (item.id === JSON.parse(eCourse) && dclass === "Virtual" && dcurrency === "USD") cf = item.course_virtual_fee.virtual_course_full_payment_fees_usd.virtual_course_fee_usd;
        })




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
            "voucher_code": eRefe,
            "referral_code": eadv,
            "balance": eBal,
            "course_fee": cf
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
    const progressBar = document.getElementById('progress-section');

    const indexTable = document.querySelector(".tableindexErol");
    const te = document.querySelector(".te");
    const tcp = document.querySelector(".tcp");
    const tip = document.querySelector(".tip");

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
    let pbar = [];

    const url = "https://backend.pluralcode.institute/admin/get-enrolment-data/?enrollment_type=admission_form";

    fetch(url, fbal)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        te.innerHTML = `${result.enrollmentcount.totalenrollment}`;
        tcp.innerHTML = `${result.enrollmentcount.completedenrollment}`;
        tip.innerHTML = `${result.enrollmentcount.incompletedenrollment}`;
        
        if (result.progressbar.length === 0) {
            progressBar.innerHTML = "No Data Found!";
            getSpin.style.display = "none";
        }
        else {
            result.progressbar.map((item) => {
                pbar += `
                    <div class="section-pro">
                        <div class="congo d-flex justify-content-between">
                        <p class="mt-2">${item.countryname}</p>
                        <div>
                            <p>${Math.round(item.percentage)}% enrollment</p>
                            <p>(${Math.round(item.percentage)}% / 100%)</p>
                        </div>
                        </div>
                        <progress value="${Math.round(item.percentage)}" max="100"></progress>
                    </div>
                `
                progressBar.innerHTML = pbar;
                getSpin.style.display = "none";
            })
        }
        
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

function getSelfPacedEnrollment(event) {
    event.preventDefault();

    const btnSp = document.querySelector(".btn-sp");
    const btnLoop = document.querySelector(".btn-loop");
    

    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";

    const paginationContainer = document.getElementById('pagination-container');
    const progressBar = document.getElementById('progress-section');

    const te = document.querySelector(".te");
    const tcp = document.querySelector(".tcp");
    const tip = document.querySelector(".tip");

    const indexTable = document.querySelector(".tableindexErol")
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

    let pbar = [];
    let data = [];

    btnLoop.style.background = "white";
    btnLoop.style.border = "1px solid #2334A8";
    btnLoop.style.color = "#2334A8";


    btnSp.style.background = "#2334A8";
    btnSp.style.color = "#fff";

    const url = "https://backend.pluralcode.institute/admin/get-enrolment-data/?enrollment_type=admission_form";

    fetch(url, courseMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        te.innerHTML = `${result.enrollmentcount.totalenrollment}`;
        tcp.innerHTML = `${result.enrollmentcount.completedenrollment}`;
        tip.innerHTML = `${result.enrollmentcount.incompletedenrollment}`;
        
        if (result.progressbar.length === 0) {
            progressBar.innerHTML = "No Data Found!";
            getSpin.style.display = "none";
        }
        else {
            result.progressbar.map((item) => {
                pbar += `
                    <div class="section-pro">
                        <div class="congo d-flex justify-content-between">
                        <p class="mt-2">${item.countryname}</p>
                        <div>
                            <p>${Math.round(item.percentage)}% enrollment</p>
                            <p>(${Math.round(item.percentage)}% / 100%)</p>
                        </div>
                        </div>
                        <progress value="${Math.round(item.percentage)}" max="100"></progress>
                    </div>
                `
                progressBar.innerHTML = pbar;
                getSpin.style.display = "none";
            })
        }
        
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
                pageElement.className = page === currentPage ? 'mactive3' : '';
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

            let cdata = [];

           const url = `https://backend.pluralcode.institute/admin/get-enrolment-data/?enrollment_type=admission_form&page=${currentPage}`;

           fetch(url, fbal)
           .then(response => response.json())
           .then(result => {
               console.log(result)
               result.data.data.map((item) => {
                if (item.currency === "USD") {
                    cdata +=`
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
                    cdata +=`
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
                indexTable.innerHTML = cdata;
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

function getLoopEnrollment(event) {
    event.preventDefault();
    
    const btnSp = document.querySelector(".btn-sp");
    const btnLoop = document.querySelector(".btn-loop");


    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";

    const paginationContainer = document.getElementById('pagination-container');
    const progressBar = document.getElementById('progress-section');

    const te = document.querySelector(".te");
    const tcp = document.querySelector(".tcp");
    const tip = document.querySelector(".tip");

    const indexTable = document.querySelector(".tableindexErol")
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

    let pbar = [];
    let data = [];

    btnSp.style.background = "white";
    btnSp.style.border = "1px solid #2334A8";
    btnSp.style.color = "#2334A8";


    btnLoop.style.background = "#2334A8";
    btnLoop.style.color = "#fff";


    const url = "https://backend.pluralcode.institute/admin/get-enrolment-data/?enrollment_type=loop_form";

    fetch(url, courseMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        te.innerHTML = `${result.enrollmentcount.totalenrollment}`;
        tcp.innerHTML = `${result.enrollmentcount.completedenrollment}`;
        tip.innerHTML = `${result.enrollmentcount.incompletedenrollment}`;
        
        if (result.progressbar.length === 0) {
            progressBar.innerHTML = "No Data Found!";
            getSpin.style.display = "none";
        }
        else {
            result.progressbar.map((item) => {
                pbar += `
                    <div class="section-pro">
                        <div class="congo d-flex justify-content-between">
                        <p class="mt-2">${item.countryname}</p>
                        <div>
                            <p>${Math.round(item.percentage)}% enrollment</p>
                            <p>(${Math.round(item.percentage)}% / 100%)</p>
                        </div>
                        </div>
                        <progress value="${Math.round(item.percentage)}" max="100"></progress>
                    </div>
                `
                progressBar.innerHTML = pbar;
                getSpin.style.display = "none";
            })
        }
        
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
                pageElement.className = page === currentPage ? 'mactive2' : '';
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

            let cdata = [];

           const url = `https://backend.pluralcode.institute/admin/get-enrolment-data/?enrollment_type=loop_form&page=${currentPage}`;

           fetch(url, fbal)
           .then(response => response.json())
           .then(result => {
               console.log(result)
               result.data.data.map((item) => {
                if (item.currency === "USD") {
                    cdata +=`
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
                    cdata +=`
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
                indexTable.innerHTML = cdata;
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
                 <td><a href="advisor-view.html?name=${item.name}&ref=${item.referral_code}"><button class="view-adv">View Enrolment</button></a></td>
               </tr>
            `
            tableVisor.innerHTML = data;
            getPage.style.display = "none";
        })
    })
    .catch(error => console.log('error', error));
}

function advName() {
    const params = new URLSearchParams(window.location.search);
    let getName = params.get('name');

    const courseHead = document.querySelector(".course-head");
    courseHead.innerHTML = `Advisor: ${getName}`
}

function getEnrolByRef() {
    const params = new URLSearchParams(window.location.search);
    let getRef = params.get('ref');

    const paginationContainer = document.getElementById('pagination-container');

    const getPage = document.querySelector(".pagemodal");
    getPage.style.display = "block";

    const tableVisor = document.querySelector(".tablevisor2")
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

    const url = `https://backend.pluralcode.institute/admin/get-advisor-enrollments?referral_code=${getRef}`;

    fetch(url, courseMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.data.data.length === 0) {
            tableVisor.innerHTML = "No Enrolment Found!";
            getPage.style.display = "none";
        }
        else {
            result.data.data.map((item) => {
                if (item.currency === "USD") {
                    data += `
                    <tr>
                     <td>${item.date}</td>
                     <td>${item.name}</td>
                     <td>${item.email}</td>
                     <td>${item.phone_number}</td>
                     <td>${item.country}</td>
                     <td>${item.state}</td>
                     <td>${item.level_of_education}</td>
                     <td>${item.program_type}</td>
                     <td>${item.age}</td>
                     <td>$${item.amount_paid}</td>
                     <td>$${item.balance}</td>
                     <td>${item.currency}</td>
                     <td>${item.mode_of_learning}</td>
                     <td>${item.course_of_interest}</td>
                     <td>${item.payment_plan}</td>
                     <td>${item.registeration_number}</td>
                     <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                   </tr>
                   `
                }
                if (item.currency === "NGN") {
                    data +=`
                   <tr>
                     <td>${item.date}</td>
                     <td>${item.name}</td>
                     <td>${item.email}</td>
                     <td>${item.phone_number}</td>
                     <td>${item.country}</td>
                     <td>${item.state}</td>
                     <td>${item.level_of_education}</td>
                     <td>${item.program_type}</td>
                     <td>${item.age}</td>
                     <td>₦${item.amount_paid}</td>
                     <td>₦${item.balance}</td>
                     <td>${item.currency}</td>
                     <td>${item.mode_of_learning}</td>
                     <td>${item.course_of_interest}</td>
                     <td>${item.payment_plan}</td>
                     <td>${item.registeration_number}</td>
                     <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                   </tr>
                `
                }

                tableVisor.innerHTML = data;
                getPage.style.display = "none";
                
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

            let data2 = [];

            const url = `https://backend.pluralcode.institute/admin/get-advisor-enrollments?referral_code=${getRef}&page=${currentPage}`;

           fetch(url, fbal)
           .then(response => response.json())
           .then(result => {
               console.log(result)
               result.data.data.map((item) => {
                if (item.currency === "USD") {
                    data2 +=`
                    <tr>
                    <td>${item.date}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.country}</td>
                    <td>${item.state}</td>
                    <td>${item.level_of_education}</td>
                    <td>${item.program_type}</td>
                    <td>${item.age}</td>
                    <td>$${item.amount_paid}</td>
                    <td>$${item.balance}</td>
                    <td>${item.currency}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.payment_plan}</td>
                    <td>${item.registeration_number}</td>
                    <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                  </tr>
                `
                }

                if (item.currency === "NGN") {
                    data2 +=`
                    <tr>
                    <td>${item.date}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.country}</td>
                    <td>${item.state}</td>
                    <td>${item.level_of_education}</td>
                    <td>${item.program_type}</td>
                    <td>${item.age}</td>
                    <td>$${item.amount_paid}</td>
                    <td>$${item.balance}</td>
                    <td>${item.currency}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.payment_plan}</td>
                    <td>${item.registeration_number}</td>
                    <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                  </tr>
                `
                }
                tableVisor.innerHTML = data2;
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

function allCoursesList() {
    const sCourse = document.querySelector(".scourse");
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
        headers: myHead,
    }

    let mone = {
        name: "All Courses List"
    };

    let mdata = [];
    mdata.push(mone)

    let data = [];

    const url = "https://backend.pluralcode.institute/admin/get-course-list-dropdown";

    fetch(url, fbal)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        for (i = 0; i < mdata.length; i++) {
            result.message.unshift(mdata[i]);
        }
        console.log(result);
        result.message.map((item)=> {
            if (item.name === "All") {
                return data += `
                 <option value="">${item.name}</option>

                `
            }
            else {
                return data += `
                <option value="${item.name}">${item.name}</option>
            `
            }
            
        })

        sCourse.innerHTML = data;
        getSpin.style.display = "none";
    })
    .catch(error => console.log('error', error));
}

function searchTheDate2(event) {
    event.preventDefault();

    const paginationContainer = document.getElementById('pagination-container');
    const tableIndex = document.querySelector(".tablevisor2");
    const mio = document.querySelector(".mio");


    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";

    const getValue = document.querySelector(".firstValue2").value;
    const getSecondValue = document.querySelector(".secondValue2").value;
    const sCourse = document.querySelector(".scourse").value;

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

    let cdata = [];

    const url = `https://backend.pluralcode.institute/admin/get-enrolment-data/?enrollment_type=admission_form&searchterm=${sCourse}&start_date=${getValue}&end_date=${getSecondValue}`;

    fetch(url, fbal)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.data.data.length === 0) {
            tableIndex.innerHTML = "No Records Found!";
            getSpin.style.display = "none";
            mio.style.display = "none";
        }
        else {
            result.data.data.map((item) => {
                if (item.currency === "USD") {
                    cdata += `
                    <tr>
                     <td>${item.date}</td>
                     <td>${item.name}</td>
                     <td>${item.email}</td>
                     <td>${item.phone_number}</td>
                     <td>${item.country}</td>
                     <td>${item.state}</td>
                     <td>${item.level_of_education}</td>
                     <td>${item.program_type}</td>
                     <td>${item.age}</td>
                     <td>$${item.amount_paid}</td>
                     <td>$${item.balance}</td>
                     <td>${item.currency}</td>
                     <td>${item.mode_of_learning}</td>
                     <td>${item.course_of_interest}</td>
                     <td>${item.payment_plan}</td>
                     <td>${item.registeration_number}</td>
                     <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                   </tr>
                   `
                }
                if (item.currency === "NGN") {
                    cdata +=`
                   <tr>
                     <td>${item.date}</td>
                     <td>${item.name}</td>
                     <td>${item.email}</td>
                     <td>${item.phone_number}</td>
                     <td>${item.country}</td>
                     <td>${item.state}</td>
                     <td>${item.level_of_education}</td>
                     <td>${item.program_type}</td>
                     <td>${item.age}</td>
                     <td>₦${item.amount_paid}</td>
                     <td>₦${item.balance}</td>
                     <td>${item.currency}</td>
                     <td>${item.mode_of_learning}</td>
                     <td>${item.course_of_interest}</td>
                     <td>${item.payment_plan}</td>
                     <td>${item.registeration_number}</td>
                     <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                   </tr>
                `
                }

                tableIndex.innerHTML = cdata;
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
                pageElement.className = page === currentPage ? 'mactive2' : '';
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

            let data2 = [];

            const url = `https://backend.pluralcode.institute/admin/get-enrolment-data/?enrollment_type=admission_form&searchterm=${sCourse}&start_date=${getValue}&end_date=${getSecondValue}&page=${currentPage}`;

           fetch(url, fbal)
           .then(response => response.json())
           .then(result => {
               console.log(result)
               result.data.data.map((item) => {
                if (item.currency === "USD") {
                    data2 +=`
                    <tr>
                    <td>${item.date}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.country}</td>
                    <td>${item.state}</td>
                    <td>${item.level_of_education}</td>
                    <td>${item.program_type}</td>
                    <td>${item.age}</td>
                    <td>$${item.amount_paid}</td>
                    <td>$${item.balance}</td>
                    <td>${item.currency}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.payment_plan}</td>
                    <td>${item.registeration_number}</td>
                    <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                  </tr>
                `
                }

                if (item.currency === "NGN") {
                    data2 +=`
                    <tr>
                    <td>${item.date}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.country}</td>
                    <td>${item.state}</td>
                    <td>${item.level_of_education}</td>
                    <td>${item.program_type}</td>
                    <td>${item.age}</td>
                    <td>$${item.amount_paid}</td>
                    <td>$${item.balance}</td>
                    <td>${item.currency}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.payment_plan}</td>
                    <td>${item.registeration_number}</td>
                    <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                  </tr>
                `
                }
                tableIndex.innerHTML = data2;
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

function byEmailNameCourse(event) {
    event.preventDefault();

    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";

    const paginationContainer = document.getElementById('pagination-container');
    const tableIndex = document.querySelector(".tablevisor2");
    const valueItem = document.querySelector(".valueItem").value;
    const mio = document.querySelector(".mio");


    if (valueItem === "") {
        Swal.fire({
            icon: 'info',
            text: 'This field is required!',
            confirmButtonColor: '#25067C'
        })
        getSpin.style.display = "none";
    }

    else {
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

    let cdata = [];

    const url = `https://backend.pluralcode.institute/admin/get-enrolment-data/?enrollment_type=admission_form&searchterm=${valueItem}`;

    fetch(url, fbal)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.data.data.length === 0) {
            tableIndex.innerHTML = "No Records Found!";
            getSpin.style.display = "none";
            mio.style.display = "none";
        }
        else {
            result.data.data.map((item) => {
                if (item.currency === "USD") {
                    cdata += `
                    <tr>
                     <td>${item.date}</td>
                     <td>${item.name}</td>
                     <td>${item.email}</td>
                     <td>${item.phone_number}</td>
                     <td>${item.country}</td>
                     <td>${item.state}</td>
                     <td>${item.level_of_education}</td>
                     <td>${item.program_type}</td>
                     <td>${item.age}</td>
                     <td>$${item.amount_paid}</td>
                     <td>$${item.balance}</td>
                     <td>${item.currency}</td>
                     <td>${item.mode_of_learning}</td>
                     <td>${item.course_of_interest}</td>
                     <td>${item.payment_plan}</td>
                     <td>${item.registeration_number}</td>
                     <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                   </tr>
                   `
                }
                if (item.currency === "NGN") {
                    cdata +=`
                   <tr>
                     <td>${item.date}</td>
                     <td>${item.name}</td>
                     <td>${item.email}</td>
                     <td>${item.phone_number}</td>
                     <td>${item.country}</td>
                     <td>${item.state}</td>
                     <td>${item.level_of_education}</td>
                     <td>${item.program_type}</td>
                     <td>${item.age}</td>
                     <td>₦${item.amount_paid}</td>
                     <td>₦${item.balance}</td>
                     <td>${item.currency}</td>
                     <td>${item.mode_of_learning}</td>
                     <td>${item.course_of_interest}</td>
                     <td>${item.payment_plan}</td>
                     <td>${item.registeration_number}</td>
                     <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                   </tr>
                `
                }

                tableIndex.innerHTML = cdata;
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
                pageElement.className = page === currentPage ? 'mactive3' : '';
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

            let data2 = [];

            const url = `https://backend.pluralcode.institute/admin/get-enrolment-data/?enrollment_type=admission_form&searchterm=${valueItem}&page=${currentPage}`;

           fetch(url, fbal)
           .then(response => response.json())
           .then(result => {
               console.log(result)
               result.data.data.map((item) => {
                if (item.currency === "USD") {
                    data2 +=`
                    <tr>
                    <td>${item.date}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.country}</td>
                    <td>${item.state}</td>
                    <td>${item.level_of_education}</td>
                    <td>${item.program_type}</td>
                    <td>${item.age}</td>
                    <td>$${item.amount_paid}</td>
                    <td>$${item.balance}</td>
                    <td>${item.currency}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.payment_plan}</td>
                    <td>${item.registeration_number}</td>
                    <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                  </tr>
                `
                }

                if (item.currency === "NGN") {
                    data2 +=`
                    <tr>
                    <td>${item.date}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.country}</td>
                    <td>${item.state}</td>
                    <td>${item.level_of_education}</td>
                    <td>${item.program_type}</td>
                    <td>${item.age}</td>
                    <td>₦${item.amount_paid}</td>
                    <td>₦${item.balance}</td>
                    <td>${item.currency}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.payment_plan}</td>
                    <td>${item.registeration_number}</td>
                    <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                  </tr>
                `
                }
                tableIndex.innerHTML = data2;
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

}

function searchByEnrolTheDate(event) {
    event.preventDefault();

    const paginationContainer = document.getElementById('pagination-container');
    const progressBar = document.getElementById('progress-section');

    const tableIndex = document.querySelector(".tableindexErol");
    const mio = document.querySelector(".mio");

    const te = document.querySelector(".te");
    const tcp = document.querySelector(".tcp");
    const tip = document.querySelector(".tip");

    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";

    const getValue = document.querySelector(".efirstValue").value;
    const getSecondValue = document.querySelector(".esecondValue").value;
    const sCourse = document.querySelector(".scourse").value;

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

    let cdata = [];
    let pbar = [];


    const url = `https://backend.pluralcode.institute/admin/get-enrolment-data/?enrollment_type=admission_form&searchterm=${sCourse}&start_date=${getValue}&end_date=${getSecondValue}`;
    fetch(url, fbal)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        te.innerHTML = `${result.enrollmentcount.totalenrollment}`;
        tcp.innerHTML = `${result.enrollmentcount.completedenrollment}`;
        tip.innerHTML = `${result.enrollmentcount.incompletedenrollment}`;
        
        if (result.progressbar.length === 0) {
            progressBar.innerHTML = "No Data Found!";
            getSpin.style.display = "none";
        }
        else {
            result.progressbar.map((item) => {
                pbar += `
                    <div class="section-pro">
                        <div class="congo d-flex justify-content-between">
                        <p class="mt-2">${item.countryname}</p>
                        <div>
                            <p>${Math.round(item.percentage)}% enrollment</p>
                            <p>(${Math.round(item.percentage)}% / 100%)</p>
                        </div>
                        </div>
                        <progress value="${Math.round(item.percentage)}" max="100"></progress>
                    </div>
                `
                progressBar.innerHTML = pbar;
                getSpin.style.display = "none";
            })
        }

        if (result.data.data.length === 0) {
            tableIndex.innerHTML = "No Records Found!";
            getSpin.style.display = "none";
            mio.style.display = "none";
        }
        else {
            result.data.data.map((item) => {
                if (item.currency === "USD") {
                    cdata += `
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
                    cdata +=`
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

                tableIndex.innerHTML = cdata;
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
                pageElement.className = page === currentPage ? 'mactive2' : '';
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

            let data2 = [];

            const url = `https://backend.pluralcode.institute/admin/get-enrolment-data/?enrollment_type=admission_form&searchterm=${sCourse}&start_date=${getValue}&end_date=${getSecondValue}&page=${currentPage}`;

           fetch(url, fbal)
           .then(response => response.json())
           .then(result => {
               console.log(result)
               result.data.data.map((item) => {
                if (item.currency === "USD") {
                    data2 +=`
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
                    data2 +=`
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
                tableIndex.innerHTML = data2;
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

function showAdModal(event) {
    event.preventDefault();

    const getModal = document.getElementById('ree-modal');
    getModal.style.display = "block"
}

function closeAhModal() {
    const getModal = document.getElementById('ree-modal');
    getModal.style.display = "none";
}

function ebyEmailNameCourse(event) {
    event.preventDefault();

    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";

    const paginationContainer = document.getElementById('pagination-container');
    const tableIndex = document.querySelector(".tableindexErol");
    const valueItem = document.querySelector(".valueItem").value;
    const mio = document.querySelector(".mio");


    if (valueItem === "") {
        Swal.fire({
            icon: 'info',
            text: 'This field is required!',
            confirmButtonColor: '#25067C'
        })
        getSpin.style.display = "none";
    }

    else {
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

        let cdata = [];

        const url = `https://backend.pluralcode.institute/admin/get-enrolment-data/?enrollment_type=admission_form&searchterm=${valueItem}`;

        fetch(url, fbal)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.data.data.length === 0) {
                tableIndex.innerHTML = "No Records Found!";
                getSpin.style.display = "none";
                mio.style.display = "none";
            }
            else {
                result.data.data.map((item) => {
                    if (item.currency === "USD") {
                        cdata += `
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
                        cdata +=`
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

                    tableIndex.innerHTML = cdata;
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
                    pageElement.className = page === currentPage ? 'mactive3' : '';
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

                let data2 = [];

                const url = `https://backend.pluralcode.institute/admin/get-enrolment-data/?enrollment_type=admission_form&searchterm=${valueItem}&page=${currentPage}`;

            fetch(url, fbal)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                result.data.data.map((item) => {
                    if (item.currency === "USD") {
                        data2 +=`
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
                        data2 +=`
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
                    tableIndex.innerHTML = data2;
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
}

function createAdvisorDetails(event) {
    event.preventDefault();

    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    const aName = document.querySelector(".aname").value;
    const aEmail = document.querySelector(".aemail").value;
    const aPhone = document.querySelector(".aphone").value;
    const aSchool = document.querySelector(".aschool").value;

    if (aName === "" || aEmail === "" || aPhone === "" || aSchool === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#25067C'
        })

        getSpin.style.display = "none";
    }
    else {
        const getMyStorage = localStorage.getItem("adminLogin");
        const myStorage = JSON.parse(getMyStorage);
        const storageToken = myStorage.token;
    
        const myHead = new Headers();
        myHead.append('Content-Type', 'application/json');
        myHead.append('Authorization', `Bearer ${storageToken}`);

        const advisorProfile = JSON.stringify({
            "name": aName,
            "email": aEmail,
            "phone_number": aPhone,
            "school": aSchool
        });

        const adMethod = {
            method: 'POST',
            headers: myHead,
            body: advisorProfile
        }

        const url = "https://backend.pluralcode.institute/admin/create-advisor";

        fetch(url, adMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)

            if(result.message === "Advisor Created") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#25067C'
                })

                setTimeout(() => {
                    location.reload();
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

function quizModal(event) {
    event.preventDefault();

    const openModal = document.getElementById("re-modal");
    openModal.style.display = "block";
}

function addInput(event) {
    event.preventDefault();

    let formField = document.getElementById("itemaddcontrols");

    let createDiv = document.createElement('div');
    createDiv.setAttribute('class', 'row');
    
    let createClass = document.createElement('div');
    createClass.classList.add("col-sm-12", "col-md-12", "col-lg-6", "mt-3");

    createDiv.appendChild(createClass);

    let createLabel = document.createElement('label');
    createLabel.setAttribute('class', 'lab');
    createLabel.innerHTML = "Question:";

    createClass.appendChild(createLabel);

    let createInput = document.createElement('input');
    createInput.setAttribute('type', 'text');
    createInput.setAttribute('placeholder', 'Enter Question');
    createInput.classList.add("palo", "cQues")

    createClass.appendChild(createInput)

    let createMo = document.createElement('div');
    createMo.classList.add("col-sm-12", "col-md-12", "col-lg-6", "il2");

    let createLabel2 = document.createElement('label');
    createLabel2.innerHTML = "Multiple Options:";
    createLabel2.classList.add('lab', 'mt-3')

    createClass.appendChild(createLabel2)

    let opt1 = document.createElement('input');
    opt1.setAttribute('type', 'text');
    opt1.classList.add("palo", "c1", "mb-2");
    opt1.setAttribute('placeholder', 'Enter option one');

    let opt2 = document.createElement('input');
    opt2.setAttribute('type', 'text');
    opt2.classList.add("palo", "c2", "mb-2");
    opt2.setAttribute('placeholder', 'Enter option two');

    let opt3 = document.createElement('input');
    opt3.setAttribute('type', 'text');
    opt3.classList.add("palo", "c3", "mb-2");
    opt3.setAttribute('placeholder', 'Enter option three');

    let opt4 = document.createElement('input');
    opt4.setAttribute('type', 'text');
    opt4.classList.add("palo", "c4");
    opt4.setAttribute('placeholder', 'Enter option four');

    createClass.appendChild(opt1);
    createClass.appendChild(opt2);
    createClass.appendChild(opt3);
    createClass.appendChild(opt4);

    let createLabel3 = document.createElement('label');
    createLabel3.innerHTML = "Correct Answer:";
    createLabel3.classList.add('lab', 'mt-3')

    let createCa = document.createElement('input');
    createCa.setAttribute('type', 'text');
    createCa.setAttribute('placeholder', 'Enter the correct answer');
    createCa.classList.add("palo", "cans", "mb-2")

    createMo.appendChild(createLabel3);
    createMo.appendChild(createCa);


    createDiv.appendChild(createMo)

    formField.appendChild(createDiv)
}



function removeInput(event) {

    event.preventDefault();

    let formField = document.getElementById("itemaddcontrols");

    const input_tags = formField.getElementsByClassName('row');
    if(input_tags.length > 0) {
      formField.removeChild(input_tags[(input_tags.length) - 1]);
    }
}

function createQuiz(event) {
    event.preventDefault();

    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    let ans = [];

    const getQuestion = document.querySelectorAll(".cQues");
    const getCorrectAns = document.querySelectorAll(".cans");
    const getOptions = document.querySelectorAll(".c1");
    const getOptions2 = document.querySelectorAll(".c2");
    const getOption3 = document.querySelectorAll(".c3");
    const getOptions4 = document.querySelectorAll(".c4");
    const qCourse = document.querySelector(".qcourse").value;

    if (getQuestion === "" || getCorrectAns === "" || getOptions === "" || getOptions2 === "" || getOption3 === "" || getOptions4 === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required.',
            confirmButtonColor: '#25067C'
        })

        getSpin.style.display = "none"
    }

    else {
        const myHeader = new Headers();
        myHeader.append("Content-Type", "application/json");

        for (i = 0; i < getQuestion.length; i++) {
            const item = {}
            item.question = getQuestion[i].value;
            item.question_type = "single";
            item.correct_answers = getCorrectAns[i].value
            item.answers = [getOptions[i].value, getOptions2[i].value, getOption3[i].value, getOptions4[i].value];
            ans.push(item)
        }

        const questionContent = JSON.stringify({
            "quiz": {
                "questions": ans
            },
            "course_id": qCourse
        })
    
        console.log(ans)
        console.log(questionContent)

        const quesMethod = {
            method: 'POST',
            headers: myHeader,
            body: questionContent
        }

        const url = "https://backend.pluralcode.institute/student/create-quiz";

        fetch(url, quesMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.message === "Updated") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#25067C'
                })
                setTimeout(() => {
                    location.reload();
                }, 3000)
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: '#25067C'
                })
            }
        })
        .catch(error => console.log('error', error));
    }
}

function getQuestion() {
    const quiz = document.querySelector(".showquiz-section");
    const quizHead = document.querySelector(".quiz-heading");

    const qcourse = document.querySelector(".qcourse2").value;
    console.log(qcourse)

    const pageSpin = document.querySelector(".pagemodal2");
    pageSpin.style.display = "block";

    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    const method = {
        method: 'GET',
        headers: myHeader
    }

    let data = [];
    let ir = []

    const url = `https://backend.pluralcode.institute/student/get-quiz?course_id=${qcourse}`

    fetch(url, method)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.message === "All fields are required") {
            quiz.innerHTML = `<center><h2>No Quiz Records Found!</h2></center>`;
        }
        else {
            result.message.questions.map((item, index = 1) => {
                
                data += `
                <div class="container">
                  <h4 class="mb-3">${index + 1}. ${item.question}</h4>
                  <div class="option-item">
                    <p><i class="fas fa-check-circle" style="color: #2334A8"></i> ${item.answers[0]}</p>
                    <p><i class="fas fa-check-circle" style="color: #2334A8"></i> ${item.answers[1]}</p>
                    <p><i class="fas fa-check-circle" style="color: #2334A8"></i> ${item.answers[2]}</p>
                    <p><i class="fas fa-check-circle" style="color: #2334A8"></i> ${item.answers[3]}</p>
                  </div>
                  <label class="mt-3">Correct Answer:</label>
                  <p><i class="fas fa-check-circle" style="color: #4A9A5B"></i> ${item.correct_answers}</p>
                  </div>
                `
                quiz.innerHTML = data;
                quizHead.style.display = "block";
            })

        }
        pageSpin.style.display = "none";

    })
    .catch(error => console.log('error', error));
}

function changeValue(price) {
    const amount = document.querySelector(".eamount");
    return amount.value = price;
}

function showcaseAdvisor() {
    const getAdvisor = document.querySelector(".eadvisor");
    const saMethod = {
        method: 'GET',
    };

    let data = [];

    const url = "https://backend.pluralcode.institute/admin/get-pluralcode-advisors";

    fetch(url, saMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.getAdvisors.map((item) => {
            data += `
               <option value="${item.referral_code}">${item.name}</option>
            `
            getAdvisor.innerHTML = data;
        })
    })
    .catch(error => console.log('error', error))
}

function verifyVoucher(event) {
    event.preventDefault();

    const getAmount = document.querySelector(".eamount").value
    const cobtn = document.querySelector(".co-btn")

    const getSpin = document.querySelector(".spinad");
    getSpin.style.display = "inline-block";

    const getVoucher = document.querySelector(".evoucher").value;
    if (getVoucher === "") {
        Swal.fire({
            icon: 'info',
            text: "Voucher is required!",
            confirmButtonColor: '#25067C'
        })
        getSpin.style.display = "none";
    }

    else {
        const vdata = new FormData();
        vdata.append("voucher_code", getVoucher);

        const vMethod = {
            method: 'POST',
            body: vdata
        };

        const url = "https://pluralcode.net/apis/v1/verify_voucher.php";

        fetch(url, vMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "valid") {
                let str = result.discount.replace( /%/g, "" );
                const getDiscountPrice = parseInt(str) * getAmount / 100;
                const total = getAmount - getDiscountPrice;
                changeValue(total);
                cobtn.innerHTML = `You are to Pay ₦${total}`;
                Swal.fire({
                    icon: 'success',
                    text: `Pay ${total}`,
                    confirmButtonColor: '#25067C'
                })
                getSpin.style.display = "none";
            }
            else {
                Swal.fire({
                    icon: 'error',
                    text: 'invalid voucher',
                    confirmButtonColor: '#25067C'
                })
                getSpin.style.display = "none";
            }
            
        })
        .catch(error => console.log('error', error));
    }

    
}