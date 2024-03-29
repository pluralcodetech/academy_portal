
let miro;
let myChart;

let cohNext;
let cohPrev;

let cohortId;



// function to sort chat by date range
function getChatItem() {
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const chatMethod = {
        method: 'GET'
    }

    const url = "https://pluralcode.institute/pluralcode_apis/api/get_data";
    fetch(url, chatMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            const gbook = document.querySelector(".gbook");
            const ginterest = document.querySelector(".ginterest");
            const gnotinterest = document.querySelector(".gnotinterest");
            const gtaken = document.querySelector(".gtaken");
            const undeci = document.querySelector(".undecide");
            const unreach = document.querySelector(".unreach");


            let months = result.graph_data.map(function(elem) {
                return elem.date;
            });
            let booked = result.graph_data.map(function(elem) {
                return elem.data.total_number_of_sessions_booked;
            });
    
            let taken = result.graph_data.map(function(elem) {
                return elem.data.total_number_of_sessions_taken;
            });
            let un = result.graph_data.map(function(elem) {
                return elem.data.total_number_of_students_notinterested;
            });
            let int = result.graph_data.map(function(elem) {
                return elem.data.total_number_of_students_interested;
            });

            let unde = result.graph_data.map(function(elem) {
                return elem.data.total_number_of_students_undecided;
            });

            let unrech = result.graph_data.map(function(elem) {
                return elem.data.total_number_of_students_unreachable;
            });

            gbook.innerHTML = "total number booked: " + result.total_number_booked;
            ginterest.innerHTML = "total number interested: " + result.total_number_interested;
            gnotinterest.innerHTML = "total number not interested: " + result.total_number_notinterested;
            gtaken.innerHTML = "total number taken: " + result.total_number_taken;
            undeci.innerHTML = "total number of undecided: " + result.total_number_undecided;
            unreach.innerHTML = "total number of unreachable: " + result.total_number_unreachable;




            let ctx = document.querySelector('.canvas').getContext('2d');
            if (myChart) {
                myChart.destroy()
            }
            myChart = new Chart(ctx, {
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
                        label: 'Interested',
                        data: int,
                        backgroundColor: 'transparent',
                        borderColor: 'green',
                        borderWidth: 4
                    },
                    {
                        label: 'Undecided',
                        data: unde,
                        backgroundColor: 'transparent',
                        borderColor: 'purple',
                        borderWidth: 4
                    },
                    {
                        label: 'Unreachable',
                        data: unrech,
                        backgroundColor: 'transparent',
                        borderColor: 'orange',
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
            myChart.update();
            myModal.style.display = "none";

        })
        .catch(error => console.log('error', error));

}

function searchChat(event) {
    event.preventDefault();

    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const getFirstChatValue = document.querySelector(".chatValue").value;
    const getSecondChatValue = document.querySelector(".secondChatValue").value;
    const source = document.querySelector(".sourcetype").value;
    const spincht = document.querySelector(".spinchat").value;

    console.log(source, spincht)

    const chatMethod = {
        method: 'GET'
    }

    const url = `https://pluralcode.institute/pluralcode_apis/api/get_data?start_date=${getFirstChatValue}&end_date=${getSecondChatValue}&course=${spincht}&source_type=${source}`;
    fetch(url, chatMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const gbook = document.querySelector(".gbook");
        const ginterest = document.querySelector(".ginterest");
        const gnotinterest = document.querySelector(".gnotinterest");
        const gtaken = document.querySelector(".gtaken");
        const undeci = document.querySelector(".undecide");
        const unreach = document.querySelector(".unreach");


        let months = result.graph_data.map(function(elem) {
            return elem.date;
        });
        let booked = result.graph_data.map(function(elem) {
            return elem.data.total_number_of_sessions_booked;
        });

        let taken = result.graph_data.map(function(elem) {
            return elem.data.total_number_of_sessions_taken;
        });
        let un = result.graph_data.map(function(elem) {
            return elem.data.total_number_of_students_notinterested;
        });
        let int = result.graph_data.map(function(elem) {
            return elem.data.total_number_of_students_interested;
        });
        let unde = result.graph_data.map(function(elem) {
            return elem.data.total_number_of_students_undecided;
        });

        let unrech = result.graph_data.map(function(elem) {
            return elem.data.total_number_of_students_unreachable;
        });

        gbook.innerHTML = "total number booked: " + result.total_number_booked;
        ginterest.innerHTML = "total number interested: " + result.total_number_interested;
        gnotinterest.innerHTML = "total number not interested: " + result.total_number_notinterested;
        gtaken.innerHTML = "total number taken: " + result.total_number_taken;
        undeci.innerHTML = "total number of undecided: " + result.total_number_undecided;
        unreach.innerHTML = "total number of unreachable: " + result.total_number_unreachable;


        let ctx = document.querySelector('.canvas').getContext('2d');
        if (myChart) {
            myChart.destroy()
        }
        myChart = new Chart(ctx, {
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
                    label: 'Interested',
                    data: int,
                    backgroundColor: 'transparent',
                    borderColor: 'green',
                    borderWidth: 4
                },
                {
                    label: 'Undecided',
                    data: unde,
                    backgroundColor: 'transparent',
                    borderColor: 'purple',
                    borderWidth: 4
                },
                {
                    label: 'Unreachable',
                    data: unrech,
                    backgroundColor: 'transparent',
                    borderColor: 'orange',
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
        myChart.update();
        myModal.style.display = "none";

    })
    .catch(error => console.log('error', error));

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

        const myHead = new Headers();
        myHead.append('Content-Type', 'application/json')

        const profile = JSON.stringify({
            "email": getEmail,
            "password": getPass
        })
        
        const adminRequest = {
            method: 'POST',
            headers: myHead,
            body: profile
        };

        const url = "https://backend.pluralcode.institute/admin/login";

        fetch(url, adminRequest)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.hasOwnProperty("token")) {
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
    }3
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

    const url = "https://pluralcode.institute/pluralcode_apis/api/admin/logout_expired_cookies";
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

    const url = "https://pluralcode.institute/pluralcode_apis/api/admin/enrolled_students";
    
    fetch(url, enrolledRequest)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.data.map((item) => {
            if (item.payment_status === "complete") {
                dataItem += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.registeration_number}</td>
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
                    <td>${item.registeration_number}</td>
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



let myPagButton = document.querySelectorAll(".pag-link");
let tNext;
let tPrevious;
for (i = 0; i < myPagButton.length; i++) {
    let button = myPagButton[i];
    button.addEventListener("click", () => {
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

        let data = [];
        let pageNum = JSON.parse(button.innerHTML);


        let nee1 = document.getElementById("prev");
        let nee2 = document.getElementById("next");

        if (button.innerHTML === "10") {

            nee1.style.display = "block";
            nee2.style.display = "block";

            
        }else {
            nee1.style.display = "none";
            nee2.style.display = "none";
        }

        const url = `https://pluralcode.institute/pluralcode_apis/api/admin/enrolled_students?page=${pageNum}`;
            fetch(url, enrolledRequest)
            .then(response => response.json())
            .then(result => {
                console.log(result)

                result.data.map((item) => {
                    if (item.payment_status === "complete") {
                        data += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.phone_number}</td>
                            <td>${item.registeration_number}</td>
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
                        data += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.phone_number}</td>
                            <td>${item.registeration_number}</td>
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


                    tableInfo.innerHTML = data;
                    myModal.style.display = "none";
                })
                localStorage.setItem("nextPage", `${result.next_page_url}`);
                localStorage.setItem("prePage", `${result.prev_page_url}`);

                let pageNext = localStorage.getItem("nextPage");
                let pvNext = localStorage.getItem("prePage");

                tNext = pageNext;
                tPrevious = pvNext;
            })
        
    })
}



let preNext = document.querySelectorAll(".get-url");
const pre = document.getElementById("prev");
const next = document.getElementById("next");

for (i = 0; i < preNext.length; i++) {
    let dwo = preNext[i];
    dwo.addEventListener("click", () => {
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

        let rene = [];

        if (dwo === next) {
            const url = tNext;
            fetch(url, enrolledRequest)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                tNext = `${result.next_page_url}`;
                tPrevious = `${result.prev_page_url}`;
                result.data.map((item) => {
                    if (item.payment_status === "complete") {
                        rene += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.phone_number}</td>
                            <td>${item.registeration_number}</td>
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
                        rene += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.phone_number}</td>
                            <td>${item.registeration_number}</td>
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
                    tableInfo.innerHTML = rene;
                    myModal.style.display = "none";
                    
                })
            })
            .catch(error => console.log('error', error));
        }
        if (dwo === pre) {
            const url = tPrevious;
            fetch(url, enrolledRequest)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                tNext = `${result.next_page_url}`;
                tPrevious = `${result.prev_page_url}`;
                result.data.map((item) => {
                    if (item.payment_status === "complete") {
                        rene += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.phone_number}</td>
                            <td>${item.registeration_number}</td>
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
                        rene += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.phone_number}</td>
                            <td>${item.registeration_number}</td>
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
                    tableInfo.innerHTML = rene;
                    myModal.style.display = "none";
                    
                })
            })
            .catch(error => console.log('error', error));
        }
        
    })
}

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

    const url = "https://pluralcode.institute/pluralcode_apis/api/admin/update_enrolled_status";
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

    const url = `https://pluralcode.institute/pluralcode_apis/api/admin/enrolled_students?id=` + `${getId}`;
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
                if (item.status === "complete") {
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
                        </div>
                    </div>
                    `
                }
                else {
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
                            <button class="uptran" onclick="transactionStatus(${item.id})">Update Transaction</button>
                            </div>  
                        </div>
                    </div>
                    `
                }
                
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

// function to update transaction details
function transactionStatus(tranId) {
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const trTok = localStorage.getItem("adminLogin");
    const trdk = JSON.parse(trTok);
    const trToken = trdk.token;

    const trHeader = new Headers();
    trHeader.append("Authorization", `Bearer ${trToken}`);

    const trForm = new FormData();
    trForm.append("id", tranId);

    const trReq = {
        method: 'POST',
        headers: trHeader,
        body: trForm
    };

    const url = "https://pluralcode.institute/pluralcode_apis/api/admin/update_transaction_status";
    fetch(url, trReq)
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
            }, 2000);
            myModal.style.display = "none";
        }
        else {
            Swal.fire({
                icon: 'info',
                text: 'Unsuccessful!',
                confirmButtonColor: '#25067C'
            })
            myModal.style.display = "none";
        }
    })
    .catch(error => {
        console.log('error', error)
        myModal.style.display = "none";
   });
    
}

