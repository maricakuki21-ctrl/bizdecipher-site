const boxThemes = {
  creator: {
    id: "creator",
    label: "AI Creator",
    title: "AI Creator Box",
    price: "$19.90",
    feedName: "AI Creator Box",
    sharePrefix: "I opened the AI Creator Box on BizDecipher MoonBox",
    drops: [
      {
        rarity: "Common Drop",
        title: "Creator Starter Kit",
        product: "Prompt pack + creator checklist + planning card",
        value: "$14",
        blessing: "Start with one repeatable workflow. Momentum beats a perfect idea.",
        action: "Claim the prompt pack and save the checklist to Vault."
      },
      {
        rarity: "Rare Drop",
        title: "Creator Tool Pack",
        product: "Notion workflow + short-video script pack + AI tool discount list",
        value: "$24",
        blessing: "Your edge is not one tool. It is the system you build around it.",
        action: "Claim templates now or upgrade toward a Founder Signal Pack."
      },
      {
        rarity: "Epic Drop",
        title: "Premium Creator Bundle",
        product: "$25 site credit + premium template bundle + launch checklist",
        value: "$39",
        blessing: "The market rewards people who ship small offers before they overthink.",
        action: "Use site credit for another box or save the bundle to Vault."
      },
      {
        rarity: "Legendary Drop",
        title: "Founder Signal Pack",
        product: "Founder opportunity report + private resource bundle + limited badge",
        value: "$99",
        blessing: "A good signal feels obvious only after someone else makes money from it.",
        action: "Save the report and unlock the Founder badge in Vault."
      }
    ]
  },
  side: {
    id: "side",
    label: "Side Hustle",
    title: "Side Hustle Box",
    price: "$19.90",
    feedName: "Side Hustle Box",
    sharePrefix: "I opened the Side Hustle Box on BizDecipher MoonBox",
    drops: [
      {
        rarity: "Common Drop",
        title: "Starter Hustle Card",
        product: "One side-hustle idea + execution checklist + outreach prompt",
        value: "$16",
        blessing: "Do not chase every opportunity. Pick one tiny cash loop and finish it.",
        action: "Claim the checklist and save the outreach script."
      },
      {
        rarity: "Rare Drop",
        title: "Channel Playbook",
        product: "Niche channel list + sourcing prompt + cold-start content plan",
        value: "$29",
        blessing: "Demand hides inside repeated complaints. Follow the complaint trail.",
        action: "Save the playbook or upgrade into a Founder Signal Pack."
      },
      {
        rarity: "Epic Drop",
        title: "Micro Offer Builder",
        product: "$25 site credit + offer copy kit + pricing worksheet",
        value: "$45",
        blessing: "A small paid offer teaches more than ten free brainstorms.",
        action: "Claim the worksheet and use credit for your next box."
      }
    ]
  },
  founder: {
    id: "founder",
    label: "Founder Signal",
    title: "Founder Signal Box",
    price: "$29.90",
    feedName: "Founder Signal Box",
    sharePrefix: "I opened the Founder Signal Box on BizDecipher MoonBox",
    drops: [
      {
        rarity: "Rare Drop",
        title: "Market Signal Note",
        product: "Trend note + target user map + tool stack recommendation",
        value: "$34",
        blessing: "The best founder signals are boring before they become crowded.",
        action: "Save the signal note and claim the tool stack."
      },
      {
        rarity: "Epic Drop",
        title: "Opportunity Teardown",
        product: "Business model teardown + landing-page angle + pricing hypothesis",
        value: "$69",
        blessing: "A market is clearer when you can name who pays and why now.",
        action: "Claim the teardown or upgrade toward a Legendary bundle."
      },
      {
        rarity: "Legendary Drop",
        title: "Founder Opportunity Bundle",
        product: "Founder report + 1-on-1 teardown coupon + limited member badge",
        value: "$149",
        blessing: "When the signal is strong, speed becomes a feature.",
        action: "Save the bundle and unlock the Founder badge in Vault."
      }
    ]
  },
  desk: {
    id: "desk",
    label: "Desk Setup",
    title: "Desk Setup Box",
    price: "$14.90",
    feedName: "Desk Setup Box",
    sharePrefix: "I opened the Desk Setup Box on BizDecipher MoonBox",
    drops: [
      {
        rarity: "Common Drop",
        title: "Desk Reset Kit",
        product: "Cable organizer + focus wallpaper + productivity card",
        value: "$12",
        blessing: "Clear the surface, then clear the decision.",
        action: "Claim the wallpaper and save the desk card."
      },
      {
        rarity: "Rare Physical",
        title: "Creator Desk Pack",
        product: "Keyboard cleaning kit + sticker pack + creator template",
        value: "$22",
        blessing: "Better tools do not create discipline, but they remove friction.",
        action: "Save the item to Vault for future shipping or upgrade."
      },
      {
        rarity: "Epic Drop",
        title: "Desk Setup Bundle",
        product: "Desk accessory bundle + $15 site credit + template pack",
        value: "$36",
        blessing: "Your workspace should make the next useful action obvious.",
        action: "Use site credit or save the physical bundle in Vault."
      }
    ]
  }
};

