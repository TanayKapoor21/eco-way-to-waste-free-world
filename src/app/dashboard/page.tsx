import { CarbonTracker } from '@/components/features/carbon-tracker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Camera, Map, Bot, Users, Scan, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockForumPosts } from '@/lib/mock-data';

const quickLinks = [
    {
      href: '/dashboard/classify',
      title: 'Waste Classifier',
      description: 'Snap a photo to learn how to dispose of an item.',
      icon: Camera,
    },
    {
      href: '/dashboard/ar-sorter',
      title: 'AR Sorter',
      description: 'Use your camera to sort waste in real-time.',
      icon: Scan,
    },
    {
      href: '/dashboard/locator',
      title: 'Find Centers',
      description: 'Locate nearby recycling centers on the map.',
      icon: Map,
    },
    {
      href: '/dashboard/chatbot',
      title: 'AI Assistant',
      description: 'Get your disposal questions answered by our AI.',
      icon: Bot,
    }
  ];

export default function DashboardPage() {
  const latestPost = mockForumPosts[0];
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome, Eco-Warrior!</h1>
        <p className="text-muted-foreground">Here’s a snapshot of your positive impact and community highlights.</p>
      </div>

      <CarbonTracker />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card className='h-full'>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Jump right into one of our core features.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    {quickLinks.map(link => (
                        <Link href={link.href} key={link.href} className="group">
                            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-medium">{link.title}</CardTitle>
                                <div className="p-2.5 rounded-full bg-primary/10 text-primary">
                                    <link.icon className="h-5 w-5" />
                                </div>
                                </CardHeader>
                                <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                                    <div className="text-sm font-semibold text-primary flex items-center opacity-80 group-hover:opacity-100">
                                        Go <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
             <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle>Community Spotlight</CardTitle>
                    <CardDescription>Latest post from the forum.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={latestPost.author.avatarUrl} alt={latestPost.author.name} data-ai-hint={latestPost.author.avatarHint} />
                                <AvatarFallback>{latestPost.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-sm">{latestPost.author.name}</p>
                                <p className="text-xs text-muted-foreground">{latestPost.timestamp}</p>
                            </div>
                        </div>
                        <h3 className="font-semibold text-md font-headline">{latestPost.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">{latestPost.content}</p>
                    </div>
                </CardContent>
                <CardContent>
                    <Button asChild className="w-full">
                        <Link href="/dashboard/forum">
                            <Users className="mr-2 h-4 w-4" />
                            Join the Conversation
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>

       <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Leaf className="h-8 w-8" />
            </div>
            <div>
                <CardTitle>Ready to Make a Difference?</CardTitle>
                <CardDescription className="text-foreground/80">Every small action contributes to a larger change. Let's build a sustainable future together.</CardDescription>
            </div>
            <Button asChild className="ml-auto">
                <Link href="/dashboard/forum">Join a Cleanup Drive</Link>
            </Button>
        </CardHeader>
      </Card>
    </div>
  );
}
