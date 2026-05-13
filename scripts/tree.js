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

const defaultMap = [
    ["Griffon", `<text x="220.00" y="50.00" dy="2.162em">Griffon</text>
        <text x="220.00" y="50.00" dy="3.362em">Richelieu-</text>
        <text x="220.00" y="50.00" dy="4.562em">Ayers</text>`], 
    ["Calliope", `<text x="1260.00" y="50.00" dy="2.162em">Calliope</text>
        <text x="1260.00" y="50.00" dy="3.362em">Richelieu-</text>
        <text x="1260.00" y="50.00" dy="4.562em">Ayers</text>`],
    ["Douglas", `<text x="155.00" y="180.00" dy="2.162em">Douglas</text>
        <text x="155.00" y="180.00" dy="3.362em">Richelieu-</text>
        <text x="155.00" y="180.00" dy="4.562em">Ayers</text>`],
    ["Brittany", `<text x="545.00" y="180.00" dy="2.162em">Brittany</text>
        <text x="545.00" y="180.00" dy="3.362em">Richelieu-</text>
        <text x="545.00" y="180.00" dy="4.562em">Ayers</text>`],
    ["Picard", `<text x="1325.00" y="180.00" dy="2.162em">Picard</text>
        <text x="1325.00" y="180.00" dy="3.362em">Richelieu-</text>
        <text x="1325.00" y="180.00" dy="4.562em">Ayers</text>`],
    ["Bernard", `<text x="1715.00" y="180.00" dy="2.162em">Bernard</text>
        <text x="1715.00" y="180.00" dy="3.362em">Richelieu-</text>
        <text x="1715.00" y="180.00" dy="4.562em">Ayers</text>`],
    ["Elaine", `<text x="2625.00" y="180.00" dy="2.162em">Elaine</text>
        <text x="2625.00" y="180.00" dy="3.362em">Richelieu-</text>
        <text x="2625.00" y="180.00" dy="4.562em">Ayers</text>`],
    ["Sharon", `<text x="285.00" y="180.00" dy="2.162em">Sharon</text>
        <text x="285.00" y="180.00" dy="3.362em">Richelieu-</text>
        <text x="285.00" y="180.00" dy="4.562em">Ayers</text>`],
    ["Perth", `<text x="805.00" y="180.00" dy="2.762em">Perth de</text>
        <text x="805.00" y="180.00" dy="3.962em">Intrigant</text>`],
    ["Beverly", `<text x="1585.00" y="180.00" dy="2.762em">Beverly de</text>
        <text x="1585.00" y="180.00" dy="3.962em">Retinue</text>`],
    ["Videl", `<text x="2105.00" y="180.00" dy="2.162em">Videl</text>
        <text x="2105.00" y="180.00" dy="3.362em">Richelieu-</text>
        <text x="2105.00" y="180.00" dy="4.562em">Ayers</text>`],
    ["Dewey", `<text x="2885.00" y="180.00" dy="2.762em">Dewey de</text>
        <text x="2885.00" y="180.00" dy="3.962em">J&apos;Aime</text>`],
    ["Cecily", `<text x="220.00" y="310.00" dy="2.162em">Cecily</text>
        <text x="220.00" y="310.00" dy="3.362em">Richelieu-</text>
        <text x="220.00" y="310.00" dy="4.562em">Ayers</text>`],
    ["Andres", `<text x="350.00" y="310.00" dy="2.762em">Andr&#x00E9;s de</text>
        <text x="350.00" y="310.00" dy="3.962em">Valera</text>`],
    ["Natalie", `<text x="480.00" y="310.00" dy="2.762em">Natalie de</text>
        <text x="480.00" y="310.00" dy="3.962em">Barlowe</text>`],
    ["Elijah", `<text x="610.00" y="310.00" dy="2.762em">Elijah de</text>
        <text x="610.00" y="310.00" dy="3.962em">Barlowe</text>`],
    ["Alexander", `<text x="740.00" y="310.00" dy="2.762em">Alexander de</text>
        <text x="740.00" y="310.00" dy="3.962em">Intrigant</text>`],
    ["Aria", `<text x="1000.00" y="310.00" dy="2.762em">Aria de</text>
        <text x="1000.00" y="310.00" dy="3.962em">Tristesse</text>`],
    ["Mathias", `<text x="1130.00" y="310.00" dy="2.762em">Mathias de</text>
        <text x="1130.00" y="310.00" dy="3.962em">Intrigant</text>`],
    ["Elisa", `<text x="1260.00" y="310.00" dy="2.762em">Elisa de</text>
        <text x="1260.00" y="310.00" dy="3.962em">Morte</text>`],
    ["Jean", `<text x="1390.00" y="310.00" dy="2.762em">Jean de</text>
        <text x="1390.00" y="310.00" dy="3.962em">Retinue</text>`],
    ["Lucretia", `<text x="1520.00" y="310.00" dy="2.762em">Lucretia de</text>
        <text x="1520.00" y="310.00" dy="3.962em">Retinue</text>`],
    ["Pierre", `<text x="1650.00" y="310.00" dy="2.162em">Pierre</text>
        <text x="1650.00" y="310.00" dy="3.362em">Richelieu-</text>
        <text x="1650.00" y="310.00" dy="4.562em">Ayers</text>`],
    ["Souline", `<text x="1780.00" y="310.00" dy="2.762em">Souline de</text>
        <text x="1780.00" y="310.00" dy="3.962em">Cadavre</text>`],
    ["Theresa", `<text x="1910.00" y="310.00" dy="2.162em">Theresa</text>
        <text x="1910.00" y="310.00" dy="3.362em">Richelieu-</text>
        <text x="1910.00" y="310.00" dy="4.562em">Ayers</text>`],
    ["Timone", `<text x="2040.00" y="310.00" dy="2.762em">Timone de</text>
        <text x="2040.00" y="310.00" dy="3.962em">Armas</text>`],
    ["Camille", `<text x="2170.00" y="310.00" dy="2.162em">Camille</text>
        <text x="2170.00" y="310.00" dy="3.362em">Richelieu-</text>
        <text x="2170.00" y="310.00" dy="4.562em">Ayers</text>`],
    ["Cooper", `<text x="2300.00" y="310.00" dy="2.762em">Cooper de</text>
        <text x="2300.00" y="310.00" dy="3.962em">Chauncey</text>`],
    ["Gaspard", `<text x="2430.00" y="310.00" dy="2.162em">Gaspard</text>
        <text x="2430.00" y="310.00" dy="3.362em">Richelieu-</text>
        <text x="2430.00" y="310.00" dy="4.562em">Ayers</text>`],
    ["Emma", `<text x="2560.00" y="310.00" dy="2.762em">Emma de</text>
        <text x="2560.00" y="310.00" dy="3.962em">El&#x00E9;ison</text>`],
    ["Andrew", `<text x="2690.00" y="310.00" dy="2.762em">Andrew de</text>
        <text x="2690.00" y="310.00" dy="3.962em">J&apos;Aime</text>`],
    ["Andrea", `<text x="2820.00" y="310.00" dy="2.762em">Andrea de</text>
        <text x="2820.00" y="310.00" dy="3.962em">J&apos;Aime</text>`],
    ["Percival", `<text x="155.00" y="440.00" dy="2.762em">Percival de</text>
        <text x="155.00" y="440.00" dy="3.962em">Valera</text>`],
    ["Marie", `<text x="285.00" y="440.00" dy="2.762em">Marie de</text>
        <text x="285.00" y="440.00" dy="3.962em">Valera</text>`],
    ["Nicolas", `<text x="415.00" y="440.00" dy="2.762em">Nicolas de</text>
        <text x="415.00" y="440.00" dy="3.962em">Barlowe</text>`],
    ["Sonya", `<text x="545.00" y="440.00" dy="2.762em">Sonya de</text>
        <text x="545.00" y="440.00" dy="3.962em">Tromp&#x00E9;</text>`],
    ["Natasha", `<text x="675.00" y="440.00" dy="2.762em">Natasha de</text>
        <text x="675.00" y="440.00" dy="3.962em">Bezukhov</text>`],
    ["Dominic", `<text x="805.00" y="440.00" dy="2.762em">Dominic de</text>
        <text x="805.00" y="440.00" dy="3.962em">Bezukhov</text>`],
    ["Anna", `<text x="935.00" y="440.00" dy="2.762em">Anna de</text>
        <text x="935.00" y="440.00" dy="3.962em">Bartley</text>`],
    ["Dmitrii", `<text x="1065.00" y="440.00" dy="2.762em">Dmitrii de</text>
        <text x="1065.00" y="440.00" dy="3.962em">Bartley</text>`],
    ["Paul", `<text x="1195.00" y="440.00" dy="2.762em">Paul de</text>
        <text x="1195.00" y="440.00" dy="3.962em">Intrigant</text>`],
    ["Amelia", `<text x="1325.00" y="440.00" dy="2.762em">Amelia de</text>
        <text x="1325.00" y="440.00" dy="3.962em">Victoria</text>`],
    ["Lily", `<text x="1715.00" y="440.00" dy="2.162em">Lily</text>
        <text x="1715.00" y="440.00" dy="3.362em">Richelieu-</text>
        <text x="1715.00" y="440.00" dy="4.562em">Ayers</text>`],
    ["Vera", `<text x="1845.00" y="440.00" dy="2.762em">Vera de</text>
        <text x="1845.00" y="440.00" dy="3.962em">Armas</text>`],
    ["Elysia", `<text x="1975.00" y="440.00" dy="2.762em">Elysia de</text>
        <text x="1975.00" y="440.00" dy="3.962em">Armas</text>`],
    ["Chauncey", `<text x="2235.00" y="440.00" dy="2.162em">Chauncey</text>
        <text x="2235.00" y="440.00" dy="3.362em">Richelieu-</text>
        <text x="2235.00" y="440.00" dy="4.562em">Ayers</text>`],
    ["Marcus", `<text x="2365.00" y="440.00" dy="2.162em">Marcus</text>
        <text x="2365.00" y="440.00" dy="3.362em">Richelieu-</text>
        <text x="2365.00" y="440.00" dy="4.562em">Ayers</text>`],
    ["Quinn", `<text x="2495.00" y="440.00" dy="2.162em">Quinn</text>
        <text x="2495.00" y="440.00" dy="3.362em">Richelieu-</text>
        <text x="2495.00" y="440.00" dy="4.562em">Ayers</text>`]
];

