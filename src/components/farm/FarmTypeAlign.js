import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import styled from 'styled-components';

const categories = [
    {
        cropCateNo: 1,
        cropCateName: '가지과',
        image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        cropCateNo: 2,
        cropCateName: '국화과',
        image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        cropCateNo: 3,
        cropCateName: '꿀풀과',
        image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        cropCateNo: 4,
        cropCateName: '머시기과',
        image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        cropCateNo: 5,
        cropCateName: '전성욱과',
        image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        cropCateNo: 6,
        cropCateName: '새뮤얼과',
        image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
];

function App() {
    //const [items, setItems] = React.useState(categories);
    const [selected, setSelected] = React.useState([]);
    const [position, setPosition] = React.useState(0);

    //const isItemSelected = (id) => !!selected.find((el) => el === id);

    /*const handleClick =
        (id) =>
        ({ getItemById, scrollToItem }) => {
            const itemSelected = isItemSelected(id);

            setSelected((currentSelected) =>
                itemSelected
                    ? currentSelected.filter((el) => el !== id)
                    : currentSelected.concat(id),
            );
        };
*/
    return (
        <Container>
            <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                {categories.map((category) => (
                    <Card
                        itemId={category.cropCateNo} // NOTE: itemId is required for track items
                        content={category}
                        //key={category}
                        //onClick={handleClick(id)}
                        //selected={isItemSelected(id)}
                        containerStyle={styles.cardCnt}
                    />
                ))}
            </ScrollMenu>
        </Container>
    );
}
const Container = styled.div`
    overflow: hidden;
    .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
        display: none;
    }
    .react-horizontal-scrolling-menu--scroll-container {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
`;

function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
        React.useContext(VisibilityContext);

    return (
        <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
            {'<'}
        </Arrow>
    );
}

function RightArrow() {
    const { isLastItemVisible, scrollNext } =
        React.useContext(VisibilityContext);

    return (
        <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
            {'>'}
        </Arrow>
    );
}

function Card({ onClick, selected, content, itemId }) {
    const visibility = React.useContext(VisibilityContext);

    return (
        <div
            //onClick={() => onClick(visibility)}
            style={{
                width: '70px',
            }}
            tabIndex={0}
        >
            <div className="card text-center ml-2">
                {/*<div>
                    visible:{' '}
                    {JSON.stringify(!!visibility.isItemVisible(itemId))}
                </div>
                <div>selected: {JSON.stringify(!!selected)}</div>
        */}
                <img
                    src={content.image}
                    alt=""
                    className="h-10 w-10 rounded-full"
                />
                <p>{content.cropCateName}</p>
            </div>
        </div>
    );
}
const styles = {
    cardCnt: {
        borderWidth: 0, // Remove Border

        shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow for iOS
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,

        elevation: 0, // Remove Shadow for Android
    },
};

function Arrow({ children, disabled, onClick, className, testId }) {
    return (
        <ArrowButton
            disabled={disabled}
            onClick={onClick}
            className={`arrow-${className}`}
            data-testid={testId}
        >
            {children}
        </ArrowButton>
    );
}
const ArrowButton = styled('button')({
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '2px',
    opacity: (props) => (props.disabled ? '0' : '1'),
    userSelect: 'none',
    //borderRadius: '6px',
    //borderWidth: '1px',
});

export default function FarmTypeAlignList() {
    return (
        <>
            <App />
        </>
    );
}
