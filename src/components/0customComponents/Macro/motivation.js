import React from 'react';



class Motivation extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
    }
    
    render(){
        return<div id={`${this.props.id}`}>
            Motivation
            </div>;
    }
}



export default Motivation;