import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import initialPositions from "../data/initial_positions1.json";
import updatedPositions from "../data/updated_positions1.json";
import floorPlan from "../images/secondImage.jpg";

const initialZones = [
  { id: "Zone 1", x: 180, y: 240, xd: -640, yd: 165, width: 250, height: 250 },
  { id: "Zone 2", x: 420, y: 200, xd: -620, yd: 25, width: 550, height: 550 },
  { id: "Zone 3", x: 610, y: 220, xd: -575, yd: -185, width: 1000, height: 1000},
  { id: "Zone 4", x: 900, y: 150, xd: -400, yd: -260, width: 2000, height: 2000 },
];
const ZonesData = [
  { label: "Zone 1", color: "#c2fcff54" },
  { label: "Zone 2", color: "#fcf7c059" },
  { label: "Zone 3", color: "#d9dcff45" },
  { label: "Zone 4", color: "#f8c5bd6b" },
];


function EmployeeMap() {
  const [positions, setPositions] = useState(initialPositions);
  const [zones, setZones] = useState(initialZones);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setZones((prevZones) =>
          prevZones.map((zone) => {
            if (zone.id === "Zone 1") {
              return { ...zone, x: 120, y: 170, xd: -400, yd: 140, width: 160, height: 160 };
            } else if (zone.id === "Zone 2") {
              return { ...zone, x: 250, y: 120, xd: -400, yd: 35, width: 380, height: 380 };
            }
            else if (zone.id === "Zone 3") {
              return { ...zone, x: 410, y: 150, xd: -400, yd: -120, width: 700, height: 700 };
            }
            else if (zone.id === "Zone 4") {
              return { ...zone, x: 550, y: 50, xd: -400, yd: -260, width: 1500, height: 1500 };
            }
            return zone;
          })
        );
      }if (window.innerWidth < 576) {
        setZones((prevZones) =>
          prevZones.map((zone) => {
            if (zone.id === "Zone 1") {
              return { ...zone, x: 110, y: 130, xd: -300, yd: 120, width: 100, height: 100 };
            } else if (zone.id === "Zone 2") {
              return { ...zone, x: 180, y: 50, xd: -330, yd: 35, width: 280, height: 280 };
            }
            else if (zone.id === "Zone 3") {
              return { ...zone, x: 310, y: 100, xd: -330, yd: -90, width: 550, height: 550 };
            }
            else if (zone.id === "Zone 4") {
              return { ...zone, x: 450, y: 0, xd: -300, yd: -220, width: 900, height: 900 };
            }
            return zone;
          })
        );
      } else {
        setZones(initialZones);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setPositions(updatedPositions);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  const handleEmployeeClick = (employee) => {
    alert(`Employee: ${employee.firstName}, Zone: ${employee.zone}`);
  };
  function getZoneCoordinates(zoneId) {
    const zone = zones.find((z) => z.id === zoneId);
    return zone ? { x: zone.x, y: zone.y } : { x: 0, y: 0 };
  }
  return (
    <div className="map-container">
      <img src={floorPlan} alt="Office Floor Plan" className="floor-plan" />
      <div className="map-inner">
      {zones.map((zone, i) => (
          <div
            key={i}
            className={`zone${i}`}
            style={{
              backgroundColor: ZonesData.find((color) => color.label === zone.id)
              ?.color,
              left: zone.xd,
              top: zone.yd,
              width: zone.width,
              height: zone.height,
            }}
          ></div>))}
        {positions.map((employee, i) => {
          let { x, y } = getZoneCoordinates(employee.zone);
          return (
            <motion.div
              key={i}
              className="employee-icon"
              initial={{ x, y }}
              animate={{ x, y }}
              transition={{ duration: 2, ease: "easeInOut" }}
              onClick={() => handleEmployeeClick(employee)}
            ></motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default EmployeeMap;