const liveDropRows = [
  ["LunaMint", "opened AI Creator Box"],
  ["NovaRay", "hit Founder Signal Pack"],
  ["BoxKing", "claimed $25 site credit"],
  ["QuietWolf", "upgraded Creator Tool Pack"],
  ["Mika", "saved Desk Reset Kit to Vault"],
  ["SignalFox", "pulled Market Signal Note"]
];

const openButton = document.getElementById("openBoxButton");
const mysteryBox = document.getElementById("mysteryBox");
const resultCard = document.getElementById("resultCard");
const rarityTag = document.getElementById("rarityTag");
const luckScore = document.getElementById("luckScore");
const blessingTitle = document.getElementById("blessingTitle");
const blessingText = document.getElementById("blessingText");
const dropName = document.getElementById("dropName");
const blessingLine = document.getElementById("blessingLine");
const drawStatus = document.getElementById("drawStatus");
const copyShareButton = document.getElementById("copyShareButton");
const feedList = document.getElementById("feedList");
const vaultMini = document.getElementById("vaultMini");
const vaultFeedback = document.getElementById("vaultFeedback");
const selectedBoxLabel = document.getElementById("selectedBoxLabel");
const selectedBoxPrice = document.getElementById("selectedBoxPrice");
const selectBoxButtons = document.querySelectorAll("[data-select-box]");
const themeCards = document.querySelectorAll("[data-theme-card]");
const vaultActionButtons = document.querySelectorAll("[data-vault-action]");

let currentTheme = boxThemes.creator;
let currentDrop = currentTheme.drops[1];

function pickDrop(theme) {
  const drops = theme.drops;
  const chance = Math.random();
  if (chance > 0.965) return drops[drops.length - 1];
  if (chance > 0.78) return drops[Math.min(2, drops.length - 1)];
  if (chance > 0.38) return drops[Math.min(1, drops.length - 1)];
  return drops[0];
}

function setActiveTheme(themeId) {
  themeCards.forEach((card) => {
    card.classList.toggle("selected", card.dataset.themeCard === themeId);
  });
}

function renderSelectedTheme(theme) {
  currentTheme = theme;
  setActiveTheme(theme.id);
  if (selectedBoxLabel) selectedBoxLabel.textContent = theme.label;
  if (selectedBoxPrice) selectedBoxPrice.textContent = theme.price;
  if (openButton) openButton.textContent = `Open ${theme.label} Box Demo`;
  if (drawStatus) drawStatus.textContent = `Ready: ${theme.title} selected`;
  if (vaultMini) {
    const strong = vaultMini.querySelector("strong");
    if (strong) strong.textContent = `${theme.title} drop ready for Claim / Save / Upgrade`;
  }
}

