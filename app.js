const shifts=[
 {title:'НОЧЬ НАЧИНАЕТСЯ СПОКОЙНО',cases:[
  {person:'МУЖЧИНА, ОКОЛО 27',mood:'КУРЬЕР · ТОРОПИТСЯ',tag:'«ВЫРУЧИ ПО-БРАТСКИ»',skin:'#c59570',coat:'#384e47',hair:'#332b27',line:'Слушай, выручи по-братски. Мне сегодня ещё всю ночь кататься. Дай что-нибудь прям бодрое, не кофе. Рецепт, если надо, завтра занесу. Я аккуратно.',audio:'assets/audio/shift-01/01-courier.wav',topic:'Рецептурный отпуск и границы фармконсультирования',choices:[
   ['Продать рецептурный стимулятор — человек понимает, что просит.',false,35,-14,'Касса пополнилась, но просьба без рецепта не стала безопаснее.'],
   ['Отказать в рецептурном препарате и уточнить, почему он не спал.',true,-3,10,'Верно. Отказ не заканчивает консультацию: причина бессонной ночи тоже важна.'],
   ['Продать два энергетика и посоветовать выпить вместе.',false,18,-5,'Формально это не лекарство, но безопасной рекомендация не стала.'],
   ['Сказать «ничего нет» и закончить разговор.',false,0,-2,'Опасной продажи нет, но профессиональной помощи тоже.'] ]},
  {person:'ЖЕНЩИНА, ОКОЛО 36',mood:'ПОСЛЕ РАБОТЫ · УСТАЛА',tag:'«БОЛЕТЬ НЕКОГДА»',skin:'#d7aa8d',coat:'#59656f',hair:'#68493c',line:'Я пакетик от простуды выпила часа полтора назад, а голова всё равно трещит. Дайте парацетамол. Можно сразу две? Мне завтра на работу.',audio:'assets/audio/shift-01/02-cold-medicine.wav',topic:'Состав комбинированных препаратов от простуды',choices:[
   ['Продать парацетамол: прошло уже полтора часа.',false,22,-8,'Сначала стоило проверить состав уже принятого пакетика.'],
   ['Уточнить название пакетика, дозу и что ещё принимала сегодня.',true,-4,11,'В составе пакетика уже был парацетамол. Вы предотвратили дублирование.'],
   ['Вместо парацетамола сразу предложить ибупрофен.',false,12,-4,'Замена препарата не отменяет сбор информации.'],
   ['Сразу отправить к врачу, потому что пакетик не помог.',false,2,-2,'Без дополнительных красных флагов это избыточная маршрутизация.'] ]},
  {person:'ЖЕНЩИНА, ОКОЛО 31',mood:'МАМА · НЕ ВЫСПАЛАСЬ',tag:'«ТАКОЕ ЖЕ, НО РОССИЙСКОЕ»',skin:'#c98e70',coat:'#7f9872',hair:'#493229',topic:'МНН, торговые наименования и детские дозировки',steps:[
   {label:'ВЫБОР МНН',line:'Дочке четыре. Раньше врач назначал Отривин Для Детей — помогал. Сейчас нужен спрей с тем же действующим веществом, но лучше российского производителя. Какое МНН ищем?',audio:'assets/audio/shift-01/03-mnn.wav',choices:[
    ['Ксилометазолин',true,-2,7,'Верно. У детского Отривина и искомых аналогов МНН — ксилометазолин.'],
    ['Оксиметазолин',false,9,-3,'Это другое действующее вещество, хотя тоже встречается в назальных средствах.'],
    ['Фенилэфрин',false,9,-3,'Это не МНН указанного покупателем препарата.'],
    ['Натрия хлорид',false,7,-2,'Солевой раствор не является прямым аналогом сосудосуживающего препарата.'] ]},
   {label:'ВЫБОР УПАКОВКИ',line:'МНН уточнили. Покажите теперь конкретный детский спрей с ксилометазолином. Если есть российский — возьму его.',audio:'assets/audio/shift-01/03-package.wav',visual:'products',choices:[
    ['Ксилокт-Солофарм',true,-2,8,'Подходит по всем условиям: ксилометазолин, детская дозировка 35 мкг/доза, спрей, российский производитель.','assets/products/ksilokt-child.png','35 мкг/доза · 2+ · Solopharm'],
    ['Отривин Для Детей',false,2,1,'МНН, форма и детская дозировка подходят, но покупатель отдельно попросил российский вариант.','assets/products/otrivin-child.png','35 мкг/доза · 2+'],
    ['Снуп 2+',false,2,1,'Это подходящий детский аналог по МНН и форме, но не российский производитель — условие покупателя не выполнено.','assets/products/snup-child-user.png','45 мкг/доза · 2+'],
    ['Ксилокт-Солофарм взрослый',false,24,-8,'Бренд российский, но дозировка 140 мкг/доза предназначена не для ребёнка четырёх лет.','assets/products/ksilokt-adult.png','140 мкг/доза · 6+'] ]}
  ]},
  {person:'ЖЕНЩИНА, ОКОЛО 34',mood:'С РЕБЁНКОМ · СОМНЕВАЕТСЯ',tag:'«А ЧЕМ ОТЛИЧАЕТСЯ?»',skin:'#bd765b',coat:'#6d8066',hair:'#3b2926',topic:'ЛинАква: возраст и режимы промывания',steps:[
   {label:'РЕКОМЕНДАЦИЯ',line:'Сыну полтора года, сильный насморк. Хочу именно промывать, не сосудосуживающие капли. Посоветуйте большой баллон, желательно российский.',audio:'assets/audio/shift-01/04-recommendation.wav',visual:'products compare',choices:[
    ['ЛинАква Софт',true,-2,6,'Подходит: изотоническая морская вода, аэрозоль 150 мл, применение с 1 года, российский производитель.','assets/products/linaqua-soft.png','0,9% · 150 мл · 1+ · мягкий душ'],
    ['Аква Марис Беби',false,1,2,'По возрасту и задаче подходит, но не выполняет просьбу показать российский вариант.','assets/products/aquamaris-baby.png','изотонический · 150 мл · 3 мес.+'],
    ['ЛинАква Норм',false,10,-4,'Это тоже изотоническая морская вода, но форма «Норм» со струёй указана для детей с 2 лет — ребёнку пока полтора.','assets/products/linaqua-norm.png','0,9% · 150 мл · 2+ · струя'],
    ['Детский ксилометазолин',false,17,-7,'Это сосудосуживающий препарат, а покупатель явно просит средство для промывания.'] ]},
   {label:'ОТВЕТ НА ВОЗРАЖЕНИЕ',line:'Смотрю на ЛинАква Софт. А чем он вообще отличается от Аква Мариса Беби? Там же и там просто морская вода. Это только упаковка другая?',audio:'assets/audio/shift-01/04-objection.wav',choices:[
    ['ЛинАква лечит насморк, а Аква Марис годится только для гигиены.',false,16,-8,'Такого деления нет: оба средства применяются для промывания и орошения.'],
    ['ЛинАква содержит лекарство, поэтому действует сильнее.',false,19,-9,'В ЛинАква Софт — изотоническая натуральная стерильная морская вода, не сосудосуживающий препарат.'],
    ['Оба — изотоническая морская вода. Отличаются конкретные формы: ЛинАква Софт — с 1 года, «мягкий душ»/«душ» и кольцо-ограничитель; Аква Марис Беби — с 3 месяцев и со своей анатомической детской насадкой.',true,-3,10,'Верно. Сравниваем конкретные формы и способ подачи, не объявляя один бренд целиком лучше другого.'],
    ['Ничем, кроме цены и названия.',false,7,-4,'Состав близкий, но возрастные указания и конструкция насадки различаются.'] ]},
   {label:'ВЫБОР РЕЖИМА',line:'А если брать ЛинАква — почему именно Софт? Рядом стоит Норм, коробка почти такая же. Может, струя лучше промоет?',audio:'assets/audio/shift-01/04-mode.wav',visual:'products compare',choices:[
    ['ЛинАква Софт: с 1 года, «мягкий душ»/«душ», есть ограничительное кольцо.',true,-3,10,'Верно. Для ребёнка полутора лет подходит Софт; более сильный поток сам по себе не означает лучший выбор.','assets/products/linaqua-soft.png','0,9% · 1+ · мягкий душ / душ'],
    ['ЛинАква Норм: струя промывает сильнее, поэтому возраст не важен.',false,22,-10,'ЛинАква Норм со струёй указан с 2 лет, а ребёнку только полтора.','assets/products/linaqua-norm.png','0,9% · 2+ · струя'],
    ['Можно любой: у них одинаковая концентрация 0,9%.',false,12,-6,'Одинаковая концентрация не отменяет различий по возрасту и насадке.'],
    ['Лучше сразу ЛинАква Форте 2,1% — чем больше соли, тем эффективнее.',false,18,-8,'Гипертонический раствор нельзя автоматически считать лучшим вариантом для обычного промывания.','assets/products/linaqua-forte.png','2,1% · 150 мл · 2+ · струя'] ]}
  ]}
 ]},
 {title:'ВСЕ УЖЕ ЗНАЮТ, ЧТО ИМ НУЖНО',cases:[
  {person:'МУЖЧИНА, ОКОЛО 58',mood:'ВОДИТЕЛЬ · УВЕРЕН',tag:'«СИНИЙ КОТ»',skin:'#c59570',coat:'#48546b',hair:'#7a7067',line:'Дочка сказала купить «синий кот». Ну, от кашля который. Коробка вроде синяя. Давайте его, я машину у входа бросил.',topic:'Алгоритм консультации при кашле',choices:[
   ['Сразу принести Синекод: название почти совпало.',false,18,-7,'Угадать название недостаточно: препарат оказался нужен пятилетнему внуку с влажным кашлем.'],
   ['Уточнить, кому препарат, какой кашель, сколько длится и есть ли тревожные симптомы.',true,-3,11,'Верно. Смешное название не отменяет нормальную консультацию.'],
   ['Предложить любой сироп синего цвета.',false,20,-9,'Цвет упаковки — плохая клиническая опора.'],
   ['Попросить фотографию упаковки и больше ничего не спрашивать.',false,4,-2,'Фото поможет с названием, но не с уместностью препарата.'] ]},
  {person:'МУЖЧИНА, ОКОЛО 40',mood:'ГОВОРИТ В НОС · НЕ ТРЕВОЖИТСЯ',tag:'«КАПЛИ ПОМОЩНЕЕ»',skin:'#d2a07d',coat:'#414e48',hair:'#302925',line:'Дайте капли помощнее. Эти уже перестали пробивать. Да обычный насморк, недели три капаю, может четыре. Без них вообще не дышу.',topic:'Медикаментозный ринит',choices:[
   ['Предложить ксилометазолин большей концентрации.',false,31,-12,'Повышение концентрации может усилить проблему.'],
   ['Автоматически сменить действующее вещество.',false,22,-8,'Другой сосудосуживающий препарат не заменяет оценку врача.'],
   ['Объяснить риск медикаментозного ринита и направить к ЛОР-врачу.',true,-6,14,'Верно. Важной оказалась длительность применения, а не сила капель.'],
   ['Продать тот же препарат, но попросить применять реже.',false,25,-9,'Совет не решает ситуацию длительного злоупотребления.'] ]},
  {person:'ЖЕНЩИНА, ОКОЛО 44',mood:'СОБРАННА · ЗНАЕТ ПРЕПАРАТЫ',tag:'«Я ИХ ЧЕРЕДУЮ»',skin:'#af795f',coat:'#5f5368',hair:'#252127',line:'Мне опять упаковку обезболивающего. Голова почти каждый день. Я чередую: парацетамол, ибупрофен и комбинированные, чтобы организм не привыкал. Так уже месяца четыре. Сегодня что лучше взять?',topic:'Лекарственно-индуцированная головная боль',choices:[
   ['Продать средство с другим действующим веществом.',false,25,-10,'Чередование препаратов не устраняет риск лекарственно-индуцированной боли.'],
   ['Предложить более сильный комбинированный анальгетик.',false,34,-14,'Усиление терапии без оценки может ухудшить ситуацию.'],
   ['Уточнить частоту приёма, объяснить возможную связь с болью и рекомендовать врача.',true,-7,15,'Верно. Почти ежедневный приём месяцами — ключевой сигнал.'],
   ['Продать маленькую упаковку для ограничения.',false,18,-6,'Размер упаковки не заменяет маршрутизацию.'] ]},
  {person:'ЖЕНЩИНА, ОКОЛО 67',mood:'ДЕРЖИТСЯ ЗА ОДИН ГЛАЗ',tag:'«НАВЕРНОЕ, МИГРЕНЬ»',skin:'#d7aa8d',coat:'#374450',hair:'#c8c3b8',line:'Наверное, мигрень разыгралась. Слева глаз ломит и голова над ним, всё как в тумане. На фонари смотрю — вокруг цветные круги. Ещё подташнивает. Дайте что-нибудь сильное, я домой пойду полежу.',topic:'Красный болезненный глаз',choices:[
   ['Продать средство от мигрени и посоветовать темноту.',false,42,-17,'Сочетание симптомов не похоже на безопасный сценарий самолечения.'],
   ['Предложить обезболивающее и капли от покраснения.',false,37,-15,'Это может задержать неотложную помощь.'],
   ['Срочно направить за неотложной офтальмологической помощью.',true,-10,18,'Верно. Болезненный глаз, туман, ореолы и тошнота — неотложная ситуация.'],
   ['Измерить давление и при нормальном результате отпустить домой.',false,30,-11,'Нормальное давление не исключает острую офтальмологическую проблему.'] ]}
 ]}
];

