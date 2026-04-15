// Mock for static asset imports (images) in vitest
// Returns an object shaped like Astro's ImageMetadata
const fileMock = {
  src: "/mock-image.jpg",
  width: 800,
  height: 600,
  format: "jpg" as const,
};

export default fileMock;
