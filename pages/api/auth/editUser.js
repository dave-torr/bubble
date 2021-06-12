import { ObjectID } from 'mongodb';
import nextConnect from 'next-connect';
import { connectToDatabase } from "../../../utils/mongodb";

///////////////////////////////
const handler = nextConnect()

.post(async(req, res)=>{
    const { db } = await connectToDatabase();
    let reqData = JSON.parse(req.body);
    if(reqData.picUpdate){
        const updatedUser = await db
            .collection("users")
            .findOneAndUpdate(
                {"email": reqData.email},
                {$set: {
                    profilePic: reqData.profilePic, 
                    notifications: reqData.notifications
                }},
                {
                    returnNewDocument: true
                }
            );
            res.status(200).json( updatedUser )
    }
})

export default (req, res) => handler.run(req, res) 