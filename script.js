var xmlhttp = new XMLHttpRequest();
var url = "https://pluralcode.academy/pluralcode_payments/api/get_data";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
    if(this.readyState === 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        // console.log(data);
        var months = data.map(function(elem) {
            return elem.date;
        });
        // console.log(months);
        var booked = data.map(function(elem) {
            return elem.data.total_number_of_sessions_booked;
        });

        var taken = data.map(function(elem) {
            return elem.data.total_number_of_sessions_taken;
        });
        var un = data.map(function(elem) {
            return elem.data.total_number_of_students_notinterested;
        });
        var int = data.map(function(elem) {
            return elem.data.total_number_of_students_interested;
        });

        const ctx = document.getElementById('canvas').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                    label: 'Session Booked',
                    data: booked,
                    backgroundColor: 'transparent',
                    borderColor: 'grey',
                    borderWidth: 4
                },
                {
                    label: 'Session Taken',
                    data: taken,
                    backgroundColor: 'transparent',
                    borderColor: 'blue',
                    borderWidth: 4
                },
                {
                    label: 'Not interested',
                    data: un,
                    backgroundColor: 'transparent',
                    borderColor: 'red',
                    borderWidth: 4
                },
                {
                    label: 'interested',
                    data: int,
                    backgroundColor: 'transparent',
                    borderColor: 'green',
                    borderWidth: 4
                }
            ]
            },
            options: {
                elements: {
                    line: {
                        tension: 0
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// function for admin login
function adminLog(event) {
    event.preventDefault();
    const getEmail = document.getElementById("email").value;
    const getPass = document.getElementById("password").value;

    if (getEmail === "" || getPass === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#25067C'
        })
    }

    else {
        const spinRoll = document.querySelector(".spin");
        spinRoll.style.display = "inline-block";

        const getUniqueId = Math.floor(Math.random() * 1000000);
        localStorage.setItem("unNum", getUniqueId);
        const now = new Date();
        now.setTime(now.getTime() + 1 * 60 * 60 * 1000);
        cookievalue = getUniqueId;

        document.cookie = "name=" + cookievalue;
        document.cookie = "expires=" + now.toUTCString() + ";";
        if(localStorage.getItem("cookieKey") === null) {
          localStorage.setItem('cookieKey', document.cookie);
        }

        const adminData = new FormData();
        adminData.append("email", getEmail);
        adminData.append("password", getPass);
        adminData.append("id", getUniqueId);


        const adminRequest = {
            method: 'POST',
            body: adminData
        };

        const url = "https://pluralcode.academy/pluralcode_payments/api/admin_login";

        fetch(url, adminRequest)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.hasOwnProperty("email")) {
                localStorage.setItem("adminLogin", JSON.stringify(result));
                window.location.href = "dashboard.html";
            }else {
                Swal.fire({
                    icon: 'warning',
                    text: 'login unsuccessful',
                    confirmButtonColor: '#25067C'
                });
                spinRoll.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }
}

setTimeout(function destroyCookie() {
    const cookwa = localStorage.getItem("adminLogin");
    const theCook = JSON.parse(cookwa);
    const cookTok = theCook.token;

    const cookHead = new Headers();
    cookHead.append("Authorization", `Bearer ${cookTok}`);

    const getCookie = localStorage.getItem("unNum");
    const cookForm = new FormData();
    cookForm.append("id", getCookie);

    const cookReq = {
        method: 'POST',
        headers: cookHead,
        body: cookForm
    };

    const url = "https://pluralcode.academy/pluralcode_payments/api/admin/logout_expired_cookies";
    fetch(url, cookReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if(result.status === "success") {
            localStorage.clear();
            window.location.href = "adminlog.html";
        }
    })
    .catch(error => console.log('error', error));
}, 300000);







// function to display enrolled students
function getEnrolled() {
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const getToken = localStorage.getItem("adminLogin");
    const theToken = JSON.parse(getToken);
    const token = theToken.token;

    const getHeader = new Headers();
    getHeader.append("Authorization", `Bearer ${token}`);

    const enrolledRequest = {
        method: 'GET',
        headers: getHeader
    };

    let dataItem = [];

    const url = "https://pluralcode.academy/pluralcode_payments/api/admin/enrolled_students";
    
    fetch(url, enrolledRequest)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.map((item) => {
            if (item.payment_status === "complete") {
                dataItem += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.mode_of_payment}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.address}</td>
                    <td>${item.state_of_residence}</td>
                    <td>${item.level_of_education}</td>
                    <td><a href="view.html?id=${item.id}"><button class="upd-btn">View me</button></a></td>
                    <td><button disabled class=${item.payment_status}>${item.payment_status}</button></td>
                </tr>
               `
            }
            else {
                dataItem += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.mode_of_payment}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.address}</td>
                    <td>${item.state_of_residence}</td>
                    <td>${item.level_of_education}</td>
                    <td><a href="view.html?id=${item.id}"><button class="upd-btn">View me</button></a></td>
                    <td><button class="${item.payment_status} enrol" onclick="changeStatus(${item.id})">${item.payment_status}</button></td>
                </tr>
               `
            }
            const tableInfo = document.querySelector(".tableData");
            tableInfo.innerHTML = dataItem;
            myModal.style.display = "none";
        })
    })
    .catch(error => console.log('error', error));
}
getEnrolled();

// function to update status
function changeStatus(statusId) {
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const coLogin = localStorage.getItem("adminLogin");
    const coview = JSON.parse(coLogin);
    const coview2 = coview.token;


    const coviewHead = new Headers();
    coviewHead.append("Authorization", `Bearer ${coview2}`);

    const coFormData = new FormData();
    coFormData.append("id", statusId);

    const coState = {
        method: 'POST',
        headers: coviewHead,
        body: coFormData
    };

    const url = "https://pluralcode.academy/pluralcode_payments/api/admin/update_enrolled_status";
    fetch(url, coState)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.status === "success") {
            Swal.fire({
                icon: 'success',
                text: `${result.status}`,
                confirmButtonColor: '#25067C'
            })
            setTimeout(()=> {
                location.reload();
            }, 3000);
            myModal.style.display = "none";
        }
        else {
            Swal.fire({
                icon: 'info',
                text: 'Unsuccessful',
                confirmButtonColor: '#25067C'
            })
            myModal.style.display = "none";
        }
    })
    .catch(error => console.log('error', error));
}

