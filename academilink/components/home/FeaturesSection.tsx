export function FeaturesSection() {
  return (
    <section className="bg-background text-foreground py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          {"תכונות עיקריות"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-accent text-card-foreground rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">{"מהירות וביצועים"}</h3>
            <p>{"מערכת מהירה ואמינה להבטחת חוויית משתמש מעולה."}</p>
          </div>
          <div className="p-6 bg-accent text-card-foreground rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">{"אבטחת מידע"}</h3>
            <p>{"אנו שמים דגש על אבטחת המידע שלך בכל רגע נתון."}</p>
          </div>
          <div className="p-6 bg-accent text-card-foreground rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">{"תמיכה מסביב לשעון"}</h3>
            <p>{"שירות לקוחות זמין 24/7 לשירותך."}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