// Function to search by Name
function searchName(event) {
    event.preventDefault();

    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const myForm = document.querySelector(".theForm");
    const nameSearch = document.querySelector(".nsearch").value;
    const nam = document.querySelector(".sn");
    const mn = document.querySelector(".mn");
    const md = document.querySelector(".sn2");



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

        const url = `https://pluralcode.institute/pluralcode_apis/api/admin/enrolled_students?name=` + `${nameSearch}`;
        fetch(url, nameRequest)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            const tableInfo = document.querySelector(".tableData");
            if (result.data.length === 0) {
                tableInfo.innerHTML = `
                  <h2 class="text-center">No Records found on this name</h2>
                `
                myForm.reset();
                myModal.style.display = "none";
                nam.style.display = "none";
                mn.style.display = "none";
                md.style.display = "none";


            }
            else {
                result.data.map((item) => {
                    nameData += `
                        <tr>
                        <td>${item.name}</td>
                        <td>${item.email}</td>
                        <td>${item.phone_number}</td>
                        <td>${item.registeration_number}</td>
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
                nam.style.display = "block";
                mn.style.display = "none"
                md.style.display = "none"

            }
        })
        .catch(error => console.log('error', error));
    }
}

// pagination for search by name
let myPagButton2 = document.querySelectorAll(".pag-link2");
let tNext2;
let tPrevious2;
for (i = 0; i < myPagButton2.length; i++) {
    let button2 = myPagButton2[i];
    button2.addEventListener("click", () => {
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

        let data = [];
        let pageNum2 = JSON.parse(button2.innerHTML);


        let nee12 = document.getElementById("prev2");
        let nee22 = document.getElementById("next2");

        if (button2.innerHTML === "3") {

            nee12.style.display = "block";
            nee22.style.display = "block";

            
        }else {
            nee12.style.display = "none";
            nee22.style.display = "none";
        }

        const url = `https://pluralcode.institute/pluralcode_apis/api/admin/enrolled_students?page=${pageNum2}`;
            fetch(url, enrolledRequest)
            .then(response => response.json())
            .then(result => {
                console.log(result)

                result.data.map((item) => {
                    if (item.payment_status === "complete") {
                        data += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.phone_number}</td>
                            <td>${item.registeration_number}</td>
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
                        data += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.phone_number}</td>
                            <td>${item.registeration_number}</td>
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


                    tableInfo.innerHTML = data;
                    myModal.style.display = "none";
                })
                localStorage.setItem("nextPage2", `${result.next_page_url}`);
                localStorage.setItem("prePage2", `${result.prev_page_url}`);

                let pageNext2 = localStorage.getItem("nextPage2");
                let pvNext2 = localStorage.getItem("prePage2");

                tNext2 = pageNext2;
                tPrevious2 = pvNext2;
            })
        
    })
}



let preNext2 = document.querySelectorAll(".get-url2");
const pre2 = document.getElementById("prev2");
const next2 = document.getElementById("next2");

for (i = 0; i < preNext2.length; i++) {
    let dwo2 = preNext2[i];
    dwo2.addEventListener("click", () => {
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

        let rene = [];

        if (dwo2 === next2) {
            const url = tNext2;
            fetch(url, enrolledRequest)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                tNext2 = `${result.next_page_url}`;
                tPrevious2 = `${result.prev_page_url}`;
                result.data.map((item) => {
                    if (item.payment_status === "complete") {
                        rene += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.phone_number}</td>
                            <td>${item.registeration_number}</td>
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
                        rene += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.phone_number}</td>
                            <td>${item.registeration_number}</td>
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
                    tableInfo.innerHTML = rene;
                    myModal.style.display = "none";
                    
                })
            })
            .catch(error => console.log('error', error));
        }
        if (dwo2 === pre2) {
            const url = tPrevious2;
            fetch(url, enrolledRequest)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                tNext2 = `${result.next_page_url}`;
                tPrevious2 = `${result.prev_page_url}`;
                result.data.map((item) => {
                    if (item.payment_status === "complete") {
                        rene += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.phone_number}</td>
                            <td>${item.registeration_number}</td>
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
                        rene += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.phone_number}</td>
                            <td>${item.registeration_number}</td>
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
                    tableInfo.innerHTML = rene;
                    myModal.style.display = "none";
                    
                })
            })
            .catch(error => console.log('error', error));
        }
        
    })
}

// function to search by date
function searchDate(event) {
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const nam = document.querySelector(".sn");
    const mn = document.querySelector(".mn");
    const md = document.querySelector(".sn2");

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

    const url = `https://pluralcode.institute/pluralcode_apis/api/admin/enrolled_students?date_search=` + `${myInput}`;

    fetch(url, dateReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const tableInfo = document.querySelector(".tableData");
        if (result.data.length === 0) {
            tableInfo.innerHTML = `
               <h2 class="text-center">No Records found on this date</h2>
            `
            myModal.style.display = "none";
            nam.style.display = "none";
            mn.style.display = "none";
            md.style.display = "none";

        }
        else {
            result.data.map((item) => {
                dateData += `
                    <tr>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.phone_number}</td>
                    <td>${item.registeration_number}</td>
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
                nam.style.display = "none";
                mn.style.display = "none";
                md.style.display = "block";
    
            })
        }
    })
    .catch(error => console.log('error', error));
}


// pagination for search by date
let myPagButton3 = document.querySelectorAll(".pag-link3");
let tNext3;
let tPrevious3;
for (i = 0; i < myPagButton3.length; i++) {
    let button3 = myPagButton3[i];
    button3.addEventListener("click", () => {
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

        let data = [];
        let pageNum3 = JSON.parse(button3.innerHTML);


        let nee13 = document.getElementById("prev3");
        let nee23 = document.getElementById("next3");

        if (button3.innerHTML === "3") {

            nee13.style.display = "block";
            nee23.style.display = "block";

            
        }else {
            nee13.style.display = "none";
            nee23.style.display = "none";
        }

        const url = `https://pluralcode.institute/pluralcode_apis/api/admin/enrolled_students?page=${pageNum3}`;
            fetch(url, enrolledRequest)
            .then(response => response.json())
            .then(result => {
                console.log(result)

                result.data.map((item) => {
                    if (item.payment_status === "complete") {
                        data += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.phone_number}</td>
                            <td>${item.registeration_number}</td>
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
                        data += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.phone_number}</td>
                            <td>${item.registeration_number}</td>
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


                    tableInfo.innerHTML = data;
                    myModal.style.display = "none";
                })
                localStorage.setItem("nextPage3", `${result.next_page_url}`);
                localStorage.setItem("prePage3", `${result.prev_page_url}`);

                let pageNext3 = localStorage.getItem("nextPage3");
                let pvNext3 = localStorage.getItem("prePage3");

                tNext3 = pageNext3;
                tPrevious3 = pvNext3;
            })
        
    })
}



let preNext3 = document.querySelectorAll(".get-url3");
const pre3 = document.getElementById("prev3");
const next3 = document.getElementById("next3");

for (i = 0; i < preNext3.length; i++) {
    let dwo3 = preNext3[i];
    dwo3.addEventListener("click", () => {
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

        let rene = [];

        if (dwo3 === next3) {
            const url = tNext3;
            fetch(url, enrolledRequest)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                tNext3 = `${result.next_page_url}`;
                tPrevious3 = `${result.prev_page_url}`;
                result.data.map((item) => {
                    if (item.payment_status === "complete") {
                        rene += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.phone_number}</td>
                            <td>${item.registeration_number}</td>
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
                        rene += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.phone_number}</td>
                            <td>${item.registeration_number}</td>
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
                    tableInfo.innerHTML = rene;
                    myModal.style.display = "none";
                    
                })
            })
            .catch(error => console.log('error', error));
        }
        if (dwo3 === pre3) {
            const url = tPrevious3;
            fetch(url, enrolledRequest)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                tNext3 = `${result.next_page_url}`;
                tPrevious3 = `${result.prev_page_url}`;
                result.data.map((item) => {
                    if (item.payment_status === "complete") {
                        rene += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.phone_number}</td>
                            <td>${item.registeration_number}</td>
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
                        rene += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.phone_number}</td>
                            <td>${item.registeration_number}</td>
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
                    tableInfo.innerHTML = rene;
                    myModal.style.display = "none";
                    
                })
            })
            .catch(error => console.log('error', error));
        }
        
    })
}

// Function for searching by course
window.addEventListener("load", () => {
    const secReq = {
        method: 'GET'
    }

    let data = [];

    const url = "https://pluralcode.institute/pluralcode_apis/api/getcourses";

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

    const url = `https://pluralcode.institute/pluralcode_apis/api/admin/enrolled_students?course=` + `${courseName}`;

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

        const url = `https://pluralcode.institute/pluralcode_apis/api/admin/interested_students?name=` + `${nameSearch}`;
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
// function getInterest() {
//     const myModal = document.querySelector(".pagemodal");
//     myModal.style.display = "block";

//     const getToken = localStorage.getItem("adminLogin");
//     const theToken = JSON.parse(getToken);
//     const token = theToken.token;

//     const getHeader = new Headers();
//     getHeader.append("Authorization", `Bearer ${token}`);

//     const enrolledRequest = {
//         method: 'GET',
//         headers: getHeader
//     };

//     let dataItem = [];

//     const url = "https://pluralcode.institute/pluralcode_apis/api/admin/interested_students";
    
//     fetch(url, enrolledRequest)
//     .then(response => response.json())
//     .then(result => {
//         console.log(result)
//         result.map((item) => {
//             if (item.payment_status === "complete") {
//                 dataItem += `
//                 <tr>
//                     <td>${item.name}</td>
//                     <td>${item.email}</td>
//                     <td>${item.phone_number}</td>
//                     <td>${item.amount_paid}</td>
//                     <td>${item.mode_of_learning}</td>
//                     <td>${item.course_of_interest}</td>
//                     <td>${item.mode_of_payment}</td>
//                     <td>${item.date}</td>
//                     <td>${item.time}</td>
//                     <td>${item.address}</td>
//                     <td>${item.state_of_residence}</td>
//                     <td>${item.level_of_education}</td>
//                     <td><button disabled class=${item.payment_status}>${item.payment_status}</button></td>
//                 </tr>
//             `
//             }
//             else if (item.payment_status === "un-paid") {
//                 dataItem += `
//                 <tr>
//                     <td>${item.name}</td>
//                     <td>${item.email}</td>
//                     <td>${item.phone_number}</td>
//                     <td>${item.amount_paid}</td>
//                     <td>${item.mode_of_learning}</td>
//                     <td>${item.course_of_interest}</td>
//                     <td>${item.mode_of_payment}</td>
//                     <td>${item.date}</td>
//                     <td>${item.time}</td>
//                     <td>${item.address}</td>
//                     <td>${item.state_of_residence}</td>
//                     <td>${item.level_of_education}</td>
//                     <td><button disabled class=${item.payment_status}>${item.payment_status}</button></td>
//                 </tr>
//             `
//             }
//             else {
//                 dataItem += `
//                  <tr>
//                     <td>${item.name}</td>
//                     <td>${item.email}</td>
//                     <td>${item.phone_number}</td>
//                     <td>${item.amount_paid}</td>
//                     <td>${item.mode_of_learning}</td>
//                     <td>${item.course_of_interest}</td>
//                     <td>${item.mode_of_payment}</td>
//                     <td>${item.date}</td>
//                     <td>${item.time}</td>
//                     <td>${item.address}</td>
//                     <td>${item.state_of_residence}</td>
//                     <td>${item.level_of_education}</td>
//                     <td><button class="${item.payment_status} getMe" onclick="changeInter(${item.id})">${item.payment_status}</button></td>
//                  </tr>
//             `
//             }
//             const tableInfo = document.querySelector(".tableInterest");
//             tableInfo.innerHTML = dataItem;
//             myModal.style.display = "none";
//         })
//     })
//     .catch(error => console.log('error', error));
// }
// getInterest()

// function to update interest status
function changeInter(interestId) {
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const inTok = localStorage.getItem("adminLogin");
    const indk = JSON.parse(inTok);
    const inToken = indk.token;

    const inHeader = new Headers();
    inHeader.append("Authorization", `Bearer ${inToken}`);

    const inForm = new FormData();
    inForm.append("id", interestId);

    const inReq = {
        method: 'POST',
        headers: inHeader,
        body: inForm
    };

    const url = "https://pluralcode.institute/pluralcode_apis/api/admin/update_interested_status";
    fetch(url, inReq)
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
            }, 2000);
            myModal.style.display = "none";
        }
        else {
            Swal.fire({
                icon: 'info',
                text: 'Unsuccessful!',
                confirmButtonColor: '#25067C'
            })
            myModal.style.display = "none";
        }
    })
    .catch(error => {
        console.log('error', error)
        myModal.style.display = "none";
   });
}

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

    const url = `https://pluralcode.institute/pluralcode_apis/api/admin/interested_students?date_search=` + `${myInput}`;

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

    const url = "https://pluralcode.institute/pluralcode_apis/api/getcourses";
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

    const url = "https://pluralcode.institute/pluralcode_apis/api/getcourses";
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