// function to view enrolled
function viewEnrolled() {
    const params = new URLSearchParams(window.location.search);
    let getId = params.get('id');
    console.log(getId)

    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";
    
    const viewLogin = localStorage.getItem("adminLogin");
    const view = JSON.parse(viewLogin);
    const view2 = view.token;


    const viewHead = new Headers();
    viewHead.append("Authorization", `Bearer ${view2}`);

    const viewReq = {
        method: 'GET',
        headers: viewHead
    };

    viewData = [];

    const url = `https://pluralcode.academy/pluralcode_payments/api/admin/enrolled_students?id=` + `${getId}`;
    fetch(url, viewReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const info = document.querySelector(".box-student");
        if (result.length === 0) {
            info.innerHTML = "No Records found";
            myModal.style.display = "none";
        }
        else {
            result.map((item) => {
                viewData += `
                    <div class="details-item">
                    <div class="detail-img text-center">
                        <img src="assets/sr.png" alt="">
                    </div>
                    <div class="detail-body mt-3">
                        <div class="text-center">
                          <button class="${item.status}">${item.status}</button>
                        </div>
                        <div class="content mt-3">
                            <p class="first">Amount Paid</p>
                            <p>${item.amount_paid}</p>
                        </div>
                        <div class="content mt-3">
                            <p class="first">Date</p>
                            <p>${item.date}</p>
                        </div>
                        <div class="content mt-3">
                            <p class="first">Mode of Pyment</p>
                            <p>${item.mode_of_payment}</p>
                        </div>
                        <div class="content mt-3">
                            <p class="first">Time</p>
                            <p>${item.time}</p>
                        </div>
                        <div class="text-center">
                          <button class="uptran">Update Transaction</button>
                        </div>  
                    </div>
                </div>
                `
            })
            info.innerHTML = viewData;
            myModal.style.display = "none";
        }
    })
    .catch(error => console.log('error', error));
}



function closeDashModal() {
    const getModal = document.getElementById("dash-modal");
    getModal.style.display = "none";
}

// Function to search by Name
function searchName(event) {
    event.preventDefault();

    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const myForm = document.querySelector(".theForm");
    const nameSearch = document.querySelector(".nsearch").value;
    if (nameSearch === "") {
        Swal.fire({
            icon: 'info',
            text: 'please enter a search value!',
            confirmButtonColor: '#25067C'
        })
    }

    else {
        const myToken = localStorage.getItem("adminLogin");
        const theToken = JSON.parse(myToken);
        const token = theToken.token;

        const nameHeader = new Headers();
        nameHeader.append("Authorization", `Bearer ${token}`);

        const nameRequest = {
            method: 'GET',
            headers: nameHeader
        };

        let nameData = [];

        const url = `https://pluralcode.academy/pluralcode_payments/api/admin/enrolled_students?name=` + `${nameSearch}`;
        fetch(url, nameRequest)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            const tableInfo = document.querySelector(".tableData");
            if (result.length === 0) {
                tableInfo.innerHTML = `
                  <h2 class="text-center">No Records found on this name</h2>
                `
                myForm.reset();
                myModal.style.display = "none";

            }
            else {
                result.map((item) => {
                    nameData += `
                        <tr>
                        <td>${item.name}</td>
                        <td>${item.email}</td>
                        <td>${item.phone_number}</td>
                        <td>${item.mode_of_learning}</td>
                        <td>${item.course_of_interest}</td>
                        <td>${item.mode_of_payment}</td>
                        <td>${item.date}</td>
                        <td>${item.time}</td>
                        <td>${item.address}</td>
                        <td>${item.state_of_residence}</td>
                        <td>${item.level_of_education}</td>
                        <td><a href="view.html?id=${item.id}"><button class="upd-btn">View me</button></a></td>
                        <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                    </tr>
                    `
                    tableInfo.innerHTML = nameData;
                })
                myForm.reset();
                myModal.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }
}

// function to search by date
function searchDate(event) {
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const dateTok = localStorage.getItem("adminLogin");
    const dk = JSON.parse(dateTok);
    const dateToken = dk.token;

    const myInput = event.target.value;

    const dateHeader = new Headers();
    dateHeader.append("Authorization", `Bearer ${dateToken}`);

    const dateReq = {
        method: 'GET',
        headers: dateHeader
    };

    let dateData = [];

    const url = `https://pluralcode.academy/pluralcode_payments/api/admin/enrolled_students?date_search=` + `${myInput}`;

    fetch(url, dateReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const tableInfo = document.querySelector(".tableData");
        if (result.length === 0) {
            tableInfo.innerHTML = `
               <h2 class="text-center">No Records found on this date</h2>
            `
            myModal.style.display = "none";
        }
        else {
            result.map((item) => {
                dateData += `
                    <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.mode_of_payment}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.address}</td>
                    <td>${item.state_of_residence}</td>
                    <td>${item.level_of_education}</td>
                    <td><a href="view.html?id=${item.id}"><button class="upd-btn">View me</button></a></td>
                    <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                </tr>
                `
                tableInfo.innerHTML = dateData;
                myModal.style.display = "none";
    
            })
        }
    })
    .catch(error => console.log('error', error));
}

// Function for searching by course
window.addEventListener("load", () => {
    const secReq = {
        method: 'GET'
    }

    let data = [];

    const url = "https://pluralcode.academy/pluralcode_payments/api/getcourses";

    fetch(url, secReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.map((item) => {
            data += `
            <option value="${item.name}">${item.name}</option>
            `
            const newMe = document.querySelector(".letcourse");
            newMe.innerHTML = data;
        })
    })
    .catch(error => console.log('error', error));
})

// Function to get course 
function getTypeCourse(event) {
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const courseName = event.currentTarget.value;
    const dataTok = localStorage.getItem("adminLogin");
    const theData = JSON.parse(dataTok);
    const tokenData = theData.token;

    const dataHeader = new Headers();
    dataHeader.append("Authorization", `Bearer ${tokenData}`);

    const dataReq = {
        method: 'GET',
        headers: dataHeader
    };

    let courseData = [];

    const url = `https://pluralcode.academy/pluralcode_payments/api/admin/enrolled_students?course=` + `${courseName}`;

    fetch(url, dataReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const tableInfo = document.querySelector(".tableData");
        if (result.length === 0) {
            tableInfo.innerHTML = `
               <h2 class="text-center">No Records found on this course</h2>
            `
            myModal.style.display = "none";
        }
        else {
            result.map((item) => {
                courseData += `
                    <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.mode_of_payment}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.address}</td>
                    <td>${item.state_of_residence}</td>
                    <td>${item.level_of_education}</td>
                    <td><a href="view.html?id=${item.id}"><button class="upd-btn">View me</button></a></td>
                    <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                </tr>
                `
                tableInfo.innerHTML = courseData;
                myModal.style.display = "none";
            })
        }
    })
    .catch(error => console.log('error', error));
}

