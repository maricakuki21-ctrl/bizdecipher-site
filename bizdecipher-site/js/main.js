const boxes = {
  starter: {
    name: "Daily Digital Blessing",
    short: "Daily Blessing",
    price: "$2.99",
    delivery: "Instant",
    pulls: [
      {
        tier: "Common digital pull",
        title: "Moon Calm Card",
        desc: "A collectible digital fortune card for today, plus a gentle next-box discount path saved in your Vault.",
        meta: "Card · Vault saved",
        type: "Card"
      },
      {
        tier: "Useful digital pull",
        title: "Small Blessing Credits",
        desc: "Platform-only Blessing Credits for future MoonBox openings or upgrades. Credits are not withdrawable and have no cash value.",
        meta: "Credits · Platform only",
        type: "Credit"
      },
      {
        tier: "Rare starter pull",
        title: "Starter Upgrade Ticket",
        desc: "A digital ticket that can improve a future opening path inside MoonBox. It is not a cash prize or buyback claim.",
        meta: "Upgrade · Future open",
        type: "Upgrade"
      }
    ]
  },
  moon: {
    name: "Moon Digital Box",
    short: "Moon Box",
    price: "$7.99",
    delivery: "Instant",
    pulls: [
      {
        tier: "Useful digital pull",
        title: "Blessing Credits Pack",
        desc: "A larger platform credit pack for future boxes, upgrades, and seasonal digital drops. No withdrawal, transfer, or cash redemption.",
        meta: "Credits · Platform only",
        type: "Credit"
      },
      {
        tier: "Partner voucher pull",
        title: "Partner Perk Voucher",
        desc: "A partner coupon or digital perk delivered as a code. Availability and use follow provider terms and regional rules.",
        meta: "Voucher · Provider terms",
        type: "Voucher"
      },
      {
        tier: "Rare digital pull",
        title: "Digital Gift Card Path",
        desc: "A selected provider gift-card style reward path. It is handled by provider rules and is never a MoonBox cash-out balance.",
        meta: "Gift path · Terms apply",
        type: "Rare"
      },
      {
        tier: "Epic digital pull",
        title: "Moon Upgrade Pass",
        desc: "A higher-status upgrade pass for a future MoonBox opening, designed to keep the next digital reveal close.",
        meta: "Upgrade · Higher path",
        type: "Upgrade"
      }
    ]
  },
  founder: {
    name: "Founder Digital Box",
    short: "Founder Box",
    price: "$24.99",
    delivery: "Instant",
    pulls: [
      {
        tier: "Founder identity pull",
        title: "Founder Seal Digital Card",
        desc: "A numbered early-member digital identity card. It is membership identity, not revenue share or investment rights.",
        meta: "Founder · Identity",
        type: "Founder"
      },
      {
        tier: "Premium voucher pull",
        title: "Premium Partner Voucher",
        desc: "A higher-status partner voucher or digital perk, delivered through Vault with provider terms clearly attached.",
        meta: "Voucher · Premium",
        type: "Voucher"
      },
      {
        tier: "Future claim pull",
        title: "Future Physical Claim Priority",
        desc: "Priority for selected physical Moon gifts only when fulfillment is ready in supported regions. No guaranteed shipment in version one.",
        meta: "Future · Supported regions",
        type: "Future"
      },
      {
        tier: "Epic founder pull",
        title: "Founder Monthly Drop Access",
        desc: "Early access to monthly digital drops, founder-only cards, and seasonal upgrade paths without cash-out or buyback mechanics.",
        meta: "Founder · Early access",
        type: "Founder"
      }
    ]
  }
};

const dailySigns = [
  {
    symbol: "Calm",
    title: "A calm moon rises",
    text: "Move one important thing forward before noon. Small, clean action is luck you can actually use."
  },
  {
    symbol: "Focus",
    title: "Your focus is the charm",
    text: "Do not chase every signal today. Pick one door, knock twice, and let the rest stay quiet."
  },
  {
    symbol: "Seed",
    title: "Plant the small seed",
    text: "A small message, draft, or offer can become tomorrow's opening. Start before it feels perfect."
  },
  {
    symbol: "Shield",
    title: "Protect your attention",
    text: "Your luck improves when you refuse noisy promises. Keep the boundary clear and the path simple."
  },
  {
    symbol: "Spark",
    title: "A soft spark appears",
    text: "Share one useful thing today. Luck often arrives through a person who remembers your signal."
  },
  {
    symbol: "Tide",
    title: "The tide turns slowly",
    text: "Do not force the result. Prepare the next step, then let timing do part of the work."
  }
];

const moonTreasure = {
  baseCurrent: 3420,
  lifetime: 128420,
  burstTarget: 4000,
  energy: 3440,
  lastGain: 60,
  orbitSeen: "Mythic Moon Treasure · Founder Seal · Moon Upgrade Pass"
};

const treasureGains = {
  starter: 60,
  moon: 160,
  founder: 500
};

const feedRows = [
  ["LunaMint", "saved a Moon Calm Card", "Card"],
  ["NovaRay", "grew Moon Treasure gift energy", "Moon Treasure"],
  ["QuietWolf", "joined this cycle's Community Moon Drops", "Moon Drop"],
  ["Mika", "unlocked a Starter Upgrade Ticket", "Upgrade"],
  ["SignalFox", "saw Mythic Moon Treasure in the orbit", "Orbit"],
  ["Aster", "received Founder Seal Digital Card", "Founder"]
];

