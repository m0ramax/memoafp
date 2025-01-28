import { getDeck, generateDeck } from "@/app/utils";
import ConcentrationGame from "@/app/components/ConcentrationGame";
import { GameProvider } from "@/app/context";
import { Suspense } from "react";
import Loading from "@/app/components/Loading";

export default async function Home() {
  const images = await getDeck();
  const cards = generateDeck(images);

  return (
    <GameProvider initialCards={cards}>
      <main className="min-h-screen p-4">
        <Suspense fallback={<Loading />}>
          <div className="wrapper__container max-w-7xl mx-auto">
            <ConcentrationGame />
          </div>
        </Suspense>
      </main>
    </GameProvider>
  );
}
