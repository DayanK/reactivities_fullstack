import React from 'react';
import { Card, Image, CardHeader, CardContent, CardMeta, CardDescription, Icon, Button } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activities';





interface Props {
    activity: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
}

export default function ActivityDetails({ activity, cancelSelectActivity, openForm }: Props) {
    return (
        <Card fluid>
        <Image 
            src={`/assets/categoryImages/${activity.category}.jpg`} 
            alt={`${activity.category} image`}
            size='medium'

            />

            <CardContent>
                <CardHeader>{activity.title}</CardHeader>
                <CardMeta>
                    <span className='date'>{activity.date}</span>
                </CardMeta>
                <CardDescription>
                    {activity.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group widths='2'>
                    <Button 
                        basic 
                        color='blue' 
                        content='Edit'
                        onClick={() => openForm(activity.id)
                        }
                     />
                    <Button basic color='grey' content='Cancel' onClick={cancelSelectActivity}/>
                </Button.Group>
            </CardContent>
        </Card>
    );
}

