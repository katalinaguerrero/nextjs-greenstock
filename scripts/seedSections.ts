import { adminDb } from "./firebaseAdmin";

async function seed() {
  const sections = [
    "Parcela 1",
    "Parcela 2",
    "Parcela 3",
    "Parcela 4",
    "Parcela 4B",
    "Parcela 5",
    "Parcela 5B",
    "Parcela 7",
    "Parcela 8",
    "Parcela 9",
  ];

  await Promise.all(
    sections.map((name) =>
      adminDb.collection("sections").add({
        name,
        createdAt: new Date(),
      })
    )
  );

  console.log("done");
}

seed().then(() => process.exit(0));