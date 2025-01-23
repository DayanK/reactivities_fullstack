import React, { useEffect, useState, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activities";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from 'uuid';
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";


function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });

      setActivities(activities);
      setLoading(false);
    });
  }, []);


  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(activitiy => activitiy.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleCreateOrEditActivity = async (activity: Activity) => {
    setSubmitting(true);

    try {
        if (activity.id) {
            await agent.Activities.update(activity);
            setActivities(prevActivities => [
                ...prevActivities.filter(item => item.id !== activity.id),
                activity
            ]);
        } else {
            activity.id = uuid();
            await agent.Activities.create(activity);
            setActivities(prevActivities => [...prevActivities, activity]);
        }
        setSelectedActivity(activity);
        setEditMode(false);
    } catch (error) {
        console.error("Erreur lors de la création ou de la modification de l'activité", error);
    } finally {
        setSubmitting(false);
    }
};


  const handleDeleteActivity = async (id: string) => {
    try {
        setSubmitting(true);
        await agent.Activities.delete(id);
        setActivities(prevActivities => prevActivities.filter(item => item.id !== id));
    } catch (error) {
        console.error('Error deleting', error);
    } finally {
        setSubmitting(false);
    }
};



  if (loading) return <LoadingComponent content="Loading..." />;

  return (
    <Fragment>

      <NavBar openForm={handleFormOpen} />

      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>

    </Fragment>
  );
}

export default App;
