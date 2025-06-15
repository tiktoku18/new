"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  Download,
  MoreHorizontal,
  Search,
  Plus,
  Home,
  Compass,
  Mail,
  User,
  Pause,
  VolumeX,
  Volume2,
} from "lucide-react"
import Link from "next/link"

const generateComments = () => {
  const commentTexts = [
    "This is absolutely amazing! 😍",
    "Can't stop watching this! 🔥",
    "You're so talented! ✨",
    "This made my day! 😊",
    "Incredible content as always! 👏",
    "How do you do this?! 🤯",
    "This is pure art! 🎨",
    "I'm obsessed with this! 💕",
    "You never disappoint! 🙌",
    "This is why I love this app! ❤️",
    "Teach me your ways! 🙏",
    "This deserves to go viral! 🚀",
    "I've watched this 10 times already! 😂",
    "You're a legend! 👑",
    "This is perfection! ✨",
    "I can't even... 😱",
    "This is everything! 💯",
    "You're my inspiration! 🌟",
  ]

  const usernames = [
    "sarah_jones",
    "mike_chen",
    "emma_wilson",
    "alex_garcia",
    "jessica_brown",
    "david_kim",
    "sophia_martinez",
    "ryan_taylor",
    "olivia_anderson",
    "james_white",
    "ava_thompson",
    "noah_davis",
    "isabella_rodriguez",
    "lucas_miller",
    "mia_johnson",
    "ethan_moore",
    "charlotte_jackson",
    "mason_lee",
  ]

  return Array.from({ length: Math.floor(Math.random() * 8) + 8 }, (_, i) => ({
    id: `comment-${i}`,
    username: usernames[Math.floor(Math.random() * usernames.length)],
    avatar: `/placeholder.svg?height=32&width=32&text=${usernames[Math.floor(Math.random() * usernames.length)][0].toUpperCase()}`,
    text: commentTexts[Math.floor(Math.random() * commentTexts.length)],
    likes: Math.floor(Math.random() * 500) + 1,
    timeAgo: `${Math.floor(Math.random() * 24) + 1}h`,
    isLiked: Math.random() > 0.7,
  }))
}

const generateVideoData = (index) => {
  const videoNumber = Math.floor(Math.random() * 80) + 1
  const usernames = [
    "dance_queen",
    "fitness_guru",
    "comedy_king",
    "art_lover",
    "music_maker",
    "food_blogger",
    "travel_bug",
    "pet_parent",
    "fashion_icon",
    "tech_wizard",
    "nature_lover",
    "book_worm",
  ]

  const captions = [
    "Living my best life! ✨ #blessed #vibes",
    "Can't believe this happened! 😱 #viral #amazing",
    "Just another day being awesome 💪 #motivation",
    "This took me hours to perfect! 🎯 #dedication",
    "Who else can relate? 😂 #relatable #funny",
    "Trying something new today! 🌟 #adventure",
    "This is why I love what I do ❤️ #passion",
    "Rate this from 1-10! 🔥 #challenge",
    "Behind the scenes magic ✨ #bts #creative",
    "Making memories that last forever 📸 #memories",
  ]

  const username = usernames[Math.floor(Math.random() * usernames.length)]

  return {
    id: `video-${index}`,
    videoUrl: `https://best-girls-around.com/video_app/videos/2/${videoNumber}.mp4`,
    username,
    avatar: `/placeholder.svg?height=40&width=40&text=${username[0].toUpperCase()}`,
    caption: captions[Math.floor(Math.random() * captions.length)],
    likes: Math.floor(Math.random() * 50000) + 1000,
    comments: generateComments(),
    isLiked: false,
    isBookmarked: false,
    hasStory: true,
  }
}

