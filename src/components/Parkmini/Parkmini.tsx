import { BsStarFill, BsInfo } from "react-icons/bs";
import { IPark } from "../../redux/types/parkInterfaces";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { accountSelector } from "../../redux/features/accountSlice/accountSlice";
import {
  addFavouriteThunk,
  deleteFavouriteThunk,
} from "../../redux/thunks/accountThunk/accountThunk";
import { useNavigate } from "react-router-dom";
import { ParkminiStyles } from "./ParkminiStyles";

const Park = ({
  id,
  name,
  photos,
  photosBackup,
  details,
  address,
  owner,
}: IPark) => {
  const [firstError, setFirstError] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string>(
    `${process.env.REACT_APP_API_URL}/${photos[0]}`
  );

  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  const { favParks } = useAppSelector(accountSelector);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavourite(favParks.includes(id!));
  }, [favParks, id]);

  const onImageError = (event: any) => {
    if (firstError) {
      setFirstError(false);
      if (photosBackup && photosBackup[0]) {
        setImageUrl(photosBackup[0]);
      } else {
        setImageUrl("images/columpiaDa.png");
      }
    } else {
      setImageUrl("images/columpiaDa.png");
    }
  };

  return (
    <ParkminiStyles>
      <section>
        <div className="card">
          <img
            className="card-image"
            src={imageUrl}
            alt="beautiful forest"
            onError={onImageError}
          />
          <div className="card-body">
            <h3 className="card-title">{name}</h3>
          </div>

          <div className="button-container">
            <button
              className="button button--info"
              onClick={() => navigate(`/park/${id}`)}
            >
              <BsInfo className="mobile-button" />
              <span className="desktop-button">Details</span>
            </button>

            {!isFavourite && (
              <button
                className="button button--favourite"
                onClick={() => dispatch(addFavouriteThunk(id!))}
              >
                <BsStarFill className="mobile-button" />
                <span className="desktop-button">Save</span>
              </button>
            )}
            {isFavourite && (
              <button
                className="button button--favourite"
                onClick={() => dispatch(deleteFavouriteThunk(id!))}
              >
                <BsStarFill className="mobile-button delete" />
                <span className="desktop-button unsave">Saved</span>
              </button>
            )}
          </div>
        </div>
      </section>
    </ParkminiStyles>
  );
};

export default Park;
