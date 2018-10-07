windows.onload=function(){
	var audio=document.getElementById(audio);
	var music_list=document.getElementsByTagName("source");
	var xunhuan=document.getElementById(xunhuan);
	var prev=document.getElementById(prev);
	var play=document.getElementById('play');
	var mext=document.getElementById(next);
	var jingyin=document.getElementById(jingyin);
	var music_fengmian=document.getElementById(music-fengmian);
	var currentSrcIndex=0;
	
	audio.loop=false;     //是否单曲循环 
	audio.autoplay=false;  //自动播放
	audio.volume=0.5;
	audio.autobuffer=false;  //是否自动缓冲加载

/*	play.onclick  =  function(){
		if(audio.paused){
			audio.play();
			this.innerHTML="Pause";
			music_fengmian.style.animation = 'xuanzhuan 5s linear infinite';   //css3  旋转速度恒定  无限次
		}else{
			audio.paused;
			this.innerHTML="Play";
			music_fengmian.removeAttribute(style);
		}		
	}
*/
	function rotate(){
		var deg=0;
		var flag=1;
		timer=setInterval(function(){
			music_fengmian.style.transform="rotate:("+deg+"deg)";
			deg+=9;
			if(deg>360)
				{
				deg=0;
				}
		},25);
	}
	prev.onclick = function(){
		changeMusic("prev");
	}
	next.onclick = function(){
		changeMusic("next");
	}
	function changeMusic(direct){
		if (direct === 'next') {
			++ currentSrcIndex > sourceList.length - 1 && (currentSrcIndex = 0); // 下一曲
		} else {
			-- currentSrcIndex < 0 && (currentSrcIndex = sourceList.length -1); // 上一曲
		}
		currentSrc = sourceList[currentSrcIndex].getAttribute('src');
		currentImg = sourceList[currentSrcIndex].getAttribute('data-img')
		musicImg.setAttribute('src', currentImg);
		audio.setAttribute('src', currentSrc);
		audio.play();
		play.innerHTML = 'Pause';
		musicImg.style.animation = 'xuanzhuan 5s linear infinite';	
	}
	
	xunhuan.onclick = function () {
		if (audio.loop) {
			audio.loop = false;
			this.innerHTML = '循环';
		} else {
			audio.loop = true;
			this.innerHTML = '单曲';
		}
	};
	var toPlay = document.getElementById('to-play'); // 立即播放按钮
	var result = document.getElementById('result'); // 结果区

	// 利用委托来为立即播放绑定事件
	result.addEventListener('click', function (ev) {
		var t = ev.target || ev.srcElement;
		if (t.tagName === 'A') {
			var oMusicSrc = result.getAttribute('data-audio');
			var oMusicImg = result.getAttribute('data-img');
			var oMusicName = result.getAttribute('data-music');
			var oSinger = result.getAttribute('data-singer');
			musicImg.setAttribute('src',oMusicImg);
			musicTitle.innerHTML = oMusicName + '-' + oSinger;
			audio.setAttribute('src', oMusicSrc);
			audio.play();
			play.innerHTML = 'Pause';
			musicImg.style.animation = 'xuanzhuan 5s linear infinite';
		}

	});
	function CreateScript (src) {
		var el = document.createElement('script');
		el.src = src;
		el.async = true;
		el.defer = true;
		document.body.appendChild(el);
	};
}