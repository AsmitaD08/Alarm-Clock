//Array to store Alarm List
let Alarms=[];
// to show current time
setInterval(setCurrentTime,1000);
function setCurrentTime(){
    let clock = new Date();
    let hour = clock.getHours();
    let min = clock.getMinutes();
    let sec = clock.getSeconds();
    let ampm ="AM";
    if (hour>=12) {
        hour -=12;
        ampm="PM";
    }else if(hour==0){
        hour=12;
        ampm = "AM";
    }
    hour = hour<10?"0"+hour:hour;
    min = min<10?"0"+min:min;
    sec = sec<10?"0"+sec:sec;
    let currentTime = hour+":"+min+":"+sec+ampm;
    document.getElementById("setClock").innerHTML=currentTime;
    Alarms.forEach(element => {
        checkAlarm(element);
    });
}
//to check list of alarms against current time
function checkAlarm(alarmTime) {
    let clock = new Date();
    let hour = clock.getHours();
    let min = clock.getMinutes();
    let sec = clock.getSeconds();
    hour = hour<10?"0"+hour:hour;
    min = min<10?"0"+min:min;
    sec = sec<10?"0"+sec:sec;
    let currentTime = hour+":"+min+":"+sec;
    if (currentTime==alarmTime) {
        alert('Its Alarm time!');
    }
}
//to set alarm timing based on users input
let btn_submit = document.getElementById('submitAlarm');
let input_time = document.getElementById('inputTime');
btn_submit.addEventListener('click',()=>{setAlarm(input_time.value)})
function setAlarm(event){
    if (event=="") {
        alert('Please enter time to set alarm');
    }
    else{
    Alarms.push(event);
    input_time.value="";
    }
    showAlarm();
}
//to show alarm list
let noAlarmDiv = document.getElementById('noAlarms');
let alarmListDiv = document.getElementById('list');
function showAlarm(){
    if (Alarms.length==0) {
        noAlarmDiv.style.display="block";
        alarmListDiv.style.display="none";
    }
    else{
        alarmListDiv.innerHTML="";
        noAlarmDiv.style.display="none";
        alarmListDiv.style.display="block";
        let alarmUl = document.createElement('ul');
        let title = document.createElement('h3');
        title.textContent="Upcoming Alarms";
        alarmListDiv.append(title);
         Alarms.forEach(element => {
            let alarmEl= document.createElement('li');
            let timeEL = document.createElement('h3');
            timeEL.style.display="inline";
            timeEL.className="timeEL";
            timeEL.textContent=element;
            let delete_btn = document.createElement('button');
            delete_btn.type="button";
            delete_btn.className="delete-btn";
            delete_btn.textContent=" X ";
            delete_btn.value=Alarms.length;
            delete_btn.addEventListener('click',()=>{
                let index = delete_btn.value-1;
                let listItem = delete_btn.parentElement;
                Alarms.splice(index,1);
                listItem.remove();
            })
            alarmEl.append(timeEL);
            alarmEl.append(delete_btn);
            alarmUl.append(alarmEl);
         });
         alarmListDiv.append(alarmUl);
    }
}
console.log(Alarms)