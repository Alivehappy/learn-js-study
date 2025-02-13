'use strict'

function makeUser() {
	return {
		name: 'John',
		ref: this,
	}
}
let user = makeUser()
alert(user.ref.name)
/*Код пытается получить доступ к свойству name объекта, на который ссылается user.ref.
user.ref равно undefined Таким образом, ref: this фактически принимает текущее this функции makeUser,*/
function makeUser() {
	return {
		name: 'John',
		ref() {
			return this
		},
	}
}
let user = makeUser()
alert(user.ref().name) //Теперь это работает, поскольку user.ref() – это метод. И значением this становится объект перед точкой ..когда вызывается user.ref(), this внутри ref будет ссылаться на объект user.

let calculator = {
	read() {
		this.a = +prompt('paste a', 0)
		this.b = +prompt('paste b', 0)
	},
	sum() {
		return this.a + this.b
	},
	mul() {
		return this.a * this.b
	},
}

calculator.read()
alert(calculator.sum())
alert(calculator.mul())
//числа сохраняются в свойствах a и b объекта calculator

let ladder = {
	step: 0,
	up() {
		this.step++
	},
	down() {
		this.step--
	},
	showStep: function () {
		alert(this.step)
	},
}

ladder.up()
ladder.up()
ladder.down()
ladder.showStep() // 1
ladder.down()
ladder.showStep() // 0
/*Чтобы методы объекта ladder можно было вызывать по цепочке (chaining), каждый метод должен возвращать сам объект (this) Цепочка вызовов (chaining) возможна, потому что каждый метод возвращает сам объект (this). Это позволяет вызывать следующий метод сразу после предыдущего.




let ladder = {
    step: 0,
    up(){
        this.step++;// this ссылается на объект ladder
return this;// возвращаем объект ladder
    }
}**/
let ladder = {
	step: 0,
	up() {
		this.step++
		return this
	},
	down() {
		this.step--
		return this
	},
	showStep: function () {
		alert(this.step)
		return this
	},
}
ladder.up().up().down().showStep().down().showStep()

/*let i = 0;
while (true) {
  console.log(i);
  i++;
  if (i >= 5) break; // Выход из цикла
}

for(let i = 0; i<=5; i++ ){
    console.log(i);
}


let number = +prompt('number', '1')
for (let i = 1; i <= 10; i++){
        console.log(`${i} * ${number} = ${i * number }`)
}

function fun(n) {
	let result = 1
	for (let i = 1; i <= n; i++) {
		result *= i
	}
	return result
}
fun(5)
*/
//1. key in user
//Это оператор проверки наличия свойства в объекте. Он возвращает true, если свойство key существует в объекте user, и false, если его нет.
let user = {
	name: 'anna',
	age: 20,
}
console.log('name' in user)
//for (let key in user)
//Это цикл, который перебирает все перечисляемые свойства объекта. На каждой итерации переменная key получает имя очередного свойства

let user = {
	name: 'Анна',
	age: 25,
}
for (let key in user) {
	console.log(key + ':' + user[key])
}
//user[key] — это правильный способ получить значение свойства объекта по ключу.

//user['key'] ищет свойство с именем 'key', которого нет в объекте, и возвращает undefined.
