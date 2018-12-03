// Display Current Date on Home Page
let d = new Date().toLocaleDateString();
document.getElementById("timeClock").innerHTML = d;


function bookSearch() {
    let search = document.getElementById('search').value;
    document.getElementById('results').innerHTML = "";

    $.ajax({
        // Connect to google books api's and grab value of user input typed into search field
        url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
        dataType: "json",
    
        // If successful, function to pull json data based on user search and display pulled infomation back to user
        success: function(data) {
            for (var i = 0; data.items.length; i++) {
                results.innerHTML += "<img src=" + data.items[i].volumeInfo.imageLinks.smallThumbnail + ">";
                results.innerHTML += "<h4> Title: " + data.items[i].volumeInfo.title + "</h4>";
                results.innerHTML += "<h4> Author: " + data.items[i].volumeInfo.authors + "</h4>";
                results.innerHTML += "<h4> Published: " + data.items[i].volumeInfo.publishedDate + "</h4>";
            }
        },
        type: 'GET'
    });
}

// Event listener to trigger click & bookSearch method upon button being clicked
document.getElementById('button'),addEventListener('click', bookSearch, false);