// Function to search by Name
function searchName2(event) {
    event.preventDefault();

    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const myForm = document.querySelector(".theForm");
    const nameSearch = document.querySelector(".nsearch2").value;
    if (nameSearch === "") {
        Swal.fire({
            icon: 'info',
            text: 'please enter a search value!',
            confirmButtonColor: '#25067C'
        })
    }

    else {
        const myToken = localStorage.getItem("adminLogin");
        const theToken = JSON.parse(myToken);
        const token = theToken.token;

        const nameHeader = new Headers();
        nameHeader.append("Authorization", `Bearer ${token}`);

        const nameRequest = {
            method: 'GET',
            headers: nameHeader
        };

        let nameData = [];

        const url = `https://pluralcode.academy/pluralcode_payments/api/admin/interested_students?name=` + `${nameSearch}`;
        fetch(url, nameRequest)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            const tableInfo = document.querySelector(".tableInterest");
            if (result.length === 0) {
                tableInfo.innerHTML = `
                  <h2 class="text-center">No Records found on this name</h2>
                `
                myForm.reset();
                myModal.style.display = "none";
            }
            else {
                result.map((item) => {
                    nameData += `
                        <tr>
                        <td>${item.name}</td>
                        <td>${item.email}</td>
                        <td>${item.phone_number}</td>
                        <td>${item.amount_to_pay}</td>
                        <td>${item.mode_of_learning}</td>
                        <td>${item.course_of_interest}</td>
                        <td>${item.mode_of_payment}</td>
                        <td>${item.date}</td>
                        <td>${item.time}</td>
                        <td>${item.address}</td>
                        <td>${item.state_of_residence}</td>
                        <td>${item.level_of_education}</td>
                        <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                    </tr>
                    `
                    tableInfo.innerHTML = nameData;
                })
                myForm.reset();
                myModal.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }
}

// function to display interested student
function getInterest() {
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const getToken = localStorage.getItem("adminLogin");
    const theToken = JSON.parse(getToken);
    const token = theToken.token;

    const getHeader = new Headers();
    getHeader.append("Authorization", `Bearer ${token}`);

    const enrolledRequest = {
        method: 'GET',
        headers: getHeader
    };

    let dataItem = [];

    const url = "https://pluralcode.academy/pluralcode_payments/api/admin/interested_students";
    
    fetch(url, enrolledRequest)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.map((item) => {
            if (item.payment_status === "complete") {
                dataItem += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.amount_paid}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.mode_of_payment}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.address}</td>
                    <td>${item.state_of_residence}</td>
                    <td>${item.level_of_education}</td>
                    <td><button disabled class=${item.payment_status}>${item.payment_status}</button></td>
                </tr>
            `
            }
            else if (item.payment_status === "un-paid") {
                dataItem += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.amount_paid}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.mode_of_payment}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.address}</td>
                    <td>${item.state_of_residence}</td>
                    <td>${item.level_of_education}</td>
                    <td><button disabled class=${item.payment_status}>${item.payment_status}</button></td>
                </tr>
            `
            }
            else {
                dataItem += `
                 <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.amount_paid}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.mode_of_payment}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.address}</td>
                    <td>${item.state_of_residence}</td>
                    <td>${item.level_of_education}</td>
                    <td><button class="${item.payment_status} getMe" onclick="changeInter(${item.id})">${item.payment_status}</button></td>
                 </tr>
            `
            }
            const tableInfo = document.querySelector(".tableInterest");
            tableInfo.innerHTML = dataItem;
            myModal.style.display = "none";
        })
    })
    .catch(error => console.log('error', error));
}
getInterest()

// function to search by date
function searchDate2(event) {
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const dateTok = localStorage.getItem("adminLogin");
    const dk = JSON.parse(dateTok);
    const dateToken = dk.token;

    const myInput = event.target.value;

    const dateHeader = new Headers();
    dateHeader.append("Authorization", `Bearer ${dateToken}`);

    const dateReq = {
        method: 'GET',
        headers: dateHeader
    };

    let dateData = [];

    const url = `https://pluralcode.academy/pluralcode_payments/api/admin/interested_students?date_search=` + `${myInput}`;

    fetch(url, dateReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const tableInfo = document.querySelector(".tableInterest");
        if (result.length === 0) {
            tableInfo.innerHTML = `
               <h2 class="text-center">No Records found on this date</h2>
            `
            myModal.style.display = "none";
        }
        else {
            result.map((item) => {
                dateData += `
                    <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.amount_paid}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.mode_of_payment}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.address}</td>
                    <td>${item.state_of_residence}</td>
                    <td>${item.level_of_education}</td>
                    <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                </tr>
                `
                tableInfo.innerHTML = dateData;
                myModal.style.display = "none";
    
            })
        }
    })
    .catch(error => console.log('error', error));
}

// funtion to show courses for interest
function courses2() {
    const courReq = {
        method: 'GET'
    };

    let courData = [];

    const url = "https://pluralcode.academy/pluralcode_payments/api/getcourses";
    fetch(url, courReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        localStorage.setItem("getCourse", JSON.stringify(result));
        
        result.map((item)=> {
            courData += `
            <option value="${item.name}">${item.name}</option>
            `
        })
        const theCourse = document.querySelector(".letcourse2");
        theCourse.innerHTML = courData;
    })
    .catch(error => console.log('error', error));
}
courses2();

// funtion to show courses for interest
function courses3() {
    const coReq = {
        method: 'GET'
    };

    let coData = [];

    const url = "https://pluralcode.academy/pluralcode_payments/api/getcourses";
    fetch(url, coReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        localStorage.setItem("getCourse", JSON.stringify(result));
        
        result.map((item)=> {
            coData += `
            <option value="${item.name}">${item.name}</option>
            `
        })
        const theCourse2 = document.querySelector(".spincourse");
        theCourse2.innerHTML = coData;
    })
    .catch(error => console.log('error', error));
}
courses3();

// Function to get course 
function getTypeCourse2(event) {
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const courseName = event.currentTarget.value;
    const dataTok = localStorage.getItem("adminLogin");
    const theData = JSON.parse(dataTok);
    const tokenData = theData.token;

    const dataHeader = new Headers();
    dataHeader.append("Authorization", `Bearer ${tokenData}`);

    const dataReq = {
        method: 'GET',
        headers: dataHeader
    };

    let courseData = [];

    const url = `https://pluralcode.academy/pluralcode_payments/api/admin/interested_students?course=` + `${courseName}`;

    fetch(url, dataReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const tableInfo = document.querySelector(".tableInterest");
        if (result.length === 0) {
            tableInfo.innerHTML = `
               <h2 class="text-center">No Records found on this course</h2>
            `
            myModal.style.display = "none";
        }
        else {
            result.map((item) => {
                courseData += `
                    <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.amount_paid}</td>
                    <td>${item.mode_of_learning}</td>
                    <td>${item.course_of_interest}</td>
                    <td>${item.mode_of_payment}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td>${item.address}</td>
                    <td>${item.state_of_residence}</td>
                    <td>${item.level_of_education}</td>
                    <td><button class="${item.payment_status}">${item.payment_status}</button></td>
                </tr>
                `
                tableInfo.innerHTML = courseData;
                myModal.style.display = "none";
            })
        }
    })
    .catch(error => console.log('error', error));
}

