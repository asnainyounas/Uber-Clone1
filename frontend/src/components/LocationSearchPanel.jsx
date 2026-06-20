const LocationSearchPanel = ({
  suggestions,
  setVehiclePanel,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion);
    } else if (activeField === 'destination') {
      setDestination(suggestion);
    }
    setVehiclePanel(true);
    setPanelOpen(false);
  };

  return (
    <div>
      {(suggestions || []).map((elem, index) => {
        const text = typeof elem === 'string' ? elem : elem.description;

        return (
          <div
            key={index}
            onClick={() => handleSuggestionClick(text)}
            className="flex items-center border-2 border-gray-50 justify-start gap-4 rounded-xl p-3 my-2"
          >
            <div className="shrink-0 bg-[#eee] h-8 w-8 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill"></i>
            </div>

            <h4 className="font-medium truncate">{text}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
