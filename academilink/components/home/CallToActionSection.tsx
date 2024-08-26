import { Button } from "@/components/ui/button";

export function CallToActionSection() {
  return (
    <section className="bg-accent text-accent-foreground py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">{"הצטרף אלינו עכשיו!"}</h2>
        <p className="text-lg mb-8">
          {"אל תחמיץ את ההזדמנות להצטרף לקהילה הגדולה שלנו."}
        </p>
        <button className="bg-primary text-primary-foreground py-2 px-4 rounded-lg">
          {"הירשם עכשיו"}
        </button>
      </div>
    </section>
  );
}
