const API_URL =
"https://script.google.com/macros/s/AKfycbwpH_efZrp7GgVINdXdJMZPPshb_TR4ywIIgIN6He2Mz7s0tjvyPfSd_xYj5sw5UWo-/exec";

let currentQR = "";

function qrSuccess(decodedText){

    currentQR = decodedText.trim();

    document.getElementById("status").innerHTML =
    "Detected : " + currentQR;

    sendAttendance();

}

function sendAttendance(){

    let day =
    document.getElementById("attendanceDay").value;

    fetch(API_URL,{

        method:"POST",

        body:JSON.stringify({

            qr_id:currentQR,

            day:day

        })

    })

    .then(r=>r.json())

    .then(data=>{

        document.getElementById("result").innerHTML=

        `
        <h2>${data.message}</h2>

        <h3>${data.name||""}</h3>

        <p>${data.course||""}</p>

        <p>${data.dayName||""}</p>

        `;

    });

}

let scanner =
new Html5QrcodeScanner(

"reader",

{

fps:20,

qrbox:300

}

);

scanner.render(qrSuccess);

function checkAttendance(){

    if(currentQR==""){

        alert("Scan QR first.");

        return;

    }

    fetch(API_URL+
    "?action=check&qr_id="+currentQR)

    .then(r=>r.json())

    .then(data=>{

        let html="";

        html+="<h2>"+data.name+"</h2>";
        html+="<p>"+data.course+"</p><hr>";

        for(let i=1;i<=17;i++){

            html+="DAY "+i+" : "+
            data["day"+i]+"<br>";

        }

        document.getElementById("result").innerHTML=
        html;

    });

}