const fourMap = [
    ["Griffon", `<text x="220.00" y="50.00" dy="2.162em">Pallas</text>
        <text x="220.00" y="50.00" dy="3.362em">Richelieu-</text>
        <text x="220.00" y="50.00" dy="4.562em">Ayers</text>`], 
    ["Calliope", `<text x="1260.00" y="50.00" dy="2.162em">Calliope</text>
        <text x="1260.00" y="50.00" dy="3.362em">Richelieu-</text>
        <text x="1260.00" y="50.00" dy="4.562em">Ayers</text>`],
    ["Douglas", `<text x="155.00" y="180.00" dy="2.162em">Kratos</text>
        <text x="155.00" y="180.00" dy="3.362em">Richelieu-</text>
        <text x="155.00" y="180.00" dy="4.562em">Ayers</text>`],
    ["Brittany", `<text x="545.00" y="180.00" dy="2.162em">Nike</text>
        <text x="545.00" y="180.00" dy="3.362em">Richelieu-</text>
        <text x="545.00" y="180.00" dy="4.562em">Ayers</text>`],
    ["Picard", `<text x="1325.00" y="180.00" dy="2.162em">Aspyrtus</text>
        <text x="1325.00" y="180.00" dy="3.362em">Richelieu-</text>
        <text x="1325.00" y="180.00" dy="4.562em">Ayers</text>`],
    ["Bernard", `<text x="1715.00" y="180.00" dy="2.162em">Orpheus</text>
        <text x="1715.00" y="180.00" dy="3.362em">Richelieu-</text>
        <text x="1715.00" y="180.00" dy="4.562em">Ayers</text>`],
    ["Elaine", `<text x="2625.00" y="180.00" dy="2.162em">Bia</text>
        <text x="2625.00" y="180.00" dy="3.362em">Richelieu-</text>
        <text x="2625.00" y="180.00" dy="4.562em">Ayers</text>`],
    ["Sharon", `<text x="285.00" y="180.00" dy="2.162em">Sharon</text>
        <text x="285.00" y="180.00" dy="3.362em">Richelieu-</text>
        <text x="285.00" y="180.00" dy="4.562em">Ayers</text>`],
    ["Perth", `<text x="805.00" y="180.00" dy="2.762em">Perth de</text>
        <text x="805.00" y="180.00" dy="3.962em">Intrigant</text>`],
    ["Beverly", `<text x="1585.00" y="180.00" dy="2.762em">Beverly de</text>
        <text x="1585.00" y="180.00" dy="3.962em">Retinue</text>`],
    ["Videl", `<text x="2105.00" y="180.00" dy="2.162em">Videl</text>
        <text x="2105.00" y="180.00" dy="3.362em">Richelieu-</text>
        <text x="2105.00" y="180.00" dy="4.562em">Ayers</text>`],
    ["Dewey", `<text x="2885.00" y="180.00" dy="2.762em">Dewey de</text>
        <text x="2885.00" y="180.00" dy="3.962em">J&apos;Aime</text>`],
    ["Cecily", `<text x="220.00" y="310.00" dy="2.162em">Marguerite</text>
        <text x="220.00" y="310.00" dy="3.362em">Richelieu-</text>
        <text x="220.00" y="310.00" dy="4.562em">Ayers</text>`],
    ["Andres", `<text x="350.00" y="310.00" dy="2.762em">Andr&#x00E9;s de</text>
        <text x="350.00" y="310.00" dy="3.962em">Valera</text>`],
    ["Natalie", `<text x="480.00" y="310.00" dy="2.762em">Ecclesia de</text>
        <text x="480.00" y="310.00" dy="3.962em">Barlowe</text>`],
    ["Elijah", `<text x="610.00" y="310.00" dy="2.762em">Elijah de</text>
        <text x="610.00" y="310.00" dy="3.962em">Barlowe</text>`],
    ["Alexander", `<text x="740.00" y="310.00" dy="2.762em">Graham de</text>
        <text x="740.00" y="310.00" dy="3.962em">Intrigant</text>`],
    ["Aria", `<text x="1000.00" y="310.00" dy="2.762em">Aria de</text>
        <text x="1000.00" y="310.00" dy="3.962em">Tristesse</text>`],
    ["Mathias", `<text x="1130.00" y="310.00" dy="2.762em">Vladimir de</text>
        <text x="1130.00" y="310.00" dy="3.962em">Intrigant</text>`],
    ["Elisa", `<text x="1260.00" y="310.00" dy="2.762em">Elisa de</text>
        <text x="1260.00" y="310.00" dy="3.962em">Morte</text>`],
    ["Jean", `<text x="1390.00" y="310.00" dy="2.762em">Lazarus de</text>
        <text x="1390.00" y="310.00" dy="3.962em">Retinue</text>`],
    ["Lucretia", `<text x="1520.00" y="310.00" dy="2.762em">Bethandy de</text>
        <text x="1520.00" y="310.00" dy="3.962em">Retinue</text>`],
    ["Pierre", `<text x="1650.00" y="310.00" dy="2.162em">Klaus</text>
        <text x="1650.00" y="310.00" dy="3.362em">Richelieu-</text>
        <text x="1650.00" y="310.00" dy="4.562em">Ayers</text>`],
    ["Souline", `<text x="1780.00" y="310.00" dy="2.762em">Souline de</text>
        <text x="1780.00" y="310.00" dy="3.962em">Cadavre</text>`],
    ["Theresa", `<text x="1910.00" y="310.00" dy="2.162em">Iris</text>
        <text x="1910.00" y="310.00" dy="3.362em">Richelieu-</text>
        <text x="1910.00" y="310.00" dy="4.562em">Ayers</text>`],
    ["Timone", `<text x="2040.00" y="310.00" dy="2.762em">Timone de</text>
        <text x="2040.00" y="310.00" dy="3.962em">Armas</text>`],
    ["Camille", `<text x="2170.00" y="310.00" dy="2.162em">Eva</text>
        <text x="2170.00" y="310.00" dy="3.362em">Richelieu-</text>
        <text x="2170.00" y="310.00" dy="4.562em">Ayers</text>`],
    ["Cooper", `<text x="2300.00" y="310.00" dy="2.762em">Cooper de</text>
        <text x="2300.00" y="310.00" dy="3.962em">Chauncey</text>`],
    ["Gaspard", `<text x="2430.00" y="310.00" dy="2.162em">Rudolf</text>
        <text x="2430.00" y="310.00" dy="3.362em">Richelieu-</text>
        <text x="2430.00" y="310.00" dy="4.562em">Ayers</text>`],
    ["Emma", `<text x="2560.00" y="310.00" dy="2.762em">Emma de</text>
        <text x="2560.00" y="310.00" dy="3.962em">El&#x00E9;ison</text>`],
    ["Andrew", `<text x="2690.00" y="310.00" dy="2.762em">Duke de</text>
        <text x="2690.00" y="310.00" dy="3.962em">J&apos;Aime</text>`],
    ["Andrea", `<text x="2820.00" y="310.00" dy="2.762em">Rianna de</text>
        <text x="2820.00" y="310.00" dy="3.962em">J&apos;Aime</text>`],
    ["Percival", `<text x="155.00" y="440.00" dy="2.762em">Felix de</text>
        <text x="155.00" y="440.00" dy="3.962em">Valera</text>`],
    ["Marie", `<text x="285.00" y="440.00" dy="2.762em">Beatrix de</text>
        <text x="285.00" y="440.00" dy="3.962em">Valera</text>`],
    ["Nicolas", `<text x="415.00" y="440.00" dy="2.762em">Albus de</text>
        <text x="415.00" y="440.00" dy="3.962em">Barlowe</text>`],
    ["Sonya", `<text x="545.00" y="440.00" dy="2.762em">Sonya de</text>
        <text x="545.00" y="440.00" dy="3.962em">Tromp&#x00E9;</text>`],
    ["Natasha", `<text x="675.00" y="440.00" dy="2.762em">Shannon de</text>
        <text x="675.00" y="440.00" dy="3.962em">Bezukhov</text>`],
    ["Dominic", `<text x="805.00" y="440.00" dy="2.762em">Dominic de</text>
        <text x="805.00" y="440.00" dy="3.962em">Bezukhov</text>`],
    ["Anna", `<text x="935.00" y="440.00" dy="2.762em">Celia de</text>
        <text x="935.00" y="440.00" dy="3.962em">Bartley</text>`],
    ["Dmitrii", `<text x="1065.00" y="440.00" dy="2.762em">Dmitrii de</text>
        <text x="1065.00" y="440.00" dy="3.962em">Bartley</text>`],
    ["Paul", `<text x="1195.00" y="440.00" dy="2.762em">Adrian de</text>
        <text x="1195.00" y="440.00" dy="3.962em">Intrigant</text>`],
    ["Amelia", `<text x="1325.00" y="440.00" dy="2.762em">Amelia de</text>
        <text x="1325.00" y="440.00" dy="3.962em">Victoria</text>`],
    ["Lily", `<text x="1715.00" y="440.00" dy="2.162em">Jessica</text>
        <text x="1715.00" y="440.00" dy="3.362em">Richelieu-</text>
        <text x="1715.00" y="440.00" dy="4.562em">Ayers</text>`],
    ["Vera", `<text x="1845.00" y="440.00" dy="2.762em">Ambrosia de</text>
        <text x="1845.00" y="440.00" dy="3.962em">Armas</text>`],
    ["Elysia", `<text x="1975.00" y="440.00" dy="2.762em">Maria de</text>
        <text x="1975.00" y="440.00" dy="3.962em">Armas</text>`],
    ["Chauncey", `<text x="2235.00" y="440.00" dy="2.162em">Georges</text>
        <text x="2235.00" y="440.00" dy="3.362em">Richelieu-</text>
        <text x="2235.00" y="440.00" dy="4.562em">Ayers</text>`],
    ["Marcus", `<text x="2365.00" y="440.00" dy="2.162em">Bartholomew</text>
        <text x="2365.00" y="440.00" dy="3.362em">Richelieu-</text>
        <text x="2365.00" y="440.00" dy="4.562em">Ayers</text>`],
    ["Quinn", `<text x="2495.00" y="440.00" dy="2.162em">Angie</text>
        <text x="2495.00" y="440.00" dy="3.362em">Richelieu-</text>
        <text x="2495.00" y="440.00" dy="4.562em">Ayers</text>`]
];

