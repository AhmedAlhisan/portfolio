export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth protection is handled by individual pages
  // Layout just provides structure
  return <>{children}</>;
}