function courses4() {
    const coReq = {
        method: 'GET'
    };

    let coData = [];
    let mone = {
        id: 55,
        name: "All"
    };

    let mdata = [];
    mdata.push(mone)
    console.log(mdata)



    const url = "https://pluralcode.institute/pluralcode_apis/api/getcourses";
    fetch(url, coReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        localStorage.setItem("getCourse", JSON.stringify(result));
        
        for (i = 0; i < mdata.length; i++) {
            result.unshift(mdata[i]);
        }

        result.map((item)=> {
            if (item.name === "All") {
                return coData += `
                 <option value="">${item.name}</option>

                `
            }
            else {
                return coData += `
                <option value="${item.name}">${item.name}</option>
            `
            }
            
        })
        const theCourse2 = document.querySelector(".spinchat");
        theCourse2.innerHTML = coData;
    })
    .catch(error => console.log('error', error));
}
courses4();

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

    const url = `https://pluralcode.institute/pluralcode_apis/api/admin/interested_students?course=` + `${courseName}`;

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
    console.log(dash3)

    const dashHead = new Headers();
    dashHead.append("Authorization", `Bearer ${dash3}`);

    const dashReq = {
        method: 'GET',
        headers: dashHead
    };

    const url = "https://pluralcode.institute/pluralcode_apis/api/admin/admin_dashboard_api";
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

        const url = "https://pluralcode.institute/pluralcode_apis/api/admin/update_admin";
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

// function for rate
function updateRate(event) {
    event.preventDefault()

    const getRate = document.querySelector(".rate").value;
    if (getRate === "") {
        Swal.fire({
            icon: 'info',
            text: "this field is required!",
            confirmButtonColor: '#25067C'
        })
    }
    else {
        const updateLog = localStorage.getItem("adminLogin");
        const logValue = JSON.parse(updateLog);
        const upTok = logValue.token;

        const upHead = new Headers();
        upHead.append("Authorization", `Bearer ${upTok}`);

        const rateHead = new FormData();
        rateHead.append("rate", getRate);

        const rateMethod = {
            method: 'POST',
            headers: upHead,
            body: rateHead
        }

        const url = "http://pluralcode.academy/pluralcode_apis/api/admin/update_exchnage_rate";

        fetch(url, rateMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.message === "updated") {
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


// function get the course and update it
function getCourseDisplay() {
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const getDisplay = {
        method: 'GET'
    };

    let createData = [];

    const url = "https://pluralcode.institute/pluralcode_apis/api/getcourses";
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
                      <p>₦${item.course_fee}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6"> 
                       <p>Part Payment: </p>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <p>₦${item.part_payment}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-6"> 
                       <p>Initial Payment: </p>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-6">
                      <p>₦${item.fee_to_pay}</p>
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
    const ctype = document.querySelector(".coursetype").value;

    if (cName === "" || cFee === "" || cPart === "" || cPercent === "" || cLink === "" || cSchool === "" || ctype === "") {
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
        courseForm.append("course_type", ctype);



        const courseReq = {
            method: 'POST',
            headers: logHead,
            body: courseForm
        }

        const url = "https://pluralcode.institute/pluralcode_apis/api/admin/create_courses";

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

        const url = "https://pluralcode.institute/pluralcode_apis/api/admin/update_courses";

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

    const url = `https://pluralcode.institute/pluralcode_apis/api/admin/course_details/` + `${courseId}`;
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

    const url = `https://pluralcode.institute/pluralcode_apis/api/admin/delete_course/` + `${delId}`;
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
let nextPage;
function getAdvisory() {
    
    const adReq = {
        method: 'GET',
    };

    let adData = [];

    const url = "https://pluralcode.institute/pluralcode_apis/api/get_advisory";
    fetch(url, adReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.data.map((item) => {
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
        localStorage.setItem("page", `${result.next_page_url}`);
        const nextItem = localStorage.getItem("page");
        nextPage = nextItem;
        const current = document.querySelector(".current-page");
        current.innerHTML = `${result.current_page} of ${result.total}`;
        if (result.prev_page_url === null) {
            const getPrev = document.querySelector(".get-previous");
            getPrev.disabled = true;
        }
    })
    .catch(error => console.log('error', error));
}
getAdvisory();

// function get next page
let previous;
function nextPageItem(event) {
    event.preventDefault();
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";
    
    const nextReq = {
        method: 'GET'
    };

    let adData = [];

    const url = nextPage;
    fetch(url, nextReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        nextPage = `${result.next_page_url}`;
        result.data.map((item) => {
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
            myModal.style.display = "none";
            const current = document.querySelector(".current-page");
            current.innerHTML = `page ${result.current_page} of ${result.total}`;
            const getPrev = document.querySelector(".get-previous");
            getPrev.disabled = false;
        })

        localStorage.setItem("prev", `${result.prev_page_url}`);
        const prPage = localStorage.getItem("prev");
        previous = prPage;
    })
  .catch(error => console.log('error', error));
}

// function to get previous page
function prevPageItem(event) {
    event.preventDefault();
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const preReq = {
        method: 'GET'
    };

    let adData = [];

    const url = previous;
    fetch(url, preReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        previous = `${result.prev_page_url}`;
        nextPage = `${result.next_page_url}`;
        console.log(nextPage)
        result.data.map((item) => {
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
            myModal.style.display = "none";
            const current = document.querySelector(".current-page");
            current.innerHTML = `page ${result.current_page} of ${result.total}`;
            if (result.prev_page_url === null) {
                const getPrev = document.querySelector(".get-previous");
                getPrev.disabled = true;
            }
            
        }) 
    })
    .catch(error => console.log('error', error));
}

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

function closehModal1() {
    const myModal = document.getElementById("re-modal");
    myModal.style.display = "none";
}

function closehModal2() {
    const myModal = document.getElementById("in-modal");
    const upct = document.querySelector(".upct");
    const upPercentage = document.querySelector(".upcpercentage");
    const upCschool = document.querySelector(".upcschool");
    const uptCourse = document.querySelector(".uptcourse");
    const upAdv = document.querySelector(".upladv");


    for (let i = 0; i < upct.options.length; i++) {
        upct.options[i].removeAttribute('selected')
    }

    for (let i = 0; i < upPercentage.options.length; i++) {
        upPercentage.options[i].removeAttribute('selected')
    }

    for (let i = 0; i < upCschool.options.length; i++) {
        upCschool.options[i].removeAttribute('selected')
    }

    for (let i = 0; i < uptCourse.options.length; i++) {
        uptCourse.options[i].removeAttribute('selected')
    }
    for (let i = 0; i < upAdv.options.length; i++) {
        upAdv.options[i].removeAttribute('selected')
    }
    myModal.style.display = "none";
}


function closehModal3() {
    const myModal = document.getElementById("loop-modal");
    const ltcouse = document.querySelector(".loopuptcourse");
    const ladv = document.querySelector(".loopupladv");


    for (let i = 0; i < ladv.length; i++) {
        ladv.options[i].removeAttribute('selected')
    }

    for (let i = 0; i < ltcouse.length; i++) {
        ltcouse.options[i].removeAttribute('selected')
    }
    myModal.style.display = "none";
}

//     const locReq = {
//         method: 'POST',
//         headers: locHead,
//         body: locForm
//     };

//     const url = "https://pluralcode.institute/pluralcode_apis/api/admin/update_advisory_status";
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

    const url = "https://pluralcode.institute/pluralcode_apis/api/admin/list_advisor";

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

    const url = "https://pluralcode.institute/pluralcode_apis/api/admin/get_advisors_details";
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

        const url = "https://pluralcode.institute/pluralcode_apis/api/create_advisor";

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

    const url = `https://pluralcode.institute/pluralcode_apis/api/get_advisory_details?id=` + `${getId}`;

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
                <hr>
                <div class="content">
                  <p><b>Remark:</b></p>
                  <p>${result.advisor_feedback}</p>
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

    const url = "https://pluralcode.institute/pluralcode_apis/api/admin/assign_advisor";
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

    const url = "https://pluralcode.institute/pluralcode_apis/api/admin/list_advisor";
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

        const url = "https://pluralcode.institute/pluralcode_apis/api/admin/search_advisory";
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

        const url = "https://pluralcode.institute/pluralcode_apis/api/admin/search_advisory";
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

    const url = "https://pluralcode.institute/pluralcode_apis/api/admin/search_advisory";
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

// redirect to login page
function gotoLoginPage(event) {
    event.preventDefault();

    window.location.href = "adminlog.html";
}

// function to get cohort list
// function getCohortList() {

//     const cohortReq = {
//         method: 'GET',
//     };

//     let cohortData = [];

//     const url = "https://pluralcode.academy/pluralcode_apis/api/get_cohort_list";
//     fetch(url, cohortReq)
//     .then(response => response.json())
//     .then(result => {
//         console.log(result)
//         result.map((item) => {
//             cohortData += `
//               <option value="${item.name}">${item.name}</option>
//             `

//             const theCourse2 = document.querySelector(".spinMonth");
//             theCourse2.innerHTML = cohortData;
//         })
//     })
//     .catch(error => console.log('error', error));
// }
// getCohortList();

// function
function getMonthlySummary() {
    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const coTok = localStorage.getItem("adminLogin");
    const gData = JSON.parse(coTok);
    const goData = gData.token;

    const ms = new Headers();
    ms.append("Authorization", `Bearer ${goData}`);

    const msReq = {
        method: 'GET',
        headers: ms
    };

    let msData = [];

    const url = "https://pluralcode.academy/pluralcode_apis/api/admin/get_monthly_summary";
    fetch(url, msReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const tableCohort = document.querySelector(".table-cohort");
        if (result.length === 0) {
            tableCohort.innerHTML += `
              <h2 class="text-center">No Records found on this name</h2> 
            `
        }
        else {
            result.map((item) => {
                msData += `
                   <tr>
                      <td>${item.month}</td>
                      <td>${item.data.total_session}</td>
                      <td>${item.data.total_enrollment}</td>
                      <td>${item.data.total_number_of_sessions_taken}</td>
                      <td>${item.data.total_visit_sessions_booked}</td>
                   </tr>
                `
                tableCohort.innerHTML = msData;
            })
        }
    })
    .catch(error => console.log('error', error));

}
getMonthlySummary();

// function to search by cohort
function courseSearch(event) {
    const headOne = document.querySelector(".head1");
    const headTwo = document.querySelector(".head2");

    const myModal = document.querySelector(".pagemodal");
    myModal.style.display = "block";

    const course = event.currentTarget.value;
    const coTok = localStorage.getItem("adminLogin");
    const gData = JSON.parse(coTok);
    const goData = gData.token;

    const cs = new Headers();
    cs.append("Authorization", `Bearer ${goData}`);

    const csForm = new FormData();
    csForm.append("course_name", course);

    const csReq = {
        method: 'POST',
        headers: cs,
        body: csForm
    };

    let csData = [];

    const url = "https://pluralcode.academy/pluralcode_apis/api/admin/filter_summary_by_courses";

    fetch(url, csReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const tableCohort = document.querySelector(".table-cohort");
        if (result.length === 0) {
            tableCohort.innerHTML += `
              <h2 class="text-center">No Records found on this name</h2> 
            `
            myModal.style.display = "none";
            headOne.style.display = "none";
            headTwo.style.display = "block";

        }
        else {
            result.map((item) => {
                csData += `
                   <tr>
                      <td>${item.month}</td>
                      <td>${item.data.total_session}</td>
                      <td>${item.data.total_enrollment}</td>
                      <td>${item.data.total_number_of_sessions_taken}</td>
                      <td>${item.data.total_session}</td>
                   </tr>
                `
                tableCohort.innerHTML = csData;
                myModal.style.display = "none";
            })
        }
    })
    .catch(error => console.log('error', error));
    
}

// display cohort modal
function displayCohortModal(event) {
    event.preventDefault();
    const getModal = document.getElementById("co-modal");
    getModal.style.display = "block";
}

function closeCohort() {
    const getModal = document.getElementById("co-modal");
    getModal.style.display = "none";
}

function newCohort(event) {
    event.preventDefault();
    const getModal = document.getElementById("re-modal");
    getModal.style.display = "block"
}

function newCourse(event) {
    event.preventDefault();
    const getModal = document.getElementById("re-modal");
    getModal.style.display = "block"
}


function getCurrentDate() {
    const date = new Date();

    const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    };
    const gc = document.querySelector(".currentDta");
    gc.innerHTML = date.toLocaleString('en-IN', options)

}

let bar = $("span");
let p = $("p");

let width = bar.attr("style");
width = width.replace("width:", "");
width = width.substr(0, width.length - 1);

let interval;
let start = 0;
let end = parseInt(width);
let current = start;

let countUp = function () {
  current++;
  p.html(current + "%");

  if (current === end) {
    clearInterval(interval);
  }
};

interval = setInterval(countUp, 1000 / (end + 1));

// function to get current year
function getCohortYear() {
    let getValue = document.querySelector(".yearItem");
    let getValueMonth = document.querySelector(".monthItem");

    let mydate = new Date().getFullYear();
    getValue.setAttribute('value', mydate)

    let monthNames = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ];

    let mdata = [];

    monthNames.map((item) => {
        mdata += `
         <option value="${item}">${item}</option>
        `
    })

    getValueMonth.innerHTML = mdata;

}

