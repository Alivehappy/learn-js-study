{
  let user = {};// пользователь без свойства "address"
//alert(user.adress.street);// Ошибка!
//Это ожидаемый результат. JavaScript работает следующим образом. Поскольку user.address имеет значение undefined, попытка получить user.address.street завершается ошибкой
/*В веб-разработке мы можем получить объект, соответствующий элементу веб-страницы, с помощью специального вызова метода, такого как document.querySelector('.elem'), и он возвращает null, когда такого элемента нет.
*/}

{
  let html = document.querySeleector('.elem').innerHTML// ошибка, если он равен null
}
{
  let user = {};
  alert(user.adress ? user.adress.street : undefined);
  let html = document.querySelector('.elem') ? document.querySelector('.elem').innerHTML : null
}
{
  let user = {};
  alert(user.address ? user.address.street ? user.address.street.name : null : null);
}
  {let user = {};
  alert(user.address && user.address.street && user.address.street.name)
}
//Опциональная цепочка ?. останавливает вычисление и возвращает undefined, если значение перед ?. равно undefined или null.

{
  let user = {}; // пользователь без адреса
  alert(user?.address?.street); // undefined (без ошибки)
}
 { let html = document.querySelector('.elem')?.innerHTML; // будет undefined, если элемента нет Если document.querySelector('.elem') возвращает null, то опциональная цепочка (?.) остановит дальнейшее выполнение и вернёт undefined.
}
 { let user = null;
  alert(user?.address);
  alert(user?.address.street)
}
//Переменная должна быть объявлена (к примеру, как let/const/var user или как параметр функции). Опциональная цепочка работает только с объявленными переменными.Как было сказано ранее, ?. немедленно останавливает вычисление, если левая часть не существует.

//Так что если после ?. есть какие-то вызовы функций или операции, то они не произойдут

{
  let user = null;
  let x = 0;
  user?.sayHi(x++) // нет "user", поэтому выполнение не достигает вызова sayHi и x++
  alert(x); // 0, значение не увеличилось

  //?.() используется для вызова функции, которая может не существовать
}

let userAdmin = {
    admin(){
        alert('i am admin')
    }
};

let userGuest = {};
userAdmin.admin?.(); // i am admin
userGuest.admin?.();/// ничего не произойдет (такого метода нет)
//Здесь в обеих строках мы сначала используем точку (userAdmin.admin), чтобы получить свойство admin, потому что мы предполагаем, что объект userAdmin существует, так что читать из него безопасно.


//Затем ?.() проверяет левую часть: если функция admin существует, то она запускается (это так для userAdmin). В противном случае (для userGuest) вычисление остановится без ошибок.

let key = 'firstName';
let  user1 = {
    firstName: 'John'
}
let user2 = null;
alert(user1[key])//// John
alert( user2?.[key]); // undefined

delete user?.name//удаляет user.name если пользователь существует
let user = null;
user?.name = 'John'// Ошибка, не работает
// то же самое что написать undefined = "John"

/*obj?.prop – возвращает obj.prop если obj существует, в противном случае undefined.
obj?.[prop] – возвращает obj[prop] если obj существует, в противном случае undefined.
obj.method?.() – вызывает obj.method(), если obj.method существует, в противном случае возвращает undefined.*/
 let user = {
  profile:{
    name: 'Alice'
  }
 };
 console.log(user.profile.age); //undefined (возраст не существует)
console.log(user.settings.theme); // Ошибка: Cannot read property 'theme' of undefined

console.log(user.settings?.theme);// undefined (без ошибки)
//Здесь ?. проверяет, существует ли settings. Если settings равно null или undefined, выполнение останавливается, и возвращается undefined.

const user = {
  sayHello(){
    return 'Hello';
  }
};
console.log(user.sayGoodbye?.()); //undefined (метод не существует)


const user = {};
console.log(user.profile?.name ?? "Guest");// "Guest" (если name undefined или null)

const company = {
  name: "Tech Corp",
department :{
  development: {
    teamLead : 'Alice'
  }
}
};
if(company.department.development?.teamLead){
  console.log(company.department.development.teamLead);
}else{
  console.log("No team lead");
}

const user = {
  name: 'John',
  adress: null,
 showAdress(){
  return 'next street'
 }
};
console.log(user.adress?.city ? user.adress.city : "Unknown city");
console.log(user.showAdress?.());

const user =  {
name: 'John',
details : {
  age: 30
}
};
console.log(user.details?.['age']); //30
console.log(user.details?.['street']);







