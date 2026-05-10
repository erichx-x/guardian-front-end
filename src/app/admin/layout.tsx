/**
 * Admin route layout – suppresses the global <Header> via a scoped
 * style injection so the dashboard can own the full viewport.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`body > header { display: none !important; }`}</style>
      {children}
    </>
  );
}
