var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");

var bookList = [];

if(localStorage.getItem("books") !== null)
{
    bookList = JSON.parse(localStorage.getItem("books"))
    displayBook(bookList);
}

function addBook()
{
    var book = {
        bookmark : siteName.value,
        url : siteUrl.value
    }
    bookList.push(book);
    localStorage.setItem("books" , JSON.stringify(bookList));
    clearForm();
    displayBook();
}

function clearForm()
{
    siteName.value = null;
    siteUrl.value = null;
}

function displayBook()
{
    var container = ``;
    for(var i = 0 ; i < bookList.length ; i++)
    {
        container += ` <div class="col-md-3 my-4">
                <p class="text-white h6">Website Name</p>
                <hr>
                <p class="text-white">${bookList[i].bookmark}</p>
            </div>
            <div class="col-md-3 my-4">
                <p class="text-white h6">Index</p>
                <hr>
                <p class="text-white">${bookList[i].url}</p>
            </div>
            <div class="col-md-3 my-4">
                <p class="text-white h6">Visit</p>
                <hr>
                <button onclick="visitUrl(${i})" class="btn btn-success"><i class="fa-solid fa-eye px-1"></i> Visit</button>
            </div>
            <div class="col-md-3 my-4">
                <p class="text-white h6">Delete</p>
                <hr>
                <button onclick="deleteBook(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can px-1"></i> Delete</button>
            </div>`
    }
    document.getElementById("rowData").innerHTML = container;
}

function deleteBook(deleteItem)
{
    bookList.splice(deleteItem,1);
    localStorage.setItem("books" , JSON.stringify(bookList));
    displayBook();
}
function visitUrl(url)
{
    var urlToVisit = bookList[url].url;
    window.open(urlToVisit, "blank"); 
}

function validation()
{
    // var regex = {
    //     siteName : /^(([a-z]|\d)([a-z]|\d)([a-z]|\d))(\d|[a-z])*$/i,
    //     siteUrl : /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i
        
    // }
    // if(regex[element.id].test(element.value) == true)
    // {
    //     element.classList.add("is-valid");
    //     element.classList.remove("is-invalid");
       
    // }
    // else
    // {
    //     element.classList.add("is-invalid");
    //     element.classList.remove("is-valid");
    // }

    var regex1 = /^(([a-z]|\d)([a-z]|\d)([a-z]|\d))(\d|[a-z])*$/i;
    var regex2 = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i
    if(regex1.test(siteName.value) == true)
    {
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
        if(regex2.test(siteUrl.value) == true){
            siteUrl.classList.add("is-valid");
            siteUrl.classList.remove("is-invalid");
            submitBtn.classList.remove("d-none");
        }
        else
        {
            siteUrl.classList.add("is-invalid");
            siteUrl.classList.remove("is-valid");
            submitBtn.classList.add("d-none");
        }
    }
    else if(siteName.value || siteUrl.value === null)
    {
        submitBtn.classList.add("disable");
    }
    else
    {
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
        submitBtn.classList.add("d-none");
        
    }
   

}    
