// скрипт помошник с дополнительными функциями для index.js
const reindexId = (notes) =>{

    return notes.map((notes, index) => ({...notes, id:index + 1})); 
    // ... - все данные содержащиеся в notes
    // хотим сделать все такоеже кромн id
};

module.export = {reindexId};
