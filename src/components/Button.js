export default function Button({
    name,
    widthHeight,
    moveToListFunc,
    moveToModifyFunc,
    handlePayment,
}) {
    return (
        <>
            <button
                type="button"
                className={`${widthHeight} block rounded-md bg-[#80BCBD] px-2.5 py-1.5 text-base font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-[#4F6F52]`}
                onClick={moveToListFunc || moveToModifyFunc || handlePayment}
            >
                {name}
            </button>
        </>
    );
}
Button.defaultProps = {
    widthHeight: 'w-16 h-11', // 기본적으로 적용할 widthHeight 값
};
