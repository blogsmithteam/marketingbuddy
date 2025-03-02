"use client";

import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  // This will be replaced with actual data fetching logic later
  const campaigns = [
    {
      id: "1",
      title: "Podcast Episode #42: Marketing Strategies",
      date: "2023-05-15",
      status: "completed",
    },
    {
      id: "2",
      title: "Webinar: Content Creation Tips",
      date: "2023-06-02",
      status: "in_progress",
    },
    {
      id: "3",
      title: "Interview with Industry Expert",
      date: "2023-06-10",
      status: "draft",
    },
  ];

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button asChild>
            <Link href="/campaigns/new">Create New Campaign</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-10">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{campaigns.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {campaigns.filter((c) => c.status === "completed").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {campaigns.filter((c) => c.status === "in_progress").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-semibold mb-4">Recent Campaigns</h2>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{campaign.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Created on {new Date(campaign.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        campaign.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : campaign.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {campaign.status === "completed"
                        ? "Completed"
                        : campaign.status === "in_progress"
                        ? "In Progress"
                        : "Draft"}
                    </span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/campaigns/${campaign.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {campaigns.length > 0 && (
          <div className="mt-6 text-center">
            <Button variant="outline" asChild>
              <Link href="/campaigns">View All Campaigns</Link>
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 