// function to create cohort
function createCohort(event) {
    event.preventDefault();

    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    const getYear = document.querySelector(".yearItem").value;
    const getMonth = document.querySelector(".monthItem").value;

    if(getYear === "" || getMonth === "") {
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

        const cohortProfile = JSON.stringify({
            "year": getYear,
            "name": getMonth
        })

        const cohMethod = {
            method: 'POST',
            headers: myHead,
            body: cohortProfile
        };

        const url = "https://backend.pluralcode.institute/admin/create-cohort";

        fetch(url, cohMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.message === "cohort created") {
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
        .catch(error => {
            console.log('error', error)
            Swal.fire({
                icon: 'warning',
                text: `${result.message}`,
                confirmButtonColor: '#25067C'
            })
            getSpin.style.display = "none";
        });

    }

}

// function to get cohort courses
function cohortCourseList() {
    const params = new URLSearchParams(window.location.search);
    let getId = params.get('cohort_id');

    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";

    const ctable = document.querySelector(".tableindexcourse");

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

    const url = `https://backend.pluralcode.institute/admin/get-cohort-courses?cohort_id=${getId}`;

    fetch(url, fbal)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.coursearray.length === 0) {
            ctable.innerHTML = "No Records Found!";
            getSpin.style.display = "none";
        }
        else {
            result.coursearray.map((item) => {
                data += `
                  <tr>
                    <td>${item.name}</td>
                    <td>₦${item.onsite_price}</td>
                    <td>₦${item.virtual_price}</td>
                    <td>${item.school}</td>
                    <td>${item.course_type}</td>
                    <td>${item.advisor_name}</td>
                    <td>${item.advisor_contact_detail}</td>
                    <td><a class="update" href="view-materials.html?course_id=${item.id}&cohort_id=${getId}">View Materials</a></td>
                   <td><i class="fas fa-edit" onclick="cohortCourseModal(${item.id})"></i></td>
                  </tr>
                `
                ctable.innerHTML = data;
            })
        }
        getSpin.style.display = "none";
    })
    .catch(error => console.log('error', error));
}



function getcohortCourseList(event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    let getId = params.get('cohort_id');

    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";

    const ctable = document.querySelector(".tableindexcourse");
    const xtable = document.querySelector(".co1");
    const xtable2 = document.querySelector(".co2");

    const btnCoh = document.querySelector(".btn-coh");
    const btnCoh2 = document.querySelector(".btn-coh2");
    const getAcrite = document.querySelector(".acrite");


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

    const url = `https://backend.pluralcode.institute/admin/get-cohort-courses?cohort_id=${getId}`;

    fetch(url, fbal)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.coursearray.length === 0) {
            ctable.innerHTML = "No Records Found!";
            getSpin.style.display = "none";
        }
        else {
            result.coursearray.map((item) => {
                data += `
                  <tr>
                    <td>${item.name}</td>
                    <td>₦${item.onsite_price}</td>
                    <td>₦${item.virtual_price}</td>
                    <td>${item.school}</td>
                    <td>${item.course_type}</td>
                    <td>${item.advisor_name}</td>
                    <td>${item.advisor_contact_detail}</td>
                    <td><a class="update" href="view-materials.html?course_id=${item.id}&cohort_id=${getId}">View Materials</a></td>
                   <td><i class="fas fa-edit" onclick="cohortCourseModal(${item.id})"></i></td>
                  </tr>
                `
                ctable.innerHTML = data;
                getAcrite.style.display = "none";
                xtable.style.display = "block";
                xtable2.style.display = "none";


                btnCoh2.style.backgroundColor = "#fff",
                btnCoh2.style.color = "#2334A8";


                btnCoh.style.backgroundColor = "#2334A8",
                btnCoh.style.color = "#fff";
            })
        }
        getSpin.style.display = "none";
    })
    .catch(error => console.log('error', error));
}

// function to update course cohort
function cohortCourseModal(ccId) {
    let myModal = document.getElementById("re-modal");
    myModal.style.display = "block";

    localStorage.setItem("cod", ccId);
}

function cohortCoursesUpdate(event) {
    event.preventDefault();
    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    const params = new URLSearchParams(window.location.search);
    let getId = params.get('cohort_id');

    const getCod = localStorage.getItem("cod");
    const coLink = document.querySelector(".colink").value;

    if(coLink === "") {
        Swal.fire({
            icon: 'info',
            text: 'This field is required',
            confirmButtonColor: '#25067C'
        })
        getSpin.style.display = "none";
    }
    else {
        const updateProfile = JSON.stringify({
            "course_id": getCod,
            "cohort_id": getId,
            "community_link": coLink
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
            body: updateProfile
        }

        const url = "https://backend.pluralcode.institute/admin/update-cohort-courses"
        fetch(url, fbal)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.message === "Link updated") {
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

function goBackTo(event) {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    let getId = params.get('cohort_id');

    location.href = `view-cohort.html?cohort_id=${getId}`;
}

// function to get materials for courses
function getCourseMaterials() {
    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";

    const params = new URLSearchParams(window.location.search);
    let getId = params.get('cohort_id');

    const params2 = new URLSearchParams(window.location.search);
    let getcId = params2.get('course_id');

    const jumSec = document.querySelector(".hoodBang");

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
    const url = `https://backend.pluralcode.institute/admin/cohort-course-materials?cohort_id=${getId}&course_id=${getcId}`;

    fetch(url, fbal)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.length === 0) {
            let centerMessage = document.createElement("h1");
            centerMessage.innerText = "No Records Found!";
            centerMessage.style.margin = "20% auto";
            jumSec.appendChild(centerMessage);
        }
        
        else {
            result.map((item) => {
                if (item.unlockedstatus === true) {
                    data += `
                    <div class="jum-sec">
                        <div class="course-mat">
                            <div class="mr-5">
                            <i class="fa-regular fa-folder fa-xl"></i>
                            </div>
            
                            <div class="jum-text">
                                <p class="jet-p">${item.name}</p>
                                <p>${item.position}</p>
                            </div>
                        </div>
                        <button class="btn-lock" onclick="unlockModule(${item.id})"><i class="fa-solid fa-unlock fa-xl mr-2" style="color: #2334A8"></i>Unlocked Module</button>
                    </div>
                    <hr class="hr-c">
                `
                }
                if (item.unlockedstatus === false) {
                    data += `
                    <div class="jum-sec">
                        <div class="course-mat">
                            <div class="mr-5">
                            <i class="fa-regular fa-folder fa-xl"></i>
                            </div>
            
                            <div class="jum-text">
                                <p class="jet-p">${item.name}</p>
                                <p>${item.position}</p>
                            </div>
                        </div>
                        <button class="btn-lock" onclick="unlockModule(${item.id})"><i class="fa-solid fa-lock fa-xl mr-3" style="color: #2334A8"></i>Locked Module</button>
                    </div>
                    <hr class="hr-c">
                `
                }
                

                jumSec.innerHTML = data;
            })
        }

        getSpin.style.display = "none";
    })
    .catch(error => console.log('error', error));
}

