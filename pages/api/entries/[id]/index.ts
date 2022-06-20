import { db } from "database";
import { Entry, IEntry } from "models";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID: " + id });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);

    case "GET":
      return getEntry(req, res);

    default:
      return res.status(405).json({ message: "Invalid method" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entry = await Entry.findById(id);

  if (!entry)
    return res.status(404).json({ message: `Entry with ID: ${id} not found` });

  try {
    const { description = entry.description, status = entry.status } = req.body;
    // const updatedEntry = await Entry.findByIdAndUpdate(
    //   id,
    //   { description, status },
    //   { new: true, runValidators: true }
    // );

    entry.description = description;
    entry.status = status;
    entry.save();
    await db.disconnect();
    return res.status(200).json(entry);
  } catch (error: any) {
    await db.disconnect();
    return res.status(400).json({ message: error.errors.status.message });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  try {
    await db.connect();
    const entry = await Entry.findById(id);
    await db.disconnect();
    console.log(entry);
    if (!entry)
      return res
        .status(404)
        .json({ message: `Entry with ID: ${id} not found` });

    return res.status(200).json(entry!);
  } catch (error: any) {
    await db.disconnect();
    return res.status(500).json({ message: `Check server` });
  }
};
