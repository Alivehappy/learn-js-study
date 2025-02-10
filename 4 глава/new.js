function User(name){
    this.name = name;//// Устанавливаем свойство name, равное аргументу name

    this.isAdmin = false; // Устанавливаем свойство isAdmin по умолчанию в false

}
let user = new User('Jack');
alert(user.name); // jack
alert(user.isAdmin)// false

function User(name){
    //this = {}; (неявно)
//добавляет свойства к this
this.name = name;
  this.isAdmin = false;
//return this (неявно)

}

//Таким образом, let user = new User("Jack") возвращает тот же результат, что и:

let user = {
    name: 'Jack',
   isAdmin: false
};
 /*Когда мы используем оператор new перед вызовом функции, JavaScript делает несколько вещей:

Создает новый пустой объект.

Устанавливает его прототип на User.prototype.

Вызывает функцию User, передавая ей этот новый объект как this.

Если функция User ничего не возвращает (или возвращает значение, не являющееся объектом), то new возвращает объект, созданный на первом шаге.
Использование и доступ к свойствам
javascript

 Копировать код
alert(user.name); // Jack
alert(user.isAdmin); // false
Объяснение использования:

После создания объекта user, мы можем обращаться к его свойствам, как к любому другому объекту в JavaScript: используя точечную нотацию (user.name и user.isAdmin).

В данном случае user.name вернет строку 'Jack', а user.isAdmin вернет false.

function User(name) {
    this.name = name;
    this.isAdmin = false;
}

let user1 = new User('Alice');
let user2 = new User('Bob');

console.log(user1.name); // Alice
console.log(user2.isAdmin); // false
console.log(typeof user1);
Внутри функции User используется ключевое слово this, которое ссылается на создаваемый объект.

Когда вы вызываете new User('Alice'), JavaScript выполняет следующие шаги:

Создает новый пустой объект: {}.

Устанавливает this на этот новый объект.

Выполняет код функции User, добавляя свойства к объекту:

this.name = name; // this.name = 'Alice'
this.isAdmin = false; // this.isAdmin = false
Возвращает созданный объект.

Ключевое слово new вызывает функцию User, которая создает новый объект, добавляет свойства (name и isAdmin) и возвращает его.

 *///
 // создаём функцию и сразу же вызываем её с помощью new
let user = new function(){
    this.name = 'John';
    this.Admin = false
    //Такой конструктор не может быть вызван снова, так как он нигде не сохраняется, просто создаётся и тут же вызывается.
}

//Используя специальное свойство new.target внутри функции, мы можем проверить, вызвана ли функция при помощи оператора new или без него.

//В случае обычного вызова функции new.target будет undefined. Если же она была вызвана при помощи new, new.target будет равен самой функции.

function User() {
    alert(new.target)
}// без "new":
User(); // undefined
// с "new":
new User(); // function User { ... }

function User(name) {
    if (!new.target){// в случае, если вы вызвали меня без оператора new
        return new User(name)  // ...я добавлю new за вас
    }
    this.name = name;
}
let john = User('John')// переадресовывает вызов на new User
alert(john.name) // John
/*Обычно конструкторы не имеют оператора return. Их задача – записать все необходимое в this, и это автоматически становится результатомНо если return всё же есть, то применяется простое правило:

При вызове return с объектом, вместо this вернётся объект.
При вызове return с примитивным значением, оно проигнорируется*/

function BigUser(){
    this.name = 'John';
    return { name: "Godzilla"}; // <-- возвращает этот объект

}
alert( new BigUser().name );  /* Godzilla, получили этот объект
Создание объекта:

Когда вы вызываете new BigUser(), JavaScript создаёт новый пустой объект и связывает его с this.

Установка свойства this.name:

Внутри функции выполняется this.name = "John". Теперь объект, на который ссылается this, имеет свойство name со значением "John".

Возврат объекта:

Затем функция возвращает новый объект { name: "Godzilla" }.

Поскольку возвращаемое значение — это объект, он заменяет объект, созданный с помощью new.

Результат:

new BigUser() возвращает объект { name: "Godzilla" }.

alert(new BigUser().name) обращается к свойству name этого объекта,
Если функция-конструктор не возвращает объект (или возвращает примитивное значение), то результатом вызова new BigUser() будет объект, созданный с помощью new*/
function BigUser(){
    this.name = 'John';
    return 42; // Примитивное значение

}

let user = new BigUser();
alert(user.name)// John
//Функция возвращает 42, но это примитивное значение, поэтому оно игнорируется.

//Результатом вызова new BigUser() становится объект, созданный с помощью new, со свойством name: "John".

function SmallUser(){
    this.name = 'John';
    return; //<-- возвращает this
}
alert (new SmallUser().name)// John
//return с объектом возвращает этот объект, во всех остальных случаях возвращается this.

let user = new User;
// то же, что и
let user = new User();

function User(name){
    this.name = name;
    this.sayHi = function (){
        alert("Меня зовут: "  + this.name);
    };
}
let john = new User('John');
john.sayHi();// Меня зовут: John
/*
john = {
name:'John",
sayHi: function(){ ... }}
Функции-конструкторы следует вызывать только с помощью new. Такой вызов подразумевает создание пустого this в начале и возврат заполненного в конце*/