// function to unlock module
function unlockModule(modId) {
    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";

    const params = new URLSearchParams(window.location.search);
    let getId = params.get('cohort_id');

    const params2 = new URLSearchParams(window.location.search);
    let getcId = params2.get('course_id');

    const moduleProfile = JSON.stringify({
        "course_id": getcId,
        "cohort_id": getId,
        "module_id": modId
    })

    const getMyStorage = localStorage.getItem("adminLogin");
    const myStorage = JSON.parse(getMyStorage);
    const storageToken = myStorage.token;

    const myHead = new Headers();
    myHead.append('Content-Type', 'application/json');
    myHead.append('Authorization', `Bearer ${storageToken}`);

    const fbal = {
        method: 'POST',
        headers: myHead,
        body: moduleProfile
    }

    const url = "https://backend.pluralcode.institute/admin/unlock-course-module";

    fetch(url, fbal)
    .then(response => response.json())
    .then(result => {
        console.log(result)

        if (result.message === "Module locked") {
            Swal.fire({
                icon: 'success',
                text: `${result.message}`,
                confirmButtonColor: '#25067C'
            })
            setTimeout(() => {
                location.reload()
            }, 3000)
        }
        else if(result.message === "module unlocked") {
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
                icon: 'success',
                text: `${result.message}`,
                confirmButtonColor: '#25067C'
            })
            getSpin.style.display = "none";
        }
    })
    .catch(error => console.log('error', error));
}

// function to get students under a cohort
function getStudentsUnderCohort(event) {
    event.preventDefault();

    const getPre = document.querySelector(".get-previous")

    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";

    const params = new URLSearchParams(window.location.search);
    let getId = params.get('cohort_id');
    const paginationContainer = document.getElementById('pagination-container');


    const coTable = document.querySelector(".tableindexcohort");

    const xtable = document.querySelector(".co1");
    const xtable2 = document.querySelector(".co2");

    const btnCoh = document.querySelector(".btn-coh");
    const btnCoh2 = document.querySelector(".btn-coh2");

    const getAcrite = document.querySelector(".acrite");
    let myDiv = document.querySelector(".mydiv");


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

    const url = `https://backend.pluralcode.institute/admin/get-cohort-students?cohort_id=${getId}&page=0`;

    fetch(url, fbal)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.data.map((item) => {
            if (item.currency === "NGN") {
                data +=`
                <tr>
                   <td>${item.name}</td>
                   <td>${item.email}</td>
                   <td>${item.country}</td>
                   <td>${item.state}</td>
                   <td>${item.program_type}</td>
                   <td>${item.level_of_education}</td>
                   <td>${item.course_of_interest}</td>
                   <td>${item.age}</td>
                   <td>${item.balance}</td>
                   <td>${item.year}</td>
                   <td>${item.month}</td>
                   <td>${item.date}</td>
                   <td>${item.phone_number}</td>
                   <td>${item.referral_code}</td>
                   <td>${item.currency}</td>
                   <td>${item.payment_plan}</td>
                   <td>₦${item.amount_paid}</td>
                   <td>${item.registeration_number}</td>
                   <td>${item.enrollment_source}</td>
                   <td><button class=${item.payment_status}>${item.payment_status}</button></td>
                </tr>
            `
            }
            if (item.currency === "USD") {
                data +=`
                <tr>
                   <td>${item.name}</td>
                   <td>${item.email}</td>
                   <td>${item.country}</td>
                   <td>${item.state}</td>
                   <td>${item.program_type}</td>
                   <td>${item.level_of_education}</td>
                   <td>${item.course_of_interest}</td>
                   <td>${item.age}</td>
                   <td>${item.balance}</td>
                   <td>${item.year}</td>
                   <td>${item.month}</td>
                   <td>${item.date}</td>
                   <td>${item.phone_number}</td>
                   <td>${item.referral_code}</td>
                   <td>${item.currency}</td>
                   <td>${item.payment_plan}</td>
                   <td>$${item.amount_paid}</td>
                   <td>${item.registeration_number}</td>
                   <td>${item.enrollment_source}</td>
                   <td><button class=${item.payment_status}>${item.payment_status}</button></td>
                </tr>
            `
            }
            
            coTable.innerHTML = data;
            getAcrite.style.display = "block";
            xtable.style.display = "none";
            xtable2.style.display = "block";
            getSpin.style.display = "none";

            btnCoh.style.backgroundColor = "#fff",
            btnCoh.style.color = "#2334A8";
            btnCoh.border = "2px solid #2334A8";


            btnCoh2.style.backgroundColor = "#2334A8",
            btnCoh2.style.color = "#fff";
        })

        let totalPages = result.total_pages;
        let currentPage = result.page;
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
            const url = `https://backend.pluralcode.institute/admin/get-cohort-students?cohort_id=${getId}&page=${currentPage}`;


           fetch(url, fbal)
           .then(response => response.json())
           .then(result => {
               console.log(result)
               result.data.map((item) => {
                if (item.currency === "NGN") {
                    data +=`
                    <tr>
                       <td>${item.name}</td>
                       <td>${item.email}</td>
                       <td>${item.country}</td>
                       <td>${item.state}</td>
                       <td>${item.program_type}</td>
                       <td>${item.level_of_education}</td>
                       <td>${item.course_of_interest}</td>
                       <td>${item.age}</td>
                       <td>${item.balance}</td>
                       <td>${item.year}</td>
                       <td>${item.month}</td>
                       <td>${item.date}</td>
                       <td>${item.phone_number}</td>
                       <td>${item.referral_code}</td>
                       <td>${item.currency}</td>
                       <td>${item.payment_plan}</td>
                       <td>₦${item.amount_paid}</td>
                       <td>${item.registeration_number}</td>
                       <td>${item.enrollment_source}</td>
                       <td><button class=${item.payment_status}>${item.payment_status}</button></td>
                    </tr>
                `
                }
                if (item.currency === "USD") {
                    data +=`
                    <tr>
                       <td>${item.name}</td>
                       <td>${item.email}</td>
                       <td>${item.country}</td>
                       <td>${item.state}</td>
                       <td>${item.program_type}</td>
                       <td>${item.level_of_education}</td>
                       <td>${item.course_of_interest}</td>
                       <td>${item.age}</td>
                       <td>${item.balance}</td>
                       <td>${item.year}</td>
                       <td>${item.month}</td>
                       <td>${item.date}</td>
                       <td>${item.phone_number}</td>
                       <td>${item.referral_code}</td>
                       <td>${item.currency}</td>
                       <td>${item.payment_plan}</td>
                       <td>$${item.amount_paid}</td>
                       <td>${item.registeration_number}</td>
                       <td>${item.enrollment_source}</td>
                       <td><button class=${item.payment_status}>${item.payment_status}</button></td>
                    </tr>
                `
                }
                coTable.innerHTML = data;
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




function nextCo(event) {
    event.preventDefault();
    let rocNext = cohNext;

    const coTable = document.querySelector(".tableindexcohort");
    const getNext = document.querySelector(".get-next");
    const getPrev = document.querySelector(".get-previous");



    const params = new URLSearchParams(window.location.search);
    let getId = params.get('cohort_id');

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

    const url = `https://backend.pluralcode.institute/admin/get-cohort-students?cohort_id=${getId}&page=${rocNext}`;
    fetch(url, fbal)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.next_page === null) {
            getNext.disabled = true;
            getPrev.disabled = false;
        }
        else {
            cohNext = result.next_page;
            cohPrev = result.prev_page;
            console.log(cohNext)
        }
        result.data.map((item) => {
            data +=`
                <tr>
                   <td>${item.name}</td>
                   <td>${item.email}</td>
                   <td>${item.country}</td>
                   <td>${item.state}</td>
                   <td>${item.program_type}</td>
                   <td>${item.level_of_education}</td>
                   <td>${item.course_of_interest}</td>
                   <td>${item.age}</td>
                   <td>${item.balance}</td>
                   <td>${item.year}</td>
                   <td>${item.month}</td>
                   <td>${item.date}</td>
                   <td>${item.phone_number}</td>
                   <td>${item.referral_code}</td>
                   <td>${item.currency}</td>
                   <td>${item.payment_plan}</td>
                   <td>${item.amount_paid}</td>
                   <td>${item.registeration_number}</td>
                   <td>${item.enrollment_source}</td>
                   <td><button class=${item.payment_status}>${item.payment_status}</button></td>
                </td>
            `
            coTable.innerHTML = data;
            getSpin.style.display = "none";
        })
    })
    .catch(error => console.log('error', error));

}

function coPrev(event) {
    event.preventDefault();
    let rocPrev = cohPrev;

    const coTable = document.querySelector(".tableindexcohort");
    const getNext = document.querySelector(".get-next");
    const getPrev = document.querySelector(".get-previous");



    const params = new URLSearchParams(window.location.search);
    let getId = params.get('cohort_id');

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

    const url = `https://backend.pluralcode.institute/admin/get-cohort-students?cohort_id=${getId}&page=${rocPrev}`;
    fetch(url, fbal)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.pre_page === null) {
            getPrev.disabled = true;
            getNext.disabled = false;
        }
        else {
            cohNext = result.next_page;
            cohPrev = result.prev_page;
        }
        result.data.map((item) => {
            data +=`
                <tr>
                   <td>${item.name}</td>
                   <td>${item.email}</td>
                   <td>${item.country}</td>
                   <td>${item.state}</td>
                   <td>${item.program_type}</td>
                   <td>${item.level_of_education}</td>
                   <td>${item.course_of_interest}</td>
                   <td>${item.age}</td>
                   <td>${item.balance}</td>
                   <td>${item.year}</td>
                   <td>${item.month}</td>
                   <td>${item.date}</td>
                   <td>${item.phone_number}</td>
                   <td>${item.referral_code}</td>
                   <td>${item.currency}</td>
                   <td>${item.payment_plan}</td>
                   <td>${item.amount_paid}</td>
                   <td>${item.registeration_number}</td>
                   <td>${item.enrollment_source}</td>
                   <td><button class=${item.payment_status}>${item.payment_status}</button></td>
                </td>
            `
            coTable.innerHTML = data;
            getSpin.style.display = "none";
        })
    })
    .catch(error => console.log('error', error));
}

// function to get the list of advisors
function advisorList() {
    const listAdvisor = document.querySelector(".ladv");
    const listAdvisor2 = document.querySelector(".upladv");
    const listAdvisor3 = document.querySelector(".loopupladv");
    


    const getMyStorage = localStorage.getItem("adminLogin");
    const myStorage = JSON.parse(getMyStorage);
    const storageToken = myStorage.token;

    const myHead = new Headers();
    myHead.append('Content-Type', 'application/json');
    myHead.append('Authorization', `Bearer ${storageToken}`);

    const adMethod = {
        method: 'GET',
        headers: myHead,
    };

    let data = [];

    const url = "https://backend.pluralcode.institute/admin/get-advisors";

    fetch(url, adMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.data.map((item) => {
            data += `
               <option value="${item.id}">${item.name}</option>
            `
            listAdvisor.innerHTML = data;
            listAdvisor2.innerHTML = data;
            listAdvisor3.innerHTML = data;

        })
    })
    .catch(error => console.log('error', error));
}

// function to display percentage input
function showPercentage(event) {
    const ct = event.currentTarget.value;

    const perc = document.querySelector(".perc");

    if (ct === "diploma") {
        perc.style.display = "block";
    }
    else {
        perc.style.display = "none";
    }
}

