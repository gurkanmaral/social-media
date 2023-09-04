import { db } from "../connect.js"
import jwt from "jsonwebtoken"
import moment from "moment"

export const getLikes = (req,res)=>{

    const q = "SELECT userId from likes WHERE postId = ? "

    db.query(q,[req.query.postId],(err,data)=>{
        if(err) return res.status(500).json(err)

        return res.status(200).json(data.map((like)=> like.userId))
    })
}
export const addLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");

        const q = "INSERT INTO likes (`userId`,`postId`) VALUES (?)";
        const values = [userInfo.id, req.body.postId];

        // Insert into the 'likes' table
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);

            // Insert into the 'activity' table
            const activityQuery = "INSERT INTO activity (`userId`, `actionType`, `postId`, `createdAt`) VALUES (?, ?, ?, ?)";
            const activityValues = [
                userInfo.id,
                'like',
                req.body.postId,
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
            ];

            db.query(activityQuery, activityValues, (activityErr, activityData) => {
                if (activityErr) {
                    console.error('Error inserting activity:', activityErr);
                    return res.status(500).json("An error occurred while adding activity.");
                }

                return res.status(200).json("Post has been liked");
            });
        });
    });
};

export const deleteLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const deleteLikeQuery = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";
        const deleteActivityQuery = "DELETE FROM activity WHERE `userId` = ? AND `postId` = ? AND `actionType` = 'like'";

        db.query(deleteLikeQuery, [userInfo.id, req.query.postId], (likeErr, likeData) => {
            if (likeErr) return res.status(500).json(likeErr);

            // Delete corresponding activity
            db.query(deleteActivityQuery, [userInfo.id, req.query.postId], (activityErr, activityData) => {
                if (activityErr) {
                    console.error('Error deleting activity:', activityErr);
                    return res.status(500).json("An error occurred while deleting activity.");
                }

                return res.status(200).json("Like is removed");
            });
        });
    });
};