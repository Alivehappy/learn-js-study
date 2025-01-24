let user = {
    name: 'John',
    age: 30
};
user.sayHi = function(){
    alert('Hi');
};
user.sayHi(); //Hi
Здесь мы просто использовали Function Expression (функциональное выражение), чтобы создать функцию приветствия, и присвоили её свойству user.sayHi нашего объекта
Функцию, которая является свойством объекта, называют методом этого объекта
Итак, мы получили метод sayHi объекта user

let user = {
    //
};
function sayHi(){
    alert("Привет!");
}
user.sayHi() = sayHi
user.sayHi// Привет!


user = {
    sayHi: function(){
        alert('Привет');
    }
};


user = {
    sayHi(){
        alert('Привет')
    }
};
Как было показано, мы можем пропустить ключевое слово "function" и просто написать sayHi().

Для доступа к информации внутри объекта метод может использовать ключевое слово this
Значение this – это объект «перед точкой», который используется для вызова метода.

let user = {
    name: "John",
    age: 30,
sayHi(){
    // "this" - это "текущий объект".
alert(this.name);
}
};
user.sayHi()// John  во время выполнения кода user.sayHi() значением this будет являться user (ссылка на объект user)\\\

const simpleUser = {
    name: 'John Doe',
    age: 37,
    title: 'Developer'
}
const s2leUser = Object.assign({}, simpleUser)

const s3leUser = structuredClone.clone(simpleUser)

function sayHi(){
    alert( this.name )
}

Значение this вычисляется во время выполнения кода, в зависимости от контекста.

Например, здесь одна и та же функция назначена двум разным объектам и имеет различное значение «this» в вызовах:

let user = { name: 'John'};
let admin = { name: 'Admin'};
function sayhi(){
    alert (this.name)
}
// используем одну и ту же функцию в двух объектах
user.f = sayHi;
admin.f = sayHi;
// эти вызовы имеют  разное значение this
// "this" внутри функции - это объект "перед точкой"
user.f(); //John)this == user)
admin.f(); //Admin this == admin
admin['f']()//Admin (нет разницы между использованием точки или квадратных скобок для доступа к объекту
Вы присваиваете функцию sayHi свойству .f объектов user и admin:
user.f = sayHi; — это означает, что у объекта user теперь есть метод f, который можно вызвать, и который будет ссылаться на функцию sayHi
Метод объекта в JavaScript — это функция, которая является свойством объекта. 

let car = {
    brand: 'Toyota',
    model: 'Camry',
    year: '2020',
    displayInfo: function(){
        console.log(`a: ${this.brand}, b:${this.model}, c: ${this.year}`);
    }
} //Чтобы вызвать метод, мы обращаемся к нему через объект:
car.displayInfo()
Правило простое: если вызывается obj.f(), то во время вызова f, this – это obj. Так что, в приведённом выше примере это либо user, либо admin.

Вызов без объекта: this == undefined
Мы даже можем вызвать функцию вообще без объекта:

function sayHi(){
    alert(this)
}
sayHi(); // undefined
Стрелочные функции особенные: у них нет своего «собственного» this. Если мы ссылаемся на this внутри такой функции, то оно берётся из внешней «нормальной» функции.

Например, здесь arrow() использует значение this из внешнего метода user.sayHi():

let user = {
    firstName: 'Ilya',
    sayHi() {
        let arrow = () => alert(this.firstName);
        arrow()
    }
};
user.sayHi();

let user = {
    firstName: 'Ilya',
    sayHi: function(){
        alert(this.firstName)
    }
}
user.sayHi();
Функции, которые находятся в свойствах объекта, называются «методами».
Методы позволяют объектам «действовать»: object.doSomething().
Методы могут ссылаться на объект через this.
При объявлении любой функции в ней можно использовать this, но этот this не имеет значения до тех пор, пока функция не будет вызвана.
Когда функция вызывается синтаксисом «метода» – object.method(), значением this во время вызова является object.


function makeUser(){
    return{
        name: 'John',
        ref: this
    };
}
let user = makeUser();
alert( user.ref.name);//Здесь значение this внутри makeUser() равно undefined, потому что оно вызывается как функция, а не через «точечный» синтаксис как метод.

function makeUser(){
    return{
        name: 'John',
        ref: null
    };
}
let user = makeUser();
user.ref = user; // Теперь ref ссылается на самого пользователя
alert(user.ref.name)

function Asr(obj){
    let count = 0;
    for(let key in obj){
        count++
    }
    return count;
}

