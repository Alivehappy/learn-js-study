let arr = ['I', 'go', 'home'];
delete arr[1]; // удалить "go"
alert(arr[1]); // undefined
// теперь arr = ["I",  , "home"];
alert(arr.length); //3
//Элемент был удалён, но в массиве всё ещё три элемента, мы можем увидеть, что arr.length == 3
//delete obj.key удаляет значение по ключу key. Это всё, что он делает. Хорошо для объектов. Но для массивов мы обычно хотим, чтобы оставшиеся элементы сдвинулись и заняли освободившееся место. Мы ждём, что массив станет короче.
//Метод arr.splice – это универсальный «швейцарский нож» для работы с массивами. Умеет всё: добавлять, удалять и заменять элементы.
//arr.splice(start[, deleteCount, elem1, ..., elemN]);
//Он изменяет arr начиная с индекса start: удаляет deleteCount элементов и затем вставляет elem1, ..., elemN на их место. Возвращает массив из удалённых элементов.

let ar1 = ['Я', 'изучаю', 'JavaScript'];
ar1.splice(1, 1); // начиная с индекса 1, удалить 1 элемент

let ar2 = ['Я', 'изучаю', 'JavaScript', 'прямо', 'сейчас'];
// удалить 3 первых элемента и заменить их другими
ar2.splice(0, 3, 'Давай', 'танцевать');
console.log(ar2); //// теперь ["Давай", "танцевать", "прямо", "сейчас"]
console.log(ar2.length); //4
//Здесь видно, что splice возвращает массив из удалённых элементов:

let ar3 = ['Я', 'изучаю', 'JavaScript', 'прямо', 'сейчас'];
let removed = arr.splice(0, 2); // удалить 2 первых элемента
console.log(removed); // "Я", "изучаю" <-- массив из удалённых элементов
//Метод splice также может вставлять элементы без удаления, для этого достаточно установить deleteCount в 0:

let ar4 = ['Я", "изучаю", "JavaScript'];
// с индекса 2
// удалить 0 элементов
// вставить "сложный", "язык"
ar4.splice(2, 0, 'сложный', 'язык');
console.log(ar4); // "Я", "изучаю", "сложный", "язык", "JavaScript"
//В этом и в других методах массива допускается использование отрицательных индексов. Они определяют позицию с конца массива, как тут:
let ar5 = [1, 2, 5];
// начиная с индекса -1 (перед последним элементом)
// удалить 0 элементов,
// затем вставить числа 3 и 4
ar5.splice(-1, 0, 3, 4);
console.log(ar5); // 1,2,3,4,5
//Метод arr.slice намного проще, чем похожий на него arr.splice.
//arr.slice([start], [end])
//Он возвращает новый массив, в который копирует все элементы с индекса start до end (не включая end). start и end могут быть отрицательными, в этом случае отсчёт позиции будет вестись с конца массива.
let ar6 = ['t', 'e', 's', 't'];
console.log(ar6.slice(1, 3)); //e,s (копирует с 1 до 3)
console.log(ar6.slice(-2)); // s,t (копирует с -2 до конца)
//Можно вызвать slice без аргументов: arr.slice() создаёт копию arr. Это часто используют, чтобы создать копию массива для дальнейших преобразований, которые не должны менять исходный массив.
//Метод slice всегда возвращает новый массив, содержащий копию части исходного массива.
//Метод arr.concat создаёт новый массив, в который копирует данные из других массивов и дополнительные значения.

//arr.concat(arg1, arg2);
//Он принимает любое количество аргументов, которые могут быть как массивами, так и простыми значениями.
//В результате – новый массив, включающий в себя элементы из arr, затем arg1, arg2 и так далее.
//Если аргумент argN – массив, то копируются все его элементы. Иначе копируется сам аргумент.

let ar7 = [1, 2];
// создать массив из: arr и [3,4]
console.log(ar7.concat([3, 4])); // 1,2,3,4
// создать массив из: arr и [3,4] и [5,6]
console.log(ar7.concat([3, 4], [5, 6])); //// 1,2,3,4,5,6
alert(arr.concat([3, 4], 5, 6)); // 1,2,3,4,5,6
let a2 = [1, 2];
let arrayLike = {
	0: 'что-то',
	length: 1,
};
alert(a2.concat(arrayLike)); // 1,2,[object Object]
//Обычно он копирует только элементы из массивов. Другие объекты, даже если они выглядят как массивы, добавляются как есть:
//Но если массивоподобный объект имеет специальное свойство Symbol.isConcatSpreadable, то он обрабатывается как массив, с помощью concat: вместо него добавляются его элементы:

