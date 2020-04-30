import React from 'react';
// Ant Components
import {Row,Col} from 'antd';
// Component
import GeoLogo from '../Micro/geoLogo';
import HeartIcon from '../Micro/heartIcon';
import AliadoLogo from '../Micro/aliado';
import SocialMedia from '../Micro/socialMedia';
// Textos
const textos = require('../sharedContents/_textos.json');
const enlaces = require('../sharedContents/_enlaces.json');

class Motivation extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
    }
    
    render(){
        return<div id={`${this.props.id}`} >
            <Row>
                <Col xs={{span:24}}  lg={12} className='mot_left' style={{backgroundImage:'url(assets/jpg/Surface.png)'}}>
                    <div className='mot-img-bck'>
                    <GeoLogo classes='mot_logo'/>
                    <div className='hash-group'>
                        <p>#JuntosPorLaVida</p>
                        <p>#QuedateEnCasa</p>
                        <p>#EsPorColombia</p>
                    </div>
                    </div>
                </Col>
                <Col xs={{span:24}}  lg={12} className='mot_right'>
                    <div className='mot-text'>
                    <HeartIcon classes={'heart'}/>
                    <p className='mot-title'>{`NUESTRA \n MOTIVACION`}</p>
                    {/* <p className='mot-text'>{textos.motivacion}</p> */}
                    </div>
                    <div className='socialmedia'>
                            <SocialMedia name={`instagram`} link={`${enlaces.instagram}`}/>
                            <SocialMedia name={`twitter`} link={`${enlaces.twitter}`}/>   
                            <SocialMedia name={`facebook`} link={`${enlaces.facebook}`}/>
                    </div>
                    <div className='aliados-block'>
                        <p className='mot-title'>ALIADOS</p>
                        <div className='aliados-grp'>
                        <AliadoLogo url={`/assets/coursera.PNG`} classes={'aliados'}/>
                        <AliadoLogo url={`/assets/ibm.PNG`} classes={'aliados'}/>
                        <AliadoLogo url={`/assets/netflix.PNG`} classes={'aliados'}/>
                        <AliadoLogo url={`/assets/tumblr.PNG`} classes={'aliados'}/>
                        <AliadoLogo url={`/assets/stripe.PNG`} classes={'aliados'}/>
                        </div>
                    </div>
                </Col>
            </Row>

           
            </div>;
    }
}



export default Motivation;