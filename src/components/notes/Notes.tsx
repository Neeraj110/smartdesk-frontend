/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  Search,
  Calendar,
  Eye,
  Trash2,
  Download,
  File,
  Brain,
  Sparkles,
  Plus,
  X,
  Copy,
} from "lucide-react";

import {
  useGetNotesQuery,
  useDeleteNoteMutation,
} from "@/redux/notes/notesApi";
import { toast } from "sonner";
import SummaryComponent from "./SummaryComponent";
import FileUploadComponent from "./FileUploadComponent";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Note } from "@/types/types";
import { Input } from "../ui/input";

const Notes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [activeTab, setActiveTab] = useState("text");

  const { data, isLoading } = useGetNotesQuery();
  const notes = data?.data || [];

  const [deleteNote] = useDeleteNoteMutation();

  const handleDelete = async (noteId: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      await deleteNote({ id: noteId }).unwrap();
      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Failed to delete note");
      console.error("Delete note error:", error);
    }
  };

  const getFileIcon = (fileType: any) => {
    switch (fileType) {
      case "pdf":
        return <File className="h-5 w-5 text-pink-600 dark:text-pink-600" />;
      case "docx":
        return <File className="h-5 w-5 text-blue-500 dark:text-blue-500" />;
      default:
        return <File className="h-5 w-5 text-slate-300 dark:text-slate-300" />;
    }
  };

  const filteredNotes = notes.filter((note: Note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.summarizedNote.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterType === "all") return matchesSearch;
    return matchesSearch && note.fileType === filterType;
  });

  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 dark:border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 sm:p-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 dark:from-purple-500/10 dark:to-pink-600/10 border border-blue-500/20 dark:border-purple-500/20">
              <Brain className="h-6 w-6 text-blue-500 dark:text-purple-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
              AI Notes
            </h1>
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 dark:from-purple-500/10 dark:to-pink-600/10 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-500 border border-blue-500/20 dark:border-purple-500/20">
              <Sparkles className="h-3 w-3" />
              AI-Powered Summarization
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Upload documents or enter text to get instant AI-powered summaries
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-300 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 backdrop-blur-sm"
            />
          </div>

          <Button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-purple-500 dark:to-pink-600 text-white rounded-xl hover:from-blue-500/80 hover:to-purple-600/80 dark:hover:from-purple-500/80 dark:hover:to-pink-600/80"
          >
            <Plus className="h-4 w-4" />
            Create Note
          </Button>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredNotes.map((note: Note) => (
            <div
              key={note._id}
              className="group bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102"
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getFileIcon(note.fileType)}
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100 truncate text-sm sm:text-base">
                      {note.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedNote(note);
                        setShowPreviewModal(true);
                      }}
                      className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(note.originalNote, "_blank")}
                      className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(note._id)}
                      className="text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                    {note.summarizedNote}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(note.createdAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Brain className="h-3 w-3" />
                    AI Summary
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 mb-4">
              <File className="h-8 w-8 text-slate-500 dark:text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
              No notes found
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm sm:text-base">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Create your first note to get started"}
            </p>
            <Button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-purple-500 dark:to-pink-600 text-white rounded-lg hover:from-blue-500/80 hover:to-purple-600/80 dark:hover:from-purple-500/80 dark:hover:to-pink-600/80"
            >
              <Plus className="h-4 w-4" />
              Create Note
            </Button>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0  bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full ">
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100">
                  Create Note
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowUploadModal(false)}
                  className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
              <div className="p-4 sm:p-6 ">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 bg-slate-100 dark:bg-slate-900">
                    <TabsTrigger
                      value="text"
                      className="text-slate-800 dark:text-slate-100 data-[state=active]:bg-blue-500 dark:data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                    >
                      Text Input
                    </TabsTrigger>
                    <TabsTrigger
                      value="file"
                      className="text-slate-800 dark:text-slate-100 data-[state=active]:bg-blue-500 dark:data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                    >
                      File Upload
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="text" className="mt-4">
                    <SummaryComponent
                      onSummaryGenerated={() => setShowUploadModal(false)}
                    />
                  </TabsContent>
                  <TabsContent value="file" className="mt-4">
                    <FileUploadComponent
                      onFileUploaded={() => setShowUploadModal(false)}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        )}

        {showPreviewModal && selectedNote && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  {getFileIcon(selectedNote.fileType)}
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100">
                    {selectedNote.title}
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPreviewModal(false)}
                  className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
              <div className="p-4 sm:p-6 overflow-y-auto max-h-96">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-blue-500 dark:text-purple-500" />
                    <span className="text-sm font-medium text-blue-600 dark:text-purple-500">
                      AI Summary
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    {selectedNote.summarizedNote}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <span>Created: {formatDate(selectedNote.createdAt)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      navigator.clipboard.writeText(selectedNote.summarizedNote)
                    }
                    className="flex items-center gap-1 text-blue-600 dark:text-purple-500 hover:text-blue-700 dark:hover:text-purple-600 active:text-red-800"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Summary
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
