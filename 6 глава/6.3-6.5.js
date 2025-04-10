//Если переменная объявлена внутри блока кода {...}, то она видна только внутри этого блока.
{
	// показать сообщение

	let message = 'Hello';
	console.log(message);
}

{
	// показать другое сообщение

	let message = 'Hi';
	console.log(message);
}
/*Без блоков была бы ошибка
Обратите внимание, что без отдельных блоков возникнет ошибка, если мы используем let с существующим именем переменной:

// показать сообщение
let message = "Hello";
alert(message);

// показать другое сообщение
let message = "Goodbye"; // SyntaxError: Identifier 'message' has already been declared
alert(message);
*/
//Для if, for, while и т.д. переменные, объявленные в блоке кода {...}, также видны только внутри:

function sayHiBye(firstName, lastName) {
	function getFullName() {
		return firstName + ' ' + lastName;
	}
	console.log('Hello, ' + getFullName());
	console.log(sayHiBye());
}
