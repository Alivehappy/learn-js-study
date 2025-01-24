/*document.body.innerHTML = 'hellk'
Math.round(2.3)//2




let user = new Object();// синтаксис "конструктор объекта"
let user = {} // синтаксис "литерал объекта"


let user = { // объект
    name: 'John'  // под ключом "name" хранится значение "John"
age: 30 // под ключом "age" хранится значение 30
};

// получаем свойства объекта:
alert(user.name);// John
alert(user.age)//30
user.isAdmin = true;
Для удаления свойства мы можем использовать оператор delete:
delete user.age;

Имя свойства может состоять из нескольких слов, но тогда оно должно быть заключено в кавычки:

let user = {
name:"John",
age: 30,
'likes birds': true /
Пустой объект («пустой ящик») можно создать, используя один из двух вариантов синтаксиса:

let user = new Object(); // синтаксис "конструктор объекта"
let user = {};  // синтаксис "литерал объекта"

Обычно используют вариант с фигурными скобками {...}. Такое объявление называют литералом объекта или литеральной нотацией.

Литералы и свойства
При использовании литерального синтаксиса {...} мы сразу можем поместить в объект несколько свойств в виде пар «ключ: значение»:

let user = {     // объект
  name: "John",  // под ключом "name" хранится значение "John"
  age: 30        // под ключом "age" хранится значение 30
};
У каждого свойства есть ключ (также называемый «имя» или «идентификатор»). После имени свойства следует двоеточие ":", и затем указывается значение свойства. Если в объекте несколько свойств, то они перечисляются через запятую.

В объекте user сейчас находятся два свойства:

Первое свойство с именем "name" и значением "John".
Второе свойство с именем "age" и значением 30.
Можно сказать, что наш объект user – это ящик с двумя папками, подписанными «name» и «age».


Мы можем в любой момент добавить в него новые папки, удалить папки или прочитать содержимое любой папки.

Для обращения к свойствам используется запись «через точку»:

// получаем свойства объекта:
alert( user.name ); // John
alert( user.age ); // 30
Значение может быть любого типа. Давайте добавим свойство с логическим значением:

user.isAdmin = true;

Для удаления свойства мы можем использовать оператор delete:

delete user.age;

Имя свойства может состоять из нескольких слов, но тогда оно должно быть заключено в кавычки:

let user = {
  name: "John",
  age: 30,
  "likes birds": true,  //имя свойства из нескольких слов должно быть в кавычках

  Объект, объявленный через const, может быть изменён

  const user = {
    name: "John"
  };
  user.name = 'Pete';
  alert(user.name); //Pete

  Может показаться, что строка (*) должна вызвать ошибку, но нет, здесь всё в порядке. Дело в том, что объявление const защищает от изменений только саму переменную user, а не её содержимое.

  Для свойств, имена которых состоят из нескольких слов, доступ к значению «через точку» не работает:

  // это вызовет синтаксическую ошибку
  user.likes birds = true
  Для таких случаев существует альтернативный способ доступа к свойствам через квадратные скобки. Такой способ сработает с любым именем свойства:

let user ={}
    user['likes birds'] = true;
    alert(user['likes birds']);// true
    delete user['likes birds'];
    let key = 'likes birds';
    user[key] = true;


    let user = {
        name: 'John',
        age: 30
    };
    let key = prompt("Что вы хотите узнать о пользователе?", "name")
    // доступ к свойству через переменную
alert( user[key] ); // John (если ввели "name")

Запись «через точку» такого не позволяет
let user ={
    name: 'John',
    age: 30
};
let key = 'name';
alert( user.key ); // undefined

let fruit = prompt("Какой фрукт купить?", "apple");
let bag = {
    [fruit]: 5 // имя свойства будет взято из переменной fruit
};
alert(bag.apple)// 5, если fruit="apple"
Смысл вычисляемого свойства прост: запись [fruit] означает, что имя свойства необходимо взять из переменной fruit. если посетитель введёт слово "apple", то в объекте bag теперь будет лежать свойство {apple: 5}.
 let fruit = prompt("Какой фрукт купить?", "apple");
 let bag = {};
bag[fruit] = 5// имя свойства будет взято из переменной fruit
alert(bag[fruit]);

let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 //  bag.appleComputers = 5
}

function makeUser(name, age){
  return{
    name: name,
    age: age
    // ...другие свойства
  };
}
let user = makeUser('John', 30);
alert(user.name);// John//Когда вы вызываете makeUser("John", 30), создается объект user, который будет выглядеть так: { name: "John", age: 30 }.
 function makeUser(name, age){
  return{
    name, // то же самое, что и name: name
    age // то же самое, что и age: age
  };
 }
 let user = {
  name, // тоже самое, что и name:name
  age: 30
 };
 let obj = {
  for: 1,
  lrt: 2,
  return: 3
 };
 alert(obj.for + obj.let + obj.return)//6
 Например, если использовать число 0 в качестве ключа, то оно превратится в строку "0":

let obj = {
  0: 'Test'// то же самое что и "0":'Test'
};
alert( obj['0']);// Тест
alert( obj[0] ); // Тест

Есть небольшой подводный камень, связанный со специальным свойством __proto__. Мы не можем установить его в необъектное значение:

let obj = {};
obj._proto_ = 5; // присвоим число
alert(obj.__proto__); // [object Object], значение - это объект, т.е. не то, что мы ожидали
При обращении к свойству, которого нет, возвращается undefined. Это позволяет просто проверить существование свойства:

let user = {};
alert(user.noSuchProperty === undefined)
// true означает "свойства нет"
'key' in object

let user = { age: 30 };
let key = 'age';
alert( key in user); // true, имя свойства было взято из переменной key
let obj = {
  test: undefined
};
alert(obj.test);//  выведет undefined, значит свойство не существует?
alert('test' in obj)// true, свойство существует!
Подобные ситуации случаются очень редко, так как undefined обычно явно не присваивается. Для «неизвестных» или «пустых» свойств мы используем значение null


Для перебора всех свойств объекта используется цикл for..in. Этот цикл отличается от изученного ранее цикла for(;;).

for (key in object){
  // / тело цикла выполняется для каждого свойства объекта
}

let user = {
  name: 'John',
  age: 30,
  isAdmin: true
};
for (let key in user){
  //ключи
alert (key);
// name, age, isAdmin
  // значения ключей
alert( user[key] );// John, 30, true
}Обратите внимание, что все конструкции «for» позволяют нам объявлять переменную внутри цикла, как, например, let key здесь.

Кроме того, мы могли бы использовать другое имя переменной. Например, часто используется вариант 
for(let prop in obj)

  let codes = {
    '49': "Германия",
    '41': "Швейцария",
    '44': "Великобритания",
    //...
    "1": "США"
  };
  for (let code in codes){
    alert(code); // 1, 41, 44, 49
  }//Короткий ответ: свойства упорядочены особым образом: свойства с целочисленными ключами сортируются по возрастанию, остальные располагаются в порядке создания. Разберёмся

  Math.trunc - //встроенная функция, которая удаляет десятичную часть
  alert( String(Math.trunc(Number('49'))) );// "49", то же самое ⇒ свойство целочисленное
  alert( String(Math.trunc(Number("+49"))) ); // "49", не то же самое, что "+49" ⇒ свойство не целочисленное
  alert( String(Math.trunc(Number("1.2"))) ); // "1", не то же самое, что "1.2" ⇒ свойство не целочисленное
  С другой стороны, если ключи не целочисленные, то они перебираются в порядке создания, например:

let user = {
  name: 'John',
  surname: 'Smith'
};
user.age = 25// добавим ещё одно свойство
// не целочисленные свойства перечислены в порядке создания
for (let prop in user) {
  alert(prop); // name, surname, age
}
Таким образом, чтобы решить нашу проблему с телефонными кодами, мы можем схитрить, сделав коды не целочисленными свойствами. Добавления знака "+" перед каждым кодом будет достаточно.

let codes = {
  '+49': 'Германия',
  '+41': 'Швейцария',
  '+44':"Великобритания",
//...,,
'+1': "США"
};
for (let code in codes){
  alert(+ code) 49, 41, 44, 1
}Запись через точку: obj.property.
Квадратные скобки obj["property"]. Квадратные скобки позволяют взять ключ из переменной, например, obj[varWithKey].
Дополнительные операторы:

Удаление свойства: delete obj.prop.
Проверка существования свойства: "key" in obj.
Перебор свойств объекта: цикл for for (let key in obj).

let user={
  name: 'John',
  surname: 'Smith',
}
user.name = 'Pete';
delete user.name;
 let user{}
 user.name = 'John';
 user.surname = 'Smith';
 user.name = 'Pete';
 delete user.name;

 let schedule = {};
 alert( isEmpty(schedule) ); // true
schedule['8:30'] = 'get up';
alert( isEmpty(schedule) );// false

for (let key in schedule){
alert(key)
}
 проверяем пуст ли объект
 function isEmpty(obj){
  for (let key in obj){
    return false;
  }
  return true;
 }//Если в объекте есть хотя бы одно свойство, тело цикла выполнится, и функция сразу вернет false.

Возврат false:

Если цикл выполняется хотя бы один раз, это означает, что объект не пуст, и функция возвращает false

let schedule = {};
console.log( isEmpty(schedule));/ true

schedule['8:30'] = 'get up';
console.log(isEmpty(schedule)); // false

const user = {
  name: 'hi'
};
user.name = 'lg';Конечно, это сработает без проблем.
user = 123//Ошибка
Объявление const защищает только саму переменную от изменений.

Другими словами, user хранит ссылку на объект. И это не может быть изменено. Но содержимое объекта менять можно

let salalries = {
  John: 100,
  Anna: 160,
  Pete: 130
}
function isEmpty(salalries){
for (let key in salalries){
return false;}// Если есть хотя бы одно свойство, объект не пуст
return true;}// Если свойств нет, объект пуст
let sum;
if (!isEmpty(salalries)){// Проверяем, не пуст ли объект
  sum = salalries.John + salalries.Anna + salalries.Pete}
  else{ sum = 0};

  let salalries ={
    John: 100,
  Ann: 160,
  Pete: 130
  };
  let sum = 0;
  for (let key in salalries){
    sum += salalries[key];
  } alert(sum);

  let menu ={
    width: 200,
    height: 300,
    title: 'Mu menu'
  };

  function multiplyNumeric (obj) {
  for (let key in obj){
    if(typeof obj[key] === 'number'){
    obj[key]*=2
  }
  }
  }
  multiplyNumeric(menu);
  console.log(menu);
 


  let menu ={
    width: 200,
    height: 300,
    title: 'Mu menu'
  };
  function multiplyNumeric(menu){
    for (let key in menu){
      if(typeof menu[key] === 'number'){
        menu[key]*=2
      }
    }
  }

  let salaries = {
    John: 100,
    Anna: 160,
    Pete:130
  }
  function sumSalaries(obj){
    let sum = 0;
  for(let key in obj){
    sum += obj[key]
  }
  return sum;
}
  alert(sumSalaries(salaries));


  let salaries = {
    John: 100,
    Anna: 160,
    Pete:130
  }
  let sum = 0;
  for (let key in salaries){
    sum += salaries[key]
  }
  console.log(sum);
  Если переменная sum не инициализирована, она будет иметь значение undefined по умолчанию. 


  let user = {
    name: 'John',
    age: 30,
    isAdmin: true
  };
  function removeProperty(property){
if( property in user ){
  delete user[property];
  return true;
}
  return false;}
  let result = removeProperty('name');
  console.log(result);
  console.log(user);
  
  Функция removeProperty предназначена для удаления конкретного свойства из объекта user, если оно существуетиспользовать оператор in, чтобы проверить, существует ли конкретное свойство, переданное в качестве аргумента. Если оно существует, вы можете удалить его с помощью delete user[property]; и вернуть true
  Оператор in используется для проверки, существует ли конкретное свойство в объекте. Например:
javascript

/* Копировать код
if ('property' in user) {
    // Действия, если свойство существует
}
Этот оператор возвращает true, если указанное свойство присутствует в объекте, и false в противном случае.

Цикл for...in

Цикл for...in используется для перебора всех перечисляемых свойств объекта. Например:
javascript

 Копировать код
for (let property in user) {
    console.log(property); // Выводит имя каждого свойства
    console.log(user[property]); // Выводит значение каждого свойства
}
 let person = {
 name: 'F',
 age: 13,
city: 'G'};

 function printPersonInfo(person){
  
    let info = `имя: ${person.name}, Возраст: ${person.age}, Город: ${person.city}`;
    console.log(info);
 }
 
 printPersonInfo(person);



 let person = {
  name: "F",
  age: 13,
  city: "G"
};
 let propertyName = "age"; // Здесь мы создали переменную 'propertyName', где храним строку "age"

// Теперь мы можем получить значение свойства 'age' используя переменную
console.log(person[propertyName]); // Это выведет 13
В этом примере:

propertyName — это переменная, хранящая имя свойства "age".

Мы использовали person[propertyName], чтобы получить значение свойства, используя имя, хранящееся в переменнойlet prop = name; // Без кавычек это будет ошибкой, если переменной 'name' не существует
console.log(person[prop]); // Это не получится
*/

let book = {
  title: "llLLL",
  author: "ooo",
  year: 2000,
};
function updateYear(obj, currentYear) {
  if ("year" in obj) {
    obj.year = currentYear;
  } else {
    console.log("нет ключа year");
  }
  return obj.year;
}
console.log(updateYear(book, 2001));
console.log(book.prototype);
console.log(book.__proto__);