function showPercentage2(event) {
    const ct = event.currentTarget.value;

    const perc = document.querySelector(".perc2");

    if (ct === "diploma") {
        perc.style.display = "block";
    }
    else {
        perc.style.display = "none";
    }
}

// function to hide virtual price input
function hideVirtualPrice() {
    const getVive = document.querySelector(".vive");
    const hideVive = document.querySelector(".hidevirtual");

    if (getVive.checked === false) {
        hideVive.style.display = "none";
    }
    else if (getVive.checked) {
        hideVive.style.display = "block";
    }
}

function hideVirtualPrice2() {
    const getVive = document.querySelector(".vive2");
    const hideVive = document.querySelector(".hidevirtual2");

    if (getVive.checked === false) {
        hideVive.style.display = "none";
    }
    else if (getVive.checked) {
        hideVive.style.display = "block";
    }
}

// function to hide onsite price input
function hideOnsite() {
    const getSite = document.querySelector(".onsite");
    const hideVive = document.querySelector(".hidesite");

    if (getSite.checked === false) {
        hideVive.style.display = "none";
    }
    else if (getSite.checked) {
        hideVive.style.display = "block";
    }
}

function hideOnsite2() {
    const getSite = document.querySelector(".onsite2");
    const hideVive = document.querySelector(".hidesite2");

    if (getSite.checked === false) {
        hideVive.style.display = "none";
    }
    else if (getSite.checked) {
        hideVive.style.display = "block";
    }
}

// function to get toggle value
function toBoolean() {
    const perc = document.querySelector(".tog").checked;
    const getCapstone = document.querySelector(".capstone");
    if (!perc) {
        getCapstone.style.display = "none";
        getCapstone.classList.remove("adlay");

    }
    else {
        getCapstone.style.display = "block";
        getCapstone.classList.add("adlay");
    }
}

// function toBoolean2() {
//     let aloop = document.querySelector(".tog2").checked;
//     if (aloop) {
//         aloop === true;
//         console.log(aloop)
//     }
//     console.log(aloop)
//     localStorage.setItem("lpt", aloop);
// }


function displayDiscount() {
    const perc = document.querySelector(".tog2").checked;
    const getCapstone = document.querySelector(".socra");
    if (!perc) {
        getCapstone.style.display = "none";
        getCapstone.classList.remove("adlay");

    }
    else {
        getCapstone.style.display = "block";
        getCapstone.classList.add("adlay");
    }
}

// function to get teachable course
function getTeachableCourse() {
    const mycour = document.querySelector(".tcourse");
    const mycour2 = document.querySelector(".uptcourse");
    const mycour3 = document.querySelector(".loopuptcourse");



    const getMyStorage = localStorage.getItem("adminLogin");
    const myStorage = JSON.parse(getMyStorage);
    const storageToken = myStorage.token;

    const myHead = new Headers();
    myHead.append('Content-Type', 'application/json');
    myHead.append('Authorization', `Bearer ${storageToken}`);

    const tmethod = {
        method: 'GET',
        headers: myHead
    }

    let tdata = [];

    const url = "https://backend.pluralcode.institute/admin/teachable-course";

    fetch(url, tmethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        result.teachable.courses.map((item) => {
            tdata += `
             <option value="${item.id}">${item.name}</option>
            `
            mycour.innerHTML = tdata;
            mycour2.innerHTML = tdata;
            mycour3.innerHTML = tdata;
        })
    })
    .catch(error => console.log('error', error))
}

// function to get all courses
function getAllCourse() {
    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";
    const tal = document.querySelector(".gb1");
    const til = document.querySelector(".gb2");
    const tlc = document.querySelector(".gb3");
    const ilc = document.querySelector(".gb4");
    const iilc = document.querySelector(".gb5");
    const tic = document.querySelector(".gb6");


    const getMyTableRecords = document.querySelector(".mytableindex");
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

    let statusData = [];

    const url = "https://backend.pluralcode.institute/admin/get-courses";

    fetch(url, courseMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)


        if (result.length === 0) {
            getMyTableRecords.innerHTML = "No records found"
        }
        else {
            result.selfpaced.map((item) => {
                data += `
                <tr>
                   <td>${item.name}</td>
                   <td>${item.course_email}</td>
                   <td>${item.percentages}</td>
                   <td>${item.school}</td>
                   <td>${item.link}</td>
                   <td>${item.community_link}</td>
                   <td>${item.advisor_name}</td>
                   <td>${item.advisor_contact_detail}</td>
                   <td>${item.course_type}</td>
                   <td>₦${item.onsite_price}</td>
                   <td>₦${item.virtual_price}</td>
                   <td>${item.discount_deadline}</td>
                   <td><button class="${item.status}" onclick="updateCourseStatus(${item.id})">
                   ${item.status}
                   </button>
                   </td>
                   <td><i class="fas fa-edit" onclick="courseModal(${item.id})"></i></td>
                </tr>
            `
            getMyTableRecords.innerHTML = data;
            getSpin.style.display = "none";
            
            statusData.push({"status":item.status, id:item.id})

            localStorage.setItem("self", JSON.stringify(statusData))

            })
        }

        tal.innerHTML = `${result.total_active_loop}`;
        til.innerHTML = `${result.total_inactive_loop}`;
        tlc.innerHTML = `${result.total_loop_course}`;
        ilc.innerHTML = `${result.total_active_instructor_lead_course}`;
        iilc.innerHTML = `${result.total_inactive_instructor_lead_course}`;
        tic.innerHTML = `${result.total_instructor_lead}`
 

    })
    .catch(error => console.log('error', error));
}

// function to filter active instructor lead
function filterByActiveLead() {
    const getMyTableRecords = document.querySelector(".mytableindex");
    const fba = document.querySelector(".fba");
    const fba2 = document.querySelector(".fba2");


    fba.classList.add("cardshow")

    const selfPaced = "instructor-lead";
    const status = 'Active';

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

    const url = `https://backend.pluralcode.institute/admin/get-courses?course_type=${selfPaced}&status=${status}`;

    fetch(url, fbal)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.length === 0) {
            getMyTableRecords.innerHTML = "No records found"
        }else {
            result.instructorleadcourse.map((item) => {
                data += `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.course_email}</td>
                        <td>${item.percentages}</td>
                        <td>${item.school}</td>
                        <td>${item.link}</td>
                        <td>${item.community_link}</td>
                        <td>${item.advisor_name}</td>
                        <td>${item.advisor_contact_detail}</td>
                        <td>${item.course_type}</td>
                        <td>₦$${item.onsite_price}</td>
                        <td>₦$${item.virtual_price}</td>
                        <td>${item.discount_deadline}</td>
                        <td><button class="${item.status}" onclick="updateCourseStatus(${item.id})">${item.status}</button></td>
                        <td><i class="fas fa-edit" onclick="courseModal(${item.id})"></i></td>
                    </tr>
                `
                getMyTableRecords.innerHTML = data;
                getSpin.style.display = "none";
                fba2.classList.remove("cardshow")
            })

        }
    })
    .catch(error => console.log('error', error));
}

// function to get inactive instructor lead courses
function filterByInactiveLead() {
    const getMyTableRecords = document.querySelector(".mytableindex");
    const fba = document.querySelector(".fba2");
    const fba2 = document.querySelector(".fba");


    fba.classList.add("cardshow")

    const selfPaced = "instructor-lead";
    const status = 'Inactive';

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

    const url = `https://backend.pluralcode.institute/admin/get-courses?course_type=${selfPaced}&status=${status}`;

    fetch(url, fbal)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.length === 0) {
            getMyTableRecords.innerHTML = "No records found"
        }else {
            result.instructorleadcourse.map((item) => {
                data += `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.course_email}</td>
                        <td>${item.percentages}</td>
                        <td>${item.school}</td>
                        <td>${item.link}</td>
                        <td>${item.community_link}</td>
                        <td>${item.advisor_name}</td>
                        <td>${item.advisor_contact_detail}</td>
                        <td>${item.course_type}</td>
                        <td>₦$${item.onsite_price}</td>
                        <td>₦$${item.virtual_price}</td>
                        <td>${item.discount_deadline}</td>
                        <td><button class="${item.status}" onclick="updateCourseStatus(${item.id})">${item.status}</button></td>
                        <td><i class="fas fa-edit" onclick="courseModal(${item.id})"></i></td>
                    </tr>
                `
                getMyTableRecords.innerHTML = data;
                getSpin.style.display = "none";
                fba2.classList.remove("cardshow")
            })

        }
    })
    .catch(error => console.log('error', error));
}

// function to call update form modal
function courseModal(id) {
    const upModal = document.getElementById("in-modal");
    const getModal = document.querySelector(".pagemodal");
    getModal.style.display = "block";

    localStorage.setItem("cid", id);

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

    const url = `https://backend.pluralcode.institute/admin/get-courses-details?course_type=instructor-lead&course_id=${id}`;

    fetch(url, courseMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const perc = document.querySelector(".perc2")
        const upName = document.querySelector(".upName");
        const upCschool = document.querySelector(".upcschool");
        const upct = document.querySelector(".upct");
        const uptCourse = document.querySelector(".uptcourse");
        const upPercentage = document.querySelector(".upcpercentage");
        const upAdv = document.querySelector(".upladv");
        const upculink = document.querySelector(".upculink");
        const uprl = document.querySelector(".uprlink");
        const upOnsitePrice = document.querySelector(".uposprice");
        const upVirtualPrice = document.querySelector(".upvirprice");
        // const upOffset = document.querySelector(".upoffset");
        const upDiscount = document.querySelector(".updiscount_deadline");

        upName.setAttribute("value", result.instructor_lead.name);
        upculink.setAttribute("value", result.instructor_lead.community_link);
        uprl.setAttribute("value", result.instructor_lead.link);
        upOnsitePrice.setAttribute("value", result.instructor_lead.onsite_price);
        upVirtualPrice.setAttribute("value", result.instructor_lead.virtual_price);
        upDiscount.setAttribute("value", result.instructor_lead.discount_deadline);



        for (let i = 0; i < upCschool.options.length; i++) {
            if(upCschool.options[i].value === `${result.instructor_lead.school}`) {
                upCschool.options[i].setAttribute('selected', 'selected')
            }
        }
        for (let i = 0; i < upct.options.length; i++) {
            if(upct.options[i].value === `${result.instructor_lead.course_type}` && upct.options[i].value === "diploma") {
                upct.options[i].setAttribute('selected', 'selected');
                perc.style.display = "block";
            }
            if (upct.options[i].value === `${result.instructor_lead.course_type}` && upct.options[i].value === "entry"){
                upct.options[i].setAttribute('selected', 'selected');
                perc.style.display = "none";
            }
        }

        let percentageValue = `${result.instructor_lead.percentages}` * 100;
        localStorage.setItem("tc", `${result.instructor_lead.teachable_course_id}`)

        for (let i = 0; i < upPercentage.length; i++) {
            if (upPercentage.options[i].value === percentageValue.toString()) {
                upPercentage.options[i].setAttribute('selected', 'selected')
            }
        }

        for (let i = 0; i < uptCourse.length; i++) {
            if (uptCourse.options[i].value === `${result.instructor_lead.teachable_course_id}`) {
               uptCourse.options[i].setAttribute('selected', 'selected')
            }
        }

        for (let i = 0; i < upAdv.length; i++) {
            if (upAdv.options[i].innerHTML === `${result.instructor_lead.advisor_name}`) {
              upAdv.options[i].setAttribute('selected', 'selected')
            }
        }
        upModal.style.display = "block";
        getModal.style.display = "none";
    })
    .catch(error => console.log('error', error));
}

