const shifts=[
 {title:'НОЧЬ НАЧИНАЕТСЯ СПОКОЙНО',cases:[
  {person:'МУЖЧИНА, ОКОЛО 27',mood:'КУРЬЕР · ТОРОПИТСЯ',tag:'«ВЫРУЧИ ПО-БРАТСКИ»',skin:'#c59570',coat:'#384e47',hair:'#332b27',line:'Привет, слушай, выручи по-братски. Мне сегодня ещё всю ночь кататься. Две чашки кофе выпил — вообще не помогает. Дай что-нибудь прям бодрое. Рецепт завтра занесу.',audio:'assets/audio/shift-01/01-courier-request.wav',topic:'Рецептурный отпуск и границы фармконсультирования',choices:[
   ['Продать рецептурный стимулятор — человек понимает, что просит.',false,35,-14,'«Спасибо огромное, вы очень выручили. С меня шоколадка, честно».<br><em>Он уехал на ночную смену. Что было дальше, в аптеке уже не узнают.</em>',null,null,'assets/audio/shift-01/01-courier-sold.wav'],
   ['Отказать в рецептурном препарате и уточнить, почему он не спал.',true,-3,10,'«Ну и ладно. Не здесь, так в соседней аптеке продадут. Там, наверное, деньги нужнее».',null,null,'assets/audio/shift-01/01-courier-refused.wav'],
   ['Продать два энергетика и посоветовать выпить вместе.',false,18,-5,'«Давайте два. Один сейчас, второй потом».<br><em>Формально это не лекарство, но безопасной рекомендация не стала.</em>',null,null,'assets/audio/shift-01/01-courier-energy.wav'],
   ['Сказать «ничего нет» и закончить разговор.',false,0,-2,'«Ясно. Спасибо за помощь».<br><em>Опасной продажи нет, но профессиональной помощи тоже.</em>',null,null,'assets/audio/shift-01/01-courier-dismissed.wav'] ]},
  {person:'ЖЕНЩИНА, ОКОЛО 36',mood:'ПОСЛЕ РАБОТЫ · УСТАЛА',tag:'«ЗАВТРА НА РАБОТУ»',skin:'#d7aa8d',coat:'#59656f',hair:'#68493c',line:'Добрый день. Я пакетик от простуды выпила часа полтора назад, а голова всё равно трещит. Можно, пожалуйста, пару таблеток парацетамола? Мне завтра на работу, нужно, чтобы голова перестала болеть.',audio:'assets/audio/shift-01/02-cold-request.wav',topic:'Состав комбинированных препаратов от простуды',choices:[
   ['Продать парацетамол: прошло уже полтора часа.',false,22,-8,'«Спасибо большое. Сейчас ещё пару таблеток выпью — к утру должно отпустить».<br><em>В пакетике уже был парацетамол. Дополнительный приём создаёт риск превышения допустимой дозы.</em>',null,null,'assets/audio/shift-01/02-cold-sold.wav'],
   ['Уточнить название пакетика, дозу и что ещё принимала сегодня.',true,-4,11,'«А, там уже был парацетамол? Хорошо, что вы спросили. Спасибо вам огромное».',null,null,'assets/audio/shift-01/02-cold-checked.wav'],
   ['Вместо парацетамола сразу предложить ибупрофен.',false,12,-4,'«Ибупрофен? Давайте. Лишь бы подействовало».<br><em>Замена препарата не отменяет сбор информации о противопоказаниях и уже принятых средствах.</em>',null,null,'assets/audio/shift-01/02-cold-ibuprofen.wav'],
   ['Сразу отправить к врачу, потому что пакетик не помог.',false,2,-2,'«К врачу из-за головы? Да мне завтра на работу».<br><em>Без дополнительных красных флагов это избыточная маршрутизация.</em>',null,null,'assets/audio/shift-01/02-cold-doctor.wav'] ]},
  {person:'ЖЕНЩИНА, ОКОЛО 31',mood:'МАМА · НЕ ВЫСПАЛАСЬ',tag:'«НУЖЕН АНАЛОГ»',skin:'#c98e70',coat:'#7f9872',hair:'#493229',topic:'Действующие вещества и подбор аналогов',
   finalAudio:{correct:'assets/audio/shift-01/03-analogue-bought.wav',wrong:'assets/audio/shift-01/03-analogue-left.wav'},finalFeedback:{
    correct:'«Да, давайте попробуем. Спасибо».<br><em>Покупка состоялась.</em>',
    wrong:'«Нет, знаете, я лучше ничего не буду брать. Вдруг опять что-нибудь перепутаем».<br><em>Покупательница ушла без покупки: вы неверно определили действующее вещество.</em>'
   },steps:[
   {label:'ДЕЙСТВУЮЩЕЕ ВЕЩЕСТВО',line:'Здравствуйте. Дочке четыре года. Раньше врач назначал детский Отривин — хорошо помогал. Сейчас хочется попробовать другой спрей с тем же действующим веществом. Что можете предложить?',audio:'assets/audio/shift-01/03-analogue-request.wav',choices:[
    ['Ксилометазолин',true,-2,7,'Верно. В детском Отривине действующее вещество — ксилометазолин.'],
    ['Оксиметазолин',false,4,-6,'Это другое действующее вещество. Покупательница сверяется с фотографией упаковки.'],
    ['Фенилэфрин',false,4,-6,'Это другое действующее вещество. Покупательница сверяется с фотографией упаковки.'],
    ['Натрия хлорид',false,4,-6,'Это не действующее вещество названного препарата. Покупательница сверяется с фотографией упаковки.'] ]},
   {label:'ВЫБОР УПАКОВКИ',lineByOutcome:{correct:'Да, на фотографии тоже ксилометазолин. А что с ним есть для детей?',wrong:'Подождите, а на фотографии «ксилометазолин» написан. Вы точно то же самое предлагаете?'},audioByOutcome:{correct:'assets/audio/shift-01/03-analogue-correct.wav',wrong:'assets/audio/shift-01/03-analogue-wrong.wav'},visual:'products',choices:[
    ['Ксилокт-Солофарм',true,0,0,'','assets/products/ksilokt-child.png','35 мкг/доза · 2+ · Solopharm'],
    ['Риностоп',true,0,0,'','assets/products/rinostop-child.png','0,05% · 2–6 лет'],
    ['Снуп',true,0,0,'','assets/products/snup-child-45.png','45 мкг/доза · 2+'],
    ['Ксимелин Эко',true,0,0,'','assets/products/xymelin-eco-child.png','35 мкг/доза · 2–10 лет'] ]}
  ]},
  {person:'ЖЕНЩИНА, ОКОЛО 34',mood:'С РЕБЁНКОМ · СОМНЕВАЕТСЯ',tag:'«СОФТ ИЛИ НОРМ?»',skin:'#bd765b',coat:'#6d8066',hair:'#3b2926',topic:'Промывание носа у детей: возраст и режим подачи',
   finalAudio:{correct:'assets/audio/shift-01/04-rinse-bought.wav',wrong:'assets/audio/shift-01/04-rinse-left.wav'},finalFeedback:{
    correct:'«Понятно. Тогда давайте ЛинАква Софт. Спасибо, что объяснили».<br><em>Покупка состоялась.</em>',
    wrong:'«Нет, спасибо. Я лучше ещё раз уточню и потом решу».<br><em>Покупательница ушла без покупки: рекомендация не учла возраст или особенности конкретной формы.</em>'
   },steps:[
   {label:'ВЫБОР ФОРМЫ',line:'Здравствуйте. Сыну полтора года, нос заложен. Хочу промывать морской водой, без сосудосуживающих. Смотрю на ЛинАква Софт и Норм — коробки почти одинаковые. Какой лучше взять?',audio:'assets/audio/shift-01/04-rinse-request.wav',choices:[
    ['ЛинАква Софт: подходит с одного года.',true,-3,8,'Верно. Для ребёнка полутора лет подходит форма Софт.'],
    ['ЛинАква Норм: струя сильнее, поэтому промоет лучше.',false,18,-8,'ЛинАква Норм со струёй указан с двух лет, а ребёнку полтора.'],
    ['ЛинАква Форте: больше соли — значит эффективнее.',false,17,-8,'Гипертонический раствор нельзя автоматически считать лучшим выбором; эта форма также указана с двух лет.'],
    ['Можно любой: это одна и та же морская вода.',false,12,-6,'Одинаковая основа не отменяет различий по возрасту и способу подачи.'] ]},
   {label:'СРАВНЕНИЕ',lineByOutcome:{correct:'Ага, Норм только с двух лет. Хорошо, что спросила. А Софт чем-нибудь отличается от детского Аква Мариса или там всё одинаковое?',wrong:'Подождите, здесь на Норме написано «с двух лет». А моему полтора. Может, всё-таки не его? И чем Софт отличается от детского Аква Мариса?'},audioByOutcome:{correct:'assets/audio/shift-01/04-rinse-correct.wav',wrong:'assets/audio/shift-01/04-rinse-wrong.wav'},choices:[
    ['ЛинАква лечит насморк, а Аква Марис годится только для гигиены.',false,16,-8,'Такого деления между этими средствами нет.'],
    ['ЛинАква содержит лекарство, поэтому действует сильнее.',false,19,-9,'ЛинАква Софт — изотоническая морская вода, а не сосудосуживающий препарат.'],
    ['Оба подходят для промывания и содержат изотоническую морскую воду. Отличаются возрастные указания и конструкция насадки.',true,-3,10,'Верно. Сравнение опирается на характеристики конкретных форм.'],
    ['Ничем, кроме цены и названия.',false,7,-4,'Возрастные указания и конструкция насадки различаются.'] ]}
  ]}
 ]}
];

