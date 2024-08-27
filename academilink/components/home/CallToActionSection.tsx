export function CallToActionSection() {
  return (
    <section className="bg-[#b0bbaf] text-accent-foreground py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">
          {"הצטרף לקהילת AcademiLink!"}
        </h2>
        <p className="text-lg mb-8">
          {
            "הישאר מעודכן עם החדשות האחרונות והצטרף לרשימת ההמתנה שלנו כדי להיות הראשונים להשתמש בפלטפורמה."
          }
        </p>
        <button className="bg-primary text-primary-foreground py-2 px-4 rounded-lg">
          {"הצטרף לרשימת ההמתנה"}
        </button>
      </div>
    </section>
  );
}
