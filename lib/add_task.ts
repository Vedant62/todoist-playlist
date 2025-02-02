import { TodoistApi } from "@doist/todoist-api-typescript";

export async function addPlaylistTask(accessToken: string, taskList: string[]) {
  const api = new TodoistApi(accessToken);
  const main_task = await api.addTask({
    content: `Playlist: New`,
  });

  const parent_id = main_task.id;

  for (let i = 0; i < taskList.length; i++) {
    await api.addTask(
      {
        content: `${i + 1}.${taskList[i]}`,
      },
      parent_id
    );
  }
  //   taskList.forEach((task, index) => {
  //     api.addTask(
  //       {
  //         content: `${index + 1}.${task}`,
  //       },
  //       parent_id
  //     );
  //   });

  console.log("added all the tasks :)");
}
