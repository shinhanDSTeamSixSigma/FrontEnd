import styled from 'styled-components';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const FabCss = styled.div`
    bottom: 20px;
    right: 20px;
`;

const CustomFab = styled(Fab)`
    background-color: #80bcbd !important;
    color: white !important;
`;
const FloatingButton = () => {
    return (
        <>
            <FabCss className="d-flex justify-content-end">
                <CustomFab size="medium" color="primary" aria-label="add">
                    <AddIcon />
                </CustomFab>
            </FabCss>
        </>
    );
};
export default FloatingButton;
