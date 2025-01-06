// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { projectApi } from "../project-api";
// import { v4 as uuid } from "uuid";

// export const useCreateProject = () => {
//   const queryClient = useQueryClient();
//   const { mutate, error } = useMutation({
//     mutationFn: projectApi.addProject,

//     async onMutate(newProject) {
//       await queryClient.cancelQueries({ queryKey: projectApi.baseKey });

//       const previousData = queryClient.getQueryData(
//         projectApi.getAllProjectsQueryOptions().queryKey
//       );

//       queryClient.setQueryData(
//         projectApi.getAllProjectsQueryOptions().queryKey,
//         (old) => {
//           if (!old) return [newProject];
//           return [...old, newProject];
//         }
//       );

//       return { previousData };
//     },

//     onError(_, __, previousData) {
//       queryClient.setQueryData(projectApi.baseKey, previousData);
//     },

//     onSettled() {
//       queryClient.invalidateQueries({ queryKey: projectApi.baseKey });
//     },
//   });

//   const handleCreate = (name: string) =>
//     mutate({
//       name,
//       id: uuid(),
//       adminId: uuid(),
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     });

//   return { handleCreate, error };
// };