const threeMap = [
    ["Griffon", `<text x="220.00" y="50.00" dy="2.762em">Griffon</text>
        <text x="220.00" y="50.00" dy="3.962em">Antoine</text>`], 
    ["Calliope", `<text x="1260.00" y="50.00" dy="3.362em">Calliope</text>`],//
    ["Douglas", `<text x="155.00" y="180.00" dy="2.762em">Douglas</text>
        <text x="155.00" y="180.00" dy="3.962em">Bacardi</text>`],
    ["Brittany", `<text x="545.00" y="180.00" dy="2.762em">Brittany</text>
        <text x="545.00" y="180.00" dy="3.962em">Everclear</text>`],
    ["Picard", `<text x="1325.00" y="180.00" dy="2.762em">Picard</text>
        <text x="1325.00" y="180.00" dy="3.962em">Polmos</text>`],
    ["Bernard", `<text x="1715.00" y="180.00" dy="2.762em">Bernard</text>
        <text x="1715.00" y="180.00" dy="3.962em">Absinthe</text>`],
    ["Elaine", `<text x="2625.00" y="180.00" dy="2.762em">Elaine</text>
        <text x="2625.00" y="180.00" dy="3.962em">Poit&#x00ED;n</text>`],
    ["Sharon", `<text x="285.00" y="180.00" dy="3.362em">Sharon</text>`],//
    ["Perth", `<text x="805.00" y="180.00" dy="3.362em">Perth</text>`],//
    ["Beverly", `<text x="1585.00" y="180.00" dy="3.362em">Beverly</text>`],//
    ["Videl", `<text x="2105.00" y="180.00" dy="3.362em">Videl</text>`],//
    ["Dewey", `<text x="2885.00" y="180.00" dy="3.362em">Dewey</text>`],//
    ["Cecily", `<text x="220.00" y="310.00" dy="2.762em">Cecily</text>
        <text x="220.00" y="310.00" dy="3.962em">Aurelia</text>`],
    ["Andres", `<text x="350.00" y="310.00" dy="3.362em">Andr&#x00E9;s</text>`],//
    ["Natalie", `<text x="480.00" y="310.00" dy="2.762em">Natalie</text>
        <text x="480.00" y="310.00" dy="3.962em">Antoinette</text>`],
    ["Elijah", `<text x="610.00" y="310.00" dy="3.362em">Elijah</text>`],//
    ["Alexander", `<text x="740.00" y="310.00" dy="2.762em">Alexander</text>
        <text x="740.00" y="310.00" dy="3.962em">Maximilien</text>`],
    ["Aria", `<text x="1000.00" y="310.00" dy="3.362em">Aria</text>`],//
    ["Mathias", `<text x="1130.00" y="310.00" dy="2.762em">Mathias</text>
        <text x="1130.00" y="310.00" dy="3.962em">Lafayette</text>`],
    ["Elisa", `<text x="1260.00" y="310.00" dy="3.362em">Elisa</text>`],//
    ["Jean", `<text x="1390.00" y="310.00" dy="2.762em">Jean</text>
        <text x="1390.00" y="310.00" dy="3.962em">Hubert</text>`],
    ["Lucretia", `<text x="1520.00" y="310.00" dy="2.762em">Lucretia</text>
        <text x="1520.00" y="310.00" dy="3.962em">Clarisse</text>`],
    ["Pierre", `<text x="1650.00" y="310.00" dy="2.762em">Pierre</text>
        <text x="1650.00" y="310.00" dy="3.962em">Cercueil</text>`],
    ["Souline", `<text x="1780.00" y="310.00" dy="3.362em">Souline</text>`],//
    ["Theresa", `<text x="1910.00" y="310.00" dy="2.762em">Theresa</text>
        <text x="1910.00" y="310.00" dy="3.962em">Miroir</text>`],
    ["Timone", `<text x="2040.00" y="310.00" dy="3.362em">Timone</text>`],//
    ["Camille", `<text x="2170.00" y="310.00" dy="2.762em">Camille</text>
        <text x="2170.00" y="310.00" dy="3.962em">Medea</text>`],
    ["Cooper", `<text x="2300.00" y="310.00" dy="3.362em">Cooper</text>`],//
    ["Gaspard", `<text x="2430.00" y="310.00" dy="2.762em">Gaspard</text>
        <text x="2430.00" y="310.00" dy="3.962em">Franc</text>`],
    ["Emma", `<text x="2560.00" y="310.00" dy="3.362em">Emma</text>`],//
    ["Andrew", `<text x="2690.00" y="310.00" dy="2.762em">Andrew</text>
        <text x="2690.00" y="310.00" dy="3.962em">Fonce</text>`],
    ["Andrea", `<text x="2820.00" y="310.00" dy="2.762em">Andrea</text>
        <text x="2820.00" y="310.00" dy="3.962em">Tak</text>`],
    ["Percival", `<text x="155.00" y="440.00" dy="3.362em">Felix</text>`],
    ["Marie", `<text x="285.00" y="440.00" dy="2.762em">Marie</text>
        <text x="285.00" y="440.00" dy="3.962em">Ali&#x00E9;nor</text>`],
    ["Nicolas", `<text x="415.00" y="440.00" dy="2.762em">Nicolas</text>
        <text x="415.00" y="440.00" dy="3.962em">Renaud</text>`],
    ["Sonya", `<text x="545.00" y="440.00" dy="3.362em">Sonya</text>`],//
    ["Natasha", `<text x="675.00" y="440.00" dy="2.762em">Natasha</text>
        <text x="675.00" y="440.00" dy="3.962em">Poule</text>`],
    ["Dominic", `<text x="805.00" y="440.00" dy="3.362em">Dominic</text>`],//
    ["Anna", `<text x="935.00" y="440.00" dy="2.762em">Anna</text>
        <text x="935.00" y="440.00" dy="3.962em">Elizabeth</text>`],
    ["Dmitrii", `<text x="1065.00" y="440.00" dy="3.362em">Dmitrii</text>`],//
    ["Paul", `<text x="1195.00" y="440.00" dy="2.762em">Paul</text>
        <text x="1195.00" y="440.00" dy="3.962em">L&#x2019;Enfant</text>`],
    ["Amelia", `<text x="1325.00" y="440.00" dy="3.362em">Amelia</text>`],//
    ["Lily", `<text x="1715.00" y="440.00" dy="2.762em">Lily</text>
        <text x="1715.00" y="440.00" dy="3.962em">Consacr&#x00E9;es</text>`],
    ["Vera", `<text x="1845.00" y="440.00" dy="3.362em">Rosa</text>`],
    ["Elysia", `<text x="1975.00" y="440.00" dy="2.762em">Elysia</text>
        <text x="1975.00" y="440.00" dy="3.962em">Orphelia</text>`],
    ["Chauncey", `<text x="2235.00" y="440.00" dy="2.762em">Chauncey</text>
        <text x="2235.00" y="440.00" dy="3.962em">Mod&#x00E8;le</text>`],
    ["Marcus", `<text x="2365.00" y="440.00" dy="2.762em">Marcus</text>
        <text x="2365.00" y="440.00" dy="3.962em">Refoulement</text>`],
    ["Quinn", `<text x="2495.00" y="440.00" dy="2.762em">Quinn</text>
        <text x="2495.00" y="440.00" dy="3.962em">&#x00C9;veil</text>`]
];

