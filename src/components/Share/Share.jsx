import "./Share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {makeRequest} from "../../axios"
import { useQuery } from "@tanstack/react-query";
import userLogo from "../../assets/user.png"

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const Share = () => {

  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const { currentUser } = useContext(AuthContext);

  
  const queryClient = useQueryClient();

 
  
  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );


  const upload = async () => {
    try {
      if (!file) return ""; // Return an empty string if file is null
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };



  return (
    <div className="share">
    <div className="container">
      <div className="top">
        <div className="left">
        <img src={currentUser?.profilePic ? "/upload/" + currentUser?.profilePic: userLogo} alt="" />
          <input
            type="text"
            placeholder={`What's on your mind ${currentUser?.name}`}
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
        </div>
        <div className="right">
          {file && (
            <img className="file" alt="" src={URL.createObjectURL(file)} />
          )}
        </div>
      </div>
      <hr />
      <div className="bottom">
        <div className="left">
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file">
            <div className="item">
            <AddPhotoAlternateIcon />
              <span>Add Image</span>
            </div>
          </label>
        </div>
        <div className="right">
          <button onClick={handleClick}>Share</button>
        </div>
      </div>
    </div>
  </div>
);
}

export default Share