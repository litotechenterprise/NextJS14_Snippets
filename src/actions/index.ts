"use server";
import { db } from "@/db";
import { redirect } from "next/navigation";

export async function UpdateSnippet(id: number, code: string) {
  await db.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });

  redirect(`/snippets/${id}`);
}
