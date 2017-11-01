import React,{Component} from 'react';


export default class ImageFigure extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {imageInfo,arrange} = this.props;
        console.log("imageInfo",imageInfo,arrange);
        // let url =this.props.imageInfo.imageURL;
        // url = "../images/1";
        // console.log("url",url);
        let styleObj = {};
        if(arrange.pos){
            styleObj = arrange.pos;
        }
        let url = require("../images/"+imageInfo.fileName);
        return(
            <figure className="figure-img" style={styleObj}>
                <img src={url} alt={imageInfo.title} />
                <figcaption >
                    <h2 className="img-title">{imageInfo.title}</h2>
                </figcaption>
            </figure>
        );
    }
}

