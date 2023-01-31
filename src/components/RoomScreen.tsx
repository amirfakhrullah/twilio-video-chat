import React, { useEffect, useState } from "react";
import { Participant, type Room } from "twilio-video";
import ParticipantScreen from "./ParticipantScreen";

interface RoomScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  exitRoom: () => void;
  room: Room;
}
const RoomScreen = ({ room, exitRoom, ...props }: RoomScreenProps) => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const participantConnected = (participant: Participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant: Participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };
    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);

    return () => {
      room.off("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  return (
    <div {...props}>
      <ParticipantScreen participant={room.localParticipant} />
      <button type="button" onClick={() => exitRoom()}>
        Exit
      </button>
      <h3>Remote Participants</h3>
      <div>
        {participants.map((participant, idx) => (
          <ParticipantScreen
            key={`remote_participant_${idx}`}
            participant={participant}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomScreen;
