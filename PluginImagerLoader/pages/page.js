// =====================================================================
// СООБЗЕНИЕ
// =====================================================================

chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>{
    addImagesToConteiner(message.urls)
    sendResponse("Ok");
});

// ВСЕ КАРТИНКИ 

function addImagesToConteiner(urls){
    
    // document.writeText(JSON.stringify(urls))
    const content = document.getElementById(".content");
    urls.forEach(url => renderImage(content, url));

}

// ======================================================================
// ОТРИСОВКА КАЖДОЙ КАРТИНКИ
//=======================================================================

function renderImage(content, url){
    if (!url) {
      return;
    }
    const div = document.createElement("div");
    div.className = "div-img";
    const img = document.createElement("img");
    img.src = url;
    div.appendChild(img);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("url", url)
    div.appendChild(checkbox)
    content.appendChild(div);

}

//=======================================================================
// ОБРАБОТЧИК КНОКИ ЗАКГРУЗКИ АРХИВА
//=======================================================================
document.getElementById("dawnload-btn")
.addEventListener("click", async() => {
    const urls = getImageUrl();
    const archive = await createArchive(urls);
    downloadArchive(archive);

    
});

//=======================================================================
// ЧЕКБОКС
//=======================================================================
document.getElementById("select-all").addEventListener("change", (event) =>{
  const items = document.querySelectorAll(".content input");
  for (let item in items) {
    item.checked = event.target.checked;
  }
})


//=======================================================================
// создание архива
//=======================================================================
async function createArchive(urls) {
  const zip = new JSZip();

  for (let [index, url] of urls.entries()) {
    const response = await fetch(url);
    const blob = await response.blob();
    zip.file(checkFileName(index, blob), blob);
  }

  return zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });
}


//=======================================================================
// загрузка архва
//=======================================================================
function downloadArchive(archive) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(archive);
  link.download = "images.zip";
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
}



//=======================================================================
// установка имен на картинки
//=======================================================================

function checkFileName(index, blob) {
  let name = parseInt(index) + 1;
  const [type, extension] = blob.type.split("/");

  return name + "." + extension;
}

// ======================================================================
// фкнуция подбора выделеннвх картинок
// ======================================================================

function getImageUrl(){
    const urls = Array.from(document.querySelectorAll(".content input"))
    .filter(item => item.checked).map(item => item.getAtribute("url"));

    return urls;

}
