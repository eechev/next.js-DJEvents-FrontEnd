import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import Link from "next/link";

import { API_URL } from "@/config";

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events === null || events.length === 0 ? (
        <h3>No events to show</h3>
      ) : (
        events.map((evt) => <EventItem key={evt.id} evt={evt.attributes} />)
      )}
      {events !== null && events.length > 0 && (
        <Link className="btn-secondary" href="/events">
          View all Events
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  let events = null;
  try {
    const res = await fetch(
      `${API_URL}/api/events?populate=*&sort=date:ASC&pagination[limit]=2`
    );
    const body = await res.json();
    events = body.data;
  } catch (e) {
    console.error("Failured occurred:");
    console.error(e);
  }

  return {
    props: { events },
    revalidate: 1,
  };
}
