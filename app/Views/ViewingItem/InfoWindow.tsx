type Props = {
  paragraphs: Paragraph[];
};

type Paragraph = {
  bold?: boolean;
  message: string;
};

const InfoWindow = (props: Props) => {
  const { paragraphs } = props;
  const userClickedMessage = () => {
    const infoWindow = document.querySelector(".infoWindow")!;
    if (infoWindow.style.opacity !== "1") {
      infoWindow.style.opacity = "1";
      infoWindow.style.transform = "scale(1)";
    } else {
      infoWindow.style.opacity = "0";
      infoWindow.style.transform = "scale(0)";
    }
  };
  return (
    <div className="infoWindow">
      <div className="infoWindowClose" onClick={() => userClickedMessage()}>
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
      {paragraphs &&
        paragraphs.map((paragraph, key) => {
          if (paragraph.bold)
            return (
              <div
                className="infoWindowText"
                key={key}
                style={{
                  fontWeight: "bold",
                  paddingTop: key === 0 ? "2rem" : "5%",
                  color: "#606060",
                }}
              >
                {paragraph.message}
              </div>
            );
          else
            return (
              <div className="infoWindowText" key={key}>
                {paragraph.message}
              </div>
            );
        })}
    </div>
  );
};

export default InfoWindow;
