import { X, Plus, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/tasks/taskApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Task } from "@/types/types";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

interface TaskFormModalProps {
  task?: Task | null;
  onClose: () => void;
}

const TaskFormModal = ({ task, onClose }: TaskFormModalProps) => {
  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const isEditing = !!task;

  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      if (isEditing) {
        await updateTask({ taskId: task._id, ...data }).unwrap();
        toast.success("Task updated successfully");
      } else {
        await createTask(data).unwrap();
        toast.success("Task created successfully");
      }
      onClose();
    } catch (error: any) {
      toast.error(
        isEditing ? "Failed to update task" : "Failed to create task"
      );
      console.error("Task operation failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-[90vw] sm:max-w-md w-full">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white">
            {isEditing ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 sm:p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 text-slate-500" />
          </button>
        </div>
        <div className="p-4 sm:p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 sm:space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                      Task Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter task title"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter task description (optional)"
                        rows={3}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
                <Button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-xs sm:text-sm"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                >
                  {isCreating || isUpdating ? (
                    <>
                      <div className="animate-spin rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                      {isEditing ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      {isEditing ? (
                        <Save className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      ) : (
                        <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      )}
                      {isEditing ? "Update Task" : "Create Task"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TaskFormModal;
