/*
Задача:
Реализуйте функцию fetchWithRetry(url, retries = 3), которая:

Делает fetch запрос

При 404 выбрасывает NotFoundError

При таймауте >5с выбрасывает TimeoutError

При других ошибках делает повторные попытки (retries)

В конце всех попыток кидает последнюю ошибку

Тесты:

javascript
await fetchWithRetry("https://api.example.com/missing"); 
// NotFoundError: Not Found (url: "...", statusCode: 404)

5. Ошибки в цепочке Promise
Условие:
Реализуйте цепочку из 3 промисов, где:

Первый промис создает случайное число 0-5

Если число < 3, второй промис падает с ValueTooSmallError

Третий промис преобразует число в строку

Добавьте .catch() для конкретной ошибки и общий обработчик

Тесты:

javascript
executeChain()
  .then(console.log)
  .catch(e => console.error(e.name));  // ValueTooSmallError или другие
6. Глобальная обработка ошибок
Условие:

Зарегистрируйте обработчик unhandledrejection

Создайте несколько промисов с ошибками:

Один с reject(new Error("test"))

Другой с неперехваченным throw в then-обработчике

Убедитесь, что обработчик ловит оба случая

Ожидаемый вывод:

text
Unhandled rejection: Error: test
Unhandled rejection: Error: Thrown in then
7. Класс с валидацией
Условие:
Создайте класс User с:

Конструктором, принимающим email и password

Геттером password, который маскирует пароль (****)

Сеттером email, который валидирует формат

Методом save(), который симулирует асинхронное сохранение и может выбросить DatabaseError

Тесты:

javascript
const user = new User("test@example.com", "qwerty");
user.email = "invalid"; // throws ValidationError
await user.save();      // может выбросить DatabaseError
8. Retry механизм с экспоненциальной задержкой
Условие:
Реализуйте функцию retryWithBackoff(fn, maxRetries), которая:

Принимает асинхронную функцию fn

При ошибке делает повторные попытки с задержкой: delay = 100 * 2^retryCount мс

Кидает последнюю ошибку после всех попыток

Использует try/catch внутри async функции

Тесты:

javascript
await retryWithBackoff(() => fetch("https://api.example.com"), 3);
9. Ошибки в итерациях
Условие:
Создайте функцию processBatch(items), которая:

Принимает массив элементов

Обрабатывает каждый элемент в цикле (может упасть с ProcessingError)

При ошибке:

Логирует элемент и ошибку

Продолжает обработку остальных

Возвращает статистику: { success: number, failed: number }

Тесты:

javascript
processBatch([1, 2, "invalid", 4]); 
// { success: 3, failed: 1 } + лог ошибки для "invalid"
10. Комплексный пример: файловый процессор
Условие:
Создайте класс FileProcessor с методами:

read(path) - читает файл (симуляция), может выбросить:

FileNotFoundError

PermissionDeniedError

process(content) - парсит JSON, валидирует схему

write(data) - пишет в новый файл

Реализуйте метод execute(), который:

Использует try/catch/finally

В finally освобождает ресурсы

Возвращает результат или ошибку формата:

javascript
{ 
  success: boolean, 
  error?: { type: string, details: string },
  durationMs: number 
}
Тесты:

javascript
await new FileProcessor().execute("/data.json");
// { success: true, durationMs: 123 }
// или { success: false, error: { type: "FileNotFound", details: ... }, durationMs: 5 }
Как работать с задачами:
*/
/*

**Задача 5. Параллельное выполнение**
/*

*/
Задача 6. Гонка промисов

javascript
/*
Создайте 2 промиса:
- один реджектится через 500мс с "Timeout"
- другой резолвится через случайное время (0-1000мс) с "Data received"
Реализуйте логику: если данные не пришли за 500мс - выводим ошибку
*/
4. Практические задачи
Задача 7. Загрузка данных

javascript
/*
1. Напишите функцию loadUser(id), которая возвращает промис с данными пользователя
   (можно использовать setTimeout и mock-данные)
2. Загрузите данные для 3 пользователей параллельно
3. Выведите массив имен пользователей
*/
Задача 8. Ретри механизм

javascript
/*
Напишите функцию fetchWithRetry(url, retries), которая:
1. Пытается загрузить данные (возвращает промис)
2. При ошибке делает до 3 попыток с задержкой 1 сек
3. Если все попытки неудачны - реджектит промис
*/
5. Продвинутые задачи
Задача 9. Очередь промисов

javascript
/*
Реализуйте класс PromiseQueue:
- constructor(parallel) - указывает сколько промисов можно выполнять параллельно
- add(promiseCreator) - добавляет промис в очередь
- выполнение начинается автоматически
*/
