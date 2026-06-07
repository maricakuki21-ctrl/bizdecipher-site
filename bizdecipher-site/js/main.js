const boxes = {
  creator: {
    name: "AI Creator Box",
    short: "AI Creator",
    price: "$19.90",
    left: 247,
    pulls: [
      { tier: "Starter pull", title: "Creator Starter Kit", desc: "Prompt pack, publishing checklist, and a one-page content plan for shipping your next offer.", value: "$14" },
      { tier: "Rare pull", title: "Creator Tool Pack", desc: "Notion workflow, short-video script pack, and AI tool discount list.", value: "$24" },
      { tier: "Epic pull", title: "Premium Creator Bundle", desc: "Template bundle, launch checklist, and a next-box discount card.", value: "$39" },
      { tier: "Top pull", title: "Founder Signal Pack", desc: "Private opportunity note, creator resource bundle, and limited Founder badge.", value: "$99" }
    ]
  },
  hustle: {
    name: "Side Hustle Box",
    short: "Side Hustle",
    price: "$19.90",
    left: 188,
    pulls: [
      { tier: "Starter pull", title: "Starter Hustle Card", desc: "One cash-loop idea, execution checklist, and first-message outreach prompt.", value: "$16" },
      { tier: "Rare pull", title: "Channel Playbook", desc: "Niche channel list, sourcing prompt, and cold-start content plan.", value: "$29" },
      { tier: "Epic pull", title: "Micro Offer Builder", desc: "Offer copy kit, pricing worksheet, and a next-box discount card.", value: "$45" }
    ]
  },
  founder: {
    name: "Founder Signal Box",
    short: "Founder Signal",
    price: "$29.90",
    left: 92,
    pulls: [
      { tier: "Rare pull", title: "Market Signal Note", desc: "Trend note, target user map, and tool stack recommendation.", value: "$34" },
      { tier: "Epic pull", title: "Opportunity Teardown", desc: "Business model teardown, landing-page angle, and pricing hypothesis.", value: "$69" },
      { tier: "Top pull", title: "Founder Opportunity Bundle", desc: "Founder report, 1-on-1 teardown coupon, and limited member badge.", value: "$149" }
    ]
  },
  desk: {
    name: "Desk Setup Box",
    short: "Desk Setup",
    price: "$14.90",
    left: 301,
    pulls: [
      { tier: "Starter pull", title: "Desk Reset Kit", desc: "Cable organizer, focus wallpaper pack, and productivity card.", value: "$12" },
      { tier: "Rare physical", title: "Creator Desk Pack", desc: "Keyboard cleaning kit, sticker pack, and creator template.", value: "$22" },
      { tier: "Epic pull", title: "Desk Setup Bundle", desc: "Desk accessory bundle, template pack, and a next-box discount card.", value: "$36" }
    ]
  }
};

const feedRows = [
  ["LunaMint", "pulled Premium Creator Bundle", "$39"],
  ["NovaRay", "hit Founder Opportunity Bundle", "$149"],
  ["BoxKing", "claimed Creator Tool Pack", "$24"],
  ["QuietWolf", "upgraded into Founder Signal", "$69"],
  ["Mika", "saved Desk Setup Bundle", "$36"],
  ["SignalFox", "opened Market Signal Note", "$34"]
];

