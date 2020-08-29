
var userarr = JSON.parse(localStorage.getItem('list_Users'))

function getUrlParameter2(sParam) {
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




let table = `<table id="mytable" class="table">`;

for (let i = 0; i < 1; i++) {
    table += `<tr>`
    for (let j = 0; j <= 9; j++) {
        if (j == 0) {
            table += `<th>Serial Number</th>`;
        }
        if (j == 1) {
            table += `<th>Pic</th>`;
        }
        if (j == 2) {
            table += `<th>User Name</th>`;
        }
        if (j == 3) {
            table += `<th>First Name</th>`;
        }
        if (j == 4) {
            table += `<th>Last Name</th>`;
        }
        if (j == 5) {
            table += `<th>Street</th>`;
        }
        if (j == 6) {
            table += `<th>City</th>`;
        }
        if (j == 7) {
            table += `<th>Email</th>`;
        }
        if (j == 8) {
            table += `<th>Date Of Birth</th>`;
        }
        if (j == 9) {
            table += `<th>Action</th>`;

        }
    }
    table += `</tr>`
}


for (let i = 1; i < userarr.length; i++) {
    table += `<tr>`
    for (let j = 0; j <= 9; j++) {
        if (j == 0) {
            table += `<td> ${i + 1}</td>`

        }
        if (j == 1) {

            let tdPic = `<div id="tdPicture">`;
            let splitFile = userarr[i].file.split("\\")
            let imagepPath = splitFile.length > 2 ? splitFile[2] : null
            tdPic += `<img src="pictures/${imagepPath}" style="width:40px; height:30px;border-radius:15%"></img>`


            tdPic += `</div>`



            table += `<td>${tdPic}</td>`
        }
        if (j == 2) {
            table += `<td> ${userarr[i].user_name}</td>`

        }
        if (j == 3) {
            table += `<td> ${userarr[i].first_name}</td>`

        }
        if (j == 4) {
            table += `<td> ${userarr[i].last_name}</td>`

        }

        if (j == 5) {
            table += `<td> ${userarr[i].street}</td>`

        }
        if (j == 6) {
            table += `<td> ${userarr[i].city}</td>`

        }
        if (j == 7) {

            var malito_link = 'malito:' + userarr[i].email
            table += `<td><a href="${malito_link}"<td>${userarr[i].email}</td></a></td>`
            // table+=`<td id="email">${mailto_link}</td>`

        }

        if (j == 8) {
            var date = userarr[i].date_of_birth;
            date = date.split("-").reverse().join("/");
            table += `<td> ${date}</td>`;

        }

        if (j == 9) {
            var delete_user = `<button class="delete_img" value ="${userarr[i].user_name}"></button>`;
            // `<button class="delete_img"  value ="${userarr[i].user_name}"></button>`;
            var edit_user = `<button class="edit_img" value ="${userarr[i].user_name}"></button>`;

            table += `<td>${delete_user + edit_user}</td>`;

        }

    }

}

table += `</table>`;

$('#mytable').html(table);

$('.delete_img').on('click', (event) => {
    var temp = event.target.value;
    var newarray = [];

    console.log(userarr[7])
    for (let i = 0; i < userarr.length; i++) {
        if (userarr[i].user_name != temp) {
            newarray.push(userarr[i]);

        }
    }
    localStorage.setItem('list_Users', JSON.stringify(newarray));


    location.href = `./manager.html`

})



$('.edit_img').on('click', (event) => {

    temp2 = event.target.value;
    usernamecheck = temp2;
    if (usernamecheck = !undefined)
        window.location = `register.html?Manager=${temp2}`;
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
const queryString = window.location.search;
var temp2;
var param;
var usernamecheck;
var k;

//בדיקה האם נכנסת לעדכון פרטים דרך דף מנהל
function editUpdateManager(usernamecheck, param) {

    if (param != undefined) {
        $('#btnRegister').remove();
        $('#h2forUpdatePage').empty();
        $('#h2forUpdatePage').append('Update Profile');
        $('#form-horizontal').attr('id', 'form-update-manager')
        $('#form-update-manager').append('<button class="btn-primary btn-block" id="Update_btn" type="submit">Update</button>')


        for (k = 1; k < userarr.length; k++) {
            if (userarr[k].user_name == param) {
                $('#firstName').val(userarr[k].first_name)
                $('#lastName').val(userarr[k].last_name)
                $(`#userName`).val(userarr[k].user_name)
                $('#email').val(userarr[k].email)
                $('#password').val(userarr[k].password)
                $('#confirm_password').val(userarr[k].confirm_password)
                $('#birthDate').val(userarr[k].date_of_birth)
                $('#phoneNumber').val(userarr[k].phone_number)
                $('#city').val(userarr[k].city)
                $('#street').val(userarr[k].street)
                $('#HomeNumber').val(userarr[k].home_number)
            }
        }

        $(document).on(`submit`, `#form-update-manager`, (event) => {
            event.preventDefault();
            var UsersManager = JSON.parse(localStorage.getItem('list_Users'));
            for (k = 1; k < userarr.length; k++) {
                if (userarr[k].user_name == param) {
                    UsersManager[k].first_name = $('#firstName').val();
                    UsersManager[k].last_name = $('#lastName').val();
                    UsersManager[k].user_name = $(`#userName`).val();
                    UsersManager[k].email = $('#email').val();
                    UsersManager[k].password = $('#password').val();
                    UsersManager[k].confirm_password = $('#confirm_password').val();
                    UsersManager[k].date_of_birth = $('#birthDate').val();
                    UsersManager[k].phone_number = $('#phoneNumber').val();
                    UsersManager[k].city = $('#city').val();
                    UsersManager[k].street = $('#street').val();
                    UsersManager[k].home_number = $('#HomeNumber').val();
                }
            }
            localStorage.setItem("list_Users", JSON.stringify(UsersManager));


            location.href = './manager.html';
        })




    }
}




$(document).ready(function (usernamecheck) {
    usernamecheck = temp2;
    param = getUrlParameter("Manager");
    if (param) {
        editUpdateManager(temp2, param)
    }

})