const user = {
    name: "John",
    age: 30,
    city: "Moscow"
};
console.log(Asr(user));


    const copy2 = copyObject(user);
    console.log(copy2);const user = {
    name: "John",
    age: 30,
    city: "Moscow"};

    function copyObject(obj){
        let newObj = {};
        for(let key in obj){
        newObj[key] = obj[key]}
        return newObj;
    }
    const copy = structuredClone(user);
    console.log(copy);

    function logProperties(obj){
        for (let key in obj){
        
        console.log(`${key}: ${obj[key]}`)
    }
}
    const car = {
        brand: "Toyota",
        model: "Camry",
        year: 2020};
        logProperties(car)

        данном случае ${key} и ${obj[key]} позволяют динамически подставлять значения переменных key и obj[key] в строку.


    function samValues(obj){
        
        let total = 0;
        for(let key in obj){
            if(typeof obj[key] === 'number'){
total  += obj[key];
            }
        }
    return total
    };
    const numbers = {
        a: 10,
        b: 20,
        c: 30
    };
   console.log(samValues(numbers));
/* это фу, не пиши так больше

   let calculator = {
    function read(obj){
        let value1 = prompt('Введи первое число', '0');
        let value2 = prompt('Введи второе число', '0');

        obj.a = +value1;
        obj.b = +value2;};

        function sum(obj){
            let result1 = (obj.a + obj.b);
        };
        return result1;

        function nul(obj){
            let result2= (obj.a * obj.b)
        };
        return result2;
    
    };
    calculator.read();
    alert( calculator.sum() );
    alert( calculator.mul() );
   */
    Функция: Это независимый фрагмент кода, который можно вызвать из любого места кода. Обычно она определяется вне объектов.

    Метод: Это функцияя, которая является свойством объекта. Она вызывается в контексте объекта и может использовать свойства этого объекта.
    
typeof null //objectДля null возвращается "object" – это ошибка в языке, на самом деле это не объект.

typeof undefined // undefined

let value = true;
value1 = String(value);
console.log(typeof(value1));
Оператор «запятая» предоставляет нам возможность вычислять несколько выражений, разделяя их запятой ,. Каждое выражение выполняется, но возвращается результат только последнего.

Результат функции с пустым return или без него – undefined

function ask(question, yes, no){
    if (confirm(question)){
yes();
} else { no();

    }
}
const showOk = () => alert("Вы согласны.");
const showCancel = () => alert("Вы отменили выполнение.");
    ask("Вы согласны?", showOk, showCancel);


    В нашем случае, showOk становится колбэком для ответа «yes», а showCancel – для ответа «no».

let sum = (a, b) => a+b
let sum = function(a,b){
    return a+b;
};

alert( sum(1, 2) ); // 3
 let sayHi = () => console.log('hello');
 sayHi()

 let age = prompt("Сколько Вам лет?", 18);
 let welcome = (age < 18) ? 
 () => alert('Привет!') :
 () => alert('kkk!') ;
 welcome();


 let sum = (a, b) => {
    let result = a+b;
    return result;
 };
 alert(sum(1, 2))

 let a = 16;
 if( a >= 9) {
    console.log('yes');
 } 
else{
console.log('no');
 };

 const value = +prompt('fff', '') ;
 switch(value) {
        case 1: /// ===
        console.log('one');
        break;
        case 2: 
        console.log('two');
        break;
        case 3:
        console.log('three');
         break;
         default: 
         console.log(value);
 }

 let i = 0;
 while( i < 5){
    i++
    console.log(i);
 } .. 1 2 3 4 5

 let i = 0;
 while( i< 5){
    console.log(i); 
    i++
 } // 00 1 2 3 4 


 let i = 0 ;
 for (; i < 5;  i++ ){
    console.log(i);
 } // 0 1 2 3  4 4 
 let i = 0 ;
 for (; i < 5; ){
    console.log(i++)};

    function unixTime(){
        let time = Math.floor(new Date().getTime());
        console.log(time);
    }
    new Date();
    unixTime();

Эта конструкция создает новый объект типа Date, который представляет текущее время и дату на момент его создания.

function count(){
    c = 9
    c++
    console.log(c);
}
count();

cint = (c = 9) => { console.log(c++);}
cint();
  
function getrandomIt(){
    let min = 117;
    let max = 132;
    let random = Math.floor(min + Math.random() * (max + 1 - min));
    console.log(random);
}
getrandomIt();

function a(){
    c = 9
    v = 15
    a = 9+15
    console.log(a)}
    a();
    a();
    a();

    