const zh = {
  "MoonBox": "MoonBox",
  "Business opportunity boxes": "商业机会盲盒",
  "Boxes": "盒子",
  "Open": "开盒",
  "Inside": "奖励",
  "Vault": "金库",
  "Live Drops": "实时掉落",
  "Open a Box": "立即开盒",
  "New drop season · 300 boxes": "新一季掉落 · 300 个盒子",
  "Open a box. Pull a business advantage.": "打开一个盒子，抽到一个商业优势。",
  "MoonBox turns the dull hunt for money ideas into a paid opening experience. Pick a theme, open the box, and pull resources you can use immediately: AI tool kits, creator templates, cash-loop playbooks, founder reports, coupons, desk gear, and upgrade cards.": "MoonBox 把枯燥的赚钱灵感搜索，变成一次有期待感的开盒体验。选择主题，打开盒子，抽取可以马上使用的资源：AI 工具包、创作者模板、现金流玩法手册、创业报告、优惠券、桌面好物和升级卡。",
  "Open the featured box": "打开精选盒子",
  "See what you can pull": "看看能抽到什么",
  "Fast reward": "快速揭晓",
  "Reveal in seconds": "几秒内出结果",
  "Useful pulls": "实用奖励",
  "Tools, reports, templates": "工具、报告、模板",
  "Keep going": "持续开盒",
  "Save, claim, upgrade": "保存、领取、升级",
  "Featured now": "当前精选",
  "AI Creator Box": "AI 创作者盒",
  "$19.90 · resources for faster content, offers, and monetization": "$19.90 · 更快做内容、做报价、做变现的资源",
  "Possible pull": "可能抽中",
  "Premium Creator Bundle": "高级创作者礼包",
  "Upgrade card": "升级卡",
  "Turn a small pull into a bigger one": "把小奖励升级成更大的礼包",
  "Boxes left": "剩余盒子",
  "Top pull today": "今日最高掉落",
  "$149 Founder Bundle": "$149 创业者礼包",
  "Choose your angle": "选择你的方向",
  "Four boxes. One reason to open: get closer to money.": "四种盒子，一个开盒理由：离赚钱更近一步。",
  "Each box is built around a different urge: create faster, find a cash loop, spot a founder signal, or upgrade the desk that keeps you shipping.": "每个盒子都对应一种真实冲动：更快创作、找到现金流玩法、捕捉创业信号，或升级让你持续输出的桌面环境。",
  "Featured": "精选",
  "Prompts, scripts, templates, tool discounts, and creator systems for people trying to turn content into cash.": "提示词、脚本、模板、工具折扣和创作者系统，给想把内容变成收入的人。",
  "Short-video script packs": "短视频脚本包",
  "Prompt workflows": "提示词工作流",
  "Tool coupons and launch kits": "工具优惠券和发布套件",
  "Select this box": "选择这个盒子",
  "Cash loop": "现金流玩法",
  "Side Hustle Box": "副业现金流盒",
  "Small offers, sourcing angles, outreach scripts, and step-by-step playbooks for making the first paid move.": "小型报价、选品角度、触达脚本和行动手册，帮助用户迈出第一步变现。",
  "Micro-offer builders": "微型报价生成器",
  "Channel playbooks": "渠道打法手册",
  "Pricing worksheets": "定价工作表",
  "Premium": "高级",
  "Founder Signal Box": "创业信号盒",
  "Trend notes, market maps, business teardowns, and rare opportunity reports for people hunting a sharper angle.": "趋势笔记、市场地图、商业拆解和稀缺机会报告，给正在寻找更锋利切入点的人。",
  "Opportunity reports": "机会报告",
  "Market signal notes": "市场信号笔记",
  "1-on-1 teardown coupons": "1 对 1 拆解券",
  "Physical": "实物",
  "Desk Setup Box": "桌面装备盒",
  "Useful desk gear, creator stickers, focus cards, wallpapers, and productivity packs that make opening feel real.": "实用桌面装备、创作者贴纸、专注卡、壁纸和效率包，让开盒更有真实感。",
  "Desk accessories": "桌面配件",
  "Focus templates": "专注模板",
  "Creator packs": "创作者资源包",
  "Opening room": "开盒室",
  "Pay once. Reveal instantly. Decide what to do next.": "支付一次，立即揭晓，然后决定下一步。",
  "The product loop is simple: pick a box, open it, get a usable pull, then claim it, save it, or upgrade it into a bigger bundle. The page should make the next open feel close, obvious, and tempting.": "产品路径很简单：选择盒子、打开盒子、得到可用奖励，然后领取、保存，或升级成更大的礼包。页面要让下一次开盒变得近在眼前、清晰且有诱惑力。",
  "Selected": "已选择",
  "Price": "价格",
  "Reveal": "揭晓",
  "Instant": "即时",
  "Ready to open": "准备开盒",
  "Prompt Pack": "提示词包",
  "Creator Bundle": "创作者礼包",
  "Tool Coupon": "工具优惠券",
  "Founder Report": "创业报告",
  "Upgrade Card": "升级卡",
  "Desk Gear": "桌面好物",
  "Open AI Creator Box": "打开 AI 创作者盒",
  "Rare pull": "稀有掉落",
  "$24 value": "$24 价值",
  "Creator Tool Pack": "创作者工具包",
  "Notion workflow, short-video script pack, and AI tool discount list.": "Notion 工作流、短视频脚本包和 AI 工具折扣清单。",
  "Claim now": "立即领取",
  "Save to Vault": "存入金库",
  "Upgrade pull": "升级奖励",
  "Inside every box": "盒子里有什么",
  "Pull useful rewards you can use today.": "抽到今天就能使用的实用奖励。",
  "Every box reveals practical resources, creator assets, business notes, coupons, or desk items that make the opening feel immediately valuable.": "每个盒子都会揭晓实用资源、创作者素材、商业笔记、优惠券或桌面物品，让开盒立刻产生价值感。",
  "Creator tools": "创作者工具",
  "Prompt packs, scripts, workflows": "提示词包、脚本、工作流",
  "Concrete files a user can open today and use to create, sell, publish, or automate faster.": "用户今天就能打开并使用的具体文件，用来更快创作、销售、发布或自动化。",
  "Money angles": "赚钱角度",
  "Cash-loop playbooks": "现金流玩法手册",
  "Small paid offer ideas, channel lists, pricing worksheets, and outreach copy for quick execution.": "小额付费报价思路、渠道清单、定价工作表和触达文案，便于快速执行。",
  "Rare pulls": "稀有奖励",
  "Reports and teardown coupons": "报告和拆解券",
  "Higher-status rewards that make users want to keep opening, upgrading, and sharing wins.": "更有状态感的奖励，让用户愿意继续开盒、升级并分享收获。",
  "Real-world feel": "现实感",
  "Desk gear and physical bundles": "桌面装备和实物礼包",
  "Small physical rewards make the product feel less abstract and better for social proof.": "小型实物奖励让产品不再抽象，也更适合做社交证明。",
  "The reward does not end at reveal.": "奖励不会止步于揭晓。",
  "Vault turns one opening into the next decision. Users can claim useful items, save bigger pulls, upgrade smaller pulls, and keep a visible record of what they have collected.": "金库把一次开盒变成下一次决策。用户可以领取实用物品、保存更大的奖励、升级较小奖励，并看到自己的收藏记录。",
  "Vault value": "金库价值",
  "Creator Tool Pack saved after the first opening.": "第一次开盒后已保存创作者工具包。",
  "Saved": "已保存",
  "Next box discount": "下个盒子折扣",
  "Ready": "可用",
  "Target": "目标",
  "Founder Bundle": "创业者礼包",
  "Conversion mechanics": "转化机制",
  "Make the user feel close to the next win.": "让用户感觉下一次收获很近。",
  "The site needs a commercial loop, not abstract explanation. Every section pushes one of four impulses: curiosity, urgency, ownership, and upgrade.": "网站需要的是商业闭环，而不是抽象说明。每个区块都推动四种冲动之一：好奇、紧迫、拥有感和升级欲。",
  "Curiosity": "好奇",
  "Visible possible pulls make the user imagine the best outcome before paying.": "看得见的可能奖励，让用户在支付前先想象最好的结果。",
  "Urgency": "紧迫",
  "Season boxes, limited counts, and live drops make waiting feel like missing out.": "季节盒、有限数量和实时掉落，让等待变得像是在错过。",
  "Ownership": "拥有感",
  "Vault makes every pull feel kept, counted, and part of a collection.": "金库让每一次奖励都像被保留、被计数，并成为收藏的一部分。",
  "Upgrade": "升级",
  "Small pulls become fuel toward better bundles, keeping the next action alive.": "小奖励可以成为通往更好礼包的燃料，让下一步行动持续存在。",
  "Other people are opening. That is the pressure.": "其他人正在开盒，这就是压力。",
  "A live feed makes the product feel active. Users see names, pulls, and values. It creates movement without explaining the machinery.": "实时动态让产品看起来正在发生。用户能看到名字、奖励和价值，不需要解释机制也能产生流动感。",
  "Open the first box. Pull something useful. Then decide if you want to chase the next one.": "打开第一个盒子，抽到有用的东西，再决定是否继续追下一个。",
  "Open a MoonBox": "打开一个 MoonBox",
  "Business resources, creator tools, physical drops, and upgradeable Vault rewards.": "商业资源、创作者工具、实物掉落和可升级的金库奖励。",
  "Starter pull": "入门掉落",
  "Epic pull": "史诗掉落",
  "Top pull": "顶级掉落",
  "Rare physical": "稀有实物",
  "Creator Starter Kit": "创作者入门包",
  "Prompt pack, publishing checklist, and a one-page content plan for shipping your next offer.": "提示词包、发布清单和一页内容计划，帮助你推出下一个报价。",
  "Template bundle, launch checklist, and a next-box discount card.": "模板礼包、发布清单和下个盒子折扣卡。",
  "Founder Signal Pack": "创业信号包",
  "Private opportunity note, creator resource bundle, and limited Founder badge.": "私密机会笔记、创作者资源礼包和限量创业者徽章。",
  "Starter Hustle Card": "副业入门卡",
  "One cash-loop idea, execution checklist, and first-message outreach prompt.": "一个现金流玩法、执行清单和第一条触达消息提示词。",
  "Channel Playbook": "渠道打法手册",
  "Niche channel list, sourcing prompt, and cold-start content plan.": "细分渠道清单、选品提示词和冷启动内容计划。",
  "Micro Offer Builder": "微型报价生成器",
  "Offer copy kit, pricing worksheet, and a next-box discount card.": "报价文案包、定价工作表和下个盒子折扣卡。",
  "Market Signal Note": "市场信号笔记",
  "Trend note, target user map, and tool stack recommendation.": "趋势笔记、目标用户地图和工具栈建议。",
  "Opportunity Teardown": "机会拆解",
  "Business model teardown, landing-page angle, and pricing hypothesis.": "商业模式拆解、落地页角度和定价假设。",
  "Founder Opportunity Bundle": "创业机会礼包",
  "Founder report, 1-on-1 teardown coupon, and limited member badge.": "创业报告、1 对 1 拆解券和限量会员徽章。",
  "Desk Reset Kit": "桌面重置包",
  "Cable organizer, focus wallpaper pack, and productivity card.": "理线器、专注壁纸包和效率卡。",
  "Creator Desk Pack": "创作者桌面包",
  "Keyboard cleaning kit, sticker pack, and creator template.": "键盘清洁套装、贴纸包和创作者模板。",
  "Desk Setup Bundle": "桌面装备礼包",
  "Desk accessory bundle, template pack, and a next-box discount card.": "桌面配件礼包、模板包和下个盒子折扣卡。",
  "pulled Premium Creator Bundle": "抽到高级创作者礼包",
  "hit Founder Opportunity Bundle": "命中创业机会礼包",
  "claimed Creator Tool Pack": "领取创作者工具包",
  "upgraded into Founder Signal": "升级到创业信号奖励",
  "saved Desk Setup Bundle": "保存桌面装备礼包",
  "opened Market Signal Note": "打开市场信号笔记",
  "New": "新增",
  "Revealing...": "揭晓中...",
  "Box opened · spinning reward": "盒子已打开 · 正在滚动奖励",
  "Vault action selected.": "已选择金库操作。"
};

