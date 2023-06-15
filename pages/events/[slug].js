import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { API_URL } from "@/config";
import styles from "@/styles/Event.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function EventPage({ evt }) {
  const router = useRouter();

  const deleteEvent = async (e) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };

  return (
    <Layout>
      {evt === null ? (
        <h3>No Events Detail</h3>
      ) : (
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
            {new Date(evt.attributes.date).toLocaleDateString("en-US")} at{" "}
            {evt.attributes.time}
            <h1>{evt.attributes.name}</h1>
            <ToastContainer />
            <div className={styles.image}>
              <Image
                src={
                  evt.attributes.image.data
                    ? evt.attributes.image.data.attributes.formats.medium.url
                    : "/images/event-default.png"
                }
                width={960}
                height={600}
              />
            </div>
            <h3>Performers:</h3>
            <p>{evt.attributes.performers}</p>
            <h3>Description:</h3>
            <p>{evt.attributes.description}</p>
            <h3>Venue: {evt.attributes.venue}</h3>
            <p>{evt.attributes.address}</p>
          </span>
        </div>
      )}
      <div>
        <Link className={styles.back} href="/events">
          {"<"} Go Back
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  let evt = null;
  try {
    const res = await fetch(
      `${API_URL}/api/events?filters[slug]=${slug}&populate=*`
    );
    const body = await res.json();
    evt = body.data[0];
  } catch (e) {
    console.error("Failured occurred:");
    console.error(e);
  }

  return {
    props: { evt },
  };
}
