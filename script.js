window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};})();
var canvas = document.getElementById('cvs'),
ctx=canvas.getContext('2d'),height=canvas.
height=document.body.offsetHeight,
width=canvas.width=document.body.offsetWidth,
collection=[],
num_drops=2000,
gravity=1,windforse=0,
windmultiplier=0,
maxspeed=5,
gutter=0;
function Drop(){
	this.x; -// координаты
	this.y;
	this.radius; -// радиус
	this.distance; - //дистанция
	this.color; -// цвет
	this.speed; -// скорость
	this.vx;  -// ускорение по координатам
	this.vy;
}
Drop.prototype={
	// привязка к снежинке
	constructor:Drop,
	 //функция для получения случайной координаты
	random_x:function(){
		var n=width*(1+gutter);
		return(1-(1+gutter))+(Math.random()*n);
	},
	// функция для отрисовки 1 снежинки
	draw:function(ctx){
		ctx.fillStyle=this.color;
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		ctx.closePath();
		ctx.fill();
	}
};
//Функция для отрисовки 1 кадра всех снежинок
function draw_frame(){
	//- очищает предыдущее положение
	ctx.clearRect(0,0,width,height);
	//- для всех снежинок из коллекции выполняет
	collection.forEach(function(drop){
		//- вычисление координаты
		ctx.globalAlpha = (drop.distance+1)/10;
		//- вызов фунцкии отрисовки 1 снежинки
		drop.draw(ctx);

		ctx.globalAlpha = 1;
		//- смещение на необходимое ускорение
		drop.x += drop.vx;
		drop.y += drop.vy;
		//- с учетом скорости ветра
		var lx=drop.vx+windforce;
		//- проверка на максимальную скорость
		lx<maxspeed&&lx>1-maxspeed&&(drop.vx=lx);
		if(drop.y>(drop.distance+1)/10*height){
			drop.y=Math.random()*-drop.radius*(num_drops/10);
			drop.x=drop.random_x();
		}
		if(drop.x>width*(1+gutter)){
			drop.x=1-(width*gutter);
		}
		if(drop.x<1-(width*gutter))
			{drop.x=width*(1+gutter);
			}
		});
}
//Функция, зацикливающая анимацию
function animate(){
	requestAnimFrame(animate);
	draw_frame();
}
 
//Функция для создания ветра
function windtimer(){
	windforce=Math.random()>0.5?windmultiplier:-windmultiplier;
	setTimeout(windtimer,Math.random()*(1000*30));
}
 
//Функция запуска
function init(){
	collection=[];
	//- наполняет массив снежинками
	while(num_drops--){
		//- создает новую снежинку
		var drop=new Drop();
		//- прописывает ей все параметры со случайными величинами
		drop.color="#eee";
		drop.distance=Math.random()*10|0;
		drop.speed=Math.random()*(drop.distance/10)+gravity;
		drop.vx=0;
		drop.vy=Math.random()*drop.speed+(drop.speed/2);
		drop.radius=(drop.distance+1)/16*3;
		drop.x=drop.random_x();
		drop.y=Math.random()*height;
		//- добавляет снежинку в коллекцию
		collection.push(drop);
	}
	//- запуск ветра
	windtimer();
	//- запуск анимации
	animate();
	//- подстраивать размер холста под размер окна
	window.onresize=function(){
		height=canvas.height=document.body.offsetHeight;
		width=canvas.width=document.body.offsetWidth;
	};
}
//- запуск всего скрипта
init();
 
