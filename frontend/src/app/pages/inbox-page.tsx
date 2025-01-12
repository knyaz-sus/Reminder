import { CreateTask } from "@/modules/task/components/create-task";
import { Task } from "@/modules/task/components/task";
import { useCreateTask } from "@/modules/task/hooks/use-create-task";
import { useQueryPageTasks } from "@/modules/task/hooks/use-query-page-tasks";

export function InboxPage() {
  const { handleCreate } = useCreateTask("inbox");

  const { tasks, isPending, error } = useQueryPageTasks("inbox");

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <div className="flex flex-col flex-auto max-w-[85vw] lg:max-w-3xl">
      <h1 className="mb-4">Inbox</h1>
      <div className="flex flex-col">
        {tasks?.map((task) => (
          <Task param="inbox" isSortable={false} key={task.id} {...task} />
        ))}
        <CreateTask projectId={null} createTask={handleCreate} order={null} />
      </div>
    </div>
  );
}