const generateAdData = (index) => {
  const adTypes = [
    {
      imageUrl: `/placeholder.svg?height=600&width=400&text=FASHION`,
      title: "Summer Collection",
      description: "Get 30% off on our new summer collection!",
      link: "https://example.com/fashion",
      bgColor: "from-pink-500 to-purple-500",
    },
    {
      imageUrl: `/placeholder.svg?height=600&width=400&text=TECH`,
      title: "New Smartphone",
      description: "The latest smartphone with amazing features!",
      link: "https://example.com/tech",
      bgColor: "from-blue-500 to-cyan-500",
    },
    {
      imageUrl: `/placeholder.svg?height=600&width=400&text=FOOD`,
      title: "Healthy Meals",
      description: "Delicious and healthy meals delivered to your door!",
      link: "https://example.com/food",
      bgColor: "from-green-500 to-emerald-500",
    },
    {
      imageUrl: `/placeholder.svg?height=600&width=400&text=FITNESS`,
      title: "Join Our Gym",
      description: "First month free when you sign up today!",
      link: "https://example.com/fitness",
      bgColor: "from-orange-500 to-red-500",
    },
    {
      imageUrl: `/placeholder.svg?height=600&width=400&text=TRAVEL`,
      title: "Dream Vacation",
      description: "Book your dream vacation with 20% discount!",
      link: "https://example.com/travel",
      bgColor: "from-indigo-500 to-violet-500",
    },
  ]

  return {
    id: `ad-${index}`,
    ...adTypes[index % 5],
  }
}

