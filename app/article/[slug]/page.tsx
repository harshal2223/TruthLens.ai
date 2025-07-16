import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, User, ArrowLeft, Share2 } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import VerifyBadge from '@/components/VerifyBadge'
import ArticleAnalyzer from '@/components/ArticleAnalyzer'
import ReactMarkdown from 'react-markdown'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

async function getArticle(slug: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tags: true,
      },
    })
    
    return article
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

async function getRelatedArticles(currentSlug: string, tags: string[]) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        AND: [
          { slug: { not: currentSlug } },
          {
            tags: {
              some: {
                name: { in: tags }
              }
            }
          }
        ]
      },
      take: 3,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return articles
  } catch (error) {
    console.error('Error fetching related articles:', error)
    return []
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug)
  
  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(
    article.slug, 
    article.tags.map(tag => tag.name)
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-[#111]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {article.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Playfair_Display'] leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-6 text-gray-400">
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span>{article.author.name || 'Anonymous'}</span>
              </div>
              <span>{formatDate(article.createdAt)}</span>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{article.readTime} min read</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <VerifyBadge verifiedPct={article.verifiedPct} />
              <button className="text-gray-400 hover:text-white transition-colors duration-200">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {article.coverUrl && (
          <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
            <Image
              src={article.coverUrl}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none mb-12">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-white mb-6 font-['Playfair_Display']">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-white mb-4 mt-8 font-['Playfair_Display']">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold text-white mb-3 mt-6 font-['Playfair_Display']">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="text-gray-300 mb-4 space-y-2 list-disc list-inside">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="text-gray-300">
                  {children}
                </li>
              ),
            }}
          >
            {article.contentMd}
          </ReactMarkdown>
        </article>

        {/* AI Article Analysis */}
        <ArticleAnalyzer 
          articleId={article.id} 
          articleTitle={article.title}
        />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 font-['Playfair_Display']">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/articles/${relatedArticle.slug}`}
                  className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors duration-200"
                >
                  <div className="aspect-video relative bg-gray-800">
                    {relatedArticle.coverUrl ? (
                      <Image
                        src={relatedArticle.coverUrl}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <span>No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 font-['Playfair_Display'] line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{formatDate(relatedArticle.createdAt)}</span>
                      <span>{relatedArticle.readTime} min</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}