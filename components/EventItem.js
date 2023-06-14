import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

export default function EventItem({ evt }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={evt.image ? evt.image.data.attributes.formats.thumbnail.url : "/images/event-default.png"}
          width={170}
          height={100}
          alt=""
        />
        <div className={styles.info}>
          <span>
            {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
            <h3>{evt.name}</h3>
          </span>
        </div>
        <div className={styles.link}>
          <Link className="btn" href={`/events/${evt.slug}`}>
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
