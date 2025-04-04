import { getWorkSpaceById } from "@/actions/workspace-action";
import FavoriteStar from "../../_components/favorite/favorite";
import { ResWorkSpace } from "@/types/workspace";
import { getAllTasksService } from "@/service/task-service";
import AddTaskButton from "../../_components/task/add-task-button";
import { groupTasksByStatus } from "@/lib/task";
import { Task } from "@/types/task";
import TaskSection from "../../_components/task/task-section";
interface Props {
	params: Promise<{ id: string }>;
}
export default async function Page({ params }: Props) {
	const { id } = await params;

	const workspace = await getWorkSpaceById(id);
	const task = groupTasksByStatus(
		(await getAllTasksService(id))?.payload as Task[]
	);

	return (
		<div className="px-10 py-5 h-full">
			<div className="flex justify-between">
				<p className="text-3xl font-semibold">
					{workspace?.payload.workspaceName}
					asdfasdfasdfasdf
				</p>
				<FavoriteStar workspace={workspace?.payload as ResWorkSpace} />
			</div>
			<main className="grid grid-cols-3 gap-10">
				<TaskSection sectionName="Not Started" tasks={task["NOT_STARTED"]} />
				<TaskSection sectionName="IN_PROGRESS" tasks={task["IN_PROGRESS"]} />
				<TaskSection sectionName="FINISHED" tasks={task["FINISHED"]} />
			</main>

			<AddTaskButton />
		</div>
	);
}
