import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";

export default function AppPage({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
