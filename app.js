const SONG_DURATION = 3.5;

// let button = document.getElementById("calculate-button");
// button.addEventListener('click', calculate);
chrome.runtime.onMessage.addListener(message => {
    if(message.action == "calculate")
        calculate(message.output);
});
function calculate(template){
    let divs = Array.from(document.querySelectorAll('div.fontHeadlineSmall'))
    let myDivs = divs.filter(el => el.textContent.match(/\s(h|min)/g));
    
    myDivs?.forEach(el=>{
        let songNumber = calculateSongs(el.textContent);
        let output = template.replace('{0}', songNumber);
        el.textContent = output;
    })
    
}

function calculateSongs(input){
    let minutes = parseToMins(input);

    return (minutes / SONG_DURATION).toFixed(2).replace(/(\.|0)+$/g,'');
}

function parseToMins(input){
    let inputList = input.match(/\d+\s(h|min)/g);
    let result=0;
    inputList?.forEach(item=>{
        let number = parseFloat(item.match(/\d+/g)[0]);
        if (item.endsWith('h')){
            number = number * 60.0;
        }
        result += number;
    })
    return result;
}