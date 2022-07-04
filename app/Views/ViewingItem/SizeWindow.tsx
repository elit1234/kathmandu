import { useEffect } from "react";

const SizeWindow = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const openBtn = document.querySelector(".materialsChartButton")!;
      const closeBtn = document.querySelector(".sizeWindowClose")!;

      const sizeWindow = document.querySelector(".sizeWindow")!;
      closeBtn.addEventListener("click", () => {
        sizeWindow.setAttribute("style", "opacity: 0");
        sizeWindow.style.transform = "scale(0)";
      });

      openBtn.addEventListener("click", () => {
        sizeWindow.setAttribute("style", "opacity: 1");
        sizeWindow.style.transform = "scale(1)";
      });

      return () => {
        closeBtn.removeEventListener("click", () => {});
        openBtn.removeEventListener("click", () => {});
      };
    }
  }, []);

  return (
    <div className="sizeWindow">
      <div className="sizeWindowClose">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
        </svg>
      </div>
      <div className="sizeWindowGrey">
        <div className="sizeWindowGreyTitle">Please Note</div>
        <div className="sizeWindowGreyMessage">
          All measurements listed below are in centimetres and based on actual
          body measurements, not garment measurements.
        </div>
      </div>
      <div className="sizeWindowGrey">
        <div className="sizeWindowGreyTitle">How To Measure</div>
        <div className="sizeWindowGreyMessage">
          <b>Chest:</b> All measurements listed below are in centimetres and
          based on actual body measurements, not garment measurements.
        </div>
        <div className="sizeWindowGreyMessage">
          <b>Waist:</b> Measure around the smallest part of your waist (natural
          waistline).
        </div>
        <div className="sizeWindowGreyMessage">
          <b>Hips:</b> Stand with your heels together and measure around the
          fullest part.
        </div>
        <div className="sizeWindowGreyMessage">
          <b>Inside Leg:</b> Measure from the top of your inner leg along the
          inside seam to the bottom of your leg.
        </div>
      </div>
    </div>
  );
};

export default SizeWindow;
