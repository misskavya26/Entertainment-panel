import React from 'react'
import { img_300 } from '../../config/config';
import { unavailable } from '../../config/config';
import './Card.css';
import Badge from '@mui/material/Badge';
import BasicModal from '../ModalBox/ModalBox';


const Card = (props) => {
    return (

        <>
            <BasicModal type={props.type} id={props.id}>
                <Badge
                    badgeContent={props.rating}
                    color={props.rating > 6 ? 'primary' : 'secondary'}
                />
                <img
                    src={props.image ? `${img_300}${props.image}` : unavailable}
                    className='image'
                    alt={props.title} />
                <p className='title'>{props.title} </p>
                <span className='type'>
                    {props.type === 'tv' ? 'TV Series' : 'Movie'}
                    <span className="date">
                        {props.date}
                    </span>
                </span>

            </BasicModal>
        </>
    )
}

export default Card
