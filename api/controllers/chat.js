import { db } from "../connect.js"
import jwt from "jsonwebtoken"
import moment from "moment"


export const getMessages = (req,res) =>{

    const { senderId, receiverId } = req.params;

     // Retrieve the messages from the database
    const query =
    'SELECT * FROM chat WHERE (senderId = ? AND receiverId = ?) OR (senderId = ? AND receiverId = ?) ORDER BY timestamp ASC LIMIT 20';
  
    const values = [senderId, receiverId, receiverId, senderId];


    db.query(query,values,(error,results)=>{
        if(error){
            console.error('Error retrieving messages:', error);
            res.status(500).json({ error: 'An error occurred while retrieving messages.' });
        }else {
            res.status(200).json(results);
        }
    })
}


export const addMessage = (req,res)=>{


    const { senderId, receiverId, message } = req.body;


    const query = 'INSERT INTO chat (senderId, receiverId, message) VALUES (?, ?, ?)';
    const values = [senderId, receiverId, message];

    db.query(query,values,(error,results)=>{
        if (error) {
            console.error('Error sending message:', error);
            res.status(500).json({ error: 'An error occurred while sending the message.' });
          } else {
            res.status(201).json({ success: true });
          }
    })

}

