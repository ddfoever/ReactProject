import React,{Component} from 'react';
import ImageDatasArr from '../data/imageInfos';
import ImageFigure from './imgFigure'
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
        let controllerUnits =[];
        let imgFigures = [];
        ImageDatasArr.map((value,index)=>{
            imgFigures.push(<ImageFigure key={index} imageInfo={value}/>)
        })
        
        // const imageData ;
        console.log("ImageDatasArr",imgFigures);
        // console.log("url",require('../images/1.jpg'));
        return(
           <section className="stage"> 
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