const reverseZh = Object.fromEntries(Object.entries(zh).map(([en, cn]) => [cn, en]));
let currentLanguage = localStorage.getItem("moonbox-language") || "en";
let isOpening = false;

const selectedName = document.getElementById("selectedName");
const selectedPrice = document.getElementById("selectedPrice");
const openingTitle = document.getElementById("openingTitle");
const openingStatus = document.getElementById("openingStatus");
const openButton = document.getElementById("openButton");
const resultCard = document.getElementById("resultCard");
const resultTier = document.getElementById("resultTier");
const resultValue = document.getElementById("resultValue");
const resultTitle = document.getElementById("resultTitle");
const resultDescription = document.getElementById("resultDescription");
const reelTrack = document.getElementById("reelTrack");
const boxesLeft = document.getElementById("boxesLeft");
const vaultValue = document.getElementById("vaultValue");
const vaultHint = document.getElementById("vaultHint");
const vaultList = document.getElementById("vaultList");
const liveFeed = document.getElementById("liveFeed");
const languageToggle = document.getElementById("languageToggle");
const boxCards = document.querySelectorAll("[data-box-card]");
const selectButtons = document.querySelectorAll("[data-select-box]");
const vaultButtons = document.querySelectorAll("[data-vault-action]");

let currentBox = boxes.creator;
let currentKey = "creator";
let currentPull = currentBox.pulls[1];
let totalVault = 24;
let lastStatus = "Ready to open";

