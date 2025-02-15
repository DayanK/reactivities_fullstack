import React, { ChangeEvent, useState } from 'react';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activities';

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    submitting: boolean;
}

export default function ActivityForm({ activity: selectedActivity, closeForm, createOrEdit, submitting }: Props) {

  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  };

  const [activity, setActivity] = useState(initialState);

  const handleSubmit = () => {
    createOrEdit(activity);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };


  return (
    <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete='off'>
            <Form.Input 
                placeholder='Title' 
                name='title' 
                value={activity.title} 
                onChange={handleInputChange}
            />
            <Form.TextArea 
                placeholder='Description' 
                name='description' 
                value={activity.description} 
                onChange={handleInputChange}
            />
            <Form.Input 
                placeholder='Category' 
                name='category' 
                value={activity.category} 
                onChange={handleInputChange}
            />
            <Form.Input 
                type='date' 
                placeholder='Date' 
                name='date' 
                value={activity.date} 
                onChange={handleInputChange}
            />
            <Form.Input 
                placeholder='City' 
                name='city' 
                value={activity.city} 
                onChange={handleInputChange}
            />
            <Form.Input 
                placeholder='Venue' 
                name='venue' 
                value={activity.venue} 
                onChange={handleInputChange}
            />
            <Button 
              floated='right' 
              positive type='submit' 
              content="Submit"
              onClick={handleSubmit}
              loading={submitting}
            />
            <Button 
              floated='right' 
              type='button' 
              content="Cancel"
              onClick={closeForm} 
            />
        </Form>
    </Segment>
  );
}
