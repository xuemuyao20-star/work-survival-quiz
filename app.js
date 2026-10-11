(() => {
  'use strict';
  const config = window.APP_CONFIG || {};
  const DEMO_ACCESS_CODE = 'SURVIVE2026';
  const AXES = ['边界防护','专注恢复','关系协调','规则应对','主动影响','灵活求助'];
  const AXIS_ICONS = ['🛡️','🎧','🪄','🧭','📣','🌀'];
  const questions = [
    {axis:0,title:'周五快下班时，领导又发来一项“今晚最好弄完”的任务，你手上还有两件待办。你会？',options:[['先把手头任务、时间和影响列出来，请领导确认优先级。','先对齐优先级，再决定怎么排。',0],['先接下来，晚上再想办法补进度。','先扛下来，尽量不让别人为难。',5],['确认交付标准和截止时间，拆一个今晚能完成的版本。','先把模糊要求变成清楚任务。',3],['和相关同事协调分工，看看能不能一起完成。','找可用资源，重新组织协作。',2]]},
    {axis:1,title:'你刚开始写一份重要材料，群里却连续弹出十几条消息。你通常会？',options:[['先判断哪些消息真的紧急，给自己留出不被打断的时间。','先保护注意力，再集中处理。',1],['每条都先看一眼，免得错过别人找我。','随时保持在线，优先回应他人。',2],['设一个稍后处理的时间，并告诉同事急事怎么联系我。','安排好联络窗口，兼顾专注和协作。',0],['把任务切成小块，先做出一个能交付的部分。','拆小任务，先推动第一步。',3]]},
    {axis:2,title:'跨部门同事把一份返工材料发回来，只说“这个不太对”，你会先？',options:[['问清楚具体哪项标准不一致、谁来验收。','把反馈翻译成清晰标准。',3],['先听对方最担心的是什么，再一起找解决办法。','先理解彼此关注点。',2],['提出两个可行修改方向，请对方选一个。','主动推动讨论收敛。',4],['找熟悉流程的人一起看，避免自己猜错。','借助团队经验排除盲点。',5]]},
    {axis:3,title:'领导在会上说“这个方案你们看着办”，但部门里有三种理解。你会？',options:[['会后发消息确认目标、拍板人和截止时间。','把口头共识落成书面。',3],['先按大家共同认可的部分推进，留好待确认项。','先推进确定部分。',1],['请领导明确哪个结果最重要，必要时给出选项。','把决策请求说具体。',4],['找相关同事对齐各自的理解和交付接口。','优先修复协作信息差。',2]]},
    {axis:4,title:'你发现一个流程有明显问题，但提出后可能会让项目负责人不太舒服。你会？',options:[['先私下沟通，带着具体例子和替代方案去谈。','有分寸地提出异议。',4],['先评估影响范围和风险，找到适合的反馈渠道。','根据情境选择表达路径。',5],['先按要求执行，避免这时增加冲突。','先稳住局面，保留精力。',1],['把问题和影响写清楚，留在项目记录里。','用事实和记录保护协作。',3]]},
    {axis:5,title:'一个你不熟悉的任务卡住了，截止时间又近。你会？',options:[['明确卡点，带上已尝试的方法向有经验的人求助。','求助时提供上下文。',5],['把任务拆开，先完成自己确定能推进的部分。','从可控的一步开始。',1],['找相关同事确认需求，重新安排分工。','重新连接资源和协作。',2],['向负责人说明风险，并提出调整范围或时间的选项。','主动协商任务条件。',4]]},
    {axis:0,title:'同事临时请你“顺便帮忙改一下”，但没说什么时候要、改到什么程度。你会？',options:[['先问截止时间、修改范围和谁最终确认。','接手前先厘清边界。',0],['看一下自己的安排，再告诉对方能支持到哪一步。','按可用精力承诺。',1],['把需求拉到相关群里，确认是谁负责最终版本。','借助协作厘清责任。',2],['先答应下来，免得关系变僵。','优先照顾当下关系。',2]]},
    {axis:1,title:'午休刚躺下，工作群里有人@全员问一个并不紧急的问题。你会？',options:[['先休息，等约定的工作时间再看。','把恢复时间也当成资源。',1],['简单回复稍后处理，不让它持续占用注意力。','用简短边界结束打断。',0],['确认有没有同事能即时回答，避免大家空等。','协调可用的人手。',2],['记到待办里，回到工作时再统一处理。','外化记忆，减少反复惦记。',3]]},
    {axis:2,title:'新同事刚加入项目，似乎没理解你们的分工，你会？',options:[['主动介绍背景，听听对方目前掌握了什么。','先建立共同理解。',2],['发一份清楚的任务表和联系人信息。','提供结构化信息。',3],['邀请大家用十分钟重新对齐目标和接口。','推动团队快速同步。',4],['告诉对方有问题随时问，之后再看情况。','开放求助通道。',5]]},
    {axis:3,title:'项目交付前，客户临时提出新需求，但合同范围和负责人都不清楚。你会？',options:[['先查已有约定，明确这项是否属于当前交付。','以约定和范围为依据。',3],['把需求影响、资源和时间整理后请负责人决策。','升级具体决策事项。',4],['先和客户确认最想解决的问题，探讨轻量方案。','对齐真实需求。',2],['先答应下来，回头再想办法补资源。','先承诺，后续再协调。',5]]},
    {axis:4,title:'例会上，大家都说方案没问题，但你发现关键数据可能有误。你会？',options:[['及时指出数据出处和可能影响，并建议核实。','基于事实提出风险。',4],['会后找负责人单独说明，减少公开尴尬。','选择更合适的沟通场景。',2],['在会议纪要里标注待确认项和责任人。','通过记录促成跟进。',3],['先快速查证，再带着结论回来讨论。','先补足证据再表达。',1]]},
    {axis:5,title:'你连续两次尝试都没解决同一个问题，心里开始觉得“是不是我能力不行”。你会？',options:[['复盘每次尝试的条件，再请同伴帮忙看盲区。','把挫折当作信息并借力。',5],['换一个路径，先做一个小范围验证。','试验新办法。',1],['向负责人说明目前阻塞，请对方帮助排除依赖。','把阻塞转成明确请求。',4],['暂时放下，先完成别的可控任务恢复状态。','调整节奏，恢复资源。',0]]},
    {axis:0,title:'你休假期间，团队问能不能“偶尔在线帮忙看一下”，但没有说明频率。你会？',options:[['说明休假期间的可联络范围和真正紧急的例外。','把可用边界讲具体。',0],['提前交接负责人和资料，尽量让团队自主处理。','设计不依赖自己的交接。',3],['询问谁可以轮值，避免责任默认落到你身上。','推动职责合理分配。',4],['虽然不情愿，还是持续盯着消息。','优先消除他人不确定感。',2]]},
    {axis:1,title:'半天被临时会议切得很碎，原定的深度工作还没开始。你会？',options:[['找出最重要的一项，给它安排完整的专注时段。','集中资源完成关键任务。',1],['请会议组织者合并或明确后续会议的必要性。','减少不必要的打断。',4],['告知相关人交付时间可能变化，请他们确认优先顺序。','透明沟通任务影响。',0],['先完成一两个短任务，找回推进感。','用小胜利重新启动。',5]]},
    {axis:2,title:'同事在群聊里误解了你的意思，回复有点冲。你会？',options:[['私聊确认对方的理解，再解释自己原意。','先修复理解再回应情绪。',2],['在群里简短澄清事实，避免误解继续扩散。','在公共场合纠正关键信息。',4],['先不回，等双方情绪平复再说。','暂缓即时冲突。',1],['请共同参与项目的人补充上下文。','借助共享背景校准事实。',3]]},
    {axis:3,title:'你收到一条消息：“材料尽快给我，简单整理一下就行。”你会？',options:[['问清楚最晚时间、使用场景和必须包含的内容。','把模糊要求变成验收标准。',3],['先给一个简版大纲，请对方快速确认方向。','用小交付降低返工。',1],['确认优先级，并说明会影响哪些既定任务。','让资源取舍显性化。',0],['找做过类似材料的同事看看有没有现成模板。','复用组织资源。',5]]},
    {axis:4,title:'你完成了一项费力的工作，复盘会上却没人提到你的贡献。你会？',options:[['用事实简要汇报成果、影响和自己负责的部分。','清楚呈现工作贡献。',4],['把过程和结果整理在项目文档里供大家查看。','让成果可追溯。',3],['主动感谢协作者，同时说明各自的具体贡献。','兼顾认可与团队关系。',2],['觉得说出来显得计较，于是保持沉默。','把认可需求先放在一边。',1]]},
    {axis:5,title:'原定方案突然因预算削减无法执行，团队一时没有方向。你会？',options:[['提出低成本试行版，先验证最关键的假设。','调整方案并快速验证。',5],['和负责人重新确认不可妥协的目标及可缩减的范围。','协商新的任务边界。',0],['找其他团队了解是否有可复用资源或经验。','跨团队寻找支持。',2],['把风险、替代方案及所需决策整理出来。','让决策者拥有可选路径。',4]]},
    {axis:0,title:'同一位同事每周都把本该自己完成的表格留到最后，请你帮忙收尾。你会？',options:[['明确说明这次能帮到哪里，并约定下次由谁完成哪部分。','帮忙也要有边界。',0],['一起梳理流程，看看为什么总在最后卡住。','解决重复出现的协作问题。',2],['和主管讨论任务分配及长期影响。','把持续性负担带到职责层面。',4],['继续替对方完成，避免影响团队交付。','优先保障眼前结果。',3]]},
    {axis:1,title:'临近下班时，你发现还有很多零碎小事没处理，但明早有一份关键交付。你会？',options:[['挑出明早交付的关键路径，暂缓无关紧要的小事。','先保住最重要的专注时间。',1],['发消息和相关人确认哪些小事可以延后。','协商调整期待。',0],['把零碎任务集中到固定时段批量处理。','减少频繁切换。',3],['请同事分担确实不需要由你单独完成的部分。','合理调动团队资源。',5]]},
    {axis:2,title:'你和同事对“做好了”的标准不一样，已经来回修改了几轮。你会？',options:[['请对方举一个符合预期的样例，列出判断标准。','把主观评价变成共同标准。',3],['约个短会，当面确认彼此最在意的结果。','通过对话发现真实需求。',2],['整理不同版本的优缺点，请决策人做选择。','推动决策落地。',4],['找中立同事帮忙审一下双方理解。','引入第三方视角。',5]]},
    {axis:3,title:'某流程要求每一步都重复填相同信息，大家都觉得麻烦但一直照做。你会？',options:[['先确认哪些字段是必须留档，再提出精简建议。','理解规则目的后优化流程。',3],['记录重复耗时和出错情况，拿数据讨论改进。','用证据支持流程调整。',4],['问熟悉系统的人是否有现成工具或快捷方式。','寻找可用资源减负。',5],['暂时按流程做好，等合适时机再反馈。','优先保证当前合规。',1]]},
    {axis:4,title:'会议即将结束，大家发现下周的关键任务还没有明确负责人。你会？',options:[['主动提议自己负责一块，并说明需要的支持。','承担任务时也讲清条件。',4],['把待定事项、负责人和确认时间逐一列出。','推动团队形成承诺。',3],['询问谁更适合牵头，并指出自己能提供的帮助。','按专长配置责任。',2],['会后私下问负责人，避免当场冷场。','先缓解群体压力。',1]]},
    {axis:5,title:'你刚换到一个新岗位，常用流程和人际关系都还不熟。你会？',options:[['找一位熟悉业务的同事约一次经验交流。','主动建立学习支持。',5],['把高频流程整理成自己的清单，遇到问题逐步补充。','搭建可复用的个人系统。',1],['找主管确认试用阶段的目标和反馈节奏。','明确期待并获取反馈。',3],['观察团队做法，先模仿再逐渐找到自己的方式。','适应环境并减少试错。',2]]}
  ];
  const artifacts = [
    {id:'headphones',name:'降噪耳机',icon:'🎧',en:'FOCUS & RECOVERY',pair:[1,5],tagline:'消息可以很多，你的注意力不能无限续杯。',power:'你能从多线程、会议和消息轰炸中重新找回重点，也知道卡住时可以调整路径、调动资源。',strength:'你不是不合群，而是懂得专注和恢复也是完成工作的资源。',pitfall:'如果专注变成隔绝，你可能错过必要信息；如果总靠自己消化，也容易求助太晚。',skill:'批量处理消息、番茄专注法、结构化求助。',practice:'“我先集中处理这份材料，11点看消息；如果有更早截止的事，麻烦标一下时间。”',theory:'工作要求—资源模型提醒我们，注意力、时间和他人支持都是应对工作要求的资源。管理打断与及时求助，能帮助你把资源花在关键任务上。',share:'我的职场生存道具是降噪耳机：消息可以很多，我的注意力不能无限续杯。'},
    {id:'cloak',name:'隐身斗篷',icon:'🫥',en:'FOCUS & BOUNDARIES',pair:[1,0],tagline:'不参加每一场内耗，该交付时一定出现。',power:'你会观察局势、保护精力，只把有限时间留给真正重要的任务。',strength:'你不容易被每个声音牵着走，能把“忙”和“有推进”区分开。',pitfall:'斗篷穿久了，别人可能看不见你的贡献；你也可能把重要意见一起藏起来。',skill:'阶段性同步、成果留痕、会议中的简洁表达。',practice:'每周用三句话同步：完成了什么、接下来做什么、目前需要什么支持。',theory:'工作重塑包含调整任务和互动方式。选择性投入能保护资源；适度呈现成果，则让合作方更准确地了解进展。',share:'我的职场生存道具是隐身斗篷：不参加每一场内耗，但该交付时一定出现。'},
    {id:'shield',name:'自动回复盾牌',icon:'🛡️',en:'BOUNDARIES & CLARITY',pair:[0,3],tagline:'不是不能帮，请先把优先级说清楚。',power:'面对临时任务和模糊要求，你会先确认职责、截止时间和验收标准。',strength:'你让隐性冲突变成可以讨论的安排，也更少因为理解不同而返工。',pitfall:'如果只挡不谈，对方可能只听到“不行”；过度防御也会让合理协作变难。',skill:'任务澄清、优先级协商、范围管理。',practice:'“我可以接。现在A今天交、B明天评审，这项希望排在哪项前面？今天做的话我先交简版。”',theory:'角色清晰和工作自主性有助于协作。说明资源限制并协商优先级，是调整工作边界、澄清职责的具体做法。',share:'我的职场生存道具是自动回复盾牌：不是不能帮，请先把优先级说清楚。'},
    {id:'translator',name:'职场翻译器',icon:'🪄',en:'RELATIONSHIPS & RULES',pair:[2,3],tagline:'把“你怎么还没做”翻译成“我们卡在哪个条件上？”',power:'你能听出不同角色真正关注的目标，把分歧从“谁不配合”带回“标准、资源和时间”。',strength:'你善于跨部门对齐信息，让合作从猜测走向可执行的共识。',pitfall:'你可能承担太多情绪劳动，忙着替所有人圆场，却忘记表达自己的需要。',skill:'复述确认、会议收口、把模糊意见变成待办。',practice:'“我总结一下：共识是X，还没解决的是Y；负责人和时间点分别是……对吗？”',theory:'角色清晰与高质量沟通能减少协作中的信息差。换位理解有帮助，但不意味着你要替所有人承担情绪和责任。',share:'我的职场生存道具是职场翻译器：把“你怎么还没做”翻译成“我们卡在哪个条件上？”'},
    {id:'megaphone',name:'会议室扩音器',icon:'📣',en:'VOICE & INFLUENCE',pair:[4,2],tagline:'不抢话筒，只把关键问题说清楚。',power:'你愿意提出不同意见，也会尝试给出方案，帮助讨论从吐槽走向决策。',strength:'你敢于把重要信息带到台面上，让风险更早被看见。',pitfall:'如果每次讨论都变成需要推动的战役，可能忽略时机和听众的真实顾虑。',skill:'建设性异议、观点—依据—建议表达、会议判断。',practice:'“我看到的情况是……可能影响……我建议先试……”',theory:'建言行为可以帮助团队更早发现问题；心理安全感会影响成员是否愿意发声。有效影响不只是声音大，也包括让观点可讨论、可行动。',share:'我的职场生存道具是会议室扩音器：不抢话筒，只把关键问题说清楚。'},
    {id:'radar',name:'任务雷达',icon:'🧭',en:'CLARITY & PRIORITIES',pair:[3,1],tagline:'“尽快”不是时间点，“差不多”也不是验收标准。',power:'你能扫描任务背后的标准、流程、风险和拍板路径。',strength:'你减少返工，让多方协作更可预测，能把“差不多”变成明确交付。',pitfall:'确认太多会拖慢行动；流程齐全也不代表所有沟通问题都会自动消失。',skill:'书面确认、风险预判、里程碑拆分。',practice:'开工前确认四项：交付物、截止时间、验收人、需求变更怎么处理。',theory:'目标清晰、反馈及时和角色明确通常有助于任务执行。记录和确认也能降低多方协作中的理解偏差。',share:'我的职场生存道具是任务雷达：“尽快”不是时间点，“差不多”也不是验收标准。'},
    {id:'boundary',name:'结界卷轴',icon:'🔮',en:'BOUNDARIES & VOICE',pair:[0,4],tagline:'边界不是拒绝合作，是让合作有可持续的范围。',power:'你既能保护自己的工作边界，也能把不同意见说出来、争取调整。',strength:'面对“大家都这样”，你仍愿意讨论结果需要什么条件。',pitfall:'资源不足或权力差距明显时，直接对抗可能增加成本；坚持底线不一定要争输赢。',skill:'事实陈述、选项式协商、留存关键承诺。',practice:'“按目前资源，A和B只能先保证一项；请确认优先级，或补充相应资源。”',theory:'边界和自主性关系到精力恢复；表达策略需要结合目标、对象和组织情境。有效设边界可以是清楚协商，不只有正面冲突。',share:'我的职场生存道具是结界卷轴：边界不是拒绝合作，是让合作有可持续的范围。'},
    {id:'portal',name:'资源传送门',icon:'🌀',en:'SUPPORT & ADAPTATION',pair:[5,4],tagline:'遇到墙时，我先找出口，也找队友。',power:'卡住时你愿意换路径、求助和借力，不把“一次不顺”直接等同于“我不行”。',strength:'你把协作和资源调动看作能力的一部分，能更快从自责转向找解法。',pitfall:'过早交接可能让对方缺少上下文；频繁换方案也可能让方向变模糊。',skill:'结构化求助、备选方案设计、经验复盘。',practice:'求助时讲清三件事：目标是什么、已经试过什么、希望对方帮你判断或提供什么。',theory:'社会支持和自我效能会影响人们应对压力的方式。带着具体信息请求帮助，是主动调动资源，而不是能力不足的证明。',share:'我的职场生存道具是资源传送门：遇到墙时，我先找出口，也找队友。'}
  ];
  const $ = id => document.getElementById(id);
  const views = {home:$('home'),quiz:$('quiz'),result:$('result')};
  let current = 0;
  let chosen = Array(questions.length).fill(null);
  let usedCode = '';
  let toastTimer;
  const showView = name => { Object.values(views).forEach(v=>v.hidden=true); views[name].hidden=false; window.scrollTo({top:0,behavior:'smooth'}); };
  const hashKey = s => { let h=2166136261; for(const c of s) h=Math.imul(h^c.charCodeAt(0),16777619); return (h>>>0).toString(36); };
  const quotaKey = code => `survival-quiz-count-${hashKey(code.trim().toUpperCase())}`;
  const usage = code => Number(localStorage.getItem(quotaKey(code))||0);
  const toast = message => { const t=$('toast'); t.textContent=message; t.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'),2400); };
  const dimensionForQuestion = q => q.axis;
  async function begin(code){
    const clean=code.trim().toUpperCase();
    const submit=$('unlock-form').querySelector('button[type="submit"]');
    if(submit.disabled)return false;
    submit.disabled=true; $('unlock-message').classList.remove('error'); $('unlock-message').textContent='正在验证密码…';
    try {
      if(config.demoMode===true){
        if(clean!==String(config.demoPasscode||DEMO_ACCESS_CODE).toUpperCase())throw new Error('invalid');
        const count=usage(clean); if(count>=5)throw new Error('exhausted');
        localStorage.setItem(quotaKey(clean),String(count+1));
      } else {
        if(!config.supabaseUrl||!config.publishableKey)throw new Error('not_configured');
        const response=await fetch(`${config.supabaseUrl.replace(/\/$/,'')}/functions/v1/start-test`,{method:'POST',headers:{'Content-Type':'application/json',apikey:config.publishableKey},body:JSON.stringify({code:clean})});
        const payload=await response.json().catch(()=>({}));
        if(response.status===403)throw new Error('invalid');
        if(!response.ok||!payload.ok)throw new Error('service');
      }
      usedCode=clean; sessionStorage.setItem('survival-last-code',clean); chosen=Array(questions.length).fill(null); current=0; renderQuestion(); showView('quiz'); return true;
    } catch(error) {
      const message=error.message==='invalid'?'密码不正确或可用次数已用完。':error.message==='exhausted'?'这个密码的 5 次测评机会已用完。':error.message==='not_configured'?'网站服务尚未配置完成，请稍后再试。':'暂时无法连接测评服务，请稍后重试。';
      $('unlock-message').textContent=message; $('unlock-message').classList.add('error'); return false;
    } finally { submit.disabled=false; }
  }
  function renderQuestion(){
    const q=questions[current], axis=dimensionForQuestion(q); $('dimension-label').textContent=`${AXIS_ICONS[axis]} ${AXES[axis]}`; $('question-current').textContent=String(current+1); $('question-percent').textContent=`${Math.round((current+1)/questions.length*100)}%`; $('progress-fill').style.width=`${(current+1)/questions.length*100}%`; $('question-kicker').textContent=`场景 ${String(current+1).padStart(2,'0')} · ${AXES[axis]}`; $('question-title').textContent=q.title;
    $('answers').innerHTML=''; q.options.forEach((op,i)=>{ const b=document.createElement('button'); b.type='button'; b.className='answer'+(chosen[current]===i?' selected':''); b.setAttribute('role','radio'); b.setAttribute('aria-checked',String(chosen[current]===i)); b.innerHTML=`<span class="radio"></span><span><strong>${op[0]}</strong><small>${op[1]}</small></span>`; b.addEventListener('click',()=>selectAnswer(i)); $('answers').appendChild(b); });
    $('previous-question').disabled=current===0; $('next-question').disabled=chosen[current]===null; $('next-question').textContent=current===questions.length-1?'查看测评结果 →':'下一题 →';
  }
  function selectAnswer(i){ chosen[current]=i; renderQuestion(); $('answer-hint').textContent='已记录选择'; if(current<questions.length-1){setTimeout(()=>{current++;renderQuestion();},260);}else $('answer-hint').textContent='点击“查看测评结果”完成测评'; }
  function calculate(){ const scores=Array(6).fill(0); chosen.forEach((choice,qi)=>{if(choice!==null){const opt=questions[qi].options[choice];scores[opt[2]]+=1;}}); const ranked=AXES.map((name,i)=>({name,index:i,score:scores[i]})).sort((a,b)=>b.score-a.score||a.index-b.index); const pairScore=a=>a.pair.reduce((sum,i)=>sum+scores[i],0); const result=[...artifacts].sort((a,b)=>pairScore(b)-pairScore(a)||a.id.localeCompare(b.id))[0]; return {result,scores,ranked}; }
  function fillResult(data,shared=false){
    const {result,scores,ranked}=data; $('result-icon').textContent=result.icon;$('result-name').textContent=result.name;$('result-en').textContent=result.en;$('result-tagline').textContent=result.tagline;$('result-power').textContent=result.power;$('result-strength').textContent=result.strength;$('result-pitfall').textContent=result.pitfall;$('result-skill').textContent=result.skill;$('result-practice').textContent=result.practice;$('result-theory').textContent=result.theory;$('share-caption').textContent=`「${result.share}」`;$('result-number').textContent=String(artifacts.indexOf(result)+1).padStart(2,'0');
    const top=ranked.slice(0,3); $('result-stats').innerHTML=top.map((d,i)=>`<div class="stat"><b>${AXIS_ICONS[d.index]} ${d.name}</b><span>${i===0?'主导倾向':i===1?'辅助倾向':'潜在资源'}</span></div>`).join('');
    $('save-hint').textContent=shared?'这是分享的结果卡。重新作答可以获得完整的个人倾向分析。':'手机可保存图片后长按存入相册；电脑端将下载 PNG 图片。'; showView('result');
  }
  function complete(){ if(chosen.some(x=>x===null)){toast('还有题目没有完成');return;} const data=calculate(); sessionStorage.setItem('survival-result',JSON.stringify({id:data.result.id,scores:data.scores})); history.replaceState(null,'',location.pathname+location.search); fillResult(data); }
  function openShared(){ const hash=location.hash; if(!hash.startsWith('#share='))return false; try{const raw=decodeURIComponent(escape(atob(hash.slice(7).replace(/-/g,'+').replace(/_/g,'/'))));const p=JSON.parse(raw);const result=artifacts.find(a=>a.id===p.id);if(!result)return false;const scores=Array.isArray(p.s)&&p.s.length===6?p.s.map(n=>Math.max(0,Number(n)||0)):Array(6).fill(0);fillResult({result,scores,ranked:AXES.map((name,index)=>({name,index,score:scores[index]})).sort((a,b)=>b.score-a.score||a.index-b.index)},true);return true;}catch{return false;} }
  function shareURL(){ const d=JSON.parse(sessionStorage.getItem('survival-result')||'null');if(!d)return location.href;const payload=btoa(unescape(encodeURIComponent(JSON.stringify({id:d.id,s:d.s})))).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');return `${location.origin}${location.pathname}${location.search}#share=${payload}`; }
  function drawWrapped(ctx,text,x,y,maxWidth,lineHeight,maxLines){let line='',lines=[];for(const char of text){const candidate=line+char;if(ctx.measureText(candidate).width>maxWidth&&line){lines.push(line);line=char;}else line=candidate;}if(line)lines.push(line);if(maxLines&&lines.length>maxLines){lines=lines.slice(0,maxLines);lines[maxLines-1]=lines[maxLines-1].slice(0,-1)+'…';}lines.forEach((l,i)=>ctx.fillText(l,x,y+i*lineHeight));return y+lines.length*lineHeight;}
  function saveImage(){
    const d=JSON.parse(sessionStorage.getItem('survival-result')||'null');if(!d){toast('请先完成测评');return;}const r=artifacts.find(a=>a.id===d.id);const scale=2,w=900,h=1900,c=document.createElement('canvas');c.width=w*scale;c.height=h*scale;const ctx=c.getContext('2d');ctx.scale(scale,scale);
    const grad=ctx.createLinearGradient(0,0,w,h);grad.addColorStop(0,'#f0ebff');grad.addColorStop(.32,'#fff');grad.addColorStop(1,'#f8f6fd');ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);ctx.fillStyle='#7662be';ctx.fillRect(54,52,6,h-104);ctx.textAlign='left';ctx.fillStyle='#9388b4';ctx.font='700 19px "Noto Sans SC",sans-serif';ctx.fillText('职场生存图鉴',90,93);ctx.textAlign='right';ctx.fillText(`SURVIVAL KIT  ·  NO. ${String(artifacts.indexOf(r)+1).padStart(2,'0')}`,810,93);
    ctx.textAlign='center';ctx.fillStyle='#715abe';ctx.font='100px "Noto Sans SC",sans-serif';ctx.fillText(r.icon,450,250);ctx.fillStyle='#9a90b8';ctx.font='700 18px "Noto Sans SC",sans-serif';ctx.fillText(r.en,450,303);ctx.fillStyle='#2a2545';ctx.font='800 48px "Noto Sans SC",sans-serif';ctx.fillText('你的职场生存道具',450,378);ctx.fillStyle='#6e58bb';ctx.font='900 66px "Noto Sans SC",sans-serif';ctx.fillText(r.name,450,466);ctx.fillStyle='#777188';ctx.font='500 24px "Noto Sans SC",sans-serif';drawWrapped(ctx,r.tagline,450,524,730,38,2);
    let y=612; const blocks=[['✦ 你的职场超能力',r.power],['↗ 你的隐藏优势',r.strength],['◒ 需要留意的小弱点',r.pitfall],['⌁ 可以解锁的技能',r.skill],['🗣 下次可以这样说',r.practice]];
    blocks.forEach(([title,body])=>{ctx.textAlign='left';ctx.fillStyle='#5c4b99';ctx.font='700 25px "Noto Sans SC",sans-serif';ctx.fillText(title,90,y);y+=40;ctx.fillStyle='#68647a';ctx.font='400 21px "Noto Sans SC",sans-serif';y=drawWrapped(ctx,body,90,y,720,37,3)+27;});
    ctx.fillStyle='#fbf8ef';ctx.beginPath();ctx.roundRect(72,y,756,180,20);ctx.fill();ctx.fillStyle='#82713a';ctx.font='700 21px "Noto Sans SC",sans-serif';ctx.fillText('🧠 一点理论视角',96,y+43);ctx.fillStyle='#6c685d';ctx.font='400 18px "Noto Sans SC",sans-serif';drawWrapped(ctx,r.theory,96,y+79,700,31,3);y+=220;
    ctx.strokeStyle='#e9e5f0';ctx.beginPath();ctx.moveTo(90,y);ctx.lineTo(810,y);ctx.stroke();ctx.fillStyle='#aaa5b4';ctx.font='400 16px "Noto Sans SC",sans-serif';ctx.fillText('结果仅供自我觉察与趣味分享 · 不用于招聘筛选或心理诊断',450,y+37);
    c.toBlob(blob=>{if(!blob){toast('图片生成失败，请稍后重试');return;}const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`职场生存道具-${r.name}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);$('save-hint').textContent='长图已下载。手机浏览器可在下载文件中保存到相册；如果支持分享菜单，也可直接发送图片。';toast('结果长图已保存');},'image/png');
  }
  $('unlock-form').addEventListener('submit',e=>{e.preventDefault();begin($('access-code').value);});
  $('how-score').addEventListener('click',()=>{const d=$('science-detail');d.hidden=!d.hidden;$('how-score').innerHTML=d.hidden?'了解测评如何匹配结果 <span>＋</span>':'收起测评说明 <span>−</span>';});
  $('previous-question').addEventListener('click',()=>{if(current>0){current--;renderQuestion();}});$('next-question').addEventListener('click',()=>{if(current<questions.length-1){current++;renderQuestion();}else complete();});
  $('quit-quiz').addEventListener('click',()=>{showView('home');$('access-code').value=usedCode;});$('back-home').addEventListener('click',()=>{history.replaceState(null,'',location.pathname+location.search);showView('home');});
  $('retake').addEventListener('click',()=>{const code=sessionStorage.getItem('survival-last-code')||'';if(!code){showView('home');return;}if(usage(code)>=5){toast('这个密码的测评机会已用完');return;}begin(code);});
  $('save-image').addEventListener('click',saveImage);$('copy-link').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(shareURL());toast('结果链接已复制，发给朋友就能查看');}catch{const input=document.createElement('textarea');input.value=shareURL();document.body.appendChild(input);input.select();document.execCommand('copy');input.remove();toast('结果链接已复制');}});
  $('review-gift').addEventListener('click',()=>{$('gift-modal').hidden=false;});$('close-modal').addEventListener('click',()=>$('gift-modal').hidden=true);$('modal-done').addEventListener('click',()=>$('gift-modal').hidden=true);$('gift-modal').addEventListener('click',e=>{if(e.target===$('gift-modal'))$('gift-modal').hidden=true;});document.addEventListener('keydown',e=>{if(e.key==='Escape')$('gift-modal').hidden=true;});
  if(!openShared())showView('home');
})();

