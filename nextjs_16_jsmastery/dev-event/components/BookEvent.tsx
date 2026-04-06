// @/components/BookEvent.tsx
"use client";
import React from "react";
import { createBooking } from "@/lib/actions/booking.actions";
import { useState } from "react";

// Define the interface for your props
interface BookEventProps {
  eventId: string; // or number, depending on your data
  slug: string;
}

// Destructure the props in the component arguments
const BookEvent = ({ eventId, slug }: BookEventProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault(); // Moved to the top to prevent page reload immediately

    // Now eventId and slug are available here from the props
    const { success } = await createBooking({ eventId, slug, email });

    if (success) {
      setSubmitted(true);
    } else {
      console.error("Booking creation failed");
    }

    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;