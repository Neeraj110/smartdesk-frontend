import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, FileText, Trash2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";

const uploadSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(20, "Title must be at most 20 characters"),
});

interface FileUploadComponentProps {
  onFileUploaded: (note: any) => void;
}

const FileUploadComponent = ({ onFileUploaded }: FileUploadComponentProps) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [createNote, { isLoading }] = useCreateNoteMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const selectedFile = files && files[0];
    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "text/plain",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Please upload a PDF, TXT, or DOCX file");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    if (file) {
      toast("Previous file removed");
    }

    setFile(selectedFile);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast("File removed");
  };

  const onSubmit = async (data: { title: any }) => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
      const note = await createNote({
        title: data.title,
        file,
        summaryLength: "medium",
      }).unwrap();
      onFileUploaded(note);
      toast.success("File uploaded and summarized successfully");
      setFile(null);
      form.reset();
    } catch (error) {
      toast.error("Failed to upload file");
      console.error("Upload error:", error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div className="space-y-4 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  Document Title
                </FormLabel>
                <FormControl>
                  <input
                    type="text"
                    placeholder="Enter document title (3-20 characters)"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 backdrop-blur-sm"
                    maxLength={20}
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
          <div>
            <FormLabel className="text-sm font-medium text-slate-800 dark:text-slate-100">
              Upload Document
            </FormLabel>
            {!file ? (
              <div
                className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center hover:border-blue-500 dark:hover:border-purple-500 transition-colors cursor-pointer bg-gradient-to-br from-blue-500/10 to-purple-600/10 dark:from-purple-500/10 dark:to-pink-600/10"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-300 mb-2" />
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Click to upload PDF, TXT, or DOCX (max 10MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt,.docx,.doc"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isLoading}
                />
              </div>
            ) : (
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-white/80 dark:bg-slate-800/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-blue-500 dark:text-purple-500" />
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-100">
                        {file.name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {formatFileSize(file.size)} •{" "}
                        {file.type.split("/")[1].toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={removeFile}
                    className="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-purple-500 dark:to-pink-600 text-white rounded-lg hover:from-blue-500/80 hover:to-purple-600/80 dark:hover:from-purple-500/80 dark:hover:to-pink-600/80 disabled:opacity-50 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload & Summarize
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FileUploadComponent;
