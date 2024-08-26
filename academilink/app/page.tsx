import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CallToActionSection } from "@/components/home/CallToActionSection";
import { FooterSection } from "@/components/home/FooterSection";
import { auth } from "auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  const navigation = {
    STUDENT: "/student/session/requests",
    TUTOR: "/tutor/preferences",
    MANAGER: "/manager/courses/requests",
  };
  if (session) {
    const role = session && session.user.role; // Replace with actual role-check logic
    const redirectUrl = role && navigation[role];
    redirect(redirectUrl);
  }
  return (
    <>
      {!session && (
        <>
          <HeroSection />
          <FeaturesSection />
          <TestimonialsSection />
          <CallToActionSection />
          <FooterSection />
        </>
      )}
    </>
  );
}