const zh = {
  "MoonBox": "MoonBox",
  "Digital fortune boxes": "数字好运盲盒",
  "Daily Draw": "每日一抽",
  "Boxes": "盒子",
  "Moon Treasure": "月亮宝藏",
  "Open": "开盒",
  "Vault": "礼物库",
  "Rules": "规则",
  "Open a Box": "打开盒子",
  "Digital-first MoonBox · no shipping required for most rewards": "数字优先 MoonBox · 大多数奖励无需发货",
  "Open a little luck online.": "在线打开一点好运。",
  "MoonBox is a digital fortune box experience. Draw a daily sign for free, open paid digital boxes for credits, vouchers, upgrades, and gift-card style rewards, then keep everything organized inside your Vault.": "MoonBox 是数字好运盲盒体验。每天免费抽一张今日签，也可以打开付费数字盲盒，获得积分、券、升级票和礼品卡式奖励，并统一保存在礼物库里。",
  "Draw today's luck": "抽取今日好运",
  "Choose a digital box": "选择数字盲盒",
  "Free ritual": "免费仪式",
  "Daily draw has no cash value": "每日抽签没有现金价值",
  "Moon Treasure": "月亮宝藏",
  "Growing gift value, not cash": "增长的是礼物价值，不是现金",
  "Community Burst": "社区爆发",
  "One opener triggers, many Vaults celebrate": "一人触发，多个礼物库一起庆祝",
  "Instant rewards": "即时奖励",
  "Digital delivery first": "数字交付优先",
  "Safe boundary": "安全边界",
  "No cash-out or buyback": "不可提现、无平台回购",
  "Featured flow": "精选流程",
  "Daily sign into digital box": "从每日签进入数字盲盒",
  "Start with a free ritual. If the user wants more, the paid MoonBox reveal carries the actual digital reward path.": "先用免费仪式建立感觉。如果用户想继续，付费 MoonBox 承载真正的数字奖励路径。",
  "Daily free": "每日免费",
  "Fortune reading only": "只做今日签解读",
  "Mythic path": "传说路径",
  "Treasure can appear in any paid box": "任意付费盒都可能出现宝藏",
  "Current treasure": "当前宝藏",
  "Full Moon Burst": "满月爆发",
  "$3,420 prepared": "已准备 $3,420",
  "216 energy away": "还差 216 能量",
  "Paid box": "付费盒子",
  "Credits, vouchers, upgrades": "积分、券、升级票",
  "Delivery": "交付",
  "Digital first": "数字优先",
  "Physical claims": "实物领取",
  "Later, supported regions only": "后续开放，仅限支持地区",
  "Free daily draw": "每日免费一抽",
  "A ritual, not a reward economy.": "这是仪式，不是奖励经济。",
  "Version one gives no redeemable value in the free draw. It focuses on atmosphere, sign reading, shareable wording, and a soft path into paid Digital MoonBox. Value-based free draw can be tested later as an A/B variant.": "第一版免费抽不提供可兑换价值，只聚焦氛围、今日签、可分享文案，以及自然进入付费数字盲盒的路径。带价值的免费抽可以后续作为 A/B 版本测试。",
  "Today": "今天",
  "Draw your sign": "抽取今日签",
  "Moon": "月亮",
  "Tap the card to reveal today's message.": "点击卡片揭晓今天的信息。",
  "Draw Today's Luck": "抽取今日好运",
  "No cash value.": "没有现金价值。",
  "The daily draw is a free fortune ritual. It does not grant credits, gift cards, withdrawable balance, or guaranteed rewards.": "每日抽签是免费的好运仪式，不发放积分、礼品卡、可提现余额或保证奖励。",
  "A/B testing later": "后续 A/B 测试",
  "Keep the first version clean.": "第一版保持干净。",
  "Variant A now": "当前 A 版本",
  "Ritual-only free draw": "仅仪式感免费抽",
  "Fortune reading, mood, share text, and soft CTA. Lowest abuse risk.": "今日签、情绪、分享文案和柔性转化，滥用风险最低。",
  "Variant B later": "后续 B 版本",
  "Light progress value": "轻量进度价值",
  "Optional cards, streak, or points after traffic is real and abuse controls exist.": "当真实流量和防滥用机制具备后，再测试卡片、连续签到或点数。",
  "Paid digital boxes": "付费数字盲盒",
  "Three paid boxes. No warehouse needed.": "三个付费盒子，无需仓库。",
  "Paid MoonBoxes deliver digital items first: cards, credits, discount codes, partner vouchers, upgrade tickets, digital gift cards, and optional future physical claim tickets.": "付费 MoonBox 优先交付数字物品：卡片、积分、折扣码、合作券、升级票、数字礼品卡，以及可选的未来实物领取票。",
  "Starter": "入门",
  "Main": "主推",
  "Founder": "创始会员",
  "Daily Digital Blessing": "每日数字祝福盒",
  "A low-price paid reveal after the free ritual. Best for testing payment and repeat opens without shipping.": "免费仪式后的低价付费揭晓，适合在不发货的情况下测试支付和复开。",
  "Digital fortune card": "数字好运卡",
  "Small Blessing Credits or discount path": "小额祝福积分或折扣路径",
  "Entry-level upgrade chance": "入门升级机会",
  "Select this box": "选择这个盒子",
  "Moon Digital Box": "月亮数字盒",
  "The main online opening experience with better digital gifts, credits, vouchers, and upgrade tickets.": "核心在线开盒体验，包含更好的数字礼物、积分、券和升级票。",
  "Blessing Credits": "祝福积分",
  "Partner voucher or upgrade ticket": "合作券或升级票",
  "Small chance of digital gift card": "小概率数字礼品卡",
  "Founder Digital Box": "创始会员数字盒",
  "For early members who want identity, higher-status digital rewards, and future physical claim priority.": "给想要身份、更高状态数字奖励和未来实物优先权的早期成员。",
  "Founder seal digital card": "创始会员印章数字卡",
  "Higher credits or voucher path": "更高积分或券路径",
  "Future physical claim priority": "未来实物领取优先权",
  "Mythic Moon Treasure": "传说月亮宝藏",
  "A growing gift pool for one big reveal and many small celebrations.": "一个为一次大揭晓和许多小庆祝准备的成长型礼物池。",
  "Every paid MoonBox adds gift energy to the current Moon Treasure. If a Mythic Moon Burst appears, the opener receives the largest gift bundle, community Moon Drops release to eligible Vaults, and a seed rolls into the next moon cycle.": "每次付费打开 MoonBox，都会为当前月亮宝藏增加礼物能量。如果出现传说满月爆发，开盒者获得最大礼物包，符合条件的礼物库获得社区月亮掉落，并有一颗种子滚入下一轮月亮周期。",
  "Open a MoonBox": "打开 MoonBox",
  "Read safe rules": "阅读安全规则",
  "Current Moon Treasure": "当前月亮宝藏",
  "$3,420 gift value prepared": "已准备 $3,420 礼物价值",
  "86%": "86%",
  "Lifetime generated": "历史累计生成",
  "$128,420": "$128,420",
  "Next Burst": "下一次爆发",
  "Split": "分配",
  "60 / 25 / 15": "60 / 25 / 15",
  "Winner main bundle": "触发者主礼物包",
  "60%": "60%",
  "Community Moon Drops": "社区月亮掉落",
  "25%": "25%",
  "Next Moon Seed": "下一轮月亮种子",
  "15%": "15%",
  "Gift value only. Moon Treasure is not cash, cannot be withdrawn, and is released as Vault gifts, vouchers, credits, upgrades, or future claim paths.": "仅为礼物价值。月亮宝藏不是现金，不能提现，会以礼物库礼物、券、积分、升级或未来领取路径释放。",
  "Opening room": "开盒室",
  "Reveal instantly. Save the result. Push the next action.": "即时揭晓，保存结果，推动下一步。",
  "The paid opening room is the core product. It gives the user a clear reveal, a believable reward category, and immediate choices: save, claim, or use as upgrade fuel. The site never frames this as cash-out.": "付费开盒室是核心产品。它给用户明确的揭晓、可信的奖励类型，以及立即可选的动作：保存、领取或作为升级燃料。网站绝不把它包装成提现。",
  "Selected": "已选择",
  "Price": "价格",
  "Instant": "即时",
  "Ready to open": "准备开盒",
  "Fortune Card": "好运卡",
  "Discount Code": "折扣码",
  "Upgrade Ticket": "升级票",
  "Partner Voucher": "合作券",
  "Gift Card Path": "礼品卡路径",
  "Open Daily Digital Blessing": "打开每日数字祝福盒",
  "Digital pull": "数字掉落",
  "Delivered to Vault": "已送入礼物库",
  "Moon Calm Card": "月亮平静卡",
  "A digital fortune card and a small next-box discount path.": "一张数字好运卡和一个下次开盒折扣路径。",
  "Seen in the orbit": "轨道中看见",
  "Mythic Moon Treasure · Founder Seal · Moon Upgrade Pass": "传说月亮宝藏 · 创始印章 · 月亮升级通行证",
  "Moon Treasure grew": "月亮宝藏增长",
  "+60 Blessing Energy": "+60 祝福能量",
  "Community eligibility": "社区资格",
  "Entered this cycle": "已进入本周期",
  "Save to Vault": "保存到礼物库",
  "Claim details": "查看领取细节",
  "Use as upgrade fuel": "作为升级燃料",
  "Digital gift pool": "数字礼物池",
  "What can be inside without shipping.": "不用发货也能放什么。",
  "Everything in the first version should be deliverable by account, email, code, or Vault. Physical gifts remain optional future claims, not the core promise.": "第一版所有内容都应能通过账户、邮件、代码或礼物库交付。实物礼物只是未来可选领取，不是核心承诺。",
  "Card": "卡片",
  "Credit": "积分",
  "Voucher": "券",
  "Rare": "稀有",
  "Upgrade": "升级",
  "Future": "未来",
  "Digital Fortune Cards": "数字好运卡",
  "Love, Calm, Focus, New Start, Protection, Money Blessing themes. They create ritual and collection without cash value.": "爱情、平静、专注、新开始、守护、财运等主题。它们创造仪式感和收藏感，但没有现金价值。",
  "Blessing Credits": "祝福积分",
  "Platform credits for future MoonBox purchases or upgrades. They are not withdrawable and cannot be redeemed for cash.": "用于未来 MoonBox 购买或升级的平台积分。不可提现，也不能兑换现金。",
  "Discounts and partner perks": "折扣与合作权益",
  "Next-box discounts, upgrade tickets, partner coupons, digital assets, templates, and tool perks.": "下次开盒折扣、升级票、合作优惠券、数字资产、模板和工具权益。",
  "Gift-card style rewards": "礼品卡式奖励",
  "Selected boxes may include digital gift cards or provider vouchers, subject to provider terms and regional availability.": "部分盒子可包含数字礼品卡或服务商券，受服务商条款和地区可用性限制。",
  "Upgrade Tickets": "升级票",
  "Turn a smaller digital pull into a better future opening path, without promising cash or investment value.": "把较小的数字掉落变成更好的未来开盒路径，但不承诺现金或投资价值。",
  "Physical Claim Ticket": "实物领取票",
  "Optional later: selected regions may claim physical Moon gifts when fulfillment exists.": "后续可选：当履约具备后，部分地区可领取实物月亮礼物。",
  "Gift Vault": "礼物库",
  "The Vault makes digital rewards feel owned.": "礼物库让数字奖励有拥有感。",
  "Without shipping, the Vault becomes the product's weight. It stores cards, credits, vouchers, upgrade tickets, partner codes, and future claim tickets in one visible place.": "没有发货时，礼物库就是产品重量。它把卡片、积分、券、升级票、合作代码和未来领取票放在一个可见位置。",
  "Vault status": "礼物库状态",
  "3 saved items": "已保存 3 项",
  "Open a paid MoonBox to add the next digital item.": "打开付费 MoonBox，添加下一个数字物品。",
  "Saved": "已保存",
  "Ready": "可用",
  "Target": "目标",
  "Next-box discount path": "下次开盒折扣路径",
  "Founder Seal Digital Card": "创始会员印章数字卡",
  "Founder Circle": "创始会员圈",
  "Identity, early access, and monthly digital drops.": "身份、提前体验和每月数字掉落。",
  "Founder should never be positioned as revenue share or investment. It is an early-member identity layer with discounts, digital seal cards, early access, and future claim priority.": "创始会员绝不能被包装成收益分成或投资。它是早期成员身份层，包含折扣、数字印章卡、提前体验和未来领取优先权。",
  "Founder Seal Number": "创始会员编号",
  "Limited digital identity card for early members.": "早期成员的限量数字身份卡。",
  "Early Moon Drops": "提前月亮掉落",
  "Open selected digital drops before the public.": "比公开用户更早打开部分数字掉落。",
  "Future Claim Priority": "未来领取优先权",
  "Priority only when physical fulfillment becomes available.": "仅在实物履约开放时提供优先权。",
  "System loop": "系统闭环",
  "The site needs a full loop, not just a landing page.": "网站需要完整闭环，而不只是落地页。",
  "Every page section should support one action: draw free sign, open paid box, save reward, return later, or understand why the rules are safe.": "每个区块都应支持一个动作：抽免费签、开付费盒、保存奖励、稍后回来，或理解为什么规则安全。",
  "Free ritual": "免费仪式",
  "Daily draw creates habit and atmosphere without giving actual redeemable value in version one.": "第一版每日抽签创造习惯和氛围，但不给实际可兑换价值。",
  "Paid reveal": "付费揭晓",
  "Digital MoonBox provides the real reward path: credits, vouchers, upgrades, or gift-card style rewards.": "数字 MoonBox 提供真正的奖励路径：积分、券、升级或礼品卡式奖励。",
  "Moon Treasure grows": "月亮宝藏增长",
  "Every paid opening adds gift energy to the current Moon Treasure and makes the next Full Moon Burst feel closer.": "每次付费打开都会给当前月亮宝藏增加礼物能量，让下一次满月爆发感觉更近。",
  "Gift orbit": "礼物轨道",
  "Premium gifts can appear in the opening orbit as atmosphere and aspiration, without cash-win or prize-pool framing.": "高级礼物可以作为氛围和期待出现在开盒轨道中，不使用赢钱或奖池包装。",
  "Community Burst": "社区爆发",
  "When a Mythic Moon Burst appears, the opener gets the main bundle and eligible Vaults receive small Moon Drops.": "当传说满月爆发出现时，开盒者获得主礼物包，符合条件的礼物库获得小额月亮掉落。",
  "Vault ownership": "礼物库拥有感",
  "Users see what they own and what can be used next, making digital rewards feel concrete.": "用户看到自己拥有什么、下一步能用什么，让数字奖励变得具体。",
  "Upgrade and return": "升级并回访",
  "Upgrade tickets, Founder identity, and seasonal drops keep the next opening close.": "升级票、创始身份和季节掉落让下一次开盒更近。",
  "Live Blessings": "实时祝福",
  "Make the product feel active without showing cash.": "不展示现金，也让产品显得正在发生。",
  "The feed should show openings, cards, vouchers, upgrades, Moon Treasure growth, and community bursts. It should not show balance-style displays, winnings language, or anything framed as gambling.": "动态应展示开盒、卡片、券、升级、月亮宝藏增长和社区爆发。不展示余额式界面、赢钱表述或任何博彩化包装。",
  "Safe rules": "安全规则",
  "Clear boundaries protect the product.": "清晰边界保护产品。",
  "MoonBox should feel magical, but the rules must be concrete. This is a digital entertainment and gift experience, not a cash lottery.": "MoonBox 可以有魔法感，但规则必须具体。这是数字娱乐与礼物体验，不是现金抽奖。",
  "No cash-out": "不可提现",
  "Blessing Credits and Luck-themed items have no cash value and cannot be withdrawn.": "祝福积分和好运主题物品没有现金价值，不能提现。",
  "No buyback": "无平台回购",
  "MoonBox does not repurchase gifts, codes, cards, credits, or claim tickets.": "MoonBox 不回购礼物、代码、卡片、积分或领取票。",
  "No investment return": "无投资回报",
  "Founder Circle is membership identity, not revenue share or profit rights.": "创始会员圈是会员身份，不是收益分成或利润权利。",
  "Provider terms apply": "适用服务商条款",
  "Digital gift cards and partner vouchers follow provider rules and regional restrictions.": "数字礼品卡和合作券遵循服务商规则与地区限制。",
  "Shipping later": "后续发货",
  "Physical gifts may be available only in supported regions after fulfillment is ready.": "实物礼物仅在履约准备好后于支持地区开放。",
  "Free draw is ritual": "免费抽签是仪式",
  "The daily free draw in version one has no redeemable value. A value-based variant can be A/B tested later.": "第一版每日免费抽没有可兑换价值。带价值版本可后续 A/B 测试。",
  "Moon Treasure is gifts": "月亮宝藏是礼物",
  "The growing treasure is prepared gift value only. A Burst releases Vault gifts, vouchers, credits, upgrades, or future claim paths, not cash.": "增长中的宝藏仅为已准备礼物价值。爆发释放的是礼物库礼物、券、积分、升级或未来领取路径，而不是现金。",
  "Community drops are not payouts": "社区掉落不是派彩",
  "Eligible users may receive small Moon Drops during a Burst. They are not dividends, betting shares, or cash distributions.": "符合条件的用户可能在爆发时获得小额月亮掉落。它们不是分红、投注份额或现金分配。",
  "FAQ": "常见问题",
  "Questions the site must answer before launch.": "上线前网站必须回答的问题。",
  "What is MoonBox?": "MoonBox 是什么？",
  "MoonBox is a digital fortune box experience. Users can draw a free daily sign and open paid digital boxes for cards, credits, vouchers, upgrade tickets, partner perks, or gift-card style rewards.": "MoonBox 是数字好运盲盒体验。用户可以免费抽每日签，也可以打开付费数字盲盒，获得卡片、积分、券、升级票、合作权益或礼品卡式奖励。",
  "Does the free daily draw give rewards?": "每日免费抽会给奖励吗？",
  "In version one, no. It is a free fortune ritual with no redeemable value. This keeps abuse risk low and lets us A/B test value mechanics later.": "第一版不会。它是没有可兑换价值的免费好运仪式，这能降低滥用风险，并方便后续测试价值机制。",
  "Can rewards be exchanged for cash?": "奖励可以换现金吗？",
  "No. MoonBox does not provide cash-out, buyback, investment returns, or guaranteed cash value. Some digital gifts may be transferable depending on provider terms.": "不可以。MoonBox 不提供提现、回购、投资回报或保证现金价值。部分数字礼物是否可转让取决于服务商条款。",
  "How does Moon Treasure work?": "月亮宝藏如何运作？",
  "Every paid MoonBox adds gift energy to a growing gift pool. If a Mythic Moon Burst appears, the opener receives the largest gift bundle and eligible Vaults receive small community Moon Drops. It is gift value, not cash.": "每次付费打开 MoonBox，都会给成长中的礼物池增加礼物能量。如果出现传说满月爆发，开盒者获得最大礼物包，符合条件的礼物库获得小额社区月亮掉落。它是礼物价值，不是现金。",
  "Do you ship physical gifts?": "会发实物礼物吗？",
  "Not as the first promise. Most rewards are digital. Selected physical gifts may become available later in supported regions.": "首版不把实物发货作为承诺。大多数奖励是数字的，部分实物礼物可在后续支持地区开放。",
  "What should be built first?": "应该先做什么？",
  "Build the homepage, daily draw, paid opening room, Vault, gift pool, Founder page, FAQ, Terms, order success, and account shell before adding complex backend systems.": "先做首页、每日抽签、付费开盒室、礼物库、礼物池、创始会员页、FAQ、条款、订单成功页和账户壳，再加入复杂后端系统。",
  "Build direction locked": "建设方向已锁定",
  "Digital-first MoonBox now. Physical gifts later. No cash loop ever.": "现在做数字优先 MoonBox。实物礼物后续再加。永远不做现金闭环。",
  "Start with the daily ritual": "从每日仪式开始",
  "MoonBox Digital": "MoonBox Digital",
  "Digital fortune cards, credits, vouchers, upgrade paths, and optional future physical claims.": "数字好运卡、积分、券、升级路径，以及可选的未来实物领取。",
  "Common digital pull": "普通数字掉落",
  "Useful digital pull": "实用数字掉落",
  "Rare starter pull": "稀有入门掉落",
  "Partner voucher pull": "合作券掉落",
  "Rare digital pull": "稀有数字掉落",
  "Epic digital pull": "史诗数字掉落",
  "Founder identity pull": "创始身份掉落",
  "Premium voucher pull": "高级券掉落",
  "Future claim pull": "未来领取掉落",
  "Epic founder pull": "史诗创始掉落",
  "Small Blessing Credits": "小额祝福积分",
  "Starter Upgrade Ticket": "入门升级票",
  "Blessing Credits Pack": "祝福积分包",
  "Partner Perk Voucher": "合作权益券",
  "Digital Gift Card Path": "数字礼品卡路径",
  "Moon Upgrade Pass": "月亮升级通行证",
  "Premium Partner Voucher": "高级合作券",
  "Future Physical Claim Priority": "未来实物领取优先权",
  "Founder Monthly Drop Access": "创始会员每月掉落权限",
  "A collectible digital fortune card for today, plus a gentle next-box discount path saved in your Vault.": "一张今日可收藏的数字好运卡，以及保存到礼物库的柔性下次开盒折扣路径。",
  "Platform-only Blessing Credits for future MoonBox openings or upgrades. Credits are not withdrawable and have no cash value.": "仅限平台内用于未来 MoonBox 开盒或升级的祝福积分。积分不可提现，没有现金价值。",
  "A digital ticket that can improve a future opening path inside MoonBox. It is not a cash prize or buyback claim.": "可改善未来 MoonBox 开盒路径的数字票。它不是现金奖品，也不是回购凭证。",
  "A larger platform credit pack for future boxes, upgrades, and seasonal digital drops. No withdrawal, transfer, or cash redemption.": "更大的平台积分包，可用于未来盒子、升级和季节数字掉落。不可提现、转让或兑换现金。",
  "A partner coupon or digital perk delivered as a code. Availability and use follow provider terms and regional rules.": "以代码形式交付的合作优惠券或数字权益。可用性和使用遵循服务商条款与地区规则。",
  "A selected provider gift-card style reward path. It is handled by provider rules and is never a MoonBox cash-out balance.": "选定服务商的礼品卡式奖励路径。由服务商规则处理，永远不是 MoonBox 可提现余额。",
  "A higher-status upgrade pass for a future MoonBox opening, designed to keep the next digital reveal close.": "用于未来 MoonBox 开盒的更高状态升级通行证，让下一次数字揭晓更近。",
  "A numbered early-member digital identity card. It is membership identity, not revenue share or investment rights.": "带编号的早期成员数字身份卡。它是会员身份，不是收益分成或投资权利。",
  "A higher-status partner voucher or digital perk, delivered through Vault with provider terms clearly attached.": "更高状态的合作券或数字权益，通过礼物库交付，并清晰附带服务商条款。",
  "Priority for selected physical Moon gifts only when fulfillment is ready in supported regions. No guaranteed shipment in version one.": "仅当支持地区履约准备好时，提供部分实物月亮礼物优先权。第一版不保证发货。",
  "Early access to monthly digital drops, founder-only cards, and seasonal upgrade paths without cash-out or buyback mechanics.": "提前体验每月数字掉落、创始专属卡和季节升级路径，不包含提现或回购机制。",
  "Card · Vault saved": "卡片 · 已存入礼物库",
  "Credits · Platform only": "积分 · 仅限平台内",
  "Upgrade · Future open": "升级 · 未来开盒",
  "Voucher · Provider terms": "券 · 服务商条款",
  "Gift path · Terms apply": "礼品路径 · 适用条款",
  "Upgrade · Higher path": "升级 · 更高路径",
  "Founder · Identity": "创始会员 · 身份",
  "Voucher · Premium": "券 · 高级",
  "Future · Supported regions": "未来 · 支持地区",
  "Founder · Early access": "创始会员 · 提前体验",
  "Revealing...": "揭晓中...",
  "Box opened · spinning reward": "盒子已打开 · 正在滚动奖励",
  "added to Vault": "已加入礼物库",
  "Open another": "再打开一个",
  "Saved to Vault.": "已保存到礼物库。",
  "Claim details opened.": "已打开领取细节。",
  "Upgrade path selected.": "已选择升级路径。",
  "New": "新增",
  "saved a Moon Calm Card": "保存了月亮平静卡",
  "opened a Partner Perk Voucher": "打开了合作权益券",
  "added Blessing Credits": "加入了祝福积分",
  "grew Moon Treasure gift energy": "增加了月亮宝藏礼物能量",
  "joined this cycle's Community Moon Drops": "加入了本周期社区月亮掉落",
  "saw Mythic Moon Treasure in the orbit": "在轨道中看见传说月亮宝藏",
  "Moon Treasure": "月亮宝藏",
  "Moon Drop": "月亮掉落",
  "Orbit": "轨道",
  "unlocked a Starter Upgrade Ticket": "解锁了入门升级票",
  "received Founder Seal Digital Card": "获得了创始会员印章数字卡",
  "saved Future Physical Claim Priority": "保存了未来实物领取优先权",
  "A calm moon rises": "平静的月亮升起",
  "Your focus is the charm": "专注就是你的护符",
  "Plant the small seed": "种下一颗小种子",
  "Protect your attention": "保护你的注意力",
  "A soft spark appears": "柔和的火花出现",
  "The tide turns slowly": "潮水慢慢转向",
  "Calm": "平静",
  "Focus": "专注",
  "Seed": "种子",
  "Shield": "守护",
  "Spark": "火花",
  "Tide": "潮汐",
  "Move one important thing forward before noon. Small, clean action is luck you can actually use.": "中午前推进一件重要的小事。干净的小行动，才是真正可用的好运。",
  "Do not chase every signal today. Pick one door, knock twice, and let the rest stay quiet.": "今天不要追逐所有信号。选择一扇门，敲两次，让其他声音保持安静。",
  "A small message, draft, or offer can become tomorrow's opening. Start before it feels perfect.": "一条小消息、一个草稿或一个报价，可能成为明天的开口。别等完美再开始。",
  "Your luck improves when you refuse noisy promises. Keep the boundary clear and the path simple.": "当你拒绝嘈杂承诺时，好运会变好。边界清楚，路径简单。",
  "Share one useful thing today. Luck often arrives through a person who remembers your signal.": "今天分享一件有用的事。好运常常通过记住你信号的人到来。",
  "Do not force the result. Prepare the next step, then let timing do part of the work.": "不要强迫结果。准备好下一步，然后让时机完成一部分工作。"
};

