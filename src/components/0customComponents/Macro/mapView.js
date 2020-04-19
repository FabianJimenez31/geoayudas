import React from 'react';
// Ant Components
//import {Row,Col} from 'antd';
// Component
import PaperPlane from '../Micro/paperPlane';


class MapView extends React.Component{
    render(){
        return<div id='mapview'>
            <div className='map_header'>
                
                    <div className={`map_title_element`}>
                        <PaperPlane classes={'paperplane'}/>
                    </div>
                    <div className={`map_title_element`}>
                        <p className='map-title'>
                        ENCUENTRA <br/> ZONAS DONDE <br/> PUEDES DONAR
                        </p>
                    </div>
                </div>
           
            <div className='map_holder'>

            </div>
        </div>;
    }
}



export default MapView;