import React from "react";

const Logo: React.FC = () => {
  const handleLogoClick = () => {
    const logo = document.getElementById("logo");
    const logoRect = logo?.getBoundingClientRect();

    if (logoRect) {
      const logoCenterX = logoRect.left + logoRect.width / 2;
      const logoCenterY = logoRect.top + logoRect.height / 2;

      const numBees = Math.floor(Math.random() * 2) + 2; // 2 or 3 bees
      for (let i = 0; i < numBees; i++) {
        const bee = document.createElement("img");
        bee.src = "/images/bee.png"; // Path to your bee image
        bee.className = "bee";
        bee.style.top = `${logoCenterY}px`;
        bee.style.left = `${logoCenterX}px`;

        // Apply random initial rotation to each bee
        const randomRotation = Math.random() * 360;
        bee.style.transform = `rotate(${randomRotation}deg)`;

        document.body.appendChild(bee);
        setTimeout(() => {
          document.body.removeChild(bee);
        }, 2000); // Remove bee after 2 seconds
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <style>
        {`
          @keyframes buzz {
            0% {
              transform: translate(0, 0) rotate(0deg);
            }
            10% {
              transform: translate(10px, -10px) rotate(45deg);
            }
            20% {
              transform: translate(-10px, 10px) rotate(90deg);
            }
            30% {
              transform: translate(10px, 10px) rotate(135deg);
            }
            40% {
              transform: translate(-10px, -10px) rotate(180deg);
            }
            50% {
              transform: translate(0, 0) rotate(225deg);
            }
            60% {
              transform: translate(10px, -10px) rotate(270deg);
            }
            70% {
              transform: translate(-10px, 10px) rotate(315deg);
            }
            80% {
              transform: translate(10px, 10px) rotate(360deg);
            }
            90% {
              transform: translate(-10px, -10px) rotate(405deg);
            }
            100% {
              transform: translate(0, 0) rotate(450deg);
            }
          }
          .bee {
            width: 120px; /* Adjust size as needed */
            height: 120px; /* Adjust size as needed */
            position: absolute;
            pointer-events: none; /* So that clicks pass through the bee */
            animation: buzz 2s infinite;
          }
        `}
      </style>
      <img
        id="logo"
        src="/images/honeyDooLogoV1.png"
        alt="Logo"
        onClick={handleLogoClick}
        style={{
          display: "block",
          margin: "0 0 -70px",
          width: "100%", // Make the image responsive
          maxWidth: "800px", // Adjust the width as needed
          height: "auto",
          cursor: "pointer", // Add a pointer cursor
        }}
      />
    </div>
  );
};

export default Logo;
