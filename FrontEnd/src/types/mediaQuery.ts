export interface IMediaQuery {
  query: "up" | "down" | "between" | "only";
  key: "xs" | "sm" | "md" | "lg" | "xl";
  start?: "xs" | "sm" | "md" | "lg" | "xl";
  end?: "xs" | "sm" | "md" | "lg" | "xl";
}
