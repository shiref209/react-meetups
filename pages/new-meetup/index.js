import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import Head from 'next/head';

const NewMeetupPage = () => {
  const route=useRouter();
    const addMeetupHandler=async (meetupData)=>{
      
        const response=await fetch('/api/new-meetup',{
          method:'POST',
          body:JSON.stringify(meetupData),
          headers:{
            'Content-Type':'application/json'
          }
        });
        const data=await response.json();
        console.log(data);
        route.push('/')
    }
  return (
    <Fragment>
      <Head>
        <title>Add new meetup</title>
        <meta name='description' content='Add your meetup'/>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    </Fragment>
   
  )
}

export default NewMeetupPage