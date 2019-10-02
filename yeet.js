const markerList = [
    {
        lat: 34.0668,
        lng: -119.1684,
        name: "ABC Hospitals",
        info: 10
    },
    {
        lat: 35.442889,
        lng: -119.396873,
        name: "XYZ Hospitals",
        info: 20
    },
    {
        lat: 33.441681,
        lng: -118.394357,
        name: "NRI Hospitals",
        info: 10
    }
];

markerList.map((marker, index) => {

    console.log(marker.name)
})