const reverseZh = Object.fromEntries(Object.entries(zh).map(([en, cn]) => [cn, en]));
let currentLanguage = localStorage.getItem("moonbox-language") || "en";
let isOpening = false;
let currentKey = "starter";
let currentBox = boxes[currentKey];
let currentPull = currentBox.pulls[0];
let vaultItems = 3;
let lastStatus = "Ready to open";
let lastDailySign = null;
let hasDrawnToday = false;

const selectedName = document.getElementById("selectedName");
const selectedPrice = document.getElementById("selectedPrice");
const openingTitle = document.getElementById("openingTitle");
const openingStatus = document.getElementById("openingStatus");
const openButton = document.getElementById("openButton");
const resultCard = document.getElementById("resultCard");
const resultTier = document.getElementById("resultTier");
const resultMeta = document.getElementById("resultMeta");
const resultTitle = document.getElementById("resultTitle");
const resultDescription = document.getElementById("resultDescription");
const reelTrack = document.getElementById("reelTrack");
const vaultValue = document.getElementById("vaultValue");
const vaultHint = document.getElementById("vaultHint");
const vaultList = document.getElementById("vaultList");
const liveFeed = document.getElementById("liveFeed");
const languageToggle = document.getElementById("languageToggle");
const dailyDrawButton = document.getElementById("dailyDrawButton");
const dailyDate = document.getElementById("dailyDate");
const dailyTitle = document.getElementById("dailyTitle");
const signWindow = document.getElementById("signWindow");
const signSymbol = document.getElementById("signSymbol");
const signText = document.getElementById("signText");
const boxCards = document.querySelectorAll("[data-box-card]");
const selectButtons = document.querySelectorAll("[data-select-box]");
const vaultButtons = document.querySelectorAll("[data-vault-action]");
const currentTreasureValue = document.getElementById("currentTreasureValue");
const heroCurrentTreasure = document.getElementById("heroCurrentTreasure");
const lifetimeTreasureValue = document.getElementById("lifetimeTreasureValue");
const burstEnergyLeft = document.getElementById("burstEnergyLeft");
const heroBurstDistance = document.getElementById("heroBurstDistance");
const treasurePercent = document.getElementById("treasurePercent");
const treasureProgressBar = document.getElementById("treasureProgressBar");
const orbitSeen = document.getElementById("orbitSeen");
const treasureGain = document.getElementById("treasureGain");
const communityEligibility = document.getElementById("communityEligibility");

