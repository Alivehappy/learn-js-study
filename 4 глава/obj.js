const userInfo = {
    name:'sas',
    age: 30
};

let userInfo1 ={
name: 'sas',
age: 30,
'58' : 'meaning'
}
console.log(userInfo1[58]);//meaning
/*userInfo1[58] эквивалентно userInfo1['58'], потому что число 58 автоматически преобразуется в строку '58'.Ключ 58: Ключ 58 автоматически преобразуется в строку '58', но это не ошибка, а особенность JavaScript.
*/
let userInfo2 ={
    name: 'sas',
    age: 30, 
    showInfo(){
        console.log(`${this.name}`);//sas
    }
};
let userInfo2 ={
    name: 'sas',
    age: 30, 
    
};
showInfo(){
    console.log(`${this.name}`);
}// undefined
/*Контекст this: Если метод showInfo вызывается без контекста (например, как обычная функция), this будет неопределён (undefined или ссылаться на глобальный объект в нестрогом режиме).

*/

let user = {
    name: 'sas',
    age: 30,   
}
let value = user;
value.age = 45
console.log(user.age);/*Объекты в JavaScript передаются по ссылке. Это значит, что переменная value не создаёт новый объект, а просто ссылается на тот же объект, что и user.

*/

let user = userInfo;
userInfo = null;
user.showInfo();//Если userInfo изначально null или undefined, то код выбросит ошибку, Если userInfo изначально ссылается на объект с методом showInfo, то user.showInfo() выполнится

if (user && userInfo){
    user.showInfo()
}else{
    console.log('no');
};

