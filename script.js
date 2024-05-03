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

    if(diceRoll3 == 20){
        document.getElementById('crit').innerHTML = `You crit! Apply your status effect.`;
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

document.getElementById('multiAttack').addEventListener('change', function() {
    document.getElementById('secondAttack').style.display = this.checked ? 'block' : 'none';
});
