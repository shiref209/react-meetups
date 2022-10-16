import React from 'react';
import classes from './MeetupDetail.module.css'

const MeetupDetail = (props) => {
  return (
    <section className={classes.meetup}>
        <img src={props.img} alt={props.title} />
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <address>{props.address}</address>
    </section>
  )
}

export default MeetupDetail