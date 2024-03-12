import React from "react";

function WineStyle({ wineInfo }) {
  const getGraphColor = () => {
    const wineType = wineInfo?.wineType;
    switch (wineType) {
      case "Red":
        return "#d51661";
      case "White":
        return "#f1ecb0";
      case "Sparkling":
        return "#d4e789";
      case "Rose":
        return "#f87da9";
      default:
        return "#b23535";
    }
  };

  const getStyleName = (style) => {
    switch (style) {
      case "sweet":
        return "당도";
      case "acidity":
        return "신맛";
      case "body":
        return "부드러움";
      case "tannin":
        return "떪음";
      default:
        return "";
    }
  };

  // 스타일 그래프 생성
  const renderStyleGraph = () => {
    if (!wineInfo) return null;

    return (
        <div className="wine-style mt-3">
          <h3 className="mb-3 text-center">와인 스타일</h3>
          <div className="row">
            {["sweet", "acidity", "body", "tannin"].map((style, index) => (
                <div key={index} className="col-12 mt-4">
                  <div className="text-center mb-2">
                    <h5>{getStyleName(style)}</h5>
                  </div>
                  <div className="progress">
                    <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${
                              (extractNumberFromStyle(wineInfo[style]) / 5) * 100
                          }%`,
                          backgroundColor: getGraphColor(),
                        }}
                        aria-valuenow={extractNumberFromStyle(wineInfo[style])}
                        aria-valuemin="0"
                        aria-valuemax="5"
                    ></div>
                  </div>
                </div>
            ))}
          </div>
        </div>
    );
  };

  const extractNumberFromStyle = (style) => {
    const match = style.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  return renderStyleGraph();
}

export default WineStyle;
