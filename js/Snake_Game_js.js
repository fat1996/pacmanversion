var duration=25;   //change this value if you want to change the duration of the game.

$(document).ready(function(){
	document.getElementsByName("score")[0].value=food_eaten;
	$( "input[name='submitbtn']").attr('hidden', true);   //the submit button is originally hidden. It only appears once the timer is up.
});

function submitinfo(){
$("#replay").css("display", "block");
$( "input[name='submitbtn']").attr('hidden', false);
}
setTimeout(submitinfo, 25000);

function runningtimer(){
duration--;
	if(duration>0){

	document.getElementById("timer").innerHTML=duration;
	setTimeout(runningtimer, 1000);
	}
	else{
		$("#timer").css("color", "red");
		$("#timer").css("font-size", "30px");
		document.getElementById("timer").innerHTML="TIME'S UP";
		$("#replay").css("display", "block");
		$("#food").css("background-color", "black");
		// document.getElementById("score").innerHTML=food_eaten;
		document.getElementsByName("score")[0].value=food_eaten;
		document.getElementById("gamescore").innerHTML=food_eaten;
	}
}
setTimeout(runningtimer, 1000);

function reset(){
	 location.reload();  //reloads the entire document.

}



var a, b, c, d;
var food_eaten=0;
	function snakeright(){

		a = setInterval(function(){
		$("#snake").css("border-left", "10px solid #ffde00");	
		$("#snake").css("border-right", "10px solid transparent");
		$("#snake").css("border-bottom", "10px solid #ffde00");
		$("#snake").css("border-top", "10px solid #ffde00");

		setTimeout(function(){
			$("#snake").css("border-right", "10px solid #ffde00");
		}, 500);
		}, 750);	
	}

	 function goleft(){

	 	b= setInterval(function(){
		$("#snake").css("border-left", "10px solid transparent");
		$("#snake").css("border-right", "10px solid #ffde00");
		$("#snake").css("border-bottom", "10px solid #ffde00");	
		$("#snake").css("border-top", "10px solid #ffde00");	
	
		setTimeout(function(){
			$("#snake").css("border-left", "10px solid #ffde00");	
		}, 500);
	 	}, 750);	
	}

	function snakedown(){
		c= setInterval(function(){
		$("#snake").css("border-bottom", "10px solid transparent");
		$("#snake").css("border-right", "10px solid #ffde00");
		$("#snake").css("border-left", "10px solid #ffde00");	
		$("#snake").css("border-top", "10px solid #ffde00");

		setTimeout(function(){
			$("#snake").css("border-bottom", "10px solid #ffde00");
		}, 500);
		}, 750);	
	}

	function goup(){
		d= setInterval(function(){
		$("#snake").css("border-top", "10px solid transparent");
		$("#snake").css("border-left", "10px solid #ffde00");
		$("#snake").css("border-bottom", "10px solid #ffde00");	
		$("#snake").css("border-right", "10px solid #ffde00");

		setTimeout(function(){
			$("#snake").css("border-top", "10px solid #ffde00");
		}, 500);
		}, 750);	
	}

snakeright();   //this is the starting position of the snake. Don't remove this. The snake's mouth is oriented this way when the game starts.


//These bounds are the extremes of the baord on which the game is being played(canvas).The snake can't go beyond these.
var topbound=0;
var btmbound=0;
var leftbound=0;
var rightbound=0;

var snaketop=0;
var snakeleft=0;

var y=0;
var x=0;

var foodtop=0;
var foodleft=0;

//var canvastop=0;
//var canvasleft=0;

function getSnakePos(){
		snaketop=$("#snake").position().top;
		snakeleft=$("#snake").position().left;
		//console.log("Using position, Top: "+snaketop+", Left: "+ snakeleft);
	}

	function newSnake(){
		console.log("Using position, Top(y): "+snaketop+", Left(x): "+ snakeleft);
	}

var canvasheight=0;
var canvaswidth=0;


getSnakePos();
newSnake();
calculatebounds();
newFoodPos();

