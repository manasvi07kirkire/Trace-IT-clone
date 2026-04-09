import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login - TraceIT",
  description: "Login to access the TraceIT admin panel",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
