switch(x){
    case "value1":// if (x ==="value1")
[break]
    case"value2"// if(x==='value2')
[break]
    default://ниче не совпало
        [break]
} 

let a = 2+2;
switch(a){
    case 3:
        alert('little');
        break;
        case 4:
            alert('right');
            break;
            case 5:
                alert('too much');
                break;
                default:
                    alert('no such z');
}Здесь оператор switch последовательно сравнит a со всеми вариантами из case.

Сначала 3, затем – так как нет совпадения – 4. Совпадение найдено, будет выполнен этот вариант, со строки alert( 'В точку!' ) и далее, до ближайшего break, который прервёт выполнение.

Если break нет, то выполнение пойдёт ниже по следующим case, при этом остальные проверки игнорируются
let a = 2+2; switch(a){
    case 3: alert("0");
    case 4: alert(1);
    case 5 : alert('')
    default: alert (3)

}
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Маловато' );
  case 4:
    alert( 'В точку!' );
  case 5:
    alert( 'Перебор' );
  default:
    alert( "Нет таких значений" );
}

let a = '1';
let b = 0;
switch (+a){
    case b +1:
        alert("Выполнится, т.к. значением +a будет 1, что в точности равно b+1");
    break;
default:
    alert("Это не выполнится");
}

let a = 3;
switch(a){
    case 4:
alert('right');
break;
case 3:// (*) группируем оба case
case 5:
    alert('wrong');
    alert('fool');
    break;
    default:
        alert('Strange')

}Возможность группировать case – это побочный эффект того, как switch/case работает без break. Здесь выполнение case 3 начинается со строки (*) и продолжается в case 5, потому что отсутствует break.

let a =prompt(" let number");
switch(a){
    case "0":
        case "1":
            alert( 'Один или ноль' );
            break;
            case'2':
            alert('2');
            break;
            case 3:
                alert('dont work');
                break;
                default:
                    alert( "no know")
        }Для '0' и '1' выполнится первый alert.
        Для '2' – второй alert.
        Но для 3,результат выполнения prompt будет строка "3", которая не соответствует строгому равенству === с числом 3. Таким образом, мы имеем «мёртвый код» в case 3! Выполнится вариант default.
        switch (browser){
            case "Edge":
                alert ('Youve got the Edge!');
                break;
                case "Chrome":
                    case "Firefox":
                        case "Opera":
                            alert('Okay we support these browsers too')
        break;
    default:
        alert('We hope that this page looks ok!' ); }

        let browser;
    if (browser == "Edge"){
        alert('Youve got the Edge!');}
        else if (browser == "Chrome" || browser == "Firefox"|| browser == "Opera"){
            alert('Okay we support these browsers too');}
            else {
                alert("'We hope that this page looks ok!' ");}


                const number = +prompt('Введите число между 0 и 3', '');
                if (number === 0){
                    alert ('Вы ввели число 0');}
                    if (number === 1){
                        alert ('Вы ввели число 1')
                    } if (number === 2 || number == 3){
                        alert('Вы ввели число 2 or 3')
                    };
const number = +prompt('Введите число между 0 и 3', '');
switch(number){
    case 0 :
        alert('Вы ввели число 0');
        break;
        case 1 :
            alert('Вы ввели число 1');;
            break;
            case 2:
                case 3:
                    alert('Вы ввели число 2, а может и 3');
                    break;
}

                
        