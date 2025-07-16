import Image from 'next/image'
import Link from 'next/link'
import { Clock, User } from 'lucide-react'
import VerifyBadge from './VerifyBadge'

interface ArticleCardProps {
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

export default function ArticleCard({ article }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link href={`/articles/${article.slug}`}>
        <div className="aspect-video relative bg-gray-800">
          {article.coverUrl ? (
            <Image
              src={article.coverUrl}
              alt={article.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <span>No image</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-6">
        <Link href={`/articles/${article.slug}`}>
          <h3 className="text-xl font-bold text-white mb-3 hover:text-[#1DE9B6] transition-colors duration-200 font-['Playfair_Display']">
            {article.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span>{article.author.name || 'Anonymous'}</span>
            </div>
            <span>{formatDate(article.createdAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{article.readTime} min read</span>
          </div>
        </div>
        
        <VerifyBadge verifiedPct={article.verifiedPct} />
      </div>
    </div>
  )
}
