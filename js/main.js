document.querySelector("button").addEventListener("click", getBookData)
let booksList = []

if (localStorage.getItem('booksList') !== null) {
    booksList = JSON.parse(localStorage.getItem('booksList'))
    populateWithData()
}

function getBookData() {
    const ISBN = document.querySelector("input").value
    const bookData = {}
    
    fetch(`https://openlibrary.org/isbn/${ISBN}.json`)
    .then((response) => response.json())
    .then((data) => {
        bookData.title = data.title
        bookData.subtitle = data.subtitle
        bookData.publish_date = data.publish_date
        booksList.push(bookData)
        localStorage.setItem("booksList", `${JSON.stringify(booksList)}`)
        populateWithData()
    })
    .catch((error) => console.log(error))
}

function prepareData() {
    let dataPortion = ''
    booksList.forEach((el) => {
        dataPortion += 
        `
        <div class="bookInfo">
        <h3>${el.title}</h3>
        <h4>${el.subtitle}. ${el.publish_date}</h4>
        </div>
        `
    })

    return dataPortion
}

function populateWithData() {
    let dataPortion = prepareData()
    document.querySelector(".data").innerHTML = dataPortion  
}