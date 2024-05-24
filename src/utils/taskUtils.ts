export function getUpdateTaskVariables(
  task: any,
  newValues: Partial<typeof task>
) {
  return {
    id: task.id,
    ...task,
    ...newValues,
  };
}