function t(text) {
  if (!text) return text;
  if (currentLanguage === "zh") return zh[text] || text;
  return reverseZh[text] || text;
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
    ? "MoonBox | 数字好运盲盒"
    : "MoonBox | Digital Fortune Boxes";
  const description = document.querySelector("meta[name='description']");
  if (description) {
    description.content = currentLanguage === "zh"
      ? "打开数字 MoonBox，获得好运卡、积分、券、升级票和礼物库式在线开盒体验。不可提现、无回购、无投资回报。"
      : "Open a digital MoonBox for a fortune card, credits, vouchers, gift upgrades, and a Vault-based online opening experience. No cash-out, no buyback, no investment returns.";
  }
  if (languageToggle) languageToggle.textContent = currentLanguage === "zh" ? "EN" : "中文";
}

function getTodayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

function formatToday() {
  const formatter = new Intl.DateTimeFormat(currentLanguage === "zh" ? "zh-CN" : "en-US", {
    month: "short",
    day: "numeric",
    weekday: "short"
  });
  return formatter.format(new Date());
}

function seededDailyIndex() {
  const key = getTodayKey();
  let sum = 0;
  for (let i = 0; i < key.length; i += 1) sum += key.charCodeAt(i) * (i + 3);
  return sum % dailySigns.length;
}

