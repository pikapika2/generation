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
var liked = 0;
var flag_fairy = false;

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
img[6] = new Picture("img/blackdog.png");
img[7] = new Picture("img/creamdog.png");

//条件分岐のための配列

imgr[0] = "nochangerock.jpg";
imgr[1] = "kaminari.png";
imgr[2] = "fire.png";
imgr[3] = "suisosui.png";
imgr[4] = "alice.png";
imgr[5] = "heart.png";
imgr[6] = "pinkcd.png";
imgr[7] = "bokujou.png";

//html上のモンスター画像の変更処理

function changeIMG(){
	if(document.getElementById("gazo").src==img[0].n.src){   //イーブイの時に進化可能にする
		switch_eievui();
	}
	if(koko==imgr[0]){     //ただの石だったら無条件でイーブイに
		document.getElementById("gazo").src=img[0].n.src;
		liked = 0;
		flag_fairy = false;
	} 
}

function switch_eievui(){
	switch(koko){
		case imgr[1] : document.getElementById("gazo").src=img[1].n.src; break;
		case imgr[2] : document.getElementById("gazo").src=img[2].n.src; break;
		case imgr[3] : document.getElementById("gazo").src=img[3].n.src; break;
		case imgr[4] : likedChoice(); break;
		case imgr[5] : liked++; break;
		case imgr[6] : flag_fairy=true; break;
		case imgr[7] : positionChoice(); break;
	}
}

function likedChoice(){
	if(flag_fairy == true){
		if(liked >= 2){
			document.getElementById("gazo").src=img[6].n.src;
		}
	}else if(liked >= 5){
		timeChoice();
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


//　ドラッグ中の画像のlogの検出と保存
document.getElementById("rock").ondragstart = function(e){

	koko = e.target.currentSrc.split("/").pop();
	console.log(koko);   //ログがちゃんと取れているかの確認用  
}

function positionChoice(){

	//位置情報検出とその後の分岐
	navigator.geolocation.getCurrentPosition( successFunc , errorFunc ) ;
	function successFunc( position ){
		var pos = position.coords.latitude + position.coords.longitude;
		console.log(pos); //確認
		if(pos*1000 % 2 == 0){
			document.getElementById("gazo").src=img[6].n.src;
		}else{
			document.getElementById("gazo").src=img[7].n.src;
		}
	}		
	function errorFunc( error ){
		// エラーコードのメッセージを定義
		var errorMessage = {
			0: "原因不明のエラー、どうしようもない。" ,
			1: "位置情報の取得を許可してないの！？。" ,
			2: "電波状況などで位置情報が取得できないよ、通信状況よくしてねー。" ,
			3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました。" ,
		} ;

		// エラーコードに合わせたエラー内容をアラート表示
		alert( errorMessage[error.code] ) ;
		console.log(errorMessage[error.code]);
		console.log(error);
	}
}