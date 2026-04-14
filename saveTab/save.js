// Получить все вкладки
const allTabs = await chrome.tabs.query({});

// Получить активную вкладку в текущем окне
const [activeTab] = await chrome.tabs.query({
  active: true, // Только активные вкладки
  currentWindow: true, // Только в текущем окне
});

// Создать новую вкладку
await chrome.tabs.create({
  url: "https://example.com",
});

// Закрыть вкладку
await chrome.tabs.remove(tabId);

// Обновить вкладку
await chrome.tabs.reload(tabId);


// Сохранить данные (локальное хранилище)
await chrome.storage.local.set({ 
    key: "value" 
});

// Прочитать данные
const result = await chrome.storage.local.get(['key']);
console.log(result.key); // "value"

// Удалить данные
await chrome.storage.local.remove(['key']);

// Очистить всё хранилище
await chrome.storage.local.clear();

// Когда вкладка создана
chrome.tabs.onCreated.addListener((tab) => {
    console.log('Tab created:', tab.id);
});

// Когда вкладка закрыта
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    console.log('Tab removed:', tabId);
});

// Когда вкладка активирована (переключились на неё)
chrome.tabs.onActivated.addListener((activeInfo) => {
    console.log('Activated tab:', activeInfo.tabId);
});

// Когда URL вкладки изменился
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        console.log('URL changed to:', changeInfo.url);
    }
});

// При установке расширения
chrome.runtime.onInstalled.addListener((details) => {
    console.log('Extension installed/updated');
});

// Получить элемент
const button = document.getElementById('myButton');

// Изменить текст
button.textContent = 'New Text';

// Добавить обработчик клика
button.addEventListener('click', () => {
    console.log('Button clicked!');
});

// async/await
async function myFunction() {
    const tabs = await chrome.tabs.query({});
    console.log(tabs);
}

// Promise.then
chrome.tabs.query({}).then((tabs) => {
    console.log(tabs);
});


// Изменить стиль
element.style.color = 'red';
