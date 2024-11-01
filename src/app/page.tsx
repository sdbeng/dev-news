import TopStories from "./components/top-stories";
import NewStories from "./components/new-stories";

export default function Home() {
  return (    
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Hacker News Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Top Stories</h2>
            <TopStories />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">New Stories</h2>
            <NewStories />
          </div>
        </div>       
      </main>
  );
}
