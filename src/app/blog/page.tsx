export default function BlogPage() {
  const dummyPosts = [
    { id: '1', title: 'First Post', description: 'Learn how to use React' },
    { id: '2', title: 'Second Post', description: 'Next.js & Tailwind tips' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4 text-black">Latest Posts</h1>
      {dummyPosts.map(post => (
        <div key={post.id} className="p-6 rounded-lg shadow-md border bg-white dark:bg-white-800">
          <h2 className="text-2xl text-black font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-700 dark:text-gray-300">{post.description}</p>
          <a
            href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-block mt-4 text-blue-600 hover:underline"
          >
            Read more →
          </a>
        </div>
      ))}
    </div>
  );
}
