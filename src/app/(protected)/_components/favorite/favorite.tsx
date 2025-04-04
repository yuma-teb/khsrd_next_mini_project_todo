"use client";

import React from "react";
import { Star } from "lucide-react";
import { updateWorkSpaceFavorite } from "@/actions/workspace-action";
import { ResWorkSpace } from "@/types/workspace";

type FavoriteStarProps = {
	workspace: ResWorkSpace;
};

export default function FavoriteStar({
	workspace,
}: Readonly<FavoriteStarProps>) {
	const updateFavorite = async () => {
		await updateWorkSpaceFavorite(workspace.workspaceId, {
			isFavorite: !workspace.isFavorite,
		});
	};
	return (
		<>
			<Star
				className={`w-6 h-6 transition-colors cursor-pointer ${
					workspace.isFavorite
						? "fill-yellow-400 stroke-yellow-400"
						: "stroke-gray-500"
				}`}
				onClick={updateFavorite}
			/>
		</>
	);
}
