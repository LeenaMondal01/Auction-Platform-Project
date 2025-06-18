import cron from "node-cron";
import { Auction } from "../models/auctionSchema.js";
import { User } from "../models/userSchema.js";
import { Bid } from "../models/bidSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
import { calculateCommission } from "../controllers/commissionController.js";

export const endedAuctionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    //console.log("Running ended Commission Cron... ");
    const now = new Date();
    //console.log("Server time (UTC):", now.toISOString());
    const endedAuctions = await Auction.find({
      endTime: { $lt: now },
      commissionCalculated: false,
    });
    //console.log(`Found ${endedAuctions.length} ended auctions`);
    
    for (const auction of endedAuctions) {
      try {
        const commissionAmount = await calculateCommission(auction._id);
        auction.commissionCalculated = true;
        const highestBidder = await Bid.findOne({
          auctionItem: auction._id,
          amount: auction.currentBid,
        });
       // console.log(`Highest bidder for auction ${auction._id}:`, highestBidder);
        
        const auctioneer = await User.findById(auction.createdBy);
       // console.log(`Auctioneer for auction ${auction._id}:`, auctioneer);
        
        auctioneer.unpaidCommission = commissionAmount;
        if (highestBidder) {
          auction.highestBidder = highestBidder.bidder.id;
          await auction.save();
          const bidder = await User.findById(highestBidder.bidder.id);
         // console.log(`Bidder for auction ${auction._id}:`, bidder);
          await User.findByIdAndUpdate(
            bidder._id,
            {
              $inc: {
                moneySpent: highestBidder.amount,
                auctionsWon: 1,
              },
            },
            { new: true }
          );
          await User.findByIdAndUpdate(
            auctioneer._id,
            {
              $inc: {
                unpaidCommission: commissionAmount,
              },
            },
            { new: true }
          );
          console.log("SENDING EMAIL TO HIGHEST BIDDER");
         try {
          const subject = `Congratulations! You won the auction for ${auction.title}`;
          const message = `Dear ${bidder.userName}, \n\nCongratulations! You have won the auction for 
          ${auction.title}. \n\nBefore proceeding for payment contact your auctioneer via your auctioneer 
          email:${auctioneer.email} \n\nPlease complete your payment using one of the following 
          methods:\n\n1. **Bank Transfer**: \n- Account Name: ${
            auctioneer.paymentMethods.bankTransfer.bankAccountName
          } \n- Account Number: ${
            auctioneer.paymentMethods.bankTransfer.bankAccountNumber
          } \n- Bank: ${auctioneer.paymentMethods.bankTransfer.bankName}\n\n3. **PayPal**:\n- Send payment to:
             ${auctioneer.paymentMethods.paypal.paypalEmail}\n\n3. 
            **Cash on Delivery (COD)**:\n- If you prefer COD, you must pay 20% of the total amount upfront before delivery.\n- To pay the 20% upfront, use any of the above methods.\n- 
            The remaining 80% will be paid upon delivery.\n- If you want to see the condition of your auction item then send your email on this:
             ${auctioneer.email}\n\nPlease ensure your payment is completed by [Payment Due Date]. Once we confirm the payment, the item will be shipped to you.\n\nThank you for
              participating!\n\nBest regards,\nNIT Auction Team`;
              await sendEmail({ email: bidder.email, subject, message });
              console.log("Successfully email sent to highest bidder");
         } catch (error) {
            console.error(
              "Failed to send email to highest bidder:",
              error
            );
          
         }

         //Auctioneer Email
          console.log("SENDING EMAIL TO AUCTIONEER");
          try {
            const subject = `Auction Ended: ${auction.title}`;
            const message = `Dear ${auctioneer.userName}, \n\nYour auction for ${auction.title} has ended. 
            The highest bidder is ${bidder.userName} with a bid of ${highestBidder.amount}.\n\nYour commission for this auction is: ${commissionAmount}.\n\nPlease compelete the required payment and fill out the proof of payment form to confirm your payment.\n\nThank you for using our platform!\n\nBest regards,\nNIT Auction Team`;
            await sendEmail({ email: auctioneer.email, subject, message });
            console.log("Successfully email sent to auctioneer");
          } catch (error) {
            console.error("Failed to send email to auctioneer:", error);
          }
         
        } else {
          await auction.save();
        }
      } catch (error) {
        return next(console.error(error || "Some error in ended auction cron"));
      }
    }
  });
};
