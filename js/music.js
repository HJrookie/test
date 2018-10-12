var audio=document.getElementById('audio');
var prev=document.getElementById('prev');
var next=document.getElementById('next');
var music_fengmian = document.getElementById('music-fengmian');
var play = document.getElementById('play');
var source=document.getElementsByTagName('source');
var jingyin=document.getElementById('jingyin');
var loop=document.getElementById('loop');
var title=document.getElementById('title');

var loopState=new Array("列表","单曲","随机");
var loopStateVar=0;
var currentMusic=0;  //当前音乐的位置
var volume_flag=false;  //音量是否静音
var flag = false;    //是否在旋转


jingyin.onclick=setVolume;
play.onclick = rotate;
loop.onclick=changeLoopState;
prev.onclick = function(){
	changeMusic('prev');
}
next.onclick = function(){
	changeMusic('next');
}


function rotate() {
	if (!flag) {
		audio.play();
		this.innerHTML='Pause';
		music_fengmian.style.animation = "15s linear 0s normal none infinite rotate";
		flag=true;
	}else{
		this.innerHTML='Play';
		music_fengmian.removeAttribute('style');
		flag=false;
		audio.pause();
	}
}
function changeMusic(direct) {
	if (loop.innerHTML == "列表") {

		if (direct == "prev") {
			currentMusic--;
		} else {
			currentMusic++;
		}
	} else if (loop.innerHTML =="单曲") {
		audio.currentTime = 0;
		audio.load();
	}else if(loop.innerHTML	==	"随机"){
		var tt=currentMusic;
		while(currentMusic==tt){
			currentMusic=Math.round(Math.random()*100%source.length); 
		}
	}
	currentMusic = (currentMusic + source.length) % source.length;
	var currentSrc = source[currentMusic].getAttribute('src');
	var currentImg = source[currentMusic].getAttribute('data-img');
	music_fengmian.setAttribute('src', currentImg);
	audio.setAttribute('src', currentSrc);
	title.innerHTML=document.getElementsByTagName('source')[currentMusic].getAttribute('title');  //获取音乐名称
//	title.innerHTML=audio.getAttribute('source').getAtribute('title');
	play.innerHTML = 'Pause';
	audio.play();
	flag = 1;
	music_fengmian.style.animation = "15s linear 0s normal none infinite rotate"; 
}
function setVolume(){
	if(!volume_flag){
     temp=audio.volume;   //全局变量
	audio.volume=0;
	volume_flag=true;
	jingyin.innerHTML='取消';
	}
	else{
		audio.volume=temp;
		jingyin.innerHTML='静音';
		volume_flag=false;
	}
}
function changeLoopState(){
	loopStateVar++;
	loop.innerHTML=loopState[loopStateVar % loopState.length];
	
}