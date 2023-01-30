import React from "react";
import { type Room } from "twilio-video";

interface RoomScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  exitRoom: () => void;
  room: Room
}
const RoomScreen = () => {
  return <div>RoomScreen</div>;
};

export default RoomScreen;