let user = {};
user.name = "юзер1";
console.log(user.name);

let user1 = new Object();

user1.name = "юзер2";
console.log(user1.name);

function User(name, age) {
  this.name = name;
  this.age = age;
  this.city = "Msk";
  this.showName = function () {
    return this.name;
  };
}

let user1 = new User("alex", 18);
console.log(user1.showName());

var a = 1;

let obj = {
  a: 2,
  show: () => {
    return this.a;
  },
};

console.log(obj.show());
//В JavaScript объекты (экземпляры функций-конструкторов или классов) всегда уникальны. Даже если два объекта созданы с одинаковой структурой, они не будут равны друг другу при сравнении с помощью операторов == или ===.

function A(){ ... }
function B(){ ... }
let a = new A();
let b = new B();
alert(a==b)//false
/*Объекты уникальны:

Каждый вызов конструктора (например, new A() или new B()) создаёт новый объект в памяти.

Даже если объекты имеют одинаковую структуру, они ссылаются на разные области памяти
Операторы == и === для объектов проверяют, ссылаются ли они на один и тот же объект в памяти.

В вашем случае a и b — это два разных объекта, созданных разными конструкторами (A и B), поэтому a == b вернёт false.
Чтобы сравнение объектов возвращало true, они должны ссылаться на один и тот же объект
*/

function A (){...}
let a = new A();
let b = a;
a == b//true


let obj = {};
function A(){return obj;}
function B(){return obj;}
console.log(new A() == new B());//true

//Точка с запятой требуется только после функциональных выражений, например:

javascript
Copy
const A = function() { return obj; };
  а тут декларация


  function Calculator(){
this.read = function(){
  this.a = +prompt('a','0');
  this.b = +prompt('b','0');
};
this.sum = function(){
  return this.a + this.b
};
this.mul = function(){
  return this.a * this.b
} 
  }
  
  let calculator = new Calculator();
calculator.read();
alert('Sum =' + calculator.sum());
alert('Mul=' + calculator.mul());//[все методы надо вызвать ]


function Accumulator(startingValue){
  this.value = startingValue,
  this.read = function(){
    this.a = +prompt('num?', '0');
    this.value = startingValue + this.a;
    return this.value;
  }
}
let accumulator = new  Accumulator(1);
accumulator.read();
alert(accumulator.value);
//this.read = function() {
  //this.value += +prompt('Сколько нужно добавить?', 0);
/*user.sayHi = function() {
  alert("Привет!");
  так добавляем метод к объекту


так внутри 


let user = {
  sayHi() {
    alert("Привет!");
  }
};

user.sayHi(); // Привет!
//

user = {
  sayHi: function() {
    alert("Привет");
  }
};
Без скобок: Когда вы хотите присвоить функцию как метод объекта.


user.sayHi = sayHi; // sayHi — это функция, которая станет методом
Со скобками: Когда вы хотите вызвать функцию и присвоить её результат.

user.sayHi = sayHi(); // sayHi() — это результат вызова функции

*/
function User(name, age){
this.name = name;
this.age = age;
this.sayHi = function(){
  console.log(`hello, i am ${this.name} and i am ${this.age} old`);
}
}
let user = new User('Anna', 25);
user.sayHi();

//2

function Ladder () {
   this.step = +prompt('num?', '0');
  this.stepUp = function(){
this.step += 1
return this;
  }
  this.stepDown = function() {
    this.step -= 1;
    return this;
  }
  this.showStep = function(){
    console.log(this.step);
    return this;
  }
}
let ladder = new Ladder();

ladder.stepUp().stepUp().stepDown().showStep()


let a = {
  step: +prompt('p?', '0'),
  stepUp(){
    this.step++;
    return this.step;
    
  },
  stepDown(){
    this.step--;
    return this.step;
  },
  showStep(){
    return this.step;
  
  }
}
console.log(a.stepUp(), a.stepDown(), a.showStep());


function Book(){
  this.title = +prompt('title');
  this.author = +prompt('author');
  this.age = +prompt('age');
  this.getInfo = function(){
    console.log(`${this.title} by ${this.author}, ${this.age}`)

  }
}
let obj = new Book();
obj.getInfo()


function Yes(){
this.num = 5;
this.up = function (){
this.num++;
return this.num;
};
this.down = function(){
  this.num--;
  return this.num
}
}
let yes1 = new Yes();
console.log(yes1.up()); 
console.log(yes1.up()); 
console.log(yes1.down());


function info (name, age){
this.name = name;
this.age = age;
console.log(`i am ${this.name}, ${this.age} years old`);
}
info('a1', 14) ///or


let Person (name,  age) {
  this.name ='1',
  this.age = 1,
  this.introduce(){
    console.log(`i am ${this.name}, ${this.age} years old`); 
  }
}
this.introduce();
this.celebrateBirthday = function(){
  console.log(`Теперь мне ${++this.age} лет!`); 

};


let user = new Person( 'B', 12);
user.celebrateBirthday()
user.introduce();
user.celebrateBirthday();      
user.introduce();