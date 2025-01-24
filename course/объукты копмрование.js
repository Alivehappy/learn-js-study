/*const scores = {
    math: 90,
    english: 85,
    science: 88,
    history: 92
};
function sumScores(scores){
    let total =0;
    for(let key in scores){
total +=scores[key];
    }
    return total;
}
console.log(sumScores(scores));



const people = [
  { name: "Иван", age: 20 },
  { name: "Анна", age: 17 },
  { name: "Никита", age: 16 },
  { name: "Женя", age: 23 },
  { name: "Егор", age: 18 },
];
function filterAdults(arr) {
  const adult = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].age < 18) {
      adult.push(arr[i]);
    }
  }

  return adult;
}
console.log(filterAdults(people));
 
function createUser(name, age){
  return{
    name: name,
    age: age,
    greet: function(){
      console.log(`hi, my name is ${this.name}`);
    }
  }

}
const user= createUser("Иван", 20);
console.log(user.greet());
user.greet();


 function updateUser( user, newAge){

 }

 const user = {name: "Анна", age: 17}
 

 function makeUser (name, age){
  return{
    name: name,
     age: age
  };
 }
 let user = makeUser("John", 30);
 alert(user.name)

 let user = { name: 'John', age: 30}
 alert('age' in user); // true user.age сущ
 alert('name' in user)
 Обратите внимание, что слева от оператора in должно быть имя свойства. Обычно это строка в кавычках.
 Если мы опускаем кавычки, это значит, что мы указываем переменную, в которой находится имя свойства. Например:
 
 
 let user = {
  age: 30
 };
 let key ='age'
 alert(key in user) // true, имя свойства было взято из переменной key

 let user{
  name: "John",
  age: 30,
  isAdmin: true
 };
 for (let key in user){
  alert(key )// name, age, isAdmin
  // значения ключей
alert(user[key])//John, 30, true
 }*/


 let user = {};
 user.name = 'John';
 user.surname = 'Smith';
 user.name = 'Pete';
 delete user.name

 let schedule = {};
 alert(isEmpty(schedule));
 schedule['8:30'] = 'get up';
 alert(iEmpty(schedule));

let schedule ={
 value = '8:30' 
};
function isEmpty(schedule){
for (key in schedule){
  return false;}
      return true;
    
    
};


let salaries = {
  john: 100,
  Anna: 160,
  Pete: 130
};
function Sumalaries(obj){
  let total =0;
  for (let key in obj){
   total += obj[key]
  }
  return(total)
};
console.log(Sumalaries(salaries));


let sum = 0;
for(let key in salaries){
  sum  += salaries[key]
}
console.log(sum);


let menu = {
  width: 200,
  height: 300, 
  titlr: 'My menu'
};
function multiplyNumeric(obj){
  for(let key in obj){
    if (typeof obj[key] === 'number'){
    obj[key] *= 2}
  }
  return obj
}
console.log(multiplyNumeric(menu));

multiplyNumeric(menu)
console.log(menu);


let a = {};
let b = a ;
alert( a==b);// true, обе переменные ссылаются на один и тот же объект
alert(a === b)// true
let a = {};
let b = {}; // два независимых объекта
alert(a == b)//false


свойства могут быть и ссылками на другие объекты.
let user = {
  name: 'John',
  sizes:{
    height: 182,
width: 50
  }
};
alert(user.sizxes.height);//182


let user = {
  name: "John",
sizes{
  height: 182,
  width: 50

}
};
let clone = Object.assign({}, user);
alert( user.sizes === clone.sizes); // true// user и clone обладают общим свойством sizes
user.sizes.width++
alert(clone.sizes.width)// 51, видим результат в другом


let user = {
  name: "John",
  age: 30
};
let clone = {};
for(let key in user){
 clone[key] = user[key];
}// теперь clone это полностью независимый объект с тем же содержимым
clone.name = 'Pete';// изменим в нём данные
alert(user.name)// все ещё John в первоначальном объекте

Object.assign(dest, [src1, src2...])
dest — целевой объект
Остальные аргументы src1, ..., srcN (может быть столько, сколько необходимо) являются исходными объектамиМетод копирует свойства всех исходных объектов src1, ..., srcN в целевой объект dest. Другими словами, свойства всех аргументов, начиная со второго, копируются в первый объект.
Возвращает объект dest.
let user = {name: 'John'};
let permissions1 = {canView: true};
let permissions2 = {canEdit: true};
Object.assign( user, permissions1, permissions2);
// теперь user = { name: "John", canView: true, canEdit: true }
Если скопированное имя свойства уже существует, оно будет перезаписано:

let user = { name: 'John'};
Object.assign(user, {name: "Pete"});
alert(user.name)//теперь user = { name: "Pete" }
При копировании переменной объекта копируется ссылка, но сам объект не дублируется.

Например:

let user = { name: "John" };

let admin = user; // копируется ссылка
 
let user = {
  name: 'John',
  age: 30
};
let clone = Object.assign({}, user);

let user = {
  name:  'John',
  sazes: {
    height: 182,
    width: 50
  }
};
alert (user.sizes.height);//182
let clone = Object.assign({})

let user = {
  name: 'John',
  age: 30
}
let clone = Object.assign({}, user);
alert (user.sizes === clone.sizes)// true,
// user и clone обладают общим свойством sizes
user.sizes.width++;
alert(clone.sizes.width); // 51, видим результат в другом
В этой строке создается новый объект clone, в который копируются только свойства верхнего уровня объекта user. Однако, так как свойство sizes является объектом, то вместо создания новой копии этого объекта Object.assign просто копирует ссылку на объект sizes. Таким образом, user.sizes и clone.sizes указывают на один и тот же объект в памяти.


function marry(man, woman){
  woman.husband = man;
  man.wife = woman;
  return {
    father: man,
    mother: woman
  }
}
let family = marry({
  name: 'John'},
  {name: 'Ann'}
});

function isEven(num) {
  if(num % 2 === 0){
    return true;
  }else{
    return false
  }
}
onsole.log(isEven(4));

console.log( isEven(5));

