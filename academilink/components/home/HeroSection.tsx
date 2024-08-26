import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/bg.jpeg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="-z-10"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      {/* Text Content */}
      <div className="relative z-20 max-w-2xl px-4 py-8">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          AcademiLink
        </h1>
        <p className="mt-4 text-xl text-white drop-shadow-lg">
          {"תיאור קצר של האתר או השירות"}
        </p>
        <button className="mt-6 px-6 py-3 bg-accent text-accent-foreground rounded-lg">
          {"לחצן ראשי"}
        </button>
      </div>
    </section>
  );
}
