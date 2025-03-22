let user = {
	name: 'Fil',
	age: 20,
	city1: 'msk',
};
let { name, city1 } = user;
console.log(name);
console.log(city1);

let user1 = {
	name2: 'Fil',
	adress: {
		city2: 'MSK',
		street: 'Mira',
	},
};
let {
	name2,
	adress: { city2, street },
} = user1;
console.log(street);
console.log(city2);

let arr = [1, 2, 3, 4, 5];
let [a, b, c, ...rest] = arr;
console.log(a);
console.log(rest); // 4,5
console.log(rest[1]); //5

let user3 = {
	name3: 'John',
	age3: 30,
	city3: 'NYC',
};
function printUser({ name3, age3, city3 } = user3) {
	console.log(name3);
	console.log(age3);
	console.log(city3);
}
printUser(user3);
/*Johns
VM502:8 30
VM502:9 NYC*/

{
	const user1 = {
		name3,
	};
	let { name3, age = 25, city = 'Msk' } = user1;
	console.log(user1);
}
//Если вы пытаетесь деструктурировать свойство, которое не объявлено в объекте, JavaScript не выбросит ошибку. Вместо этого переменная получит значение undefined

const salaries = {
	John: 100,
	Pete: 200,
	Mary: 300,
};
const sumSalries = Object.values(salaries).reduce((acc, elem) => {
	return acc + elem;
}, 0);
console.log(sumSalries); //600

{
	const salaries = {
		John: 100,
		Pete: 200,
		Mary: 300,
	};

	const mostPayed = Object.entries(salaries).reduce(
		(acc, [key, value]) => {
			if (value > acc.salary) {
				return { name: key, salary: value };
			}
			return acc;
		},
		{ name: '', salary: 0 }
	);
	console.log(mostPayed.name); //Mary
}

/*Object.keys(obj) — возвращает массив ключей.

Object.values(obj) — возвращает массив значений.

Object.entries(obj) — возвращает массив пар [ключ, значение]. 


У Map есть три основных метода:

keys() — возвращает итератор по ключам.

values() — возвращает итератор по значениям.

entries() — возвращает итератор по парам [ключ, значение].*/

const users4 = {
	John: 20,
	Pete: 26,
	Mary: 30,
};
const filterd = Object.keys(users4).filter(key => users4[key] > 25);
console.log(filterd); //['Pete', 'Mary']

{
	const user5 = {
		name: 'Fil',
		age: '20',
		city: 'Msk',
	};
	const changed = Object.fromEntries(
		Object.entries(user5).map(([key, value]) => {
			if (key === 'age') {
				return [key, String(Number(value) + 1)];
			}
			return [key, value];
		})
	);
	console.log(changed);
} //{name: 'Fil', age: '21', city: 'Msk'}

const map = new Map();
map.set('name', 'John');
map.set('age', 30);
map.set('city', 'New York');
console.log(map);
//Ключи и значения в Map могут быть любого типа, но если вы используете строки, их нужно указывать как строки через кавычки

for (let key of map) {
	console.log(key);
}

/*(2) ['name', 'John']0: "name"1: "John"length: 2[[Prototype]]: Array(0)
VM91:9 (2) ['age', 30]
VM91:9 (2) ['city', 'New York']
  я разбила map массив ключ значение на массивы key*/

//тут деструтуризация
for (let [key, value] of map) {
	console.log(`${key}, ${value}`);
} /*name, John
 age, 30
 city, New York*/

const map1 = new Map();
map1.set('John', 100);
map1.set('Pete', 300);
map1.set('Mary', 250);
const mostPayed = Array.from(map1).reduce(
	(acc, [key, value]) => {
		if (value > acc.salary) {
			return {
				name: key,
				salary: value,
			};
		}
		return acc;
	},
	{
		name: '',
		salary: 0,
	}
);
console.log(mostPayed.name); //Pete
{
	const map3 = new Map();
	map3.set('John', 25);
	map3.set('Pete', 30);
	map3.set('Mary', 20);
	const age25 = Array.from(map3).filter(([name, age]) => {
		return age > 25;
	});
	console.log(age25);
}
{
	const map = new Map();
	map.set('name', 'John');
	map.set('age', 30);
	map.set('city', 'New York');
	const obj = Object.fromEntries(map);
	console.log(obj);
}
//{name: 'John', age: 30, city: 'New York'}
