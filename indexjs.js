let inputDir = {x: 0, y: 0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound =  new Audio('music/music.mp3');
let speed = 6;
let score = 0;
let lastPaintTime = 0;
let board = document.getElementById('board');
let snakeArr = [
    {x: 13, y: 15}

]

let food = {x: 6, y: 7};
//speed Method
function speedChange()
{
	let speedChg = document.getElementById('speedCh').value;
	console.log(speedChg);
	if(speedChg==="Easy")
	{
		speed=3;
	}
	if(speedChg==="Normal")
	{
		speed=6;
	}
	if(speedChg==="Hard")
	{
		speed=15;
	}
	if(speedChg==="Hardest")
	{
		speed=19;
	}
}

//Game Function
function main(ctime)
{
window.requestAnimationFrame(main);	
//console.log(ctime);
if((ctime - lastPaintTime)/1000 < 1/speed)
{
	return;
}
	lastPaintTime = ctime;
	gameEngine();
}

// Collid Function
function isCollide(snake)
{
	//if snake Hit yourself
	for(let i = 1; i < snakeArr.length; i++)
	{
		if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
		{
			return true;
		}
	}
	
	// if snakes hits Dewaar
	if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0)
	{
		return true;
	}
	return false;
}



function gameEngine()
{
	// Part 1 Updating The Snake Arrray & Food
	if(isCollide(snakeArr))
	{
		gameOverSound.play();
		musicSound.pause();
		inputDir = {x: 0, y: 0};
		alert("Game Over. Press Any Key To Play");
		snakeArr = [{x: 13, y: 15}]
		musicSound.play();
		score = 0;
	}
	// if snake Eaten the Food, increment the scroe and regenrate the food 
	if(snakeArr[0].y === food.y && snakeArr[0].x === food.x)
	{
		foodSound.play();
		score +=1;
		if(score>higscoreval)
		{
			higscoreval = score;
			localStorage.setItem("higscore",JSON.stringify(higscoreval))
			highScore.innerHTML = "High Score : " + higscoreval;
		}
		scoreBox.innerHTML = "Score: " + score; 
		let a = 2;
		let b = 16;
		snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
		food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
		
	}
	
	//moving the snake
	for (let i= snakeArr.length-2; i>=0; i--)
	{
		
		snakeArr[i+1] = {...snakeArr[i]};
	}
	
	snakeArr[0].x += inputDir.x;
	snakeArr[0].y += inputDir.y;
	
	
	// Part 2 Dispaly THe Snake And Food
	//Dispaly The Snake
	board.innerHTML = "";
	snakeArr.forEach((e, index)=>{
	 	snakeElement = document.createElement('div');
		snakeElement.style.gridRowStart = e.y;
		snakeElement.style.gridColumnStart = e.x;
		//snakeElement.classList.add('snake');
		if(index===0){
		snakeElement.classList.add('head');
		}
		else{
		snakeElement.classList.add('snake');	
		}
		board.appendChild(snakeElement);
	})
	//Dispaly The Food
		foodElement = document.createElement('div');
		foodElement.style.gridRowStart = food.y;
		foodElement.style.gridColumnStart = food.x;
		foodElement.classList.add('food');
		board.appendChild(foodElement);	
		
		
		
}


// High scroe
	let higscore = localStorage.getItem("higscore");
	if(higscore === null)
	{
		higscoreval = 0;
		localStorage.setItem("higscore",JSON.stringify(higscoreval))
	}
	else
	{
		higscoreval = JSON.parse(higscore);
		highScore.innerHTML = "High Score : " + higscore;
	}


//Main Game logic

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
	inputDir = {x: 0, y: 1} // Start Game
	moveSound.play();
	switch(e.key)
	{
		case "ArrowUp":
			console.log("ArrowUp");
			inputDir.x = 0;
			inputDir.y = -1;
			break;
			
			
		case "ArrowDown":
			console.log("ArrowDown");
			inputDir.x = 0 ;
			inputDir.y = 1;
			break;
			
			
		case "ArrowLeft":
			console.log("ArrowLeft");
			inputDir.x = -1;
			inputDir.y = 0;
			break;
			
			
		case "ArrowRight":
			console.log("ArrowRight");
			inputDir.x = 1;
			inputDir.y = 0;
			break;
			
	}
});