// function to update course details
function UpdateCourseDetails(event) {
    event.preventDefault();

    const getSpin = document.querySelector(".spin2");
    getSpin.style.display = "inline-block";

    const upName = document.querySelector(".upName").value;
    const upCschool = document.querySelector(".upcschool").value;
    const upct = document.querySelector(".upct").value;
    const uptCourse = document.querySelector(".uptcourse").value;
    const upPercentage = document.querySelector(".upcpercentage").value;
    const upAdv = document.querySelector(".upladv").value;
    const upculink = document.querySelector(".upculink").value;
    const uprl = document.querySelector(".uprlink").value;
    const upOnsitePrice = document.querySelector(".uposprice").value;
    const upVirtualPrice = document.querySelector(".upvirprice").value;
    const upOffset = document.querySelector(".upoffset").value;
    const upDiscount = document.querySelector(".updiscount_deadline").value;

    if (upculink === "" || uprl === "" || upOnsitePrice === "" || upVirtualPrice === "") {
        Swal.fire({
            icon: 'info',
            text: "These fields are required",
            confirmButtonColor: '#25067C'
        })
        getSpin.style.display = "none";
    }
    else {
        const getCid = localStorage.getItem("cid");
        let cent = upPercentage / 100;
        let myDate = formatDate1(upDiscount)

        const ftime = formatDate(myDate);

        const getTc = localStorage.getItem("tc");
        const tc = JSON.parse(getTc);

        const updateProfile = JSON.stringify({
            "name": upName,
            "advisor_id": upAdv,
            "teachable_course_id": uptCourse,
            "community_link": upculink,
            "course_type": upct,
            "percentages": cent,
            "school": upCschool,
            "virtual_price": upVirtualPrice,
            "onsite_price": upOnsitePrice,
            "link": uprl,
            "offset": upOffset,
            "discount_deadline": ftime,
            "old_teachable_course_id": tc,
            "course_id": getCid
        })
        const getMyStorage = localStorage.getItem("adminLogin");
        const myStorage = JSON.parse(getMyStorage);
        const storageToken = myStorage.token;

        const myHead = new Headers();
        myHead.append('Content-Type', 'application/json');
        myHead.append('Authorization', `Bearer ${storageToken}`);

        const courseMethod = {
            method: 'POST',
            headers: myHead,
            body: updateProfile
        }

        const url = "https://backend.pluralcode.institute/admin/update-courses";

        fetch(url, courseMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)

            if (result.message === "course updated") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#25067C'
                })

                setTimeout(() => {
                    location.reload();
                }, 4000)
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
        .catch(error => console.log('error', error))
    }

}

// function to get loop courses
function getLoopCourses(event) {
    event.preventDefault();

    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";

    const getMyTableRecords = document.querySelector(".mytableindex2");
    

    const sc = document.querySelector(".stable");
    const lc = document.querySelector(".ltable");

    const loopBtn = document.querySelector(".btn-loop");
    const spBtn = document.querySelector(".btn-sp");

    const fba = document.querySelector(".fba2");
    const fba2 = document.querySelector(".fba");
    const stn = document.querySelector(".stn");
    const stn2 = document.querySelector(".stn2");


    fba.style.pointerEvents = "none";
    fba2.style.pointerEvents = "none";

    stn.style.pointerEvents = "all"
    stn2.style.pointerEvents = "all"

    stn.classList.remove("cardshow");
    stn2.classList.remove("cardshow");

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

    let statusLoopData = [];

    const url = "https://backend.pluralcode.institute/admin/get-courses";

    fetch(url, courseMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.loop.length === 0) {
            getMyTableRecords.innerHTML = "No records found";
        }
        else {
            result.loop.map((item) => {
                data += `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.advisor_contact_detail}</td>
                    <td>${item.capstone_project_instruction_link}</td>
                    <td><button class="${item.status}" onclick="updateLoopStatus(${item.id})">${item.status}</button></td>
                    <td><i class="fas fa-edit" onclick="courseLoopModal(${item.id})"></i></td>
                  </tr>
                `
                getMyTableRecords.innerHTML = data;

                sc.style.display = "none";
                lc.style.display = "block";

                loopBtn.style.backgroundColor = "#2334A8";
                loopBtn.style.color = "#fff";

                spBtn.style.backgroundColor = "#fff";
                spBtn.style.color = "#2334A8";
                spBtn.style.border = "1px solid #2334A8";

                getSpin.style.display = "none";

                statusLoopData.push({"status":item.status, id:item.id})
                localStorage.setItem("loop", JSON.stringify(statusLoopData))
            })
            


        }
    })
    .catch(error => console.log('error', error));
}

// function to get total active loop courses
function filterByTotalActiveLoop() {
    const getMyTableRecords = document.querySelector(".mytableindex2");
    const stn = document.querySelector(".stn");
    const stn2 = document.querySelector(".stn2");


    stn.classList.add("cardshow")


    const sc = document.querySelector(".stable");
    const lc = document.querySelector(".ltable");
    
    const lop = "loop";
    const status = 'Active';

    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";

    const getMyStorage = localStorage.getItem("adminLogin");
    const myStorage = JSON.parse(getMyStorage);
    const storageToken = myStorage.token;

    const myHead = new Headers();
    myHead.append('Content-Type', 'application/json');
    myHead.append('Authorization', `Bearer ${storageToken}`);

    const lopmethod = {
        method: 'GET',
        headers: myHead
    }

    let data = [];

    const url = `https://backend.pluralcode.institute/admin/get-courses?course_type=${lop}&status=${status}`;

    fetch(url, lopmethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.loopCourses.length === 0) {
            getMyTableRecords.innerHTML = "No records found";
            stn2.classList.remove("cardshow")
        }
        else {
            result.loopCourses.map((item) => {
                data += `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.advisor_contact_detail}</td>
                    <td>${item.capstone_project_instruction_link}</td>
                    <td><button class="${item.status}" onclick="updateLoopStatus(${item.id})">${item.status}</button></td>
                    <td><i class="fas fa-edit" onclick="courseLoopModal(${item.id})"></i></td>
                  </tr>
                `
                getMyTableRecords.innerHTML = data;

                sc.style.display = "none";
                lc.style.display = "block";

                getSpin.style.display = "none";
            })
            stn2.classList.remove("cardshow")
        }
    })
    .catch(error => console.log('error', error));
}

// function to get tottal inactive loop courses
function filterByTotalInactiveLoop() {
    const getMyTableRecords = document.querySelector(".mytableindex2");
    const stn = document.querySelector(".stn");
    const stn2 = document.querySelector(".stn2");


    stn2.classList.add("cardshow")


    const sc = document.querySelector(".stable");
    const lc = document.querySelector(".ltable");
    
    const lop = "loop";
    const status = 'Inactive';

    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";

    const getMyStorage = localStorage.getItem("adminLogin");
    const myStorage = JSON.parse(getMyStorage);
    const storageToken = myStorage.token;

    const myHead = new Headers();
    myHead.append('Content-Type', 'application/json');
    myHead.append('Authorization', `Bearer ${storageToken}`);

    const lopmethod = {
        method: 'GET',
        headers: myHead
    }

    let data = [];

    const url = `https://backend.pluralcode.institute/admin/get-courses?course_type=${lop}&status=${status}`;
    fetch(url, lopmethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.loopCourses.length === 0) {
            getMyTableRecords.innerHTML = "No records found";
            getSpin.style.display = "none";
            stn.classList.remove("cardshow")
        }
        else {
            result.loopCourses.map((item) => {
                data += `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.advisor_contact_detail}</td>
                    <td>${item.capstone_project_instruction_link}</td>
                    <td><button class="${item.status}" onclick="updateLoopStatus(${item.id})">${item.status}</button></td>
                    <td><i class="fas fa-edit" onclick="courseLoopModal(${item.id})"></i></td>
                  </tr>
                `
                getMyTableRecords.innerHTML = data;

                sc.style.display = "none";
                lc.style.display = "block";

                getSpin.style.display = "none";
            })

            stn.classList.remove("cardshow")
        }
    })
    .catch(error => console.log('error', error));

}

// function to update loop courses
function updateLoopStatus(lId) {
    let myStatus;

    const getItem = localStorage.getItem("loop");
    const itemValue = JSON.parse(getItem);

    itemValue.map((item) => {
        if (lId === item.id) {
            myStatus =  item.status;

            if (myStatus === "Active") {
                myStatus = "Inactive"
            }
            else {
                myStatus = "Active"
            }
            console.log(myStatus);

        }
    })

    let coursetype = "loop";
    const getMyStorage = localStorage.getItem("adminLogin");
    const myStorage = JSON.parse(getMyStorage);
    const storageToken = myStorage.token;

    const myHead = new Headers();
    myHead.append('Content-Type', 'application/json');
    myHead.append('Authorization', `Bearer ${storageToken}`);

    const cMethod = {
        method: 'GET',
        headers: myHead
    }

    const url = `https://backend.pluralcode.institute/admin/update-course-status?course_type=${coursetype}&status=${myStatus}&course_id=${lId}`;

    fetch(url, cMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.message === "updated successfully") {
            Swal.fire({
                icon: 'success',
                text: `${result.message}`,
                confirmButtonColor: '#25067C'
            })
            setTimeout(() => {
                location.reload()
            }, 3000)
        }else {
            Swal.fire({
                icon: 'info',
                text: `${result.message}`,
                confirmButtonColor: '#25067C'
            })
        }
    })
}

// function to update loop course
function courseLoopModal(loopId) {
    const upModal = document.getElementById("loop-modal");
    const getModal = document.querySelector(".pagemodal");
    getModal.style.display = "block";

    localStorage.setItem("lcoid", loopId)

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

    const url = `https://backend.pluralcode.institute/admin/get-courses-details?course_type=loop&course_id=${loopId}`;

    fetch(url, courseMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)

        const lName = document.querySelector(".loopupName");
        const ltcouse = document.querySelector(".loopuptcourse");
        const ladv = document.querySelector(".loopupladv");
        const lcap = document.querySelector(".loopcaplink");


        localStorage.setItem("lc", `${result.loopdata.teachable_course_id}`)

        lName.setAttribute("value", `${result.loopdata.name}`);

        lcap.setAttribute("value", `${result.loopdata.capstone_project_instruction_link}`);

        for (let i = 0; i < ladv.length; i++) {
            if (ladv.options[i].innerHTML === `${result.loopdata.advisor_name}`) {
              ladv.options[i].setAttribute('selected', 'selected')
            }
        }

        for (let i = 0; i < ltcouse.length; i++) {
            if (ltcouse.options[i].value === `${result.loopdata.teachable_course_id}`) {
               ltcouse.options[i].setAttribute('selected', 'selected')
            }
        }

        upModal.style.display = "block";
        getModal.style.display = "none";

    })
    .catch(error => console.log('error', error));
}

