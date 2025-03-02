import Link from 'next/link';


export default function Page() {
  return (
    <main className="flex flex-col py-12 px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-semibold mb-4 ">3A Design System</h1>
        <p className="text-muted-foreground mb-8">
          Explore the UI components and design system used throughout the application.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/components/colors"
            className="block p-6 border rounded-lg bg-card hover:bg-card/80 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Color Palette</h2>
            <p className="text-muted-foreground">Explore the complete color system used throughout the application.</p>
          </Link>

          <Link
            href="/components/buttons"
            className="block p-6 border rounded-lg bg-card hover:bg-card/80 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Buttons</h2>
            <p className="text-muted-foreground">View all button variants, sizes, and states available in the UI.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
