"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface KnowledgeArticle {
  id: string; // Internal state uses string for ease, will convert to number if syncing with DB
  title: string;
  desc: string; // Short description
  content: string; // Full rich text content
  image: string; // Thumbnail/Featured Image
  level: string; // Category (SKILLS, TECHNOLOGY, etc.)
  nextBatch: string; // Publish Date
  instructor: string; // Author Name
  
  // Extra fields for the CMS (Mocked for UI purposes)
  tags: string[];
  readTime: string;
  seoTitle: string;
  seoDescription: string;
  slug: string;
  status: "Draft" | "Published";
  views: number;
}

interface KnowledgeHubContextType {
  articles: KnowledgeArticle[];
  setArticles: React.Dispatch<React.SetStateAction<KnowledgeArticle[]>>;
  
  // Filters and Sorting
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: "Newest" | "Oldest" | "Most Viewed";
  setSortOrder: React.Dispatch<React.SetStateAction<"Newest" | "Oldest" | "Most Viewed">>;

  // Drawer State
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingArticleId: string | null;
  setEditingArticleId: React.Dispatch<React.SetStateAction<string | null>>;

  loading: boolean;
  refreshData: () => Promise<void>;
}

const KnowledgeHubContext = createContext<KnowledgeHubContextType | undefined>(undefined);

export function KnowledgeHubProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<KnowledgeArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [sortOrder, setSortOrder] = useState<"Newest" | "Oldest" | "Most Viewed">("Newest");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  const refreshData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/knowledge-hub");
      if (res.ok) {
        const data = await res.json();
        
        // Map Prisma model to our CMS State model (injecting mock fields)
        const mappedData = data.map((item: any) => ({
          id: item.id.toString(),
          title: item.title,
          desc: item.desc,
          content: "<p>This is the full article content. Start writing here...</p>", // Mock
          image: item.image,
          level: item.level,
          nextBatch: item.nextBatch,
          instructor: item.instructor,
          tags: ["Innovation", "Education"], // Mock
          readTime: "5 min read", // Mock
          seoTitle: item.title, // Mock
          seoDescription: item.desc, // Mock
          slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'), // Mock
          status: "Published", // Mock
          views: Math.floor(Math.random() * 5000) + 100 // Mock
        }));

        setArticles(mappedData);
      }
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <KnowledgeHubContext.Provider
      value={{
        articles, setArticles,
        searchQuery, setSearchQuery,
        categoryFilter, setCategoryFilter,
        statusFilter, setStatusFilter,
        sortOrder, setSortOrder,
        isDrawerOpen, setIsDrawerOpen,
        editingArticleId, setEditingArticleId,
        loading, refreshData
      }}
    >
      {children}
    </KnowledgeHubContext.Provider>
  );
}

export function useKnowledgeHub() {
  const context = useContext(KnowledgeHubContext);
  if (context === undefined) {
    throw new Error("useKnowledgeHub must be used within a KnowledgeHubProvider");
  }
  return context;
}
