import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const getActivities = (req,res)=>{

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {

        const userId = userInfo.id;

        const q = `
        SELECT a.*, u.username AS likedByUsername, p.id AS likedPostTitle
        FROM activity AS a
        JOIN users AS u ON a.userId = u.id
        JOIN posts AS p ON a.postId = p.id
        WHERE p.userId = ?
          AND a.actionType = 'like'
    `;

        db.query(q,[userId],(err,data)=>{
            if(err) return res.status(500).json(err)
    
            return res.status(200).json(data)
        })
    })

}