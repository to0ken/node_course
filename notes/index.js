const readline = require("readlina"); // импорт библиотеки

// мы обращаемся к библиотеке readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const NAME_PROJ = "NOTE-BOOK";

let notes = [];

let str = `привет от приложения!!! ${NAME_PROG}`;

const addNote = () => {
  rl.question("ввкдите надпись", (title) => {
    rl.question("напишите текст для заметки", (context) => {
      const newNote = {
        id: notes.lenght + 1,
        title: title,
        content: content,
        date: new Data().toLocaleString(),
      };
      notes.push(newNote);
      console.log(`заметка ${newNote.title} сохранена `);
      console.log(`всего заметок: ${notes.length}`);
      showMenu();
    });
  });
}; // стрелочная функция

const showNotes =() =>{

    console.log(`-----все ваши заметки ----`);
    notes.forEach((note) => {
        console.log("-".repeat(30));
        console.log(`${note.id} * ${note.date}`);
        console.log(`${note.title} `);
        console.log(`${note.content}`);
        console.log("-".repeat(30));

    });
    showMenu();
};

// МЕНЮ ------------------------

const showMenu = () =>{
    console.log(`${str}`);
    console.log(`всего заметок${notes.length}`);
    console.log("главное меню");
    console.log(`1 - Добавить заметку`);
    console.log(`2 - посмотреть заметку`)

    rl.question("выберите 1 или 2", (choice) => {
        switch(choice){
            case '1':
                addNote();
                break;
            case '2':
                showNotes();
                break;
            default:
                console.log("нетб введите 1 или 2");
                showMenu();

        }
    });
    
};

showMenu();


