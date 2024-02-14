export default function Button({ name, widthHeight }) {
    return (
        <>
            <button
                type="button"
                className={`${widthHeight} block rounded-md bg-[#80BCBD] px-2.5 py-1.5 text-base font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-[#4F6F52]`}
            >
                {name}
            </button>
        </>
    );
}
Button.defaultProps = {
    widthHeight: 'w-18 h-11', // 기본적으로 적용할 widthHeight 값
};
