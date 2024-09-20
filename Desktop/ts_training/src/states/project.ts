namespace App {
  //Project State Management
  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];
    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  export class ProjectState extends State<Project>{
    
    private projects: Project[] = [];
    private static instance : ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if(this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }


    addProject(title: string, descriotion: string, manday: number) {
      const newProjects = new Project(Math.random().toString(), title, descriotion, manday, ProjectStatus.Active);
      this.projects.push(newProjects);
      this.updateLisners();

    }

    moveProjects(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find(prj => prj.id === projectId);
      if(project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateLisners();
      }

    }

    private updateLisners(){
      for(const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }

  export const projectState = ProjectState.getInstance();

}