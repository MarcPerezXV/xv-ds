import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "./Icon";
import { icons } from "./registry";
import { SearchInput } from "../input/search/Input";
import { RadioButtonGroup } from "../radioButton/RadioButtonGroup";
import { SidePanel } from "../sidePanel/SidePanel";

const meta: Meta<typeof Icon> = {
  title: "Components/Icons",
  component: Icon,
  argTypes: {
    name: { table: { disable: true } },
    className: { table: { disable: true } },
    size: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

const categories = {
  All: Object.keys(icons),
  Actions: ["close", "edit", "copy", "trash", "search", "search-chart", "filter", "filter-review", "pin", "pin-slash", "link", "link-slash", "eye", "eye-slash", "window-restore", "play", "stop", "compress", "expand", "draw-square", "draw-polygon", "bookmark"],

  Arrows: ["arrow-rotate-left", "arrow-rotate-right", "arrow-down-to-line", "arrow-up-to-line", "arrow-up-down", "arrow-right-left", "pointer", "pointer-arrow-down", "pointer-arrow-up", "arrow-down", "arrow-up", "arrow-left", "arrow-right", "arrow-transfer-both", "arrow-up-right-from-square", "water-arrow-up", "water-arrow-down", "water-arrow-both", "arrows-to-line-vertical", "arrows-to-line-horizontal"],

  "Charts & Diagrams": ["chart-line", "chart-mixed", "chart-line-up-down", "chart-simple", "diagram-subtask", "diagram-project", "chart-pie-currency", "chart-pie"],

  "Chevrons & Carets": ["chevron-left", "chevron-right", "chevron-up", "chevron-down", "chevrons-left", "chevrons-right", "chevrons-up", "chevrons-down", "caret-left", "caret-right", "caret-up", "caret-down"],

  Communication: ["comment-question", "comment", "comments", "send", "envelope", "envelope-open", "phone"],

  "Date & Time": ["calendar-days", "clock", "ripple-clock", "droplet-clock", "calendar-clock", "stopwatch", "calendar-pen", "clock-rotate-left"],

  "Devices & Technology": ["microchip", "radar", "tablet-rugged", "meter", "meter-droplet", "display-search", "gauge", "display-droplet", "video", "video-plus", "video-arrow-up-right", "printer", "solar-panel", "router", "hard-drive", "sensor", "artificial-intelligence", "floppy-disk", "digital-tacograph", "pressure-flow", "wifi", "database"],

  "Files & Documents": ["file-import", "file-plus", "file-upload", "file-download", "file-csv", "file-pdf", "file-txt", "file", "folder-open", "folder-tree", "files","file-chart-pie", "file-lines", "file-pen", "folder", "file-export", "folder-upload", "file-info", "clipboard-check"],

  "Infrastructure & Facilities": ["tunnel", "water-treatment-plants", "truck", "warehouse", "industry", "building", "house", "pipeline", "pipe-section-wave-pulse"],

  "Layout & Organization": ["layer-group", "layer-plus", "object-group", "object-ungroup", "columns-3", "table-cells", "table", "grid", "grid-plus", "list", "navbar"],

  "Letters & Text": ["align-center", "align-left", "align-right", "align-justify", "bold", "italic", "strikethrough", "underline", "eraser", "letter-p", "input-text", "sap", "square-a", "square-p", "3d", "2d"],

  "Locations & Maps": ["location-dot", "map", "map-location", "map-pin", "location-crosshairs", "location-crosshairs-slash","globe"],

  "Nature & Environment": ["dna", "droplet", "droplet-droplet", "tank-water", "water", "cloud-rain", "bolt", "virus", "mountain"],
  
  "Object & Tools": ["gear", "paintbrush", "ruler", "ruler-vertical", "prescription-bottle", "lightbulb-on", "flask", "broom", "wrench", "palette", "pond", "wand-magic-sparkles"],

  "People & Hands": ["user", "users", "user-gear", "graduation-cap", "hand-pointer", "thumbs-up", "thumbs-down", "hand-holding-seed", "hand-holding-water"],

  "Shapes & Symbols": ["ellipsis", "ellipsis-vertical", "grid-dots-vertical", "star", "circle", "circle-dot", "circle-euro", "circle-dollar", "rectangle", "triangle", "hashtag", "shapes", "plus", "plus-square", "minus", "minus-square", "cube", "rhombus", "waveform", "wave-pulse", "placeholder"],

  "Status & Feedback": ["check", "check-square", "xmark-square", "loader", "question", "info-square", "warning", "bell", "bell-slash", "shield-check", "ballot-check"]

} as const;

type Category = keyof typeof categories;

export const Gallery: Story = {
  render: (args) => {
    const GalleryContent = () => {
      const [search, setSearch] = useState("");
      const [size, setSize] = useState<"small" | "medium" | "large">("medium");
      const [category, setCategory] = useState<Category>("All");

      const filteredIcons = categories[category]
        .filter((name) => name.toLowerCase().includes(search.toLowerCase()))
        .sort();

      return (
  <>
    <style>
      {`
        .button {
          width: 100%;
          padding-block: 8px;
          padding-inline: 12px;
          border: none;
          background: transparent;
          text-align: left;
          border-radius: 4px;
          cursor: pointer;
          color: var(--color__text__brighter-01);
          font: var(--text__body-medium);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .button:hover {
          background: var(--color__surface-layer-01);
          color: var(--color__text__base);
        }

        .button:focus-visible {
          outline: 2px solid var(--color__focus-ring__outer);
        }

        .button--selected {
          background: var(--color__surface-layer-02);
          color: var(--color__text__base);
          
        }
      `}
    </style>

    <div
      style={{
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent:"space-between",
          gap: "16px",
          padding: "16px",
          borderBottom: "1px solid var(--color__border__subtle)",
        }}
      >
        <SearchInput
          placeholder="Search icon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
        />

        <RadioButtonGroup
          name="icon-size"
          value={size}
          orientation="horizontal"
          onChange={(value) =>
            setSize(value as "small" | "medium" | "large")
          }
          options={[
            {
              value: "small",
              label: "Small",
            },
            {
              value: "medium",
              label: "Medium",
            },
            {
              value: "large",
              label: "Large",
            },
          ]}
        />
      </div>

      <div
        style={{
          display: "flex",
          overflow: "hidden",
          minHeight: "100%",
        }}
      >
        <SidePanel collapsible >
          <SidePanel.Header title="Categories" />

          <SidePanel.Content>
            <ul
              style={{
                listStyle: "none",
                margin: "0",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {(Object.keys(categories) as Category[]).map(
                (currentCategory) => (
                  <li
                    key={currentCategory}
                    style={{
                      flex: "1",
                      padding: "0",
                    }}
                  >
                    <button
                      className={`button ${
                        category === currentCategory
                          ? "button--selected"
                          : ""
                      }`}
                      onClick={() => setCategory(currentCategory)}
                    >
                      <span>
                      {currentCategory}
                      </span>
                      <span style={{font: "var(--text__body-medium)", color: "var(--color__text__brighter-02)"}}>
                        {categories[currentCategory].length}
                      </span>
                    </button>
                  </li>
                )
              )}
            </ul>
          </SidePanel.Content>
        </SidePanel>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            alignContent: "start",
            padding: "24px",
            gap: "8px",
            overflow: "scroll",
            flex: "1",
          }}
        >
          {filteredIcons.map((name) => (
            <div
              key={name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                padding: "12px",
                font: "var(--text__body-small)",
                color: "var(--color__text__base)",
              }}
            >
              <Icon
                name={name as keyof typeof icons}
                size={size}
              />

              <span
                style={{
                  textAlign: "center",
                  wordBreak: "break-word",
                  color: "var(--color__text__brighter-02)",
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);
    };

    return <GalleryContent />;
  },
};
