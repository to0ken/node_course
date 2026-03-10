const readline = require("readlina");

// мы обращаемся к библиотеке readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const NAME_PROJ = "NOTE-BOOK";

let notes = [];

let str = `привет от приложения!!! ${NAME_PROG}`;

const addNote = () => {
  rl.question("ввкдите надпись", (title) =>{
    rl.question("напишите текст для заметки", (context) => {
      const newNote = {
        id: notes.lenght + 1,
        title:title,
        content: content,
        date: new Data().toLocaleString()
      
      };
    });
  });
};// стрелочная функция 
  
