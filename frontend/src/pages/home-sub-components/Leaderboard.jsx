import React from 'react'
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
const Leaderboard = () => {
  const {leaderboard} = useSelector ((state)=> state.user);
  return (
   <>
   <section className="my-8 lg:px-5">
    <div className="flex flex-col min-[340px]:flex-row min-[340px]:gap-2">
        <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
        
         Top 10</h3>
        <h3 className  ="text-[#D64828] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
        Bidders Leaderboard</h3>
    </div>
   </section>
   </>
  );
}

export default Leaderboard