import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";

import { API_URL } from "@/config";

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events === null || events.length === 0 ? (
        <h3>No events to show</h3>
      ) : (
        events.map((evt) => <EventItem key={evt.id} evt={evt.attributes} />)
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  let events = null;
  try {
    const res = await fetch(`${API_URL}/api/events?populate=*&sort=date:ASC`);
    const body = await res.json();
    events = await body.data;
  } catch (e) {
    console.error("Failured occurred:");
    console.error(e);
  }

  return {
    props: { events },
    revalidate: 1,
  };
}