/* примеры из рнд
//null & undefined
console.log("1. undefined + undefined >>", undefined + undefined); // nan
console.log("2. null - 100 >>", null - 100); // -100
console.log("3. null + undefined >>", null + undefined); //nan
console.log("4. undefined > 0 >>", undefined > 0); //false
console.log("5. null === 0 >>", null === 0); // false
console.log("6. undefined > null >>", undefined > null); // false
const doNothing = () => {};
console.log("7. doNothing() >>", doNothing()); // undefined
console.log("8. undefined >= 0 >>", undefined >= 0); //false
console.log("9. 
   >>", null + null); //0
console.log("10. null/null >>", null / null); // 0//Деление 0 / 0 в математике является неопределённой операцией, поэтому результат будет NaN (Not-a-Number).


console.log("11. undefined === 0 >>", undefined === 0); // false
console.log("12. null > 0 >>", null > 0); // false
console.log("13. null - null >>", null - null); // 0
const object = {};
console.log("14. object.name >>", object.name); // undefined
console.log("15. undefined == 0 >>", undefined == 0); // false
console.log("16. undefined < null >>", undefined < null); // false
console.log("17. undefined + 1 >>", undefined + 1); // nan
console.log("18. undefined >= null >>", undefined >= null); // false
console.log("19. undefined == null >>", undefined == null); // true
console.log("20. null < 0 >>", null < 0); //false
console.log("21. null >= 0 >>", null >= 0); // true
console.log("22. undefined <= 0 >>", undefined <= 0); // false
console.log("23. null <= 0 >>", null <= 0); //true
console.log("24. undefined > 0 >>", undefined < 0); // false
console.log("25. null == 0 >>", null == 0); // false
console.log("26. undefined <= null >>", undefined <= null); // false
function sum(a, b) {
  return a + b;
}

console.log("27. sum(1) >>", sum(1)); //nan   
console.log("28. null ==  >>", null == false); // false
console.log("29. undefined == false >>", undefined == false); //false
console.log("30. null == undefined >>", null == undefined); // true



/// 
///typeof
console.log("1. typeof function() {} >>", typeof function () {}); // func
console.log("2. typeof 3.14 >>", typeof 3.14); // number
console.log("3. typeof '' >>", typeof ""); // string
console.log("4. typeof 'something' >>", typeof "something"); // string
console.log(
  "5. typeof new Promise() >>",
  typeof new Promise((resolve, reject) => {})
); // object
console.log("6. typeof 1 >>", typeof typeof 1); //string
console.log("7. typeof null >>", typeof null); //object 
console.log("8. typeof alert >>", typeof alert); // function
console.log("9. typeof true >>", typeof true); //boolean
console.log("10. typeof 37 >>", typeof 37); // number
console.log("11. typeof {a: 1} >>", typeof { a: 1 }); // object
console.log("12. typeof undefined >>", typeof undefined); // undefined
console.log("13. typeof new Date() >>", typeof new Date()); // function
console.log("14. typeof [1, 2, 4] >>", typeof [1, 2, 4]); //object
console.log("15. typeof Math.sin() >>", typeof Math.sin()); // number
console.log("16. typeof Math >>", typeof Math); // object Это возвращает строку "object", потому что Math является встроенным объектом в JavaScript, который содержит математические константы и функции.
console.log("17. typeof false >>", typeof false); // boolean 
console.log("18. typeof class C {} >>", typeof class C {}); // fucntion

let obj1 = {
  set: "name",
  func: () => {}
};
console.log("19. typeof obj.set >>", typeof obj1.set); // string
console.log("20. typeof obj.func >>", typeof obj1.func); // function
console.log("21. typeof Symbol('new') >>", typeof Symbol("new")); // symbol


// Converting

console.log("1. Boolean(0) >>", Boolean(0)); // false
console.log("2. !0 >>", !0); //true 
console.log("3. !!0 >>", !!0); // false
console.log("4. !!{} >>", !!{}); //true
console.log("5. !![] >>", !![]); // true
console.log("6. Boolean(+0) >>", Boolean(+0)); //false
console.log("7. !!new Boolean(0) >>", !!new Boolean(0)); //Создание объекта Boolean: new Boolean(0) создает объект типа Boolean. true
console.log("8. typeof [] >>", typeof []); // object
console.log("9. typeof null >>", typeof null); // object
console.log("10. typeof function () {} >>", typeof function () {}); //fucntion
console.log("11. [] instanceof Array >>", [] instanceof Array); //
console.log("12. Array.isArray([]) >>", Array.isArray([])); // 
console.log("13. 0 === 0 >>", 0 === 0); // true
console.log("14. Number('0') >>", Number("0")); // 0
console.log("15. NaN === NaN >>", NaN === NaN); // false
console.log("16. 0 === '0' >>", 0 === "0"); // false
console.log("17. [] === [] >>", [] === []); /false

const key = "age";
const person = { name: "Анна", age: 30 };

const { [key]: userAge } = person;

console.log(userAge);*/