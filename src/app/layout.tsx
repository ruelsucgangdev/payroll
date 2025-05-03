import type { Metadata } from "next";
import "../styles/globals.css";
import Layout from "./components/Layout";

export const metadata: Metadata = {
  title: "Inventory Management",
  description: "IMS with tokenized CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