export default function TikTokClone() {
  const [videos, setVideos] = useState([])
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [showComments, setShowComments] = useState(false)
  const videoRefs = useRef([])
  const containerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState([])
  const [isMuted, setIsMuted] = useState([])
  const [isLoaded, setIsLoaded] = useState([])

  const loadMoreVideos = useCallback(() => {
    const newVideos = []
    const startIndex = videos.length

    for (let i = 0; i < 10; i++) {
      const videoIndex = startIndex + i

      if (videoIndex > 0 && videoIndex % 2 === 0) {
        newVideos.push({
          type: "ad",
          data: generateAdData(Math.floor(videoIndex / 2)),
        })
      }

      newVideos.push(generateVideoData(videoIndex))
    }

    setVideos((prev) => [...prev, ...newVideos])

    setIsPlaying((prev) => {
      const newState = [...prev]
      for (let i = 0; i < newVideos.length; i++) {
        newState[startIndex + i] = true
      }
      return newState
    })

    setIsMuted((prev) => {
      const newState = [...prev]
      for (let i = 0; i < newVideos.length; i++) {
        newState[startIndex + i] = false
      }
      return newState
    })
  }, [videos.length])

  useEffect(() => {
    loadMoreVideos()
  }, [])

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scrollTop = container.scrollTop
    const containerHeight = container.clientHeight
    const scrollHeight = container.scrollHeight

    if (scrollHeight - scrollTop - containerHeight < 1000) {
      loadMoreVideos()
    }

    const videoHeight = containerHeight
    const newIndex = Math.round(scrollTop / videoHeight)
    if (newIndex !== currentVideoIndex && newIndex < videos.length) {
      setCurrentVideoIndex(newIndex)

      videoRefs.current.forEach((video, idx) => {
        if (video) {
          if (idx === newIndex) {
            video.play().catch(() => {
              setIsPlaying((prev) => {
                const newState = [...prev]
                newState[idx] = false
                return newState
              })
            })
            setIsPlaying((prev) => {
              const newState = [...prev]
              newState[idx] = true
              return newState
            })
          } else {
            video.pause()
            setIsPlaying((prev) => {
              const newState = [...prev]
              newState[idx] = false
              return newState
            })
          }
        }
      })
    }
  }, [currentVideoIndex, videos.length, loadMoreVideos])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  const handleLike = (index) => {
    setVideos((prev) =>
      prev.map((item, i) => {
        if (i === index && item.videoUrl) {
          return {
            ...item,
            isLiked: !item.isLiked,
            likes: item.isLiked ? item.likes - 1 : item.likes + 1,
          }
        }
        return item
      }),
    )
  }

  const handleBookmark = (index) => {
    setVideos((prev) =>
      prev.map((item, i) => {
        if (i === index && item.videoUrl) {
          return {
            ...item,
            isBookmarked: !item.isBookmarked,
          }
        }
        return item
      }),
    )
  }

  const handleCommentLike = (videoIndex, commentIndex) => {
    setVideos((prev) =>
      prev.map((item, i) => {
        if (i === videoIndex && item.comments) {
          const updatedComments = item.comments.map((comment, ci) => {
            if (ci === commentIndex) {
              return {
                ...comment,
                isLiked: !comment.isLiked,
                likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              }
            }
            return comment
          })
          return { ...item, comments: updatedComments }
        }
        return item
      }),
    )
  }

  const togglePlayPause = (index) => {
    const video = videoRefs.current[index]
    if (video) {
      if (video.paused) {
        video.play()
        setIsPlaying((prev) => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      } else {
        video.pause()
        setIsPlaying((prev) => {
          const newState = [...prev]
          newState[index] = false
          return newState
        })
      }
    }
  }

  const toggleMute = (index) => {
    const video = videoRefs.current[index]
    if (video) {
      video.muted = !video.muted
      setIsMuted((prev) => {
        const newState = [...prev]
        newState[index] = video.muted
        return newState
      })
    }
  }

  const handleVideoEnd = (index) => {
    if (containerRef.current) {
      const nextVideoTop = (index + 1) * containerRef.current.clientHeight
      containerRef.current.scrollTo({
        top: nextVideoTop,
        behavior: "smooth",
      })
    }
  }

  const handleVideoLoaded = (index) => {
    setIsLoaded((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })

    const video = videoRefs.current[index]
    if (video && index === currentVideoIndex) {
      video.play().catch(() => {})
    }
  }

  return (
    <div className="h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-20 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="https://example.com" className="text-red-500 font-bold">
            LIVES
          </Link>
          <div className="flex space-x-6">
            <button className="text-white font-semibold">Following</button>
            <button className="text-gray-400">For You</button>
          </div>
          <Search className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Video Container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll pt-16 pb-20"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollSnapType: "y mandatory",
        }}
      >
        {videos.map((item, index) => (
          <div
            key={item.type === "ad" ? item.data.id : item.id}
            className="relative h-screen"
            style={{ scrollSnapAlign: "start" }}
          >
            {item.type === "ad" ? (
              <Link href={item.data.link} className="block h-full">
                <div
                  className={`relative h-full bg-gradient-to-br ${item.data.bgColor} flex items-center justify-center`}
                >
                  <img
                    src={item.data.imageUrl || "/placeholder.svg"}
                    alt="Advertisement"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-20 left-4 right-4">
                    <h3 className="text-2xl font-bold mb-2">{item.data.title}</h3>
                    <p className="text-lg opacity-90">{item.data.description}</p>
                    <span className="inline-block mt-2 bg-white text-black px-2 py-1 rounded text-sm font-semibold">
                      Sponsored
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <Link href="https://example.com" className="block h-full relative">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={item.videoUrl}
                  className="w-full h-full object-cover"
                  loop={false}
                  muted={isMuted[index]}
                  playsInline
                  preload="auto"
                  autoPlay={index === currentVideoIndex}
                  onEnded={() => handleVideoEnd(index)}
                  onClick={(e) => {
                    e.preventDefault()
                    togglePlayPause(index)
                  }}
                  onLoadedData={() => handleVideoLoaded(index)}
                />

                {/* Video Controls Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {!isPlaying[index] && index === currentVideoIndex && (
                    <div className="bg-black bg-opacity-50 rounded-full p-4 opacity-0 animate-fade-in">
                      <Pause className="w-12 h-12 text-white fill-current" />
                    </div>
                  )}
                </div>

                {/* Loading Indicator */}
                {!isLoaded[index] && index === currentVideoIndex && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {/* Mute/Unmute Button */}
                <div className="absolute top-20 right-4">
                  <button
                    className="text-white rounded-full p-2 bg-black bg-opacity-30 hover:bg-black hover:bg-opacity-50 transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleMute(index)
                    }}
                  >
                    {isMuted[index] ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  </button>
                </div>

                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black from-opacity-50 via-transparent to-transparent" />

                {/* Right Side Actions */}
                <div className="absolute right-2 bottom-32 flex flex-col space-y-3">
                  {/* User Avatar with Story Badge */}
                  <Link href="https://example.com" className="relative" onClick={(e) => e.stopPropagation()}>
                    <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden bg-gray-300">
                      <img
                        src={`https://i.pravatar.cc/64?img=${index + 10}`}
                        alt={item.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-xs font-bold">+</span>
                    </div>
                  </Link>

                  {/* Like Button */}
                  <div className="flex flex-col items-center">
                    <button
                      className={`rounded-full p-2 ${item.isLiked ? "text-red-500" : "text-white"} transition-all duration-300 hover:scale-110`}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleLike(index)
                      }}
                    >
                      <Heart className={`w-10 h-10 ${item.isLiked ? "fill-current animate-pulse" : ""}`} />
                    </button>
                    <span className="text-base mt-1 font-semibold">{item.likes.toLocaleString()}</span>
                  </div>

                  {/* Comment Button */}
                  <div className="flex flex-col items-center">
                    <button
                      className="text-white rounded-full p-2 hover:scale-110 transition-transform"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setShowComments(true)
                      }}
                    >
                      <MessageCircle className="w-10 h-10" />
                    </button>
                    <span className="text-base mt-1 font-semibold">{item.comments.length}</span>
                  </div>

                  {/* Share Button */}
                  <Link href="https://example.com" onClick={(e) => e.stopPropagation()}>
                    <button className="text-white rounded-full p-2 hover:scale-110 transition-transform">
                      <Share className="w-10 h-10" />
                    </button>
                  </Link>

                  {/* Bookmark Button */}
                  <div className="flex flex-col items-center">
                    <button
                      className={`rounded-full p-2 ${item.isBookmarked ? "text-yellow-500" : "text-white"} hover:scale-110 transition-all`}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleBookmark(index)
                      }}
                    >
                      <Bookmark className={`w-10 h-10 ${item.isBookmarked ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {/* Download Button */}
                  <Link href="https://example.com" onClick={(e) => e.stopPropagation()}>
                    <button className="text-white rounded-full p-2 hover:scale-110 transition-transform">
                      <Download className="w-10 h-10" />
                    </button>
                  </Link>

                  {/* More Options */}
                  <Link href="https://example.com" onClick={(e) => e.stopPropagation()}>
                    <button className="text-white rounded-full p-2 hover:scale-110 transition-transform">
                      <MoreHorizontal className="w-10 h-10" />
                    </button>
                  </Link>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-28 left-4 right-24">
                  <Link href="https://example.com" className="block" onClick={(e) => e.stopPropagation()}>
                    <h3 className="font-semibold text-xl mb-2 drop-shadow-lg">@{item.username}</h3>
                    <p className="text-base opacity-90 mb-4 drop-shadow-lg leading-relaxed">{item.caption}</p>
                  </Link>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800">
        <div className="flex items-center justify-around py-2">
          <Link href="https://example.com" className="flex flex-col items-center p-2">
            <Home className="w-6 h-6 text-white" />
            <span className="text-xs mt-1 text-white">Home</span>
          </Link>
          <Link href="https://example.com" className="flex flex-col items-center p-2">
            <Compass className="w-6 h-6 text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">Discover</span>
          </Link>
          <Link href="https://example.com" className="flex flex-col items-center p-2">
            <div className="bg-white rounded-lg p-2">
              <Plus className="w-6 h-6 text-black" />
            </div>
          </Link>
          <Link href="https://example.com" className="flex flex-col items-center p-2 relative">
            <Mail className="w-6 h-6 text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">Inbox</span>
            <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
              <span className="text-xs text-white">3</span>
            </div>
          </Link>
          <Link href="https://example.com" className="flex flex-col items-center p-2">
            <User className="w-6 h-6 text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">Profile</span>
          </Link>
        </div>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-[70vh] overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black">Comments</h3>
                <button
                  onClick={() => setShowComments(false)}
                  className="text-black hover:bg-gray-100 rounded-full p-2"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="overflow-y-auto max-h-96 p-4">
              {videos[currentVideoIndex] &&
                videos[currentVideoIndex].comments &&
                videos[currentVideoIndex].comments.map((comment, commentIndex) => (
                  <div key={comment.id} className="flex space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
                      <img
                        src={`https://i.pravatar.cc/40?img=${commentIndex + 1}`}
                        alt={comment.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Link href="https://example.com" className="font-semibold text-sm text-black hover:underline">
                          {comment.username}
                        </Link>
                        <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                      </div>
                      <p className="text-sm text-black mb-2">{comment.text}</p>
                      <div className="flex items-center space-x-4">
                        <button
                          className={`text-xs flex items-center ${comment.isLiked ? "text-red-500" : "text-gray-500"} hover:text-red-400`}
                          onClick={() => handleCommentLike(currentVideoIndex, commentIndex)}
                        >
                          <Heart className={`w-3 h-3 mr-1 ${comment.isLiked ? "fill-current" : ""}`} />
                          {comment.likes}
                        </button>
                        <Link href="https://example.com">
                          <button className="text-xs text-gray-500 hover:underline">Reply</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
