import * as fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_NAME = path.join(__dirname, "notes.json");

export const saveFile = (notes) => {
  const jsonData = JSON.stringify(notes, null, 2);
  fs.writeFileSync(FILE_NAME, jsonData);
};

export const loadFile = () => {
  try {
    const jsonData = fs.readFileSync(FILE_NAME, "utf-8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.log(`${error.message}`);
    return [];
  }
};

// Вспомогательная функция для генерации следующего ID для пользователя
const getNextNoteId = (notes, userId) => {
  const userNotes = notes.filter(note => note.owner_id === userId);
  if (userNotes.length === 0) return 1;
  const maxId = Math.max(...userNotes.map(note => note.id));
  return maxId + 1;
};

// 2.1 Получить заметки пользователя
export const getUserNotes = (userId) => {
  const notes = loadFile();
  return notes.filter(note => note.owner_id === userId);
};

// 2.2 Создать заметку
export const createNote = (userId, title, content) => {
  const notes = loadFile();
  
  const newNote = {
    id: getNextNoteId(notes, userId),
    owner_id: userId,
    title: title,
    content: content,
    date: new Date().toLocaleString(),
  };
  
  notes.push(newNote);
  saveFile(notes);
  return newNote;
};

// 2.3 Обновить заметку
export const updateNote = (userId, noteId, title, content) => {
  const notes = loadFile();
  const noteIndex = notes.findIndex(note => note.id === noteId && note.owner_id === userId);
  
  if (noteIndex === -1) {
    return null;
  }
  
  notes[noteIndex] = {
    ...notes[noteIndex],
    title: title,
    content: content,
    date: new Date().toLocaleString(),
  };
  
  saveFile(notes);
  return notes[noteIndex];
};

// 2.4 Удалить заметку
export const deleteNote = (userId, noteId) => {
  const notes = loadFile();
  
  const noteExists = notes.some(note => note.id === noteId && note.owner_id === userId);
  
  if (!noteExists) {
    return false;
  }
  
  const updatedNotes = notes.filter(note => !(note.id === noteId && note.owner_id === userId));
  
  // Переиндексируем ID оставшихся заметок пользователя
  const userNotesToReindex = updatedNotes.filter(note => note.owner_id === userId);
  const otherUsersNotes = updatedNotes.filter(note => note.owner_id !== userId);
  
  const reindexedUserNotes = userNotesToReindex.map((note, index) => ({
    ...note,
    id: index + 1
  }));
  
  const finalNotes = [...otherUsersNotes, ...reindexedUserNotes];
  
  finalNotes.sort((a, b) => {
    if (a.owner_id !== b.owner_id) return a.owner_id - b.owner_id;
    return a.id - b.id;
  });
  
  saveFile(finalNotes);
  return true;
};
