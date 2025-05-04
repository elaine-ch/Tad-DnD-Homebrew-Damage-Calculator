const toggleSwitch = document.querySelector('#toggle input[type="checkbox"]');

function updateDarkMode() {
    const html = document.documentElement;
    if (document.getElementById('color-scheme-dark').checked) {
        html.setAttribute('data-darkmode', '1');
    } else if (document.getElementById('color-scheme-light').checked) {
        html.setAttribute('data-darkmode', '0');
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        html.setAttribute('data-darkmode', prefersDark ? '1' : '0');
    }
}

document.querySelectorAll('input[name="color-scheme"]').forEach(input =>
    input.addEventListener('change', updateDarkMode)
);

window.addEventListener('DOMContentLoaded', updateDarkMode);

function calculateDamage() {
    const baseDamage = parseFloat(document.getElementById('baseDamage').value) || 0;
    const strModifier = parseFloat(document.getElementById('strModifier').value) || 0;
    const diceRoll = parseFloat(document.getElementById('diceRoll').value) || 1;

    let intModifier = 0;
    let diceRoll2 = 0;
    let diceRoll3 = 0;

    if(!checkInputValidity(diceRoll)){
        document.getElementById('result').innerHTML = `Invalid dice roll input.`;
        document.getElementById('crit').innerHTML = ``;
        return;
    }

    let physDamage = Math.ceil(baseDamage + strModifier * getModifierFromRoll(diceRoll));
    let magDamage = 0;

    if (document.getElementById('multiAttack').checked) {
        intModifier = parseFloat(document.getElementById('intModifier').value) || 0;
        diceRoll2 = parseFloat(document.getElementById('diceRoll2').value) || 0;
        diceRoll3 = parseFloat(document.getElementById('diceRoll3').value) || 0;

        if(!checkInputValidity(diceRoll2) || !checkInputValidity(diceRoll3)){
            document.getElementById('result').innerHTML = `Invalid dice roll input.`;
            document.getElementById('crit').innerHTML = ``;
            return;
        }

        magDamage = Math.ceil((intModifier/2) * getModifierFromRoll(diceRoll2));
    }

    document.getElementById('result').innerHTML = `Total Damage: ${physDamage} physical and ${magDamage} magic damage`;
    document.getElementById('crit').innerHTML = `No status effect applied.`;

    let jsConfetti = new JSConfetti();

    if(diceRoll3 == 20){
        document.getElementById('crit').innerHTML = `You crit! Apply your status effect.`;
        jsConfetti.addConfetti({
            confettiColors: [
                '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
              ],
        })
    }

}

function getModifierFromRoll(roll){
    //index 0 is 0 because rolls start from 1
    const rollModifiers = [0, 0.375, 0.5, 0.66, 0.75, 0.8, 1, 1.25, 1.33, 1.5, 2, 2.66];
    if(roll >= 6 && roll <= 15){
        return 1;
    }
    if (roll > 15){
        roll = roll-9;
    }
    return rollModifiers[roll];
}

function checkInputValidity(roll){
    if (roll < 0 || roll > 20 || !Number.isInteger(roll)){
        return false;
    }
    return true;
}

function toggleAttack() {
    if (toggleSwitch.checked) {
        document.getElementById('physical').innerHTML = `Physical Attack`;
        document.getElementById('magical').innerHTML = '<strong>' + `Magical Attack` + '</strong>';
        document.getElementById('baseLabel').innerHTML = `Spell Base Damage:`;
        document.getElementById('modLabel').innerHTML = `Int/Wis Stat:`;
        document.getElementById('rollLabel').innerHTML = `D20 Roll:`;
        document.getElementById('infusedCheck').style.visibility = 'hidden';
        document.getElementById('secondAttack').style.display = 'none';
        document.getElementById('multiAttack').checked = false;
    } else {
        document.getElementById('physical').innerHTML = '<strong>' + `Physical Attack` + '</strong>';
        document.getElementById('magical').innerHTML = `Magical Attack`;
        document.getElementById('baseLabel').innerHTML = `Weapon Base Damage:`;
        document.getElementById('modLabel').innerHTML = `Str/Dex Stat:`;
        document.getElementById('rollLabel').innerHTML = `D20 Roll:`;
        document.getElementById('infusedCheck').style.visibility = 'visible';
        document.getElementById('multiAttack').checked = false;
    }
}

toggleAttack();

document.getElementById('multiAttack').addEventListener('change', function() {
    document.getElementById('secondAttack').style.display = this.checked ? 'block' : 'none';
});

toggleSwitch.addEventListener('change', toggleAttack);
