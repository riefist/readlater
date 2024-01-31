import { FormCreateBookmark } from "@/components/FormCreateBookmark";
import { Header } from "@/components/Header";
import { SavedBookmark } from "@/components/SavedBookmark";

export const dynamic = "force-dynamic";

async function getData() {
  const res = await fetch("https://v1.appbackend.io/v1/rows/PQJGOeAfm5jZ");
  const data = await res.json();
  return data;
}

export default async function Home() {
  const { data } = await getData();

  console.log(data);

  return (
    <div>
      <main className="space-y-10">
        <Header />
        <FormCreateBookmark />
        <SavedBookmark data={data} />
      </main>
    </div>
  );
}
