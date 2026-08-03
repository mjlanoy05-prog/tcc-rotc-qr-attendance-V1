const API_URL =
"https://script.google.com/macros/s/AKfycbw1-BpQzSbBRSzOgJ-yHvYlAz6T4Vt9VpnpBweWe8kKWvu8WmkuDokQzQqMsW5Uxj5G/exec";





const ADMIN_USERNAME = "admin";

const ADMIN_PASSWORD = "12345";



let currentQR="";

let scanner;






function login(){


let user =
document.getElementById("username").value;



let pass =
document.getElementById("password").value;





if(
user==ADMIN_USERNAME &&
pass==ADMIN_PASSWORD
){



document.getElementById("login").style.display="none";


document.getElementById("attendance").style.display="block";


startScanner();



}

else{


document.getElementById("loginStatus").innerHTML=
"Invalid Login";


}


}







function logout(){


location.reload();


}







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






function qrSuccess(decodedText){



currentQR =
decodedText.trim();



document.getElementById("status").innerHTML=
"Detected: "+currentQR;



sendAttendance();



}







function sendAttendance(){



let dayColumn =
document.getElementById("daySelect").value;





fetch(API_URL,{

method:"POST",

body:JSON.stringify({

qr_id:currentQR,

attendance_column:dayColumn


})

})



.then(response=>response.json())



.then(data=>{



document.getElementById("result").innerHTML=


`

<h2>${data.message}</h2>

<p>${data.name || ""}</p>

<p>${data.course || ""}</p>

`;


});



}







function checkAttendance(){



if(currentQR==""){


alert("Please scan QR first");


return;


}





fetch(
API_URL+
"?action=check&qr_id="+currentQR
)



.then(response=>response.json())



.then(data=>{



document.getElementById("result").innerHTML=


`

<h2>${data.name}</h2>

<p>${data.course}</p>

<hr>

<p>DAY 1: ${data.day1}</p>

<p>DAY 2: ${data.day2}</p>

<p>DAY 3: ${data.day3}</p>

<p>DAY 4: ${data.day4}</p>

<p>DAY 5: ${data.day5}</p>

<p>DAY 6: ${data.day6}</p>

<p>DAY 7: ${data.day7}</p>

<p>DAY 8: ${data.day8}</p>

<p>DAY 9: ${data.day9}</p>

<p>DAY 10: ${data.day10}</p>

<p>DAY 11: ${data.day11}</p>

<p>DAY 12: ${data.day12}</p>

<p>DAY 13: ${data.day13}</p>

<p>DAY 14: ${data.day14}</p>

<p>DAY 15: ${data.day15}</p>

<p>DAY 16: ${data.day16}</p>

<p>DAY 17: ${data.day17}</p>


`;



});



}
