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
 {title:'КАЖДЫЙ УВЕРЕН В СВОЕЙ СХЕМЕ',cases:[
  {person:'МУЖЧИНА ПОСЛЕ КАРАОКЕ',mood:'ПОМЯТЫЙ ПИДЖАК · СВОЙ В ДОСКУ',tag:'«Я ЧЕЛОВЕК НАДЁЖНЫЙ»',skin:'#c59570',coat:'#403d52',hair:'#292321',line:'Слушай, выручай. Ночь была длинная, голова гудит, уснуть вообще не могу. Дай пару таблеток феназепама без этих ваших бумажек. Я человек надёжный, всё будет чётко.',audio:'assets/audio/shift-02/01-karaoke.wav',topic:'Рецептурный отпуск феназепама',choices:[
   ['Отказать в отпуске без рецепта и не подбирать «что-нибудь такое же».',true,-5,12,'Верно. Доверительный тон не меняет правил отпуска и не делает замену безопасной.'],
   ['Продать одну таблетку: одна не считается упаковкой.',false,35,-14,'Количество таблеток не отменяет требований к отпуску препарата.'],
   ['Предложить запить таблетку кофе, чтобы «выровнять эффект».',false,42,-18,'Сочетание советов не делает незаконный и опасный отпуск допустимым.'],
   ['Попросить оставить залог и принести рецепт вечером.',false,30,-12,'Залог не заменяет рецепт.'] ]},
  {person:'ДЕДУШКА-ИНЖЕНЕР',mood:'СЧИТАЕТ В УМЕ · СПОРИТ С ДОЗАТОРОМ',tag:'«МАТЕМАТИКА ЖЕ»',skin:'#d0a17f',coat:'#55615c',hair:'#aaa49b',line:'Внучке четыре, нос заложило. Дома Оксифрин взрослый — двадцать два с половиной микрограмма. Если нажать не до конца, получится половина дозы. Математика же. Или всё-таки нужен другой флакон?',audio:'assets/audio/shift-02/02-engineer.wav',topic:'Оксифрин: детская концентрация и режим',choices:[
   ['22,5 мкг/доза: половина нажатия в каждую ноздрю один раз в день.',false,18,-8,'Частичное нажатие взрослого дозатора не обеспечивает точную детскую дозу.'],
   ['11,25 мкг/доза: одно полное впрыскивание в каждую ноздрю 2–3 раза в сутки, курс 5–7 дней.',true,-3,12,'Верно. Для ребёнка четырёх лет нужна детская дозировка 11,25 мкг/доза.'],
   ['11,25 мкг/доза: два впрыскивания в каждую ноздрю каждые четыре часа.',false,24,-10,'Концентрация выбрана верно, но режим превышает указанный в инструкции.'],
   ['0,01% капли для младенцев: пять капель до исчезновения заложенности.',false,21,-9,'Форма и режим не соответствуют возрасту и инструкции.'] ]},
  {person:'ФЛОРИСТКА ПОСЛЕ РАЗГРУЗКИ',mood:'ГЛАЗА СЛЕЗЯТСЯ · ГОВОРИТ БЫСТРО',tag:'«ОПЯТЬ БЕРЁЗА»',skin:'#b97762',coat:'#65765d',hair:'#3c2826',topic:'Сезонный аллергический конъюнктивит и олопатадин',steps:[
   {label:'ДЕЙСТВУЮЩЕЕ ВЕЩЕСТВО',line:'У меня каждую весну одно и то же: оба глаза чешутся, слёзы текут, красные. Гноя нет, не болят, вижу нормально. На складе сегодня берёзу разгружали — и всё, приехали. Дайте капли, только не такие, после которых я усну стоя.',audio:'assets/audio/shift-02/03-allergy.wav',choices:[
    ['Хлорамфеникол',false,15,-7,'Антибиотик не соответствует описанному сезонному аллергическому сценарию.'],
    ['Натрия гиалуронат',false,6,-3,'Увлажняющие капли могут облегчать сухость, но это не выбранное противоаллергическое вещество.'],
    ['Олопатадин',true,-3,10,'Верно. Олопатадин применяется при симптомах сезонного аллергического конъюнктивита.'],
    ['Тетризолин',false,10,-5,'Уменьшение красноты не равно терапии сезонной аллергической реакции.'] ]},
   {label:'ВЫБОР УПАКОВОК',line:'Оло… как его? Я это название до кассы не донесу. Покажите на коробках, какие именно с этим веществом.',audio:'assets/audio/shift-02/03-packages.wav',multi:true,choices:[
    ['Олоридин 0,1% · Solopharm',true,0,0,'','', 'олопатадин'],
    ['Опатанол 0,1%',true,0,0,'','', 'олопатадин'],
    ['Визин Аллерджи',false,0,0,'','', 'левокабастин'],
    ['Левомицетин, глазные капли',false,0,0,'','', 'хлорамфеникол'] ]}
  ]},
  {person:'БЫВШАЯ ТЕАТРАЛЬНАЯ КОСТЮМЕРША',mood:'СЛАБОЕ ЗРЕНИЕ · НЕ ЛЮБИТ СЮСЮКАНЬЕ',tag:'«ТАБЛЕТНИЦА ПОДВЕЛА»',skin:'#d2a78c',coat:'#4e5262',hair:'#c8c0b5',topic:'Ошибка дозирования метотрексата',steps:[
   {label:'НАЙТИ ОПАСНУЮ ДЕТАЛЬ',line:'Милый человек, дайте хороший гель от язвочек во рту. И ещё слабость какая-то, синяки сами появляются. Неделю назад ревматолог добавил маленькие таблетки для суставов. Я их в таблетницу ко всем утренним положила — чтоб не забывать.',audio:'assets/audio/shift-02/04-pillbox.wav',choices:[
    ['Таблетки маленькие.',false,4,-2,'Размер таблетки сам по себе не объясняет срочность ситуации.'],
    ['Покупательница пользуется таблетницей.',false,5,-2,'Таблетница важна как контекст, но опасность определяется схемой и симптомами.'],
    ['Новый препарат принимается ежедневно, а появились язвы во рту, слабость и синяки.',true,-7,14,'Верно. Сочетание новой схемы и системных симптомов требует проверки на лекарственную ошибку.'],
    ['Она просит гель, а не раствор для полоскания.',false,8,-4,'Выбор местной формы не решает возможную системную проблему.'] ]},
   {label:'СРОЧНОЕ РЕШЕНИЕ',line:'Называется метотрексат. На наклейке что-то про понедельник, но разве лечение бывает раз в неделю? Я шесть дней подряд пила, как все нормальные таблетки.',audio:'assets/audio/shift-02/04-methotrexate.wav',choices:[
    ['Продать гель и попросить прийти, если за три дня не станет лучше.',false,40,-17,'Местное средство может замаскировать симптомы и задержать срочную помощь.'],
    ['Пропустить следующий понедельник и затем продолжить прежнюю схему.',false,34,-15,'Самостоятельная коррекция после возможной передозировки недостаточна.'],
    ['Дать сорбент, чтобы уменьшить всасывание уже принятых таблеток.',false,37,-16,'После шести дней приёма это не заменяет срочную медицинскую оценку.'],
    ['Не маскировать симптомы; объяснить риск передозировки и направить за срочной медицинской помощью.',true,-12,18,'Верно. Ежедневный приём недельного метотрексата и симптомы токсичности требуют срочной помощи.'] ]}
  ]}
 ]}
];

