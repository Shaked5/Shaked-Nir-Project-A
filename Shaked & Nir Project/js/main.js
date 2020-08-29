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
        .catch((error) => {  })
})

//יצירת אירוע להרשמה
$(document).on(`submit`, `#form-horizontal`, (event) => {
    event.preventDefault(); //מונע את הריענון של הדף

    //שליפת הנתונים מתוך השדות של טופס ההרשמה
    let first_name = $(`#firstName`).val()
    let last_name = $(`#lastName`).val()
    let user_name = $(`#userName`).val()
    let email = $(`#email`).val()
    var password = $(`#password`).val()
    var pass = document.querySelector(`#password`);
    let confirm_password = $(`#confirm_password`).val()
    let date_of_birth = $(`#birthDate`).val()
    let phone_number = $(`#phoneNumber`).val()
    let city = $(`#city`).val()
    let street = $(`#street`).val()
    let home_number = $(`#HomeNumber`).val()
    let file = $(`#myFile`).val()
    
    if (password != confirm_password)
        alert(`the pass isnot same`)
     

    let checkEmail=JSON.parse(localStorage.getItem('list_Users'))
    if(checkEmail>0){
        for(let i=0;i<checkEmail.length;i++){
            if (email == checkEmail[i].email){
                alert(`email is already exist`)
                return;
            }
        }
    }
   
    //
    for(let i=0;i<user_name.length;i++){
        if(!(user_name[i]>='A'&&user_name[i]<='Z'||user_name[i]>='a'&&user_name[i]<='z'||user_name[i]>='!'&&user_name[i]<='?')){
            alert('only english letter in user name')
            return;
        }

    }
    if(home_number<0)
    {
      alert('wrong home number')
        return;
    }

    var retrievedData = localStorage.getItem(`list_Users`);
    var list_Users = [];
    list_Users = JSON.parse(retrievedData);
    if (list_Users == null) {
        var list_Users = [];
        var serial_number = 0;
    }
    serial_number = list_Users.length + 1;
    let user = new User(serial_number, first_name, last_name, user_name, email, password, confirm_password, date_of_birth, phone_number, city, street, home_number, file)
    list_Users.push(user);

    localStorage.setItem(`list_Users`, JSON.stringify(list_Users))


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

    var LoginSuccess = false;
    //בדיקה ששם המשתמש והסיסמה זהים
    for (let index = 0; index < user.length; index++) {
        if(user_nameInput=="admin"&&password=="admin1234admin"){
            LoginSuccess=true;
            location.href="manager.html";
        }
    }
    for (let index = 0; index < user.length; index++) {
        if (user_nameInput == user[index].user_name && password == user[index].password&&user_nameInput!="admin"&&password!="admin1234admin") {
            LoginSuccess = true;
            //Session יוצרים
            sessionStorage.setItem(`login_user`, JSON.stringify(user[index]))
            //הפנייה לדף פרופיל
            location.href = './profilePage.html'

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

// //אירוע לחיצה על כפתור game
 $('#GameButton').on('click',()=>{
  location.href='./game.html'
})

// פונקציה לבדיקה האם המשתמש נכנס דרך הפרופיל לעדכון פרטים
function getUrlParameter(sParam) {
    let sPageURL = window.location.search.substring(1),
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
    if (param!=undefined) {
        $('#btnRegister').remove();
        $('#h2forUpdatePage').empty();
        $('#h2forUpdatePage').append('Update Profile');
        $('#form-horizontal').attr('id', 'form-update')
        $('#form-update').append('<button class="btn-primary btn-block" id="Update_btn" type="submit">Update</button>')
        let userData = JSON.parse(sessionStorage.getItem('login_user'))
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
        $('#myFileHide').hide()




        $(document).on(`submit`, `#form-update`, (event) => {
            event.preventDefault();

            var Users = JSON.parse(localStorage.getItem('list_Users'));
            let id = JSON.parse(sessionStorage.getItem('login_user'));
            id = id.serial_number - 1;

            Users[id].first_name = $('#firstName').val();
            Users[id].last_name = $('#lastName').val();
            Users[id].user_name = $(`#userName`).val();
            Users[id].email = $('#email').val();
            Users[id].password = $('#password').val();
            Users[id].confirm_password = $('#confirm_password').val();
            Users[id].date_of_birth = $('#birthDate').val();
            Users[id].phone_number = $('#phoneNumber').val();
            Users[id].city = $('#city').val();
            Users[id].street = $('#street').val();
            Users[id].home_number = $('#HomeNumber').val();
            
            localStorage.setItem("list_Users", JSON.stringify(Users));
            sessionStorage.setItem('login_user',JSON.stringify(Users[id]))

            location.href = './profilePage.html';



        })

    }

})