let a3 = [1, 2];
let arrLike = {
	0: 'что-то',
	1: 'ещё',
	[Symbol.isConcatSpreadable]: true,
	length: 2,
};
console.log(a3.concat(arrLike)); // 1,2,что-то,ещё
//Метод arr.forEach позволяет запускать функцию для каждого элемента массива
//arr.forEach(function (item, index, array) {// ... делать что-то с item});
//Например, этот код выведет на экран каждый элемент массива
// Вызов alert для каждого элемента
['Бильбо', 'Гэндальф', 'Назгул'].forEach(alert);
//А этот вдобавок расскажет и о позиции элемента в целевом массиве:
['Бильбо', 'Гэндальф', 'Назгул'].forEach((item, index, array) => {
	console.log(`У ${item} индекс ${index} в [${array}]`);
});
/////...У Бильбо индекс 0 в [Бильбо,Гэндальф,Назгул]
//У методов arr.indexOf и arr.includes одинаковый синтаксис и они делают по сути то же самое, что и их строковые аналоги, но работают с элементами вместо символов
//arr.indexOf(item, from) ищет item начиная с индекса from и возвращает номер индекса, на котором был найден искомый элемент, в противном случае -1.
//arr.includes(item, from) ищет item начиная с индекса from и возвращает true, если поиск успешен
//Обычно эти методы используются только с одним аргументом: искомым item. По умолчанию поиск ведется с начала.

let arr3 = [1, 0, false];
console.log(arr3.indexOf(0)); //1
console.log(arr3.indexOf(false)); //2
console.log(arr3.indexOf(null)); //-1
console.log(arr3.includes(1)); // true
//Пожалуйста, обратите внимание, что методы используют строгое сравнение ===. Таким образом, если мы ищем false, он находит именно false, а не ноль.
//Если мы хотим проверить наличие элемента в массиве и нет необходимости знать его индекс, предпочтительно использовать arr.includes.
//Метод arr.lastIndexOf похож на indexOf, но ищет справа налево
let arr4 = ['Яблоко', 'Апельсин', 'Яблоко'];
console.log(arr4.indexOf('Яблоко')); // 0 (первый 'Яблоко')
console.log(arr4.lastIndexOf('Яблоко'));
// 2 (последний 'Яблоко')
//Незначительная, но заслуживающая внимания особенность includes – он правильно обрабатывает NaN, в отличие от indexOf
const a7 = [NaN];
console.log(a7.includes(NaN));
// true (верно
alert(a7.indexOf(NaN)); // -1 (неверно, должен быть 0)
/*Представьте, что у нас есть массив объектов. Как нам найти объект с определённым условием?

Здесь пригодится метод arr.find.

let result = arr.find(function(item, index, array){  // если true - возвращается текущий элемент и перебор прерывается
  // если все итерации оказались ложными, возвращается undefined});
  // Функция вызывается по очереди для каждого элемента массива:

item – очередной элемент.
index – его индекс.
array – сам массив*/
//Например, у нас есть массив пользователей, каждый из которых имеет поля id и name. Найдем пользователя с id == 1:
let users = [
	{ id: 1, name: 'Вася' },
	{ id: 2, name: 'Петя' },
	{ id: 3, name: 'Маша' },
];
let user = users.find(item => item.id == 1);
alert(user.name); // Вася
//В данном случае функция-колбэк: item => item.id == 1.

//Она проверяет, равен ли id текущего элемента (item.id) значению 1.
//У метода arr.findIndex такой же синтаксис, но он возвращает индекс, на котором был найден элемент, а не сам элемент. Значение -1 возвращается, если ничего не найдено.
let users1 = [
	{ id: 1, name: 'Вася' },
	{ id: 2, name: 'Петя' },
	{ id: 3, name: 'Маша' },
	{ id: 4, name: 'Вася' },
];
console.log(users1.findIndex(user => users1.name == 'Вася')); // 0 Найти индекс первого Васи

