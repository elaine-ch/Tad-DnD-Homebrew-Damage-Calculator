// Menu option names for defined actions.
// Keys are 'Op' + (place-code * TM_MULT) + option-index. First 4 option-indexes are the real modifier-key codes (e.g. TM_ALT).
// NB: Names may have spaces in, and may not be unique. Hence, option names are the values and not the keys.
const tm_box = { Op101:'Show person details',Op102:'Dismiss person details' };
const tm_image = { Op201:'Show person details',Op202:'Dismiss person details' };
const tm_circle = { Op301:'Show family details',Op302:'Dismiss family details' };
const tm_tr = {  };
const tm_tl = {  };
const tm_br = {  };
const tm_bl = {  };
// Actions for all place-codes, indexed by TM_BOX, etc.
const tm_optIndex = [null, tm_box, tm_image, tm_circle, tm_tr, tm_tl, tm_br, tm_bl];

if (typeof tm_index !== 'undefined') { tm_index['actions'] = tm_actions; tm_index['optIndex'] = tm_optIndex; }

function tm_actions (ev,code,type,inst,key) {
// Perform the actions for the given click-code and context

    if (!verifyContext (ev,code,type)) { ev.preventDefault(); return; }

    switch (code) {
    case TM_CLICK + (TM_MULT * TM_BOX):
        ip_showDiv(ev,type,inst,key);
        break;
    case TM_CTRL + (TM_MULT * TM_BOX):
        ip_resetDivs(ev,type,inst,key);
        break;

    case TM_CLICK + (TM_MULT * TM_IMAGE):
        ip_showDiv(ev,type,inst,key);
        break;
    case TM_CTRL + (TM_MULT * TM_IMAGE):
        ip_resetDivs(ev,type,inst,key);
        break;

    case TM_CLICK + (TM_MULT * TM_CIRCLE):
        ip_showDiv(ev,type,inst,key);
        break;
    case TM_CTRL + (TM_MULT * TM_CIRCLE):
        ip_resetDivs(ev,type,inst,key);
        break;





    default:
        break;
    }
    ev.preventDefault();
}

function clickHandler(ev,type,inst,key) {
// ev=event object, type=P/F, inst=optional instance ID, key=person or family key name
    ev = ev || window.event;
    if (type == 'P') {
    // For a person-box, the nodeName should be 'use', but on some systems, ev.target for a <use>
    // points to an instance of SVGElementInstance, which does not have a nodeName property
    if (ev !== null && ev.target.nodeName == 'image') {
            tm_handler (ev,type,inst,key,TM_IMAGE); return;
        }
    }
    tm_handler (ev,type,inst,key,(type=='P') ? TM_BOX : TM_CIRCLE);
}

function clickHandlerTR(ev,type,inst,key) {
    ev = ev || window.event;
    tm_handler (ev,type,inst,key,TM_TR);
}

function clickHandlerTL(ev,type,inst,key) {
    ev = ev || window.event;
    tm_handler (ev,type,inst,key,TM_TL);
}

function clickHandlerBR(ev,type,inst,key) {
    ev = ev || window.event;
    tm_handler (ev,type,inst,key,TM_BR);
}

function clickHandlerBL(ev,type,inst,key) {
    ev = ev || window.event;
    tm_handler (ev,type,inst,key,TM_BL);
}

