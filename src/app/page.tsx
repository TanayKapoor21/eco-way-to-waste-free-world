import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Leaf, Recycle, ArrowRight, Bot, Camera, Map, Scan, Users } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    name: 'AI Waste Classifier',
    description: 'Snap a photo of any item, and our AI will instantly tell you how to dispose of it responsibly.',
    icon: Camera
  },
  {
    name: 'AR Waste Sorter',
    description: 'Use your camera for real-time guidance, making waste sorting effortless and accurate.',
    icon: Scan
  },
  {
    name: 'Recycling Locator',
    description: 'Find the nearest recycling centers and e-waste drop-off points with our interactive map.',
    icon: Map
  },
  {
    name: 'AI Disposal Assistant',
    description: 'Have a question? Our AI chatbot provides instant, expert advice on all things waste management.',
    icon: Bot
  }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-transparent text-white absolute top-0 left-0 right-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <Leaf className="h-6 w-6 text-white" />
          <span className="ml-2 text-xl font-bold font-headline">EWWW</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
            Dashboard
          </Link>
          <Link href="/dashboard/forum" className="text-sm font-medium hover:underline underline-offset-4">
            Community
          </Link>
          <Button variant="secondary" asChild>
            <Link href="/dashboard">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-screen flex items-center justify-center text-white">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <Image
            src="https://picsum.photos/seed/green-nature/1920/1080"
            alt="A lush, green forest path covered in mist, symbolizing nature and a clean environment."
            fill
            className="object-cover"
            priority
            data-ai-hint="misty forest path"
          />
          <div className="container px-4 md:px-6 text-center relative z-20">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl font-extrabold font-headline tracking-tight sm:text-6xl md:text-7xl lg:text-8xl !leading-tight">
                Pioneering a <span className="text-primary-foreground drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Waste-Free</span> Future
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/90 md:text-xl max-w-2xl mx-auto">
                Your personal AI assistant for smart waste management. Identify, sort, and recycle with ease, and join a community dedicated to a cleaner planet.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    Enter Dashboard
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className='bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20' asChild>
                  <Link href="/dashboard/classify">
                    Classify an Item
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Key Features</div>
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">The Future of Recycling is Here</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  EWWW provides you with the intelligent tools and community support to make a real difference. From your kitchen to your local environment, we've got you covered.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-12 lg:grid-cols-2 lg:gap-8">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col justify-start space-y-4 p-6 rounded-xl bg-card border-2 border-transparent hover:border-primary/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="p-4 bg-primary/10 rounded-full w-fit">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold font-headline">{feature.name}</h3>
                  <p className="text-muted-foreground text-base">{feature.description}</p>
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