function renderDailySign(sign, drawn) {
  lastDailySign = sign;
  hasDrawnToday = Boolean(drawn);
  writeText(dailyDate, formatToday());
  writeText(dailyTitle, drawn ? sign.title : "Draw your sign");
  writeText(signSymbol, drawn ? sign.symbol : "Moon");
  writeText(signText, drawn ? sign.text : "Tap the card to reveal today's message.");
  writeText(dailyDrawButton, drawn ? "Draw Today's Luck" : "Draw Today's Luck");
}

function drawDailyLuck() {
  const sign = dailySigns[seededDailyIndex()];
  if (signWindow) {
    signWindow.animate([
      { opacity: 0.72, transform: "scale(0.98) rotate(-0.4deg)" },
      { opacity: 1, transform: "scale(1) rotate(0deg)" }
    ], { duration: 420, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "both" });
  }
  renderDailySign(sign, true);
}

function pickPull(box) {
  const roll = Math.random();
  if (roll > 0.94) return box.pulls[box.pulls.length - 1];
  if (roll > 0.72) return box.pulls[Math.min(2, box.pulls.length - 1)];
  if (roll > 0.36) return box.pulls[Math.min(1, box.pulls.length - 1)];
  return box.pulls[0];
}

function formatUsd(value) {
  return `$${value.toLocaleString("en-US")}`;
}

