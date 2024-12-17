import { defineConfig } from "tinacms";
import React from "react";
import { ReferenceField } from "tinacms";
import { FeaturesBlockTemplate } from "../src/components/Features/template";
import { HeroBlockTemplate } from "../src/components/Hero/template";
import { YouTubeEmbedBlockTemplate } from "../src/components/YouTubeEmbed/template";
import { MDXTemplates } from "../src/theme/template";
import { docusaurusDate } from "../util";

// Hosting branch (für Vercel oder andere Hosting-Anbieter)
const branch = process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";

// Restart Warning-Komponente
const WarningIcon = (props) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11.001 10h2v5h-2zM11 16h2v2h-2z"></path>
    <path d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"></path>
  </svg>
);

const RestartWarning = () => (
  <p className="rounded-lg border shadow px-4 py-2.5 bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 mb-4">
    <div className="flex items-center gap-2">
      <WarningIcon className="w-6 h-auto flex-shrink-0 text-yellow-400" />
      <div className="flex-1 text-sm text-yellow-700 whitespace-normal">
        To see settings changes reflected on your site, restart the Tina CLI
        after saving <em>(local development only!)</em>.
      </div>
    </div>
  </p>
);

// Pages Collection
const PagesCollection = {
  name: "pages",
  label: "Pages",
  path: "src/pages",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Description",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: [...MDXTemplates],
    },
  ],
};

// Docs Collection
const DocsCollection = {
  name: "docs",
  label: "Docs",
  path: "docs",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Description",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: [...MDXTemplates],
    },
  ],
};

// Post Collection
const PostCollection = {
  name: "posts",
  label: "Blog Posts",
  path: "blog",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "datetime",
      name: "date",
      label: "Date",
      required: true,
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
  ],
};

// Settings Collection
const SettingsCollection = {
  name: "settings",
  label: "Settings",
  path: "config/settings",
  format: "json",
  fields: [
    {
      type: "string",
      name: "siteTitle",
      label: "Site Title",
      required: true,
    },
    {
      type: "image",
      name: "logo",
      label: "Logo",
    },
  ],
};

// Konfiguration exportieren
export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, // Von tina.io erhalten
  token: process.env.TINA_TOKEN, // Von tina.io erhalten
  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "img",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      PagesCollection,
      DocsCollection,
      PostCollection,
      SettingsCollection,
    ],
  },
});
