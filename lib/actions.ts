"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

interface StartupData {
  title: string;
  description: string;
  category: string;
  link: string;
  pitch: string;
  authorId: string;
}

export const createPitch = async (
  state: Record<string, unknown>,
  form: FormData,
  pitch: string,
): Promise<{
  error: string;
  status: "SUCCESS" | "ERROR";
  _id?: string;
}> => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form.entries()).filter(([key]) => key !== "pitch"),
  ) as Record<string, string>;

  if (!title || !description || !category || !link) {
    return parseServerActionResponse({
      error: "Missing required fields",
      status: "ERROR",
    });
  }

  const slug = slugify(title, { lower: true, strict: true });

  try {
    const startup: StartupData = {
      title,
      description,
      category,
      link,
      pitch,
      authorId: session.id,
    };

    const result = await writeClient.create({
      _type: "startup",
      title: startup.title,
      description: startup.description,
      category: startup.category,
      image: startup.link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: startup.authorId,
      },
      pitch: startup.pitch,
    });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.error("Error creating pitch:", error);

    return parseServerActionResponse({
      error: "Failed to create pitch. Please try again later.",
      status: "ERROR",
    });
  }
};
