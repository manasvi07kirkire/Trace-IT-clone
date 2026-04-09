import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login - TraceIT",
  description: "Login to access to TraceIT admin panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
