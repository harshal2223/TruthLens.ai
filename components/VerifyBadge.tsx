import { CheckCircle } from 'lucide-react'

interface VerifyBadgeProps {
  verifiedPct: number
}

export default function VerifyBadge({ verifiedPct }: VerifyBadgeProps) {
  return (
    <div className="flex items-center space-x-1">
      <div className="relative">
        <CheckCircle 
          size={16} 
          className="text-[#1DE9B6] drop-shadow-sm"
        />
        <div 
          className="absolute inset-0 rounded-full border-2 border-[#1DE9B6] opacity-30"
          style={{
            background: `conic-gradient(#1DE9B6 ${verifiedPct * 3.6}deg, transparent 0deg)`
          }}
        />
      </div>
      <span className="text-[#1DE9B6] text-sm font-medium">
        {verifiedPct}% verified
      </span>
    </div>
  )
}