function renderMoonTreasure() {
  const percent = Math.min(99, Math.round((moonTreasure.energy / moonTreasure.burstTarget) * 100));
  const energyLeft = Math.max(0, moonTreasure.burstTarget - moonTreasure.energy);
  if (currentTreasureValue) currentTreasureValue.textContent = currentLanguage === "zh"
    ? `已准备 ${formatUsd(moonTreasure.baseCurrent)} 礼物价值`
    : `${formatUsd(moonTreasure.baseCurrent)} gift value prepared`;
  if (heroCurrentTreasure) heroCurrentTreasure.textContent = currentLanguage === "zh"
    ? `已准备 ${formatUsd(moonTreasure.baseCurrent)}`
    : `${formatUsd(moonTreasure.baseCurrent)} prepared`;
  if (lifetimeTreasureValue) lifetimeTreasureValue.textContent = formatUsd(moonTreasure.lifetime);
  if (burstEnergyLeft) burstEnergyLeft.textContent = currentLanguage === "zh"
    ? `还差 ${energyLeft} 能量`
    : `${energyLeft} energy away`;
  if (heroBurstDistance) heroBurstDistance.textContent = currentLanguage === "zh"
    ? `还差 ${energyLeft} 能量`
    : `${energyLeft} energy away`;
  if (treasurePercent) treasurePercent.textContent = `${percent}%`;
  if (treasureProgressBar) treasureProgressBar.style.width = `${percent}%`;
}

