"use server";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    // Validate input
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title?.length < 3) {
      return {
        message: "Title must be longer",
      };
    }
    if (typeof code !== "string" || code?.length < 10) {
      return { message: "Code must be longer" };
    }

    // Create new snippet in database
    await db.snippet.create({
      data: { title, code },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { message: err.message };
    } else {
      return { message: "Something went wrong" };
    }
  }
  //   Redirect user to home page
  revalidatePath("/");
  redirect("/");
}
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

export async function DeleteSnippet(id: number) {
  await db.snippet.delete({ where: { id } });
  revalidatePath("/");
  redirect(`/`);
}
