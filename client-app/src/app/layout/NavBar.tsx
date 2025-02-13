import { Container, Menu, Button, MenuItem } from 'semantic-ui-react';


interface Props {
    openForm: () => void;
  }

export default function NavBar({openForm}: Props) {

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
                   onClick={openForm}
                   />
                </MenuItem>

            </Container>

    
        </Menu>
    )
}