function calculatebounds(){
	canvasheight=$("#container").height();
	canvaswidth=$("#container").width();

	//Our snake doesn't have a height and width(its sets equal to 0 in the CSS), but it does have dimensions. Those dimensions are needed here. There's essentially 20 by 20.
	// var snakeheight=$("#snake").height();
	// var snakewidth=$("#snake").width();
	var snakeheight=20;
	var snakewidth=20;

	//console.log("snakeheight: "+snakeheight+", snakewidth: "+snakewidth);
		topbound=$("#snake").position().top;  
		btmbound=$("#snake").position().top + canvasheight - snakeheight;
		leftbound=$("#snake").position().left;
		rightbound=$("#snake").position().left + canvaswidth - snakewidth;		

console.log("TopBound: "+topbound+
			", Bottom Bound: "+btmbound+
			", LeftBound: "+leftbound+
			", RightBound: "+rightbound);
}

function newFoodPos(){
	//this new position has to be created using the bounds calculated from the above function.
	//what is the range?
	var foodheight=$("#food").height();
	var foodwidth=$("#food").width();

	//generate a number between the top and btm bounds.
	var maxheight=btmbound;
	var minheight=topbound;
	var maxwidth=rightbound;
	var minwidth=leftbound;

	//generate a number between the left and right bounds.
	y=Math.floor(Math.random() * (maxheight - minheight)) + minheight;
	x=Math.floor(Math.random() * (maxwidth - minwidth)) + minwidth;

	console.log("y coord: "+y+", x coord: "+x);

	//You need slight modifications to the x and y coordinates generated to enable perfect collisions between the food and snake.
	//otherwise, the collision is slightly off.
	var ydiff=(y-topbound)%10;
	y=y-ydiff;
	var xdiff=(x-leftbound)%10;
	x=x-xdiff;
	console.log("The final coordinates are: "+x+", "+y);
	$('#food').css("top", y); 
	$('#food').css("left", x); 		

}

function detectcoll(){
	//x and y are the food coordinates(constants).
	if( (y==snaketop && (x==snakeleft-10 || x==snakeleft+10)) || (x==snakeleft && (y==snaketop-10 || y==snaketop+10))) {
		console.log("DETECTED a COLLISION");
		++food_eaten;
		// document.getElementById("score").innerHTML=food_eaten;
		document.getElementsByName("score")[0].value=food_eaten;

		//console.log("Number of food pieces eaten: "+food_eaten);
		newFoodPos();
	}
}