// dashboard api 
function dashBoardDetails() {
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const totalAdvisor = document.getElementById("adAsign");
    const totalSect = document.getElementById("secHel");
    const totalAdviCom = document.getElementById("adCom");
    const totalEnrol = document.getElementById("totEn");
    const totalForm = document.getElementById("toIn");
    const totalUn = document.getElementById("toUn");



    const dash = localStorage.getItem("adminLogin");
    const dash2 = JSON.parse(dash);
    const dash3 = dash2.token;

    const dashHead = new Headers();
    dashHead.append("Authorization", `Bearer ${dash3}`);

    const dashReq = {
        method: 'GET',
        headers: dashHead
    };

    const url = "https://pluralcode.academy/pluralcode_payments/api/admin/admin_dashboard_api";
    fetch(url, dashReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        totalAdvisor.innerHTML = result.total_advisory_interested;
        totalSect.innerHTML = result.total_session_held;
        totalAdviCom.innerHTML = result.total_advisory_sessions_booked;
        totalEnrol.innerHTML = result.total_enrolled;
        totalForm.innerHTML = result.total_interested_students;
        totalUn.innerHTML = result.total_advisory_not_interested;

        myModal.style.display = "none";
    })
    .catch(error => console.log('error', error));
}
dashBoardDetails()

// function to update admin records and set new one
function upDateRecord(event) {
    event.preventDefault()

    const adminEmail = document.querySelector(".aemail").value;
    const adminPass = document.querySelector(".apass").value;
    const bankName = document.querySelector(".abank").value;
    const accountName = document.querySelector(".abankNa").value;
    const accountNumber = document.querySelector(".adbankN").value;

    if (adminEmail === "" || adminPass === "" || bankName === "" || accountName === "" || accountNumber === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required',
            confirmButtonColor: '#25067C'
        });
    }
    else {
        const updateLog = localStorage.getItem("adminLogin");
        const logValue = JSON.parse(updateLog);
        const upTok = logValue.token;

        const upHead = new Headers();
        upHead.append("Authorization", `Bearer ${upTok}`);

        const upForm = new FormData();
        upForm.append("email", adminEmail);
        upForm.append("password", adminPass);
        upForm.append("bank_name", bankName);
        upForm.append("bank_account_name", accountName);
        upForm.append("bank_account_number", accountNumber);

        const upReq = {
            method: 'POST',
            headers: upHead,
            body: upForm
        };

        const url = "https://pluralcode.academy/pluralcode_payments/api/admin/update_admin";
        fetch(url, upReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.message === "success") {
                Swal.fire({
                    icon: 'success',
                    text: 'Records updated successfully!',
                    confirmButtonColor: '#25067C'
                })
            }
            setTimeout(()=> {
                location.reload();
            }, 5000);
        })
        .catch(error => console.log('error', error));
    }
}

// function get the course and update it
function getCourseDisplay() {
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const getDisplay = {
        method: 'GET'
    };

    let createData = [];

    const url = "https://pluralcode.academy/pluralcode_payments/api/getcourses";
    fetch(url, getDisplay)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.map((item) => {
            createData += `
              <div class="search-card">
                <h3>${item.name}</h3>
                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6"> 
                       <p>Course Fee: </p>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <p>???${item.course_fee}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6"> 
                       <p>Part Payment: </p>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <p>???${item.part_payment}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6"> 
                       <p>Initial Payment: </p>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <p>???${item.fee_to_pay}</p>
                    </div>
                </div>
                <center>
                   <button class="upd-btn" onclick="openCourseModal(${item.id})">Update course</button>
                   <button class="del-btn del" onclick="deleteCourse(${item.id})">Close Cohort</button>
                </center>
              </div>
            `
            const theDisplay = document.querySelector(".scroll-object")
            theDisplay.innerHTML = createData;
            myModal.style.display = "none";
        })
    })
    .catch(error => console.log('error', error));
}
getCourseDisplay();

// Function to create course
function createCourse(event) {
    event.preventDefault();

    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const cName = document.querySelector(".courseName").value;
    const cFee = document.querySelector(".courseFee").value;
    const cPart = document.querySelector(".coursePart").value;
    const cPercent = document.querySelector(".coursePercent").value;
    const cLink = document.querySelector(".courseLink").value;
    const cSchool = document.querySelector(".school").value;

    if (cName === "" || cFee === "" || cPart === "" || cPercent === "" || cLink === "" || cSchool === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#25067C'
        })
        myModal.style.display = "none";
    }

    else {
            
        const courseLog = localStorage.getItem("adminLogin");
        const log = JSON.parse(courseLog);
        const logTok = log.token;

        const result = parseFloat(cPercent) / 100.0;
        const getBtn = document.querySelector(".getBtn");

        const logHead = new Headers();
        logHead.append("Authorization", `Bearer ${logTok}`);

        const courseForm = new FormData();
        courseForm.append("course_name", cName);
        courseForm.append("course_fee", cFee);
        courseForm.append("course_partpayment", cPart);
        courseForm.append("percentages", result);
        courseForm.append("link", cLink);
        courseForm.append("school", cSchool);


        const courseReq = {
            method: 'POST',
            headers: logHead,
            body: courseForm
        }

        const url = "https://pluralcode.academy/pluralcode_payments/api/admin/create_courses";

        fetch(url, courseReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#25067C'
                })
                setTimeout(()=> {
                    location.reload();
                }, 3000);
                myModal.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }

}

// function to update course by passing course id
function updateTheCourse(event) {
    event.preventDefault();

    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const upName = document.querySelector(".courseUpName").value;
    const upFee = document.querySelector(".courseUpFee").value;
    const upPart = document.querySelector(".courseUpPart").value;
    const upPercent = document.querySelector(".courseUpPercent").value;
    const upLink = document.querySelector(".courseUpLink").value;


    if (upName === "" || upFee === "" || upPart === "" || upPercent === "" || upLink === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required',
            confirmButtonColor: '#25067C'
        });
        myModal.style.display = "none";
    }

    else {
        
        const courseUpdate = localStorage.getItem("adminLogin");
        const courseUp = JSON.parse(courseUpdate);
        const courseUpToken = courseUp.token;

        const result = parseFloat(upPercent) / 100.0;
        console.log(result);

        const tokCourse = new Headers();
        tokCourse.append("Authorization", `Bearer ${courseUpToken}`);

        const tokForm = new FormData();
        tokForm.append("course_name", upName);
        tokForm.append("course_fee", upFee);
        tokForm.append("course_partpayment", upPart);
        tokForm.append("percentages", result);
        tokForm.append("link", upLink)
        tokForm.append("id", idCourse);

        const updateCourse = {
            method: 'POST',
            headers: tokCourse,
            body: tokForm
        };

        const url = "https://pluralcode.academy/pluralcode_payments/api/admin/update_courses";

        fetch(url, updateCourse)
        .then(response => response.json())
        .then(result => {
            console.log(result)

            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#25067C'
                })
                setTimeout(()=> {
                    location.reload();
                }, 3000);

                myModal.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }
}

