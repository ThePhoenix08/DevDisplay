import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';

function Globe() {
  const canvasRef = useRef();
  const [globeSize, setGlobeSize] = useState(getGlobeSize());

  function getGlobeSize() {
    if (window.innerWidth >= 1280) return 600;
    if (window.innerWidth >= 1024) return 500;
    if (window.innerWidth >= 768) return 470;
    if (window.innerWidth >= 640) return 380;
    if (window.innerWidth >= 475) return 320;
    return 300;
  }

  useEffect(() => {
    const handleResize = () => {
      setGlobeSize(getGlobeSize());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      width: globeSize,
      height: globeSize,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 }, // San Francisco
        { location: [40.7128, -74.006], size: 0.03 }, // New York
        { location: [1.3521, 103.8198], size: 0.03 }, // Singapore
        { location: [35.8617, 104.1954], size: 0.03 }, // China
        { location: [-14.235, -51.9253], size: 0.03 }, // Brazil
        { location: [30.3753, 69.3451], size: 0.03 }, // Pakistan
        { location: [28.7041, 77.1025], size: 0.03 }, // Delhi
        { location: [19.076, 72.8777], size: 0.03 }, // Maharashtra
        { location: [13.0827, 80.2707], size: 0.03 }, // Tamil Nadu
        { location: [22.5726, 88.3639], size: 0.03 }, // West Bengal
        { location: [12.9716, 77.5946], size: 0.03 }, // Karnataka
        { location: [17.385, 78.4867], size: 0.03 }, // Telangana
        { location: [23.2599, 77.4126], size: 0.03 }, // Madhya Pradesh
        { location: [26.9124, 75.7873], size: 0.03 }, // Rajasthan
        { location: [21.1702, 72.8311], size: 0.03 }, // Gujarat
        { location: [11.0168, 76.9558], size: 0.03 }, // Kerala
        { location: [15.2993, 74.124], size: 0.03 }, // Goa
        { location: [25.3176, 82.9739], size: 0.03 }, // Uttar Pradesh
        { location: [27.0238, 74.2179], size: 0.03 }, // Haryana
        { location: [30.7333, 76.7794], size: 0.03 }, // Punjab
        { location: [31.1048, 77.1734], size: 0.03 }, // Himachal Pradesh
        { location: [34.0837, 74.7973], size: 0.03 }, // Jammu and Kashmir
        { location: [15.9129, 79.74], size: 0.03 }, // Andhra Pradesh
        { location: [22.9734, 78.6569], size: 0.03 }, // Chhattisgarh
        { location: [23.6102, 85.2799], size: 0.03 }, // Jharkhand
        { location: [20.9517, 85.0985], size: 0.03 }, // Odisha
        { location: [25.0961, 85.3131], size: 0.03 }, // Bihar
        { location: [24.6637, 93.9063], size: 0.03 }, // Manipur
        { location: [27.533, 88.5122], size: 0.03 }, // Sikkim
        { location: [26.2006, 92.9376], size: 0.03 }, // Assam
        { location: [23.1645, 92.9376], size: 0.03 }, // Tripura
        { location: [25.467, 91.3662], size: 0.03 }, // Meghalaya
        { location: [27.0238, 93.6053], size: 0.03 }, // Arunachal Pradesh
        { location: [25.5705, 91.8801], size: 0.03 }, // Mizoram
        { location: [24.517, 93.953], size: 0.03 }, // Nagaland
        { location: [11.9416, 79.8083], size: 0.03 }, // Puducherry
        { location: [10.8505, 76.2711], size: 0.03 }, // Lakshadweep
        { location: [8.0883, 77.5385], size: 0.03 }, // Andaman and Nicobar Islands
        { location: [9.082, 8.6753], size: 0.03 }, // Nigeria
        { location: [28.3949, 84.124], size: 0.03 }, // Nepal
        { location: [7.8731, 80.7718], size: 0.03 }, // Sri Lanka
        { location: [23.685, 90.3563], size: 0.03 }, // Bangladesh
        { location: [33.9391, 67.71], size: 0.03 }, // Afghanistan
        { location: [51.5074, -0.1278], size: 0.03 }, // England
        { location: [55.7558, 37.6173], size: 0.03 }, // Russia
        { location: [25.2048, 55.2708], size: 0.03 }, // UAE
        { location: [34.0522, -118.2437], size: 0.03 }, // Los Angeles
        { location: [41.8781, -87.6298], size: 0.03 }, // Chicago
        { location: [29.7604, -95.3698], size: 0.03 }, // Houston
        { location: [33.4484, -112.074], size: 0.03 }, // Phoenix
        { location: [39.7392, -104.9903], size: 0.03 }, // Denver
        { location: [48.8566, 2.3522], size: 0.03 }, // Paris, France
        { location: [52.52, 13.405], size: 0.03 }, // Berlin, Germany
        { location: [35.6895, 139.6917], size: 0.03 }, // Tokyo, Japan
        { location: [37.5665, 126.978], size: 0.03 }, // Seoul, South Korea
        { location: [31.2304, 121.4737], size: 0.03 }, // Shanghai, China
        { location: [22.3964, 114.1095], size: 0.03 }, // Hong Kong
        { location: [55.7558, 37.6173], size: 0.03 }, // Moscow, Russia
        { location: [40.7128, -74.006], size: 0.03 }, // New York, USA
        { location: [34.0522, -118.2437], size: 0.03 }, // Los Angeles, USA
        { location: [51.5074, -0.1278], size: 0.03 }, // London, UK
        { location: [35.6895, 139.6917], size: 0.03 }, // Tokyo, Japan
        { location: [37.7749, -122.4194], size: 0.03 }, // San Francisco, USA
        { location: [28.6139, 77.209], size: 0.03 }, // New Delhi, India
        { location: [19.076, 72.8777], size: 0.03 }, // Mumbai, India
        { location: [13.0827, 80.2707], size: 0.03 }, // Chennai, India
        { location: [22.5726, 88.3639], size: 0.03 }, // Kolkata, India
        { location: [12.9716, 77.5946], size: 0.03 }, // Bangalore, India
        { location: [17.385, 78.4867], size: 0.03 }, // Hyderabad, India
        { location: [23.2599, 77.4126], size: 0.03 }, // Bhopal, India
        { location: [26.9124, 75.7873], size: 0.03 }, // Jaipur, India
        { location: [21.1702, 72.8311], size: 0.03 }, // Surat, India
        { location: [11.0168, 76.9558], size: 0.03 }, // Coimbatore, India
        { location: [15.2993, 74.124], size: 0.03 }, // Goa, India
        { location: [25.3176, 82.9739], size: 0.03 }, // Varanasi, India
        { location: [27.0238, 74.2179], size: 0.03 }, // Ajmer, India
        { location: [30.7333, 76.7794], size: 0.03 }, // Chandigarh, India
        { location: [31.1048, 77.1734], size: 0.03 }, // Shimla, India
        { location: [34.0837, 74.7973], size: 0.03 }, // Srinagar, India
        { location: [15.9129, 79.74], size: 0.03 }, // Andhra Pradesh, India
        { location: [22.9734, 78.6569], size: 0.03 }, // Chhattisgarh, India
        { location: [23.6102, 85.2799], size: 0.03 }, // Ranchi, India
        { location: [20.9517, 85.0985], size: 0.03 }, // Bhubaneswar, India
        { location: [25.0961, 85.3131], size: 0.03 }, // Patna, India
        { location: [24.6637, 93.9063], size: 0.03 }, // Imphal, India
        { location: [27.533, 88.5122], size: 0.03 }, // Gangtok, India
        { location: [26.2006, 92.9376], size: 0.03 }, // Guwahati, India
        { location: [23.1645, 92.9376], size: 0.03 }, // Agartala, India
        { location: [25.467, 91.3662], size: 0.03 }, // Shillong, India
        { location: [27.0238, 93.6053], size: 0.03 }, // Itanagar, India
        { location: [25.5705, 91.8801], size: 0.03 }, // Aizawl, India
        { location: [24.517, 93.953], size: 0.03 }, // Kohima, India
        { location: [11.9416, 79.8083], size: 0.03 }, // Puducherry, India
        { location: [10.8505, 76.2711], size: 0.03 }, // Lakshadweep, India
        { location: [8.0883, 77.5385], size: 0.03 }, // Andaman and Nicobar Islands, India
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, [globeSize]);

  return (
    <div className="mx-auto flex w-full items-center justify-center overflow-hidden">
      <div className="w-[300px] overflow-hidden xs:w-[320px] sm:w-[380px] md:w-[470px] lg:w-[500px] xl:w-[600px]">
        <canvas
          ref={canvasRef}
          style={{
            width: `${globeSize}px`,
            height: `${globeSize}px`,
          }}
          className="overflow-hidden"
        />
      </div>
    </div>
  );
}

export default Globe;