const twoMap = [
    ["Griffon", `<text x="220.00" y="50.00" dy="3.362em">Griffon</text>`], 
    ["Calliope", `<text x="1260.00" y="50.00" dy="3.362em">Calliope</text>`],//
    ["Douglas", `<text x="155.00" y="180.00" dy="3.362em">Douglas</text>`],
    ["Brittany", `<text x="545.00" y="180.00" dy="3.362em">Brittany</text>`],
    ["Picard", `<text x="1325.00" y="180.00" dy="3.362em">Picard</text>`],
    ["Bernard", `<text x="1715.00" y="180.00" dy="3.362em">Bernard</text>`],
    ["Elaine", `<text x="2625.00" y="180.00" dy="3.362em">Elaine</text>`],
    ["Sharon", `<text x="285.00" y="180.00" dy="3.362em">Sharon</text>`],//
    ["Perth", `<text x="805.00" y="180.00" dy="3.362em">Perth</text>`],//
    ["Beverly", `<text x="1585.00" y="180.00" dy="3.362em">Beverly</text>`],//
    ["Videl", `<text x="2105.00" y="180.00" dy="3.362em">Videl</text>`],//
    ["Dewey", `<text x="2885.00" y="180.00" dy="3.362em">Dewey</text>`],//
    ["Cecily", `<text x="220.00" y="310.00" dy="3.362em">Cecily</text>`],
    ["Andres", `<text x="350.00" y="310.00" dy="3.362em">Andr&#x00E9;s</text>`],//
    ["Natalie", `<text x="480.00" y="310.00" dy="3.362em">Natalie</text>`],
    ["Elijah", `<text x="610.00" y="310.00" dy="3.362em">Elijah</text>`],//
    ["Alexander", `<text x="740.00" y="310.00" dy="3.362em">Alexander</text>`],
    ["Aria", `<text x="1000.00" y="310.00" dy="3.362em">Aria</text>`],//
    ["Mathias", `<text x="1130.00" y="310.00" dy="3.362em">Mathias</text>`],
    ["Elisa", `<text x="1260.00" y="310.00" dy="3.362em">Elisa</text>`],//
    ["Jean", `<text x="1390.00" y="310.00" dy="3.362em">Jean</text>`],
    ["Lucretia", `<text x="1520.00" y="310.00" dy="3.362em">Lucretia</text>`],
    ["Pierre", `<text x="1650.00" y="310.00" dy="3.362em">Pierre</text>`],
    ["Souline", `<text x="1780.00" y="310.00" dy="3.362em">Souline</text>`],//
    ["Theresa", `<text x="1910.00" y="310.00" dy="3.362em">Theresa</text>`],
    ["Timone", `<text x="2040.00" y="310.00" dy="3.362em">Timone</text>`],//
    ["Camille", `<text x="2170.00" y="310.00" dy="3.362em">Camille</text>`],
    ["Cooper", `<text x="2300.00" y="310.00" dy="3.362em">Cooper</text>`],//
    ["Gaspard", `<text x="2430.00" y="310.00" dy="3.362em">Gaspard</text>`],
    ["Emma", `<text x="2560.00" y="310.00" dy="3.362em">Emma</text>`],//
    ["Andrew", `<text x="2690.00" y="310.00" dy="3.362em">Andrew</text>`],
    ["Andrea", `<text x="2820.00" y="310.00" dy="3.362em">Andrea</text>`],
    ["Percival", `<text x="155.00" y="440.00" dy="3.362em">Felix</text>`],
    ["Marie", `<text x="285.00" y="440.00" dy="3.362em">Ali&#x00E9;nor</text>`],
    ["Nicolas", `<text x="415.00" y="440.00" dy="3.362em">Nicolas</text>`],
    ["Sonya", `<text x="545.00" y="440.00" dy="3.362em">Sonya</text>`],//
    ["Natasha", `<text x="675.00" y="440.00" dy="3.362em">Natasha</text>`],
    ["Dominic", `<text x="805.00" y="440.00" dy="3.362em">Dominic</text>`],//
    ["Anna", `<text x="935.00" y="440.00" dy="3.362em">Anna</text>`],
    ["Dmitrii", `<text x="1065.00" y="440.00" dy="3.362em">Dmitrii</text>`],//
    ["Paul", `<text x="1195.00" y="440.00" dy="3.362em">Paul</text>`],
    ["Amelia", `<text x="1325.00" y="440.00" dy="3.362em">Amelia</text>`],//
    ["Lily", `<text x="1715.00" y="440.00" dy="3.362em">Lily</text>`],
    ["Vera", `<text x="1845.00" y="440.00" dy="3.362em">Rosa</text>`],
    ["Elysia", `<text x="1975.00" y="440.00" dy="3.362em">Elysia</text>`],
    ["Chauncey", `<text x="2235.00" y="440.00" dy="3.362em">Chauncey</text>`],
    ["Marcus", `<text x="2365.00" y="440.00" dy="3.362em">Marcus</text>`],
    ["Quinn", `<text x="2495.00" y="440.00" dy="3.362em">Quinn</text>`]
];