//function to open update modal for course info
let idCourse;
function openCourseModal(courseId) {
    const getModal = document.getElementById("my-modal");
    getModal.style.display = "block";
    idCourse = courseId;

    const upName = document.querySelector(".courseUpName");
    const upFee = document.querySelector(".courseUpFee");
    const upPart = document.querySelector(".courseUpPart");
    const upPer = document.querySelector(".courseUpPercent");
    const upLink = document.querySelector(".courseUpLink");

    const open1 = localStorage.getItem("adminLogin");
    const open2 = JSON.parse(open1);
    const openTok = open2.token;

    const openHead = new Headers();
    openHead.append("Authorization", `Bearer ${openTok}`)

    const openReq = {
        method: 'POST',
        headers: openHead
    };

    const url = `https://pluralcode.academy/pluralcode_payments/api/admin/course_details/` + `${courseId}`;
    fetch(url, openReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        upName.setAttribute('value', `${result.name}`);
        upFee.setAttribute('value', `${result.course_fee}`);
        upPart.setAttribute('value', `${result.part_payment}`);
        upPer.setAttribute('value', `${result.percentages}`);
        upLink.setAttribute('value', `${result.link}`);
    })
    .catch(error => console.log('error', error));
}

function closeModal3() {
    const getModal = document.getElementById("my-modal");
    getModal.style.display = "none";
}

// function to delete course
function deleteCourse(delId) {
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const deleteGet = localStorage.getItem("adminLogin");
    const delGet = JSON.parse(deleteGet);
    const delTok = delGet.token;

    const delHead = new Headers();
    delHead.append("Authorization", `Bearer ${delTok}`);

    let removeCourse = document.querySelector(".del");
    removeCourse.innerHTML = "Deleting item";

    const delReq = {
        method: 'GET',
        headers: delHead
    };

    const url = `https://pluralcode.academy/pluralcode_payments/api/admin/delete_course/` + `${delId}`;
    fetch(url, delReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.status === "success") {
            Swal.fire({
                icon: 'success',
                text:  `${result.status}`,
                confirmButtonColor: '#25067C'
            })
            setTimeout(()=> {
                location.reload();
            }, 3000);
            myModal.style.display = "none";
        }
        
    })
    .catch(error => console.log('error', error));
}

// function to get advisory
function getAdvisory() {
    
    const adReq = {
        method: 'GET',
    };

    let adData = [];

    const url = "https://pluralcode.academy/pluralcode_payments/api/get_advisory";
    fetch(url, adReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.map((item) => {
            if (item.status === "complete") {
                adData += `
                    <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td><a href="advisoryview.html?id=${item.id}"><button class="upd-btn">View me</button></a></td>
                    <td><button disabled class="${item.status}">${item.status}</button></td>
                    </tr>
                `
            }
            else {
                adData += `
                    <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td><a href="advisoryview.html?id=${item.id}"><button class="upd-btn">View me</button></a></td>
                    <td><button class="${item.status} adBtn" onclick="changeAdvisoryStatus(${item.id})">
                        ${item.status}
                        </button>
                    </td>
                    </tr>
                `
            }
            const myTable = document.querySelector(".tableindex");
            myTable.innerHTML = adData;
        })
    })
    .catch(error => console.log('error', error));
}
getAdvisory();

// function to pass ID to reschedule
function rescheduleTime(reId) {

    const myModal = document.getElementById("re-modal");
    myModal.style.display = "block";

    localStorage.setItem("getDule", reId);

}

function closehModal() {
    const myModal = document.getElementById("re-modal");
    myModal.style.display = "none";
}

// function to set time and assign time
// function assignTimeSlot(event) {
//     event.preventDefault();

//     const setTime = document.querySelector(".myDate").value;
//     if (setTime === "") {
//         Swal.fire({
//             icon: 'info',
//             text: 'Please enter a date',
//             confirmButtonColor: '#25067C'
//         })
//     }
//     else {
//         const getId = localStorage.getItem("getDule");

//         const resGet = localStorage.getItem("adminLogin");
//         const reGet = JSON.parse(resGet);
//         const reTok = reGet.token;

//         const relHead = new Headers();
//         relHead.append("Authorization", `Bearer ${reTok}`);

//         const reForm = new FormData();
//         reForm.append("id", getId);
//         reForm.append("datetime", setTime)
//     }
// }


// function to change advisory status
// function changeAdvisoryStatus(advId) {

//     const changeLoc = localStorage.getItem("adminLogin");
//     const loc = JSON.parse(changeLoc);
//     const locTok = loc.token;


//     const adv = document.querySelector(".adBtn");

//     const spinRoll = document.querySelector(".spin");
//     spinRoll.style.display = "inline-block";

//     const locHead = new Headers();
//     locHead.append("Authorization", `Bearer ${locTok}`);

//     const locForm = new FormData();
//     locForm.append("id", advId);
    

//     const locReq = {
//         method: 'POST',
//         headers: locHead,
//         body: locForm
//     };

//     const url = "https://pluralcode.academy/pluralcode_payments/api/admin/update_advisory_status";
//     fetch(url, locReq)
//     .then(response => response.json())
//     .then(result => {
//         console.log(result)
//         if (result.status === "success") {
//             adv.innerHTML = "complete";
//             adv.style.backgroundColor = "#4ee053";
//             adv.disabled = true;
//             spinRoll.style.display = "none";
//         }
//         else {
//             spinRoll.style.display = "none";
//         }
//     })
//     .catch(error => {
//         console.log('error', error)
//         // window.location.href = "adminlog.html";
//     });
// }

// function to get advisor 
function viewAdvisor() {
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const tok1 = localStorage.getItem("adminLogin");
    const tok2 = JSON.parse(tok1);
    const tok3 = tok2.token;

    const tokHead = new Headers();
    tokHead.append("Authorization", `Bearer ${tok3}`);

    const tokReq = {
        method: 'GET',
        headers: tokHead
    };

    let dta = [];

    const url = "https://pluralcode.academy/pluralcode_payments/api/admin/list_advisor";

    fetch(url, tokReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        localStorage.setItem("details", JSON.stringify(result));
        result.advisors.map((item) => {
            dta +=`
            <tr>
                <td>
                  <img src="${item.image}" class="v2">  
                </td>
                <td>${item.first_name}</td>
                <td>${item.last_name}</td>
                <td>${item.email}</td>
                <td><button class="${item.status}">${item.status}</button></td>
                <td><a href="viewadv.html?id=${item.id}"><button class="dele-btn">View Details</button></a></td>
            </tr>
            `
            const myTable = document.querySelector(".tables");
            myTable.innerHTML = dta;
            myModal.style.display = "none";
        })
    })
    .catch(error => console.log('error', error));
}