function t(text) {
  if (currentLanguage === "zh") return zh[text] || text;
  return reverseZh[text] || text;
}

function valueNumber(value) {
  return Number(String(value).replace(/[^0-9.]/g, "")) || 0;
}

function writeText(element, text) {
  if (element) element.textContent = t(text);
}

function translateStaticText() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (node.parentElement?.closest("script, style")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const raw = node.nodeValue;
    const text = raw.trim();
    const translated = t(text);
    if (translated === text) return;
    const lead = raw.match(/^\s*/)?.[0] || "";
    const tail = raw.match(/\s*$/)?.[0] || "";
    node.nodeValue = `${lead}${translated}${tail}`;
  });
}

function updateDocumentLanguage() {
  document.documentElement.lang = currentLanguage === "zh" ? "zh-Hans" : "en";
  document.title = currentLanguage === "zh"
    ? "BizDecipher MoonBox | 打开商业机会盲盒"
    : "BizDecipher MoonBox | Open Business Opportunity Boxes";
  const description = document.querySelector("meta[name='description']");
  if (description) {
    description.content = currentLanguage === "zh"
      ? "打开 BizDecipher MoonBox，抽取 AI 创作者工具包、副业玩法手册、创业报告、工具优惠券、桌面好物和可升级金库奖励。"
      : "Open BizDecipher MoonBox for AI creator kits, cash-loop playbooks, founder reports, tool coupons, desk drops, and upgradeable Vault rewards.";
  }
  if (languageToggle) languageToggle.textContent = currentLanguage === "zh" ? "EN" : "中文";
}

