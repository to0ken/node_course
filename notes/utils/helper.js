// скрипт помошник с дополнительными функциями для index.js
const reindexId = (notes) =>{

    return notes.map((notes, index) => ({...notes, id:index + 1})); 
    // ... - все данные содержащиеся в notes
    // хотим сделать все такоеже кромн id
};

const statsNotes = (notes) => {
    console.log(`Всего заметок ${notes.lenght}`);
}

module.exports = {reindexId, statsNotes};
