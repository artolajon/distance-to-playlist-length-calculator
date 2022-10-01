let languageSelector = document.getElementById("language-selector");
let button = document.getElementById("calculate-button");
const StorageKey = "converter-output";


chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    button.addEventListener('click', () => {
        chrome.tabs.sendMessage(tabs[0].id, {action:"calculate", output: languageSelector.value});
    });
});

let current = localStorage.getItem(StorageKey);
if (current){
    languageSelector.value = current;
}
languageSelector.addEventListener('change', () => {
    localStorage.setItem(StorageKey,languageSelector.value);
});
