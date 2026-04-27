const toggleSwitch = document.querySelector('#toggle input[type="checkbox"]');
const jsConfetti = new JSConfetti();
const result = document.getElementById('result');
const crit = document.getElementById('crit');
const attackCalculator = document.getElementById('attackCalculator');
const defenseCalculator = document.getElementById('defenseCalculator');

let phys = true;
let lastAttackDamage = null;

function updateDarkMode() {
    const html = document.documentElement;

    if (document.getElementById('dark').checked) {
        html.setAttribute('data-darkmode', '1');
    } else if (document.getElementById('light').checked) {
        html.setAttribute('data-darkmode', '0');
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        html.setAttribute('data-darkmode', prefersDark ? '1' : '0');
    }
}

function clearOutput() {
    result.textContent = '';
    crit.textContent = '';
}

function setOutput(message, status = '') {
    result.textContent = message;
    crit.textContent = status;
}

function formatValue(value) {
    return Number.isInteger(value) ? value : parseFloat(value.toFixed(2));
}

function calculateDamage() {
    const baseDamage = parseFloat(document.getElementById('baseDamage').value) || 0;
    const strModifier = parseFloat(document.getElementById('strModifier').value) || 0;
    const diceRoll = parseFloat(document.getElementById('diceRoll').value) || 1;

    let mult = 1;
    if (document.getElementById('multCheck').checked) {
        mult = parseFloat(document.getElementById('multModifier').value) || 1;
    }

    let intModifier = 0;
    let diceRoll2 = 0;
    let diceRoll3 = 0;

    if (!checkInputValidity(diceRoll)) {
        setOutput('Invalid dice roll input.');
        return;
    }

    const physDamage = Math.ceil((baseDamage + strModifier * getModifierFromRoll(diceRoll)) * mult);
    let magDamage = 0;

    if (document.getElementById('multiAttack').checked) {
        intModifier = parseFloat(document.getElementById('intModifier').value) || 0;
        diceRoll2 = parseFloat(document.getElementById('diceRoll2').value) || 0;
        diceRoll3 = parseFloat(document.getElementById('diceRoll3').value) || 0;

        if (!checkInputValidity(diceRoll2) || !checkInputValidity(diceRoll3)) {
            setOutput('Invalid dice roll input.');
            return;
        }

        magDamage = Math.ceil((intModifier / 2) * getModifierFromRoll(diceRoll2) * mult);
    }

    if (phys) {
        setOutput(`Total Damage: ${physDamage} physical and ${magDamage} magic damage`, 'No status effect applied.');
        lastAttackDamage = {
            physical: physDamage,
            magic: magDamage
        };
    } else {
        setOutput(`Total Damage: ${physDamage} magic damage`);
        lastAttackDamage = {
            physical: '',
            magic: physDamage
        };
    }

    if (diceRoll3 === 20) {
        crit.textContent = 'You crit! Apply your status effect.';
        jsConfetti.addConfetti({
            emojis: ['\u{1F308}', '\u26A1', '\u{1F4A5}', '\u2728', '\u{1F4AB}', '\u{1F338}'],
            emojiSize: 50,
            confettiSpeed: 50
        });
    }
}

function calculateDefense() {
    const physicalDamage = parseFloat(document.getElementById('defensePhysicalDamage').value) || 0;
    const magicDamage = parseFloat(document.getElementById('defenseMagicDamage').value) || 0;
    const physicalDefense = parseFloat(document.getElementById('physicalDefense').value) || 0;
    const magicDefense = parseFloat(document.getElementById('magicDefense').value) || 0;

    let physDamage = physicalDamage - physicalDefense / 2;
    let magDamage = magicDamage - magicDefense / 4;

    const finalPhysicalDamage = physDamage < 0 ? 0 : physDamage;
    const finalMagicDamage = magDamage < 0 ? 0 : magDamage;

    setOutput(
        `Final Damage: ${formatValue(finalPhysicalDamage)} physical and ${formatValue(finalMagicDamage)} magic damage`
    );
}

function getModifierFromRoll(roll) {
    // index 0 is 0 because rolls start from 1
    const rollModifiers = [0, 0.375, 0.5, 0.66, 0.75, 0.8, 1, 1.25, 1.33, 1.5, 2, 2.66];

    if (roll >= 6 && roll <= 15) {
        return 1;
    }

    if (roll > 15) {
        roll -= 9;
    }

    return rollModifiers[roll];
}

function checkInputValidity(roll) {
    return !(roll < 0 || roll > 20 || !Number.isInteger(roll));
}

function toggleAttack() {
    document.getElementById('multiAttack').checked = false;
    document.getElementById('multCheck').checked = false;
    document.getElementById('mult').style.display = 'none';
    document.getElementById('secondAttack').style.display = 'none';

    clearOutput();

    if (toggleSwitch.checked) {
        document.getElementById('physical').innerHTML = 'Physical Attack';
        document.getElementById('magical').innerHTML = '<strong>Magical Attack</strong>';
        document.getElementById('baseLabel').textContent = 'Spell Base Damage:';
        document.getElementById('modLabel').textContent = 'Int/Wis Stat:';
        document.getElementById('rollLabel').textContent = 'D20 Roll:';
        document.getElementById('infusedCheck').style.visibility = 'hidden';
        phys = false;
    } else {
        document.getElementById('physical').innerHTML = '<strong>Physical Attack</strong>';
        document.getElementById('magical').innerHTML = 'Magical Attack';
        document.getElementById('baseLabel').textContent = 'Weapon Base Damage:';
        document.getElementById('modLabel').textContent = 'Str/Dex Stat:';
        document.getElementById('rollLabel').textContent = 'D20 Roll:';
        document.getElementById('infusedCheck').style.visibility = 'visible';
        phys = true;
    }
}

function showDefenseCalculator() {
    attackCalculator.style.display = 'none';
    defenseCalculator.style.display = 'block';
    clearOutput();

    if (lastAttackDamage) {
        document.getElementById('defensePhysicalDamage').value = lastAttackDamage.physical;
        document.getElementById('defenseMagicDamage').value = lastAttackDamage.magic;
    }
}

function showAttackCalculator() {
    defenseCalculator.style.display = 'none';
    attackCalculator.style.display = 'block';
    clearOutput();
}

document.querySelectorAll('input[name="colorScheme"]').forEach(input =>
    input.addEventListener('change', updateDarkMode)
);

document.getElementById('multiAttack').addEventListener('change', function() {
    document.getElementById('secondAttack').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('multCheck').addEventListener('change', function() {
    document.getElementById('mult').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('attackSubmit').addEventListener('click', calculateDamage);
document.getElementById('defenseSubmit').addEventListener('click', calculateDefense);
document.getElementById('showDefense').addEventListener('click', showDefenseCalculator);
document.getElementById('showAttack').addEventListener('click', showAttackCalculator);
toggleSwitch.addEventListener('change', toggleAttack);
window.addEventListener('DOMContentLoaded', updateDarkMode);

toggleAttack();
