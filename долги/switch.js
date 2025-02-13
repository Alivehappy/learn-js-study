let a = 3
switch (a) {
	case 1:
		console.log(1)
		break
	case 2:
		console.log(2)
		break
	case 3:
		console.log(3)
		break
	default:
		console.log('default')
} //  норм код

// с функцикй внутри можно, главное вызвать ее

let a = 1
switch (a) {
	case 1:
		function func(a) {
			console.log(a)
		}
		func(a)
		break
	case 2:
		console.log(2)
		break
	case 3:
		console.log(3)
		break
	default:
		console.log('default')
}
// alert в качестве значения - можно . В JavaScript функции являются объектами, и они сравниваются по ссылке. Поскольку a и alert ссылаются на одну и ту же функцию, сравнение a === alert возвращает true.

let a = alert
switch (a) {
	case alert:,

		console.log(1)
		break
	case 2:
		console.log(2)
		break
	case 3:
		console.log(3)
		break
	default:
		console.log('default')
}
//  с функциями - Конструкция switch сама по себе не возвращает результат, но вы можете использовать switch внутри функции и возвращать результат из функции:
// здесь присваиваю а саму функцию

   let getA = function () {
      return getA
    };
    let a = getA
switch (a) {
	case getA:
		console.log(1)
		break
	case 2:
		console.log(2)
		break
	case 3:
		console.log(3)
		break
	default:
		console.log('default')
}

//Блок default отсутствует: Если ни один case не совпал, и блок default отсутствует, то ничего не происходит.
// здесь присваиваю а результат вызова без дефолта
   let getA = function () {
      return 8
    };
    let a = getA ()
switch (a) {
	case 7:
		console.log(1)
		break
	case 2:
		console.log(2)
		break
	case 3:
		console.log(3)
		break
	
}

// Без функции нельзя использовать return внутри switch, так как return предназначен для возврата значения из функции. Вне функции return вызовет синтаксическую ошибку

function num(n) {
	console.log(n)
}
(5), (6), (7)) //7
// но это не вызов функции
num(5), num(6), num(7) // 5 6 7 -

// Оператор запятой позволяет выполнить несколько выражений в одной строке. Он вычисляет каждое выражение слева направо и возвращает результат последнего выражения.
//JavaScript можно вызвать функцию сразу после её объявления, используя IIFE (Immediately Invoked Function Expression).

//IIFE — это функция, которая вызывается сразу после объявления

(function(n) { console.log(n); })(5);

let result = (1, 2, 3)
console.log(result); // 3 из-за оператора запятой
//Оператор запятой выполняет каждое выражение, но возвращает только результат последнего