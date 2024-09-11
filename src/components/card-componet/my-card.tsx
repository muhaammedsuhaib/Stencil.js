import { Component, h, State } from "@stencil/core";

@Component({
  tag: 'my-card',
  styleUrl: 'my-card.css',
  shadow: true
})
export class MyCard {
  @State() tasks: { id: number, description: string, timeAdded: string, isCompleted: boolean }[] = [];
  @State() newTask: string = '';

  private taskId: number = 1;

  handleInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newTask = input.value;
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    if (this.newTask.trim() === '') {
      alert('Please enter a task.');
      return;
    }

    const task = {
      id: this.taskId++,
      description: this.newTask,
      timeAdded: new Date().toLocaleTimeString(),
      isCompleted: false
    };

    this.tasks = [...this.tasks, task];
    this.newTask = ''; // Clear input after submission
  }

  markAsComplete(taskId: number) {
    this.tasks = this.tasks.map(task =>
      task.id === taskId ? { ...task, isCompleted: true } : task
    );
  }

  render() {
    return (
      <div class='container'>
        <div class="box1">
          <h1>Add Task</h1>
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <input
              type="text"
              placeholder="Enter task"
              value={this.newTask}
              onInput={(event) => this.handleInputChange(event)}
            />
            <button type="submit">Add Task</button>
          </form>
        </div>

        <div class="box2">
          {this.tasks.length === 0 && <p>No tasks available.</p>}
          {this.tasks.filter(task => !task.isCompleted).map(task => (
            <div class="task" key={task.id}>
              <p>{task.description}</p>
              <p>Added at: {task.timeAdded}</p>
              <button onClick={() => this.markAsComplete(task.id)}>Mark as Complete</button>
            </div>
          ))}
        </div>

        <div class="box3">
          {this.tasks.length === 0 && <p>No tasks available.</p>}
          {this.tasks.filter(task => task.isCompleted).map(task => (
            <div class="task" key={task.id}>
              <p>{task.description}</p>
              <p>Added at: {task.timeAdded}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
