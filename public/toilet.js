$(document).ready(()=> { // jQuery main
	let stage = new createjs.Stage(canvas);
	let repo = new createjs.LoadQueue();
	let scene = 0;
	let scale=0.24
    let location=0;
	let question_n=0;
var order = [0]
var ifClick = false
	let question=["是男生還是女生？", "身上是否有揹包包？"," 身上是否有隨身攜帶衛生紙？"," 平常是否有無便秘？"," 大便時喜歡使用的馬桶型式"," 目前的感情狀況？"," 昨晚睡得好不好？"," 今天天氣如何？"," 大號時喜歡使用的衛生紙型式？"," 有沒有很多的朋友？"," 想不想要在大便時來杯咖啡？"," 喜不喜歡運動員的汗水味？"," 想不想要來個驚喜嗎？"," 喜不喜歡屎尿的騷味？"," 早餐有沒有喝大冰奶？"," 會不會擔心跟太多人搶廁所嗎？"," 比較喜歡吃菜還是吃肉？"," 昨天有沒有吃麻辣鍋？"," 昨天有沒有吃金針菇？"," 昨天有沒有吃紅龍果？"," 喜不喜歡吃芙蓉煎蛋飯？"," 喜不喜歡吃德合香早餐？"," 今天是不是穿白色衣服？"]
    let option = [["男生","女生"],["是","否"],["是","否"],["是","否"],["蹲式","坐式"],["單身","有伴"],["好","不好"],["晴天","雨天"],["抽取式","平板式"],["我超夯","我超邊緣"],["想","不想"],["喜歡","不喜歡"],["想","不太想"],["喜歡","很喜歡"],["有","沒有"],["會","不會"],["吃菜","吃肉"],["有","沒有"] ,["有","沒有"] ,["有","沒有"] ,["喜歡","不喜歡"] ,["喜歡","不喜歡"] ,["是","否"]]
    let score=[[[1,2,3,4,5,6,7,9,10,11,12,13,14,15],[1,2,3,4,5,6,7,9,10,11,12,13,14,15]],[[1,2,3,4,5,6,7,9,10,11,12,13,14],[]],[[3,4,5,6,7,9,10,11,12,13],[]],[[1,2,3,5,6,7,10,11,12,13],[]],[[1,2,3,4,5,6,7,9,10,11,12,13,14],[]],[[ 1,3,5,7,9,11,13,15],[]],[[],[3,4,5,6,7,9,10,11,12,13]],[[],[1,2,3,5,6,7,10,11,12,13,14]],[[],[]],[[7,9,10,14],[7,9,10,14]],[[12,12,12],[1,2,3,4,5,6,7,9,10,11,13,14,15]],[[11,11,11],[1,2,3,4,5,6,7,9,10,12,13,14,15]],[[5,5,5,5,5,5,5,5,5,5,15,15,15,15,15,15,15,15,15,15],[]],[[],[2,2,2,9,9,9,10,10,10,14,14,14,15,15,15]],[[1,4,5,6,11,13],[]],[[1,2,3,4,5,6,11,12,13,15],[7,9,10,14]],[[2,9,10,14,15],[1,3,4,5,6,7,11,12,13]],[[2,3,5,15],[]],[[],[]],[[],[]],[[],[]],[[2,3,5,15],[]],[[2,4,5,6,7,11,13],[]]]
    let  location_score=[[6,6,6,14,14,14,12,12,12],[4,4,4,14,14,14],[9,9,9,9,9,10,10,10,10,10,10,11,11,11,11,11],[1,1,1,2,2,2,3,3,3,13,13,13],[7,7,7],[10,10,10,15,15,15]]
    let score_total=[]
function setup() {
    // automatically update
    createjs.Ticker.on("tick", e => stage.update());
    createjs.Ticker.framerate = 60;
    // load asset

    repo.loadManifest([
    	//start
    	{id: 'start_bg', src: "images/start/start_background.png"},
        {id: 'start_b', src: "images/start/start_buttom.png"},
        {id: 'start_b_s', src: "images/start/start_buttom_s.png"},
		//intro
        {id: 'intro_bg', src: "images/intro/instruction_background.png"},
        {id: 'ok', src: "images/intro/ok_buttom.png"},
        {id: 'ok_s', src: "images/intro/ok_buttom_s.png"},
        //map
        {id: 'map_full', src: "images/map/map_full_tint.png"},
        {id: 'map_1' ,src : "images/map/map_左上(86,295.8).png"},
        {id: 'map_2' ,src : "images/map/map_中上(637.2,273.3).png"},
        {id: 'map_3' ,src : "images/map/map_右上(1016,250.2).png"},
        {id: 'map_4' ,src : "images/map/map_左下(47,485.5).png"},
        {id: 'map_5' ,src : "images/map/map_中下(528.4,485.5).png"},
        {id: 'map_6' ,src : "images/map/map_右下(923.1,555).png"},
        //question
        {id:'question_bg',src:"images/question/question_background.png"},
        {id:'bar',src:"images/question/bar.png"},
        {id:'bar_bg',src:"images/question/question_bar.png"},
        {id:'blood',src:"images/question/question_bar_blood.png"},
        {id:'shit',src:"images/question/shit_h.png"},
        //toilet
        {id:'again',src:"images/toilet/again_buttom.png"},
        {id:'again_s',src:"images/toilet/again_buttom(shadow).png"},
        {id:'comment',src:"images/toilet/goComment_buttom.png"},
        {id:'comment_s',src:"images/toilet/goComment_buttom(shadow).png"},
        //comment
        {id:'comment_bg',src:"images/comment/comment_background.png"}
    	]);
    for(let i=5;i<=22;i++)
    {
        let j=i-4
        repo.loadManifest([{id:'normal_q_'+i,src:"images/question/搞笑題目/Q2_"+j+".png"}]);
    }
    for(let i=0;i<=4;i++)
    {
        repo.loadManifest([{id:'normal_q_'+i,src:"images/question/正常題目/Q1_"+i+".png"}]);
    }
    for(let i=1;i<=15;i++)
    {
        if(i!=8)
        {
            repo.loadManifest([{id:'toilet_'+i,src:"images/toilet/toilet/toilet_"+i+".png"}]);
        }
    }

    repo.on('complete', draw);
}

function draw() {
    if (scene == 0) {
        let start_bg = new createjs.Bitmap(repo.getResult('start_bg'));
        let start_b = new createjs.Bitmap(repo.getResult('start_b'));
        let start_b_s = new createjs.Bitmap(repo.getResult('start_b_s'));
        start_bg.set({x: 0, y: 0, scaleX: scale, scaleY: scale});
        start_b.set({x: 600 - start_b.image.width * scale / 2, y: 3350 * scale, scaleX: scale, scaleY: scale});
        start_b_s.set({x: 600 - start_b.image.width * scale / 2, y: 3350 * scale, scaleX: scale, scaleY: scale});
        stage.addChild(start_bg);
        stage.addChild(start_b);
        stage.addEventListener("stagemousemove", function () {
            if (stage.mouseX >= start_b.x && stage.mouseX <= start_b.x + start_b.image.width * scale && stage.mouseY >= start_b.y && stage.mouseY <= start_b.y + start_b.image.height * scale && scene == 0) {
                stage.removeChild(start_b);
                stage.addChild(start_b_s);
                start_b_s.on('click', e =>
                {

                    next(1)
            })
            }
            else {
                if (scene == 0) {
                    stage.removeChild(start_b_s);
                    stage.addChild(start_b);
                }
            }
        })
    }
    else if (scene == 1) {
        let intro_bg = new createjs.Bitmap(repo.getResult('intro_bg'));
        let ok = new createjs.Bitmap(repo.getResult('ok'));
        let ok_s = new createjs.Bitmap(repo.getResult('ok_s'));
        intro_bg.set({x: 0, y: 0, scaleX: scale, scaleY: scale});
        ok.set({x: 600 - ok.image.width * scale / 2, y: 3350 * scale, scaleX: scale, scaleY: scale});
        ok_s.set({x: 600 - ok.image.width * scale / 2, y: 3350 * scale, scaleX: scale, scaleY: scale});
        stage.addChild(intro_bg);
        stage.addChild(ok);
        stage.addEventListener("stagemousemove", function () {
            if (stage.mouseX >= ok.x && stage.mouseX <= ok.x + ok.image.width * scale && stage.mouseY >= ok.y && stage.mouseY <= ok.y + ok.image.height * scale && scene == 1) {

                stage.removeChild(ok);
                stage.addChild(ok_s);
                ok_s.on('click', e =>
                {
                    next(2)
            })
            }
            else {
                if (scene == 1) {
                    stage.removeChild(ok_s);
                    stage.addChild(ok);
                }
            }
        })
    }
    else if (scene == 2) {
        //let map_full=new createjs.Bitmap(repo.getResult('map_full'))
        let map = [new createjs.Bitmap(repo.getResult('map_full')), new createjs.Bitmap(repo.getResult('map_1')), new createjs.Bitmap(repo.getResult('map_2')), new createjs.Bitmap(repo.getResult('map_3')), new createjs.Bitmap(repo.getResult('map_4')), new createjs.Bitmap(repo.getResult('map_5')), new createjs.Bitmap(repo.getResult('map_6'))]
        map[0].set({x: 0, y: 0, scaleX: scale, scaleY: scale});
        map[1].set({x: 86, y: 295.8, scaleX: scale, scaleY: scale});
        map[2].set({x: 637, y: 273.3, scaleX: scale, scaleY: scale});
        map[3].set({x: 1016, y: 250.2, scaleX: scale, scaleY: scale});
        map[4].set({x: 47, y: 485.5, scaleX: scale, scaleY: scale});
        map[5].set({x: 528.4, y: 485.5, scaleX: scale, scaleY: scale});
        map[6].set({x: 923.1, y: 555, scaleX: scale, scaleY: scale});
        question_n = 0
        stage.addChild(map[0]);
        stage.addEventListener("stagemousemove", function () {
            for (let i in map) {
                map_display(map[i], i)
            }
        })


    }


    else if (scene == 3) {
        if (question_n == 0) {
            order = [0]
            score_total = []
            let count = 0
            for (let i = 1; i <= 8; i++) {
                count = 0;
                let pick = Math.floor((Math.random() * 22) + 1);
                for (let j = 1; j <= i; j++) {
                    if (pick == order[j]) {
                        count++;
                    }
                }
                while (count != 0) {
                    count = 0;
                    pick = Math.floor((Math.random() * 22) + 1);
                    for (let j = 1; j <= i; j++) {
                        if (pick == order[j] || pick == 12) {
                            count++;
                        }
                    }
                }
                order.push(pick)
                question_n = 1
            }
            order.push(12)
        }
        next(4)
    }
    else if (scene >= 4 && scene <= 13) {
        question_display(order[9], 9)
    }
    else if (scene == 14) {
        score_total = score_total.concat(location_score[location])
        let again = new createjs.Bitmap(repo.getResult('again'))
        let again_s = new createjs.Bitmap(repo.getResult('again_s'))
        let comment = new createjs.Bitmap(repo.getResult('comment'))
        let comment_s = new createjs.Bitmap(repo.getResult('comment_s'))
        var toilet_rand = score_total[Math.floor(Math.random() * score_total.length)];
        let toilet_bg = new createjs.Bitmap(repo.getResult('toilet_' + toilet_rand))
        toilet_bg.set({x: 0, y: 0, scaleX: scale, scaleY: scale});
        again.set({x: 380, y: 820, scaleX: scale, scaleY: scale});
        again_s.set({x: 380, y: 820, scaleX: scale, scaleY: scale});
        comment.set({x: 610, y: 820, scaleX: scale, scaleY: scale});
        comment_s.set({x: 610, y: 820, scaleX: scale, scaleY: scale});
        stage.addChild(toilet_bg);
        stage.addChild(again);
        stage.addChild(comment)
        stage.addEventListener("stagemousemove", function () {
            if (stage.mouseX >= again.x && stage.mouseX <= again.x + again.image.width * scale && stage.mouseY >= again.y && stage.mouseY <= again.y + again.image.height * scale && scene == 14) {

                stage.removeChild(again);
                stage.addChild(again_s);
                again_s.on('click', e =>
                {
                    next(2)
            })
            }
            else {
                if (scene == 14) {
                    stage.removeChild(again_s);
                    stage.addChild(again);
                }
            }
            if (stage.mouseX >= comment.x && stage.mouseX <= comment.x + comment.image.width * scale && stage.mouseY >= comment.y && stage.mouseY <= comment.y + comment.image.height * scale && scene == 14) {

                stage.removeChild(comment);
                stage.addChild(comment_s);
                again_s.on('click', e =>
                {
                    next(15)
            })
            }
            else {
                if (scene == 14) {
                    stage.removeChild(comment_s);
                    stage.addChild(comment);
                }
            }
        })
    }
    else if (scene == 15)
    {
        let comment_bg=new createjs.Bitmap(repo.getResult('comment_bg'))
        comment_bg.set({x: 0, y: 0 ,scaleX:scale,scaleY:scale});
        stage.addChild(comment_bg)
        scene=15
    }
}
function question_display(num,count)
{
    if(scene>=4&&scene<=13) {
        var shit = new createjs.Bitmap(repo.getResult('shit'));
        let text = new createjs.Text(question[num], "30px 微軟正黑體");
        ifClick = false
        question_background(text, (question[num].length / 2 * 30))
        let normal_q = []
        normal_q[num] = new createjs.Bitmap(repo.getResult('normal_q_' + num))
        normal_q[num].set({x: 600 - normal_q[num].image.width * scale / 2, y: 400, scaleX: scale, scaleY: scale});
        shit.set({x: 600 - shit.image.width * scale / 2, y: 400, scaleX: scale, scaleY: scale, alpha: '1'});
        stage.addChild(normal_q[num]);
        stage.addEventListener("stagemousemove", function () {
            if (scene >= 4 && scene <= 13) {
                let leftAnswer = new createjs.Text(option[num][0], "35px 微軟正黑體");
                let rightAnswer = new createjs.Text(option[num][1], "35px 微軟正黑體");
                leftAnswer.set({x: 600 - (option[num][0].length / 2 * 35), y: 500});
                rightAnswer.set({x: 600 - (option[num][1].length / 2 * 35), y: 500});
                if (stage.mouseX <= 580) {
                    let r, t;
                    if (stage.mouseX >= 300) {
                        r = (stage.mouseX - 300) / 280 * 45 - 45
                    }
                    else if (stage.mouseX < 300) {
                        r = -45
                    }
                    normal_q[num].rotation = r
                    leftAnswer.rotation = r
                    let sin = Math.sin(r * Math.PI / 180)
                    let cos = Math.cos(r * Math.PI / 180)
                    let tmX = 600 + 440 * sin;
                    let tmY = 840 - 440 * cos;
                    normal_q[num].x = tmX - 202.56 * cos;
                    normal_q[num].y = tmY - 202.56 * sin;
                    leftAnswer.set({
                        x: 600 + 340 * sin - (option[num][0].length / 2 * 35) * cos,
                        y: 840 - 340 * cos - (option[num][0].length / 2 * 35) * sin
                    });
                    question_background(text, (question[num].length / 2 * 30))
                    stage.addChild(normal_q[num])
                    stage.addChild(leftAnswer)
                    stage.on('click', function (evt) {
                        score_total = score_total.concat(score[num][0])
                        next(count + 4 + 1)
                    })
                }
                else if (stage.mouseX > 620) {
                    let r, t;
                    if (stage.mouseX <= 900) {
                        r = (stage.mouseX - 620) / 280 * 45
                    }
                    else if (stage.mouseX > 900) {
                        r = 45
                    }
                    normal_q[num].rotation = r
                    rightAnswer.rotation = r
                    let sin = Math.sin(r * Math.PI / 180)
                    let cos = Math.cos(r * Math.PI / 180)
                    let tmX = 600 + 440 * sin;
                    let tmY = 840 - 440 * cos;
                    normal_q[num].x = tmX - 202.56 * cos;
                    normal_q[num].y = tmY - 202.56 * sin;
                    rightAnswer.set({
                        x: 600 + 340 * sin - (option[num][1].length / 2 * 35) * cos,
                        y: 840 - 340 * cos - (option[num][1].length / 2 * 35) * sin
                    });
                    question_background(text, (question[num].length / 2 * 30))
                    stage.addChild(normal_q[num])
                    stage.addChild(rightAnswer)
                    stage.on('click', function (evt) {
                        score_total = score_total.concat(score[num][1])
                        next(count + 4 + 1)
                    })


                }
                else {
                    stage.addChild(normal_q[num])
                    stage.removeChild(leftAnswer, num)
                    stage.removeChild(rightAnswer)
                }
            }

        })
    }
}
function question_background(text,l)
{
    let question_bg = new createjs.Bitmap(repo.getResult('question_bg'));
    question_bg.set({x: 0, y: 0, scaleX: scale, scaleY: scale});
    var bar = new createjs.Bitmap(repo.getResult('bar'));
    var bar_bg = new createjs.Bitmap(repo.getResult('bar_bg'));
    var blood = new createjs.Bitmap(repo.getResult('blood'));
    bar_bg.set({x: 600 - bar_bg.image.width * scale / 2 , y: 20, scaleX: scale, scaleY: scale});
    bar.set({x: 600 - bar_bg.image.width * scale / 2 , y: 20, scaleX: scale, scaleY: scale});
    blood.set({x: 600 - bar_bg.image.width * scale / 2 , y: 20, scaleX: scale, scaleY: scale});
    text.set({x:600-l, y: 123 * scale });
    stage.addChild(question_bg)
    stage.addChild(bar_bg);
    stage.addChild(blood);
    stage.addChild(bar);
    stage.addChild(text)
}
function next(i) {
    stage.removeAllChildren();
    stage.update();
    scene=i;
    draw();
}
function map_select(mousex,mousey,x,y,w,h)
{
    if(mousex>=x&&mousex<=x+w&&mousey>y&&mousey<=y+h&&scene==2)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function map_display(map,i)
{
    if(map_select(stage.mouseX,stage.mouseY,map.x,map.y,map.image.width*scale,map.image.height*scale)) {
        stage.addChild(map);

        location = i;
        if(i!=0) {
            map.on('click', e =>
            {
                next(3)
            ;
        })
        }

    }
    else
    {
        stage.removeChild(map);
        return false;
    }
}
setup();

});
