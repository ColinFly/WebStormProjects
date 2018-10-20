// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
/**
 * Created by colin on 18-10-9.
 */
var process = require('child_process');
function exec(shell) {
    process.exec(shell, function (error, stdout, stderr) {
        if (stdout!==null) {
            console.log(stdout);
            document.getElementById("textarea_trans_result").value=stdout

        }else
            console.log('stdout is null');

        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}

function devices() {
    console.log('adb devices');
    exec(`adb devices`)
}

function home() {
    console.log('home');
    exec(`adb shell input keyevent 3`);
}

function click() {
    console.log('click');
    exec(`adb shell input tap 400 600`);
    // setTimeout(back, 1000)
}
function swipe() {
    console.log('swipe');
    exec(`adb shell input swipe 400 800 400 0 500`);
    setTimeout(click, 20000)
}
function back() {
    console.log('back');
    exec(`adb shell input keyevent 4`);
    // setTimeout(swipe, 1000)
}

function itools() {
    console.log('itools')
    exec(`adb shell am start -n com.yftech.itools/.MainActivity`)
}
function voice() {
    console.log('voice');
    const cmd = 'python AipSpeech.py 你好,三菱';
    exec(cmd)
}
// swipe()
devices();
// speak('呵呵')
// voice()
// translate('agree');

function speak(txt) {
    exec('adb shell am broadcast  -a com.start.helpactivity');
    const cmd = 'python AipSpeech.py ' + txt;
    console.log(cmd);
    sleep(1500); //睡眠一秒

    exec(cmd);
}

function sleep(time){
    for( var temp = Date.now(); Date.now() - temp <= time;);
}

function translate(txt) {
    const cmd = 'trans -b en:zh ' + txt;
    console.log(cmd);
    exec(cmd)
}


document.getElementById("btn_back").onclick = function () {
    back();
}

document.getElementById("btn_reboot").onclick = function () {
    const cmd = 'adb shell reboot';
    console.log(cmd);
    exec(cmd);
};


const btnBack = document.getElementById('btn_back');
btnBack.addEventListener('click', function () {
    back()
});

document.getElementById("btn_home").onclick = function () {
    home();
};
document.getElementById("btn_itools").onclick = function () {
    itools();
};
document.getElementById("btn_voice").onclick = function () {
    voice();
};

document.getElementById("btn_translate").onclick = function () {
    //获取文本
    var text = document.getElementById("trans_text").value;
    // speak(text)
    translate(text)
};
var speech = document.getElementById("btn_speech");

speech.onclick = function () {
    //获取文本
    var text = document.getElementById("speech").value;
    speak(text)
};

document.getElementById("speech").addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("btn_speech").click();
    }
});



// Get the input field
var input = document.getElementById("trans_text");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the button element with a click
        document.getElementById("btn_translate").click();
    }
});