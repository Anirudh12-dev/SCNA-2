'use client';

import { posts, comments, communities } from '@/lib/data';
import { useHiveoStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MessageSquare,
  ArrowBigUp,
  ArrowBigDown,
  Share2,
  Bookmark,
  MoreHorizontal,
  Pin,
  Send,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Crown,
  Shield,
  Flame,
  Sparkles,
  Users,
  Zap,
  TrendingUp,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const roleColors = {
  admin: { bg: 'bg-yellow-400/20', text: 'text-yellow-600 dark:text-yellow-400', border: 'border-yellow-400/30' },
  mod: { bg: 'bg-blue-500/15', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/30' },
  member: { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-border' },
};

const gradientPalettes = [
  'from-primary/20 via-primary/10 to-orange-200/10',
  'from-blue-500/15 via-purple-500/10 to-pink-500/10',
  'from-emerald-500/15 via-teal-500/10 to-cyan-500/10',
  'from-orange-500/15 via-amber-500/10 to-yellow-500/10',
  'from-pink-500/15 via-rose-500/10 to-red-500/10',
  'from-violet-500/15 via-purple-500/10 to-indigo-500/10',
  'from-teal-500/15 via-green-500/10 to-lime-500/10',
];

function CommentThread({ comment, depth = 0 }: { comment: typeof comments[0]; depth?: number }) {
  const [showReplies, setShowReplies] = useState(true);
  const [liked, setLiked] = useState(false);

  return (
    <div className={cn(depth > 0 && 'ml-8 relative')}>
      {/* Connection line */}
      {depth > 0 && (
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 to-transparent" />
      )}
      <div className="flex gap-3 py-2">
        <Avatar className="h-7 w-7 flex-shrink-0">
          <AvatarFallback className="bg-primary/15 text-primary text-xs font-bold">
            {comment.author[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold">{comment.author}</span>
            <span className="text-[10px] text-muted-foreground">{comment.timeAgo}</span>
          </div>
          <p className="text-sm mt-0.5 leading-relaxed">{comment.content}</p>
          <div className="flex items-center gap-3 mt-1.5">
            <button
              onClick={() => setLiked(!liked)}
              className={cn(
                'flex items-center gap-1 text-xs transition-colors',
                liked ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              )}
            >
              <ArrowBigUp className="h-3.5 w-3.5" />
              <span>{comment.upvotes + (liked ? 1 : 0)}</span>
            </button>
            <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Reply
            </button>
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 text-xs text-primary mt-1 hover:underline"
            >
              {showReplies ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              {showReplies ? 'Hide' : 'Show'} {comment.replies.length} replies
            </button>
          )}
        </div>
      </div>
      {showReplies && comment.replies?.map((reply) => (
        <CommentThread key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );
}

function PostCard({ post }: { post: typeof posts[0] }) {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [shared, setShared] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const { setCurrentPage, setSelectedCommunityId } = useHiveoStore();

  const voteCount = post.upvotes - post.downvotes + (upvoted ? 1 : 0) - (downvoted ? 1 : 0);
  const hasImage = post.image || post.tags.includes('tutorial') || post.tags.includes('pixel-art');

  return (
    <Card className="border-border hover:border-primary/30 card-hover group">
      <CardContent className="p-0">
        {/* Post header */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-2">
          <button
            onClick={() => {
              setSelectedCommunityId(post.communityId);
              setCurrentPage('community-detail');
            }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-6 h-6 rounded-md bg-primary/15 flex items-center justify-center text-[10px] font-bold text-primary">
              {post.communityIcon.substring(0, 2)}
            </div>
            <span className="text-xs font-semibold hover:text-primary transition-colors">
              {post.communityName}
            </span>
          </button>
          <span className="text-[10px] text-muted-foreground">•</span>
          <span className="text-[10px] text-muted-foreground">{post.timeAgo}</span>
          {post.pinned && (
            <Badge variant="secondary" className="ml-auto text-[10px] bg-primary/15 text-primary">
              <Pin className="h-3 w-3 mr-1" /> Pinned
            </Badge>
          )}
          <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Author info */}
        <div className="flex items-center gap-2 px-4 pb-2">
          <Avatar className="h-5 w-5">
            <AvatarFallback className={cn(
              "text-[9px] font-bold border",
              roleColors[post.authorRole].bg,
              roleColors[post.authorRole].text,
              roleColors[post.authorRole].border
            )}>
              {post.author[0]}
            </AvatarFallback>
          </Avatar>
          <span className={cn("text-xs font-semibold", 
            post.authorRole === 'admin' ? 'text-yellow-600 dark:text-yellow-400' : 
            post.authorRole === 'mod' ? 'text-blue-600 dark:text-blue-400' : ''
          )}>
            {post.author}
          </span>
          {post.authorRole === 'admin' && <Crown className="h-3 w-3 text-yellow-500" />}
          {post.authorRole === 'mod' && <Shield className="h-3 w-3 text-blue-500" />}
        </div>

        {/* Post content */}
        <div className="px-4 pb-3">
          <h3 className="font-semibold text-base leading-tight mb-1.5 group-hover:text-primary transition-colors cursor-pointer">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {post.content}
          </p>

          {/* Image placeholder */}
          {hasImage && (
            <div className={cn(
              "mt-3 h-48 rounded-xl bg-gradient-to-br overflow-hidden",
              gradientPalettes[post.id.charCodeAt(1) % gradientPalettes.length]
            )}>
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl mb-2 block">{post.communityIcon}</span>
                  <p className="text-xs text-muted-foreground">Post Image</p>
                </div>
              </div>
            </div>
          )}

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-[10px] bg-primary/8 hover:bg-primary/15 cursor-pointer transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Actions bar */}
        <div className="flex items-center px-4 py-2 border-t border-border/50">
          <div className="flex items-center gap-1 mr-4">
            <button
              onClick={() => {
                setUpvoted(!upvoted);
                setDownvoted(false);
              }}
              className={cn(
                'p-1 rounded transition-colors',
                upvoted ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              )}
            >
              <ArrowBigUp className="h-5 w-5" />
            </button>
            <span className={cn('text-sm font-medium min-w-[2rem] text-center', upvoted ? 'text-primary' : downvoted ? 'text-red-500' : '')}>
              {voteCount}
            </span>
            <button
              onClick={() => {
                setDownvoted(!downvoted);
                setUpvoted(false);
              }}
              className={cn(
                'p-1 rounded transition-colors',
                downvoted ? 'text-red-500 bg-red-500/10' : 'text-muted-foreground hover:text-red-500 hover:bg-red-500/5'
              )}
            >
              <ArrowBigDown className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={() => setShowComments(!showComments)}
            className={cn(
              'flex items-center gap-1.5 px-2 py-1 rounded-md text-sm transition-colors',
              showComments ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
            )}
          >
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments}</span>
          </button>
          <button
            onClick={() => {
              setShared(!shared);
              setTimeout(() => setShared(false), 1500);
            }}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded-md text-sm transition-all ml-1",
              shared ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/5"
            )}
          >
            <Share2 className={cn("h-4 w-4", shared && "pop-bounce")} />
            {shared && <Check className="h-3 w-3" />}
          </button>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded-md text-sm transition-all ml-1",
              bookmarked ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/5"
            )}
          >
            <Bookmark className={cn("h-4 w-4", bookmarked && "pop-bounce fill-primary")} />
          </button>
        </div>

        {/* Comments section */}
        {showComments && (
          <div className="border-t border-border/50 px-4 py-3">
            {/* New comment input */}
            <div className="flex gap-2 mb-4">
              <Avatar className="h-7 w-7 flex-shrink-0">
                <AvatarFallback className="bg-primary/15 text-primary text-xs font-bold">Z</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[36px] h-9 resize-none text-sm bg-muted/50 border-0 focus-visible:ring-1"
                />
                <Button
                  size="icon"
                  className="h-9 w-9 bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Comments list */}
            <div className="space-y-1">
              {comments.map((comment) => (
                <CommentThread key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function WelcomeBanner() {
  const [greeting, setGreeting] = useState('Good morning');

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening');
  }, []);

  return (
    <Card className="mb-4 border-primary/20 overflow-hidden card-hover">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl flex-shrink-0 shadow-md">
              Z
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold mb-0.5">
                {greeting}, <span className="hiveo-gradient-text">Z_User</span>! 👋
              </h2>
              <p className="text-sm text-muted-foreground mb-3">
                Here&apos;s what&apos;s buzzing in your hive today
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs">
                  <Flame className="h-3.5 w-3.5 text-orange-500" />
                  <span className="font-semibold">12 day streak</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  <span className="font-semibold">+320 XP today</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-muted-foreground">3 new notifications</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              <Sparkles className="h-8 w-8 text-primary/30" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SuggestedCommunitiesCarousel() {
  const suggested = communities.filter((c) => c.isJoined).slice(0, 5);
  const { setCurrentPage, setSelectedCommunityId } = useHiveoStore();

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">Your Communities</h3>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
      </div>
      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-2">
          {suggested.map((community) => (
            <button
              key={community.id}
              onClick={() => {
                setSelectedCommunityId(community.id);
                setCurrentPage('community-detail');
              }}
              className="flex-shrink-0 w-36 bg-card border border-border rounded-xl p-3 hover:border-primary/40 transition-all card-hover text-left group"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white mb-2 shadow-sm"
                style={{ backgroundColor: community.coverColor }}
              >
                {community.icon}
              </div>
              <p className="text-xs font-semibold truncate group-hover:text-primary transition-colors">
                {community.name}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 live-pulse" />
                <span className="text-[10px] text-muted-foreground">{community.online} online</span>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export function HomeFeed() {
  const [filter, setFilter] = useState<'hot' | 'new' | 'top'>('hot');
  const sortedPosts = [...posts].sort((a, b) => {
    if (filter === 'hot') return (b.upvotes + b.comments * 2) - (a.upvotes + a.comments * 2);
    if (filter === 'top') return b.upvotes - a.upvotes;
    return 0;
  });

  return (
    <div className="max-w-2xl mx-auto page-transition">
      {/* Welcome banner */}
      <WelcomeBanner />

      {/* Suggested Communities */}
      <SuggestedCommunitiesCarousel />

      {/* Create post */}
      <Card className="mb-4 border-border card-hover">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0 shadow-sm">
            Z
          </div>
          <button className="flex-1 text-left bg-muted/50 rounded-full px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors">
            What&apos;s buzzing in your hive? 🐝
          </button>
        </CardContent>
      </Card>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 mb-4 bg-muted/30 rounded-lg p-1">
        {(['hot', 'new', 'top'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize',
              filter === f
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {f === 'hot' && <Flame className="h-3.5 w-3.5" />}
            {f}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-3">
        {sortedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
