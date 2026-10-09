export const services = [
 {id:'diagnostics',name:'Диагностика',price:990,max:2500,icon:'⌁',description:'Находим причину неисправности. Проверяем узлы и составляем понятный план ремонта.'},
 {id:'engine',name:'Ремонт двигателя',price:6500,max:45000,icon:'⚙',description:'От замены прокладок до восстановления двигателя. Смета до начала работ.'},
 {id:'suspension',name:'Ходовая часть',price:1800,max:12000,icon:'⛓',description:'Устраняем стуки и вибрации. Проверяем подвеску, рулевое управление и опоры.'},
 {id:'brakes',name:'Тормозная система',price:1500,max:8500,icon:'◎',description:'Меняем колодки, диски и жидкость. Проверяем систему перед выдачей автомобиля.'},
 {id:'oil',name:'Замена масла',price:1200,max:2600,icon:'◈',description:'Подбираем масло по допускам, меняем фильтр и проверяем уровень жидкостей.'},
 {id:'tires',name:'Шиномонтаж',price:2400,max:6000,icon:'⊙',description:'Сезонная смена шин, балансировка и проверка давления. Цена за комплект.'},
 {id:'computer',name:'Компьютерная диагностика',price:1500,max:3500,icon:'⌘',description:'Считываем ошибки, проверяем параметры систем и объясняем результаты.'},
 {id:'maintenance',name:'Обслуживание автомобиля',price:3500,max:15000,icon:'↗',description:'Плановое ТО по регламенту: фильтры, жидкости, контроль ключевых систем.'}
];
export const brands = {Toyota:['Camry','Corolla','RAV4','Land Cruiser'],Kia:['Rio','Ceed','Sportage','Sorento'],Hyundai:['Solaris','Elantra','Tucson','Santa Fe'],Volkswagen:['Polo','Golf','Tiguan','Passat'],BMW:['3 серии','5 серии','X3','X5'],Mercedes:['C-класс','E-класс','GLC','GLE'],LADA:['Vesta','Granta','Niva','Largus'],Renault:['Logan','Duster','Sandero','Kaptur'],Nissan:['Qashqai','X-Trail','Almera','Juke'],'Другая':['Указать при записи']};
export const stages=['Автомобиль принят','Диагностика','Ремонт','Проверка','Готов к выдаче'];
export const problems=['Плановое обслуживание','Шум или вибрация','Не заводится','Ошибка на панели','Скрип при торможении','Другая проблема'];
export function estimate({brand,year,problem,service},catalog=services){
 const s=catalog.find(x=>x.id===service);if(!s||!brands[brand]||!Number.isInteger(Number(year))||year<1980||year>new Date().getFullYear()+1||!problems.includes(problem))throw Error('Заполните все поля калькулятора');
 const premium=['BMW','Mercedes'].includes(brand)?1.35:1;const age=new Date().getFullYear()-year>12?1.15:1;const complexity=problem==='Не заводится'?1.2:1;
 return {min:Math.ceil(s.price*premium*age*complexity/100)*100,max:Math.ceil(s.max*premium*age*complexity/100)*100};
}
export const rub=value=>new Intl.NumberFormat('ru-RU').format(value)+' ₽';
export function validateLead(data){
 if(typeof data.name!=='string'||data.name.trim().length<2||data.name.length>80)throw Error('Введите имя: от 2 до 80 символов');
 const phone=String(data.phone||'').replace(/\D/g,'');if(phone.length!==11||!['7','8'].includes(phone[0]))throw Error('Введите российский телефон из 11 цифр');
 if(!data.consent)throw Error('Подтвердите согласие на обработку данных');
 if(String(data.car||'').trim().length<2||String(data.car).length>120)throw Error('Укажите автомобиль');
 if(data.kind==='problem'&&(String(data.problem||'').trim().length<10||String(data.problem).length>2000))throw Error('Опишите проблему: от 10 до 2000 символов');
 return {...data,name:data.name.trim(),phone:'+7'+phone.slice(1)};
}
