import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

async function getNewStories() {
  const res = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json', {
    cache: 'no-store' // This ensures we always get fresh data
  })
  const ids = await res.json()
  const stories = await Promise.all(
    ids.slice(0, 10).map(async (id: number) => {
      const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
        cache: 'no-store' // This ensures we always get fresh data for each story
      })
      return storyRes.json()
    })
  )
  return stories
}

export default async function NewStories() {
  const stories = await getNewStories()

  return (
    <div className="space-y-4">
      {stories.map((story: any) => (
        <Card key={story.id}>
          <CardHeader>
            <CardTitle>{story.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>By: {story.by}</p>
            <p>Score: {story.score}</p>
            <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Read More
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}