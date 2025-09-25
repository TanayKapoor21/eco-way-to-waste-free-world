import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Leaf, Recycle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    name: 'AI Waste Classifier',
    description: 'Instantly identify any waste item with your camera and learn how to dispose of it responsibly.',
  },
  {
    name: 'Recycling Locator',
    description: 'Find the nearest recycling centers and e-waste drop-off points with our interactive map.',
  },
  {
    name: 'Carbon Tracker',
    description: 'Track your positive impact and see how much CO₂ you’ve saved by recycling.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
        <Link href="/" className="flex items-center justify-center">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold font-headline text-foreground">EWWW</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4 text-muted-foreground">
            Features
          </Link>
          <Link href="/dashboard/forum" className="text-sm font-medium hover:underline underline-offset-4 text-muted-foreground">
            Community
          </Link>
          <Button asChild>
            <Link href="/dashboard">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
          <Image
            src="https://firebasestudio.ai/api/files/3371a5c6-6946-4c4f-a841-f6721051515f/EWWW-frontpage-bg.jpg"
            alt="Eco-friendly modern architecture with lush greenery"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
            data-ai-hint="green architecture"
          />
          <div className="container px-4 md:px-6 text-center relative z-20">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-extrabold font-headline tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Eco Way to a <span className="text-primary">Waste-Free</span> World
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Your personal AI assistant for smart waste management. Identify, sort, and recycle with ease, and join a community dedicated to a cleaner planet.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    Enter Dashboard
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/dashboard/classify">
                    Classify an Item
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Key Features</div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">A Smarter Way to Recycle</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  EWWW provides you with the tools and knowledge to make a real difference. From your kitchen to your community, we've got you covered.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col justify-start space-y-4 p-6 rounded-lg bg-card border hover:shadow-lg transition-shadow">
                  <div className="p-3 bg-primary/10 rounded-full w-fit">
                    <Recycle className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-headline">{feature.name}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 EWWW. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
