//Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark );

// Save Bookmark
function saveBookmark(e){
    //Get form value
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    };
    if (localStorage.getItem('bookmarks') === null) {
        //init array
       var bookmarks = [];
        //Add bookmark
        bookmarks.push(bookmark);
        // Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else{
        // Get bookmarks from localStorage
       var  bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmark to array
        bookmarks.push(bookmark);
        //Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    // //Local Storage Test
    // localStorage.setItem('test', 'Hello World');
    // localStorage.getItem('test');
    // localStorage.removeItem('test');
    //console.log('it works!');
    //Re-fetch

    //Clear form
    document.getElementById('myForm').reset();
    fetchBookmarks();
    e.preventDefault();
}
//Delete Bookmark
function deleteBookmark(url){
    //Get bookmarks from locoStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop through bookmarks
    for(var i = 0; i< bookmarks.length; i++){
        if(bookmarks[i].url === url){
            //Remove array
            bookmarks.splice(i, 1);

        }
    }
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //Re-fetch
    fetchBookmarks();
}

function fetchBookmarks() {
    // Get bookmarks from localStorage
   var  bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //Build output
    bookmarksResults.innerHTML = '';
    for( var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+ '<h3>'+name+
            '<a class="btn btn-info" target="_blank" href="'+url+'">Visit</a>'+
            '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
            '</h3>'+
            '</div>';
    }
}

// Validate Form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}