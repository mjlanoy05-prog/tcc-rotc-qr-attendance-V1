const API_URL =
"https://script.google.com/macros/s/AKfycbz4QSlc60qZd-ZSrHWyaN3dbQkAtH0gss-LpoKHa9_3XscgmiQJFQ5RIFFz_znGZMAE/exec";


let currentQR = "";


// WHEN QR IS DETECTED

function qrSuccess(decodedText){

    currentQR = decodedText.trim();


    document.getElementById("status").innerHTML =
    "Detected QR: " + currentQR;


    // AUTOMATICALLY RECORD ATTENDANCE

    sendAttendance();

}



// SEND ATTENDANCE

function sendAttendance(){


    let selectedDay =
    document.getElementById("attendanceDay").value;


    fetch(API_URL,{

        method:"POST",

        body:JSON.stringify({

            qr_id:currentQR,

            day:selectedDay

        })

    })


    .then(response=>response.json())


    .then(data=>{


        document.getElementById("result").innerHTML =

        `

        <h2>${data.message}</h2>

        <h3>${data.name || ""}</h3>

        <p>
        Course: ${data.course || ""}
        </p>

        <p>
        ${data.dayName || ""}
        </p>

        `;


    })


    .catch(error=>{

        document.getElementById("result").innerHTML =
        "Error connecting to server";

    });


}



// START QR CAMERA


let scanner =

new Html5QrcodeScanner(

"reader",

{

fps:20,

qrbox:300

}

);


scanner.render(qrSuccess);





// CHECK ATTENDANCE BUTTON


function checkAttendance(){


    if(currentQR==""){

        alert("Please scan QR first");

        return;

    }



    fetch(

        API_URL+
        "?action=check&qr_id="+
        encodeURIComponent(currentQR)

    )


    .then(response=>response.json())


    .then(data=>{


        if(data.message){

            document.getElementById("result").innerHTML =
            `
            <h2>${data.message}</h2>
            `;

            return;

        }



        let attendance="";


        for(let i=1;i<=17;i++){


            attendance +=

            `

            <p>
            DAY ${i}: 
            <b>${data["day"+i]}</b>
            </p>

            `;


        }



        document.getElementById("result").innerHTML =


        `

        <h2>${data.name}</h2>

        <h3>${data.course}</h3>

        <hr>

        ${attendance}


        `;



    })


    .catch(error=>{


        document.getElementById("result").innerHTML =
        "Unable to check attendance";


    });


}
