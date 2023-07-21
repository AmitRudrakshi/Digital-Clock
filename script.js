// Clock
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var i = 0;
var alarms_ul = document.getElementById("alarms_ul");
var audio = new Audio("music/alarm.mp3");

const updateTime = () => {
  const time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  let otherampm = hours >= 12 ? "AM" : "PM";

  hours = hours % 12 || 12;
  hours = addTrailingZero(hours);
  minutes = addTrailingZero(minutes);
  seconds = addTrailingZero(seconds);

  $("#hour").html(hours);
  $("#min").html(minutes);
  $("#sec").html(seconds);
  $("#ampm").html(ampm);
  $("#other-ampm").html(otherampm);
};

updateTime();
setInterval(updateTime, 1000);

$("#alarm-btn").click(function () {
  $(".main-container > div").slideUp();
  $(".alarm_clock").slideDown();
  $(".type").html("Alarm");
});

document.querySelector("#submit_alarm_time").addEventListener("click", (e) => {
  e.preventDefault();
  //Call setAlarm function
  setAlarm();
});

let setAlarm = () => {
  let alarmsInput = document.getElementById("alarm_input");
  let alarm = alarmsInput.value;
  alarmsInput.value = "";
  if (alarm !== "") {
    let curr_time = new Date();
    //create alarm_time object
    let alarm_time = new Date(alarm);
    let duration = alarm_time - curr_time;
    if (duration < 0) {
      alert("Time has already passed!!");
    } else {
      displayAlarms(alarm_time);
      // console.log("remaining time in seconds",duration/1000);
      timer[i++] = setTimeout(async () => {
        audio.loop = true;
        await audio.play();
        var messageElement = document.createElement("div");
        messageElement.className = "alert-message";
        messageElement.id = "alert-message";
        messageElement.innerHTML = `<div class="alert-body">
          <h3 id="lbl-dialog-alarm-title"><span class="fas fa-bell fa-1x" style="padding:10px;"></span>Alarm</h3>
          <h3 id="lbl-dialog-alarm-time">${
            alarm_time.toString().split(" ")[4]
          }</h3>
          <button type="button" data-dismiss="modal" onClick={stopAlarmSound()} class="btnn btn-classic">OK</button>
      </div>`;
        document.body.appendChild(messageElement);
        await console.log("Alarm Deleted");
        // remove the alarm from dom
        await document.getElementById(alarm_time).remove();
        i--;
      }, duration);
    }
  } else {
    alert("Select Alarm Time !!!");
  }
};

function stopAlarmSound() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  document.getElementById("alert-message").remove();
}

let displayAlarms = (time) => {
  //clear alarms_ul innerHTml to avoid already appened duplicated lists everytime a new alarm is added
  // create necessary variables for every alarm_time object in the array ...
  let alarmTime = time;
  let hours = alarmTime.getHours();
  let minutes = alarmTime.getMinutes();
  let seconds = alarmTime.getSeconds();
  let format = hours < 12 ? "A.M" : "P.M";
  //create newLi tag to append to the alarms List
  let newLi = document.createElement("li");
  newLi.className = "alarms-li";
  newLi.id = time;
  newLi.innerHTML = `
  <span class="fas fa-bell fa-1x"></span>
  ${months[alarmTime.getMonth()]}
  ${alarmTime.getDate()} 
  @ 
  ${hours % 12 < 10 ? "0" + (hours % 12) : hours % 12}:
  ${minutes < 10 ? "0" + minutes : minutes}:
  ${seconds < 10 ? "0" + seconds : seconds}:
  ${format} 
  <button  type="submit" onClick={deleteAlarm(${i})} class='deleteAlarm button'>Delete</button>    
  `;
  alarms_ul.appendChild(newLi);
};

let deleteAlarm = (index) => {
  clearInterval(timer[index]);
};

function removeAlarm(el) {
  // console.log(el);
  if (el.classList.contains("deleteAlarm")) {
    el.parentElement.remove();
  }
}

document.getElementById("alarms_ul").addEventListener("click", (e) => {
  removeAlarm(e.target);
});

$("#stopwatch-btn").click(function () {
  $(".main-container > div").slideUp();
  $(".stopwatch").slideDown();
  $(".type").html("Stopwatch");
});

$("#timer-btn").click(function () {
  $(".main-container > div").slideUp();
  $(".timer").slideDown();
  $(".type").html("Timer");
});

$(".back-btn").click(function () {
  $(".main-container > div").slideUp();
  $(".clock").slideDown();
  $(".type").html("Clock");
});

let stopwatchHours = 0,
  stopwatchMinutes = 0,
  stopwatchSeconds = 0,
  stopwatchMiliSeconds = 0,
  stopwatchRunning = false,
  laps = 0,
  stopwatchInterval;

function stopwatch() {
  stopwatchMiliSeconds++;
  if (stopwatchMiliSeconds === 100) {
    stopwatchMiliSeconds = 0;
    stopwatchSeconds++;
  }
  if (stopwatchSeconds === 60) {
    stopwatchSeconds = 0;
    stopwatchMinutes++;
  }
  if (stopwatchMinutes === 60) {
    stopwatchMinutes = 0;
    stopwatchHours++;
  }

  $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
  $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
  $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
  $("#stopwatch-ms").html(addTrailingZero(stopwatchMiliSeconds));
}

