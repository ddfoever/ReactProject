import React,{Component} from 'react';


export default class ImageFigure extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {imageInfo} = this.props;
        console.log("imageInfo",imageInfo);
        // let url =this.props.imageInfo.imageURL;
        // url = "../images/1";
        // console.log("url",url);
        return(
            <figure>
                <img src={require(imageInfo.imageURL)} />
                <figcaption>
                    <h2>{imageInfo.title}</h2>
                </figcaption>
            </figure>
        );
    }
}

