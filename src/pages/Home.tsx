import { Hero } from "../components/Hero";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="page-transition">
      <Hero onNavigate={onNavigate} />
      
      <section className="py-16 bg-gradient-to-br from-teal-50/50 to-cyan-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl mb-4">Ready to Make an Impact?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Every contribution, no matter the size, helps create positive change in our world.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
