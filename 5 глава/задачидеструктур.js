let user = {
	name: 'Fil',
	age: 20,
	city: 'msk',
};
let { name, city1 } = user;
console.log(name);
console.log(city1);

let user1 = {
	name: 'Fil',
	adress: {
		city: 'MSK',
		street: 'Mira',
	},
};
let {
	name2,
	adress: { city, street },
} = user1;
console.log(street);
console.log(city);

let arr = [1, 2, 3, 4, 5];
let [a, b, c, ...rest] = arr;
console.log(a);
console.log(rest); // 4,5
console.log(rest[1]); //5

let user3 = {
	name: 'John',
	age: 30,
	city: 'NYC',
};
function printUser({ name1, age, city } = user3) {
	console.log(name1);
	console.log(age);
	console.log(city);
}
printUser(user3);
/*John
VM502:8 30
VM502:9 NYC*/
/*Деструктуризация с значениями по умолчанию:

Создайте объект user с полем name.

Используя деструктуризацию, извлеките name, age и city, задав значения по умолчанию для age (25) и city ('Unknown').

Выведите их в консоль.

5 задач на объекты, методы массивов и Object.entries
Подсчёт суммы значений объекта:

Создайте объект salaries с полями John, Pete, Mary, где значения — это зарплаты.

Используя Object.values и метод массива reduce, найдите сумму всех зарплат.

Выведите результат в консоль.

Поиск максимального значения в объекте:

Создайте объект salaries с полями John, Pete, Mary, где значения — это зарплаты.

Используя Object.entries и метод массива reduce, найдите имя человека с максимальной зарплатой.

Выведите результат в консоль.

Фильтрация объекта:

Создайте объект users с полями John, Pete, Mary, где значения — это возраст.

Используя Object.entries и метод массива filter, найдите всех пользователей старше 25 лет.

Выведите результат в консоль.

Преобразование объекта в массив:

Создайте объект user с полями name, age, city.

Используя Object.entries, преобразуйте объект в массив пар [ключ, значение].

Выведите результат в консоль.

Обновление объекта:

Создайте объект user с полями name, age, city.

Используя Object.entries и метод массива map, обновите значения объекта, увеличив возраст на 1.

Преобразуйте массив обратно в объект с помощью Object.fromEntries.

Выведите результат в консоль.

5 задач на Map
Создание и добавление элементов в Map:

Создайте новый объект Map.

Добавьте в него пары ключ-значение: 'name' => 'John', 'age' => 30, 'city' => 'New York'.

Выведите результат в консоль.

Перебор элементов Map:

Создайте Map с парами ключ-значение: 'name' => 'John', 'age' => 30, 'city' => 'New York'.

Используя цикл for...of, переберите все элементы Map и выведите их в консоль.

Поиск максимального значения в Map:

Создайте Map с парами ключ-значение: 'John' => 100, 'Pete' => 300, 'Mary' => 250.

Используя метод Array.from и reduce, найдите имя человека с максимальной зарплатой.

Выведите результат в консоль.

Фильтрация Map:

Создайте Map с парами ключ-значение: 'John' => 25, 'Pete' => 30, 'Mary' => 20.

Используя Array.from и метод массива filter, найдите всех пользователей старше 25 лет.

Выведите результат в консоль.

Преобразование Map в объект:

Создайте Map с парами ключ-значение: 'name' => 'John', 'age' => 30, 'city' => 'New York'.

Преобразуйте Map в объект с помощью Object.fromEntries.

Выведите результат в консоль.

Примеры решений
Деструктуризация объекта (задача 1):
javascript
Copy
let user = { name: 'John', age: 30, city: 'New York' };
let { name, city } = user;
console.log(name, city); // John New York
Поиск максимального значения в объекте (задача 2):
javascript
Copy
let salaries = { John: 100, Pete: 300, Mary: 250 };
let maxEntry = Object.entries(salaries).reduce((max, current) => {
  return current[1] > max[1] ? current : max;
});
console.log(maxEntry[0]); // Pete
Перебор элементов Map (задача 2):
javascript
Copy
let map = new Map([
  ['name', 'John'],
  ['age', 30],
  ['city', 'New York'],
]);

for (let [key, value] of map) {
  console.log(`${key}: ${value}`);
}
// name: John
// age: 30
// city: New York
Эти задачи помогут вам лучше понять деструктуризацию, работу с объектами, методами массивов и Map. Удачи*/
