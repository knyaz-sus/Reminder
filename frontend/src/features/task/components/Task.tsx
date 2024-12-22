import { Button } from "@/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { StaticEditor } from "@/components/Editor/StaticEditor";
import { Separator } from "@/components/Separator";
import { Task as TaskType } from "@/types/schemas";
import { Ellipsis, Circle, GripVertical, Trash2, X } from "lucide-react";

export function Task({ title, description }: TaskType) {
  return (
    <Dialog>
      <div className="flex relative cursor-pointer group flex-col">
        <div className="flex justify-between">
          <div className="flex w-full gap-2">
            <div className="h-full pt-2.5">
              <button>
                <Circle size={18} />
              </button>
            </div>
            <DialogTrigger asChild>
              <div className="flex flex-col w-full py-2">
                <StaticEditor content={title} />
                {description && description !== "<p></p>" && (
                  <StaticEditor
                    content={description ? description : undefined}
                  />
                )}
              </div>
            </DialogTrigger>
          </div>
          <div className="pt-2">
            <Button
              className="opacity-0 self-end group-hover:opacity-100"
              size="xs"
              variant="ghost"
            >
              <Ellipsis />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="xs"
            className="flex items-center cursor-move 
                     opacity-0 group-hover:opacity-100
                     absolute -left-10 top-1.5"
          >
            <GripVertical />
          </Button>
        </div>
        <Separator />
      </div>
      <DialogContent customClose className="items-center p-0">
        <DialogHeader className="flex items-center flex-row px-5 pt-5 pb-2">
          <div className="flex w-full justify-end gap-2">
            <Button variant="ghost" size="xs">
              <Trash2 />
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" size="xs">
                <X />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        <Separator />
        <div className="flex">
          <div></div>
          <div></div>
        </div>
        <DialogTitle className="sr-only">Change task</DialogTitle>
        <DialogDescription className="sr-only">
          Change your task here
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