function renderOrbitResult(gain = moonTreasure.lastGain) {
  writeText(orbitSeen, moonTreasure.orbitSeen);
  if (treasureGain) treasureGain.textContent = currentLanguage === "zh" ? `+${gain} 祝福能量` : `+${gain} Blessing Energy`;
  writeText(communityEligibility, "Entered this cycle");
}

function addTreasureEnergy() {
  const gain = treasureGains[currentKey] || treasureGains.starter;
  moonTreasure.lastGain = gain;
  moonTreasure.energy = Math.min(moonTreasure.burstTarget - 1, moonTreasure.energy + gain);
  moonTreasure.baseCurrent += Math.round(gain * 2.35);
  moonTreasure.lifetime += Math.round(gain * 2.35);
  renderMoonTreasure();
  renderOrbitResult(gain);
}

function renderFeed() {
  if (!liveFeed) return;
  liveFeed.innerHTML = feedRows
    .map(([name, action, type]) => `<div><span>${name}</span><strong>${t(action)}</strong><em>${t(type)}</em></div>`)
    .join("");
}

function captureVaultRowData() {
  if (!vaultList) return;
  [...vaultList.children].forEach((row) => {
    if (!row.dataset.label) row.dataset.label = reverseZh[row.querySelector("span")?.textContent.trim()] || row.querySelector("span")?.textContent.trim() || "Saved";
    if (!row.dataset.title) row.dataset.title = reverseZh[row.querySelector("strong")?.textContent.trim()] || row.querySelector("strong")?.textContent.trim() || "Moon Calm Card";
    if (!row.dataset.type) row.dataset.type = reverseZh[row.querySelector("em")?.textContent.trim()] || row.querySelector("em")?.textContent.trim() || "Card";
  });
}

function renderVaultRows() {
  if (!vaultList) return;
  [...vaultList.children].forEach((row) => {
    const labelEl = row.querySelector("span");
    const titleEl = row.querySelector("strong");
    const typeEl = row.querySelector("em");
    if (labelEl && row.dataset.label) labelEl.textContent = t(row.dataset.label);
    if (titleEl && row.dataset.title) titleEl.textContent = t(row.dataset.title);
    if (typeEl && row.dataset.type) typeEl.textContent = t(row.dataset.type);
  });
}

