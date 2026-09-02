import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { ProfileClient } from "./ProfileClient";

export const metadata: Metadata = {
  title: "Profile",
  description: `Edit your ${brand.name} profile details.`,
  openGraph: { title: `Profile | ${brand.name}`, description: brand.description, type: "website" },
};

export default function ProfilePage() {
  return <ProfileClient />;
}
