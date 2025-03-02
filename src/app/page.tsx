import Link from "next/link";
import Image from "next/image";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Transform Audio into Marketing Content
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            MktgBuddy helps content creators turn audio recordings and text documents into
            ready-to-publish marketing materials across multiple platforms.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started for Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Streamline Your Content Creation
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Save time and effort with our powerful AI-driven tools
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Audio Transcription</CardTitle>
                <CardDescription>
                  Automatically convert audio recordings into accurate text transcripts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Our advanced AI transcription technology handles multiple speakers,
                  accents, and technical terminology with high accuracy.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Content Generation</CardTitle>
                <CardDescription>
                  Create platform-specific content from your transcripts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Automatically generate YouTube descriptions, blog posts, email newsletters,
                  and social media content tailored to each platform.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Direct Publishing</CardTitle>
                <CardDescription>
                  Publish your content directly to multiple platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Connect your social media accounts and publish or schedule content
                  directly from MktgBuddy to X, Bluesky, LinkedIn, and more.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Transform Your Content Workflow?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of content creators who are saving time and increasing their
            reach with MktgBuddy.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/signup">Start Your Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
