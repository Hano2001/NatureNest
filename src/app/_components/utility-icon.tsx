import AccessibleIcon from "@mui/icons-material/Accessible";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import PoolIcon from "@mui/icons-material/Pool";
import RoofingIcon from "@mui/icons-material/Roofing";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import WcIcon from "@mui/icons-material/Wc";
import ForestIcon from "@mui/icons-material/Forest";
import LocalParkingIcon from "@mui/icons-material/LocalParking";

export default function UtilityIcon({ type }: { type: string }) {
  switch (type) {
    case "Ocean" || "Ocean":
      return <PoolIcon />;
    case "Public Transport":
      return <DirectionsBusIcon />;
    case "Bathrooms":
      return <WcIcon />;
    case "Forest":
      return <ForestIcon />;
    case "Parking":
      return <LocalParkingIcon />;
    case "Lean-to":
      return <RoofingIcon />;
    case "Store":
      return <LocalGroceryStoreIcon />;
    case "Wheelchair Accessible":
      return <AccessibleIcon />;
    case "Campfire":
      return <WhatshotIcon />;
    case "Beach":
      return <BeachAccessIcon />;
  }
}

// "",
//     "",
//     ,
//     ≈,
//     "",
//
//     "",
//     "",
//     "",
//     "Beach",