const $=id=>document.getElementById(id);
let selectedShift=0,turn=0,stage=0,caseCorrect=true,attempts=2,score=0,trust=50,risk=0,errors=[],freeRepeat=false;
const customer=$('customer');
const voicePlayer=new Audio();
let voiceEnabled=true;

function currentAudio(step){return step.audioByOutcome?.[caseCorrect?'correct':'wrong']||step.audio}
function playVoice(path){
 voicePlayer.pause();voicePlayer.currentTime=0;
 if(!voiceEnabled||!path||document.body.classList.contains('not-started'))return;
 voicePlayer.src=path;voicePlayer.play().catch(()=>console.warn(`Не удалось включить ${path}`));
}
function updateSoundButton(){$('sound').textContent=`ЗВУК: ${voiceEnabled?'ВКЛ':'ВЫКЛ'}`;$('sound').setAttribute('aria-pressed',String(voiceEnabled))}

function stars(){return '★'.repeat(attempts)+'☆'.repeat(3-attempts)}
function updateAttempts(){ $('stars').textContent=stars();$('topStars').textContent=stars();$('attemptText').textContent=`ДОСТУПНО ${attempts} ${attempts===1?'СМЕНА':'СМЕНЫ'}` }
function render(sameCustomer=false){
 const c=shifts[selectedShift].cases[turn],step=c.steps?.[stage]||c,totalStages=c.steps?.length||1;
 $('shiftNumber').textContent=String(selectedShift+1).padStart(2,'0');
 $('progress').textContent=`${String(turn+1).padStart(2,'0')} / 04`;
 $('progressBar').style.width=`${(turn+1)*25}%`;
 $('caseTag').textContent=totalStages>1?`ПОКУПАТЕЛЬ ${turn+1} / 4 · ЭТАП ${stage+1} ИЗ ${totalStages}`:`ПОКУПАТЕЛЬ ${turn+1} / 4`;
 $('name').textContent=c.person;$('mood').textContent=c.mood;$('line').textContent=step.lineByOutcome?.[caseCorrect?'correct':'wrong']||step.line;$('badge').textContent=totalStages>1?step.label:c.tag;
 customer.style.setProperty('--skin',c.skin);customer.style.setProperty('--coat',c.coat);customer.querySelector('.hair').style.background=c.hair;
 $('choices').className=`choices ${step.visual||''}`;$('choices').innerHTML=step.choices.map((choice,i)=>`<button class="choice" data-i="${i}"><b>${i+1}</b>${choice[5]?`<img src="${choice[5]}" alt="">`:''}<span>${choice[0]}${choice[6]?`<small>${choice[6]}</small>`:''}</span></button>`).join('');
 const audio=currentAudio(step);$('queue').innerHTML='<i></i>'.repeat(3-turn);customer.className=sameCustomer?'customer':'customer enter';$('sound').hidden=!audio;$('repeatVoice').hidden=!audio||document.body.classList.contains('not-started');if(!document.body.classList.contains('not-started')){$('line').focus({preventScroll:true});playVoice(audio)}
}
function choose(index){
 const c=shifts[selectedShift].cases[turn],step=c.steps?.[stage]||c,choice=step.choices[index],lastStage=!c.steps||stage===c.steps.length-1;
 risk=Math.max(0,risk+choice[2]);trust=Math.max(0,Math.min(100,trust+choice[3]));
 if(!choice[1])caseCorrect=false;
 if(lastStage){if(caseCorrect)score++;else errors.push(c.topic)}
 $('score').textContent=`${score} / 4`;$('trust').textContent=trust;$('risk').textContent=risk;
 const resultTitle=c.steps?(lastStage?(caseCorrect?'КЕЙС ЗАСЧИТАН':'КЕЙС НЕ ЗАСЧИТАН'):(choice[1]?'ЭТАП ВЕРНО':'ЭТАП НЕВЕРНО')):(choice[1]?'ВЕРНО':'НЕВЕРНО');
 const feedback=lastStage&&c.finalFeedback?c.finalFeedback[caseCorrect?'correct':'wrong']:choice[4];
 const feedbackAudio=lastStage&&c.finalAudio?c.finalAudio[caseCorrect?'correct':'wrong']:choice[7];
 $('resultText').innerHTML=`<strong>${resultTitle}</strong><small>${feedback}</small>`;
 playVoice(feedbackAudio);
 const resultCorrect=lastStage?caseCorrect:choice[1];
 $('result').className=`result ${resultCorrect?'correct':'wrong'}`;$('result').hidden=false;
 $('choices').querySelectorAll('button').forEach((button,i)=>{button.disabled=true;if(i===index)button.classList.add(choice[1]?'selected-correct':'selected-wrong')});
 $('next').textContent=lastStage?(turn===3?'ЗАВЕРШИТЬ СМЕНУ →':'СЛЕДУЮЩИЙ ПОКУПАТЕЛЬ →'):`ПРОДОЛЖИТЬ · ЭТАП ${stage+2} ИЗ ${c.steps.length} →`;$('next').focus();
 if(lastStage)customer.classList.add('exit');
}
function finish(){
 voicePlayer.pause();
 const title=score===4?'СМЕНА БЕЗ ОШИБОК':score===3?'СМЕНА ПРИНЯТА':score===2?'ЕСТЬ РИСК':'СМЕНУ НУЖНО ПОВТОРИТЬ';
 const text=score===4?'Вы распознали все четыре ситуации. Курс сейчас не нужен — только разбор решений.':score===3?'Одна ошибка не обнуляет смену. Разберите именно её, без лишнего обучения.':score===2?'Две ошибки могли повлиять на безопасность покупателей. Начните с более критичной темы.':'Сначала короткий разбор, затем можно сразу повторить смену.';
 $('endingTitle').textContent=title;$('endingText').textContent=`${score}/4 · доверие ${trust} · риск ${risk}. ${text}`;
 $('recommendation').innerHTML=score===4?'<b>НАГРАДА</b><span>Значок «Смена без ошибок» · серия идеальных смен: 1</span>':`<b>МАТЕРИАЛ ПО ОШИБКЕ</b><span>${errors[0]}</span><button type="button">ОТКРЫТЬ РАЗБОР →</button>`;
 freeRepeat=score<=1;$('restart').textContent='ПОВТОРИТЬ СМЕНУ';
 $('ending').hidden=false;
}
function start(){turn=0;stage=0;caseCorrect=true;score=0;trust=50;risk=0;errors=[];$('score').textContent='0 / 4';$('trust').textContent=50;$('risk').textContent=0;document.body.classList.remove('not-started');$('intro').hidden=true;render()}
$('start').onclick=start;
$('sound').onclick=()=>{voiceEnabled=!voiceEnabled;voicePlayer.pause();updateSoundButton();if(voiceEnabled){const c=shifts[0].cases[turn],step=c.steps?.[stage]||c;playVoice(currentAudio(step))}};
$('repeatVoice').onclick=()=>{voiceEnabled=true;updateSoundButton();const c=shifts[0].cases[turn],step=c.steps?.[stage]||c;playVoice(currentAudio(step))};
$('choices').onclick=e=>{const button=e.target.closest('button');if(!button||button.disabled)return;choose(+button.dataset.i)};
$('next').onclick=()=>{const c=shifts[selectedShift].cases[turn];$('result').hidden=true;if(c.steps&&stage<c.steps.length-1){stage++;render(true);return}stage=0;caseCorrect=true;if(++turn===4)finish();else render()};
$('restart').onclick=()=>{$('ending').hidden=true;freeRepeat=false;start()};
updateSoundButton();updateAttempts();render();
console.assert(shifts.length===1&&shifts[0].cases.length===4&&shifts[0].cases[2].steps.length===2&&shifts[0].cases[3].steps.length===2,'Сценарий смены повреждён');
