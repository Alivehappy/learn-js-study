//1
const users = new Map();
function addUser(id, name, age) {
  users.set(id, { name, age });
}
function deleteUser(id) {
  users.delete(id);
}
addUser(1, "Ivan", 20);
addUser(2, " Bob", 30);
console.log(users);
deleteUdser(1);
console.log(users); // Map { 2 => { name: 'Bob', age: 30 } }

//Напишите функцию, которая кэширует результаты выполнения другой функции с помощью Map.
function cashedFunction(fn) {
  const cashe = new Map();
  return function (arg) {
    if (cashe.has(arg)) {
      return cashe.get(arg);
    }
    const result = fn(arg);
    cashe.set(arg, result);
    return result;
  };
}
const square = cashedFunction((x) => x * x);

square(2); // Вычислено: 4
square(2); // Из кэша: 4
//Напишите функцию, которая принимает массив и возвращает новый массив без дубликатов, используя Set.

function noDubles(arr) {
  return Array.from(new Set(arr));
}
const numbers = [1, 2, 2, 3, 4, 4, 5];

console.log(noDubles(numbers));
function foo() {
  return numbers.filter((elem, index, array) => {
    return array.indexOf(elem) === array.lastIndexOf(elem);
  });
}
console.log(foo());
//Напишите функцию, которая принимает два массива и проверяет, является ли второй массив подмножеством первого (все элементы второго массива присутствуют в первом).
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [2, 3];
function checkArr(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  for (const item of set2) {
    if (!set1.has(item)) {
      return false;
    }
  }
  return true; //если ни одно фолсе то после цикла тру
}
console.log(checkArr(arr1, arr2));

// второе решение
function intersection(arr1, arr2) {
  return arr1.filter((elem) => arr2.includes(elem));
}
intersection([1, 2, 3, 4], [3, 4, 5, 6]);
//Напишите функцию, которая принимает два массива и возвращает массив их общих элементов (пересечение), используя Set.
const arr3 = [1, 2, 3, 4];
const arr4 = [3, 4, 5, 6];
function middle(arr3, arr4) {
  const set1 = new Set(arr3);
  const set2 = new Set(arr4);
  const result = [];
  for (const item of set1) {
    if (set2.has(item)) {
      result.push(item);
    }
  }
  return result;
}
console.log(middle(arr3, arr4));
//  Напиши функцию, которая группирует массив по длине элементов.
function groupElem(arr) {
  let obj = {};
  for (let i of arr) {
    const length = i.length;
    if (!obj[length]) {
      obj[length] = []; //Здесь проверяется, есть ли в объекте obj ключ с именем, равным текущей длине length.
    }
    obj[length].push(i);
  }
  return obj;
}
console.log(groupElem(arr));

function mostPopLetter(arr) {
  let array = arr.join("").split("");
  let obj = {};
  for (let i of array) {
    if (!obj[i]) {
      obj[i] = 1;
    } else {
      obj[i]++;
    }
  }
  let innerArray = Object.values(obj);
  let MaxCount = Math.max(...innerArray);
  for (let item in obj) {
    if (obj[item] == MaxCount) {
      return item;
    }
  }
}
console.log(mostPopLetter(["hello", "world", "javascript"]));

{
}

//8. Найти сумму чисел, которые встречаются более одного раза.
// лоника с методами массивов не учитывает что число может быть более 2 раз в массиве

function more1(arr) {
  let array = [];
  let sum = 0;
  for (let item of arr) {
    if (!array.includes(item)) {
      array.push(elem);
    } else {
      sum = sum + i;
    }
  }
  return sum;
}

{
  function more1(arr) {
    let array = [];
    let arr2 = arr.reduce((acc, elem) => {
      if (!array.includes(elem)) {
        array.push(elem);
      } else {
        acc += elem;
      }
      return acc;
    }, 0);
  }
}

{
  function more1(arr) {
    const countMap = newMap();
    let sum = 0;
    for (const elem of arr) {
      if (countMap.has(elem)) {
        countMap.get(elem, countMap.get(elem) + 1);
      } else {
        countMap.set(elem, 1);
      }
    }
    for (const [elem, count] of countMap.entries()) {
      if (count > 1) {
        sum += elem;
      }
    }
    return sum;
  }
}
chunkArray([1, 2, 3, 4, 5, 6, 7], 3); // [[1, 2, 3], [4, 5, 6], [7]]
function chunkArray(arr, n) {
  let arr1 = [];
  for (let i = 0; i <= arr.length; i += n) {
    arr1.push(i);
  }
  return arr1;
}
// (3) [0, 3, 6]

{
  chunkArray([1, 2, 3, 4, 5, 6, 7], 3); // [[1, 2, 3], [4, 5, 6], [7]]
  function chunkArray(arr, n) {
    let arr1 = [];
    for (let i = 0; i <= arr.length; i += n) {
      arr1.push(arr.slice(i, i + n));
    }
    return arr1;
  }
} /*(3) [Array(3), Array(3), Array(1)]
0
: 
(3) [1, 2, 3]
1
: 
(3) [4, 5, 6]
2
: 
[7]*/

countVowels("Hello World!"); // 3
function countVowels(str) {
  let vovels = ["a", "e", "i", "o", "u"];
  let str1 = str.split("").filter((item) => vovels.includes(item));
  return str1.length;
} //3

const data = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 },
];
function groupByProperty(arr, word) {
  let arr1 = {};
  for (let i = 0; i < arr.length; i++) {
    let elem = arr[i];
    let key = elem[word];
    if (!arr1[key]) {
      arr1[key] = [];
    }
    arr1[key].push(elem);
  }
  return arr1;
}

groupByProperty(data, "age");
//   25: [{ name: "Alice", age: 25 }, { name: "Charlie", age: 25 }],
//   30: [{ name: "Bob", age: 30 }]

maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]); // 6

function maxSubarraySum(arr) {
  if (arr.length === 0) return 0;
  let currentMax = arr[0];
  let globalMax = arr[0];
  for (let i = 0; i < arr.length; i++) {
    const currentElement = arr[i]; // Текущий элемент массива

    // Обновляем текущую максимальную сумму:
    // Либо начинаем новый подмассив с текущего элемента,
    // либо продолжаем предыдущий подмассив, добавляя текущий элемент.
    currentMax = Math.max(currentElement, currentMax + currentElement);
    if (currentMax > globalMax) {
      globalMax = currentMax;
    }
  }
  return globalMaxSum; // Возвращаем глобальную максимальную сумму
}
/*1
5 задач код варс 
дорешать конструктор заказов
 qa пред
for in for of долг
види кметоды массивов
видик нтмл ссс
codebasics верстка*/
