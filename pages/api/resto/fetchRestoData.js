import { connectToDatabase } from "../../../utils/mongodb";

// Route used exclusively with SWR to have "real time" update of all departure dates.
export default async (req, res) => {
  const { db } = await connectToDatabase();

  const YachtAnahiDepartures = await db
    .collection("fandb")
    .find({})
    .toArray();
  res.json(YachtAnahiDepartures);
};