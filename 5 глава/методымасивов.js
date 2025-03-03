{
	let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	arr.push(11, 12);
	arr.pop();
	//console.log(arr);
	arr.unshift(0, -1);
	arr.shift();
	//console.log(arr);
	let arr1 = [-2, -3];
	let unite = arr.concat(arr1, 55);
	console.log(unite);
	/*[
    -1,  1,  2, 3,  4,  5,
     6,  7,  8, 9, 10, 11,
    -2, -3, 55
  ]*/
	console.log(unite.indexOf(5)); //5
	//Новый массив unite возвращаем при concat
	console.log(unite.includes(6)); //true
	unite.forEach(elem => console.log(elem));

	//forEach — это метод массивов, который позволяет выполнить функцию для каждого элемента массива
	unite.forEach(function (value, index, array) {
		console.log(`element ${value} on position  ${index}  at massiv ${array}`);
	});
	//Метод forEach в JavaScript — это немутирующий метод
	//forEach всегда возвращает undefined. Он используется для выполнения операций, а не для создания нового массива.
	let arr3 = unite.map(elem => elem * 2);
	console.log(arr3);
	/*Полная запись:
let arr3 = unite.map(function(elem){
return elem *3}); console.log(arr3);
В сокращенной записи (elem => elem * 2) стрелочная функция автоматически возвращает результат выражения (elem * 2). В полной записи (function(elem) { return elem * 2; }) необходимо явно указать return.

*/
}

let arr = [5, 6, 8, 9, 1, 0, 4, 625, 6, 98, 4, 66];
arr1 = arr.filter(elem => elem % 2 === 0);
console.log(arr1);
//Метод filter создаёт новый массив, содержащий только те элементы исходного массива, которые удовлетворяют условию, заданному в callback-функции. Он не изменяет исходный массив.
//Если вы не сохраните результат filter в переменной, он будет потерян
{
	let arr = [5, 6, 8, 9, 1, 0, 4, 625, 6, 98, 4, 66];
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i] % 2 !== 0) {
			arr.splice(i, 1);
		}
	}
	console.log(arr); //Условие arr[i] % 2 !== 0 проверяет, является ли значение элемента нечётным.// [6, 8, 0, 4, 6, 98, 4, 66]
	//изменяю исходный массив arr с помощью метода splice.
}

let arr1 = [4, 5, 8, 6, 79, 2, 8, 54, 65, 23, 57, 7];
let result = arr1.find(elem => {
	return elem > 10;
});
console.log(result); //79
//Если вы хотите сохранить результат работы find, нужно создать новую переменную.
// find немутирующий

let arr2 = [4, 5, 8, 6, 79, 2, 8, 54, 65, 23, 57, 7];
arr2.sort((a, b) => a - b);
console.log(arr2);
/*После вызова sort, массив arr2 уже изменён (отсортирован).

Возвращается отсортированный массив arr2.

*/
let arr3 = [4, 5, 8, 6, 79, 2, 8, 54, 65, 23, 57, 7];
console.log(arr3.reverse());
//мутирующие могу сразу использовать для вызова

//Создайте новый массив, содержащий элементы с 3-го по 5-й
let arr4 = [1, 2, 3, 4, 5, 6, 7, 8];
let newarr4 = arr4.slice(2, 5);
/*Метод slice в JavaScript возвращает новый массив, содержащий копию части исходного массива. Он не изменяет исходный массив (является неизменяющим методом). 
Первый аргумент — это индекс, с которого начинаем вырезать (включительно).

Второй аргумент — это индекс, на котором заканчиваем вырезать (но этот элемент не включается
//Метод slice возвращает новый массив, но если вы не сохраните результат, он просто "потеряется*/

//Удалите 2 элемента, начиная с индекса 2, и вставьте на их место новые элементы
let arr5 = [1, 2, 3, 4, 5, 6, 7, 8];
arr5.splice(2, 2, 11, 12);
console.log(arr5);
//Метод splice в JavaScript является мутирующим (mutating), то есть он изменяет исходный массив
//Возвращает массив удалённых элементов.
//[1, 2, 11, 12, 5, 6, 7, 8]

let arr6 = [4, 5, 16, 3, 18, 6, 2, 8, 13];
let a = arr6.every(elem => elem > 0);
console.log(a); //true
//every(). Этот метод является немутирующим (non-mutating), то есть он не изменяет исходный массив, а только проверяет его элементы и возвращает true или false.
//Если все элементы удовлетворяют условию, every() возвращает true.

//Если хотя бы один элемент не удовлетворяет условию, every() возвращает false.
let arr7 = [4, 5, 16, 3, 18, 6, 2, 8, 13];
arr7.some(elem => elem === 5);
//Метод some проверяет, удовлетворяет ли хотя бы один элемент массива условию, заданному в функции
//1.Дан массив чисел. Создайте новый массив, в котором все отрицательные числа заменены на 0, а положительные числа умножены на 2

let arr8 = [1, -2, 3, -4, 5];
arr8.map(elem => {
	if (elem < 0) {
		return 0;
	} else {
		return elem * 2;
	}
});

//2.Дан массив чисел. Найдите сумму всех элементов, которые больше 10. Используйте метод reduce

let arr9 = [5, 12, 8, 15, 3];
let allSum = arr9.reduce((sum, elem) => {
	if (elem > 10) {
		return sum + elem;
	} else {
		return sum;
	}
}, 0);
console.log(allSum);

//3.Дан массив с повторяющимися элементами. Создайте новый массив, содержащий только уникальные элементы
let arr10 = [1, 2, 2, 3, 4, 4, 5];
let someElem = arr10.filer((elem, index, array) => {
	return array.indexOf(elem) === index;
});
//4.Дан массив чисел. Разделите его на два массива: один с четными числами, другой с нечетными.
/*let arr11 = [1, 2, 3, 4, 5, 6];
let even = arr11.filter(elem => {
	return elem % 2 === 0;
});
let uneven = arr11.filter(elem => {
	return elem % 2 !== 0;
});
console.log(even, uneven);*/
//метод reduce позволяет накапливать результат в виде объекта или массива, содержащего оба подмассива.

let arr11 = [1, 2, 3, 4, 5, 6];
let newOrder = arr11.reduce(
	(sum, elem) => {
		if (elem % 2 === 0) {
			sum.even.push(elem);
		} else {
			sum.uneven.push(elem);
		}
	},
	{
		even: [],
		uneven: [],
	}
);
//5.Дан массив объектов с полями name и age. Отсортируйте массив по возрасту (age) в порядке возрастания. Используйте метод sort.

let people = [
	{ name: 'Alice', age: 25 },
	{ name: 'Bob', age: 30 },
	{ name: 'Charlie', age: 20 },
];
let grad = people.sort((a, b) => a.age - b.age);
console.log(grad);
//. В методе sort нужно передавать функцию, которая принимает два аргумента (a и b), а не их свойства (a.age и b.age)

//6.Даны два массива. Создайте новый массив, который содержит элементы из обоих массивов, но без дубликатов
let ar1 = [1, 2, 3];
let ar2 = [3, 4, 5];
let ar3 = ar1.concat(ar2);
ar3.filter((elem, index, array) => {
	return array.indexOf(elem) === index;
});
//array.indexOf(elem) ищет первый индекс (первое вхождение)elem и сравнивает его с текущим индексом массива
//7.Дан массив чисел. Найдите максимальный элемент, используя метод reduce.
let ar4 = [10, 20, 5, 30, 15];
let newAr = ar4.reduce((acc, elem) => {
	return elem > acc ? elem : acc;
}, ar4[0]);
console.log(newAr);