function startStopwatch() {
  if (!stopwatchRunning) {
    stopwatchInterval = setInterval(stopwatch, 10);
    stopwatchRunning = true;
  }
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  stopwatchHours = 0;
  stopwatchMinutes = 0;
  stopwatchSeconds = 0;
  stopwatchMiliSeconds = 0;
  laps = 0;
  $("#stopwatch-hour").html("00");
  $("#stopwatch-min").html("00");
  $("#stopwatch-sec").html("00");
  $("#stopwatch-ms").html("00");
}

$(".start-stopwatch").click(function () {
  startStopwatch();
  $(".start-stopwatch").hide();
  $(".lap-stopwatch").show();
});

$(".lap-stopwatch").click(function () {
  laps++;
  $(".lap").removeClass("active");
  $(".laps").prepend(
    ` <div class="lap active">
      <p>Lap ${laps}</p>
      <p>
        ${addTrailingZero(stopwatchHours)} : ${addTrailingZero(
      stopwatchMinutes
    )} : ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(
      stopwatchMiliSeconds
    )}
      </p>
    </div>
   `
  );
});

$(".reset-stopwatch").click(function () {
  resetStopwatch();
  $(".start-stopwatch").show();
  $(".lap-stopwatch").hide();
  $(".laps").html("");
});

function addTrailingZero(number) {
  return number < 10 ? "0" + number : number;
}

let time = 0,
  timerHours = 0,
  timerMinutes = 0,
  timerSeconds = 0,
  timerMiliseconds = 0,
  timerRunning = false,
  timerInterval;

function getTime() {
  time = prompt("Enter time in minutes");
  time = time * 60;
  setTime();
}
function setTime() {
  timerHours = Math.floor(time / 3600);
  timerMinutes = Math.floor((time % 3600) / 60);
  timerSeconds = Math.floor(time % 60);
  timerMiliseconds = 0;

  $("#timer-hour").html(addTrailingZero(timerHours));
  $("#timer-min").html(addTrailingZero(timerMinutes));
  $("#timer-sec").html(addTrailingZero(timerSeconds));
  $("#timer-ms").html(addTrailingZero(timerMiliseconds));
}

function timer() {
  timerMiliseconds--;
  if (timerMiliseconds === -1) {
    timerMiliseconds = 99;
    timerSeconds--;
  }
  if (timerSeconds === -1) {
    timerSeconds = 59;
    timerMinutes--;
  }
  if (timerMinutes === -1) {
    timerMinutes = 59;
    timerHours--;
  }

  $("#timer-hour").html(addTrailingZero(timerHours));
  $("#timer-min").html(addTrailingZero(timerMinutes));
  $("#timer-sec").html(addTrailingZero(timerSeconds));
  $("#timer-ms").html(addTrailingZero(timerMiliseconds));

  timeUp();
}

function startTimer() {
  if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0) {
    getTime();
  } else {
    timerInterval = setInterval(timer, 10);
    timerRunning = true;
    $(".start-timer").hide();
    $(".stop-timer").show();
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  $(".start-timer").show();
  $(".stop-timer").hide();
}

function resetTimer() {
  stopTimer();
  time = 0;
  setTime();
}

function darkMode() {
  console.log("dark mode worked");
  var element = document.getElementById("container");
  element.classList.toggle("dark-mode");
  var element = document.getElementById("footer");
  element.classList.toggle("dark-mode");
  var element = document.body;
  element.classList.toggle("dark-mode");
  var element = document.getElementById("credits");
  element.classList.toggle("dark-mode");
}

async function timeUp() {
  if (
    timerHours === 0 &&
    timerMinutes === 0 &&
    timerSeconds === 0 &&
    timerMiliseconds === 0
  ) {
    await stopTimer();
    await setTime();
    audio.loop = true;
    await audio.play();
    var messageElement = document.createElement("div");
    messageElement.className = "alert-message";
    messageElement.id = "alert-message";
    messageElement.innerHTML = `<div class="alert-body">
          <div class="i-circle text-danger"></div>
          <h3 id="lbl-dialog-alarm-title"><span class="fas fa-clock fa-1x"></span>  Time's UP!</h3>
          <button type="button" data-dismiss="modal" onClick={stopAlarmSound()} class="btnn">OK</button>
      </div>`;
    document.body.appendChild(messageElement);
  }
}

$(".start-timer").click(startTimer);

$(".stop-timer").click(stopTimer);

$(".reset-timer").click(function () {
  resetTimer();
  if (!timerRunning) {
    $(".start-timer").show();
    $(".stop-timer").hide();
  }
});

const DOCbody = document.body;

DOCbody.addEventListener('dblclick', function() {
  toggleFullscreen();
});

function toggleFullscreen() {
  if (!document.fullscreenElement && !document.mozFullScreenElement &&
      !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
  }
}
