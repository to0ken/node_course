// лист пользователей
let users = [];

// ======================== сохранить пользователя =======================
export const saveUsers =() => {
  localStorage.setItem("users", JSON.stringify(users));
}

// ================ загрузить ==================
export const loadUsers =()=> {
  const saved = localStorage.getItem("users");
  if (saved) {
    users = JSON.parse(saved);
  }
}

// ================ регистрация ==================
export const registerUser = (username, password) => {
  // проверка на пустые поля
  if (!username || !password) {
    return { success: false, error: "Заполните все поля!" };
  }
  
  // поиск пользователя
  const userExists = users.find((user) => user.username === username);
  
  if (userExists) {
    return { success: false, error: "Пользователь уже существует!" };
  }
  
  // создаем нового пользователя
  const newUser = {
    id: users.length + 1,
    username: username,
    password: password,
  };
  
  users.push(newUser);
  saveUsers();
  
  return { 
    success: true, 
    user: { id: newUser.id, username: newUser.username } 
  };
}

// ================ вход ==================
export const loginUser = (username, password) => {
  // проверка на пустые поля
  if (!username || !password) {
    return { success: false, error: "Заполните все поля!" };
  }
  
  // поиск пользователя
  const user = users.find((user) => user.username === username);
  
  if (!user) {
    return { success: false, error: "Пользователь не найден!" };
  }
  
  if (user.password !== password) {
    return { success: false, error: "Неверный пароль!" };
  }
  
  return { 
    success: true, 
    user: { id: user.id, username: user.username } 
  };
}

// events


// start app
loadUsers();
// renderUsers();
// registerUser();
// loginUser();
