import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import qs from "qs";
import { useRouter } from "next/router";
import { API_URL } from "@/config";
import Link from "next/link";

export default function SearchPage({ events }) {

  const router = useRouter();
  return (
    <Layout title="Search Results">
      <Link href='/events'>Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events === null || events.length === 0 ? (
        <h3>No events to show</h3>
      ) : (
        events.map((evt) => <EventItem key={evt.id} evt={evt.attributes} />)
      )}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  let events = null;
  try {
    const query = qs.stringify({
      filters: {
        $or: [
          {
            0: {
              name: {
                $contains: term,
              },
            },
          },
          {
            1: {
              description: {
                $contains: term,
              },
            },
          },
          {
            3: {
              performers: {
                $contains: term,
              },
            },
          },
          {
            4: {
              venue: {
                $contains: term,
              },
            },
          },
        ],
      },
    });

    const url = `${API_URL}/api/events?${query}&populate=*`;
    const res = await fetch(`${API_URL}/api/events?${query}&populate=*`);
    const body = await res.json();
    events = await body.data;
  } catch (e) {
    console.error("Failured occurred:");
    console.error(e);
  }

  return {
    props: { events },
  };
}
