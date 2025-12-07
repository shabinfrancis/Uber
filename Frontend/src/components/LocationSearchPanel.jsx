// import React from 'react'

// const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

//     const handleSuggestionClick = (suggestion) => {
//         if (activeField === 'pickup') {
//             setPickup(suggestion)
//         } else if (activeField === 'destination') {
//             setDestination(suggestion)
//         }
//         setVehiclePanel(true)
//         setPanelOpen(false)
//     }

//     return (
//         <div>
//             {/* Display fetched suggestions */}
//             {
//                 suggestions.map((elem, idx) => (
//                     <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
//                         <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
//                         <h4 className='font-medium'>{elem}</h4>
//                     </div>
//                 ))
//             }
//         </div>
//     )
// }

// export default LocationSearchPanel

import React from 'react'

const LocationSearchPanel = ({
  suggestions = [],                // default to an array
  setVehiclePanel,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField
}) => {

  const handleSuggestionClick = (suggestion) => {
    // suggestion might be an object from Mapbox like:
    // { place_name: "Mumbai, India", lat: 19.07, lng: 72.87, id: "place.123" }
    if (activeField === 'pickup') {
      setPickup(suggestion)
    } else if (activeField === 'destination') {
      setDestination(suggestion)
    }

    // optional UI behaviour
    // if (typeof setVehiclePanel === 'function') setVehiclePanel(true)
    // if (typeof setPanelOpen === 'function') setPanelOpen(false)
  }

  return (
    <div>
      {Array.isArray(suggestions) && suggestions.length > 0 ? (
        suggestions.map((elem, idx) => {
          // support both string suggestions and object suggestions
          const label =
            typeof elem === 'string'
              ? elem
              : (elem.place_name || elem.name || elem.text || elem.address || JSON.stringify(elem))

          // prefer a stable key: id, place_id, coordinates fallback to idx
          const key =
            (typeof elem === 'object' && (elem.id || elem.place_id)) ||
            (elem.center ? elem.center.join(',') : `sugg-${idx}`)

          return (
            <div
              key={key}
              onClick={() => handleSuggestionClick(elem)}
              className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer'
            >
              <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                <i className="ri-map-pin-fill"></i>
              </h2>
              <h4 className='font-medium'>{label}</h4>
            </div>
          )
        })
      ) : (
        <div className='p-3 text-sm text-gray-500'>No suggestions</div>
      )}
    </div>
  )
}

export default LocationSearchPanel
