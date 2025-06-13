import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Brain, Sparkles, Clipboard, Download } from "lucide-react";
import { toast } from "sonner";
import { useCreateNoteMutation } from "@/redux/notes/notesApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Note } from "@/types/types";

interface SummaryFormData {
  text: string;
  title: string;
  summaryLength: "short" | "medium" | "long";
}

const summarySchema = z.object({
  text: z.string().min(1, "Text is required for summarization"),
  summaryLength: z.enum(["short", "medium", "long"]).default("medium"),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(20, "Title must be at most 20 characters"),
});

type SummaryComponentProps = {
  onSummaryGenerated: (note: Note) => void;
};

const SummaryComponent: React.FC<SummaryComponentProps> = ({
  onSummaryGenerated,
}) => {
  const [createNote, { isLoading }] = useCreateNoteMutation();
  const [summary, setSummary] = React.useState("");

  const form = useForm({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      text: "",
      summaryLength: "medium",
      title: "",
    },
  });

  const onSubmit = async (data: SummaryFormData) => {
    try {
      const note = await createNote({
        title: data.title,
        text: data.text,
        summaryLength: data.summaryLength,
      }).unwrap();
      setSummary(note.summarizedNote);
      onSummaryGenerated(note);
      toast.success("Summary generated successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to generate summary");
      console.error("Error generating summary:", error);
    }
  };

  return (
    <div className="space-y-4 overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  Note Title
                </FormLabel>
                <FormControl>
                  <input
                    type="text"
                    placeholder="Enter note title (3-20 characters)"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 backdrop-blur-sm"
                    maxLength={20}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {field.value.length}/20 characters
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  Text Content
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter text to summarize"
                    className="w-full min-h-[120px] px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 backdrop-blur-sm"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="summaryLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  Summary Length
                </FormLabel>
                <FormControl>
                  <Tabs value={field.value} onValueChange={field.onChange}>
                    <TabsList className="grid w-full grid-cols-3 bg-slate-100 dark:bg-slate-900">
                      <TabsTrigger
                        value="short"
                        className="text-slate-800 dark:text-slate-100 data-[state=active]:bg-blue-500 dark:data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                      >
                        Short
                      </TabsTrigger>
                      <TabsTrigger
                        value="medium"
                        className="text-slate-800 dark:text-slate-100 data-[state=active]:bg-blue-500 dark:data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                      >
                        Medium
                      </TabsTrigger>
                      <TabsTrigger
                        value="long"
                        className="text-slate-800 dark:text-slate-100 data-[state=active]:bg-blue-500 dark:data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                      >
                        Detailed
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-purple-500 dark:to-pink-600 text-white rounded-lg hover:from-blue-500/80 hover:to-purple-600/80 dark:hover:from-purple-500/80 dark:hover:to-pink-600/80 disabled:opacity-50 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4" />
                Generate Summary
              </>
            )}
          </Button>
        </form>
      </Form>
      {summary && (
        <div className="p-4 bg-white/80 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-blue-500 dark:text-purple-500" />
            <span className="text-sm font-medium text-blue-600 dark:text-purple-500">
              Generated Summary
            </span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            {summary}
          </p>
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigator.clipboard.writeText(summary)}
              className="border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <Clipboard className="h-4 w-4 mr-1" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const blob = new Blob([summary], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `summary-${Date.now()}.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryComponent;