function pickPull(box) {
  const roll = Math.random();
  if (roll > 0.955) return box.pulls[box.pulls.length - 1];
  if (roll > 0.74) return box.pulls[Math.min(2, box.pulls.length - 1)];
  if (roll > 0.34) return box.pulls[Math.min(1, box.pulls.length - 1)];
  return box.pulls[0];
}

function renderFeed() {
  if (!liveFeed) return;
  liveFeed.innerHTML = feedRows
    .map(([name, action, value]) => `<div><span>${name}</span><strong>${t(action)}</strong><em>${value}</em></div>`)
    .join("");
}

function renderVaultRows() {
  if (!vaultList) return;
  [...vaultList.children].forEach((row) => {
    const label = row.dataset.label;
    const title = row.dataset.title;
    if (label) row.querySelector("span").textContent = t(label);
    if (title) row.querySelector("strong").textContent = t(title);
  });
}

function setSelectedBox(key) {
  const box = boxes[key];
  if (!box) return;
  currentKey = key;
  currentBox = box;
  currentPull = box.pulls[Math.min(1, box.pulls.length - 1)];
  lastStatus = "Ready to open";

  boxCards.forEach((card) => card.classList.toggle("selected", card.dataset.boxCard === key));
  writeText(selectedName, box.name);
  if (selectedPrice) selectedPrice.textContent = box.price;
  writeText(openingTitle, box.name);
  writeText(openingStatus, lastStatus);
  writeText(openButton, `Open ${box.short} Box`);
  if (boxesLeft) boxesLeft.textContent = String(box.left);
  if (resultCard) resultCard.classList.add("hidden");
}

function addToVault(pull) {
  totalVault += valueNumber(pull.value);
  if (vaultValue) vaultValue.textContent = `$${totalVault}`;
  const hint = `${pull.title} added. Claim it, save it, or use it as upgrade fuel.`;
  if (vaultHint) vaultHint.textContent = currentLanguage === "zh"
    ? `${t(pull.title)} 已加入金库。可以领取、保存，或作为升级燃料。`
    : hint;
  if (!vaultList) return;
  const row = document.createElement("div");
  row.dataset.label = "New";
  row.dataset.title = pull.title;
  row.innerHTML = `<span>${t("New")}</span><strong>${t(pull.title)}</strong><em>${pull.value}</em>`;
  vaultList.prepend(row);
  while (vaultList.children.length > 5) vaultList.removeChild(vaultList.lastElementChild);
}

function renderPull(pull) {
  currentPull = pull;
  writeText(resultTier, pull.tier);
  if (resultValue) resultValue.textContent = currentLanguage === "zh" ? `${pull.value} 价值` : `${pull.value} value`;
  writeText(resultTitle, pull.title);
  writeText(resultDescription, pull.desc);
  if (resultCard) resultCard.classList.remove("hidden");
  addToVault(pull);
}

function updateCurrentPullView() {
  if (!currentPull || resultCard?.classList.contains("hidden")) return;
  writeText(resultTier, currentPull.tier);
  if (resultValue) resultValue.textContent = currentLanguage === "zh" ? `${currentPull.value} 价值` : `${currentPull.value} value`;
  writeText(resultTitle, currentPull.title);
  writeText(resultDescription, currentPull.desc);
}

