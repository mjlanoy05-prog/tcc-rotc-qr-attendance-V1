const API_URL =
"https://script.google.com/macros/s/AKfycbzBo5P2gxotAEqkv33WnmyP-XTBmL7fFBN1wJQQIQzxFJi1f6BuNVIvhGN2YRqd3ma1/exec";




// ======================
// ADMIN LOGIN
// ======================


const ADMIN_USERNAME = "admin";

const ADMIN_PASSWORD = "12345";



let currentQR="";

let scanner;





function login(){


let username =
document.getElementById("username").value;



let password =
document.getElementById("password").value;




if(
username==ADMIN_USERNAME &&
password==ADMIN_PASSWORD
){


document.getElementById("login").style.display="none";


document.getElementById("attendance").style.display="block";


startScanner();



}

else{


document.getElementById("loginStatus").innerHTML =
"Invalid Username or Password";


}


}






function logout(){


location.reload();


}







// ======================
// START QR CAMERA
// ======================


function startScanner(){



scanner =
new Html5QrcodeScanner(

"reader",

{

fps:20,

qrbox:300

}

);



scanner.render(qrSuccess);



}








// ======================
// QR DETECTED
// ======================


function qrSuccess(decodedText){



currentQR =
decodedText.trim();



document
.getElementById("status")
.innerHTML =
"Detected: "+currentQR;



sendAttendance();



}








// ======================
// SAVE ATTENDANCE
// ======================


function sendAttendance(){



let selectedDay =
document
.getElementById("daySelect")
.value;





fetch(API_URL,{


method:"POST",


body:JSON.stringify({

qr_id:currentQR,

attendance_column:selectedDay


})


})



.then(response=>response.json())



.then(data=>{



document
.getElementById("result")
.innerHTML=


`

<h2>
${data.message}
</h2>


<p>
${data.name || ""}
</p>


<p>
${data.course || ""}
</p>


`;



});



}








// ======================
// CHECK ATTENDANCE
// ======================


function checkAttendance(){



if(currentQR==""){


alert(
"Please scan QR first"
);


return;


}





let selectedDay =
document
.getElementById("daySelect")
.value;





let dayNumber =
Number(selectedDay)-3;





fetch(

API_URL+
"?action=check&qr_id="
+
currentQR
+
"&day="
+
selectedDay


)



.then(response=>response.json())



.then(data=>{



document
.getElementById("result")
.innerHTML=



`

<h2>
${data.name || ""}
</h2>


<p>
${data.course || ""}
</p>


<hr>


<h3>
DAY ${dayNumber}
</h3>


<h2>
${data.status || "ABSENT"}
</h2>


`;



});



}
