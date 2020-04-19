import React from 'react';
// Ant Components
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
//Components
import SocialMedia from '../Micro/socialMedia';

const StaffMember = ({member,numberSlides,up,down}) =>{
    return <div className='staff_card'>
        <div className="img_holder" style={{backgroundImage:`url(${member.imagen})`}}>
                <p className='staff_number'>
                {member.id}/{numberSlides > 9? numberSlides: `0${numberSlides}`}
                </p>
        </div>
            <div className='botones_desc'>
                <div className='staff_controller_holder'>
                    <Button className={'staff_controller'} onClick={()=>{up()}}>
                        <LeftOutlined />
                        ANTERIOR
                    </Button>
                    <Button className={'staff_controller'} onClick={()=>{down()}}>
                        SIGUIENTE
                        <RightOutlined />
                    </Button>
                </div>
                <div className="description">
                    {/* <div className='linkedin'>
                    </div> */}
                    <div className='name'>
                        {member.nombre}
                    <SocialMedia name={`linkedin`} classes={'linkedinLogo'} link={member.link}/>
                        
                    </div>
                    <p className='cargo'>{member.cargo}</p>
                    <p className='descripcion'>{member.descripcion}</p>
                </div>
            </div>
    </div>;
}

export default StaffMember;