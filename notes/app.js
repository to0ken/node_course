
const stats = document.getElementById('stats');
const content = document.getElementById('content');

let notes = [];

async function loadNotes(){
    try{
        const res = await fetch('/api/notes/')
        notes = await res.json();
        stats.innerText = `заметок ${notes.length}`
    }
    catch(error){
        console.log("Ошибка", error)
        stats.innerText = `иныормауии нет`

    }
}

loadNotes();
