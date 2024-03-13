let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
    }
}

function pause() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    document.getElementById("laps").innerHTML = "";
}

function recordLap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        const lap = document.createElement("div");
        lap.innerText = formatTime(lapTime);
        document.getElementById("laps").appendChild(lap);
    }
}

function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    updateDisplay();
}

function updateDisplay() {
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = elapsedTime % 1000;
    document.getElementById("hours").innerText = padTime(hours);
    document.getElementById("minutes").innerText = padTime(minutes);
    document.getElementById("seconds").innerText = padTime(seconds);
    document.getElementById("milliseconds").innerText = padMilliseconds(milliseconds);
}

function padTime(time) {
    return time < 10 ? "0" + time : time;
}

function padMilliseconds(milliseconds) {
    return milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
}

function formatTime(time) {
    const date = new Date(time);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = date.getUTCMilliseconds();
    return padTime(hours) + ":" + padTime(minutes) + ":" + padTime(seconds) + ":" + padMilliseconds(milliseconds);
}
