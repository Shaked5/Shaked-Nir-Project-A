import User from "../models/user.js";

$(document).ready(function () {
    //fetch for autocomplete cities for register
    fetch('./israel-cities.json')
        .then(res => res.json())
        .then((data) => {
            //הגדרת משתנה מסוג מחרוזת שיכיל את כל האפשרויות
            let options = ``

            //מעבר על כל האובייקטים במערך שקיבלנו
            data.forEach(city => {
                options += `<option>${city.engName}</option>`
            })

            //html מטמיע את האופציות בתוך ה
            document.querySelector(`#cities`).innerHTML = options
        })
        .catch((error) => { console.log(error) })
})

//יצירת אירוע להרשמה
$(document).on(`submit`, `#form-horizontal`, (event) => {
    event.preventDefault(); //מונע את הריענון של הדף

    //שליפת הנתונים מתוך השדות של טופס ההרשמה
    let first_name = $(`#firstName`).val()
    let last_name = $(`#lastName`).val()
    let user_name = $(`#userName`).val()
    let email = $(`#email`).val()
    let password = $(`#password`).val()
    let confirm_password = $(`#confirm_password`).val()
    let date_of_birth = $(`#birthDate`).val()
    let phone_number = $(`#phoneNumber`).val()
    let city = $(`#city`).val()
    let street = $(`#street`).val()
    let home_number = $(`#HomeNumber`).val()
    let file = $(`#myFile`).val()
    console.log(file)
    if (password != confirm_password)
        alert(`the pass isnot same`)

    if (email == localStorage.email)
        alert(`email is already exist`)
    var retrievedData = localStorage.getItem(`list_Users`);
    var list_Users = [];
    list_Users = JSON.parse(retrievedData);
    let user = new User(first_name, last_name, user_name, email, password, confirm_password, date_of_birth, phone_number, city, street, home_number, file)
    if (list_Users == null) {
        var list_Users = [];
    }
    list_Users.push(user);

    localStorage.setItem(`list_Users`, JSON.stringify(list_Users))


    console.log(list_Users)
    //חזרה לדף לוגין
    location.href = `./index.html`
})


//יצירת אירוע להתחברות
$(document).on(`submit`, `#login-form`, (event) => {
    event.preventDefault(); //מונע את הריענון של הדף

    //שליפת הנתונים מתוך השדות של טופס ההתחברות
    let user_nameInput = $(`#user_name`).val()
    let password = $(`#password`).val()

    //JSON.parse() --> הופך את הטקסט לאובייקט
    let user = JSON.parse(localStorage.getItem(`list_Users`))
    console.log(user)
    console.log(user.length)
    var LoginSuccess = false;
    //בדיקה ששם המשתמש והסיסמה זהים
    for (let index = 0; index < user.length; index++) {
        if (user_nameInput == user[index].user_name && password == user[index].password) {
            LoginSuccess = true;
            //Session יוצרים
            sessionStorage.setItem(`login_user`, JSON.stringify(user[index]))
            //הפנייה לדף פרופיל
            location.href = `./profilePage.html`

            continue;
        }

    }
    if (LoginSuccess == false)
        alert(`Wrong Password or User name`)
})

//אירוע לחיצה על כפתור התנתקות
$(document).on(`click`, `#logout`, () => {
    //session מחיקה של ה
    sessionStorage.removeItem(`login_user`)

    //חזרה לדף התחברות
    location.href = `./index.html`
})

// פונקציה לבדיקה האם המשתמש נכנס דרך הפרופיל לעדכון פרטים
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }

};
$(document).ready(function () {
    var param = getUrlParameter("Update");
    console.log(param)
    if (param != undefined) {
        $('#btnRegister').remove();
        $('#h2forUpdatePage').empty();
        $('#h2forUpdatePage').append('Update Profile');
        $('#form-horizontal').append('<button class="btn-primary btn-block" id="Update_btn">Update</button>')
        let userData = JSON.parse(sessionStorage.getItem('login_user'))
        console.log(userData)
        $('#firstName').val(userData.first_name)
        $('#lastName').val(userData.last_name)
        $(`#userName`).val(userData.user_name)
        $('#email').val(userData.email)
        $('#password').val(userData.password)
        $('#confirm_password').val(userData.confirm_password)
        $('#birthDate').val(userData.date_of_birth)
        $('#phoneNumber').val(userData.phone_number)
        $('#city').val(userData.city)
        $('#street').val(userData.street)
        $('#HomeNumber').val(userData.home_number)
        let splitFile = userData.file.split("\\")
        let imagepPath = splitFile.length > 2 ? splitFile[2] : null
        imagepPath = `pictures/${imagepPath}`
        FileReader=new FileReader();
        console.log(imagepPath)
        $('myFile').append(imagepPath.FileReader)

    }


})
// .click(function () { alert('hi'); });