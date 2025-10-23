// app/layout.js
export const metadata = {
  title: 'Todo App',
  description: 'Simple Next.js Todo Login Example',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