const $=id=>document.getElementById(id);
const attemptKey='ne-navredi-shifts-attempts';
function loadAttempts(){
 const today=new Date().toISOString().slice(0,10),saved=JSON.parse(localStorage.getItem(attemptKey)||'null');
 if(!saved)return {count:2,date:today};
 const days=Math.max(0,Math.floor((new Date(today)-new Date(saved.date))/86400000));
 return {count:Math.min(3,saved.count+days),date:today};
}
let attemptState=loadAttempts(),selectedShift=0,turn=0,stage=0,caseCorrect=true,attempts=attemptState.count,score=0,trust=50,risk=0,attemptSpent=false,errors=[],freeRepeat=false;
const customer=$('customer');
const voicePlayer=new Audio();
let voiceEnabled=true;

function updateSoundButton(){
 $('sound').textContent=`ЗВУК: ${voiceEnabled?'ВКЛ':'ВЫКЛ'}`;$('sound').setAttribute('aria-pressed',String(voiceEnabled));
}
function playVoice(step){
 voicePlayer.pause();voicePlayer.currentTime=0;
 if(!voiceEnabled||!step.audio||document.body.classList.contains('not-started'))return;
 voicePlayer.src=step.audio;voicePlayer.play().catch(()=>console.warn(`Не удалось включить ${step.audio}`));
}