console.log(users1.findLastIndex(user => user.name == 'Вася'));
// 3  Найти индекс последнего Васи
//Метод find ищет один (первый) элемент, который заставит функцию вернуть true.
//Если найденных элементов может быть много, можно использовать arr.filter(fn).
let resukts = arr.filter(function (item, inddex, array) {
	// если `true` -- элемент добавляется к results и перебор продолжается
	// возвращается пустой массив в случае, если ничего не найдено
});
let use = [
	{ id: 1, name: 'Вася' },
	{ id: 2, name: 'Петя' },
	{ id: 3, name: 'Маша' },
]; // возвращает массив, состоящий из двух первых пользователей

let someUsers = use.filter(item => item.id < 3);

alert(someUsers.length); // 2
//Перейдём к методам преобразования и упорядочения массива.
//arr.map
//Он вызывает функцию для каждого элемента массива и возвращает массив результатов выполнения этой функции.
/*
let res = arr.map(functiion(item, index, array)){

});*/
//Например, здесь мы преобразуем каждый элемент в его длину:

let lengths = ['Бильбо', 'Гэндальф', 'Назгул'].map(item => item.length);
alert(lengths); // 6,8,6
//Вызов arr.sort() сортирует массив на месте, меняя в нём порядок элементов.

//Он также возвращает отсортированный массив, но обычно возвращаемое значение игнорируется, так как изменяется сам arr.
let arrl = [1, 2, 15];
// метод сортирует содержимое arr
arrl.sort();
alert(arrl);
/// 1, 15, 2
/*По умолчанию элементы сортируются как строки.

Буквально, элементы преобразуются в строки при сравнении. Для строк применяется лексикографический порядок, и действительно выходит, что "2" > "15".

Чтобы использовать наш собственный порядок сортировки, нам нужно предоставить функцию в качестве аргумента arr.sort().

*/
function compare(a, b) {
	if (a > b) return 1; //// если первое значение больше второго
	if (a == b) return 0; // если равны
	if (a < b) return -1; // если первое значение меньше второго
}
//Например, для сортировки чисел:
function compareNumeric(a, b) {
	if (a > b) return 1;
	if (a == b) return 0;
	if (a < b) return -1;
}
let ara = [1, 2, 15];
arr.sort(compareNumeric);
alert(ara);
//Результат: [1, 2, 15].
[1, -2, 15, 2, 0, 8].sort(function (a, b) {
	console.log(a + '<>' + b);
	return a - b;
});
//[-2, 0, 1, 2, 8, 15]
//На самом деле от функции сравнения требуется любое положительное число, чтобы сказать «больше», и отрицательное число, чтобы сказать «меньше».
//Это позволяет писать более короткие функции:
{
	let arr = [1, 2, 15];

	arr.sort(function (a, b) {
		return a - b;
	});

	alert(arr); // 1, 2, 15
}
{
	arr.sort((a, b) => a - b);
}
/*Если a - b < 0, то a будет располагаться перед b.

Если a - b > 0, то b будет располагаться перед a.

Если a - b === 0, порядок не изменяется.
*/
/*let countries = ['Österreich', 'Andorra', 'Vietnam'];

alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (неправильно)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (правильно!)
*/
//Метод arr.reverse меняет порядок элементов в arr на обратный.

let art = [1, 2, 3, 4, 5];
art.reverse();
alert(art); //; // 5,4,3,2,1
//Он также возвращает массив arr с изменённым порядком элементов.
//Метод str.split(delim) именно это и делает. Он разбивает строку на массив по заданному разделителю delim.
// примере ниже таким разделителем является строка из запятой и пробела.

let names = 'Вася, Петя, Маша';
let are = names.split(', ');
for (let name of are) {
	alert(`Сообщение получат: ${name}.`);
}
//У метода split есть необязательный второй числовой аргумент – ограничение на количество элементов в массиве. Если их больше, чем указано, то остаток массива будет отброшен. На практике это редко используется
let we = 'Вася, Петя, Маша, Саша'.split(', ', 2);
alert(we); // Вася, Петя
//Вызов split(s) с пустым аргументом s разбил бы строку на массив букв:

let ew = 'тест';
alert(ew.split('')); // т,е,с,т
//Вызов arr.join(glue) делает в точности противоположное split. Он создаёт строку из элементов arr, вставляя glue между ними.
let k = ['Вася', 'Петя', 'Маша'];
let f = k.join(';'); // объединить массив в строку через ;
alert(f); //// Вася;Петя;Маша
//Когда нам нужно перебрать массив – мы можем использовать forEach, for или for..of.
{
	let arr = [1, 2, 3];
	arr.forEach(element => {
		console.log(element); // Выводит 1, затем 2, затем 3
	});
}
{
	let arr = [1, 2, 3];
	for (let i = 0; i < arr.length; i++) {
		console.log(arr[i]); // Выводит 1, затем 2, затем 3
	}
}
{
	let arr = [1, 2, 3];
	for (let element of arr) {
		console.log(element); // Выводит 1, затем 2, затем 3
	}
}
//Когда нам нужно перебрать массив и вернуть данные для каждого элемента – мы можем использовать map.
{
	let numbers = [1, 2, 3, 4, 5];
	let squared = numbers.map(num => num * num);

	console.log(squared); // Вывод: [1, 4, 9, 16, 25]
}
//Методы arr.reduce и arr.reduceRight похожи на методы выше, но они немного сложнее. Они используются для вычисления единого значения на основе всего массива.

//let value = arr.reduce(function (accumulator, item, index, array) { }, [initial]);
/*Аргументы:

accumulator – результат предыдущего вызова этой функции, равен initial при первом вызове (если передан initial),
item – очередной элемент массива,
index – его позиция,
array – сам массив.
При вызове функции результат её предыдущего вызова передаётся на следующий вызов в качестве первого аргумента.

Так, первый аргумент является по сути аккумулятором, который хранит объединённый результат всех предыдущих вызовов функции. По окончании он становится результатом reduce.


*/
let er = [1, 2, 3, 4, 5];
let res = removed.reduce((sum, current) => sum + current, 0);
console.log(res);
// 15
/*При первом запуске sum равен initial (последний аргумент reduce), то есть 0, а current – первый элемент массива, равный 1. Таким образом, результат функции равен 1.
При втором запуске sum = 1, к нему мы добавляем второй элемент массива (2) и возвращаем.
*/
let arf = [1, 2, 3, 4, 5];
let resul = arf.reduce((sum, current) => sum + current);
console.log(resul); // 15
//Результат – точно такой же! Это потому, что при отсутствии initial в качестве первого значения берётся первый элемент массива, а перебор стартует со второго.
/*Но такое использование требует крайней осторожности. Если массив пуст, то вызов reduce без начального значения выдаст ошибку.

Вот пример:

let arr = [];

// Error: Reduce of empty array with no initial value
// если бы существовало начальное значение, reduce вернул бы его для пустого массива.
arr.reduce((sum, current) => sum + current);
*/
alert(typeof {}); // object
alert(typeof []); // тоже object
/*Но массивы используются настолько часто, что для этого придумали специальный метод: Array.isArray(value). Он возвращает true, если value массив, и false, если нет.

*/
console.log(Array.isArray({})); // false
console.log(Array.isArray([]));
// true
/*Почти все методы массива, которые вызывают функции – такие как find, filter, map, за исключением метода sort, принимают необязательный параметр thisArg
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
Значение параметра thisArg становится this для func
*/

let army = {
	minAge: 18,
	maxAge: 27,
	canJoin(user) {
		return user.age >= this.minAge && user.age < this.maxAge;
	},
};
let uses = [{ age: 16 }, { age: 20 }, { age: 23 }, { age: 30 }];
// найти пользователей, для которых army.canJoin возвращает true
let soldiers = users.filter(army.canJoin, army);
console.log(soldires.length); // 2

console.log(soldires[0].age); // 20
console.log(soldiers[1].age); // 23
/*Если бы мы в примере выше использовали просто users.filter(army.canJoin), то вызов army.canJoin был бы в режиме отдельной функции, с this=undefined. Это тут же привело бы к ошибке.

Вызов users.filter(army.canJoin, army) можно заменить на users.filter(user => army.canJoin(user)), который делает то же самое. Последняя запись используется даже чаще, так как функция-стрелка более наглядна.*/
