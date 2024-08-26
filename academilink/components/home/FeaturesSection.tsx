export function FeaturesSection() {
  return (
    <section className="bg-background text-foreground py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          {"מה צפוי ב-AcademiLink"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-accent text-card-foreground rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">{"ניהול קל של תיגבורים"}</h3>
            <p>{"פלטפורמה לניהול התיגבורים בקמפוס בצורה קלה ונוחה."}</p>
          </div>
          <div className="p-6 bg-accent text-card-foreground rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">{"שיתוף פעולה יעיל"}</h3>
            <p>{"יצירת סביבה תומכת לשיתוף פעולה בין סטודנטים ותיגבור."}</p>
          </div>
          <div className="p-6 bg-accent text-card-foreground rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">{"דוחות וסטטיסטיקות"}</h3>
            <p>{"תובנות מעמיקות ושקיפות מלאה בדוחות התיגבורים."}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
