let id = Symbol() // Создаём новый символ - id
// Создаём символ id с описанием (именем) "id"
let id = Symbol('id')

let id1 = Symbol('id')
let id2 = Symbol('id')
alert(id1 == id2) // false Символы гарантированно уникальны. Даже если мы создадим множество символов с одинаковым описанием, это всё равно будут разные символы.
//Символы не преобразуются автоматически в строки
// К примеру, alert ниже выдаст ошибку:

let id = Symbol('id')
alert(id) // TypeError: Cannot convert a Symbol value to a string

let id = Symbol('id')
alert(id.toString()) // Symbol(id), теперь работает

//Или мы можем обратиться к свойству symbol.description, чтобы вывести только описание:

let id = Symbol('id')
alert(id.description) //
//Символы позволяют создавать «скрытые» свойства объектов, к которым нельзя нечаянно обратиться и перезаписать их из других частей программы

let user = {
	name: 'Dima',
}
let id = Symbol('id')
user[id] = 1
alert(user[id])

let id = Symbol('id')
user[id] = 'Их идентификатор'
//Конфликта между их и нашим идентификатором не будет, так как символы всегда уникальны, даже если их имена совпадают.
//id — это уникальный символ, даже если другой символ тоже имеет описание "id".

//Ключ user[id] гарантированно не конфликтует с другими свойствами объекта, даже если они имеют похожие имена.
let id = Symbol('id')
let user = {
	name: 'Din',
	[id]: 123, /// просто "id: 123" не сработает
}
//Это вызвано тем, что нам нужно использовать значение переменной id в качестве ключа, а не строку «id».
//Свойства, чьи ключи – символы, не перебираются циклом for..in.

let id = Symbol('id')
let user = {
	name: 'gin',
	age: 30,
	[id]: 123,
}
for (let key in user) alert(key)
// name, age (свойства с ключом-символом нет среди перечисленных)
// хотя прямой доступ по символу работает
alert('Напрямую: ' + user[id])
Object.keys(user) //также игнорирует символы.
//А вот Object.assign, в отличие от цикла for..in, копирует и строковые, и символьные свойства:
let id = Symbol('id')
let user = {
	[id]: 123,
}
let clone = Object.assign({}, user)
alert(clone[id]) // 123
//существует глобальный реестр символов. Мы можем создавать в нём символы и обращаться к ним позже, и при каждом обращении нам гарантированно будет возвращаться один и тот же символ.
//Для чтения (или, при отсутствии, создания) символа из реестра используется вызов Symbol.for(key).Он проверяет глобальный реестр и, при наличии в нём символа с именем key, возвращает его, иначе же создаётся новый символ Symbol(key) и записывается в реестр под ключом key.

// читаем символ из глобального реестра и записываем его в переменную
let id = Symbol.for('id') // если символа не существует, он будет создан
let idAgain = Symbol.for('id')
// читаем его снова и записываем в другую переменную (возможно, из другого места кода)
alert(id === idAgain) //true
//Символы, содержащиеся в реестре, называются глобальными символами. Если вам нужен символ, доступный везде в коде – используйте глобальные символы
//Для глобальных символов, кроме Symbol.for(key), который ищет символ по имени, существует обратный метод: Symbol.keyFor(sym), который, наоборот, принимает глобальный символ и возвращает его имя.

// получаем символ по имени

let sym = Symbol.for('name')
let sym2 = Symbol.for('id')
// получаем имя по символу
alert(Symbol.keyFor(sym)) // name
alert(Symbol.keyFor(sym2)) // id
//Внутри метода Symbol.keyFor используется глобальный реестр символов для нахождения имени символа. Так что этот метод не будет работать для неглобальных символов. Если символ неглобальный, метод не сможет его найти и вернёт undefined
//Впрочем, для любых символов доступно свойство description
L
let globalSymbol = Symbol.for('name')
let localSymbol = Symbol('name') /// name, глобальный символ
alert(Symbol.keyFor(globalSymbol)) //name, глобальный симво
alert(Symbol.keyFor(localSymbol)) // undefined для неглобального символа

alert(localSymbol.description) // name
//Если же мы действительно хотим вывести символ с помощью alert, то необходимо явно преобразовать его с помощью метода .toString(), вот так

let id = Symbol('id')
alert(id.toString()) // Symbol(id), теперь работает
alert(id.description) //id

//

const id = 'userId'
let user = {
	[id]: 123, // просто "id: 123" не сработает
}
user[id] = 5
console.log(user[id].toString())

let id = Symbol('id') //всегда перед объектом надо объявить символ
let id = Symbol.for('id') //читаем символ из глобального реестра и записываем его в переменнуюли символа не существует, он будет создан
let idAgain = Symbol.for('id')
// читаем его снова и записываем в другую переменную (возможно, из другого места кода)

// проверяем -- это один и тот же символ
alert(id === idAgain) // true
	/	//Символы, содержащиеся в реестре, называются глобальными символами. Если вам нужен символ, доступный везде в коде – используйте глобальные символы

	// Symbol.keyFor(sym), который, наоборот, принимает глобальный символ и возвращает его имя.
// получаем символ по имени

let sym = Symbol.for('name');
let sym2 = Symbol.for('id');

// получаем имя по символу
console.log(Symbol.keyFor(sym)); // name

console.log(Symbol.keyFor(sym2));// id

// Внутри метода Symbol.keyFor используется глобальный реестр символов для нахождения имени символа. Так что этот метод не будет работать для неглобальных символов.Если символ неглобальный, метод не сможет его найти и вернёт undefined

//Symbol.toPrimitive позволяет описать правила для объекта, согласно которым он будет преобразовываться к примитиву.

Квадратные скобки obj["property"]. Квадратные скобки позволяют взять ключ из переменной, например, obj[varWithKey].


user.sayHi = function() {
  alert("Привет!");


	function sayHi() {
  alert("Привет!");
}
// затем добавляем в качестве метода
user.sayHi = sayHi;


user = {
  sayHi: function() {
    alert("Привет");
  }


user = {
  sayHi() { // то же самое, что и "sayHi: function(){...}"
    alert("Привет");
  }
};


this.sayHi = function() {
    alert( "Меня зовут: " + this.name );
  };


function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

console.log(makeUser());

VM266:8 {name: 'John', ref: Window}
//возвращает глобальный объект


function makeUser() {
  return {
    name: "John",
    ref(){ this}
  };
}

console.log(makeUser());

VM280:8 {name: 'John', ref: ƒ}
//
//  Метод ref возвращает текущий объект

//поэтому его можно использовать для доступа к свойствам объекта через цепочку вызовов.


let user = makeUser();

console.log(user.ref().name); // "John"

user.ref():

Вызывается метод ref, который возвращает this (текущий объект).

В данном случае this — это объект user


Обычно конструкторы не используют return, потому что они автоматически возвращают новый объект (this).

Если return возвращает объект, конструктор вернет этот объект вместо this.

Если return возвращает примитив, он игнорируется, и конструктор возвращает this.