$(document).keydown(function(e)
{
	clearInterval(a);
	clearInterval(b);
	clearInterval(c);
	clearInterval(d);
	if(topbound==snaketop && rightbound==snakeleft){
		//don't allow it to go upwards or rightwards.
		switch (e.which){

	   case 37:    //left arrow key
	   		goleft();
	        $("#snake").finish().animate({
	            left: "-=10"
	        });
	        snakeleft=snakeleft-10;
	        newSnake();
	        detectcoll();
	        break;

	   case 40:    //bottom arrow key
	   snakedown();
	        $("#snake").finish().animate({
	            top: "+=10"
	        });
	        snaketop=snaketop+10;
	        detectcoll();
	        break;

	   default:
	   		console.log("Sorry, I don't recognize this key.");
	}
	}
	

	else if(topbound==snaketop && leftbound==snakeleft){
		switch(e.which){

	    case 39:    //right arrow key
	    snakeright();
	        $("#snake").finish().animate({
	            left: "+=10"  
	        });
	        snakeleft=snakeleft+10;
	        newSnake();
	        detectcoll();
	        break;

	    case 40:    //bottom arrow key
	    snakedown();
	        $("#snake").finish().animate({
	            top: "+=10"
	        });
	        snaketop=snaketop+10;
	        newSnake();
	        detectcoll();
	        break;
	}
	}

	else if(btmbound==snaketop && rightbound==snakeleft){
		switch(e.which){
		   case 37:    //left arrow key
		   goleft();
        $("#snake").finish().animate({
            left: "-=10"
        });
        snakeleft=snakeleft-10;
        newSnake();
        detectcoll();
        break;

    case 38:    //up arrow key
    goup();
        $("#snake").finish().animate({
            top: "-=10" 
        });
        snaketop=snaketop-10;
        newSnake();
        detectcoll();
        break;
	}
	}

	else if(btmbound==snaketop && leftbound==snakeleft){
		switch(e.which){

    case 38:    //up arrow key
    goup();
        $("#snake").finish().animate({
            top: "-=10" 
        });
        snaketop=snaketop-10;
        newSnake();
        detectcoll();
        break;

    case 39:    //right arrow key
    snakeright();
        $("#snake").finish().animate({
            left: "+=10"  
        });
        snakeleft=snakeleft+10;
        newSnake();
        detectcoll();
        break;
	}
	}

	else if(btmbound==snaketop){
		//don't allow it to go downwards.
		switch(e.which){
		   case 37:    //left arrow key
		   goleft();
        $("#snake").finish().animate({
            left: "-=10"
        });
        snakeleft=snakeleft-10;
        newSnake();
        detectcoll();
        break;

    case 38:    //up arrow key
    goup();
        $("#snake").finish().animate({
            top: "-=10" 
        });
        snaketop=snaketop-10;
        newSnake();
        detectcoll();
        break;

    case 39:    //right arrow key
    snakeright();
        $("#snake").finish().animate({
            left: "+=10"  
        });
        snakeleft=snakeleft+10;
        newSnake();
        detectcoll();
        break;
	}
	}

	else if(leftbound==snakeleft){
		//going left not allowed.
		switch(e.which){

    case 38:    //up arrow key
    goup();
        $("#snake").finish().animate({
            top: "-=10" 
        });
        snaketop=snaketop-10;
        newSnake();
        detectcoll();
        break;

    case 39:    //right arrow key
    snakeright();
        $("#snake").finish().animate({
            left: "+=10"  
        });
        snakeleft=snakeleft+10;
        newSnake();
        detectcoll();
        break;

    case 40:    //bottom arrow key
    snakedown();
        $("#snake").finish().animate({
            top: "+=10"
        });
        snaketop=snaketop+10;
        newSnake();
        detectcoll();
        break;
	}
	}

	else if(rightbound==snakeleft){
//going right not allowed.
		switch(e.which){
		   case 37:    //left arrow key
		   goleft();
        $("#snake").finish().animate({
            left: "-=10"
        });
        snakeleft=snakeleft-10;
        newSnake();
        detectcoll();
        break;

    case 38:    //up arrow key
    goup();
        $("#snake").finish().animate({
            top: "-=10" 
        });
        snaketop=snaketop-10;
        newSnake();
        detectcoll();
        break;

    case 40:    //bottom arrow key
    snakedown();
        $("#snake").finish().animate({
            top: "+=10"
        });
        snaketop=snaketop+10;
        newSnake();
        detectcoll();
        break;
	}
	}

	else if(topbound==snaketop){
//going right not allowed.
		switch(e.which){
		   case 37:    //left arrow key
		   goleft();
        $("#snake").finish().animate({
            left: "-=10"
        });
        snakeleft=snakeleft-10;
        newSnake();
        detectcoll();
        break;

        case 39:    //right arrow key
        snakeright();
        $("#snake").finish().animate({
            left: "+=10"  
        });
        snakeleft=snakeleft+10;
        newSnake();
        detectcoll();
        break;

    case 40:    //bottom arrow key
    snakedown();
        $("#snake").finish().animate({
            top: "+=10"
        });
        snaketop=snaketop+10;
        newSnake();
        detectcoll();
        break;
	}
	}

	else{
	switch(e.which){
		   case 37:    //left arrow key
		   goleft();
        $("#snake").finish().animate({
            left: "-=10"
        });
        snakeleft=snakeleft-10;
        newSnake();
        detectcoll();
        break;

    case 38:    //up arrow key
    goup();
        $("#snake").finish().animate({
            top: "-=10" 
        });
        snaketop=snaketop-10;
        newSnake();
        detectcoll();
        break;

    case 39:    //right arrow key
    snakeright();
        $("#snake").finish().animate({
            left: "+=10"  
        });
        snakeleft=snakeleft+10;
        newSnake();
        detectcoll();
        break;

    case 40:    //bottom arrow key
    snakedown();
        $("#snake").finish().animate({
            top: "+=10"
        });
        snaketop=snaketop+10;
        newSnake();
        detectcoll();
        break;
	}
	}
});
	




      



var foodtop=0;
	var foodleft=0;
	var foodbtm=0;
	var foodright=0;

	


    
	
	
	function getFoodPos(){
		foodtop=$("#food").offset().top;
foodleft=$("#food").offset().left;
foodbtm=$("#food").offset().top + $("#food").height();
foodright=$("#food").offset().left + $("#food").width();
	
	document.getElementById("food-location").innerHTML="Top: "+foodtop+" Left: "+foodleft+" Bottom: "+foodbtm+" Right: "+foodright;
	}
