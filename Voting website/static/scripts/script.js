let logBtn = document.getElementById('regBtn')
let regBtn = document.getElementById('logBtn')
let closeLog = document.getElementById('closeLog')
let closeReg = document.getElementById('closeReg')

let logWind = document.getElementById('regModal')
let regWind = document.getElementById('logModal')

logBtn.addEventListener('click', function(){
    logWind.style.display = 'flex'
})

regBtn.addEventListener('click', function() {
    logWind.style.display = 'none'
    regWind.style.display = 'flex'
})

closeLog.addEventListener('click', function(){
    logWind.style.display = 'none'
})

closeReg.addEventListener('click', function(){
    regWind.style.display = 'none'
})