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
    console.log(country)

    let getStates = JSON.stringify({
        "country": country
    });

    const myHead = new Headers();
    myHead.append('Content-Type', 'application/json');

    let smethod = {
        method: 'POST',
        headers: myHead,
        body: getStates
    }

    const url = "https://countriesnow.space/api/v0.1/countries/states";

    fetch(url, smethod)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}