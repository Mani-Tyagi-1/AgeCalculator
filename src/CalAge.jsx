import React, { useState, useEffect } from "react";

const RealTimeClock = () => {
  const [inputDateTime, setInputDateTime] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (event) => {
    setInputDateTime(event.target.value);
  };

  const calculateTimeDifference = () => {
    const inputDate = new Date(inputDateTime);
    const diff = currentTime.getTime() - inputDate.getTime();

    const year = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const month =
      Math.floor(
        (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.44)
      ) ;

    const day = Math.floor(
      (diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { year, month, day, hours, minutes, seconds };
  };

  const { year, month, day, hours, minutes, seconds } =
    calculateTimeDifference();

  const formatTime = (time) => {
    return `time < 10 ? 0${time} : time`;
  };

  const formattedCurrentTime = `${formatTime(
    currentTime.getHours()
  )}:${formatTime(currentTime.getMinutes())}:${formatTime(
    currentTime.getSeconds()
  )}`;

  const handlebtn = () => {
    {
      {
        document.querySelector(".age-container").classList.remove("hidden");
      }
    }
  };

  return (
    <div className="h-screen w-full bg-[#070F2B]  flex flex-wrap justify-center items-center ">
      <div className="h-[400px] w-[500px] border-[#535C91] border-4 rounded-[15px] text-center">
        <h1 className="text-[#9290C3] text-[2rem]">Age Calculator</h1>
        <div className="w-full h-1 bg-[#535C91]"></div>

        <div className="flex justify-start p-7 text-[1.25rem]">
          <label htmlFor="Input" className=" text-white pr-4 mr-2">
            Enter a date and time:
            <input
              className="bg-[#535C91] rounded-lg mt-2"
              type="datetime-local"
              value={inputDateTime}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <button
          id="show-age-button"
          className="bg-[#535C91] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlebtn}
        >
          Show Age
        </button>

        <div className="text-white text-[1.5rem] m-7 hidden age-container">
          <p>Your Age is:</p>
          <p>
            {year} Year {month < 0 ? 0 : month} Month {day} Days, {hours} Hours,{" "}
            {minutes} Minutes, {seconds} Seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default RealTimeClock;
