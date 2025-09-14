import { CarbonTracker } from '@/components/features/carbon-tracker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Camera, Map, Bot, Users } from 'lucide-react';

const quickLinks = [
    {
      href: '/dashboard/classify',
      title: 'Classify Waste',
      description: 'Snap a photo to learn how to dispose of an item.',
      icon: Camera,
      color: 'text-rose-500'
    },
    {
      href: '/dashboard/locator',
      title: 'Find Centers',
      description: 'Locate nearby recycling centers on the map.',
      icon: Map,
      color: 'text-sky-500'
    },
    {
      href: '/dashboard/chatbot',
      title: 'Ask an Expert',
      description: 'Get your disposal questions answered by our AI.',
      icon: Bot,
      color: 'text-amber-500'
    },
    {
      href: '/dashboard/forum',
      title: 'Join Community',
      description: 'Share tips and ideas with fellow eco-warriors.',
      icon: Users,
      color: 'text-indigo-500'
    }
  ];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome, Eco-Warrior!</h1>
        <p className="text-muted-foreground">Here’s a snapshot of your positive impact on the world.</p>
      </div>

      <CarbonTracker />

      <Card>
        <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump right into one of our core features.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map(link => (
                <Link href={link.href} key={link.href} className="group">
                    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                           <CardTitle className="text-lg font-medium">{link.title}</CardTitle>
                           <link.icon className={`h-6 w-6 ${link.color}`} />
                        </CardHeader>
                        <CardContent>
                           <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                            <div className="text-sm font-semibold text-primary flex items-center group-hover:underline">
                                Go <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
