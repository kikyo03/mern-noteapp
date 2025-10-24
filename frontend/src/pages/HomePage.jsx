import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import RateLimit from "../components/RateLimit";
import { toast } from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NoteNotFound from "../components/NoteNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // code for fetching the notes from the api
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes:", error);
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* if rate limited this will show */}
      {isRateLimited && <RateLimit />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {/* loading here */}
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {/* if there is no notes, show this */}
        {notes.length === 0 && !isRateLimited && <NoteNotFound />}

        {/* show the notes here */}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-8">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
