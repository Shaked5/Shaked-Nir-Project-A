
//שיוך אירוע טעינה לדף פרופיל
function profilePageLoaded() {

    //בדיקה שאין משתמש מחובר
    if (sessionStorage.getItem(`login_user`) == null)
        location.href = "./index.html"


    //session שליפת הפרטים של המשתמש מתוך ה
    let user = JSON.parse(sessionStorage.getItem(`login_user`))
    //כתיבת ההודעה
    $(`#welcome-msg`).html(`Welcome ${user.user_name}`)
    //הבאת הקובץ של התמונת פרופיל
    let splitFile = user.file.split("\\")
    let imagepPath = splitFile.length > 2 ? splitFile[2] : null
    imagepPath =`pictures/${imagepPath}`
   

    $(`#ProfilePic`).append(`<img src="${imagepPath}"></img>`)
     
    $(`#FullName`).append(user.first_name +" "+ user.last_name)

    $(`#ProfileCity`).append(user.street+" "+user.home_number+","+user.city)

    $(`#ProfileMail`).append(user.email)

    $(`#ProfileBirthDate`).append(user.date_of_birth)

}


//שיוך אירוע טעינה לדף התחברות
function loginPageLoaded() {

    //בדיקה שיש משתמש מחובר
    if (sessionStorage.getItem(`login_user`) != null)
        location.href = "./profilePage.html"
}

