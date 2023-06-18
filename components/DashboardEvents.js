import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import styles from "@/styles/DashboardEvent.module.css";

export default function DashboardEvents({ evt, handleDelete }) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.attributes.slug}`}>
          {evt.attributes.name}
        </Link>
      </h4>
      <Link href={`/events/edit/${evt.id}`} className={styles.edit}>
         <FaPencilAlt />
         <span>Edit Event</span>
      </Link>
      <a href="#" className={styles.delete} onClick={() => handleDelete(evt.id)}>Delete</a>
    </div>
  );
}
