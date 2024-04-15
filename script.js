function calculateDamage() {
    const baseDamage = parseInt(document.getElementById('baseDamage').value) || 0;
    const strModifier = parseInt(document.getElementById('strModifier').value) || 0;
    const diceRoll = parseInt(document.getElementById('diceRoll').value) || 1;
    let intModifier = 0;
    let diceRoll2 = 0;
    let diceRoll3 = 0;

    let physDamage = Math.ceil(baseDamage + strModifier * getModifierFromRoll(diceRoll));
    let magDamage = 0;

    if (document.getElementById('multiAttack').checked) {
        intModifier = parseInt(document.getElementById('intModifier').value) || 0;
        diceRoll2 = parseInt(document.getElementById('diceRoll2').value) || 0;
        diceRoll3 = parseInt(document.getElementById('diceRoll3').value) || 0;

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

document.getElementById('multiAttack').addEventListener('change', function() {
    document.getElementById('secondAttack').style.display = this.checked ? 'block' : 'none';
});
