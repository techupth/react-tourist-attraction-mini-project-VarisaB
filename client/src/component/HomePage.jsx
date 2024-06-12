import axios from "axios";
import { useState, useEffect } from "react";
import "./HomePage.css";

function HomePage() {
  const [trips, setTrips] = useState([]);
  const [inputText, setInputText] = useState("");

  async function getTrips(searchText) {
    // console.log(searchText);
    const response = await axios.get(
      `http://localhost:4001/trips?keywords=${searchText}`
    );
    // console.log(response);
    setTrips(response.data.data);
  }

  useEffect(() => {
    getTrips(inputText);
  }, [inputText]);

  return (
    <div className="wholePage">
      <header>
        <h1>เที่ยวไหนดี</h1>
      </header>
      <section className="inputSearch">
        <label>ค้นหาที่เที่ยว</label>
        <br />
        <input
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
      </section>
      <section className="displaySearch">
        {trips.map((trip) => (
          <div className="tripCard" key={trip.eid}>
            <img className="mainImage" src={trip.photos[0]} />
            <div className="tripInfo">
              <h4>
                <a className="title" href={trip.url} target="_blank">
                  {trip.title}
                </a>
              </h4>
              <p className="tripDescription">
                {trip.description.slice(0, 100)}...
              </p>
              <a className="moreDetail" href={trip.url} target="_blank">
                อ่านต่อ
              </a>
              <p className="categories">
                หมวด
                {trip.tags.map((tag, index) => (
                  <span
                    className="tag"
                    key={index}
                    onClick={() => {
                      setInputText((inputText + " " + tag).trim());
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </p>
              <div className="otherImageContainer">
                {trip.photos.slice(1).map((url, index) => (
                  <img className="otherImage" key={index} src={url} />
                ))}
              </div>
            </div>
            <img
              className="copyIcon"
              src="/icons-copy-link.png"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(trip.url);
                  alert(`copy URL: ${trip.url}`);
                } catch (error) {
                  alert("Don't have URL");
                }
              }}
            />
          </div>
        ))}
      </section>
    </div>
  );
}

export default HomePage;
