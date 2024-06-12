import axios from "axios";
import { useState, useEffect } from "react";

function HomePage() {
  const [trips, setTrips] = useState([]);
  const [inputText, setInputText] = useState("");

  async function getTrips(searchText) {
    const response = await axios.get(
      `http://localhost:4001/trips?keywords=${searchText}`
    );
    setTrips(response.data.data);
  }

  useEffect(() => {
    getTrips(inputText);
  }, [inputText]);

  return (
    <>
      <header>
        <h1>เที่ยวไหนดี</h1>
      </header>
      <section className="inputSearch">
        <p>ค้นหาที่เที่ยว</p>
        <input
          placeholder="หาที่เที่ยวแล้วไปกัน"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
      </section>
      <section className="displaySearch">
        {trips.map((trip) => (
          <div className="tripCard" key={trip.eid}>
            <img
              className="mainImage"
              src={trip.photos[0]}
              width={200}
              height={150}
            />
            <h3>{trip.title}</h3>
            <p className="tripDescription">
              {trip.description.slice(0, 100)}...
            </p>
            <a href={trip.url} target="_blank">
              อ่านต่อ
            </a>
          </div>
        ))}
      </section>
    </>
  );
}

export default HomePage;
