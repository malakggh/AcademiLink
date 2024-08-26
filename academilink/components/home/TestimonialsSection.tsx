export function TestimonialsSection() {
  return (
    <section className="bg-card text-card-foreground py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          {"מה אומרים עלינו"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-background text-foreground rounded-lg shadow-lg">
            <p className="italic mb-4">
              {"האתר הזה שינה את חיי! השירות מעולה והממשק נוח לשימוש."}
            </p>
            <h3 className="text-xl font-bold">{"יעל, תל אביב"}</h3>
          </div>
          <div className="p-6 bg-background text-foreground rounded-lg shadow-lg">
            <p className="italic mb-4">
              {"קיבלתי תמיכה מעולה מכל הצוות. מומלץ מאוד!"}
            </p>
            <h3 className="text-xl font-bold">{"דוד, חיפה"}</h3>
          </div>
          <div className="p-6 bg-background text-foreground rounded-lg shadow-lg">
            <p className="italic mb-4">
              {"השירות לקוחות כאן מדהים. אני אחזור שוב בוודאות."}
            </p>
            <h3 className="text-xl font-bold">{"שרון, ירושלים"}</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
