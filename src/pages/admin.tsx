import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { type Room } from "twilio-video";
import { joinRoom } from "@/helpers/client/api";
import RoomScreen from "../components/RoomScreen";

const inter = Inter({ subsets: ["latin"] });

export default function Admin() {
  const [roomId, setRoomId] = useState("");
  const [room, setRoom] = useState<Room | null>(null);

  const handleCreateAndJoin = async () => {
    if (!roomId) return;
    const newRoom = await joinRoom("create", roomId);
    if (!newRoom) return;
    setRoom(newRoom);
  };

  const exitRoom = () => {
    if (!room) return;
    // room.localParticipant.tracks.forEach((trackPub) => {
    //   trackPub.track = null
    // })
    room.disconnect();
    setRoom(null);
  };

  const handleChangeRoomId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {room ? (
          <RoomScreen room={room} exitRoom={exitRoom} />
        ) : (
          <div>
            <input
              placeholder="insert room id"
              value={roomId}
              onChange={handleChangeRoomId}
            />
            <button type="button" onClick={() => handleCreateAndJoin()}>
              Create And Join
            </button>
          </div>
        )}

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}