var playing = false;
var score=0;
var timeRemaining=30;
var action;
var correctAnswer=null;
var operator=null;
var game=true;
var startBtn = document.getElementById("start");
var resetBtn = document.getElementById("resetBtn");
var skipBtn = document.getElementById("skip");
var highScore = localStorage.getItem("highscore");
hide("gameOverBox");
hide("tf");
hide("skip");
SetText("answer1","");
SetText("answer2","");
SetText("answer3","");
SetText("answer4","");
SetText("showHighScore",highScore);
SetText("hScore","HightScore:"+highScore);
startBtn.addEventListener("click",function(){
    startGame();
    generateQuestion();
});
resetBtn.addEventListener("click",function(){
    ResetGame();
    SetText("answer1","");
    SetText("answer2","");
    SetText("answer3","");
    SetText("answer4","");
});

skipBtn.addEventListener("click",function(){
    skipQuestion();
});

function startGame(){
    timeStart();
    hide("start");
    show("skip");
}
function skipQuestion(){
    // timeStart();
    hide("start");
    show("skip");
    generateQuestion();
}
function ResetGame(){
    timeStart();
    location.reload();
    game=true;
    timeRemaining=30;
    hide("gameOverBox");
    hide("start");
    show("skip");
}
function timeStart(){
   var action =  setInterval(function(){
       if(game==true)
       {timeRemaining-=1;}
        document.getElementById("time").innerHTML = timeRemaining;
            if(timeRemaining == 0)
            {//game over
                stopCountDown(action);
                show("gameOverBox");
                game=false;
                    if(score>highScore){
        localStorage.setItem("highscore",score);}
                // hide("time");
                // hide("right");
                // hide("wrong");
                // playing=false;
            }
        },1100);
}
function stopCountDown(action){
                clearInterval(action);
}
function generateQuestion(){

    setTimeout(
        function(){
            hide("tf");
        }
        
        ,2000);
    

    var first = Math.round(Math.random()*10);    
    var second = Math.round(Math.random()*10);    
    var op = Math.round(Math.random()*2);  
    var wfirst1 = Math.round(Math.random()*10);
    var wfirst2 = Math.round(Math.random()*10); 
    var wsecond1 = Math.round(Math.random()*10); 
    var wsecond2 = Math.round(Math.random()*10); 
    var wthird1 = Math.round(Math.random()*10); 
    var wthird2 = Math.round(Math.random()*10);
    var wfour1 = Math.round(Math.random()*10); 
    var wfour2 = Math.round(Math.random()*10);
    SetText("f",first); 
    //  generate true answer
    if(op==0){
        operator="-";
            correctAnswer = first - second;
        var wrongFirst = wfirst1-wfirst2; 
        var wrongSecond = wsecond1-wsecond2; 
        var wrongThird =  wthird1-wthird2;
        var wrongFour =  wfour1-wfour2;
    SetText("answer1",wrongFirst);
    SetText("answer2",wrongSecond);
    SetText("answer3",wrongThird);
    SetText("answer4",wrongFour);
    }else if(op==1){
        correctAnswer = first + second;
        operator="+";
    var wrongFirst = wfirst1+wfirst2; 
    var wrongSecond = wsecond1+wsecond2; 
    var wrongThird =  wthird1+wthird2;
    var wrongFour =  wfour1+wfour2;
    SetText("answer1",wrongFirst);
    SetText("answer2",wrongSecond);
    SetText("answer3",wrongThird);
    SetText("answer4",wrongFour);
    }else{
        correctAnswer = first * second;
        operator="*";
    var wrongFirst = wfirst1*wfirst2; 
    var wrongSecond = wsecond1*wsecond2; 
    var wrongThird =  wthird1*wthird2;
    var wrongFour =  wfour1*wfour2;
    SetText("answer1",wrongFirst);
    SetText("answer2",wrongSecond);
    SetText("answer3",wrongThird);
    SetText("answer4",wrongFour);
    }
    var loc = Math.round(Math.random()*3)+1;  
    SetText("o",operator);  
    SetText("s",second);  
    SetText("answer"+loc,correctAnswer);
}
function hide(id){      
    document.getElementById(id).style.display="none";      
}   
function show(id){      
    document.getElementById(id).style.display="block";      
}
function SetBg(id,bg){      
    document.getElementById(id).style.background=bg;      
}    
function SetText(id,txt){      
    document.getElementById(id).innerText=txt;      
}    

function chk(value){
    var trueAnswer = document.getElementById("answer"+value).innerText;

    if(trueAnswer==correctAnswer){
        show("tf");
        SetBg("tf","Green");
        SetText("tf","True");
        generateQuestion();
        score++;
        SetText("score",score);
    }
    else{
        show("tf");
        SetBg("tf","red");
        SetText("tf","False");
    }
}