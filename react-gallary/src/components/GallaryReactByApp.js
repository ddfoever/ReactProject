import React,{Component} from 'react';
import ImageDatasArr from '../data/imageInfos';
export default class GallaryReactByApp extends Component{

    constructor(props){
        super(props);
        const imageData = require("../data/imageData.json");
        console.log("imageData"+Object.prototype.toString.apply(imageData));
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
        // const imageData ;
        console.log("ImageDatasArr",ImageDatasArr);
        // console.log("url",require('../images/1.jpg'));
        return(
           <section className="stage"> 
             <section className="img-sec"></section>
             <nav className="controller-nav"></nav>
            </section>

        )
        ;
    }
}