viewAdvisor();

// function to view advisor
function viewIt() {
    const myParams = new URLSearchParams(window.location.search);
    let getId = myParams.get('id');

    const t1 = localStorage.getItem("adminLogin");
    const t2 = JSON.parse(t1);
    const t3 = t2.token;

    const heIt = new Headers();
    heIt.append("Authorization", `Bearer ${t3}`);

    const heForm = new FormData();
    heForm.append("id", getId);

    const heReq = {
        method: 'POST',
        headers: heIt,
        body: heForm
    };

    let dataItem = [];
    let dataItem2 = [];
    let dataItem3 = [];

    const url = "https://pluralcode.academy/pluralcode_payments/api/admin/get_advisors_details";
    fetch(url, heReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        dataItem += `
                <div class="content">
                    <p>Image:</p>
                    <img src="${result.advisor.image}" class="adimg mb-3">
                </div>
                <div class="content">
                    <p>First Name:</p>
                    <p>${result.advisor.first_name}</p>
                </div>
                <div class="content">
                    <p>Last Name:</p>
                    <p>${result.advisor.last_name}</p>
                </div>
                <div class="content">
                    <p>Email:</p>
                    <p>${result.advisor.email}</p>
                </div>
                <div class="content">
                    <p>School:</p>
                    <p>${result.advisor.school_assigned_to}</p>
                </div>
                <div class="content">
                    <p>Status:</p>
                    <p><button class="${result.advisor.status}">${result.advisor.status}</button></p>
                </div>
                <div class="content">
                    <p>Total advisory assigned:</p>
                    <p class="peep">${result.total_advisory_assigned}</p>
                </div>
                <div class="content">
                    <p>Total Enrolled:</p>
                    <p class="peep">${result.total_enrolled}</p>
                </div>
                <div class="content">
                    <p>Total interest form filled:</p>
                    <p class="peep">${result.total_interest_form_filled}</p>
                </div>
        
               
            `
            if (result.enrolled_students.length == 0 || result.enrolled_students == undefined ) {
                dataItem2 += `
                <h2 class="text-center">No Records found</h2>
                `
            }
            else {
                result.enrolled_students.map((item) => {
                
                    dataItem2 += `
                  <div class="content">
                   <p>${item.name}</p>
                   <p>${item.course_of_interest}</p>
                  </div>
                `
                })
            }
            
            if (result.interested_students.length == 0 || result.interested_students == undefined) {
                dataItem3 += `
                <h2 class="text-center">No Records found</h2>
                `
            }
            else {
                result.interested_students.map((item) => {
                
                    dataItem3 += `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.amount_paid}</td>
                        <td>${item.course_of_interest}</td>
                    </tr>
                `
               })
            }

            

            let display = document.querySelector(".manzi");
            display.innerHTML = dataItem;

            let display2 = document.querySelector(".manzi2");
            display2.innerHTML = dataItem2;

            let display3 = document.querySelector(".tableAd");
            display3.innerHTML = dataItem3;

            
    })
    .catch(error => console.log('error', error));
    
}
viewIt();

// function to open advisor form modal
function createAd() {
    const cmodal = document.getElementById("dash-modal");
    cmodal.style.display = "block";
}

// function to create advisor
function createAdvisor(event) {
    event.preventDefault();

    const firstName = document.querySelector(".fName").value;
    const lastName = document.querySelector(".lName").value;
    const email = document.querySelector(".email").value;
    const pass = document.querySelector(".pass").value;
    const sch = document.querySelector(".school").value;
    const image = document.querySelector(".image").files[0];

    if (firstName === "" || lastName === "" || email === "" || pass === "" || sch === "" || image === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required',
            confirmButtonColor: '#0C1E5B'
        })
    }
    else {
        const f1 = localStorage.getItem("adminLogin");
        const f2 = JSON.parse(f1);
        const f3 = f2.token;

        const formHead = new Headers();
        formHead.append("Authorization", `Bearer ${f3}`);

        const formdata = new FormData();
        formdata.append("first_name", firstName);
        formdata.append("last_name", lastName);
        formdata.append("email", email);
        formdata.append("password", pass);
        formdata.append("school", sch);
        formdata.append("image", image);

        const formRequest = {
            method: 'POST',
            headers: formHead,
            body: formdata
        };

        const url = "https://pluralcode.academy/pluralcode_payments/api/create_advisor";

        fetch(url, formRequest)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#0C1E5B'
                })
                setTimeout(()=> {
                    location.reload();
                }, 5000);
            }
            else {
                Swal.fire({
                    icon: 'info',
                    text: 'Unsuccessful',
                    confirmButtonColor: '#0C1E5B'
                })
            }
        })
        .catch(error => console.log('error', error));
    }
}


