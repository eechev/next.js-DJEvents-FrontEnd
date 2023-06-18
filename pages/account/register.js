import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import AuthContext from "@/context/AuthContext";

export default function RegisterPage() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { register, error, clearError } = useContext(AuthContext);

  useEffect(() => {
    console.log('RegisterPage: Error set to')
    console.log(error);
    if (error) {
      toast.error(error)
      clearError();
    }
    return undefined;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      passwordConfirm === ""
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }

    register({ username, email, password });
  };

  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser />
          Register
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">User Name:</label>
            <input
              type="test"
              name="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passwordConfirmation">Confirm Password:</label>
            <input
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input type="submit" value="Register" className="btn" />
        </form>
        <p>
          Already have an account? <Link href="/account/login">Login</Link>
        </p>
      </div>
    </Layout>
  );
}
