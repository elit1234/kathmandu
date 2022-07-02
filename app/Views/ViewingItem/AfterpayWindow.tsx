const AfterpayWindow = () => {
  const userClickedAfterpayInfo = () => {
    const afterpayWindow = document.querySelector(".afterpayWindow")!;
    if (afterpayWindow.style.opacity !== "1") {
      afterpayWindow.style.opacity = "1";
      afterpayWindow.style.transform = "scale(1)";
    } else {
      afterpayWindow.style.opacity = "0";
      afterpayWindow.style.transform = "scale(0)";
    }
  };

  return (
    <div className="afterpayWindow">
      <div className="afterpayClose" onClick={() => userClickedAfterpayInfo()}>
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
      <img className="afterpayWindowImage" src="/img/afterpay.svg" />
      <div className="afterpayWindowText">
        Shop now. Pay later. Always interest-free.
      </div>
      <div className="afterpayWindowRow" style={{ paddingLeft: "5%" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="84"
          height="84"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M7 8V6a5 5 0 1 1 10 0v2h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3zm0 2H5v10h14V10h-2v2h-2v-2H9v2H7v-2zm2-2h6V6a3 3 0 0 0-6 0v2z" />
        </svg>
        <div> Add your favourites to cart</div>
      </div>
      <div className="afterpayWindowRow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="84"
          height="84"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M7 4v16h10V4H7zM6 2h12a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm6 15a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <div>Select Afterpay at checkout</div>
      </div>
      <div className="afterpayWindowRow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="84"
          height="84"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M7 4v16h10V4H7zM6 2h12a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm6 15a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <div>
          Log into or create your Afterpay account, instant approval decision
        </div>
      </div>
      <div className="afterpayWindowRow" style={{ paddingLeft: "5%" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="84"
          height="84"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 22C6.477 22 2 17.523 2 12c0-4.478 2.943-8.268 7-9.542v2.124A8.003 8.003 0 0 0 12 20a8.003 8.003 0 0 0 7.418-5h2.124c-1.274 4.057-5.064 7-9.542 7zm9.95-9H11V2.05c.329-.033.663-.05 1-.05 5.523 0 10 4.477 10 10 0 .337-.017.671-.05 1zM13 4.062V11h6.938A8.004 8.004 0 0 0 13 4.062z" />
        </svg>
        <div>
          Your purchase will be split into 4 payments, payable every 2 weeks
        </div>
      </div>
    </div>
  );
};

export default AfterpayWindow;
