import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated || user.role === "Bidder") {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated, id, user?.role]);

  const isAuctionOngoing =
    auctionDetail?.startTime &&
    auctionDetail?.endTime &&
    new Date(auctionDetail.startTime) < Date.now() &&
    new Date(auctionDetail.endTime) > Date.now();

  const hasAuctionStarted =
    auctionDetail?.startTime && Date.now() < new Date(auctionDetail.startTime);

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col">
      <div className="text-[16px] flex flex-wrap gap-2 items-center">
        <Link
          to="/"
          className="font-semibold transition-all duration-300 hover:text-[#D6482b]"
        >
          Home
        </Link>
        <FaGreaterThan className="text-stone-400" />
        <Link
          to="/view-my-auctions"
          className="font-semibold transition-all duration-300 hover:text-[#D6482b]"
        >
          My Auctions
        </Link>
        <FaGreaterThan className="text-stone-400" />
        <p className="text-stone-600">
          {auctionDetail?.title || "Auction Item"}
        </p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex gap-4 flex-col 2xl:flex-row">
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex gap-4 flex-col lg:flex-row">
              <div className="bg-white w-[100%] lg:w-40 lg:h-40 flex justify-center items-center p-5">
                {auctionDetail?.image?.url ? (
                  <img
                    src={auctionDetail.image.url}
                    alt={auctionDetail.title || "Auction Image"}
                  />
                ) : (
                  <span>No Image</span>
                )}
              </div>
              <div className="flex flex-col justify-around pb-4">
                <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                  {auctionDetail?.title}
                </h3>
                <p className="text-xl font-semibold">
                  Condition:
                  <span className="text-[#D6482b]">
                    {auctionDetail?.condition ?? "N/A"}
                  </span>
                </p>
                <p className="text-xl font-semibold">
                  Minimum Bid:
                  <span className="text-[#D6482b]">
                    Rs.{auctionDetail?.startingBid ?? "N/A"}
                  </span>
                </p>
              </div>
            </div>

            <p className="text-xl w-fit font-bold">Auction Item Description</p>
            <hr className="my-2 border-t-[1px] border-stone-700" />
            {auctionDetail?.description?.split(". ").map((element, index) => (
              <li key={index} className="text-[18px] my-2">
                {element}
                <span className="text-[#D6482b]">.</span>
              </li>
            ))}
          </div>

          <div className="flex-1">
            <header className="bg-stone-200 py-4 text-[24px] font-semibold px-4">
              BIDS
            </header>
            <div className="bg-white px-4 min-h-fit lg:min-h-[650px]">
              {auctionBidders &&
              auctionBidders.length > 0 &&
              isAuctionOngoing ? (
                auctionBidders.map((element, index) => (
                  <div
                    key={index}
                    className="py-2 flex items-center justify-between"
                  >
                    <div className="flex  flex-1 items-center gap-4">
                      <img
                        src={element.profileImage}
                        alt={element.userName}
                        className="w-12 h-12 rounded-full my-2 hidden md:block"
                      />
                      <p className="text-[18px] font-semibold">
                        {element.userName}
                      </p>
                    </div>
                    <p className="flex-1 text-center">{element.amount}</p>

                    <p
                      className={`text-[20px] font-semibold flex-1 text-end ${
                        index === 0
                          ? "text-green-600"
                          : index === 1
                            ? "text-blue-600"
                            : index === 2
                              ? "text-yellow-600"
                              : "text-gray-600"
                      }`}
                    >
                      {index + 1}
                      {index === 0
                        ? "st"
                        : index === 1
                          ? "nd"
                          : index === 2
                            ? "rd"
                            : "th"}
                    </p>
                  </div>
                ))
              ) : hasAuctionStarted ? (
                <img
                  src="/auctionstart.jpg"
                  alt="not-started"
                  className="w-full max-h-[650px]"
                />
              ) : (
                <img
                  src="/auctionend.jpg"
                  alt="ended"
                  className="w-full max-h-[650px]"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewAuctionDetails;