// function to getAdvisory details
function getAdvisoryDetails() {
    const params = new URLSearchParams(window.location.search);
    let getId = params.get('id');


    const openAdReq = {
        method: 'GET'
    };

    let myData = [];
    let myData2 = [];

    const url = `https://pluralcode.academy/pluralcode_payments/api/get_advisory_details?id=` + `${getId}`;

    fetch(url, openAdReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.advisor !== null) {
            myData += `
                <div class="content">
                    <p>Name:</p>
                    <p>${result.name}</p>
                </div>
                <div class="content">
                    <p>Phone Number:</p>
                    <p>${result.phone_number}</p>
                </div>
                <div class="content">
                    <p>Email:</p>
                    <p>${result.email}</p>
                </div>
                <div class="content">
                    <p>Course Interested In:</p>
                    <p>${result.course_interested_in}</p>
                </div>
                <div class="content">
                    <p>Location:</p>
                    <p>${result.location}</p>
                </div>
                <div class="content">
                    <p>Reason For not workingout:</p>
                    <p>${result.reason_for_not_workingout}</p>
                </div>
                <div class="content">
                    <p>Taken any course before:</p>
                    <p>${result.taken_any_course_before}</p>
                </div>
                <div class="content">
                    <p>Mode of learning:</p>
                    <p>${result.mode_of_learning}</p>
                </div>
                <div class="content">
                    <p>Current Job:</p>
                    <p>${result.current_job}</p>
                </div>
                <div class="content">
                    <p>Reason for Learning:</p>
                    <p>${result.reason_for_learning}</p>
                </div>
                <div class="content">
                  <p>Schedule:</p>
                  <p>${result.schedule}</p>
                </div>
                <div class="content">
                  <p>Status:</p>
                  <p><button class="${result.status}">${result.status}</button></p>
                </div>
                <div class="text-center">
                    <p><button class="re-btn" onclick="reAssign()">Reassign Advisor</button></p>
                </div>
            </div>
            `
        }
        else {
            myData += `
                
                <div class="content">
                    <p>Name:</p>
                    <p>${result.name}</p>
                </div>
                <div class="content">
                    <p>Phone Number:</p>
                    <p>${result.phone_number}</p>
                </div>
                <div class="content">
                    <p>Email:</p>
                    <p>${result.email}</p>
                </div>
                <div class="content">
                    <p>Course Interested In:</p>
                    <p>${result.course_interested_in}</p>
                </div>
                <div class="content">
                    <p>Location:</p>
                    <p>${result.location}</p>
                </div>
                <div class="content">
                    <p>Reason For not workingout:</p>
                    <p>${result.reason_for_not_workingout}</p>
                </div>
                <div class="content">
                    <p>Taken any course before:</p>
                    <p>${result.taken_any_course_before}</p>
                </div>
                <div class="content">
                    <p>Mode of learning:</p>
                    <p>${result.mode_of_learning}</p>
                </div>
                <div class="content">
                    <p>Current Job:</p>
                    <p>${result.current_job}</p>
                </div>
                <div class="content">
                    <p>Reason for Learning:</p>
                    <p>${result.reason_for_learning}</p>
                </div>
                <div class="content">
                  <p>Schedule:</p>
                  <p>${result.schedule}</p>
                </div>
                <div class="content">
                  <p>Status:</p>
                  <p><button class="${result.status}">${result.status}</button></p>
                </div>
            </div>
            `
        }
        

            if (result.advisor === "NULL" || result.advisor === null) {
                result.advisor_list.map((item) => {
                    myData2 +=`
                    <div class="rider">
                        <div class="content">
                            <p>Image:</p>
                            <img src="${item.image}" class="adimg mb-3">
                        </div>
                        <div class="content">
                            <p>First Name:</p>
                            <p>${item.first_name}</p>
                        </div>
                        <div class="content">
                            <p>Last Name:</p>
                            <p>${item.last_name}</p>
                        </div>
                        <div class="content">
                            <p>Email:</p>
                            <p>${item.email}</p>
                        </div>
                        <div class="content">
                            <p>Status:</p>
                            <p><button class="${item.status}">${item.status}</button></p>
                        </div>
                        <div class="text-center">
                            <p><button class="ass-btn" onclick="assignAdvisor(${item.id})">Assign Advisor</button></p>
                        </div>
                    </div>
                        
                    `
                })
            }
            else {
                myData2 +=`
                <div class="content">
                    <p>Image:</p>
                    <img src="${result.advisor.image}" class="adimg mb-3">
               </div>
                <div class="content">
                  <p>First Name:</p>
                  <p>${result.advisor.first_name}</p>
                </div>
                <div class="content">
                  <p>Last Name:</p>
                  <p>${result.advisor.last_name}</p>
                </div>
                <div class="content">
                  <p>Email:</p>
                  <p>${result.advisor.email}</p>
                </div>
                <div class="content">
                  <p>status:</p>
                  <p><button class="${result.advisor.status}">${result.advisor.status}</button></p>
                </div>
            `
            }
            
            const colIt = document.querySelector(".colect");
            colIt.innerHTML = myData;

            const colIt2 = document.querySelector(".colect2");
            colIt2.innerHTML = myData2;
    })
    .catch(error => console.log('error', error));
}
getAdvisoryDetails();

// function to assign advisor
function assignAdvisor(assId) {
    const advisorParam = new URLSearchParams(window.location.search);
    const asignId = advisorParam.get('id');

    const getStorage = localStorage.getItem("adminLogin");
    const getStore = JSON.parse(getStorage);
    const storeToken = getStore.token;


    const storeHead = new Headers();
    storeHead.append("Authorization", `Bearer ${storeToken}`);

    const storeForm = new FormData();
    storeForm.append("advisor_id", assId);
    storeForm.append("advisory_id", asignId);

    const storeReq = {
        method: 'POST',
        headers: storeHead,
        body: storeForm
    };

    const url = "https://pluralcode.academy/pluralcode_payments/api/admin/assign_advisor";
    fetch(url, storeReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.status === "success") {
            Swal.fire({
                icon: 'success',
                text: `${result.message}`,
                confirmButtonColor: '#0C1E5B'
            })
            setTimeout(()=> {
                window.location.href = "dashboard.html";
            }, 5000);
        }
        else {
            Swal.fire({
                icon: 'info',
                text: 'Unsuccessful',
                confirmButtonColor: '#0C1E5B'
            })
        }
    })
    .catch(error => console.log('error', error));
}


// function to reassign advisor
function reAssign() {
    const reDet = localStorage.getItem("adminLogin");
    const reLog = JSON.parse(reDet);
    const reToken = reLog.token;

    const reHead = new Headers();
    reHead.append("Authorization", `Bearer ${reToken}`);


    const reReq = {
        method: 'GET',
        headers: reHead
    };

    let reData2 = [];

    const url = "https://pluralcode.academy/pluralcode_payments/api/admin/list_advisor";
    fetch(url, reReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.advisors.map((item) => {
            reData2 +=`
                    <div class="rider">
                        <div class="content">
                            <p>Image:</p>
                            <img src="${item.image}" class="adimg mb-3">
                        </div>
                        <div class="content">
                            <p>First Name:</p>
                            <p>${item.first_name}</p>
                        </div>
                        <div class="content">
                            <p>Last Name:</p>
                            <p>${item.last_name}</p>
                        </div>
                        <div class="content">
                            <p>Email:</p>
                            <p>${item.email}</p>
                        </div>
                        <div class="content">
                            <p>Status:</p>
                            <p><button class="${item.status}">${item.status}</button></p>
                        </div>
                        <div class="text-center">
                            <p><button class="ass-btn" onclick="assignAdvisor(${item.id})">Assign Advisor</button></p>
                        </div>
                    </div>
                    `
                    const colIt2 = document.querySelector(".colect2");
                    colIt2.innerHTML = reData2;

                    const reck = document.querySelector(".re-btn");
                    reck.style.display = "none";
        })
    })
    .catch(error => console.log('error', error));
}