function openBox() {
  if (!openButton || !openingStatus || !reelTrack || isOpening) return;
  isOpening = true;
  openButton.disabled = true;
  writeText(openButton, "Revealing...");
  lastStatus = "Box opened · spinning reward";
  writeText(openingStatus, lastStatus);
  if (resultCard) resultCard.classList.add("hidden");
  reelTrack.classList.remove("spinning");
  void reelTrack.offsetWidth;
  reelTrack.classList.add("spinning");

  window.setTimeout(() => {
    const pull = pickPull(currentBox);
    renderPull(pull);
    currentBox.left = Math.max(0, currentBox.left - 1);
    if (boxesLeft) boxesLeft.textContent = String(currentBox.left);
    lastStatus = `${pull.tier} revealed · added to Vault`;
    if (openingStatus) openingStatus.textContent = currentLanguage === "zh"
      ? `${t(pull.tier)} 已揭晓 · 已加入金库`
      : lastStatus;
    openButton.disabled = false;
    writeText(openButton, `Open another ${currentBox.short} Box`);
    isOpening = false;
  }, 850);
}

function handleVaultAction(event) {
  const action = event.currentTarget.dataset.vaultAction;
  const copy = {
    claim: `${currentPull.title} is ready to claim. The user gets the useful file, coupon, report, or physical reward path immediately.`,
    save: `${currentPull.title} stays in Vault. Ownership makes the collection feel real and keeps the user coming back.`,
    upgrade: `${currentPull.title} becomes upgrade fuel. Small wins can push the user toward a higher-status bundle.`
  };
  const zhCopy = {
    claim: `${t(currentPull.title)} 已可领取。用户可以立刻拿到有用文件、优惠券、报告或实物奖励路径。`,
    save: `${t(currentPull.title)} 会留在金库里。拥有感会让收藏更真实，也让用户愿意回来。`,
    upgrade: `${t(currentPull.title)} 会变成升级燃料。小收获可以推动用户靠近更高状态的礼包。`
  };
  if (vaultHint) vaultHint.textContent = currentLanguage === "zh" ? (zhCopy[action] || t("Vault action selected.")) : (copy[action] || "Vault action selected.");
}

function revealOnScroll() {
  const targets = document.querySelectorAll(".box-card, .inside-grid article, .loop-grid article, .vault-list div, .live-feed div, .final-card");
  if (!window.IntersectionObserver) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.animate([
        { opacity: 0, transform: "translateY(18px)" },
        { opacity: 1, transform: "translateY(0)" }
      ], { duration: 520, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "both" });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });
  targets.forEach((target) => observer.observe(target));
}

function syncLanguage() {
  updateDocumentLanguage();
  translateStaticText();
  renderFeed();
  renderVaultRows();
  writeText(selectedName, currentBox.name);
  writeText(openingTitle, currentBox.name);
  if (!isOpening) writeText(openButton, resultCard?.classList.contains("hidden") ? `Open ${currentBox.short} Box` : `Open another ${currentBox.short} Box`);
  if (openingStatus) {
    if (lastStatus.includes("revealed")) {
      openingStatus.textContent = currentLanguage === "zh" ? `${t(currentPull.tier)} 已揭晓 · 已加入金库` : lastStatus;
    } else {
      writeText(openingStatus, lastStatus);
    }
  }
  updateCurrentPullView();
}

selectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setSelectedBox(button.dataset.selectBox);
    document.getElementById("open")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
openButton?.addEventListener("click", openBox);
vaultButtons.forEach((button) => button.addEventListener("click", handleVaultAction));
languageToggle?.addEventListener("click", () => {
  currentLanguage = currentLanguage === "zh" ? "en" : "zh";
  localStorage.setItem("moonbox-language", currentLanguage);
  syncLanguage();
});

if (vaultList) {
  [...vaultList.children].forEach((row) => {
    const label = row.querySelector("span")?.textContent.trim();
    const title = row.querySelector("strong")?.textContent.trim();
    if (label) row.dataset.label = reverseZh[label] || label;
    if (title) row.dataset.title = reverseZh[title] || title;
  });
}

renderFeed();
setSelectedBox("creator");
syncLanguage();
revealOnScroll();
