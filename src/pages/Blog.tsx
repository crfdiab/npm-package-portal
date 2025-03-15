
import React from 'react';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const blogPosts = [
  {
    title: "Understanding NPM Package Dependencies",
    date: "2023-05-20",
    excerpt: "Exploring the complex web of dependencies in modern JavaScript projects and how to manage them effectively.",
    author: "Jane Smith",
    readTime: "8 min read"
  },
  {
    title: "Top 10 Most Downloaded NPM Packages in 2023",
    date: "2023-04-15",
    excerpt: "Analyzing the most popular packages in the NPM ecosystem and why developers rely on them.",
    author: "John Doe",
    readTime: "6 min read"
  },
  {
    title: "The Future of Package Management",
    date: "2023-03-08",
    excerpt: "Looking ahead at trends in JavaScript package management and what they mean for developers.",
    author: "Alex Johnson",
    readTime: "10 min read"
  },
  {
    title: "Security Best Practices for NPM Dependencies",
    date: "2023-02-12",
    excerpt: "Keeping your projects secure by managing and auditing third-party dependencies effectively.",
    author: "Sarah Williams",
    readTime: "7 min read"
  }
];

const Blog: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="animate-slide-down">
          <h1 className="text-3xl font-bold mb-8 text-center">Blog</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl hover:text-primary cursor-pointer transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between">
                  <span className="text-sm text-muted-foreground">By {post.author}</span>
                  <button className="text-sm text-primary hover:underline">Read more</button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              More articles coming soon! Stay tuned for updates.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Blog;
