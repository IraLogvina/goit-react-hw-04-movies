import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as SearchAPI from "../../services/searchAPI";
import styles from "./Cast.module.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function Cast() {
  
  const [casts, setCasts] = useState([]);
  const { moviesId } = useParams();

  useEffect(() => {
    SearchAPI.fetchCastById(moviesId).then((data) => {
      setCasts(data.cast);
    });
  }, [moviesId]);

  return (
    <>
      {casts && (
        <>
          <ul className={styles.castsList}>
            {casts.map((cast) => (
              <li className={styles.castsListItem} key={cast.id}>
                <img
                  src={`${IMAGE_URL}${cast.profile_path}`}
                  alt={""}
                  className={styles.castsListImage}
                />
                <p
                  className={styles.castsListItemInfo}
                >{`Actor: ${cast.name}`}</p>
                <p
                  className={styles.castsListItemInfo}
                >{`Character: ${cast.character}`}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
