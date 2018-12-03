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
                results.innerHTML += "<h4> Published: " + data.items[i].volumeInfo.publishedDate + "</h4>" + "<hr>";
            }
        },
        type: 'GET'
    });
}

// Event listener to trigger click & bookSearch method upon button being clicked
document.getElementById('button'),addEventListener('click', bookSearch, false);

// Function used inside of contact.html
function showInfo() {
    let phnNum = document.getElementById("phnNum").value;
    let eAddress = document.getElementById("eAddress").value;
    let phnResult;
    let emailResult;

    // RegExp to validate phone number
    let verifyPhnNum = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;

    if (verifyPhnNum.test(phnNum)) {
        phnResult = true;
    } else {
        alert("Phone Number invalid, please follow 10-digit format, \"(XXX)-XXX-XXXX\"");
    }

    // RegExp to validate email address
    let verifyEmail = /^[_a-zA-Z0-9\\-]+(\.[_a-zA-Z0-9\\-]+)*@[A-Za-z0-9\\-]+(\.[A-Za-z0-9\\-]+)*(\.[a-z]{2,6})$/;

    if (verifyEmail.test(eAddress)) {
        emailResult = true;
    } else {
        alert("Email invalid, please use format, \"somename@somedomain.com/org/net/edu\"");
    }

    // Try-catch statement to verify information being entered into the fields is correct
    var msg, x, x2, x3;
    let fname = document.getElementById("fname");
    let lname = document.getElementById("lname");
    x = document.getElementById("fname").value;
    x2 = document.getElementById("lname").value;
    x3 = document.getElementById("feedback").value;
    msg = document.getElementById("displayErr");
    msg.innerHTML = "";
    try {
        if (x == "") throw "First Name is empty!";
        if(!isNaN(x)) throw "First Name is not a number!";
        if (x2 == "") throw "Last Name is empty!";
        if(!isNaN(x2)) throw "Last Name is not a number!";
        if (x3 == "") throw "Message box is empty!";
        else {
            alert(`Thank you, ${fname.value} ${lname.value}!`);
        }
    }
    catch(err) {
        msg.innerHTML = "Input for " + err;
    }
}