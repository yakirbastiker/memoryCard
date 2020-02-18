let domAddCard = document.querySelector(".btn");
let domTextCard = document.querySelector("#card-text");
let domArrowRight = document.querySelector(".right-arrow");
let domArrowLeft = document.querySelector(".left-arrow");
let domFlip = document.querySelector(".flip");
let domCard = document.querySelector(".card");
let domContainer = document.querySelector(".container");
let domLowNum = document.querySelector("#lowNum");
let domahighNum = document.querySelector("#highNum");
let isFront;
let index;

let uiControl = (function () {

 return {
     init:  function () {
         isFront = true;
         index = 0;
     },
    update: function(str)  {
        if(isFront) {
            domTextCard.innerHTML = str;

        } else {
            domTextCard.innerHTML = str;
        }
        // add animation text
        domTextCard.animate([
            {width: 0},
            {width: "100%"}
        ], {
            duration:3500,

        });

        domTextCard.animate([
            {borderColor: "transparent"},
            {borderColor: "orange"}
        ],{
            duration:500,
            iterations: Infinity
        });

    },
    addInput: function (side) {

        let text;

        if(side === "front") {
            text = `
            <div class="popup center"> 
            <label for="input-front">Add front card</label>
            <input type="text" id="input-front" class="input">
            </div>         
            `;
        } else {
            text = `
            <div class="popup center"> 
            <label for="input-back">Add back card</label>
            <input type="text" id="input-back" class="input">
            </div>         
            `;
        }

        domContainer.innerHTML += text;
    },

    removeInput: function () {
        let popup = document.querySelector(".popup");
        domContainer.removeChild(popup);
    },


    showNum: function (high, low) {
        domahighNum.innerHTML = high;
        domLowNum.innerHTML = low;
    }
 }
});


let dataControl = (function () {

 return {
    data : [
        {front: "test front card", back:"test back card"},
        {front: "test front card2", back:"test back card2"},
        {front: "test front card3", back:"test back card3"},
        {front: "test front card4", back:"test back card4"},  
    ],

    addCard: function(frontText, backText) {
        this.data.push({
            front: frontText,
            back: backText
        });
    },

    checkLen: function() {
        return this.data.length
    }
 }    
});


let control =( function (UI, DATA) {
    //get data 

    //init app
    UI.init();
    UI.update(DATA.data[index].front);
    UI.showNum(DATA.checkLen(), index + 1);


    //events 
    domFlip.addEventListener("click", () => {
        isFront = !isFront;
        //flip here
        if(isFront) {
            UI.update(DATA.data[index].front);
        } else {
            UI.update(DATA.data[index].back);
        }
       
    });

    domArrowLeft.addEventListener("click", () => {
        isFront = true;
        index--;
        index < 0 ? index = DATA.data.length -1 : index;
        if(isFront) {
            UI.update(DATA.data[index].front);
        } else {
            UI.update(DATA.data[index].back);
        }

        UI.showNum(DATA.checkLen(), index);
    });
    domArrowRight.addEventListener("click", () => {
        isFront = true;
        index++;            
        index > DATA.data.length - 1 ? index = 0 : index;
        if(isFront) {
            UI.update(DATA.data[index].front);
        } else {
            UI.update(DATA.data[index].back);
        }

        UI.showNum(DATA.checkLen(), index + 1);
    });



    //add event add new card
    domAddCard.addEventListener("click", ()=>{  
        let valueFront, valueBack;
        //1 add input to add cards
        UI.addInput("front");
        //2 get value from inputs
        //input front 
        let inputFront = document.querySelector("#input-front");
        inputFront.addEventListener("keyup", (e)=>{
            if(e.keyCode === 13) {
                valueFront = e.target.value;
                UI.removeInput();

        //input back 
                
                UI.addInput("back");
                let inputBack = document.querySelector("#input-back");
                inputBack.addEventListener("keyup", (e)=>{
                    if(e.keyCode === 13){
                        valueBack = e.target.value;
                        UI.removeInput();

                        //DATA.addCard();
                        let newCard = {
                            front: valueFront,
                            back: valueBack
                        };
                        DATA.data.push(newCard);
                    }
                });
            }
        });

        
    

    });


    //flip event

    //text animaisn affect

})(uiControl(), dataControl());
