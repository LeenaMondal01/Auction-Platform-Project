import CardTwo from "@/custom-components/CardTwo";
import Spinner from "@/custom-components/Spinner";
import { getMyAuctionItems } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewMyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    } else {
      dispatch(getMyAuctionItems());
    }
  }, [dispatch, isAuthenticated, user.role, navigateTo]);

  return (
    <div className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col">
      <h1 className="text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
        My Auctions
      </h1>

      {loading ? (
        <Spinner />
      ) : myAuctions.length > 0 ? (
        <div
          className={`${
            myAuctions.length > 2 ? "flex-grow" : ""
          } flex flex-wrap gap-6`}
        >
          {myAuctions.map((element) => (
            <CardTwo
              key={element._id}
              title={element.title}
              startingBid={element.startingBid}
              endTime={element.endTime}
              startTime={element.startTime}
              imgSrc={element.image?.url}
              id={element._id}
            />
          ))}
        </div>
      ) : (
        <h3 className="text-[#666] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
          You have not posted any auction.
        </h3>
      )}
    </div>
  );
};

export default ViewMyAuctions;