var nd_colours = ['pink','lightblue','lightgray','lightgray','dimgray','green','white','gray','white','240'];
var nd_dims = [0.60,80.00,80.00,50.00,50.00,12.00,12.00,1.50,1.50,4.00,2975.00,570.00,2810.00,470.00,0.00,0.00];
var nd_config = [6.5,true,false,0,false,0.60];
var nd_persons = {'greatgrandfather':0, 'greatgrandmother':1, 'grandfather':2, 'greataunt':3, 'greatuncle':4, 'greatuncle_two':5, 'greataunt_two':6
, 'grandfather_spouse':7, 'greataunt_spouse':8, 'greatuncle_spouse':9, 'greatuncle_two_spouse':10, 'greataunt_two_spouse':11, 'mother':12, 'father':13
, 'firstcousin_one':14, 'firstcousin_spouse':15, 'firstcousin_two':16, 'firstcousin_two_spouse':17, 'firstcousin_three':18
, 'firstcousin_three_spouse':19, 'firstcousin_four':20, 'firstcousin_five':21, 'firstcousin_six':22, 'firstcousin_six_spouse':23
, 'firstcousin_seven':24, 'firstcousin_seven_spouse':25, 'firstcousin_eight':26, 'firstcousin_eight_spouse':27, 'firstcousin_nine':28
, 'firstcousin_nine_spouse':29, 'firstcousin_ten':30, 'firstcousin_eleven':31, 'me':32, 'sister':33, 'secondcousin':34, 'secondcousin_spouse':35
, 'secondcousin_two':36, 'secondcousin_two_spouse':37, 'secondcousin_three':38, 'secondcousin_three_spouse':39, 'secondcousin_four':40
, 'secondcousin_four_spouse':41, 'secondcousin_five':42, 'secondcousin_six':43, 'secondcousin_seven':44, 'secondcousin_eight':45
, 'secondcousin_nine':46, 'secondcousin_ten':47};
var nd_families = {'greatgrandfather_greatgrandmother':0, 'grandfather_grandfather_spouse':1, 'greataunt_greataunt_spouse':2
, 'greatuncle_greatuncle_spouse':3, 'greatuncle_two_greatuncle_two_spouse':4, 'greataunt_two_greataunt_two_spouse':5, 'mother_father':6
, 'firstcousin_one_firstcousin_spouse':7, 'firstcousin_two_firstcousin_two_spouse':8, 'firstcousin_three_firstcousin_three_spouse':9
, 'firstcousin_six_firstcousin_six_spouse':10, 'firstcousin_seven_firstcousin_seven_spouse':11, 'firstcousin_eight_firstcousin_eight_spouse':12
, 'firstcousin_nine_firstcousin_nine_spouse':13, 'secondcousin_secondcousin_spouse':14, 'secondcousin_two_secondcousin_two_spouse':15
, 'secondcousin_three_secondcousin_three_spouse':16, 'secondcousin_four_secondcousin_four_spouse':17};
var nd_sex = [1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1
, 1, 0];
var nd_parentFam = [-1, -1, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, 1, -1, 2, -1, 2, -1, 2, -1, 3, 3, 4, -1, 4, -1, 4, -1, 4, -1, 5, 5, 6, 6, 7, -1, 7, -1
, 8, -1, 9, -1, 10, 11, 11, 12, 13, 13];
var nd_spouseFam = [[0], [0], [1], [2], [3], [4], [5], [1], [2], [3], [4], [5], [6], [6], [7], [7], [8], [8], [9], [9], [], [], [10], [10], [11], [11]
, [12], [12], [13], [13], [], [], [], [], [14], [14], [15], [15], [16], [16], [17], [17], [], [], [], [], [], []];
var nd_famParents = [[0,1], [2,7], [8,3], [4,9], [5,10], [11,6], [13,12], [15,14], [16,17], [18,19], [22,23], [25,24], [27,26], [28,29], [34,35], 
[37,36], [39,38], [40,41]];
var nd_famChildren = [[2,3,4,5,6], [12], [14,16,18], [20,21], [22,24,26,28], [30,31], [32,33], [34,36], [38], [40], [42], [43,44], [45], [46,47], [], 
[], [], []];
var nd_personalNames = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
if (typeof nd_index !== 'undefined') { nd_index[""] = {title:'TreeRichelieuAyers', persons:nd_persons, families:nd_families, sex:nd_sex, 
personalNames:nd_personalNames, parentFam:nd_parentFam, spouseFam:nd_spouseFam, famParents:nd_famParents, famChildren:nd_famChildren, 
colours:nd_colours, dims:nd_dims, config:nd_config }; }

