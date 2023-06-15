import { useState } from "react";
import { API_URL } from "@/config";
import styles from "@/styles/Form.module.css";

export default function ImageUpload({ evtId, imageUploaded }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("files", image);
      formData.append("ref", "event");
      formData.append("refId", evtId);
      formData.append("field", "image");
      console.log(formData);
      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      console.log(res)

      if (res.ok) {
        imageUploaded();
      } else {
        console.log(res.status)
      }
    } catch (e) {
      console.log("From ImageUpload::handleSubmit")
      console.error(e);
    }
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}
