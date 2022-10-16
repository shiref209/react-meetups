import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://shiref:22512201@meetups.ggtgkwh.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupCollections = db.collection("meetups");
    const result = await meetupCollections.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "meetup inserted successfully!" });
  }
};
export default handler;
