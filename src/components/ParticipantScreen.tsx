import React, { useEffect, useRef, useState } from "react";
import {
  type Participant,
  type LocalParticipant,
  type LocalVideoTrackPublication,
  type VideoTrackPublication,
  type LocalVideoTrack,
  type RemoteVideoTrack,
  type LocalAudioTrackPublication,
  type AudioTrackPublication,
  type LocalAudioTrack,
  type RemoteAudioTrack,
} from "twilio-video";

interface ParticipantScreenProps {
  participant: LocalParticipant | Participant;
}
const ParticipantScreen = ({ participant }: ParticipantScreenProps) => {
  const [videoTracks, setVideoTracks] = useState<
    (LocalVideoTrack | RemoteVideoTrack | null)[]
  >([]);
  const [audioTracks, setAudioTracks] = useState<
    (LocalAudioTrack | RemoteAudioTrack | null)[]
  >([]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const trackVidPubsToTracks = (
    trackMap:
      | Map<string, LocalVideoTrackPublication>
      | Map<string, VideoTrackPublication>
  ) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  const trackAudPubsToTracks = (
    trackMap:
      | Map<string, LocalAudioTrackPublication>
      | Map<string, AudioTrackPublication>
  ) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackVidPubsToTracks(participant.videoTracks));
    setAudioTracks(trackAudPubsToTracks(participant.audioTracks));

    const trackSubscribed = (
      track:
        | LocalVideoTrack
        | RemoteVideoTrack
        | LocalAudioTrack
        | RemoteAudioTrack
    ) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (
      track:
        | LocalVideoTrack
        | RemoteVideoTrack
        | LocalAudioTrack
        | RemoteAudioTrack
    ) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack && videoRef.current) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks, videoRef.current]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack && audioRef.current) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks, audioRef.current]);

  return (
    <div className="participant">
      <h3>{participant.identity}</h3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={true} />
    </div>
  );
};

export default ParticipantScreen;