// function to update loop courses
function updateLoopDetails(event) {
    event.preventDefault();

    const getSpin = document.querySelector(".spin3");
    getSpin.style.display = "inline-block";

    const lname = document.querySelector(".loopupName").value;
    const ltcourse = document.querySelector(".loopuptcourse").value;
    const ladvisor = document.querySelector(".loopupladv").value;
    const lcap = document.querySelector(".loopcaplink").value;

    const getLocd = localStorage.getItem("lcoid");
    const locd = JSON.parse(getLocd);
    
    

    if (lcap === "" || lname === "") {
        Swal.fire({
            icon: 'info',
            text: 'These fields are required!',
            confirmButtonColor: '#25067C'
        })
        getSpin.style.display = "none";
    }
    
    else {
        
        const loopT = localStorage.getItem("lc");
        const lot = JSON.parse(loopT);

        const loopUp = JSON.stringify({
            "name": lname,
            "teachable_course_id": ltcourse,
            "advisor_id": ladvisor,
            "capstone_project_instruction_link": lcap,
            "old_teachable_course_id": lot,
            "edit_to_loop": true,
            "course_id": locd
        })

        const getMyStorage = localStorage.getItem("adminLogin");
        const myStorage = JSON.parse(getMyStorage);
        const storageToken = myStorage.token;

        const myHead = new Headers();
        myHead.append('Content-Type', 'application/json');
        myHead.append('Authorization', `Bearer ${storageToken}`);

        const courseMethod = {
            method: 'POST',
            headers: myHead,
            body: loopUp
        }

        const url = "https://backend.pluralcode.institute/admin/update-courses";

        fetch(url, courseMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)

            if (result.message === "course updated") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#25067C'
                })

                setTimeout(() => {
                    location.reload();
                }, 4000)
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
        .catch(error => console.log('error', error))
    }

}

function formatDate1(inputDate) {
    const dateParts = inputDate.split('-');
    if (dateParts.length !== 3) {
      throw new Error('Invalid date format');
    }
  
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
  
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

  

function formatDate(inputDate) {
    const dateParts = inputDate.split('/');
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);
  
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];

  
    // Add "st", "nd", "rd", or "th" to the day based on its value
    let daySuffix;
    if (day >= 11 && day <= 13) {
      daySuffix = 'th';
    } else {
      switch (day % 10) {
        case 1:
          daySuffix = 'st';
          break;
        case 2:
          daySuffix = 'nd';
          break;
        case 3:
          daySuffix = 'rd';
          break;
        default:
          daySuffix = 'th';
      }
    }
  
    const formattedDate = `${day}${daySuffix} ${months[month - 1]} ${year}`;
    return formattedDate;
}

  

// function to create course
function createCourse(event) {
    event.preventDefault();

    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    const cName = document.querySelector(".cName").value;
    const tcourse = document.querySelector(".tcourse").value;

    const cschool = document.querySelector(".cschool").value;

    const ct = document.querySelector(".ct").value;
    let cpercent = document.querySelector(".cpercentage").value;
    const cadv = document.querySelector(".ladv").value;
    const culink = document.querySelector(".culink").value;
    const relink = document.querySelector(".rlink").value;

    const osprice = document.querySelector(".osprice").value;
    const vprice = document.querySelector(".virprice").value;

    const caplink = document.querySelector(".caplink").value;
    let tog = document.querySelector(".tog");

    const getOffset = document.querySelector(".offset").value;
    let deadLine = document.querySelector(".discount_deadline").value;

    let myDate = formatDate1(deadLine)

    const ftime = formatDate(myDate);



    if (tog.checked) {
        tog = true;
    }
    else {
        tog = false;
    }

    
    if (cName === "" || tcourse === "" || cschool === "" || ct === "" || cadv === "" || culink === "" || relink === "") {
        Swal.fire({
            icon: 'info',
            text: "All fields are required!",
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

        let getPercentage = cpercent / 100;
        console.log(getPercentage)

        const courseProfile = JSON.stringify({
            "name": cName,
            "advisor_id": cadv,
            "teachable_course_id": tcourse,
            "community_link": culink,
            "course_type": ct,
            "percentages": getPercentage,
            "school": cschool,
            "virtual_price": vprice,
            "onsite_price": osprice,
            "link": relink,
            "capstone_project_instruction_link": caplink,
            "add_to_loop": tog,
            "offset": getOffset,
            "discount_deadline": ftime
        })

        const courMethod = {
            method: 'POST',
            headers: myHead,
            body: courseProfile
        }

        console.log(cadv)


        const url = "https://backend.pluralcode.institute/admin/create-course";
        fetch(url, courMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)

            if (result.message === "course created") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#25067C'
                })

                setTimeout(() => {
                    location.reload();
                }, 4000)
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

// function to get selfpaced course
function getSelfPacedCourse(event) {
    event.preventDefault();

    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";
    const fba = document.querySelector(".fba2");
    const fba2 = document.querySelector(".fba");

    const stn = document.querySelector(".stn");
    const stn2 = document.querySelector(".stn2");

    const getMyTableRecords = document.querySelector(".mytableindex");
    

    const sc = document.querySelector(".stable");
    const lc = document.querySelector(".ltable");

    const loopBtn = document.querySelector(".btn-loop");
    const spBtn = document.querySelector(".btn-sp");

    fba.style.pointerEvents = "all";
    fba2.style.pointerEvents = "all";

    stn.style.pointerEvents = "none"
    stn2.style.pointerEvents = "none"



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

    const url = "https://backend.pluralcode.institute/admin/get-courses";

    fetch(url, courseMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.selfpaced.length === 0) {
            getMyTableRecords.innerHTML = "No records found";
        }
        else {
            result.selfpaced.map((item) => {
                data += `
                <tr>
                   <td>${item.name}</td>
                   <td>${item.course_email}</td>
                   <td>${item.percentages}</td>
                   <td>${item.school}</td>
                   <td>${item.link}</td>
                   <td>${item.community_link}</td>
                   <td>${item.advisor_name}</td>
                   <td>${item.advisor_contact_detail}</td>
                   <td>${item.course_type}</td>
                   <td>$${item.onsite_price}</td>
                   <td>$${item.virtual_price}</td>
                   <td>${item.discount_deadline}</td>
                   <td><button class="${item.status}" onclick="updateCourseStatus(${item.id})">${item.status}</button></td>
                   <td><i class="fas fa-edit" onclick="courseModal(${item.id})"></i></td>
                </tr>
            `
                getMyTableRecords.innerHTML = data;

                sc.style.display = "block";
                lc.style.display = "none";

                spBtn.style.backgroundColor = "#2334A8";
                spBtn.style.color = "#fff";

                loopBtn.style.backgroundColor = "#fff";
                loopBtn.style.color = "#2334A8";
                loopBtn.style.border = "1px solid #2334A8";

                getSpin.style.display = "none";
                

            })
            fba.classList.remove("cardshow")
            fba2.classList.remove("cardshow")

            stn.classList.remove("cardshow")
            stn2.classList.remove("cardshow")
        }
    })
    .catch(error => console.log('error', error));
}

// function to update status
function updateCourseStatus(upId) {
    // const getSpin = document.querySelector(".spin2");
    // getSpin.style.display = "inline-block";

    let myStatus;

    const getItem = localStorage.getItem("self");
    const itemValue = JSON.parse(getItem);

    itemValue.map((item) => {
        if (upId === item.id) {
            myStatus =  item.status;

            if (myStatus === "Active") {
                myStatus = "Inactive"
            }
            else {
                myStatus = "Active"
            }
            console.log(myStatus);

        }
    })

    let coursetype = "instructor-lead";

    const getMyStorage = localStorage.getItem("adminLogin");
    const myStorage = JSON.parse(getMyStorage);
    const storageToken = myStorage.token;

    const myHead = new Headers();
    myHead.append('Content-Type', 'application/json');
    myHead.append('Authorization', `Bearer ${storageToken}`);

    const cMethod = {
        method: 'GET',
        headers: myHead
    }

    const url = `https://backend.pluralcode.institute/admin/update-course-status?course_type=${coursetype}&status=${myStatus}&course_id=${upId}`;

    fetch(url, cMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.message === "updated successfully") {
            Swal.fire({
                icon: 'success',
                text: `${result.message}`,
                confirmButtonColor: '#25067C'
            })
            setTimeout(() => {
                location.reload()
            }, 3000)
        }else {
            Swal.fire({
                icon: 'info',
                text: `${result.message}`,
                confirmButtonColor: '#25067C'
            })
            // getSpin.style.display = "none";
        }
    })
    .catch(error => console.log('error', error));
}


// function to list out cohort
function listOutCohort() {
    const getSpin = document.querySelector(".pagemodal2");
    getSpin.style.display = "block";

    const cohortTable = document.querySelector(".tableindexcohort");

    const getMyStorage = localStorage.getItem("adminLogin");
    const myStorage = JSON.parse(getMyStorage);
    const storageToken = myStorage.token;

    const myHead = new Headers();
    myHead.append('Content-Type', 'application/json');
    myHead.append('Authorization', `Bearer ${storageToken}`);

    const comethod = {
        method: 'GET',
        headers: myHead
    }

    let data = [];

    const url = "https://backend.pluralcode.institute/admin/get-list-cohort";

    fetch(url, comethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.cohortarray.length === 0) {
            cohortTable.innerHTML = "No Records Found!"
        }else {
            result.cohortarray.map((item) => {
                data += `
                    <tr>
                        <td class="mt-5">${item.name} </td>
                        <td>${item.year}</td>
                        <td>${item.totalenrollment}</td>
                        <td><a class="update" href="view-cohort.html?cohort_id=${item.id}">View</a></td>
                        <td><button class="deactive" onclick="deactivateCohort(${item.id})">End Cohort</button></td>
                    </tr>
                `
                cohortTable.innerHTML = data;
                getSpin.style.display = "none";
            })
        }
    })
    .catch(error => console.log('error', error));
}

function deactivateCohort(cohortId) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, End it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            const cohortProfile = JSON.stringify({
                "status": "Inactive",
                "id": cohortId
            })

            const getMyStorage = localStorage.getItem("adminLogin");
            const myStorage = JSON.parse(getMyStorage);
            const storageToken = myStorage.token;

            const myHead = new Headers();
            myHead.append('Content-Type', 'application/json');
            myHead.append('Authorization', `Bearer ${storageToken}`);

            const comethod = {
                method: 'POST',
                headers: myHead,
                body: cohortProfile
            }
            
            const url = "https://backend.pluralcode.institute/admin/close-cohort";

            fetch(url, comethod)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.message === "cohort closed") {
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'cohort closed.',
                        'success'
                    )
                    setTimeout(() => {
                        location.reload();
                    }, 3000)
                }
            })
            .catch(error => console.log('error', error));
        } 
        else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your records are safe :)',
            'error'
          )
        }
    })
}

// function logout
function logAdminOut(event) {
    event.preventDefault();

    localStorage.clear();
    location.href = "adminlog.html"
}






