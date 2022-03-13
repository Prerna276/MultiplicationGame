var playing=false;
var score;
var timeremaining;
var action;
var correctAnswer;

//if we click on the start/reset
document.getElementById("startreset").onclick=function(){
    
    //if we are playing 
    if(playing==true){
        location.reload();//reload page
    }else{//if not playing
        
        playing=true;
        score=0;
        //set score to 0
        document.getElementById("scorevalue").innerHTML=score;
        //show countdown box
        document.getElementById("timeremaining").style.visibility="visible";
        timeremaining=60;
        document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        document.getElementById("gameover").style.display="none";
        hide("gameover");
        //change button to reset
        document.getElementById("startreset").innerHTML="Reset Game";
        //start countdown

        startcountdown();
        //gernerate question and multiple answers
        generateQA();
    }
}
//clicking on a answer box
for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick=function(){
    //check if we are playing
    if(playing==true){
        if(this.innerHTML==correctAnswer){
            //correct answer
            score+=1;
            document.getElementById("scorevalue").innerHTML=score;
            //hide wrong box
          //  hide("wrong");
            document.getElementById("game").style.visibility="hidden";
            document.getElementById("wrong").style.visibility="hidden";
            //show("correct");
            document.getElementById("correct").style.visibility="visible";
            setTimeout(function(){
                document.getElementById("correct").style.visibility="hidden";
                //hide("correct");
            },1000);
            //generate next question if the answer is correct
            generateQA();
        }
        else{
            //wrong answer
             //hide("correct");
             document.getElementById("correct").style.visibility="hidden";
            //show("wrong");
            document.getElementById("wrong").style.visibility="visible";
            setTimeout(function(){
               // hide("wrong");
                document.getElementById("wrong").style.visibility="hidden";
            },1000);
        }
    }
}
}
function startcountdown()  {
    action=setInterval(function(){
        timeremaining -=1;
        document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        if(timeremaining==0){
            //game over
            stopcountdowm();
            document.getElementById("gameover").style.visibility="visible";
            document.getElementById("gameover").innerHTML="<p>Game Over!<p><p>Your score is "+score +"</p>";
            document.getElementById("timereamining").style.visibility="hidden";
            //hide("correct");
            document.getElementById("correct").style.display="none";
            //hide("wrong");
            document.getElementById("wrong").style.display="none";
            playing=false;
            document.getElementById("startreset").innerHTML="Start Game";
        }
    },1000);

}
//functions
//startcounter
function stopcountdowm(){
    clearInterval(action);
}
function hide(id){
    document.getElementById(id).style.visibility="hidden";
}
function show(id){
    document.getElementById(id).style.visibility="visible";
}

function generateQA(){
    var x=1+Math.round(9*Math.random());
    var y=1+Math.round(9*Math.random());
    correctAnswer=x*y;
    document.getElementById("question").innerHTML=x+"x"+y;
    var correctposition=1+Math.round(3*Math.random());
    document.getElementById("box"+correctposition).innerHTML=correctAnswer;//fill one box with the correct answer
    //fill other box with wrong answers
    var answers = [correctAnswer];
    for(i=1;i<5;i++){
        if(i != correctposition){
            var wrongAnswer;
            do{
                wrongAnswer=(1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML=wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

