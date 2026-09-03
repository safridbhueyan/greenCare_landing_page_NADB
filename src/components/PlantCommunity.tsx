import React, { useState } from 'react';
import { COMMUNITY_POSTS } from '../data/mockData';
import type { CommunityPost } from '../types';
import { Users, Heart, MessageCircle, Share2, PlusCircle, Sparkles, X, Image as ImageIcon, Send } from 'lucide-react';

interface PlantCommunityProps {
  onOpenSubscription: () => void;
}

export const PlantCommunity: React.FC<PlantCommunityProps> = ({ onOpenSubscription }) => {
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Progress' | 'Recovery' | 'Tip'>('All');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New post form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState<'Progress' | 'Recovery' | 'Tip'>('Progress');

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPostItem: CommunityPost = {
      id: Date.now().toString(),
      author: 'You (GreenCare Garden)',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      plantType: 'Indoor Plant',
      timeAgo: 'Just now',
      title: newTitle,
      content: newContent,
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800',
      likes: 1,
      comments: 0,
      tag: newTag,
      isLiked: true,
    };

    setPosts([newPostItem, ...posts]);
    setIsCreateOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  const filteredPosts = posts.filter((p) => activeFilter === 'All' || p.tag === activeFilter);

  return (
    <section id="community" className="py-24 bg-[#F4F1EA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#132E1E]/5 text-xs font-semibold text-[#2D6A4F] uppercase tracking-wider">
            <Users className="w-4 h-4 text-[#3A7D44]" />
            <span>Digital Garden Community</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-[#132E1E]">
            A community that{' '}
            <span className="font-serif-editorial italic font-normal text-[#2D6A4F]">
              grows together. 🌱
            </span>
          </h2>

          <p className="text-base text-[#132E1E]/75 max-w-xl mx-auto">
            Share your plants, discoveries, progress, problems, and tips with people who love growing things.
          </p>
        </div>

        {/* Filter Pills & Create Post Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex gap-2">
            {(['All', 'Progress', 'Recovery', 'Tip'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === filter
                    ? 'bg-[#132E1E] text-white shadow-xs'
                    : 'bg-white text-[#132E1E] hover:bg-[#132E1E]/10 border border-[#132E1E]/10'
                }`}
              >
                {filter === 'All' ? 'All Feed' : filter}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-5 py-2.5 rounded-full bg-[#2D6A4F] hover:bg-[#132E1E] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
          >
            <PlusCircle className="w-4 h-4 text-[#A3B18A]" />
            <span>Share Plant Update</span>
          </button>
        </div>

        {/* Pinterest/Instagram Style Organic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="card-organic bg-white overflow-hidden border border-[#132E1E]/10 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* Author Bar */}
                <div className="p-4 flex items-center justify-between border-b border-[#132E1E]/5">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-9 h-9 rounded-full object-cover border border-[#132E1E]/10"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#132E1E]">{post.author}</h4>
                      <p className="text-[10px] text-[#132E1E]/60">{post.timeAgo} • {post.plantType}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-[#A3B18A]/20 text-[10px] font-bold text-[#2D6A4F]">
                    {post.tag}
                  </span>
                </div>

                {/* Post Image */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#E8ECE5]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-[#132E1E] leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#132E1E]/75 leading-relaxed">
                    {post.content}
                  </p>
                </div>
              </div>

              {/* Interaction Bar */}
              <div className="px-5 py-3.5 bg-[#FAF8F5] border-t border-[#132E1E]/5 flex items-center justify-between text-xs font-semibold text-[#132E1E]/80">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    post.isLiked ? 'text-rose-600 font-bold' : 'hover:text-[#2D6A4F]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-600' : ''}`} />
                  <span>{post.likes}</span>
                </button>

                <button
                  onClick={onOpenSubscription}
                  className="flex items-center gap-1.5 hover:text-[#2D6A4F] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#2D6A4F]" />
                  <span>{post.comments} comments</span>
                </button>

                <button
                  onClick={onOpenSubscription}
                  className="p-1 rounded-full hover:bg-[#132E1E]/5 text-[#132E1E]/50"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenSubscription}
            className="px-8 py-4 rounded-full bg-[#132E1E] hover:bg-[#2D6A4F] text-[#FAF8F5] font-semibold text-sm transition-all shadow-md inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#A3B18A]" />
            <span>Join the GreenCare Community</span>
          </button>
        </div>

      </div>

      {/* Create Post Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-[#132E1E]/20 shadow-2xl relative space-y-6 animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setIsCreateOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#132E1E]/60 hover:text-[#132E1E] hover:bg-[#132E1E]/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#132E1E]">Share to Plant Community 🌱</h3>
              <p className="text-xs text-[#132E1E]/60">Post your leaf growth, propagation wins, or ask for advice.</p>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#52796F]">
                  Post Category
                </label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {(['Progress', 'Recovery', 'Tip'] as const).map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setNewTag(tag)}
                      className={`p-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                        newTag === tag
                          ? 'bg-[#132E1E] text-white border-[#132E1E]'
                          : 'bg-white text-[#132E1E] border-[#132E1E]/10'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#52796F]">
                  Title / Headline
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. My Monstera finally grew a new leaf!"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl bg-white border border-[#132E1E]/15 text-xs text-[#132E1E] focus:outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#52796F]">
                  Details / Story
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your plant care secret or discovery..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full mt-1 p-3 rounded-xl bg-white border border-[#132E1E]/15 text-xs text-[#132E1E] focus:outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div className="p-4 rounded-xl border border-dashed border-[#132E1E]/20 text-center bg-white">
                <ImageIcon className="w-6 h-6 mx-auto text-[#2D6A4F] mb-1" />
                <span className="text-xs font-semibold text-[#132E1E]/70">Photo attached from plant camera</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#132E1E] hover:bg-[#2D6A4F] text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Publish to Community</span>
              </button>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