const oneMap = [
    ["Griffon", `<text x="220.00" y="50.00" dy="3.362em">Griffon</text>`], 
    ["Calliope", `<text x="1260.00" y="50.00" dy="3.362em">Calliope</text>`],//
    ["Douglas", `<text x="155.00" y="180.00" dy="3.362em">Douglas</text>`],
    ["Brittany", `<text x="545.00" y="180.00" dy="3.362em">Brittany</text>`],
    ["Picard", `<text x="1325.00" y="180.00" dy="3.362em">Picard</text>`],
    ["Bernard", `<text x="1715.00" y="180.00" dy="3.362em">Bernard</text>`],
    ["Elaine", `<text x="2625.00" y="180.00" dy="3.362em">Elaine</text>`],
    ["Sharon", `<text x="285.00" y="180.00" dy="3.362em">Sharon</text>`],//
    ["Perth", `<text x="805.00" y="180.00" dy="3.362em">Perth</text>`],//
    ["Beverly", `<text x="1585.00" y="180.00" dy="3.362em">Beverly</text>`],//
    ["Videl", `<text x="2105.00" y="180.00" dy="3.362em">Videl</text>`],//
    ["Dewey", `<text x="2885.00" y="180.00" dy="3.362em">Dewey</text>`],//
    ["Cecily", `<text x="220.00" y="310.00" dy="3.362em">Cece</text>`],
    ["Andres", `<text x="350.00" y="310.00" dy="3.362em">Andr&#x00E9;s</text>`],//
    ["Natalie", `<text x="480.00" y="310.00" dy="3.362em">Nat</text>`],
    ["Elijah", `<text x="610.00" y="310.00" dy="3.362em">Elijah</text>`],//
    ["Alexander", `<text x="740.00" y="310.00" dy="3.362em">Max</text>`],
    ["Aria", `<text x="1000.00" y="310.00" dy="3.362em">Aria</text>`],//
    ["Mathias", `<text x="1130.00" y="310.00" dy="3.362em">Mathias</text>`],
    ["Elisa", `<text x="1260.00" y="310.00" dy="3.362em">Elisa</text>`],//
    ["Jean", `<text x="1390.00" y="310.00" dy="3.362em">Jean</text>`],
    ["Lucretia", `<text x="1520.00" y="310.00" dy="3.362em">Lucy</text>`],
    ["Pierre", `<text x="1650.00" y="310.00" dy="3.362em">Pierre</text>`],
    ["Souline", `<text x="1780.00" y="310.00" dy="3.362em">Souline</text>`],//
    ["Theresa", `<text x="1910.00" y="310.00" dy="3.362em">Tess</text>`],
    ["Timone", `<text x="2040.00" y="310.00" dy="3.362em">Timone</text>`],//
    ["Camille", `<text x="2170.00" y="310.00" dy="3.362em">Mimi</text>`],
    ["Cooper", `<text x="2300.00" y="310.00" dy="3.362em">Cooper</text>`],//
    ["Gaspard", `<text x="2430.00" y="310.00" dy="3.362em">Gaspard</text>`],
    ["Emma", `<text x="2560.00" y="310.00" dy="3.362em">Emma</text>`],//
    ["Andrew", `<text x="2690.00" y="310.00" dy="3.362em">Andrew</text>`],
    ["Andrea", `<text x="2820.00" y="310.00" dy="3.362em">Andrea</text>`],
    ["Percival", `<text x="155.00" y="440.00" dy="3.362em">Percy</text>`],
    ["Marie", `<text x="285.00" y="440.00" dy="3.362em">Alie</text>`],
    ["Nicolas", `<text x="415.00" y="440.00" dy="3.362em">Nick</text>`],
    ["Sonya", `<text x="545.00" y="440.00" dy="3.362em">Sonya</text>`],//
    ["Natasha", `<text x="675.00" y="440.00" dy="3.362em">Tasha</text>`],
    ["Dominic", `<text x="805.00" y="440.00" dy="3.362em">Dominic</text>`],//
    ["Anna", `<text x="935.00" y="440.00" dy="3.362em">Anna</text>`],
    ["Dmitrii", `<text x="1065.00" y="440.00" dy="3.362em">Dmitrii</text>`],//
    ["Paul", `<text x="1195.00" y="440.00" dy="3.362em">Paul</text>`],
    ["Amelia", `<text x="1325.00" y="440.00" dy="3.362em">Amelia</text>`],//
    ["Lily", `<text x="1715.00" y="440.00" dy="3.362em">Lily</text>`],
    ["Vera", `<text x="1845.00" y="440.00" dy="3.362em">Rosa</text>`],
    ["Elysia", `<text x="1975.00" y="440.00" dy="3.362em">Elysia</text>`],
    ["Chauncey", `<text x="2235.00" y="440.00" dy="3.362em">Chauncey</text>`],
    ["Marcus", `<text x="2365.00" y="440.00" dy="3.362em">Marcus</text>`],
    ["Quinn", `<text x="2495.00" y="440.00" dy="3.362em">Quinn</text>`]
];

