import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const startup = defineType({
  name: "startup",
  title: "Startup",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name", // Matches the correct field to generate the slug
      },
    }),
    defineField({
      name: "author",
      type: "reference", // Use "reference" for relationships
      title: "Author",
      to: [{ type: "author" }], // Correct syntax for referencing other types
    }),
    defineField({
      name: "views",
      type: "number",
      title: "Views",
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Category",
      validation: (Rule) =>
        Rule.min(1)
          .max(20)
          .required()
          .error("Please enter a category between 1 and 20 characters"),
    }),
    defineField({
      name: "image",
      type: "url",
      title: "Image",
      validation: (Rule) => Rule.required().error("Image URL is required"),
    }),
    defineField({
      name: "pitch",
      type: "string", // Adjusted type to "string" since "mark" is not valid
      title: "Pitch",
    }),
  ],
});
