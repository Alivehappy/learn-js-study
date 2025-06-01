/*Мы также можем присвоить метод самому классу. Такие методы называются статическими.

В объявление класса они добавляются с помощью ключевого слова static
*/
class User {
	static staticMethod() {
		console.log(this === User);
	}
}
User.staticMethod(); // true
//Это фактически то же самое, что присвоить метод напрямую как свойство функции
{
	class User {}
	User.staticMethod = function () {
		console.log(this === User);
	};
}
//Значением this при вызове User.staticMethod() является сам конструктор класса User (правило «объект до точки»).
//Обычно статические методы используются для реализации функций, которые будут принадлежать классу в целом, но не какому-либо его конкретному объекту.

{
	class Article {
		constructor(title, date) {
			this.title = title;
			this.date = date;
		}
		static compare(articleA, articleB) {
			return articleA.date - articleB.date;
		}
	}
	// использование
	let articles = [
		new Article('HTML', new Date(2019, 11, 1)),
		new Article('CSS', new Date(2019, 0, 1)),
		new Article('JavaScript', new Date(2019, 11, 1)),
	];
	articles.sort(Article.compare);
	alert(articles[0].title); // CSS
}
//Здесь метод Article.compare стоит «над» статьями, как средство для их сравнения. Это метод не отдельной статьи, а всего класса.

{
	class Article {
		constructor(title, date) {
			this.title = title;
			this.date = date;
		}
		static createToday() {
			// помним, что this = Article

			return new this('Сегодняшний дайджест', new Date());
		}
	}
	let article = Article.createToday();
	alert(article.title); // Сегодняшний дайджест
}
//Статические методы также используются в классах, относящихся к базам данных, для поиска/сохранения/удаления вхождений в базу данных, например
// предположим, что Article - это специальный класс для управления статьями
// статический метод для удаления статьи по id:
Article.remove({ id: 12345 });
/*Статические методы недоступны для отдельных объектов
Статические методы могут вызываться для классов, но не для отдельных объектов.*/
/*Статические свойства также возможны, они выглядят как свойства класса, но с static в начале:

*/ {
	class Article {
		static publisher = 'Илья Кантор';
	}
	console.log(Article.publisher); //Илья Кантор
}
/*Это то же самое, что и прямое присваивание Article:

Article.publisher = "Илья Кантор";
*/
//Статические свойства и методы наследуются.
