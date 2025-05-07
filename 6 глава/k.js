const secret = Math.floor(Math.random() * 100) + 1;
function ask() {
	let arg;

	let tryCount = 0;

	while (true) {
		tryCount++;
		arg = prompt('Number?');
		if (arg === null || arg === '') {
			console.log('Выход из цикла ');
			break;
		}
		arg = Number(arg);
		if (isNaN(arg)) {
			console.log('введи число');

			continue;
		} else if (arg > secret) {
			console.log('Меньше');
		} else if (arg < secret) {
			console.log('Больше');
		} else if (arg === secret) {
			console.log(`Угадал с ${tryCount} попытки`);
			break;
		}
	}
}

ask();

function printHill(lines) {
	for (let i = 0; i <= lines; i++) {
		let res = '';
		for (let j = 0; j < i; j++) {
			res += '#';
		}
		console.log(res);
	}
}
printHill(5);
