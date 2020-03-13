// Display Current Date on Page
let d = new Date().toLocaleDateString();
document.getElementById("time-clock").innerHTML = d;


function bookSearch() {
    let search = document.getElementById('search').value;
    document.getElementById('results').innerHTML = "";

    if (search == '') {
        alert("Please enter a Title or Author first");
    } else {
        $.ajax({
            // Connect to google books api's and grab value of user input typed into search field
            url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
            dataType: "json",
        
            // If successful, function to pull json data based on user search and display pulled infomation back to user
            success: function(response) {
                for (var i = 0; response.items.length; i++) {
                    results.innerHTML += "<div class='book-gallery'>" + "<img src=" + 
                    response.items[i].volumeInfo.imageLinks.smallThumbnail + ">";
                    results.innerHTML += "<div> Title: " + 
                    response.items[i].volumeInfo.title + "</div>";
                    results.innerHTML += "<div> Author: " + 
                    response.items[i].volumeInfo.authors + "</div>";
                    results.innerHTML += "<div> Published: " + 
                    response.items[i].volumeInfo.publishedDate + "</div>";
                    results.innerHTML += "<div><a href= " + 
                    response.items[i].volumeInfo.infoLink + 
                    " target='_blank' rel='noopener'><button class='btn-book-read'>Read More</button></a></div>" + "</div>";
    
                }
            },
            type: 'GET'
        });
    }  
}

// Click event listener to trigger bookSearch method upon button click
document.getElementById('submit').addEventListener('keypress', bookSearch, false);