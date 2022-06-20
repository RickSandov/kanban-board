interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: "pending" | "done" | "in-progress";
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "PENDING Learn about React",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "IN-PROGRESS Learn about Next.js",
      status: "in-progress",
      createdAt: Date.now() - 185899,
    },
    {
      description: "DONE Learn about GraphQL",
      status: "done",
      createdAt: Date.now() - 102391,
    },
  ],
};