let userInfo = {
    name: 'sas',
    age: 30,   
}
for(const key in userInfo){
    const value = userInfo[key];//key meaning
    console.log(value);/*На каждой итерации переменная key получает имя текущего свойства (в виде строки).

    userInfo[key]:
    
    Используется для получения значения свойства по его ключу.
    
    */
};
for(const key in userInfo){
    console.log(`key: ${key}, Valye: ${userInfo[key]}`);

    let userInfo = {
        name: 'sas',
        age: 30,
        adress:{
            city: 'Moscow',
        }  
    }
    for( const key in userInfo.adress){
        console.log(userInfo.adress[key]);
        console.log(key); // Выводим имя свойства (ключ)
        console.log(`Key: ${key}, Value: ${userInfo.adress[key]}`);
    }

    let userInfo ={
        name: 'sas',
        age: 30,
        'likes js': true
    }
    console.log(userInfo['likes js']);


    user = {
        sayHi: function() {
            alert('hi')
        }
    };

    user = {
        sayHi(){
            alert('hi')
        }
    };

    let user = {
        name: 'John',
        age: 30,
        sayHi(){
            // "this" - это "текущий объект".
console.log(this.name);
        }
    };
    user.sayHi();
/*Здесь во время выполнения кода user.sayHi() значением this будет являться user (ссылка на объект user). Значение this вычисляется во время выполнения кода, в зависимости от контекста*/

let user = {name: 'John'};
let admin = { name: 'Admin'};

function sayHi(){
alert(this.name);
}
// используем одну и ту же функцию в двух объектах
user.f = sayHi;
admin.f = sayHi;
// эти вызовы имеют  разное значение this
// "this" внутри функции - это объект "перед точкой"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); /* Admin (нет разницы между использованием точки или квадратных скобок для доступа к объекту)/*Если бы ты написал user.f = sayHi(), то функция sayHi была бы вызвана сразу, и её результат (если он есть) был бы присвоен свойству f/ user.f = sayHi — присваивает функцию как метод объекта, не вызывая её.
user.f = sayHi() — вызывает функцию сразу и присваивает её результат (если он есть) свойству f.Когда ты пишешь user.f, ты просто получаешь доступ к функции, но не вызываешь её.

*/
function sayHi() {
    alert(this);
  }
  
  sayHi(); // undefined
  
  //Стрелочные функции особенные: у них нет своего «собственного» this. Если мы ссылаемся на this внутри такой функции, то оно берётся из внешней «нормальной» функции.

let user = {
    firstName: 'Ilya',
    sayHi(){
        let arrow = () => alert(this.firstName);
        arrow()
    }
};
user.sayHi()//Ilya


const obj = {
    prop: 123,
    method() {
        console.log(this.prop);
    }
}; 
obj.method() // 123

//const copy = Object.assign(copy, obj);// copy тут не объект нельхя так написаьт
const copy = Object.assign({}, obj)
console.log(copy);

//{prop: 123, method: ƒ}
const a = Object.assign(obj , {prop: 1});
console.log(obj); 
console.log(copy); 

//Объект obj уже был объявлен ранее, и у него есть свойство prop со значением 123 и метод method
/*Object.assign(obj, {prop: 1}) изменяет свойства объекта obj. Метод Object.assign копирует значения всех перечисляемых собственных свойств из источников (в данном случае из объекта { prop: 1 }) в целевой объект (в данном случае obj).

Объект obj будет изменен. Значение свойства prop у obj будет перезаписано значением 1 из переданного объекта.

Вывод в консоль: Когда вы вызываете console.log(obj)*/

123 -  вызов метода
 {prop: 123, method: ƒ}method: ƒ method()prop: 123[[Prototype]]: Object //вызов copy
 {prop: 1, method: ƒ} //console.log(obj); вызоб с измененнным свойством
 {prop: 123, method: ƒ} //console.log(copy);

 console.log('obj', obj).//Это вызов функции console.log, который выводит в консоль строку 'obj' и значение переменной obj.
 console.log('copy', copy);
 console.log(copy === obj); //false создали новый объект copy с помощью Object.assign, вывод будет false, так как они ссылаются на разные объекты.

console.log(JSON.stringify(obj)); //преобразует объекта встоку без методов {"prop":1}
//строгий режим делает невозможным случайное создание глобальных переменных
//В строгом режиме присваивание NaN значения выбрасывает исключение.
//в strict Mode ключевое слово this должно выполняться только в контексте объекта.
//This — это ссылка на контекст исполнения функции. Таким образом получается, что this тесно связан именно с функциями и рассматривается относительно них. Вне функции this будет ссылаться на глобальный контекст
//Для функций, объявленных через function f( ) { }, this вычисляется в момент вызова и равен объекту перед точкой. Если такого объекта нет — тогда this будет указывать на глобальный контекст (window)
//Для стрелочных функций this определяется в момент их создания и больше никогда не изменяется
//Договоримся, что везде используется 'use strict', поэтому в глобальной области видимости this всегда будет undefined, а не window. например Стрелочная функция указывает на window, потому что она была создана внутри глобального контекста (window).

//this имеет смысл только относительно функции, потому что this указывает на контекст исполнения функции
//Поведение this в методах объекта одинаково как в строгом, так и в нестрогом режиме. this ссылается на объект, в контексте которого вызван метод
const obj = {
  value: 42,
  showThis() {
    console.log(this);
  }
};

obj.showThis(); // { value: 42, showThis: [Function: showThis] }
//Если функция используется как конструктор (с ключевым словом new), this ссылается на новый созданный объект.

let obj ={
prop: 123,
method: () => {
console.log(this);
}
};
console.log(obj.method());//undefined
const m = obj.method;
const m = obj.method.bind(obj);//строке const m = obj.method.bind(obj); вы создаете новую функцию m, которая будет иметь this, установленным на obj. Однако, поскольку method — это стрелочная функция, bind не будет работать так, как вы ожидаете. Переменная m всё равно будет стрелочной функцией, и значение this остается прежним
m();//Так как method определена в глобальной области (вне каких-либо других функций), this будет ссылаться на глобальный объект (или на undefined в строгом режиме).
//Здесь вы создаете переменную m, которая ссылается на то же самое, что и obj.method. Однако, когда вы вызываете m(), this все равно не указывает на obj, а ссылается на родительскую лексическую область. Поэтому вы получите undefined, если вы попытаетесь обратиться к this//

const obj1 = {
prop: 456
}
obj1.method = m;
obj1.mrthod()//error m не определена