// function to search by Advisory list by name
function searchAdbyName(event) {
    event.preventDefault();

    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const searchNa = document.querySelector(".myname").value;
    console.log(searchNa);
    if (searchNa === "") {
        Swal.fire({
            icon: 'info',
            text: 'this field is required',
            confirmButtonColor: '#0C1E5B'
        })
    }

    else {
        const naDet = localStorage.getItem("adminLogin");
        const naLog = JSON.parse(naDet);
        const naTok = naLog.token;
        
        const naHeader = new Headers();
        naHeader.append("Authorization", `Bearer ${naTok}`);

        const naForm = new FormData();
        naForm.append("name", searchNa);

        const naReq = {
            method: 'POST',
            headers: naHeader,
            body: naForm
        };

        let nameData = [];

        const url = "https://pluralcode.academy/pluralcode_payments/api/admin/search_advisory";
        fetch(url, naReq)
        .then(response => response.json())
        .then(result => {
            const myTable = document.querySelector(".tableindex");
            if (result.length === 0) {
                myTable.innerHTML = `
                  <h2 class="text-center">No Records found on this name</h2>
                `
                myModal.style.display = "none";
            }
            console.log(result)
            result.map((item) => {
                if (item.status === "complete") {
                    nameData += `
                        <tr>
                        <td>${item.name}</td>
                        <td>${item.email}</td>
                        <td>${item.phone_number}</td>
                        <td>${item.date}</td>
                        <td>${item.time}</td>
                        <td><a href="advisoryview.html?id=${item.id}"><button class="upd-btn">View me</button></a></td>
                        <td><button disabled class="${item.status}">${item.status}</button></td>
                        </tr>
                    `
                }
                else {
                    nameData += `
                        <tr>
                        <td>${item.name}</td>
                        <td>${item.email}</td>
                        <td>${item.phone_number}</td>
                        <td>${item.date}</td>
                        <td>${item.time}</td>
                        <td><a href="advisoryview.html?id=${item.id}"><button class="upd-btn">View me</button></a></td>
                        <td><button class="${item.status} adBtn">${item.status}</button>
                        </td>
                        </tr>
                    `
                }
                myTable.innerHTML = nameData;
                myModal.style.display = "none";
            })
            
        })
        .catch(error => console.log('error', error));
    }
    
}

// function to get date range
function searchTheDate(event) {
    event.preventDefault();

    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const first = document.querySelector(".firstValue").value;
    const second = document.querySelector(".secondValue").value;

    if (first === "" || second === "") {
        Swal.fire({
            icon: 'info',
            text: 'these field is required',
            confirmButtonColor: '#0C1E5B'
        })
    }

    else {
        const daDet = localStorage.getItem("adminLogin");
        const daLog = JSON.parse(daDet);
        const daTok = daLog.token;
        
        const daHeader = new Headers();
        daHeader.append("Authorization", `Bearer ${daTok}`);

        const daForm = new FormData();
        daForm.append("start_date", first);
        daForm.append("end_date", second);

        const daReq = {
            method: 'POST',
            headers: daHeader,
            body: daForm
        };

        let daData = [];

        const url = "https://pluralcode.academy/pluralcode_payments/api/admin/search_advisory";
        fetch(url, daReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            const myTable2 = document.querySelector(".tableindex");
            if (result.length === 0) {
                myTable2.innerHTML = `
                  <h2 class="text-center">No Records found on this name</h2>
                `
                myModal.style.display = "none";
            }
            result.map((item) => {
                if (item.status === "complete") {
                    daData += `
                        <tr>
                        <td>${item.name}</td>
                        <td>${item.email}</td>
                        <td>${item.phone_number}</td>
                        <td>${item.date}</td>
                        <td>${item.time}</td>
                        <td><a href="advisoryview.html?id=${item.id}"><button class="upd-btn">View me</button></a></td>
                        <td><button disabled class="${item.status}">${item.status}</button></td>
                        </tr>
                    `
                }
                else {
                    daData += `
                        <tr>
                        <td>${item.name}</td>
                        <td>${item.email}</td>
                        <td>${item.phone_number}</td>
                        <td>${item.date}</td>
                        <td>${item.time}</td>
                        <td><a href="advisoryview.html?id=${item.id}"><button class="upd-btn">View me</button></a></td>
                        <td><button class="${item.status} adBtn" onclick="changeAdvisoryStatus(${item.id})">
                            ${item.status}
                            </button>
                        </td>
                        </tr>
                    `
                }
                myTable2.innerHTML = daData;
                myModal.style.display = "none";
            })
        })
        .catch(error => console.log('error', error));
    }

}

// function to get advisory dashboard course
function visorCourse(event) {
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const course = event.currentTarget.value;
    const coTok = localStorage.getItem("adminLogin");
    const gData = JSON.parse(coTok);
    const goData = gData.token;

    const gHeader = new Headers();
    gHeader.append("Authorization", `Bearer ${goData}`);

    const coForm = new FormData();
    coForm.append("course", course);

    const gReq = {
        method: 'POST',
        headers: gHeader,
        body: coForm
    };

    let Data = [];

    const url = "https://pluralcode.academy/pluralcode_payments/api/admin/search_advisory";
    fetch(url, gReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const myTable3 = document.querySelector(".tableindex");
        if (result.length === 0) {
            myTable3.innerHTML = `
              <h2 class="text-center">No Records found on this name</h2>
            `
        }
        result.map((item) => {
            if (item.status === "complete") {
                Data += `
                    <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td><a href="advisoryview.html?id=${item.id}"><button class="upd-btn">View me</button></a></td>
                    <td><button disabled class="${item.status}">${item.status}</button></td>
                    </tr>
                `
            }
            else {
                Data += `
                    <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.date}</td>
                    <td>${item.time}</td>
                    <td><a href="advisoryview.html?id=${item.id}"><button class="upd-btn">View me</button></a></td>
                    <td><button class="${item.status} adBtn" onclick="changeAdvisoryStatus(${item.id})">
                        <div class="spinner-border spinner-border-sm text-light spin" role="status">
                            <span class="sr-only"></span>
                        </div>
                        ${item.status}
                        </button>
                    </td>
                    </tr>
                `
            }
            myTable3.innerHTML = Data;
            myModal.style.display = "none";
        })
        
    })
    .catch(error => console.log('error', error));
}

// function to copy text
function getTheText(event) {
    event.preventDefault();
    let copyText = document.querySelector(".aty").textContent;
    navigator.clipboard.writeText(copyText);
    console.log(copyText)
}


// function logout
function logAdminOut(event) {

    const logDet = localStorage.getItem("adminLogin");
    const delLog = JSON.parse(logDet);
    const delTok = delLog.token;

    const delHeader = new Headers();
    delHeader.append("Authorization", `Bearer ${delTok}`)

    const logReq = {
        method: 'GET',
        headers: delHeader
    };

    const url = "https://pluralcode.academy/pluralcode_payments/api/admin/logout";
    fetch(url, logReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)

        if (result.message === "success") {
            Swal.fire({
                icon: 'success',
                text: `${result.message}`,
                confirmButtonColor: '#25067C'
            })
        }
        setTimeout(()=> {
            localStorage.clear();
            window.location.href = "adminlog.html";
        }, 5000);
    })
    .catch(error => console.log('error', error));
}

