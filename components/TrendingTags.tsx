'use client'

import { useEffect, useState } from 'react'
import { Hash } from 'lucide-react'

interface Tag {
  id: number
  name: string
  _count: {
    articles: number
  }
}

export default function TrendingTags() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await fetch('/api/tags')
        if (response.ok) {
          const data = await response.json()
          setTags(data)
        }
      } catch (error) {
        console.error('Error fetching tags:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTags()
  }, [])

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4 font-['Playfair_Display']">
          Trending Tags
        </h2>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-800 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4 font-['Playfair_Display']">
        Trending Tags
      </h2>
      <div className="space-y-2">
        {tags.map((tag) => (
          <div key={tag.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Hash size={14} className="text-[#1DE9B6]" />
              <span className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">
                {tag.name}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {tag._count.articles}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

