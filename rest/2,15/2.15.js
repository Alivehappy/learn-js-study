//я прошла темы в js : if || && ?? и присваивания switch for !== дай задачи  4
function showMessage(){
    alert("hey");
}showMessage();
// возвращаем новую функцию Вызов showMessage() выполняет код функции



 function B (){
    let message ="hey"
    alert(message);
 }
 B();// 
 alert(message)//<-- будет ошибка, т.к. переменная видна только внутри функции


 let userName = 'sam';
 function showMessage() {
    let message = "Hey" + userName;
    alert(message)
 }
 showMessage ()// hey sam


 let userName = 'Вася';
 function ShowMessage(){
   userName = 'Петя';//(1) изменяем значение внешней переменной
   let message = 'Hey' + userName;
   alert(message);
 }

 alert( userName ); // Вася перед вызовом функции
showMessage();
alert(userName)// Петя, значение внешней переменной было изменено функцией
//Внешняя переменная используется, только если внутри функции нет такой локальной.

let userName = 'Вася';
function showMessage(){

let userName = 'Петя';// объявляем локальную переменную
let message = 'Hey' + userName;//Петя
alert(message)
}// функция создаст и будет использовать свою собственную локальную переменную userName 
showMessage();

alert( userName ); // Вася, не изменилась, функция s
 
function showMessage (from, text){
alert(from + ": " + text);
}
showMessage('Аня', 'Привет!'); // Аня: Привет! (*)
showMessage('Аня', "Как дела?"); // Аня: Как дела? (**)

function showMessage (from, text) {// параметры: from, text
   alert(from + ': '+ text);}
showMessage ('Ann', 'hey');
showMessage('Ann', 'HRU?');

function showMessage(from, text){
   from = '*'+ from +'*';
   alert(from + ': ' + text);
}
let from = 'Ann';
showMessage(from, 'Hey')// *Аня*: Привет
// значение "from" осталось прежним, функция изменила значение локальной переменной
alert( from ); // Аня

showMessage ('Ann')//"*Аня*: undefined". В вызове не указан параметр text, поэтому предполагается, что text === undefined.

function showMessage(from, text = 'not here'){
   alert(from + ':' + text);
}
showMessage('Ann')// Аня: not here
function showMessage(from, text = anoutherFunction()){
// anotherFunction() выполнится только если не передан text
  // результатом будет значение text
}
 function showMessage(from, text){

   if (text === undefined){
      text = 'текст не добавлен'
   }
   akert(from + ':'+ text)
 }
function showMessage (from + ":" + text);{
   //Если значение text ложно, тогда присвоить параметру text значение по умолчанию
   // заметим, что при этом пустая строка text === "" будет также считаться отсутствующим значением
   text = text || 'текст не добавлен';

}
function showMessage(text){
alert(text?? 'unknown')
}showMessage(0); // 0
showMessage (null)// unknown
showMessage(); // неизвестно

function sum(a, b){
   return a+b
}
let result = sum(1,2)
alert (result); //3

function checkAge (age){
   if (age >=18){
      return true;
   }else{
      return confirm('А родители разрешили?');
   }
   }
let age = prompt('Сколько вам лет?', 18);
if (checkAge(age)){
   alert('Доступ получен');
}else {
   alert( 'Доступ закрыт' );
}
function showMovie(age){
   if (! checkAge(age)){
      return;
   }
   alert( "Вам показывается кино" ); // (*)
}//В коде выше, если checkAge(age) вернёт false, showMovie не выполнит alert

function doNothing(){/* пусто */ }
alert(doNothibg()=== undefined)// true
//Пустой return аналогичен return undefined:

function doNothing(){
   return;
}alert( doNothing() === undefined ); // true
return (
   some + long + expression
   + or +
   whatever * f(a) + f(b)
   )
  function showPrimes(n){
   nextPrime: for (let i =2; i< n; i++){
      for (let j = 2; j<i; j++){
         if (i%j ==0) continue nextPrime;

      }alert (i)
   }
  }
  function showPrime(n){
   for (let i =2; i<n; i++){
      if (!isPrime(i)) coctinue;
      alert(i)// простое

   }
  }
  function isPrime(n){
   for (let i = 2; i<n;i++){
      if (n%i==0) return false
   }return true
  }
   function checkAge(age){
      if (age>18){
         return true;}
         else{
            return confirm('Родители разрешили?');
         }
      }
   function CheckAge(age){
     return (age>18) ? true : confirm('Родители разрешили?')
   }

   function checkAge(age){
     return (age>18) || confirm('Родители разрешили?')
   }
   min(2, 5) == 2
   function min(a, b){
      if (a<b){
         return(a)}else{
            return(b)
         }
      }
   min(2, 5);
   
   min(1, 1);
 function min(a, b){
   return(a<b) ? a:b;
 } min (3, -1);
 P.S. В случае равенства a == b не имеет значения, что возвращать.

function pow(a, b){
   return(a**b)
} console.log(pow(3,2));
console.log(pow(3,3));
console.log(pow(1,100));
function pow(x, n){
  x = +prompt('введи число 3', '')
  n = +prompt('введи число 2', '')
  return x === 3 && n === 2 ? x**n: false
} alert(pow())
function pow(x, n){
   return x ===3 && n ===2 ? x**n: false;
}let x = +prompt('введи число 3', '');
let n = +prompt('введи число 2', '');
alert(pow(x, n));

function pow(x, n){
   let result = x;
   for (let i =1; i< n; i++){
      result *= x;
   }
   return result;
}
let x = prompt('x?', '');
let n = prompt('n?', '');
if(n >= 1 && n % 1 == 0){
   alert(pow(x, n));}
      else{
         alert(`Степень ${n} не поддерживается, используйте натуральное число`);
}

function factorial(n){
   let result = 1;// Начинаем с 1, так как факториал 0! = 1
   for(let i =1; i< n; i++) { // Цикл от 1 до n
      result *=i;// Умножаем результат на текущее значение i
   }
   return result; //Возвращаем итоговый результат
}
let n = +prompt('Введите натуральное число n:', ''); // Запрашиваем у пользователя число n
if(n >=1 && n%1===0){/ Проверяем, что n - натуральное число
   alert(`Факториал ${n} равен ${factorial(n)}`); // Вызываем функцию и показываем результат
}else {
   alert(`Число ${n} не поддерживается, используйте натуральное число`); // 
 //  Таким образом, условие n % 1 === 0 проверяет, что n является целым числом. Если это условие истинно, значит, n — натуральное число (больше или равно 1 и целое). Если n равно 5, то условие выполнится, и код продолжит выполнение. Если n равно 5.5, то условие не выполнится, и программа выведет сообщение об ошибке.

