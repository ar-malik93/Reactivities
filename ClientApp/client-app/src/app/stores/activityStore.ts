import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid'
export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading: boolean = false;
  loadingIntial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate(){
    return Array.from(this.activityRegistry.values()).sort((a,b)=> Date.parse(a.date) - Date.parse(b.date));
  }

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        this.activityRegistry.set(activity.id, activity)
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingIntial = state;
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id)
  };

  cancelActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelActivity();
    this.editMode = true;
  };
  closeForm = () => {
    this.editMode = false;
  };

  createActivity= async (acitvity:Activity)=>{
    this.loading=true;
    try{
        acitvity.id = uuid();
        await agent.Activities.create(acitvity);
        runInAction(()=>{
            this.activityRegistry.set(acitvity.id,acitvity);
            this.editMode=false;
            this.selectedActivity = acitvity;
            this.loading=false;
        })

    }catch(error){
        console.log(error);
        runInAction(()=>{
            this.loading=false;
        })

    }
  }

  updateActivity =async(activity:Activity) =>{
    this.loading=true;
    try{
        await agent.Activities.update(activity.id, activity);
        runInAction(()=>{
            this.activityRegistry.set(activity.id, activity);
            this.editMode=false;
            this.selectedActivity = activity
            this.loading=false;
        })
    }catch(error){
        console.log(error);
        runInAction(()=>{
            this.loading=false;
        })
    }
  }

  deleteActivity = async(id:string) =>{
    this.loading=true;
    try{
        await agent.Activities.delete(id);
        runInAction(()=>{
            this.activityRegistry.delete(id)
            if(this.selectedActivity?.id === id) this.cancelActivity()
            this.loading=false
        })
    }catch(error){
        console.log(error)
        runInAction(()=>{
            this.loading=false
        })
    }
  }
}