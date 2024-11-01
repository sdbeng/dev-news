import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getTopStories() {
    const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json", {
        cache: "no-store" //ensures that the response is not retrieved from the browser cache, always fresh data
    });
    //define ids
    const ids = await response.json();
    //get the first 10 ids stories
    const stories = await Promise.all(
        ids.slice(0, 10).map(async (id: number) => {
            
            const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
                cache: 'force-cache' //ensures that the response is retrieved from the browser cache, it caches the individual stories
            });
            return await storyResponse.json();
        })
    )
    return stories;
}

export default async function TopStories() {
    const stories = await getTopStories();

    return (
        <div className="space-y-4">
            {stories.map((story: any) => (
                <Card key={story.id}>
                    <CardHeader>
                        <CardTitle>{story.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>by: {story.by} </p>
                        <p>Score: {story.score} </p>
                        <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline" >Read more</a>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
    