const $=id=>document.getElementById(id);
let selectedShift=0,turn=0,stage=0,caseCorrect=true,attempts=2,score=0,trust=50,risk=0,errors=[],freeRepeat=false,multiSelected=new Set();
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
 multiSelected.clear();
 $('shiftNumber').textContent=String(selectedShift+1).padStart(2,'0');
 $('progress').textContent=`${String(turn+1).padStart(2,'0')} / 04`;
 $('progressBar').style.width=`${(turn+1)*25}%`;
 $('caseTag').textContent=totalStages>1?`ПОКУПАТЕЛЬ ${turn+1} / 4 · ЭТАП ${stage+1} ИЗ ${totalStages}`:`ПОКУПАТЕЛЬ ${turn+1} / 4`;$('name').textContent=c.person;$('mood').textContent=c.mood;$('line').textContent=step.line;$('badge').textContent=totalStages>1?step.label:c.tag;
 customer.style.setProperty('--skin',c.skin);customer.style.setProperty('--coat',c.coat);customer.querySelector('.hair').style.background=c.hair;
 $('choices').className=`choices ${step.visual||''}`;$('choices').innerHTML=step.choices.map((choice,i)=>`<button class="choice" data-i="${i}"${step.multi?' aria-pressed="false"':''}><b>${i+1}</b>${choice[5]?`<img src="${choice[5]}" alt="">`:''}<span>${choice[0]}${choice[6]?`<small>${choice[6]}</small>`:''}</span></button>`).join('')+(step.multi?'<button class="confirm-multi" data-action="confirm" disabled>ПРОВЕРИТЬ ВЫБОР →</button>':'');
 $('queue').innerHTML='<i></i>'.repeat(3-turn);customer.className=sameCustomer?'customer':'customer enter';$('sound').hidden=!step.audio;$('repeatVoice').hidden=!step.audio||document.body.classList.contains('not-started');if(!document.body.classList.contains('not-started')){$('line').focus({preventScroll:true});playVoice(step)}
}
function choose(index,override){
 const c=shifts[selectedShift].cases[turn],step=c.steps?.[stage]||c,choice=override||step.choices[index],lastStage=!c.steps||stage===c.steps.length-1;
 risk=Math.max(0,risk+choice[2]);trust=Math.max(0,Math.min(100,trust+choice[3]));
 if(!choice[1])caseCorrect=false;
 if(lastStage){if(caseCorrect)score++;else errors.push(c.topic)}
 $('score').textContent=`${score} / 4`;$('trust').textContent=trust;$('risk').textContent=risk;
 const resultTitle=c.steps?(lastStage?(caseCorrect?'КЕЙС ЗАСЧИТАН':'КЕЙС НЕ ЗАСЧИТАН'):(choice[1]?'ЭТАП ВЕРНО':'ЭТАП НЕВЕРНО')):(choice[1]?'ВЕРНО':'НЕВЕРНО');
 $('resultText').innerHTML=`<strong>${resultTitle}</strong><small>${choice[4]}</small>`;
 const resultCorrect=lastStage?caseCorrect:choice[1];
 $('result').className=`result ${resultCorrect?'correct':'wrong'}`;$('result').hidden=false;
 $('choices').querySelectorAll('button').forEach((button,i)=>{button.disabled=true;if(override&&button.dataset.i!==undefined){if(multiSelected.has(i))button.classList.add(step.choices[i][1]?'selected-correct':'selected-wrong')}else if(i===index)button.classList.add(choice[1]?'selected-correct':'selected-wrong')});
 $('next').textContent=lastStage?(turn===3?'ЗАВЕРШИТЬ СМЕНУ →':'СЛЕДУЮЩИЙ ПОКУПАТЕЛЬ →'):`ПРОДОЛЖИТЬ · ЭТАП ${stage+2} ИЗ ${c.steps.length} →`;$('next').focus();
 if(lastStage)customer.classList.add('exit');
}
function finish(){
 voicePlayer.pause();
 const title=score===4?'СМЕНА БЕЗ ОШИБОК':score===3?'СМЕНА ПРИНЯТА':score===2?'ЕСТЬ РИСК':'СМЕНУ НУЖНО ПОВТОРИТЬ';
 const text=score===4?'Вы распознали все четыре ситуации. Курс сейчас не нужен — только разбор решений.':score===3?'Одна ошибка не обнуляет смену. Разберите именно её, без лишнего обучения.':score===2?'Две ошибки могли повлиять на безопасность покупателей. Начните с более критичной темы.':'Сначала короткий разбор, затем можно сразу повторить смену.';
 $('endingTitle').textContent=title;$('endingText').textContent=`${score}/4 · доверие ${trust} · риск ${risk}. ${text}`;
 $('recommendation').innerHTML=score===4?'<b>НАГРАДА</b><span>Значок «Смена без ошибок» · серия идеальных смен: 1</span>':`<b>МАТЕРИАЛ ПО ОШИБКЕ</b><span>${errors[0]}</span><button type="button">ОТКРЫТЬ РАЗБОР →</button>`;
 freeRepeat=score<=1;$('restart').textContent=freeRepeat?'ПОВТОРИТЬ СМЕНУ':'К СПИСКУ СМЕН';
 $('ending').hidden=false;
}
function start(){turn=0;stage=0;caseCorrect=true;score=0;trust=50;risk=0;errors=[];$('score').textContent='0 / 4';$('trust').textContent=50;$('risk').textContent=0;document.body.classList.remove('not-started');$('intro').hidden=true;render()}
$('start').onclick=start;
$('changeShift').onclick=()=>{selectedShift=(selectedShift+1)%2;$('shiftName').textContent=String(selectedShift+1).padStart(2,'0')};
$('sound').onclick=()=>{voiceEnabled=!voiceEnabled;voicePlayer.pause();updateSoundButton();if(voiceEnabled){const c=shifts[selectedShift].cases[turn];playVoice(c.steps?.[stage]||c)}};
$('repeatVoice').onclick=()=>{voiceEnabled=true;updateSoundButton();const c=shifts[selectedShift].cases[turn];playVoice(c.steps?.[stage]||c)};
$('choices').onclick=e=>{const button=e.target.closest('button');if(!button||button.disabled)return;const c=shifts[selectedShift].cases[turn],step=c.steps?.[stage]||c;if(button.dataset.action==='confirm'){const correct=step.choices.every((choice,i)=>choice[1]===multiSelected.has(i));choose(-1,[null,correct,correct?-3:14,correct?11:-7,correct?'Верно. Все выбранные упаковки содержат олопатадин.':'Нужно выбрать все и только те упаковки, где действующее вещество — олопатадин.']);return}if(step.multi){const i=+button.dataset.i;multiSelected.has(i)?multiSelected.delete(i):multiSelected.add(i);button.classList.toggle('multi-selected');button.setAttribute('aria-pressed',String(multiSelected.has(i)));$('choices').querySelector('[data-action="confirm"]').disabled=multiSelected.size===0;return}choose(+button.dataset.i)};
$('next').onclick=()=>{const c=shifts[selectedShift].cases[turn];$('result').hidden=true;if(c.steps&&stage<c.steps.length-1){stage++;render(true);return}stage=0;caseCorrect=true;if(++turn===4)finish();else render()};
$('restart').onclick=()=>{voicePlayer.pause();if(freeRepeat){$('ending').hidden=true;freeRepeat=false;start();return}$('ending').hidden=true;$('intro').hidden=false;document.body.classList.add('not-started');selectedShift=(selectedShift+1)%2;$('shiftName').textContent=String(selectedShift+1).padStart(2,'0')};
updateSoundButton();updateAttempts();render();
console.assert(shifts.every(shift=>shift.cases.length===4)&&shifts[0].cases[2].steps.length===2&&shifts[0].cases[3].steps.length===3&&shifts[1].cases[2].steps.length===2&&shifts[1].cases[3].steps.length===2,'Сценарий смен повреждён');
