import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getMe } from "@/service/user-service";

export async function UserInfo() {
	const user = await getMe();

	return (
		<div className="flex gap-3 items-center pl-3">
			<Avatar className="h-full">
				<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<div>
				<p className="text-nowrap">{user?.payload.username}</p>
				<p className="text-nowrap">{user?.payload.email}</p>
			</div>
		</div>
	);
}
