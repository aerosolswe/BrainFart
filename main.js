var app = undefined;

// Game title
var gameTitle = "Brain fart";

// Game root
var gameContainer = undefined;

// Menu root
var menuContainer = undefined;

// Quiz root
var quizContainer = undefined;

// Title variables
var titleText = undefined;
var titleTextContainer = undefined;
var quizTime = 11000;

// Time left variables
var timeLeftText = undefined;
var timeInterval = undefined;

var answerContainer = undefined;
var questionContainer = undefined;

function setup() {
    app = new PIXI.Application(480, 800, {
        backgroundColor: 0x344043,
        antialias: true,
    });
    document.body.appendChild(app.view);

    gameContainer = new PIXI.Container();
    app.stage.addChild(gameContainer);
    
    menuContainer = new PIXI.Container();
    gameContainer.addChild(menuContainer);
    
    quizContainer = new PIXI.Container();
    gameContainer.addChild(quizContainer);
    
    createFontStyles();

    createTitleText();
    createTimeLeftText();
    
    answerContainer = new PIXI.Container();
    answerContainer.position.set(0, 800 - 100);
    questionContainer = new PIXI.Container();
    quizContainer.addChild(answerContainer);
    quizContainer.addChild(questionContainer);
    
    newQuestion("(1 + 5) * 5", ["26", "30", "25", "0"], "30");
}

function newQuestion(question, answers, correctAnswer) {
    for(let i = 0; i < answerContainer.children.length; i++) {
        answerContainer.children[i].visible = false;
    }
    
    for(let i = 0; i < questionContainer.children.length; i++) {
        questionContainer.children[i].visible = false;
    }
    
    createQuestionCard(question);
    
    createAnswerCard(answers[0], correctAnswer, 0, 0);
    createAnswerCard(answers[1], correctAnswer, 480 / 2, 0);
    createAnswerCard(answers[2], correctAnswer, 0, -100);
    createAnswerCard(answers[3], correctAnswer, 480 / 2, -100);
    
    startTimer();
}

function startTimer() {
    var d2 = new Date().getTime();
    d2 += quizTime;
    
    var d1 = new Date().getTime();
    var distance = d2 - d1;

    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    timeInterval = setInterval(function() {
        d1 = new Date().getTime();
        distance = d2 - d1;
    
        seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
        timeLeftText.text = seconds + "s";
        
        if(seconds <= 0) {
            timeLeftText.text = "0s";
            stopInterval();
        }
    }, 100);
    
    timeLeftText.anchor.set(0.5, 0.5);
    timeLeftText.position.set(480 / 2, 525);
}

function stopInterval() {
    clearInterval(timeInterval);
}

function processAnswer(correctAnswer) {
    
    var waitInterval = setInterval(function() {
        clearInterval(waitInterval);
        newQuestion("5 + 10", ["5", "10", "15", "20"], "15")
    }, 3000);
}

function createTitleText() {
    titleText = new PIXI.Text(gameTitle, titleTextStyle);
    titleText.anchor.set(0.5, 0.5);
    titleText.position.set(480 / 2, 50);
    gameContainer.addChild(titleText);
}

function createTimeLeftText() {
    timeLeftText = new PIXI.Text(10 + "s", timeLeftTextStyle);
    
    timeLeftText.anchor.set(0.5, 0.5);
    timeLeftText.position.set(480 / 2, 525);
    
    quizContainer.addChild(timeLeftText);
}

function createAnswerCard(answer, correctAnswer, x, y) {
    var roundedRect = new PIXI.Graphics();
    var padding = 5;
    
    var width = (480 / 2) - (padding);
    var height = 100 - (padding);
    
    roundedRect.beginFill(0xffffff, 0.5);
    roundedRect.drawRoundedRect((padding / 2), (padding / 2), width, height, 5);
    roundedRect.endFill();
    
    roundedRect.position.set(x, y);
    answerContainer.addChild(roundedRect);
    
    roundedRect.interactive = true;
    roundedRect.buttonMode = true;
    
    var text = new PIXI.Text(answer, answerBoxTextStyle);
    text.anchor.set(0.5, 0.5);
    text.position.set(width / 2, height / 2);
    roundedRect.addChild(text);
    
    roundedRect.setColor = function() {
        var correctColor = 0x58ff00;
        var wrongColor = 0xff0000;
        
        var selectedColor = wrongColor;
        if(answer == correctAnswer)
            selectedColor = correctColor;
        
        roundedRect.clear();
        
        roundedRect.beginFill(selectedColor, 0.5);
        roundedRect.drawRoundedRect((padding / 2), (padding / 2), width, height, 5);
        roundedRect.endFill();
        
        roundedRect.buttonMode = false;
        roundedRect.interactive = false;
    };
    
    roundedRect.on('pointerdown', (event) => {
        for(let i = 0; i < answerContainer.children.length; i++) {
            answerContainer.children[i].setColor();
        }
        
        var correctAnswer = answer == correctAnswer;
        
        stopInterval();
        processAnswer(correctAnswer);
    });
}

function createQuestionCard(question) {
    var roundedRect = new PIXI.Graphics();
    var padding = 5;
    
    var width = (480) - (padding);
    var height = 300 - (padding);
    
    roundedRect.beginFill(0xffffff, 0.5);
    roundedRect.drawRoundedRect((padding / 2), (padding / 2), width, height, 5);
    roundedRect.endFill();
    
    roundedRect.position.set(0, 150);
    questionContainer.addChild(roundedRect);
    
    var text = new PIXI.Text(question, questionBoxTextStyle);
    text.anchor.set(0.5, 0.5);
    text.position.set(width / 2, height / 2);
    roundedRect.addChild(text);
    
}
