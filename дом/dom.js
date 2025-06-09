// Создать div
const div = document.createElement('div');
console.log(div);
// Добавить к нему класс wrapper
div.classList.add('wrapper');
// Поместить его внутрь тэга body
const body = document.querySelector('body');
console.log(body);
body.appendChild(div);
// Создать заголовок H1 "DOM (Document Object Model)"
const header = document.createElement('h1');
header.textContent = 'DOM';
console.log(header);
// Добавить H1 перед DIV с классом wrapper
div.insertAdjacentElement('beforebegin', header);
// Создать список <ul></ul>
// Добавить в него 3 элемента с текстом "один, два, три"
const ul = `
<ul>
<li>один</li>
<li>два</li>
<li>три</li>
</ul>
`;
// Поместить список внутрь элемента с классом wrapper
div.innerHTML = ul;
// =================================================
// Создать изображение
const img = document.createElement('img');
console.log(img);
// Добавить следующие свойства к изображению
// 1. Добавить атрибут source
img.src = 'https://picsum.photos/240';
// 2. Добавить атрибут width со значением 240
img.width = 240;
// 3. Добавить класс super
img.classList.add('super');
// 4. Добавить свойство alt со значением "Super Man"
img.alt = 'Super Man';
// Поместить изображение внутрь элемента с классом wrapper
div.appendChild(img);

// Используя HTML строку, создать DIV с классом 'pDiv' + c 2-мя параграфами
const elemHTML = `
<div class='pDiv'>
<p>параграф 1</p>
<p> параграф 2</p>
</div>`;

// Поместить этот DIV до элемента <ul></ul>
const ullist = div.querySelector('ul');
ullist.insertAdjacentHTML('beforebegin', elemHTML);
// Добавить для 2-го параграфа класс text
const pDiv = document.querySelector('.pDiv');
pDiv.children[1].classList.add('text');
console.log(pDiv.children);
// Удалить 1-й параграф
pDiv.firstElementChild.remove();
// Создать функцию generateAutoCard,
// которая принимает 3 аргумента: brand, color, year
const generateAutoCard = (brand, year, color) => {
	return `
   <div class="autoCard">
   <h2>${brand.toUpperCase()}</h2>
   <p>Автомобиль ${brand.toUpperCase()} - ${year} года. Возраст авто - ${
		new Date().getFullYear() - year
	}
	 лет.  Цвет ${color}</p><button type = 'button' class='btn'> Delete</button>
 </div>
  `;
};

// Функция должна возвращать разметку HTML:
// <div class="autoCard">
//   <h2>BRAND YEAR</h2>
//   <p>Автомобиль BRAND - YEAR года. Возраст авто - YEARS лет.</p>
// </div>

// Создать новый DIV с классом autos
const carsDiv = document.createElement('div');
carsDiv.classList.add('autos');
// Создать 3 карточки авто, используя функцию generateAutoCard
const carsList = [
	{ brand: 'Tesla', color: 'Красный', year: 2015 },
	{ brand: 'Lexus', color: 'Серебристый', year: 2016 },
	{ brand: 'Nissan', color: 'Черный', year: 2012 },
];
console.log(carsDiv);
// Поместить эти 3 карточки внутрь DIV с классом autos
const carsHTML = carsList
	.map(car => {
		return generateAutoCard(car.brand, car.year, car.color);
	})
	.join('');
console.log(carsHTML);
// Поместить DIV c классом autos на страницу DOM - до DIV с классом wrapper
carsDiv.innerHTML = carsHTML;
div.insertAdjacentElement('beforebegin', carsDiv);
// Добавить кнопку Удалить на каждую карточку авто

// При клике на кнопку - удалять карточку из структуры DOM
const buttons = document.querySelectorAll('.btn');

//console.log(buttons);
// 1. Выбрать все кнопки
// 2. Создать функцию удаления
function handleClick(event) {
	const currentButton = event.currentTarget;
	currentButton.closest('.autoCard').remove();
	//console.log(currentButton.parentElement);
}
// 3. Использовать цикл - чтобы повесить обработчик события на каждую кнопку
buttons.forEach(button => {
	button.addEventListener('click', handleClick);
});
//<script src="/дом/dom.js"></script>

const a = 5;
{
	console.log(a);
}
