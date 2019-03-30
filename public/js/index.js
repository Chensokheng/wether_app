console.log("It is working on port 3000. That is awesome");

// fetch is brower web API


const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const msg_1 = document.querySelector("#msg_1");
const msg_2 = document.querySelector("#msg_2");
const loader = document.querySelector(".loader");
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loader.classList.add('loading');
    const location = searchInput.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                msg_1.innerHTML = data.error;
                msg_1.style.color = 'red';
                loader.classList.remove('loading');
                msg_2.innerHTML = "";

            } else {
                loader.classList.remove('loading');
                msg_1.style.color = 'black';
                msg_1.innerHTML = '<strong>Location</strong>: ' + data[0].location;
                msg_2.innerHTML = '<strong>Description</strong>: ' + data[0].forecast;
            }
        })
    })


})

