import React, { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient,ObjectId } from "mongodb";
import Head from "next/dist/next-server/lib/head";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}/>
      </Head>
      <MeetupDetail
      img={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
    </Fragment>
   
  );
};

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://shiref:22512201@meetups.ggtgkwh.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");
  const selectedMeetups = await meetupCollections.findOne({_id:ObjectId(meetupId)});
  return {
    props: {
      meetupData: {
        id:selectedMeetups._id.toString(),
        title:selectedMeetups.title,
        image:selectedMeetups.image,
        address:selectedMeetups.address,
        description:selectedMeetups.description
      },
    },
  };
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://shiref:22512201@meetups.ggtgkwh.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");
  const meetups =await meetupCollections.find({}, { _id: 1 }).toArray();
  return {
    fallback: false,
    paths: meetups.map((meetup)=>({params:{meetupId:meetup._id.toString()}}))
  };
}
export default MeetupDetails;
