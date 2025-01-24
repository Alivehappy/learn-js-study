function sayHi(){Function Declaration (Объявление
    alert('hi');
}
let sayHi = function(){
    alert('hi');Function Expression
};Поскольку создание функции происходит в контексте выражения присваивания (с правой стороны от =), это Function Expression.

Давайте повторим: независимо от того, как создаётся функция – она является значением. В обоих приведённых выше примерах функция хранится в переменной sayHi.
function sayHi(){
    alert('Hi');
} 
alert(sayHi)// выведет код функции
функция хранится в переменной sayHi
function sayHi(){// (1) создаём
    alert('Hi');
}
let func =sayHi;// (2) копируем
func(); // Привет     // (3) вызываем копию (работает)!
sayHi(); // Привет    //     эта тоже все ещё работает (почему бы и нет)
Объявление Function Declaration (1) создаёт функцию и помещает её в переменную с именем sayHi.
let sayHi = function() { // (1) создаём
    alert( "Привет" );
  };
  
  let func = sayHi
  строке (2) мы скопировали её значение в переменную func. Обратите внимание (ещё раз): нет круглых скобок после sayHi. Если бы они были, то выражение func = sayHi() записало бы результат вызова sayHi() в переменную func, а не саму функцию sayHi.
  Теперь функция может вызываться как sayHi
  function sayHi() {
    // ...
  }
  
  let sayHi = function() {
    // ...
  };
  Точка с запятой нужна там для более простого присваивания, такого как let sayHi = 5;, а также для присваивания функции
  
  
  function ask(question, yes, no){
    if(confirm(question)) yes()
    else no();
  }
  function showOk() {
alert ("Вы согласны." );
  }
  function showCancel() {
    alert( "Вы отменили выполнение." );
  }
  // использование: функции showOk, showCancel передаются в качестве аргументов ask
ask("Вы согласны?", showOk, showCancel);
Аргументы showOk и showCancel функции ask называются функциями-колбэками или просто колбэками.
. В нашем случае, showOk становится колбэком для ответа «yes», а showCancel – для ответа «no».

function ask(question, yes, no){
    if (confirm(question)) yes()
        else no()
}
ask(
    "Вы согласны?",
function(){alert ("Вы согласились."); },
function() { alert("Вы отменили выполнение."); }
);

Function Declaration: функция объявляется отдельной конструкцией «function…» в основном потоке кода.

// Function Declaration
function sum(a, b) {
  return a + b;
}
Function Expression: функция, созданная внутри другого выражения или синтаксической конструкции. В данном случае функция создаётся в правой части «выражения присваивания» =:

// Function Expression
let sum = function(a, b) {
  return a + b;
};
Function Expression создаётся, когда выполнение доходит до него, и затем уже может использоваться.

В результате функции, созданные как Function Declaration, могут быть вызваны раньше своих определений.

sayHi ('вася');
function sayHi(name){
  alert(`привет, ${name}`);
}Функция sayHi была создана, когда движок JavaScript подготавливал скрипт к выполнению, и такая функция видна повсюду в этом скрипте.

Если бы это было Function Expression, то такой код вызвал бы ошибку:

sayHi("Вася"); // ошибка!

let sayHi = function(name) {  // (*) магии больше нет
  alert( `Привет, ${name}` );
};
Функции, объявленные при помощи Function Expression, создаются тогда, когда выполнение доходит до них. Это случится только на строке, помеченной звёздочкой (*). Слишком поздно.

let age = 16
if (age < 18){
  welcome(); /////выполнится
  function welcome(){//
    alert('hy');//выполнится
  }
  welcome();//
} else{
  function welcome(){
alert('hello')
  }
}// здесь фигурная скобка закрывается,
// поэтому Function Declaration, созданные внутри блока кода выше -- недоступны отсюда.

welcome(); // Ошибка: welcome is not defined
Что можно сделать, чтобы welcome была видима снаружи if?

Что можно сделать, чтобы welcome была видима снаружи if?

Верным подходом будет воспользоваться функцией, объявленной при помощи Function Expression, и присвоить значение welcome переменной, объявленной снаружи if, что обеспечит нам нужную видимость.

Такой код заработает, как ожидалось:

let age = prompt("Сколько Вам лет?", 18);
let welcome;
if (age < 18){
  welcome = function(){
    alert('hy')
  };else{
    welcome = function(){
      alert('hello')
    };
  }welcome(); // теперь всё в порядке
 
  let age = prompt("Сколько Вам лет?", 18);
  let welcome = (age< 18)?
  function(){alert('hy');} :
  function(){alert('hello');};
  Функции – это значения. Они могут быть присвоены, скопированы или объявлены в любом месте кода.
  Если функция объявлена как отдельная инструкция в основном потоке кода, то это “Function Declaration”.
  Если функция была создана как часть выражения, то это “Function Expression”.
  Function Declaration обрабатываются перед выполнением блока кода. Они видны во всём блоке.
  Функции, объявленные при помощи Function Expression, создаются только когда поток выполнения достигает их.



  function startGame (question= "R u wanna start game", yes, no)//Ваш код определяет функцию startGame, которая принимает три параметра: question, yes и no. Параметр question имеет значение по умолчанию, равное строке "R u wanna start game". */
  { if (confirm(question)){
    yes()}else{no()}}
function gameAccepted(){
  let num = 0;
let findNum = Math.floor((Math.random()*(5))+1)
for(let i = 0; i < 3; i++){
  num = + prompt('find number between 1 to 5 u have 3 attempts')
  if(num === findNum){
    return(
      alert('u won'),
      startGame ('would you like to continue the game?',gameAccepted,gameDenied))
  } else if (num > findNum){
    alert(`Number ${num} more then find number`)
  }else {alert(`Number ${num} less then find number`)
}
}
return(
  alert('u loss'),
  startGame('would you like to continue the game?', gameAccepted,  gameDeneid)){
function gameDenied(question= 'r u sure u r leaving the game?',yes, no ){
  if(confirm(question)){
    yes(alert('Bye bye'))
  }else{return startGame(R u wanna start game',gameAccepted,gameDenied)}
  }

  startGame('R u wanna start game',gameAccepted,gameDenied)

Math.floor(Math.random()) — это комбинация двух функций в JavaScript, которая используется для генерации случайных целых чисел. Давайте разберем каждую часть подробнее:

1. Math.random()

Math.random() — это встроенная функция, которая возвращает случайное число с плавающей запятой в диапазоне от 0 (включительно) до 1 (не включительно). Это означает, что результат может быть 0, но никогда не будет равен 1.

2. Math.floor()

Math.floor(x) — это функция, которая округляет число x вниз до ближайшего целого. Например:

Если вы хотите получить случайное целое число от 0 до 4, вы можете использовать следующий код:


javascript

 Копировать код
let randomNum = Math.floor(Math.random() * 5); // Генерирует случайное число от 0 до 4
Math.random() генерирует случайное число от 0 до 1.


    

Когда это число умножается на любое значение (например, 5), мы получаем число в диапазоне от 0 до 5 (не включая 5).

    

Затем, применяя Math.floor(), мы округляем это число вниз, что дает нам целые числа от 0 до 4.



let func = (arg1, arg2, ... argN)=> expression;  /// =
let func = function(arg1, arg2, ...argN){
  return expression;
}

let sum = (a, b)=> a+b/* Эта стрелочная функция представляет собой более короткую форму:

let sum = function(a, b) {
  return a + b;
};alert( sum(1, 2) ); // 3

*/
Как вы можете видеть, (a, b) => a + b задаёт функцию, которая принимает два аргумента с именами a и b. И при выполнении она вычисляет выражение a + b и возвращает результат.

Если у нас только один аргумент, то круглые скобки вокруг параметров можно опустить, сделав запись ещё короче

let double = n => n*2
let double = function(N){return n*2}
alert( double(3) ); // 6
let sayHi = () => alert ('hello');
sayHi();
let age = prompt('Сколько Вам лет?', 18);
let welcome = (age < 18)?
() => alert('Привет!'):
() => alert("Здравствуйте!");
welcome();

let sum = (a, b) =>{
  let result = a + b;
  return result;// если мы используем фигурные скобки, то нам нужно явно указать "return"
};
alert (sum(1, 2))//3

Без фигурных скобок: (...args) => expression – правая сторона выражения: функция вычисляет его и возвращает результат. Скобки можно не ставить, если аргумент только один: n => n * 2.
С фигурными скобками: (...args) => { body } – скобки позволяют нам писать несколько инструкций внутри функции, но при этом необходимо явно вызывать return, чтобы вернуть значение.


function ask(question, yes, no){
  if (confirm(question)) yes()
    else no()
}

ask("Вы согласны?",
function(){alert("Вы согласились.");},
function(){alert("Вы отменили выполнение.");});

function ask(question, yes, no){
  if (confirm(question)) yes()
    else no()
} ask ("Вы согласны?",
  ()=>alert("Вы согласились."),
  () => alert("Вы отменили выполнение.")
);

function ask (text, yes, no) =>
{confirm(question)? yes(): no()};
ask('confirm',
  () => alert('You confirmed'),
  () => alert("You cancelled")

  function addNumbers(a, b){
    return (a+b)
  }

  const addNumbers(a, b) =>(a+b);

  function isEven (n){
    if (n % 2 === 0){
      alert(true)}else{alert(false)}
    }
const isEven (n) => { return(n % 2 === 0)? 'true': 'false};
  