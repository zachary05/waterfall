//预备一组数据
var data = {
    'img': [{
        'src': 'img_3.jpg'
    }, {
        'src': 'img_4.jpg'
    }, {
        'src': 'img_5.jpg'
    }, {
        'src': 'img_6.jpg'
    }]
}

window.onload = function () {
    waterfall('content', 'box');
}

window.onscroll = function () {
    var content = document.getElementById('content');
    for (var i = 0; i < data.img.length; i++) {
        if (isReadyScroll()) {
            var box = document.createElement('div');
            box.className = 'box';
            content.appendChild(box);

            var img = document.createElement('div');
            img.className = 'img';
            box.appendChild(img);

            var pic = document.createElement('img');
            pic.src = './images/' + data.img[i].src;
            img.appendChild(pic);
        }
    }
    waterfall('content', 'box');
}

function isReadyScroll() {
    var content = document.getElementById('content');
    var boxs = getBoxs(content, 'box');

    //获取最后一个盒子距离容器顶部的高度 + 自身高度的一半
    var lastBoxH = boxs[boxs.length - 1].offsetTop + Math.floor(boxs[boxs.length - 1].offsetHeight / 2);

    var docuH = document.documentElement.clientHeight; //页面高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动高度
    return (lastBoxH < docuH + scrollTop) ? true : false; // 到达指定高度返回ture，触发onscroll函数
}

function waterfall(parent, box) {
    var content = document.getElementById(parent);
    var boxs = getBoxs(content, box); //获取所有的盒子
    var boxW = boxs[0].offsetWidth;   //获取一个盒子的宽
    var num = Math.floor(document.documentElement.clientWidth / boxW); //获取一排能放盒子的数量
    content.style.cssText = 'width:' + boxW * num + 'px; margin: 0 auto;'; //设置容器的定宽，margin设置为auto使水平居中

    var boxHeightArr = []; //每个盒子高的数组
    for (var i = 0; i < boxs.length; i++) {
        var boxHeight = boxs[i].offsetHeight; //boxs[i]每个盒子的高
        if (i < num) {
            boxHeightArr[i] = boxHeight; //将第一排盒子的‘高’放入数组
        }else {
            var minH = Math.min.apply(null, boxHeightArr); //找到盒子中的最小高
            var minHIndex = getMinIndex(boxHeightArr, minH); //盒子中最小高的检索

            boxs[i].style.position = 'absolute';
            boxs[i].style.top = minH + 'px';

            //第一排盒子中 最小高的盒子 距离 容器左边的距离 设置为下一个盒子的左距离
            boxs[i].style.left = boxs[minHIndex].offsetLeft + 'px';

            boxHeightArr[minHIndex] += boxs[i].offsetHeight; //最小高的盒子 的高度 自加上新添加盒子的高度
        }
    }
}

function getMinIndex(arr, min) {
    for (var i in arr) {
        if (arr[i] === min) {
            return i;
        }
    }
}

function getBoxs(parent, box) {
    var arr = [];
    var tags = parent.getElementsByTagName('*');
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].className === box) {
            arr.push(tags[i]);
        }
    }
    return arr;
}
