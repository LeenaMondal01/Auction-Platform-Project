# Auction Platform Project – PrimeBid

## Contributors

This project is developed collaboratively by the following contributors:

## Contributors

- **Shalini Nath** – [GitHub](https://github.com/DiyaNath-22)
- **Ranveer Kumar Poddar** – [GitHub](https://github.com/ranveer-2301)
- **Deepika Kanwa** – [GitHub](https://github.com/DeepikaKanwa)
- **Bandana Kumari Nayek** – [GitHub](https://github.com/codewithana)
- **Leena Mondal** – [GitHub](https://github.com/LeenaMondal01)
- **Atul Xalxo** – [GitHub](https://github.com/Atul-Xalxo)

---

## Project Description

PrimeBid is a full-stack online auction platform designed to facilitate secure and transparent bidding between users. The system supports multiple user roles including Bidder, Auctioneer, and Super Admin. Each role is provided with dedicated features to ensure smooth auction management, secure transactions, and efficient administrative control.

The platform enables auctioneers to list auction items, bidders to place competitive bids, and administrators to oversee auctions and verify payments. Automation mechanisms are used to handle auction completion and commission verification, making the system reliable and scalable.

---

## Live Application Links

Frontend (Vercel):  
https://auction-platform-project-frontend.vercel.app  

Backend (Render):  
https://auction-platform-project-2.onrender.com  

---

## Key Features

### User Authentication and Authorization
- Secure registration and login system
- JWT-based authentication using HTTP-only cookies
- Role-based access control (Bidder, Auctioneer, Super Admin)

### Bidder Functionalities
- View live and upcoming auctions
- Place bids on auction items
- View bidding history
- Manage personal profile

### Auctioneer Functionalities
- Create and manage auction items
- Upload auction images
- Set starting bid values and auction duration
- Republish expired auctions
- View own auction listings

### Super Admin Functionalities
- View system-wide auction data
- Manage and delete auctions
- Verify payment proofs
- Update payment status (Pending, Approved, Rejected, Settled)
- Remove invalid payment proofs

### Payment Management
- Upload payment proof screenshots
- Admin-controlled verification workflow
- Secure status tracking of payments

### Automation
- Cron jobs to automatically end auctions
- Automated commission verification
- Scheduled auction status updates

---

## Technology Stack

### Frontend
- React (Vite)
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cookie Parser
- Cloudinary (Image Uploads)
- Express File Upload
- Cron Jobs

### Deployment and Services
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Media Storage: Cloudinary

---

## Project Structure

Auction-Platform-Project/
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── store/
│ │ └── App.jsx
│ └── vite.config.js
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middlewares/
│ ├── automation/
│ ├── database/
│ └── app.js
│
└── README.md


## How to Run the Project Locally

1. Clone the repository
git clone https://github.com/LeenaMondal01/Auction-Platform-Project

2. Start the backend server
cd backend
npm install
npm run dev

3. Start the frontend application
cd frontend
npm install
npm run dev


Frontend runs on: `http://localhost:5173`  
Backend runs on: `http://localhost:5000`

---

## Security and Error Handling

- Secure JWT authentication
- Protected routes using middleware
- Centralized error handling in backend
- User-friendly error messages using toast notifications

---

## Future Enhancements

- Real-time bidding using WebSockets
- Online payment gateway integration
- Email and SMS notifications
- Auction recommendation system
- Advanced admin analytics dashboard

---

## License

This project is developed for academic and learning purposes.  
All rights reserved © 2025.

---

⭐ Thank you for exploring the PrimeBid Auction Platform.
