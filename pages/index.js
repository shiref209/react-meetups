import React, { Fragment } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from 'next/head'

const HomePage = (props) => {
  return <Fragment>
    <Head>
      <title>React Meetups</title>
      <meta name='description' content='Discover some awesome meetups all around' />
    </Head>
    <MeetupList meetups={props.meetups} />;
  </Fragment> 
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://shiref:22512201@meetups.ggtgkwh.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");
  const meetups = await meetupCollections.find().toArray();
  const meetupsData = meetups.map((meetup) => {
    const {title,description,address,image}=meetup;
    return {
      title,
      id: meetup._id.toString(),
      description,
      address,
      image
    };
  });
  client.close();
  return {
    props: {
      meetups: meetupsData,
    },
  };
}
export default HomePage;
