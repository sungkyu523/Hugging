import React, { useEffect, useState } from "react";
import styles from "./Recommend.module.css";
import { useNavigate } from "react-router-dom";

function PersonalRecommend() {
  const navigate = useNavigate();
  const [musics, setMusics] = useState([]);

  useEffect(() => {
    fetch("../../music.json")
      .then((res) => res.json())
      .then((result) => {
        setMusics(result);
      });
  }, []);

  return (
    <div>
      <div className={styles.Header}>
        <div className={styles.Title}>
        <h3 className={styles.TitleText}>맞춤 추천</h3>
        <img
          src="./guitar.png"
          alt="guitar"
          className={styles.TitleImage}
        ></img>
        
      </div>
      <button className={styles.Link} onClick={() => navigate("/recommend_media")}><p className={styles.Text}>음악 더 보러 가기</p></button>
      
      </div>
      
      <div className={styles.List}>
        {musics.map((musicdata) => (
          <button
            className={styles.Meditation}
            onClick={() => navigate(`/playing_music/${musicdata.id}`)}
          >
            <img
              src={`https://placeimg.com/200/100/${musicdata.category}/${musicdata.id}`}
              alt="music"
              className={styles.MusicImage}
            ></img>
            <p className="contentText">{musicdata.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PersonalRecommend;
