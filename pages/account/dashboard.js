import Layout from "@/components/Layout";
import { parseCookies } from "@/helpers";
import { API_URL } from "@/config";
import styles from "@/styles/Dashboard.module.css";
import DashboardEvents from "@/components/DashboardEvents";

export default function DashboardPage({ events }) {
  console.log(events.data);

  const deleteEvent = (id) => {
    console.log(id);
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events.data.map((evt) => (
          <DashboardEvents key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/api/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: { events },
  };
}
