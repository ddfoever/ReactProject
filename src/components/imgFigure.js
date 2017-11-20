import React,{Component} from 'react';


export default class ImageFigure extends Component{
    constructor(props){
        super(props);
    }
    handleClick(e){
        this.props.inverse();
        e.stopPropagation();
        e.preventDefault();

    }
    render(){
        // const {imageInfo,arrange} = this.props;
        // console.log()
        console.log("imageInfo",this.props);
        // let url =this.props.imageInfo.imageURL;
        // url = "../images/1";
        // console.log("url",url);
        let styleObj = {};
        if(this.props.arrange.pos){
            styleObj = this.props.arrange.pos;
        }
        //如果图片旋转角度有值 并且不为0，添加旋转角度
        if (this.props.arrange.rotate) {
            ['MozTransform', 'msTransform', 'WebkitTransform', 'OTransform', 'transform'].map((item) => {
              styleObj[item] = 'rotate(' + this.props.arrange.rotate + 'deg)';
              console.log(styleObj,"weishenm");
            })
          }
        // if(this.props.arrange.rotate){
        // //兼容各种浏览器 transform css
        //     (['MozTransform', 'msTransform', 'WebkitTransform', 'OTransform', 'transform']).forEach(function(value){
        //        debugger;
        //         styleObj[value] = `rotate(${this.props.arrange.rotate}deg)`;

        //     }.bind(this));
        // }
        let url = require("../images/"+this.props.imageInfo.fileName);
        let figureImageClassName = 'figure-img';
        figureImageClassName += this.props.arrange.isInverse?' is-inverse':"";
        return(
            <figure className={figureImageClassName} style={styleObj} >
                <img src={url} alt={this.props.imageInfo.title} onClick={this.handleClick.bind(this)}/>
                <figcaption >
                    <h2 className="img-title">{this.props.imageInfo.title}</h2>
                </figcaption>
            </figure>
        );
    }
}