function stars(){return '★'.repeat(attempts)+'☆'.repeat(3-attempts)}
function updateAttempts(){ $('stars').textContent=stars();$('topStars').textContent=stars();$('attemptText').textContent=`ДОСТУПНО ${attempts} ${attempts===1?'СМЕНА':'СМЕНЫ'}` }
function render(sameCustomer=false){
 const c=shifts[selectedShift].cases[turn],step=c.steps?.[stage]||c,totalStages=c.steps?.length||1;
 $('shiftNumber').textContent=String(selectedShift+1).padStart(2,'0');
 $('progress').textContent=`${String(turn+1).padStart(2,'0')} / 04`;
 $('progressBar').style.width=`${(turn+1)*25}%`;
 $('caseTag').textContent=totalStages>1?`ПОКУПАТЕЛЬ ${turn+1} / 4 · ЭТАП ${stage+1} ИЗ ${totalStages}`:`ПОКУПАТЕЛЬ ${turn+1} / 4`;$('name').textContent=c.person;$('mood').textContent=c.mood;$('line').textContent=step.line;$('badge').textContent=totalStages>1?step.label:c.tag;
 customer.style.setProperty('--skin',c.skin);customer.style.setProperty('--coat',c.coat);customer.querySelector('.hair').style.background=c.hair;
 $('choices').className=`choices ${step.visual||''}`;$('choices').innerHTML=step.choices.map((choice,i)=>`<button class="choice" data-i="${i}"><b>${i+1}</b>${choice[5]?`<img src="${choice[5]}" alt="">`:''}<span>${choice[0]}${choice[6]?`<small>${choice[6]}</small>`:''}</span></button>`).join('');
 $('queue').innerHTML='<i></i>'.repeat(3-turn);customer.className=sameCustomer?'customer':'customer enter';$('sound').hidden=!step.audio;$('repeatVoice').hidden=!step.audio||document.body.classList.contains('not-started');if(!document.body.classList.contains('not-started')){$('choices').querySelector('button')?.focus();playVoice(step)}
}
function choose(index){
 const c=shifts[selectedShift].cases[turn],step=c.steps?.[stage]||c,choice=step.choices[index],lastStage=!c.steps||stage===c.steps.length-1;
 if(!attemptSpent){attempts--;attemptSpent=true;localStorage.setItem(attemptKey,JSON.stringify({count:attempts,date:new Date().toISOString().slice(0,10)}));updateAttempts()}
 risk=Math.max(0,risk+choice[2]);trust=Math.max(0,Math.min(100,trust+choice[3]));
 if(!choice[1])caseCorrect=false;
 if(lastStage){if(caseCorrect)score++;else errors.push(c.topic)}
 $('score').textContent=`${score} / 4`;$('trust').textContent=trust;$('risk').textContent=risk;
 const resultTitle=c.steps?(lastStage?(caseCorrect?'КЕЙС ЗАСЧИТАН':'КЕЙС НЕ ЗАСЧИТАН'):(choice[1]?'ЭТАП ВЕРНО':'ЭТАП НЕВЕРНО')):(choice[1]?'ВЕРНО':'НЕВЕРНО');
 $('resultText').innerHTML=`<strong>${resultTitle}</strong><small>${choice[4]}</small>`;
 const resultCorrect=lastStage?caseCorrect:choice[1];
 $('result').className=`result ${resultCorrect?'correct':'wrong'}`;$('result').hidden=false;
 $('choices').querySelectorAll('button').forEach((button,i)=>{button.disabled=true;if(i===index)button.classList.add(choice[1]?'selected-correct':'selected-wrong')});
 $('next').textContent=lastStage?(turn===3?'ЗАВЕРШИТЬ СМЕНУ →':'СЛЕДУЮЩИЙ ПОКУПАТЕЛЬ →'):`ПРОДОЛЖИТЬ · ЭТАП ${stage+2} ИЗ ${c.steps.length} →`;$('next').focus();
 if(lastStage)customer.classList.add('exit');
}
function finish(){
 voicePlayer.pause();
 const title=score===4?'СМЕНА БЕЗ ОШИБОК':score===3?'СМЕНА ПРИНЯТА':score===2?'ЕСТЬ РИСК':'СМЕНУ НУЖНО ПОВТОРИТЬ';
 const text=score===4?'Вы распознали все четыре ситуации. Курс сейчас не нужен — только разбор решений.':score===3?'Одна ошибка не обнуляет смену. Разберите именно её, без лишнего обучения.':score===2?'Две ошибки могли повлиять на безопасность покупателей. Начните с более критичной темы.':'Сначала короткий разбор, затем можно повторить эту смену без новой звезды.';
 $('endingTitle').textContent=title;$('endingText').textContent=`${score}/4 · доверие ${trust} · риск ${risk}. ${text}`;
 $('recommendation').innerHTML=score===4?'<b>НАГРАДА</b><span>Значок «Смена без ошибок» · серия идеальных смен: 1</span>':`<b>МАТЕРИАЛ ПО ОШИБКЕ</b><span>${errors[0]}</span><button type="button">ОТКРЫТЬ РАЗБОР →</button>`;
 freeRepeat=score<=1;$('restart').textContent=freeRepeat?'ПОВТОРИТЬ БЕЗ НОВОЙ ЗВЕЗДЫ':'К СПИСКУ СМЕН';
 $('ending').hidden=false;
}
function start(isFree=false){if(!isFree&&!attempts)return;turn=0;stage=0;caseCorrect=true;score=0;trust=50;risk=0;errors=[];attemptSpent=isFree;$('score').textContent='0 / 4';$('trust').textContent=50;$('risk').textContent=0;document.body.classList.remove('not-started');$('intro').hidden=true;render()}
$('start').onclick=()=>start(false);
$('changeShift').onclick=()=>{selectedShift=(selectedShift+1)%2;$('shiftName').textContent=String(selectedShift+1).padStart(2,'0')};
$('sound').onclick=()=>{voiceEnabled=!voiceEnabled;voicePlayer.pause();updateSoundButton();if(voiceEnabled){const c=shifts[selectedShift].cases[turn];playVoice(c.steps?.[stage]||c)}};
$('repeatVoice').onclick=()=>{voiceEnabled=true;updateSoundButton();const c=shifts[selectedShift].cases[turn];playVoice(c.steps?.[stage]||c)};
$('choices').onclick=e=>{const button=e.target.closest('button');if(button&&!button.disabled)choose(+button.dataset.i)};
$('next').onclick=()=>{const c=shifts[selectedShift].cases[turn];$('result').hidden=true;if(c.steps&&stage<c.steps.length-1){stage++;render(true);return}stage=0;caseCorrect=true;if(++turn===4)finish();else render()};
$('restart').onclick=()=>{voicePlayer.pause();if(freeRepeat){$('ending').hidden=true;freeRepeat=false;start(true);return}$('ending').hidden=true;$('intro').hidden=false;document.body.classList.add('not-started');selectedShift=(selectedShift+1)%2;$('shiftName').textContent=String(selectedShift+1).padStart(2,'0');$('start').disabled=!attempts;$('start').textContent=attempts?'НАЧАТЬ СМЕНУ →':'НОВЫЕ СМЕНЫ — ЗАВТРА'};
updateSoundButton();updateAttempts();render();
console.assert(shifts.every(shift=>shift.cases.length===4)&&shifts[0].cases[2].steps.length===2&&shifts[0].cases[3].steps.length===3,'Сценарий смен повреждён');
