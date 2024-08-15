import CabinIcon from "@mui/icons-material/Cabin";

export default function LoadingIcon() {
  return (
    <div className="w-24 h-24 relative">
      <CabinIcon className="h-[125px] w-[125px] z-700 absolute top-[37%] left-9" />
      <div className="flex justify-center items-center h-24 w-24 border border-black animate-bounce border-b-[10px] rounded-[100%]"></div>
    </div>
  );
}
