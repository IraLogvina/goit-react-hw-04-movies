import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as SearchApi from "../../services/searchAPI";
import styles from "./Reviews.module.css";

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const { moviesId } = useParams();

  useEffect(() => {
    SearchApi.fetchReviewById(moviesId).then((data) => {
      setReviews(data.results);
    });
  }, [moviesId]);

  return (
    <>
      {reviews && reviews.length > 0 && (
        <>
          <ul className={styles.reviews}>
            {reviews.map((review) => (
              <li key={review.id} className={styles.reviewsItem}>
                <p
                  className={styles.reviewsAuthor}
                >{`Author: ${review.author}`}</p>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {reviews.length === 0 && (
        <p className={styles.noReview}>There have been no reviews yet...</p>
      )}
    </>
  );
}
