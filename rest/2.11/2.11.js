let year = prompt('when were u born?','')
if(year==2015) alert('u are right')
if(year!==2015) alert('u are wrong')
if (year==2014) {
    console.log("Cool");
    console.log('great');
}
let ear = prompt('Yr style?')
if(ear == 678) {
    alert('U r good');
} else{
    alert( "u r not good" );
}
let year = prompt ('Yr style?')
if (year <2015) {
    alert(' too soon');
} else if (year > 2015){
    alert('too late');
}else{
    alert('correct');
}

let acessAllowed;
let age = prompt('how old r u', '')
if(age>18){
    acessAllowed = true;
} else{
    acessAllowed = false;
} alert (acessAllowed);

let result = condition ? meaning1 : meaning2;
let lacessAllowed = (age > 18) ? true : false;
  

let q = prompt(' age?', '18');
let message = ( q <3) ? "hey baby":
(q<18) ? "Hey"
(q < 100) ? "hey elder";
let age = prompt('Возраст?', 18);

let message = (age < 3) ? 'Здравствуй, малыш!' :
  (age < 18) ? 'Привет!' :
  (age < 100) ? 'Здравствуйте!' :
  'Какой необычный возраст!';

alert( message );

let company = prompt('who is cat?', '');
(company =="Netscape")?
alert('right') : alert('wrong');

if('0') {
    alert("Hey");
} //Любая строка, кроме пустой (а строка "0" – не пустая), в логическом контексте становится true.

let name = prompt('Which is official name of JS?','');
if( name =='ECMAScript'){
    alert('right');
} else{ 
    alert('Не знаете? ECMAScript!')};

    let num  = prompt(' write number', '');
    if (num > 0){
        alert(1)
    } else if (num < 0){
        alert(-1)
    } else{
        alert(0) };

        let result;
        if (a+b<4){
            result = "мало"
        } else{
            result = "много"
        };

        result = (a + b < 4) ? "мало": "много";
    let message ;
    if (login =="worker"){
        message = 'hey';
    } else if (login =="Director"){
        message = 'Hello';
    }else if (login ==''){
        message =" no login";//Это специфицируется в условии else if (login == ''). Она указывает на то, что не было введено никакого значения. Это означает, что поле ввода пользователя было оставлено пустым, и программа может обработать это как отсутствие логина
    
    }else{
        message ="";//admin guest
    }

    let message = (login =="worker") ? 'hey':
    (login =='Director') ? 'Hello':
    (login = "") ? "no login":
    "";