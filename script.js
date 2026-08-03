const API_URL =
"https://script.google.com/macros/s/AKfycbyJI-e3bzE7VpvZt65MtF9AO067IpYK_CeAwy-shNGmvafI3NDSjlW4cl67Uvjwyz16/exec";



let currentQR = "";





// QR SCANNED

function qrSuccess(decodedText){


currentQR =
decodedText.trim();



document
.getElementById("status")
.innerHTML =
"Detected: "
+
currentQR;



sendAttendance();



}





// SEND ATTENDANCE

function sendAttendance(){



let selectedDay =
document
.getElementById("daySelect")
.value;



fetch(API_URL,{

method:"POST",

body:JSON.stringify({

qr_id:currentQR,

day:selectedDay

})

})


.then(response=>response.json())


.then(data=>{


document
.getElementById("result")
.innerHTML =


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


<p>
${data.day || ""}
</p>


`;



});


}







// START CAMERA


let scanner =
new Html5QrcodeScanner(

"reader",

{

fps:20,

qrbox:300

}

);



scanner.render(qrSuccess);








// CHECK ATTENDANCE


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
.innerHTML =


`

<h2>
${data.name || ""}
</h2>


<p>
${data.course || ""}
</p>


<hr>


<p>
${data.day || ""}
:
${data.status || ""}
</p>


`;



});


}
