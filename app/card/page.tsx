import ValentineCardGenerator from "../components/ValentineCardGenerator";

export default function CardPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Create Your Valentine Card
      </h1>

      <ValentineCardGenerator />
    </main>
  );
}
