function SayHi() {
	console.log('hello')
}
SayHi() //нет смысла в debugger

let a = 1 + 2
debugger //останавливает и проверяет
console.log(a)
/*Watch– показывает текущие значения для любых выражений.

Вы можете нажать на + и ввести выражение. Отладчик покажет его значение, автоматически пересчитывая его в процессе выполнения.

Call Stack – показывает цепочку вложенных вызовов.

В текущий момент отладчик находится внутри вызова hello(), вызываемого скриптом в index.html (там нет функции, поэтому она называется “анонимной”).

Если вы нажмёте на элемент стека (например, «anonymous»), отладчик перейдёт к соответствующему коду, и нам представляется возможность его проанализировать.

Scope показывает текущие переменные.

Local показывает локальные переменные функций, а их значения подсвечены прямо в исходном коде.

В Global перечисляются глобальные переменные (то есть вне каких-либо функций).

Там также есть ключевое слово this, которое мы ещё не изучали, но скоро изучим.*/

function j() {
	let c = 3 + 1
	return c
	debugger
}
console.log(j() == 5) //false
