import React,{Component} from 'react';
import ReactDOM,{findDOMNode} from 'react-dom';
import ImageDatasArr from '../data/imageInfos';
import ImageFigure from './imgFigure';

export default class GallaryReactByApp extends Component{

    constructor(props){
        super(props);
        this.Constant = {
            centerPos:{
                left:0,
                right:0
            },
            hPosRange:{
                leftSecX:[0,0],
                rightSecX:[0,0],
                y:[0,0]
            },
            vPosRange:{
                x:[0,0],
                topY:[0,0]
            }
        };
        this.state = {
            imgsArrangeArr:[
                // {
                //     top:'0',
                //     left:'0'
                // },
                //rotate:0
                //isInverse:false 表示图片的正反面
            ]
        }
    }
    //组件加载以后为每张图片计算 位置
    componentDidMount(){
        let stageDom = this.refs.stage,
        stageW = stageDom.scrollWidth,
        stageH = stageDom.scrollHeight,
        halfStageW = Math.ceil(stageW/2),
        halfStageH = Math.ceil(stageH /2);
        //拿到imgfigure的大小
        let imgFigureDom = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgFigureW = imgFigureDom.scrollWidth,
        imgFigureH = imgFigureDom.scrollHeight,
        halfImgW = Math.ceil(imgFigureW / 2),
        halfImgH = Math.ceil(imgFigureH / 2);
        //计算中心图片位置
        this.Constant.centerPos={
            left:halfStageW - halfImgW,
            top:halfStageH - halfImgH
        }

        //
        this.Constant.hPosRange.leftSecX[0] = - halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;

        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfImgH - halfImgH * 3;

        this.Constant.vPosRange.x[0] = halfStageW -imgFigureW;
        this.Constant.vPosRange.x[1] = halfStageW;

        this.reArrange(8);
    }
    //获取0-30°之间的任意正负值
    get30DegRandom(){
        return ((Math.random()>0.5?"+":"-")+Math.ceil(Math.random()*30));
    }
    //获取区间内的随机值
    getRangeRandom(rangeMin,rangeMax){
        return Math.ceil(Math.random()*(rangeMax - rangeMin) + rangeMin);
    }
    //翻转图片闭包函数
    //图片index索引
    //@return 一个闭包函数，其内returnn一个真正待执行的函数
    inverse(index){
        return function(){
            let imgsArrangeArr = this.state.imgsArrangeArr;
            imgsArrangeArr[index].isInverse  = !imgsArrangeArr[index].isInverse;
            this.setState({
                imgsArrangeArr:imgsArrangeArr
            })
        }.bind(this);
    }
    //重新布局所有图片，指定布局中心图片
    reArrange(centerIndex){
        let imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,
        imgsArrangeTopArr = [],topImgNum = Math.ceil(Math.random() *2),//上面区域取一个图片或者不取
        topImgSpliceIndex = 0,
        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);
        imgsArrangeCenterArr[0].pos = centerPos;
        imgsArrangeCenterArr[0].rotate = 0;///布局中间图片不需要旋转
        ///取出上侧要布局的图片
        topImgSpliceIndex =  Math.ceil( Math.random() * (imgsArrangeArr.length - topImgNum ));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
        //布局上侧图片
        imgsArrangeTopArr.map((value,index)=>{
            imgsArrangeTopArr[index]= {
                pos :{
                    top:this.getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
                    left:this.getRangeRandom(vPosRangeX[0],vPosRangeX[1])
                },
                rotate:this.get30DegRandom()
            }
            
        });
        //布局左右两侧的图片
        for(var i=0,j = imgsArrangeArr.length,k = j/2;i<j;i++){
            let hPosRangeLORX = null;
            //前半部分 布局左边，后半部分布局右边
            if(i < k){
                hPosRangeLORX = hPosRangeLeftSecX;
            }else{
                hPosRangeLORX = hPosRangeRightSecX;
            }
            imgsArrangeArr[i] ={
                pos:{
                    top:this.getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
                    left:this.getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
                },
                rotate:this.get30DegRandom()
            }
        }


        if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
            imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }
        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
        this.setState({
            imgsArrangeArr:imgsArrangeArr
        })
    }
    //gen image URL
    getImageURL(){
        for(let i = 0;i<ImageDatasArr.length;i++){
            // let url=require('../images/'+ImageDatasArr[i].fileName);
          let url = '../images/'+ ImageDatasArr[i].fileName;
          ImageDatasArr[i].imageURL = url;
        }
        
    };
    componentWillMount(){
        this.getImageURL();
    }
    render(){
        let controllerUnits =[];
        let imgFigures = [];
        ImageDatasArr.map((value,index)=>{
            if(!this.state.imgsArrangeArr[index]){
                this.state.imgsArrangeArr[index]={
                    pos:{
                        left:0,
                        top:0
                    },
                    rotate:0,
                    isInverse:false
                }
            }
            imgFigures.push(<ImageFigure key={index} imageInfo={value} ref={"imgFigure"+index} inverse={this.inverse(index)} arrange = {this.state.imgsArrangeArr[index]}/>)
        })  
        
        // const imageData ;
        console.log("ImageDatasArr",imgFigures);
        // console.log("url",require('../images/1.jpg'));
        return(
           <section className="stage" ref="stage"> 
             <section className="img-sec">
                 {imgFigures}
                 {/* <img src={require("../images/0.jpg")}/> */}
             </section>
             <nav className="controller-nav">
                 {controllerUnits}
             </nav>
            
            </section>

        )
        ;
    }
}