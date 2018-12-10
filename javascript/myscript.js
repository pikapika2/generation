//--  時間表示

timerID = setInterval('clock()', 500);

function clock(){
	document.getElementById("view_clock").innerHTML = getnow();
}

var weeks = new Array('日','月','火','水','木','金','土');

function getnow(){
	var now = new Date();	
	var year = now.getYear(); // 年
	var month = now.getMonth() + 1; // 月
	var day = now.getDate(); // 日
	var week = weeks[ now.getDay() ]; // 曜日
	var hour = now.getHours(); // 時	
	var min = now.getMinutes(); // 分
	var sec = now.getSeconds(); // 秒

	if(year < 2000) { year += 1900; }

	// 数値が1桁の場合、頭に0を付けて2桁で表示する指定
	if(month < 10) { month = "0" + month; }	
	if(day < 10) { day = "0" + day; }
	if(hour < 10) { hour = "0" + hour; }
	if(min < 10) { min = "0" + min; }
	if(sec < 10) { sec = "0" + sec; }

	// 表示開始
	var x = ('現在：' + year + '年' + month + '月' + day + '日（' + week + '）'+ hour + '時' + min + '分' + sec + '秒');
	return x;
}

//--  ドラッグアンドドロップによる処理

var img = new Array();
var imgr = new Array();
var koko = "";			//ドラッグ中の画像のlogを格納

//画像の場所を格納させる関数(今回はthisを使いたかっただけ)
function Picture(n){
	this.n = new Image();
	this.n.src = n;
}

//画像への場所のための配列

img[0] = new Picture("img/dog.png");
img[1] = new Picture("img/dragon_yellow.png");
img[2] = new Picture("img/dragon_red.png");
img[3] = new Picture("img/dragon_blue.png");
img[4] = new Picture("img/dragon_black.png");
img[5] = new Picture("img/dragon_white.png");

//条件分岐のための配列

imgr[0] = "nochangerock.jpg";
imgr[1] = "kaminari.png";
imgr[2] = "fire.png";
imgr[3] = "suisosui.png";
imgr[4] = "alice.png";

//html上のモンスター画像の変更処理

function changeIMG(){
	switch(koko){
		case imgr[0] : document.getElementById("gazo").src=img[0].n.src; break;
		case imgr[1] : document.getElementById("gazo").src=img[1].n.src; break;
		case imgr[2] : document.getElementById("gazo").src=img[2].n.src; break;
		case imgr[3] : document.getElementById("gazo").src=img[3].n.src; break;
		case imgr[4] : timeChoice(); break;
	}
}

function timeChoice(){
	var now = new Date();
	if(now.getHours() >= 17 || now.getHours() < 5) {   //こいつだけさらに時間分岐
		document.getElementById("gazo").src=img[4].n.src;
	}else{
		document.getElementById("gazo").src=img[5].n.src;
	}

}

//　ドラッグ中の画像のlogの検出

document.getElementById("rock").ondragstart = function(e){

	koko = e.target.currentSrc.split("/").pop();
	console.log(koko);   //ログがちゃんと取れているかの確認用  
}