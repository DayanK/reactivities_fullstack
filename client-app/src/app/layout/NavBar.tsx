import { Container, Menu, Button, MenuItem } from 'semantic-ui-react';
import { useStore } from '../stores/store';



export default function NavBar() {

    const { activityStore } = useStore();

    return (
        <Menu inverted fixed="top">
            <Container>
                <MenuItem header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Reactivities
                </MenuItem>

                <MenuItem name="Activities" />

                <MenuItem>
                   <Button positive 
                   content="Create Activity" 
                   onClick={() =>activityStore.openForm()}
                   />
                </MenuItem>

            </Container>

    
        </Menu>
    )
}

