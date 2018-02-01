var nums = 
[
   {
      "number":0,
      "color":"green"
   },
   {
      "number":32,
      "color":"red"
   },
   {
      "number":15,
      "color":"black"
   },
   {
      "number":19,
      "color":"red"
   },
   {
      "number":4,
      "color":"black"
   },
   {
      "number":21,
      "color":"red"
   },
   {
      "number":2,
      "color":"black"
   },
   {
      "number":25,
      "color":"red"
   },
   {
      "number":17,
      "color":"black"
   },
   {
      "number":34,
      "color":"red"
   },
   {
      "number":6,
      "color":"black"
   },
   {
      "number":27,
      "color":"red"
   },
   {
      "number":13,
      "color":"black"
   },
   {
      "number":36,
      "color":"red"
   },
   {
      "number":11,
      "color":"black"
   },
   {
      "number":30,
      "color":"red"
   },
   {
      "number":8,
      "color":"black"
   },
   {
      "number":32,
      "color":"red"
   },
   {
      "number":10,
      "color":"black"
   },
   {
      "number":5,
      "color":"red"
   },
   {
      "number":24,
      "color":"black"
   },
   {
      "number":16,
      "color":"red"
   },
   {
      "number":33,
      "color":"black"
   },
   {
      "number":1,
      "color":"red"
   },
   {
      "number":20,
      "color":"black"
   },
   {
      "number":14,
      "color":"red"
   },
   {
      "number":31,
      "color":"black"
   },
   {
      "number":9,
      "color":"red"
   },
   {
      "number":22,
      "color":"black"
   },
   {
      "number":18,
      "color":"red"
   },
   {
      "number":29,
      "color":"black"
   },
   {
      "number":7,
      "color":"red"
   },
   {
      "number":28,
      "color":"black"
   },
   {
      "number":12,
      "color":"red"
   },
   {
      "number":35,
      "color":"black"
   },
   {
      "number":3,
      "color":"red"
   },
   {
      "number":26,
      "color":"black"
   }
];

$(document).ready(function() {
	var spinner = $("#spinner");

    for (var key in nums){
        var val = nums[key];
        var division = $("<div></div>").addClass("number-square " + val.color);
        division.html(val.number);
        spinner.append(division);
    }
});

// la roue par défaut affiche 11 numéros
// Le numéro du milieu se trouvé à 5 numéros du numéro à gauche (position)

var basicOffset = 5;
var basicDelay = 75;
var numbersCount = nums.length;

// spin 1 fois (laisse passer 1 nombre)
function spin(delay = basicDelay) {
    $("#spinner").animate({marginLeft:-120}, delay, function(){
        $(this).css({marginLeft: 0}).find(".number-square:last").after($(this).find(".number-square:first"));
    });
}

function spinTimes(spinCount, delay = basicDelay) {
    for (var i = 0; i < spinCount; i++){
        spin(delay);
    }
}

// spin sur le nombre 'number' après avoir tourné 'rates' fois
function spinTo(number, rates = 0) {

    // si le nombre voulu n'existe pas sur la roulette
    if (number > nums.length - 1 || number < 0){
        return;
    }

    spinTimes(rates * numbersCount, basicDelay);

    spinTimes(getOffset(number) - 1, basicDelay);
}

// renvoie le numéro courant
function currPos() {
    return $("#spinner").find(".number-square:first").next().next().next().next().next().html();
}

// renvoie le décalage (nombre de numéros à faire défiler pour tomber sur le nombre)
function getOffset(number) {
    // récupérer la position du numéro courant dans le tableau
    var its = 0;
    var index = 0;
    var current = currPos();
    while(nums[index].number != current) {
        index++;
    }

    current = nums[index].number;
    // récupérer le nombre de cases jusqu'au nombre voulu
    while (current != number){
        current = nums[index].number;
        if (index >= nums.length - 1){
            index = 0;
        } else {
            index++;
        }
        its++;

        if (its > 1000) break;
    }

    console.log(its);

    return its;
}