const familyData = new Map([['griffon', 'griffon'], ['antoine', 'griffon'],['pallas', 'griffon'], ['calliope', 'calliope'], ['douglas', 'douglas'], 
    ['bacardi', 'douglas'], ['kratos', 'douglas'], ['brittany', 'brittany'], ['everclear', 'brittany'], ['nike', 'brittany'], ['picard', 'picard'], 
    ['polmos', 'picard'], ['aspyrtus', 'picard'], ['beverly', 'beverly'], ['bernard', 'bernard'], ['absinthe', 'bernard'], ['orpheus', 'bernard'], 
    ['perth', 'perth'], ['videl', 'videl'], ['elaine', 'elaine'], ['poitin', 'poitin'], ['bia', 'bia'], ['dewey', 'dewey'], ['cecily', 'cecily'], 
    ['aurelia', 'cecily'], ['marguerite', 'cecily'], ['andres', 'andres'], ['natalie', 'natalie'], ['antoinette', 'natalie'], ['ecclesia', 'natalie'], 
    ['elijah', 'elijah'], ['alexander', 'alexander'], ['maximilien', 'alexander'], ['graham', 'alexander'], ['aria', 'aria'], ['mathias', 'mathias'], 
    ['lafayette', 'mathias'], ['vladimir', 'mathias'], ['elisa', 'elisa'], ['jean', 'jean'], ['hubert', 'jean'], ['lazarus', 'jean'], ['lucretia', 'lucretia'], 
    ['clarisse', 'lucretia'], ['bethandy', 'lucretia'], ['pierre', 'pierre'], ['cercueil', 'pierre'], ['klaus', 'pierre'], ['souline', 'souline'], 
    ['theresa', 'theresa'], ['miroir', 'theresa'], ['iris', 'theresa'], ['timone', 'timone'], ['camille', 'camille'], ['cooper', 'cooper'], 
    ['medea', 'camille'], ['eva', 'camille'], ['gaspard', 'gaspard'], ['franc', 'gaspard'], ['rudolf', 'gaspard'], ['emma', 'emma'], ['andrew', 'andrew'], 
    ['fonce', 'andrew'], ['duke', 'andrew'], ['andrea', 'andrea'], ['tak', 'andrea'], ['rianna', 'andrea'], ['percival', 'percival'], ['apollonius', 'percival'], 
    ['felix', 'percival'], ['marie', 'marie'], ['alienor', 'marie'], ['beatrix', 'marie'], ['nicolas', 'nicolas'], ['renard', 'nicolas'], ['albus', 'nicolas'], 
    ['sonya', 'sonya'], ['natasha', 'natasha'], ['poule', 'natasha'], ['shannon', 'natasha'], ['dominic', 'dominic'], ['anna', 'anna'], ['elizabeth', 'anna'], 
    ['celia', 'anna'], ['dmitrii', 'dmitrii'], ['paul', 'paul'], ['lenfant', 'paul'], ['adrian', 'paul'], ['amelia', 'amelia'], ['lily', 'lily'], 
    ['consacree', 'lily'], ['jessica', 'lily'], ['vera', 'vera'], ['isolee', 'vera'], ['ambrosia', 'vera'], ['elysia', 'elysia'], ['orphelia', 'elysia'], 
    ['maria', 'elysia'], ['chauncey', 'chauncey'], ['modele', 'chauncey'], ['georges', 'chauncey'], ['marcus', 'marcus'], ['refoulement', 'marcus'], 
    ['bartholomew', 'marcus'], ['quinn', 'quinn'], ['eveil', 'quinn'], ['angie', 'quinn']]);

function firstNameOf(full) {
  let first = (full || '').toLowerCase().trim().replace('&apos;', '').replace('&#x2019;', '').replace('&#x00ED;', 'i')
  .replace('&#x00E9;', 'e').replace('&#x00E8;', 'e').replace('&#x00C9;', 'e') || '';
  return familyData.get(first) || '';
}

function removeHighlights() {
  document.querySelectorAll('.f').forEach(el => el.style.fill = 'pink');
  document.querySelectorAll('.m').forEach(el => el.style.fill = 'lightblue');
}

function highlightByName(q) {
  removeHighlights();
  if (!q) return;
  console.log(firstNameOf(q));
  let person = document.getElementById(firstNameOf(q));
  console.log(person);
  if (!person) return;
  person.style.fill = 'yellow';
  person.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
}

function searchHandling(){
    const form = document.getElementById('search-form');
    const input = document.getElementById('search-input');
    const clearBtn = document.getElementById('clear-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        highlightByName(input.value);
    });
    clearBtn.addEventListener('click', () => {
        input.value = '';
        removeHighlights();
        input.focus();
    });
}

document.addEventListener('DOMContentLoaded', () => {searchHandling();});