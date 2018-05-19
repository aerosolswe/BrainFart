var titleTextStyle = undefined;
var answerBoxTextStyle = undefined;
var questionBoxTextStyle = undefined;
var timeLeftTextStyle = undefined;

function createFontStyles() {
    
    titleTextStyle = new PIXI.TextStyle({
        fontFamily: 'Roboto',
        fontSize: 58,
        fontWeight: 'bold',
        fill: "#ffffff",
        stroke: 0x344043,
        strokeThickness: 2,
    });
    
    timeLeftTextStyle = new PIXI.TextStyle({
        fontFamily: 'Roboto',
        fontSize: 56,
        fontWeight: 'bold',
        fill: "#ffffff",
        stroke: 0x344043,
        strokeThickness: 2,
    });
    
    questionBoxTextStyle = new PIXI.TextStyle({
        fontFamily: 'Roboto',
        fontSize: 36,
        fontWeight: 'bold',
        fill: "white",
        stroke: 0x344043,
        strokeThickness: 5,
    });
    
    answerBoxTextStyle = new PIXI.TextStyle({
        fontFamily: 'Roboto',
        fontSize: 32,
        fontWeight: 'bold',
        fill: "white",
        stroke: 0x344043,
        strokeThickness: 2,
    });
    
}