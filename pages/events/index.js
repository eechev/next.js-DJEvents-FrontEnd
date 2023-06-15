import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL, PER_PAGE } from "@/config";
import Pagination from "@/components/Pagination";


export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events === null || events.length === 0 ? (
        <h3>No events to show</h3>
      ) : (
        events.map((evt) => <EventItem key={evt.id} evt={evt.attributes} />)
      )}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  let events = null;
  let total = 0;

  //Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE; /// +page is to change string to a number

  try {
    //fetch
    const res = await fetch(
      `${API_URL}/api/events?populate=*&sort=date:ASC&pagination[start]=${start}&pagination[limit]=${PER_PAGE}`
    );
    const body = await res.json();
    events = body.data;
    total = body.meta.pagination.total;
  } catch (e) {
    console.error("Failured occurred:");
    console.error(e);
  }

  return {
    props: { events, page: +page, total },
  };
}
