import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import AllRooms from "./Pages/AllRooms";
import RoomDetails from "./Pages/RoomDetails";
import MyBookings from "./Pages/MyBookings";

import Layout from "./Pages/hotelOwner/Layout";
import Dashboard from "./Pages/hotelOwner/Dashboard";
import AddRoom from "./Pages/hotelOwner/AddRoom";
import ListRoom from "./Pages/hotelOwner/ListRoom";

function App() {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const [bookings, setBookings] = useState([]);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userBookings") || "[]");
    setBookings(stored);
  }, []);

  // Sync bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("userBookings", JSON.stringify(bookings));
    localStorage.setItem("ownerBookings", JSON.stringify(bookings));
  }, [bookings]);

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      <div className="min-h-[70vh]">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms bookings={bookings} />} />
          <Route
            path="/rooms/:id"
            element={<RoomDetails bookings={bookings} setBookings={setBookings} />}
          />
          <Route
            path="/my-bookings"
            element={<MyBookings bookings={bookings} setBookings={setBookings} />}
          />

          {/* Owner Routes */}
          <Route path="/owner" element={<Layout />}>
            <Route
              index
              element={<Dashboard bookings={bookings} setBookings={setBookings} />}
            />
            <Route
              path="add-room"
              element={<AddRoom bookings={bookings} setBookings={setBookings} />}
            />
            <Route
              path="list-room"
              element={<ListRoom bookings={bookings} setBookings={setBookings} />}
            />
          </Route>
        </Routes>
      </div>
      {!isOwnerPath && <Footer />}
    </div>
  );
}

export default App;
