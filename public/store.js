import {services,validateLead,stages} from './data.js';
const KEY='moment-portfolio-v1';
function initial(){return {services:structuredClone(services),orders:[{id:'KM-1042',name:'Алексей · пример',phone:'+79000000001',car:'Toyota Camry · 2019',service:'brakes',date:'2026-10-12',time:'11:00',status:2,kind:'booking',created:'2026-10-09T10:00:00Z',history:[{status:0,at:'2026-10-09T08:00:00Z'},{status:1,at:'2026-10-09T09:00:00Z'},{status:2,at:'2026-10-09T10:00:00Z'}]}],cars:[{id:'CAR-1',name:'Алексей · пример',phone:'+79000000001',car:'Toyota Camry · 2019',plate:'Демонстрационный автомобиль'}],schedule:{open:'09:00',close:'20:00',blocked:[]}};}
export function read(){try{const raw=localStorage.getItem(KEY);return raw?JSON.parse(raw):initial();}catch{throw Error('Не удалось прочитать данные. Разрешите хранение данных в браузере.');}}
export function save(data){try{localStorage.setItem(KEY,JSON.stringify(data));}catch{throw Error('Не удалось сохранить данные. Проверьте доступ к хранилищу браузера.');}}
export function update(fn){const data=read();fn(data);save(data);return data;}
export function slots(date){const d=read();const out=[];for(let hour=Number(d.schedule.open.slice(0,2));hour<Number(d.schedule.close.slice(0,2));hour++){const t=String(hour).padStart(2,'0')+':00';if(!d.schedule.blocked.includes(date+' '+t)&&!d.orders.some(o=>o.date===date&&o.time===t&&o.kind==='booking'))out.push(t);}return out;}
export function addLead(input){const lead=validateLead(input);const data=read();if(lead.kind==='booking'){
 if(!data.services.some(s=>s.id===lead.service))throw Error('Выберите услугу');
 const date=new Date(lead.date+'T00:00:00');const today=new Date();today.setHours(0,0,0,0);if(!Number.isFinite(date.getTime())||date<today)throw Error('Выберите будущую дату');
 if(!slots(lead.date).includes(lead.time))throw Error('Это время уже занято. Выберите другое.');
 if(date.toDateString()===today.toDateString()&&Number(lead.time.slice(0,2))<=new Date().getHours())throw Error('Это время уже прошло. Выберите другое.');
 }
 const order={...lead,id:'KM-'+crypto.randomUUID().slice(0,8).toUpperCase(),created:new Date().toISOString(),status:0,history:[{status:0,at:new Date().toISOString()}]};data.orders.unshift(order);if(!data.cars.some(c=>c.car===lead.car&&c.phone===lead.phone))data.cars.push({id:crypto.randomUUID(),name:lead.name,phone:lead.phone,car:lead.car,plate:''});save(data);return order;
}
export function changeStatus(id,status){if(!Number.isInteger(status)||status<0||status>=stages.length)throw Error('Некорректный статус');return update(d=>{const o=d.orders.find(x=>x.id===id);if(!o)throw Error('Заказ не найден');o.status=status;o.history.push({status,at:new Date().toISOString()});});}
