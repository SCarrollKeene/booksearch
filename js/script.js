function bookSearch() {
    let search = document.getElementById('search').value;

    document.getElementById('results').innerHTML = "";

    console.log(search);

    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
        dataType: "json",
    
        success: function(data) {
            for (var i = 0; data.items.length; i++) {
                results.innerHTML += "<img src=" + data.items[i].volumeInfo.imageLinks.smallThumbnail + ">";
                results.innerHTML += "<h3> Title: " + data.items[i].volumeInfo.title + "</h3>";
                results.innerHTML += "<h3> Author: " + data.items[i].volumeInfo.authors + "</h3>";
                results.innerHTML += "<h3> Published: " + data.items[i].volumeInfo.publishedDate + "</h3>";
            }
        },
        type: 'GET'
    });
}

document.getElementById('button'),addEventListener('click', bookSearch, false);