// window.onload = function() {
//     for (const person of oneMap){
//         let box = document.getElementById(person[0]);
//         box.innerHTML = person[1];
//     }
// };


const searchData = new Map([['griffon', 'griffon'], ['antoine', 'griffon'],['pallas', 'griffon'], ['calliope', 'calliope'], ['douglas', 'douglas'], 
    ['bacardi', 'douglas'], ['kratos', 'douglas'], ['brittany', 'brittany'], ['everclear', 'brittany'], ['nike', 'brittany'], ['picard', 'picard'], 
    ['polmos', 'picard'], ['aspyrtus', 'picard'], ['beverly', 'beverly'], ['bernard', 'bernard'], ['absinthe', 'bernard'], ['orpheus', 'bernard'], 
    ['perth', 'perth'], ['videl', 'videl'], ['elaine', 'elaine'], ['poitin', 'elaine'], ['bia', 'elaine'], ['dewey', 'dewey'], ['cecily', 'cecily'], 
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
  let first = (full || '').toLowerCase().trim().replace('&apos;', '').replace('\'', '').replace('&#x2019;', '').replace('í', 'i')
  .replace('é', 'e').replace('è', 'e').replace('É', 'e') || '';
  return searchData.get(first) || '';
}

function removeHighlights() {
  document.querySelectorAll('.dead').forEach(el => el.style.fill = 'lightgray');
  document.querySelectorAll('.f').forEach(el => el.style.fill = 'pink');
  document.querySelectorAll('.m').forEach(el => el.style.fill = 'lightblue');
  document.querySelectorAll('.dead').forEach(el => el.style.fill = 'lightgray');
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