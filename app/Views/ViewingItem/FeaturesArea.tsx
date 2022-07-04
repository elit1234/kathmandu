type Props = {
  features?: [string];
  careFeatures?: [string];
  materials?: [MaterialType];
};

const DropArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      style={{ color: "var(--green)" }}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
    </svg>
  );
};

const FeaturesArea = (props: Props) => {
  const { features, careFeatures, materials } = props;

  const clicked = (target: string) => {
    const element = document.querySelector(target)!;

    if (element.style.transform !== "scaleY(1)") {
      element.style.transform = "scaleY(1)";
      element.style.height = "100%";
    } else {
      element.style.transform = "scaleY(0)";
      element.style.height = "0";
    }
  };

  return (
    <div className="featuresContainer">
      <div className="featuresArea" onClick={() => clicked(".featuresDrop")}>
        <div className="featuresTitle"> Features</div>
        <DropArrow />
      </div>
      <ul className="drop featuresDrop">
        {features &&
          features.map((feature, key) => {
            return (
              <li key={key} className="featuresDropitem">
                {feature}
              </li>
            );
          })}
      </ul>
      <div className="featuresArea" onClick={() => clicked(".materialsDrop")}>
        <div className="featuresTitle"> Materials & Size.</div>
        <DropArrow />
      </div>
      <div className="drop materialsDrop">
        {materials &&
          materials.map((material, key) => {
            return (
              <div className="materialsDropItem" key={key}>
                <div style={{ fontWeight: "bold" }}>{material.name}</div>
                <div>{material.value}</div>
              </div>
            );
          })}
        <div className="materialsChartButton">View Chart</div>
      </div>
    </div>
  );
};

export default FeaturesArea;
