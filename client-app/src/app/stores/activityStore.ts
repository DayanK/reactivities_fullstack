import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import { Activity } from "../models/activities";

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadActivities = async () => {
        this.setLoadinInitial(true);
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    this.activities.push(activity); 
                });
                this.setLoadinInitial(false);
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadinInitial(false);
            });
        }
    };

    setLoadinInitial = (state: boolean) => {
        runInAction(() => {
            this.loadingInitial = state; 
        });
    };

    selectActivity = (id: string) => {
        runInAction(() => {
            this.selectedActivity = this.activities.find(a => a.id === id);
        });
    };

    cancelSelectedActivity = () => {
        runInAction(() => {
            this.selectedActivity = undefined;
        });
    };

    openForm = (id?: string) => {
        runInAction(() => {
            id ? this.selectActivity(id) : this.cancelSelectedActivity();
            this.editMode = true;
        });
    };

    closeForm = () => {
        runInAction(() => {
            this.editMode = false;
        });
    };

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activities.push(activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activities = this.activities.filter(a => a.id !== id);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };
}
