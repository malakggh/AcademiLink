import Image from "next/image";

export function FeaturesSection() {
  return (
    <section className="bg-background text-foreground py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          {"מה צפוי ב-AcademiLink"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-accent text-card-foreground rounded-lg shadow-lg">
            <div className="flex flex-col items-center mb-2">
              {" "}
              {/* Adjusted margin */}
              <Image
                src="/images/Glow2.png"
                alt="Easy Management"
                width={250}
                height={200}
                className="mb-2"
              />
              <h3 className="text-xl font-bold text-center mb-2">
                {" "}
                {/* Adjusted margin */}
                {"ניהול קל של תיגבורים"}
              </h3>
            </div>
            <p className="text-center">
              {"פלטפורמה לניהול התיגבורים בקמפוס בצורה קלה ונוחה."}
            </p>
          </div>
          <div className="p-6 bg-accent text-card-foreground rounded-lg shadow-lg">
            <div className="flex flex-col items-center mb-2">
              {" "}
              {/* Adjusted margin */}
              <Image
                src="/images/Glow1.png"
                alt="Efficient Collaboration"
                width={250}
                height={200}
                className="mb-2"
              />
              <h3 className="text-xl font-bold text-center mb-2">
                {"שיתוף פעולה יעיל"}
              </h3>
            </div>
            <p className="text-center">
              {"יצירת סביבה תומכת לשיתוף פעולה בין סטודנטים ותיגבור."}
            </p>
          </div>
          <div className="p-6 bg-accent text-card-foreground rounded-lg shadow-lg">
            <div className="flex flex-col items-center mb-2">
              <Image
                src="/images/Glow3.png"
                alt="Reports and Statistics"
                width={250}
                height={200}
                className="mb-2"
              />
              <h3 className="text-xl font-bold text-center mb-2">
                {"דוחות וסטטיסטיקות"}
              </h3>
            </div>
            <p className="text-center">
              {"תובנות מעמיקות ושקיפות מלאה בדוחות התיגבורים."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
