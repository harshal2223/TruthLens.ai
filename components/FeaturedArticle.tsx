import Image from 'next/image'
import Link from 'next/link'
import { Clock, User } from 'lucide-react'
import VerifyBadge from './VerifyBadge'

interface FeaturedArticleProps {
  article: {
    id: number
    title: string
    slug: string
    coverUrl: string | null
    readTime: number
    verifiedPct: number
    createdAt: string
    author: {
      id: number
      name: string | null
      email: string
    }
  }
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="relative h-[500px] rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
      
      {article.coverUrl ? (
        <Image
          src={article.coverUrl}
          alt={article.title}
          fill
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <span className="text-gray-500">No image</span>
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
        <div className="max-w-4xl">
          <Link href={`/articles/${article.slug}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 hover:text-[#1DE9B6] transition-colors duration-200 font-['Playfair_Display']">
              {article.title}
            </h1>
          </Link>
          
          <div className="flex items-center justify-between text-white/80 mb-4">
            <div className="flex items-center space-x-6">
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
          </div>
          
          <VerifyBadge verifiedPct={article.verifiedPct} />
        </div>
      </div>
    </div>
  )
}

