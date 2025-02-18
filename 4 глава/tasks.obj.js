'use strict'

{
	function makeUser() {
		return {
			name: 'John',
			ref: this,
		}
	}
	let user = makeUser()
	alert(user.ref.name)
}
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
{
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
}
{
	function User(name, age) {
		this.name = name
		this.age = age
		this.sayHi = function () {
			console.log(`hello, i am ${this.name} and i am ${this.age} old`)
		}
	}
	let user = new User('Anna', 25)
	user.sayHi()
}
//2

{
	function Ladder() {
		this.step = +prompt('num?', '0')
		this.stepUp = function () {
			this.step += 1
			return this
		}
		this.stepDown = function () {
			this.step -= 1
			return this
		}
		this.showStep = function () {
			console.log(this.step)
			return this
		}
	}
	let ladder = new Ladder()

	ladder.stepUp().stepUp().stepDown().showStep()
}
{
	let a = {
		step: +prompt('p?', '0'),
		stepUp() {
			this.step++
			return this.step
		},
		stepDown() {
			this.step--
			return this.step
		},
		showStep() {
			return this.step
		},
	}
	console.log(a.stepUp(), a.stepDown(), a.showStep())
}
{
	function Book() {
		this.title = +prompt('title')
		this.author = +prompt('author')
		this.age = +prompt('age')
		this.getInfo = function () {
			console.log(`${this.title} by ${this.author}, ${this.age}`)
		}
	}
	let obj = new Book()
	obj.getInfo()
}

{
	function Yes() {
		this.num = 5
		this.up = function () {
			this.num++
			return this.num
		}
		this.down = function () {
			this.num--
			return this.num
		}
	}
	let yes1 = new Yes()
	console.log(yes1.up())
	console.log(yes1.up())
	console.log(yes1.down())
}

{
	function info(name, age) {
		this.name = name
		this.age = age
		console.log(`i am ${this.name}, ${this.age} years old`)
	}
	info('a1', 14) ///or
}

{
	function Person(name, age) {
		;(this.name = name),
			(this.age = age),
			(this.introduce = function () {
				console.log(`i am ${this.name}, ${this.age} years old`)
			}),
			(this.celebrateBirthday = function () {
				console.log(`Теперь мне ${++this.age} лет!`)
			})
	}

	let user = new Person('B', 12)
	user.celebrateBirthday()
	user.introduce()
	user.celebrateBirthday()
	user.introduce()
}

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
{
	let user = {
		name: 'anna',
		age: 20,
	}
	console.log('name' in user)
}
//for (let key in user)
//Это цикл, который перебирает все перечисляемые свойства объекта. На каждой итерации переменная key получает имя очередного свойства

{
	let user = {
		name: 'Анна',
		age: 25,
	}
	for (let key in user) {
		console.log(key + ':' + user[key])
	}
}
//user[key] — это правильный способ получить значение свойства объекта по ключу.

//user['key'] ищет свойство с именем 'key', которого нет в объекте, и возвращает undefined.