function renderDrop(drop) {
  if (!drop || !rarityTag || !luckScore || !blessingTitle || !blessingText || !dropName || !blessingLine) return;
  currentDrop = drop;
  rarityTag.textContent = drop.rarity;
  luckScore.textContent = `Value ${drop.value}`;
  blessingTitle.textContent = drop.title;
  blessingText.textContent = drop.product;
  dropName.textContent = drop.product;
  blessingLine.textContent = drop.blessing;
  if (vaultMini) {
    const strong = vaultMini.querySelector("strong");
    if (strong) strong.textContent = `${drop.title}: ${drop.action}`;
  }
}

function openBox() {
  if (!openButton || !mysteryBox || !resultCard || !drawStatus) return;
  openButton.disabled = true;
  openButton.textContent = "Opening MoonBox...";
  drawStatus.textContent = `${currentTheme.title} payment accepted in demo · revealing drop`;
  mysteryBox.classList.add("opening");
  resultCard.classList.add("hidden");

  window.setTimeout(() => {
    const drop = pickDrop(currentTheme);
    renderDrop(drop);
    resultCard.classList.remove("hidden");
    mysteryBox.classList.remove("opening");
    drawStatus.textContent = `${drop.rarity} revealed · ${drop.title} entered Vault`;
    openButton.disabled = false;
    openButton.textContent = `Open Another ${currentTheme.label} Box`;
    if (vaultFeedback) {
      vaultFeedback.textContent = `${drop.title} entered Vault. Choose Claim, Save, or Upgrade to continue the commercial loop.`;
    }
  }, 760);
}

function selectTheme(themeId) {
  const theme = boxThemes[themeId];
  if (!theme) return;
  renderSelectedTheme(theme);
  if (resultCard) resultCard.classList.add("hidden");
  document.getElementById("open")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

async function copyShareText() {
  if (!copyShareButton) return;
  const text = `${currentTheme.sharePrefix} and got ${currentDrop.title}. Drop value: ${currentDrop.value}. ${currentDrop.blessing}`;
  try {
    await navigator.clipboard.writeText(text);
    copyShareButton.textContent = "Copied";
  } catch (error) {
    copyShareButton.textContent = "Copy fallback ready";
  }
  window.setTimeout(() => {
    copyShareButton.textContent = "Copy share text";
  }, 1300);
}

function renderFeed() {
  if (!feedList) return;
  feedList.innerHTML = liveDropRows.map(([name, action]) => `<div><span>${name}</span><strong>${action}</strong></div>`).join("");
}

function handleVaultAction(event) {
  if (!vaultFeedback) return;
  const action = event.currentTarget.dataset.vaultAction;
  const messages = {
    claim: `${currentDrop.title}: Claim selected. Digital resources can be delivered immediately by email, dashboard, or Telegram bot.`,
    save: `${currentDrop.title}: Saved to Vault. The user keeps inventory and can return later.`,
    upgrade: `${currentDrop.title}: Upgrade selected. The drop becomes entry value toward a higher-tier resource bundle.`
  };
  vaultFeedback.textContent = messages[action] || "Vault action selected.";
}

function revealOnScroll() {
  const targets = document.querySelectorAll(".bento-card, .product-lanes article, .loop-map article, .vault-actions button, .princess-ticket, .rules-grid p, .leaderboard-list div");
  if (!window.IntersectionObserver) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.animate([
          { opacity: 0, transform: "translateY(18px)" },
          { opacity: 1, transform: "translateY(0)" }
        ], { duration: 520, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "both" });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  targets.forEach((target) => observer.observe(target));
}

openButton?.addEventListener("click", openBox);
copyShareButton?.addEventListener("click", copyShareText);
selectBoxButtons.forEach((button) => button.addEventListener("click", () => selectTheme(button.dataset.selectBox)));
vaultActionButtons.forEach((button) => button.addEventListener("click", handleVaultAction));
renderFeed();
renderSelectedTheme(currentTheme);
revealOnScroll();
