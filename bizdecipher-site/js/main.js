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
const boxCards = document.querySelectorAll("[data-box-card]");
const selectButtons = document.querySelectorAll("[data-select-box]");
const vaultButtons = document.querySelectorAll("[data-vault-action]");

let currentBox = boxes.creator;
let currentKey = "creator";
let currentPull = currentBox.pulls[1];
let totalVault = 24;

function valueNumber(value) {
  return Number(String(value).replace(/[^0-9.]/g, "")) || 0;
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
    .map(([name, action, value]) => `<div><span>${name}</span><strong>${action}</strong><em>${value}</em></div>`)
    .join("");
}

function setSelectedBox(key) {
  const box = boxes[key];
  if (!box) return;
  currentKey = key;
  currentBox = box;
  currentPull = box.pulls[Math.min(1, box.pulls.length - 1)];

  boxCards.forEach((card) => card.classList.toggle("selected", card.dataset.boxCard === key));
  if (selectedName) selectedName.textContent = box.name;
  if (selectedPrice) selectedPrice.textContent = box.price;
  if (openingTitle) openingTitle.textContent = box.name;
  if (openingStatus) openingStatus.textContent = "Ready to open";
  if (openButton) openButton.textContent = `Open ${box.short} Box`;
  if (boxesLeft) boxesLeft.textContent = String(box.left);
  if (resultCard) resultCard.classList.add("hidden");
}

function addToVault(pull) {
  totalVault += valueNumber(pull.value);
  if (vaultValue) vaultValue.textContent = `$${totalVault}`;
  if (vaultHint) vaultHint.textContent = `${pull.title} added. Claim it, save it, or use it as upgrade fuel.`;
  if (!vaultList) return;
  const row = document.createElement("div");
  row.innerHTML = `<span>New</span><strong>${pull.title}</strong><em>${pull.value}</em>`;
  vaultList.prepend(row);
  while (vaultList.children.length > 5) vaultList.removeChild(vaultList.lastElementChild);
}

function renderPull(pull) {
  currentPull = pull;
  if (resultTier) resultTier.textContent = pull.tier;
  if (resultValue) resultValue.textContent = `${pull.value} value`;
  if (resultTitle) resultTitle.textContent = pull.title;
  if (resultDescription) resultDescription.textContent = pull.desc;
  if (resultCard) resultCard.classList.remove("hidden");
  addToVault(pull);
}

function openBox() {
  if (!openButton || !openingStatus || !reelTrack) return;
  openButton.disabled = true;
  openButton.textContent = "Revealing...";
  openingStatus.textContent = "Box opened · spinning reward";
  if (resultCard) resultCard.classList.add("hidden");
  reelTrack.classList.remove("spinning");
  void reelTrack.offsetWidth;
  reelTrack.classList.add("spinning");

  window.setTimeout(() => {
    const pull = pickPull(currentBox);
    renderPull(pull);
    currentBox.left = Math.max(0, currentBox.left - 1);
    if (boxesLeft) boxesLeft.textContent = String(currentBox.left);
    openingStatus.textContent = `${pull.tier} revealed · added to Vault`;
    openButton.disabled = false;
    openButton.textContent = `Open another ${currentBox.short} Box`;
  }, 850);
}

function handleVaultAction(event) {
  const action = event.currentTarget.dataset.vaultAction;
  const copy = {
    claim: `${currentPull.title} is ready to claim. The user gets the useful file, coupon, report, or physical reward path immediately.`,
    save: `${currentPull.title} stays in Vault. Ownership makes the collection feel real and keeps the user coming back.`,
    upgrade: `${currentPull.title} becomes upgrade fuel. Small wins can push the user toward a higher-status bundle.`
  };
  if (vaultHint) vaultHint.textContent = copy[action] || "Vault action selected.";
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

selectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setSelectedBox(button.dataset.selectBox);
    document.getElementById("open")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
openButton?.addEventListener("click", openBox);
vaultButtons.forEach((button) => button.addEventListener("click", handleVaultAction));
renderFeed();
setSelectedBox("creator");
revealOnScroll();
