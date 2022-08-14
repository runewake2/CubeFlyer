var score = 0;
var scoreText;
var highScoreText2;
var highScore = 0;

var createHud = function() {
    var hudTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    // Create a Text Block that can display the current score
    scoreText = new BABYLON.GUI.TextBlock();
    scoreText.fontFamily = "Helvetica, sans-serif";
    scoreText.color = "white";
    scoreText.fontSize = 48;
    scoreText.verticalAlignment = BABYLON.GUI.TextBlock.VERTICAL_ALIGNMENT_TOP;
    scoreText.horizontalAlignment = BABYLON.GUI.TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
    scoreText.width = .5;
    scoreText.height = .15;

    // Create a High Score Text Block
    highScoreText2 = new BABYLON.GUI.TextBlock();
    highScoreText2.fontFamily = "Helvetica, sans-serif";
    highScoreText2.color = "white";
    highScoreText2.fontSize = 48;
    highScoreText2.verticalAlignment = BABYLON.GUI.TextBlock.VERTICAL_ALIGNMENT_TOP;
    highScoreText2.horizontalAlignment = BABYLON.GUI.TextBlock.HORIZONTAL_ALIGNMENT_LEFT;
    highScoreText2.width = .5;
    highScoreText2.height = .15;
    
    updateScoreText();

    hudTexture.addControl(scoreText);
}

var updateScoreText = function() {
    scoreText.text = "Score: " + score;
    if(score > highScore){
        highScore = score;
    }
    highScoreText2.text = "High Score: " + highScore;
}

var resetScore = function() {
    console.log("Score reset at: " + score);
    score = 0;
    updateScoreText();
}

var addScore = function(points) {
    score += points;
    updateScoreText();
}
