import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";

import { FaPencilAlt, FaTimes } from "react-icons/fa";

import { API_URL } from "@/config";

import styles from "@/styles/Event.module.css";

export default function EventPage({ evt }) {
  const deleteEvent = (e) => {
    console.log("delete");
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.control}>
          <Link href={`/events/edit/${evt.id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes />
            Delete Event
          </a>
        </div>
        <span>
          {evt.date} at {evt.time}
          <h1>{evt.name}</h1>
          {evt.image && (
            <div className={styles.image}>
              <Image src={evt.image} width={960} height={600} />
            </div>
          )}
          <h3>Performers:</h3>
          <p>{evt.performers}</p>
          <h3>Description:</h3>
          <p>{evt.description}</p>
          <h3>Venue: {evt.venue}</h3>
          <p>{evt.address}</p>
          <Link className={styles.back} href="/events">
            {"<"} Go Back
          </Link>
        </span>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json();

  return {
    props: { evt: events[0] },
  };
}