function setSelectedBox(key) {
  const box = boxes[key];
  if (!box) return;
  currentKey = key;
  currentBox = box;
  currentPull = box.pulls[0];
  lastStatus = "Ready to open";

  boxCards.forEach((card) => card.classList.toggle("selected", card.dataset.boxCard === key));
  writeText(selectedName, box.name);
  if (selectedPrice) selectedPrice.textContent = box.price;
  writeText(openingTitle, box.name);
  writeText(openingStatus, lastStatus);
  writeText(openButton, `Open ${box.name}`);
  if (resultCard) resultCard.classList.add("hidden");
}

function updateVaultCount(item) {
  vaultItems += 1;
  if (vaultValue) vaultValue.textContent = currentLanguage === "zh" ? `已保存 ${vaultItems} 项` : `${vaultItems} saved items`;
  if (vaultHint) {
    const message = `${item.title} added to Vault. Use it inside MoonBox only; it is not cash, buyback, or investment value.`;
    vaultHint.textContent = currentLanguage === "zh"
      ? `${t(item.title)} 已加入礼物库。它仅限 MoonBox 内使用，不是现金、回购或投资价值。`
      : message;
  }
}

function addToVault(pull) {
  updateVaultCount(pull);
  if (!vaultList) return;
  const row = document.createElement("div");
  row.dataset.label = "New";
  row.dataset.title = pull.title;
  row.dataset.type = pull.type;
  row.innerHTML = `<span>${t("New")}</span><strong>${t(pull.title)}</strong><em>${t(pull.type)}</em>`;
  vaultList.prepend(row);
  while (vaultList.children.length > 5) vaultList.removeChild(vaultList.lastElementChild);
}

function renderPull(pull) {
  currentPull = pull;
  writeText(resultTier, pull.tier);
  writeText(resultMeta, pull.meta);
  writeText(resultTitle, pull.title);
  writeText(resultDescription, pull.desc);
  addTreasureEnergy();
  if (resultCard) resultCard.classList.remove("hidden");
  addToVault(pull);
}

function updateCurrentPullView() {
  renderMoonTreasure();
  renderOrbitResult(moonTreasure.lastGain);
  if (!currentPull || resultCard?.classList.contains("hidden")) return;
  writeText(resultTier, currentPull.tier);
  writeText(resultMeta, currentPull.meta);
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
    lastStatus = `${pull.tier} · added to Vault`;
    openingStatus.textContent = currentLanguage === "zh"
      ? `${t(pull.tier)} · ${t("added to Vault")}`
      : lastStatus;
    openButton.disabled = false;
    openButton.textContent = currentLanguage === "zh"
      ? `${t("Open another")} ${t(currentBox.name)}`
      : `Open another ${currentBox.name}`;
    isOpening = false;
  }, 850);
}

function handleVaultAction(event) {
  const action = event.currentTarget.dataset.vaultAction;
  const copy = {
    save: "Saved to Vault.",
    claim: "Claim details opened.",
    upgrade: "Upgrade path selected."
  };
  const detail = {
    save: `${currentPull.title} stays visible in Vault for future use inside MoonBox.`,
    claim: `${currentPull.title} claim details are shown with provider terms, regional limits, and no cash-out wording.`,
    upgrade: `${currentPull.title} can help a future opening path, but it never becomes cash or a buyback claim.`
  };
  const detailZh = {
    save: `${t(currentPull.title)} 会保留在礼物库中，供未来在 MoonBox 内使用。`,
    claim: `${t(currentPull.title)} 的领取细节会展示服务商条款、地区限制，并避免提现表述。`,
    upgrade: `${t(currentPull.title)} 可帮助未来开盒路径，但永远不会变成现金或回购凭证。`
  };
  if (vaultHint) {
    vaultHint.textContent = currentLanguage === "zh"
      ? `${t(copy[action] || "Saved to Vault.")} ${detailZh[action] || ""}`
      : `${copy[action] || "Saved to Vault."} ${detail[action] || ""}`;
  }
}

function revealOnScroll() {
  if (!window.IntersectionObserver) return;
  const targets = document.querySelectorAll(".box-card, .treasure-panel, .inside-grid article, .loop-grid article, .rules-grid article, .vault-list div, .live-feed div, .final-card, .ab-grid article, details");
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

function syncDynamicText() {
  updateDocumentLanguage();
  writeText(dailyDate, formatToday());
  if (lastDailySign && hasDrawnToday) renderDailySign(lastDailySign, true);
  writeText(selectedName, currentBox.name);
  if (selectedPrice) selectedPrice.textContent = currentBox.price;
  writeText(openingTitle, currentBox.name);
  if (!isOpening && openButton) {
    openButton.textContent = resultCard?.classList.contains("hidden")
      ? t(`Open ${currentBox.name}`)
      : (currentLanguage === "zh" ? `${t("Open another")} ${t(currentBox.name)}` : `Open another ${currentBox.name}`);
  }
  if (openingStatus) {
    if (lastStatus.includes("added to Vault")) {
      openingStatus.textContent = currentLanguage === "zh"
        ? `${t(currentPull.tier)} · ${t("added to Vault")}`
        : lastStatus;
    } else {
      writeText(openingStatus, lastStatus);
    }
  }
  updateCurrentPullView();
  renderFeed();
  renderVaultRows();
}

function syncLanguage() {
  translateStaticText();
  syncDynamicText();
}

selectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setSelectedBox(button.dataset.selectBox);
    document.getElementById("open")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

openButton?.addEventListener("click", openBox);
dailyDrawButton?.addEventListener("click", drawDailyLuck);
signWindow?.addEventListener("click", drawDailyLuck);
vaultButtons.forEach((button) => button.addEventListener("click", handleVaultAction));
languageToggle?.addEventListener("click", () => {
  currentLanguage = currentLanguage === "zh" ? "en" : "zh";
  localStorage.setItem("moonbox-language", currentLanguage);
  syncLanguage();
});

captureVaultRowData();
renderDailySign(dailySigns[seededDailyIndex()], false);
renderMoonTreasure();
renderOrbitResult();
renderFeed();
setSelectedBox("starter");
syncLanguage();
revealOnScroll();
