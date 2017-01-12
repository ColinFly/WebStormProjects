//获取棋盘上下文
var chess = document.getElementById("chess");
var context = chess.getContext('2d');

context.strokeStyle = "#BFBFBF";

var me = true;
//试着画一条对角线
/*
 context.moveTo(0, 0);
 context.lineTo(450, 450);
 context.stroke();
 */

//点不能交叉，需要一个二维数组进行限制
//初始化数组
var chessBoard = [];
for (var i=0;i<15;i++) {
    chessBoard[i] = [];
    for (var j=0;j<15;j++) {
        chessBoard[i][j] = 0;
    }
}


var logo = new Image();
logo.src = "images/logo1.png";

//棋子
 function onStep(i, j, me) {
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2,13,
        15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    if (me) {
        gradient.addColorStop(0, "#0A0A0A");
        gradient.addColorStop(1, "#636766");
    } else {
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
    }
    context.fillStyle = gradient;
    context.fill();
}


//画logo的时候图片加载需要时间，应该等图片加载完了的回调再显示图片画棋盘
logo.onload = function () {
    context.drawImage(logo, 0, 0, 450, 450);
    drawChessboard();
};


//棋盘有15条线，14个间隔，再加留白,竖线，所以x变化,y不变
function drawChessboard() {
    for (var i = 0; i < 15; i++) {
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.stroke();
        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();
    }
}


//棋盘的点击事件
chess.onclick = function (e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if (chessBoard[i][j]==0) {
        onStep(i, j, me);
        me = !me;
        if (me) {
            chessBoard[i][j] =1;
        }else {
            chessBoard[i][j] =2;
        }
    }
};
