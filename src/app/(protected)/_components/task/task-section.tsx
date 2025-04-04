import { Task } from "@/types/task";
import { Separator } from "@radix-ui/react-separator";
import TaskCard from "./task-card";

interface Props {
	sectionName: string;
	tasks: Task[];
}

export default function TaskSection({ sectionName, tasks }: Readonly<Props>) {
	return (
		<div className="flex flex-col">
			<div className="flex flex-col gap-3">
				<p className="text-3xl">{sectionName}</p>
				<Separator />
			</div>
			<div className="flex flex-col gap-5">
				{tasks?.map((t) => (
					<TaskCard key={t.taskId} task={t} />
				))}
			</div>
		</div>
	);
}
